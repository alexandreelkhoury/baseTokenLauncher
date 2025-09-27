// Token form validation utilities
// Shared between HomePage and CreateTokenPage to avoid code duplication

export interface TokenFormData {
  name: string
  symbol: string
  decimals: number
  totalSupply: string
}

export interface TokenFormErrors {
  name?: string
  symbol?: string
  decimals?: string
  totalSupply?: string
}

/**
 * Validates token form data and returns validation errors
 * Used across HomePage and CreateTokenPage for consistent validation
 */
export const validateTokenForm = (formData: TokenFormData): TokenFormErrors => {
  const errors: TokenFormErrors = {}
  
  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Token name is required'
  } else if (formData.name.length > 50) {
    errors.name = 'Token name must be 50 characters or less'
  }
  
  // Symbol validation
  if (!formData.symbol.trim()) {
    errors.symbol = 'Token symbol is required'
  } else if (formData.symbol.length > 10) {
    errors.symbol = 'Symbol must be 10 characters or less'
  } else if (!/^[A-Z0-9]+$/.test(formData.symbol)) {
    errors.symbol = 'Symbol can only contain uppercase letters and numbers'
  }
  
  // Total supply validation
  if (!formData.totalSupply.trim()) {
    errors.totalSupply = 'Total supply is required'
  } else if (isNaN(Number(formData.totalSupply)) || Number(formData.totalSupply) <= 0) {
    errors.totalSupply = 'Total supply must be a positive number'
  } else if (Number(formData.totalSupply) > 1e18) {
    errors.totalSupply = 'Total supply is too large'
  }
  
  // Decimals validation
  if (formData.decimals < 0 || formData.decimals > 18) {
    errors.decimals = 'Decimals must be between 0 and 18'
  }
  
  return errors
}

/**
 * Checks if the form has any validation errors
 */
export const isTokenFormValid = (errors: TokenFormErrors): boolean => {
  return Object.keys(errors).length === 0
}

/**
 * Default token form data
 */
export const defaultTokenFormData: TokenFormData = {
  name: '',
  symbol: '',
  decimals: 18,
  totalSupply: '1000000000'
}