import { useFirebaseAnalytics } from '../components/FirebaseProvider'
import { Navigate } from 'react-router-dom'

/**
 * Legacy GuidePage - redirects to new separate pages structure
 * /guide -> /guides (main redirect)
 * 
 * This maintains backward compatibility for any existing links
 */
export default function GuidePage() {
  // Redirect to the new guides page
  return <Navigate to="/guides" replace />
}