import { useState, useCallback } from 'react'
import { 
  TokenFormData, 
  TokenFormErrors, 
  validateTokenForm, 
  isTokenFormValid, 
  defaultTokenFormData 
} from '../utils/tokenValidation'

/**
 * Custom hook for managing token form state and validation
 * Reduces code duplication between HomePage and CreateTokenPage
 */
export function useTokenForm() {
  const [formData, setFormData] = useState<TokenFormData>(defaultTokenFormData)
  const [formErrors, setFormErrors] = useState<TokenFormErrors>({})

  // Handle input changes with automatic error clearing
  const handleInputChange = useCallback((field: keyof TokenFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [formErrors])

  // Validate form and update errors
  const validateForm = useCallback(() => {
    const errors = validateTokenForm(formData)
    setFormErrors(errors)
    return isTokenFormValid(errors)
  }, [formData])

  // Reset form to defaults
  const resetForm = useCallback(() => {
    setFormData(defaultTokenFormData)
    setFormErrors({})
  }, [])

  // Get current validation state
  const isValid = isTokenFormValid(formErrors)

  return {
    formData,
    formErrors,
    handleInputChange,
    validateForm,
    resetForm,
    isValid,
    setFormData,
    setFormErrors
  }
}