import { Analytics, logEvent } from 'firebase/analytics'

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

export const trackPageView = (analytics: Analytics | null, pageName: string) => {
  if (!analytics) return
  
  logEvent(analytics, 'page_view', {
    page_name: pageName
  })
}