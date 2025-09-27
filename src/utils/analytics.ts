import { Analytics, logEvent } from 'firebase/analytics'

// Page tracking
export const trackPageView = (analytics: Analytics | null, pageName: string) => {
  if (!analytics) return
  
  logEvent(analytics, 'page_view', {
    page_name: pageName
  })
}

// Token creation tracking
export const trackTokenCreation = (analytics: Analytics | null, tokenData: {
  name: string
  symbol: string
  supply: string
  network: string
}) => {
  if (!analytics) return
  
  logEvent(analytics, 'token_created', {
    token_name: tokenData.name,
    token_symbol: tokenData.symbol,
    total_supply: tokenData.supply,
    network: tokenData.network
  })
}

export const trackTokenResult = (analytics: Analytics | null, result: {
  success: boolean
  tokenAddress?: string
  error?: string
}) => {
  if (!analytics) return
  
  logEvent(analytics, 'token_deployment_result', {
    success: result.success,
    token_address: result.tokenAddress,
    error: result.error
  })
}

// Liquidity tracking
export const trackLiquidityAdded = (analytics: Analytics | null, data: {
  tokenAddress: string
  tokenAmount: string
  ethAmount: string
  network: string
}) => {
  if (!analytics) return
  
  logEvent(analytics, 'liquidity_added', {
    token_address: data.tokenAddress,
    token_amount: data.tokenAmount,
    eth_amount: data.ethAmount,
    network: data.network
  })
}

export const trackLiquidityRemoved = (analytics: Analytics | null, data: {
  tokenAddress: string
  lpTokenAmount: string
  network: string
}) => {
  if (!analytics) return
  
  logEvent(analytics, 'liquidity_removed', {
    token_address: data.tokenAddress,
    lp_token_amount: data.lpTokenAmount,
    network: data.network
  })
}

// User interaction tracking
export const trackWalletConnect = (analytics: Analytics | null, walletType: string) => {
  if (!analytics) return
  
  logEvent(analytics, 'wallet_connected', {
    wallet_type: walletType
  })
}

export const trackWalletDisconnect = (analytics: Analytics | null) => {
  if (!analytics) return
  
  logEvent(analytics, 'wallet_disconnected')
}

export const trackNetworkSwitch = (analytics: Analytics | null, fromNetwork: string, toNetwork: string) => {
  if (!analytics) return
  
  logEvent(analytics, 'network_switched', {
    from_network: fromNetwork,
    to_network: toNetwork
  })
}

// Error tracking
export const trackError = (analytics: Analytics | null, errorData: {
  error_type: string
  error_message: string
  error_location: string
  user_action?: string
}) => {
  if (!analytics) return
  
  logEvent(analytics, 'error_occurred', {
    error_type: errorData.error_type,
    error_message: errorData.error_message.slice(0, 100), // Truncate long messages
    error_location: errorData.error_location,
    user_action: errorData.user_action
  })
}

// User engagement tracking
export const trackButtonClick = (analytics: Analytics | null, buttonName: string, location: string) => {
  if (!analytics) return
  
  logEvent(analytics, 'button_clicked', {
    button_name: buttonName,
    location: location
  })
}

export const trackFormSubmission = (analytics: Analytics | null, formName: string, success: boolean) => {
  if (!analytics) return
  
  logEvent(analytics, 'form_submitted', {
    form_name: formName,
    success: success
  })
}