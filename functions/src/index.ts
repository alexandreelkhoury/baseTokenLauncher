import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

// 🎉 Token Creation Trigger
export const onTokenCreated = functions.firestore
  .document('tokens/{tokenId}')
  .onCreate(async (snap, context) => {
    const tokenData = snap.data();
    const tokenId = context.params.tokenId;

    console.log(`🚀 New token created: ${tokenData.name} (${tokenData.symbol})`);

    try {
      // 1. Update global stats
      await updateGlobalStats('tokenCreated');
      
      // 2. Update user stats
      await updateUserStats(tokenData.deployerAddress, 'tokenCreated');
      
      // 3. Send push notification to user (if they have FCM token)
      await sendTokenCreationNotification(tokenData, tokenId);
      
      // 4. Update leaderboards
      await updateLeaderboards(tokenData);
      
      // 5. Log analytics event (server-side)
      console.log('Analytics: token_created_server', {
        token_name: tokenData.name,
        token_symbol: tokenData.symbol,
        deployer: tokenData.deployerAddress,
        chain_id: tokenData.chainId
      });

    } catch (error) {
      console.error('Error in onTokenCreated trigger:', error);
    }
  });

// 💧 Liquidity Addition Trigger  
export const onLiquidityAdded = functions.firestore
  .document('liquidity/{liquidityId}')
  .onCreate(async (snap, context) => {
    const liquidityData = snap.data();
    const liquidityId = context.params.liquidityId;

    console.log(`💧 New liquidity added: ${liquidityData.amount} for token ${liquidityData.tokenAddress}`);

    try {
      // 1. Update global liquidity stats
      await updateGlobalStats('liquidityAdded', liquidityData.amount);
      
      // 2. Update user stats
      await updateUserStats(liquidityData.userAddress, 'liquidityAdded');
      
      // 3. Send liquidity notification
      await sendLiquidityNotification(liquidityData, liquidityId);
      
      // 4. Update token metrics
      await updateTokenMetrics(liquidityData.tokenAddress, liquidityData);

    } catch (error) {
      console.error('Error in onLiquidityAdded trigger:', error);
    }
  });

// 📊 User Profile Updates
export const onUserProfileUpdated = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const userId = context.params.userId;

    console.log(`👤 User profile updated: ${userId}`);

    // Check for milestone achievements
    await checkMilestones(userId, before, after);
  });

// 🏆 Update Global Statistics
async function updateGlobalStats(eventType: string, value?: number) {
  const statsRef = db.collection('globalStats').doc('main');
  
  const updateData: any = {};
  
  switch (eventType) {
    case 'tokenCreated':
      updateData.totalTokens = admin.firestore.FieldValue.increment(1);
      updateData.lastTokenCreated = admin.firestore.Timestamp.now();
      break;
    case 'liquidityAdded':
      updateData.totalLiquidityEvents = admin.firestore.FieldValue.increment(1);
      updateData.totalLiquidityValue = admin.firestore.FieldValue.increment(value || 0);
      break;
  }
  
  await statsRef.set(updateData, { merge: true });
}

// 📈 Update User Statistics
async function updateUserStats(userAddress: string, eventType: string) {
  const userStatsRef = db.collection('userStats').doc(userAddress.toLowerCase());
  
  const updateData: any = {
    lastActivity: admin.firestore.Timestamp.now()
  };
  
  switch (eventType) {
    case 'tokenCreated':
      updateData.tokensCreated = admin.firestore.FieldValue.increment(1);
      break;
    case 'liquidityAdded':
      updateData.liquidityEventsCount = admin.firestore.FieldValue.increment(1);
      break;
  }
  
  await userStatsRef.set(updateData, { merge: true });
}

