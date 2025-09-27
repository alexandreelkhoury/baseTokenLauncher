import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { 
  signInAnonymously, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '../config/firebase';

// Types for your application data
export interface TokenData {
  id?: string;
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  deployerAddress: string;
  chainId: number;
  deployedAt: Timestamp;
  transactionHash: string;
  verified?: boolean;
  logoUrl?: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export interface LiquidityData {
  id?: string;
  tokenAddress: string;
  poolAddress?: string;
  tokenAmount: string;
  ethAmount: string;
  userAddress: string;
  chainId: number;
  createdAt: Timestamp;
  transactionHash: string;
  fee: number; // Uniswap V3 fee tier
  tickLower?: number;
  tickUpper?: number;
}

export interface UserProfile {
  uid: string;
  walletAddress?: string;
  displayName?: string;
  email?: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  totalTokensCreated: number;
  totalLiquidityAdded: number;
  preferences?: {
    defaultChainId: number;
    notifications: boolean;
    emailUpdates: boolean;
  };
}

// Authentication Services - DISABLED (using wallet connection only)
export const signInAnonymous = async (): Promise<User | null> => {
  // Anonymous authentication removed - users connect with wallet instead
  console.log('Anonymous authentication disabled - using wallet connection');
  return null;
};

export const signOut = async (): Promise<boolean> => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    console.error('Sign out failed:', error);
    return false;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Token Services
export const saveToken = async (tokenData: Omit<TokenData, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'tokens'), {
      ...tokenData,
      deployedAt: serverTimestamp()
    });
    console.log('Token saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving token:', error);
    return null;
  }
};

export const getToken = async (tokenId: string): Promise<TokenData | null> => {
  try {
    const docRef = doc(db, 'tokens', tokenId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TokenData;
    } else {
      console.log('No such token!');
      return null;
    }
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const getUserTokens = async (userAddress: string, chainId?: number): Promise<TokenData[]> => {
  try {
    let q = query(
      collection(db, 'tokens'),
      where('deployerAddress', '==', userAddress),
      orderBy('deployedAt', 'desc')
    );
    
    if (chainId) {
      q = query(
        collection(db, 'tokens'),
        where('deployerAddress', '==', userAddress),
        where('chainId', '==', chainId),
        orderBy('deployedAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    const tokens: TokenData[] = [];
    
    querySnapshot.forEach((doc) => {
      tokens.push({ id: doc.id, ...doc.data() } as TokenData);
    });
    
    return tokens;
  } catch (error) {
    console.error('Error getting user tokens:', error);
    return [];
  }
};

export const updateToken = async (tokenId: string, updates: Partial<TokenData>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'tokens', tokenId);
    await updateDoc(docRef, updates);
    return true;
  } catch (error) {
    console.error('Error updating token:', error);
    return false;
  }
};

// Liquidity Services
export const saveLiquidity = async (liquidityData: Omit<LiquidityData, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'liquidity'), {
      ...liquidityData,
      createdAt: serverTimestamp()
    });
    console.log('Liquidity saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving liquidity:', error);
    return null;
  }
};

export const getUserLiquidity = async (userAddress: string, chainId?: number): Promise<LiquidityData[]> => {
  try {
    let q = query(
      collection(db, 'liquidity'),
      where('userAddress', '==', userAddress),
      orderBy('createdAt', 'desc')
    );
    
    if (chainId) {
      q = query(
        collection(db, 'liquidity'),
        where('userAddress', '==', userAddress),
        where('chainId', '==', chainId),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    const liquidityEntries: LiquidityData[] = [];
    
    querySnapshot.forEach((doc) => {
      liquidityEntries.push({ id: doc.id, ...doc.data() } as LiquidityData);
    });
    
    return liquidityEntries;
  } catch (error) {
    console.error('Error getting user liquidity:', error);
    return [];
  }
};

// User Profile Services
export const createUserProfile = async (uid: string, profileData: Partial<UserProfile>): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      uid,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      totalTokensCreated: 0,
      totalLiquidityAdded: 0,
      preferences: {
        defaultChainId: 8453, // Base mainnet
        notifications: true,
        emailUpdates: false
      },
      ...profileData
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log('No user profile found!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      lastLoginAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// File Upload Services (for token logos, etc.)
export const uploadFile = async (
  file: File, 
  path: string, 
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('File uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const deleteFile = async (path: string): Promise<boolean> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Real-time listeners
export const subscribeToUserTokens = (
  userAddress: string, 
  callback: (tokens: TokenData[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'tokens'),
    where('deployerAddress', '==', userAddress),
    orderBy('deployedAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
    const tokens: TokenData[] = [];
    querySnapshot.forEach((doc) => {
      tokens.push({ id: doc.id, ...doc.data() } as TokenData);
    });
    callback(tokens);
  });
};

// Analytics and Statistics
export const getTokenStats = async (contractAddress: string) => {
  try {
    const q = query(
      collection(db, 'tokens'),
      where('contractAddress', '==', contractAddress)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    const tokenDoc = querySnapshot.docs[0];
    const tokenData = tokenDoc.data() as TokenData;
    
    // Get liquidity data for this token
    const liquidityQuery = query(
      collection(db, 'liquidity'),
      where('tokenAddress', '==', contractAddress)
    );
    
    const liquiditySnapshot = await getDocs(liquidityQuery);
    const liquidityData: LiquidityData[] = [];
    
    liquiditySnapshot.forEach((doc) => {
      liquidityData.push(doc.data() as LiquidityData);
    });
    
    return {
      token: tokenData,
      liquidity: liquidityData,
      totalLiquidityPools: liquidityData.length,
      totalLiquidityValue: liquidityData.reduce((sum, liq) => sum + parseFloat(liq.ethAmount), 0)
    };
  } catch (error) {
    console.error('Error getting token stats:', error);
    return null;
  }
};

export const getGlobalStats = async () => {
  try {
    // Get total tokens created
    const tokensQuery = query(collection(db, 'tokens'));
    const tokensSnapshot = await getDocs(tokensQuery);
    
    // Get total liquidity added
    const liquidityQuery = query(collection(db, 'liquidity'));
    const liquiditySnapshot = await getDocs(liquidityQuery);
    
    // Get active users (users who created tokens in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentTokensQuery = query(
      collection(db, 'tokens'),
      where('deployedAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
    );
    const recentTokensSnapshot = await getDocs(recentTokensQuery);
    
    const uniqueDeployers = new Set();
    recentTokensSnapshot.forEach((doc) => {
      const data = doc.data();
      uniqueDeployers.add(data.deployerAddress);
    });
    
    return {
      totalTokens: tokensSnapshot.size,
      totalLiquidityPools: liquiditySnapshot.size,
      activeUsers: uniqueDeployers.size,
      tokensCreatedLast30Days: recentTokensSnapshot.size
    };
  } catch (error) {
    console.error('Error getting global stats:', error);
    return null;
  }
};