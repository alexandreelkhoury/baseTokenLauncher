import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

// Helper function to check if analytics is available
const isAnalyticsReady = () => {
  return typeof window !== 'undefined' && analytics !== null;
};

// Track page views
export const trackPageView = (pageName: string) => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Track token creation events
export const trackTokenCreation = (tokenData: {
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: number;
  contractAddress?: string;
  network?: string;
}) => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'token_created', {
      token_name: tokenData.name,
      token_symbol: tokenData.symbol,
      total_supply: tokenData.totalSupply,
      decimals: tokenData.decimals,
      contract_address: tokenData.contractAddress,
      network: tokenData.network || 'base'
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Track liquidity addition events
export const trackLiquidityAddition = (liquidityData: {
  poolType: string;
  tokenAmount: string;
  ethAmount: string;
  tokenSymbol: string;
  poolAddress?: string;
}) => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'liquidity_added', {
      pool_type: liquidityData.poolType,
      token_amount: liquidityData.tokenAmount,
      eth_amount: liquidityData.ethAmount,
      token_symbol: liquidityData.tokenSymbol,
      pool_address: liquidityData.poolAddress
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Track wallet connection
export const trackWalletConnection = (walletType: string, address?: string, chainId?: number) => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'wallet_connected', {
      wallet_type: walletType,
      chain_id: chainId,
      // Don't log full address for privacy
      has_address: !!address
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Track user engagement events
export const trackEngagement = (action: string, category: string = 'engagement') => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'user_engagement', {
      engagement_type: action,
      category: category
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Track errors for debugging
export const trackError = (errorMessage: string, errorLocation: string) => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'error_occurred', {
      error_message: errorMessage,
      error_location: errorLocation
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Conversion funnel tracking
export const FUNNEL_STEPS = {
  LANDING_VIEW: 'landing_page_viewed',
  CREATE_CLICKED: 'create_token_clicked',
  FORM_STARTED: 'form_started',
  BASIC_INFO_FILLED: 'basic_info_completed',
  WALLET_CONNECTED: 'wallet_connected_funnel',
  TOKEN_CREATION_INITIATED: 'token_creation_initiated',
  TOKEN_SUCCESS: 'token_created_success',
  TOKEN_FAILED: 'token_creation_failed',
  LIQUIDITY_CLICKED: 'liquidity_clicked',
  LIQUIDITY_FORM_STARTED: 'liquidity_form_started',
  LIQUIDITY_SUCCESS: 'liquidity_added_success',
  LIQUIDITY_FAILED: 'liquidity_failed'
} as const;

export const trackFunnelStep = (step: string, additionalData: Record<string, any> = {}) => {
  if (!isAnalyticsReady()) {
    return;
  }
  
  try {
    logEvent(analytics, 'conversion_funnel', {
      funnel_step: step,
      timestamp: Date.now(),
      page_path: window.location.pathname,
      ...additionalData
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

// Enhanced tracking functions
export const trackCreateTokenClick = (source: string) => {
  trackFunnelStep(FUNNEL_STEPS.CREATE_CLICKED, {
    click_source: source, // 'header', 'hero', 'cta'
  });
};

export const trackFormProgress = (step: string, formData: Record<string, any> = {}) => {
  trackFunnelStep(step, {
    form_completion: Object.keys(formData).filter(key => formData[key]).length,
    has_symbol: !!formData.symbol,
    has_name: !!formData.name,
    has_total_supply: !!formData.totalSupply
  });
};

export const trackTokenResult = (success: boolean, tokenData: any = {}, error: Error | null = null) => {
  const step = success ? FUNNEL_STEPS.TOKEN_SUCCESS : FUNNEL_STEPS.TOKEN_FAILED;
  trackFunnelStep(step, {
    token_symbol: tokenData.symbol,
    total_supply: tokenData.totalSupply,
    error: error?.message,
    contract_address: tokenData.contractAddress
  });
};

export const trackLiquidityResult = (success: boolean, liquidityData: any = {}, error: Error | null = null) => {
  const step = success ? FUNNEL_STEPS.LIQUIDITY_SUCCESS : FUNNEL_STEPS.LIQUIDITY_FAILED;
  trackFunnelStep(step, {
    pool_type: liquidityData.poolType || 'uniswap_v2',
    token_symbol: liquidityData.tokenSymbol,
    error: error?.message
  });
};