// 🔔 Send Token Creation Notification
async function sendTokenCreationNotification(tokenData: any, tokenId: string) {
  // Get user's FCM token from user profile
  const userRef = db.collection('users').where('walletAddress', '==', tokenData.deployerAddress.toLowerCase()).limit(1);
  const userSnapshot = await userRef.get();
  
  if (!userSnapshot.empty) {
    const userData = userSnapshot.docs[0].data();
    
    if (userData.fcmToken) {
      const message = {
        token: userData.fcmToken,
        notification: {
          title: '🚀 Token Created Successfully!',
          body: `${tokenData.name} (${tokenData.symbol}) is now live on Base!`,
        },
        data: {
          type: 'token_created',
          tokenId: tokenId,
          tokenAddress: tokenData.contractAddress || '',
          tokenName: tokenData.name,
          tokenSymbol: tokenData.symbol
        },
        android: {
          notification: {
            icon: 'ic_notification',
            color: '#3B82F6'
          }
        },
        apns: {
          payload: {
            aps: {
              badge: 1,
              sound: 'default'
            }
          }
        }
      };

      try {
        await messaging.send(message);
        console.log(`🔔 Push notification sent for token: ${tokenData.name}`);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
  }
}

// 💧 Send Liquidity Notification
async function sendLiquidityNotification(liquidityData: any, liquidityId: string) {
  const userRef = db.collection('users').where('walletAddress', '==', liquidityData.userAddress.toLowerCase()).limit(1);
  const userSnapshot = await userRef.get();
  
  if (!userSnapshot.empty) {
    const userData = userSnapshot.docs[0].data();
    
    if (userData.fcmToken) {
      const message = {
        token: userData.fcmToken,
        notification: {
          title: '💧 Liquidity Added Successfully!',
          body: `You've added ${liquidityData.amount} liquidity to your token pool!`,
        },
        data: {
          type: 'liquidity_added',
          liquidityId: liquidityId,
          tokenAddress: liquidityData.tokenAddress,
          amount: liquidityData.amount.toString()
        }
      };

      try {
        await messaging.send(message);
        console.log(`🔔 Liquidity notification sent`);
      } catch (error) {
        console.error('Error sending liquidity notification:', error);
      }
    }
  }
}

// 🏆 Update Leaderboards
async function updateLeaderboards(tokenData: any) {
  const leaderboardRef = db.collection('leaderboards').doc('tokenCreators');
  
  await db.runTransaction(async (transaction) => {
    const leaderboardDoc = await transaction.get(leaderboardRef);
    
    let leaderboard = leaderboardDoc.exists ? leaderboardDoc.data()?.users || [] : [];
    
    // Find user in leaderboard
    const userIndex = leaderboard.findIndex((user: any) => 
      user.address.toLowerCase() === tokenData.deployerAddress.toLowerCase()
    );
    
    if (userIndex !== -1) {
      // Update existing user
      leaderboard[userIndex].tokenCount += 1;
      leaderboard[userIndex].lastTokenCreated = admin.firestore.Timestamp.now();
    } else {
      // Add new user
      leaderboard.push({
        address: tokenData.deployerAddress.toLowerCase(),
        tokenCount: 1,
        lastTokenCreated: admin.firestore.Timestamp.now()
      });
    }
    
    // Sort by token count
    leaderboard.sort((a: any, b: any) => b.tokenCount - a.tokenCount);
    
    // Keep only top 100
    leaderboard = leaderboard.slice(0, 100);
    
    transaction.set(leaderboardRef, { 
      users: leaderboard,
      updatedAt: admin.firestore.Timestamp.now()
    }, { merge: true });
  });
}

// 📊 Update Token Metrics
async function updateTokenMetrics(tokenAddress: string, liquidityData: any) {
  const tokenMetricsRef = db.collection('tokenMetrics').doc(tokenAddress.toLowerCase());
  
  await tokenMetricsRef.set({
    lastLiquidityUpdate: admin.firestore.Timestamp.now(),
    totalLiquidityEvents: admin.firestore.FieldValue.increment(1),
    lastLiquidityAmount: liquidityData.amount
  }, { merge: true });
}

// 🎯 Check User Milestones
async function checkMilestones(userId: string, before: any, after: any) {
  const milestones = [
    { tokens: 1, title: 'First Token Creator', description: 'Created your first token!' },
    { tokens: 5, title: 'Token Enthusiast', description: 'Created 5 tokens!' },
    { tokens: 10, title: 'Token Master', description: 'Created 10 tokens!' },
    { tokens: 25, title: 'Token Legend', description: 'Created 25 tokens!' },
    { tokens: 50, title: 'Token God', description: 'Created 50 tokens!' }
  ];
  
  const previousTokens = before.totalTokensCreated || 0;
  const currentTokens = after.totalTokensCreated || 0;
  
  for (const milestone of milestones) {
    if (previousTokens < milestone.tokens && currentTokens >= milestone.tokens) {
      // Achievement unlocked!
      await db.collection('userAchievements').add({
        userId,
        milestoneTokens: milestone.tokens,
        title: milestone.title,
        description: milestone.description,
        unlockedAt: admin.firestore.Timestamp.now(),
        type: 'token_milestone'
      });
      
      console.log(`🏆 Achievement unlocked: ${milestone.title} for user ${userId}`);
      
      // Send achievement notification
      await sendAchievementNotification(userId, milestone);
    }
  }
}

// 🏆 Send Achievement Notification
async function sendAchievementNotification(userId: string, milestone: any) {
  const userDoc = await db.collection('users').doc(userId).get();
  
  if (userDoc.exists) {
    const userData = userDoc.data();
    
    if (userData?.fcmToken) {
      const message = {
        token: userData.fcmToken,
        notification: {
          title: `🏆 Achievement Unlocked!`,
          body: `${milestone.title}: ${milestone.description}`,
        },
        data: {
          type: 'achievement',
          title: milestone.title,
          description: milestone.description,
          tokens: milestone.tokens.toString()
        }
      };

      try {
        await messaging.send(message);
        console.log(`🔔 Achievement notification sent: ${milestone.title}`);
      } catch (error) {
        console.error('Error sending achievement notification:', error);
      }
    }
  }
}

// 📱 HTTP Function to register FCM token
export const registerFCMToken = functions.https.onCall(async (data, context) => {
  const { walletAddress, fcmToken } = data;
  
  if (!walletAddress || !fcmToken) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing walletAddress or fcmToken');
  }
  
  try {
    // Find user by wallet address
    const userRef = db.collection('users').where('walletAddress', '==', walletAddress.toLowerCase()).limit(1);
    const userSnapshot = await userRef.get();
    
    if (!userSnapshot.empty) {
      const userDocRef = userSnapshot.docs[0].ref;
      await userDocRef.update({
        fcmToken: fcmToken,
        fcmTokenUpdated: admin.firestore.Timestamp.now()
      });
      
      console.log(`📱 FCM token registered for user: ${walletAddress}`);
      return { success: true };
    } else {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }
  } catch (error) {
    console.error('Error registering FCM token:', error);
    throw new functions.https.HttpsError('internal', 'Failed to register FCM token');
  }
});