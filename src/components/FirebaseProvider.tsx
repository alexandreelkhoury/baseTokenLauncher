import { createContext, useContext, useEffect, ReactNode } from 'react';
import { analytics } from '../config/firebase';
import { logEvent, setUserProperties, setUserId } from 'firebase/analytics';
import { useAccount } from 'wagmi';

interface FirebaseContextType {
  logAnalyticsEvent: (eventName: string, parameters?: { [key: string]: any }) => void;
  setUserAnalyticsProperties: (properties: { [key: string]: any }) => void;
  trackTokenCreation: (tokenData: any) => void;
  trackLiquidityEvent: (eventType: 'add' | 'remove', data: any) => void;
  trackPageView: (pageName: string) => void;
  trackWalletConnection: (address: string, chainId: number) => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const { address, chainId } = useAccount();

  // Set user ID when wallet connects
  useEffect(() => {
    if (address && analytics) {
      try {
        setUserId(analytics, address);
        setUserProperties(analytics, {
          chain_id: chainId,
          wallet_connected: true
        });
      } catch (error) {
        console.warn('Failed to set analytics user properties:', error);
      }
    }
  }, [address, chainId]);

  const logAnalyticsEvent = (eventName: string, parameters?: { [key: string]: any }) => {
    if (!analytics) return;
    try {
      logEvent(analytics, eventName, parameters);
    } catch (error) {
      console.warn('Analytics event failed:', error);
    }
  };

  const setUserAnalyticsProperties = (properties: { [key: string]: any }) => {
    if (!analytics) return;
    try {
      setUserProperties(analytics, properties);
    } catch (error) {
      console.warn('Analytics properties failed:', error);
    }
  };

  const trackTokenCreation = (tokenData: any) => {
    logAnalyticsEvent('token_created', {
      token_name: tokenData.name,
      token_symbol: tokenData.symbol,
      decimals: tokenData.decimals,
      contract_address: tokenData.contractAddress
    });
  };

  const trackLiquidityEvent = (eventType: 'add' | 'remove', data: any) => {
    logAnalyticsEvent(`liquidity_${eventType}`, {
      pool_type: data.poolType || 'uniswap_v2',
      token_symbol: data.tokenSymbol,
      token_amount: data.tokenAmount,
      eth_amount: data.ethAmount
    });
  };

  const trackPageView = (pageName: string) => {
    logAnalyticsEvent('page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  };

  const trackWalletConnection = (walletAddress: string, walletChainId: number) => {
    logAnalyticsEvent('wallet_connected', {
      chain_id: walletChainId,
      has_address: !!walletAddress
    });
  };

  return (
    <FirebaseContext.Provider value={{
      logAnalyticsEvent,
      setUserAnalyticsProperties,
      trackTokenCreation,
      trackLiquidityEvent,
      trackPageView,
      trackWalletConnection
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseAnalytics = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebaseAnalytics must be used within a FirebaseProvider');
  }
  return context;
};