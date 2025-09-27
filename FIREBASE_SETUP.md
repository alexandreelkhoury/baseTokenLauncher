# Firebase Setup for Base Token Launcher

## 🔥 Overview

Firebase has been integrated into your Base Token Launcher application to provide:

- **Firestore Database**: Store token data, user profiles, and liquidity information
- **Authentication**: Anonymous authentication for user sessions
- **Analytics**: Track user interactions and token creation events
- **Storage**: Store token logos and user-generated content
- **Hosting**: Deploy your application to Firebase Hosting

## 📦 Installed Packages

The following Firebase packages have been installed:

```bash
npm install firebase
```

## 🛠️ Configuration

### Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Web3 Configuration
VITE_PRIVY_APP_ID=your-privy-app-id
VITE_BASE_MAINNET_RPC=https://mainnet.base.org
VITE_BASE_SEPOLIA_RPC=https://sepolia.base.org

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCcXwIe247mtVvFFUKQInUgAe3bxNUA9JI
VITE_FIREBASE_AUTH_DOMAIN=base-token-launcher.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=base-token-launcher
VITE_FIREBASE_STORAGE_BUCKET=base-token-launcher.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=822487937652
VITE_FIREBASE_APP_ID=1:822487937652:web:bda3680f4a0df7b2399721
VITE_FIREBASE_MEASUREMENT_ID=G-LZZXFZ3502

# Development Settings
VITE_FIREBASE_USE_PRODUCTION=false
```

## 📁 File Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase initialization and configuration
├── services/
│   └── firebase.ts          # Firebase service functions
├── hooks/
│   └── useFirebase.ts       # React hook for Firebase operations
└── components/
    └── FirebaseProvider.tsx # React context provider
```

## 🚀 Getting Started

### 1. Initialize Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init
```

### 2. Start Development with Emulators (Optional)

```bash
npm run firebase:emulators
```

This will start local emulators for development:
- Firestore: http://localhost:8080
- Authentication: http://localhost:9099
- Storage: http://localhost:9199
- Functions: http://localhost:5001
- Firebase UI: http://localhost:4000

### 3. Use Firebase in Components

```tsx
import { useFirebase } from '../hooks/useFirebase';
import { useFirebaseAnalytics } from '../components/FirebaseProvider';

function MyComponent() {
  const { 
    saveTokenData, 
    userTokens, 
    isAuthenticated 
  } = useFirebase();
  
  const { logAnalyticsEvent } = useFirebaseAnalytics();
  
  const handleCreateToken = async (tokenData) => {
    // Save token to Firebase
    const tokenId = await saveTokenData(tokenData);
    
    // Log analytics event
    logAnalyticsEvent('token_created', {
      token_name: tokenData.name,
      token_symbol: tokenData.symbol
    });
  };
}
```

## 📊 Data Models

### TokenData
```typescript
interface TokenData {
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
}
```

### LiquidityData
```typescript
interface LiquidityData {
  id?: string;
  tokenAddress: string;
  poolAddress?: string;
  tokenAmount: string;
  ethAmount: string;
  userAddress: string;
  chainId: number;
  createdAt: Timestamp;
  transactionHash: string;
  fee: number;
}
```

### UserProfile
```typescript
interface UserProfile {
  uid: string;
  walletAddress?: string;
  displayName?: string;
  email?: string;
  createdAt: Timestamp;
  totalTokensCreated: number;
  totalLiquidityAdded: number;
  preferences?: {
    defaultChainId: number;
    notifications: boolean;
  };
}
```

## 🔧 Available Services

### Authentication
- `signInAnonymous()`: Sign in anonymously
- `signOut()`: Sign out user
- `onAuthStateChange()`: Listen to auth state changes

### Token Services
- `saveToken()`: Save token data
- `getToken()`: Get token by ID
- `getUserTokens()`: Get all tokens for a user
- `updateToken()`: Update token information
- `subscribeToUserTokens()`: Real-time token updates

### Liquidity Services
- `saveLiquidity()`: Save liquidity data
- `getUserLiquidity()`: Get user's liquidity positions

### User Profile Services
- `createUserProfile()`: Create user profile
- `getUserProfile()`: Get user profile
- `updateUserProfile()`: Update user profile

### File Upload Services
- `uploadFile()`: Upload files to Firebase Storage
- `deleteFile()`: Delete files from storage

## 📈 Analytics Events

The following analytics events are automatically tracked:

- `app_initialize`: When the app starts
- `token_created`: When a token is successfully created
- `liquidity_added`: When liquidity is added
- `wallet_connected`: When user connects wallet

## 🛡️ Security Rules

### Firestore Rules
- Users can read/write their own profiles
- Tokens are publicly readable, writable by authenticated deployers
- Liquidity data follows same pattern

### Storage Rules
- Token logos: Public read, authenticated write (2MB limit)
- User uploads: Owner access only (5MB limit)
- Public assets: Read-only for users

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
# Build and deploy
npm run firebase:build

# Deploy only hosting
firebase deploy --only hosting

# Deploy everything
npm run firebase:deploy
```

### Deploy Rules Only

```bash
npm run firebase:rules
```

## 🔍 Monitoring

### Firebase Console
- Visit [Firebase Console](https://console.firebase.google.com/)
- Select your project: `base-token-launcher`
- Monitor usage, analytics, and performance

### Analytics Dashboard
- View user engagement metrics
- Track token creation trends
- Monitor application performance

## 🧪 Development Tips

### Using Emulators
1. Start emulators: `npm run firebase:emulators`
2. Set `VITE_FIREBASE_USE_PRODUCTION=false` in your `.env`
3. All Firebase operations will use local emulators
4. Access Firebase UI at http://localhost:4000

### Production vs Development
- Development: Uses local emulators (when configured)
- Production: Uses Firebase cloud services
- Toggle with `VITE_FIREBASE_USE_PRODUCTION` environment variable

### Data Indexing
- Firestore indexes are configured in `firestore.indexes.json`
- Optimized for common queries (user tokens, liquidity, etc.)
- Deploy indexes with your rules: `npm run firebase:rules`

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

## 🎯 Next Steps

1. **Set up your .env file** with the provided configuration
2. **Test the integration** by creating a token and checking Firebase Console
3. **Customize analytics** by adding more events as needed
4. **Deploy to production** when ready using Firebase Hosting
5. **Monitor usage** through Firebase Console and Analytics

Your Firebase integration is now complete and ready for production! 🎉