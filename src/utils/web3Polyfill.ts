// Polyfill pour éviter les warnings MetaMask concernant window.web3 déprécié
// Cette polyfill empêche les bibliothèques tierces de déclencher des warnings

declare global {
  interface Window {
    web3?: any;
    ethereum?: any;
  }
}

export function initializeWeb3Polyfill() {
  // Ne fait rien si window.ethereum n'est pas disponible (pas dans un navigateur ou MetaMask non installé)
  if (typeof window === 'undefined' || !window.ethereum) {
    return;
  }

  // Si window.web3 existe déjà, ne pas le remplacer
  if (window.web3) {
    return;
  }

  // Créer un proxy léger qui redirige vers window.ethereum
  // Ceci évite les warnings tout en maintenant la compatibilité
  const web3Proxy = {
    currentProvider: window.ethereum,
    
    // Méthode déprécié mais parfois utilisée par les anciennes bibliothèques
    eth: {
      getAccounts: () => window.ethereum?.request({ method: 'eth_accounts' }),
      sendTransaction: (tx: any) => window.ethereum?.request({ 
        method: 'eth_sendTransaction', 
        params: [tx] 
      }),
    },
    
    // Version info pour compatibility
    version: {
      api: '1.0.0',
      network: 'unknown'
    }
  };

  // Définir le proxy avec un getter qui ne déclenche pas de warning
  Object.defineProperty(window, 'web3', {
    get() {
      return web3Proxy;
    },
    configurable: true,
    enumerable: false
  });
}