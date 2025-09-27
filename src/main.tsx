import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeWeb3Polyfill } from './utils/web3Polyfill'

// Initialiser la polyfill web3 pour éviter les warnings MetaMask
initializeWeb3Polyfill()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
