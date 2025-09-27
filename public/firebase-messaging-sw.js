// Firebase messaging service worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase app in service worker
const firebaseConfig = {
  apiKey: "AIzaSyCcXwIe247mtVvFFUKQInUgAe3bxNUA9JI",
  authDomain: "base-token-launcher.firebaseapp.com",
  projectId: "base-token-launcher",
  storageBucket: "base-token-launcher.firebasestorage.app",
  messagingSenderId: "822487937652",
  appId: "1:822487937652:web:bda3680f4a0df7b2399721",
  measurementId: "G-LZZXFZ3502"
};

firebase.initializeApp(firebaseConfig);

// Get messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const { title, body, icon } = payload.notification || {};
  const notificationTitle = title || 'Base Token Creator';
  const notificationOptions = {
    body: body || 'You have a new notification',
    icon: icon || '/LOGO.png',
    badge: '/LOGO.png',
    tag: payload.data?.type || 'general',
    data: payload.data,
    actions: getNotificationActions(payload.data?.type),
    requireInteraction: false,
    silent: false
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Get notification actions based on type
function getNotificationActions(type) {
  switch (type) {
    case 'token_created':
      return [
        {
          action: 'view_token',
          title: '👀 View Token'
        },
        {
          action: 'add_liquidity',
          title: '💧 Add Liquidity'
        }
      ];
    case 'liquidity_added':
      return [
        {
          action: 'view_liquidity',
          title: '📊 View Pool'
        }
      ];
    case 'achievement':
      return [
        {
          action: 'view_achievements',
          title: '🏆 View Achievements'
        }
      ];
    default:
      return [
        {
          action: 'open_app',
          title: '🚀 Open App'
        }
      ];
  }
}

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  const { action } = event;
  const { data } = event.notification;
  
  // Determine URL based on action and data
  let url = '/';
  
  switch (action) {
    case 'view_token':
      url = data?.tokenId ? `/tokens#${data.tokenId}` : '/tokens';
      break;
    case 'add_liquidity':
      url = '/liquidity';
      break;
    case 'view_liquidity':
      url = '/liquidity';
      break;
    case 'view_achievements':
      url = '/profile';
      break;
    case 'open_app':
    default:
      url = '/';
      break;
  }
  
  // Focus or open app window
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to focus existing window
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          client.navigate(url);
          return client.focus();
        }
      }
      
      // Open new window if no existing window found
      if (clients.openWindow) {
        return clients.openWindow(self.location.origin + url);
      }
    })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event.notification.tag);
  
  // Track notification close events
  // Could send analytics here
});