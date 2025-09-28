import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Analytics } from 'firebase/analytics'
import { analytics } from '../config/firebase'

interface FirebaseContextType {
  analytics: Analytics | null
}

const FirebaseContext = createContext<FirebaseContextType>({ analytics: null })

export const useFirebaseAnalytics = () => {
  const context = useContext(FirebaseContext)
  return context.analytics
}

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyticsInstance, setAnalyticsInstance] = useState<Analytics | null>(null)

  useEffect(() => {
    analytics.then(instance => {
      setAnalyticsInstance(instance)
    })
  }, [])

  return (
    <FirebaseContext.Provider value={{ analytics: analyticsInstance }}>
      {children}
    </FirebaseContext.Provider>
  )
}