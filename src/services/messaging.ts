import { getToken, onMessage, MessagePayload } from 'firebase/messaging';
import { messaging } from '../config/firebase';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

export interface NotificationPayload {
  title: string;
  body: string;
  data?: { [key: string]: string };
}

class MessagingService {
  private vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

  // Request notification permission and get FCM token
  async requestPermission(walletAddress: string): Promise<string | null> {
    if (!messaging) {
      console.warn('Firebase Messaging not supported');
      return null;
    }

    try {
      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('Notification permission granted');
        
        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey: this.vapidKey || 'your-default-vapid-key'
        });
        
        if (token) {
          console.log('FCM token obtained:', token);
          
          // Register token with backend
          await this.registerToken(walletAddress, token);
          
          return token;
        } else {
          console.log('No registration token available');
          return null;
        }
      } else {
        console.log('Notification permission denied');
        return null;
      }
    } catch (error) {
      console.error('Error getting notification permission:', error);
      return null;
    }
  }

  // Register FCM token with Firebase Functions
  private async registerToken(walletAddress: string, fcmToken: string): Promise<void> {
    try {
      const registerFCMToken = httpsCallable(functions, 'registerFCMToken');
      await registerFCMToken({
        walletAddress: walletAddress.toLowerCase(),
        fcmToken: fcmToken
      });
      
      console.log('FCM token registered successfully');
    } catch (error) {
      console.error('Error registering FCM token:', error);
    }
  }

  // Set up foreground message listener
  setupForegroundListener(): void {
    if (!messaging) return;

    onMessage(messaging, (payload: MessagePayload) => {
      console.log('Foreground message received:', payload);
      
      // Handle foreground notification
      this.showForegroundNotification(payload);
    });
  }

  // Show notification when app is in foreground
  private showForegroundNotification(payload: MessagePayload): void {
    const { title, body } = payload.notification || {};
    
    if (title && body) {
      // Create and show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
          body: body,
          icon: '/LOGO.png',
          badge: '/LOGO.png',
          tag: payload.data?.type || 'general',
          data: payload.data
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
          
          // Handle notification click based on type
          this.handleNotificationClick(payload.data);
        };

        // Auto close after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
      
      // Also show toast notification in the app
      this.showToastNotification(title, body, payload.data?.type);
    }
  }

  // Handle notification click actions
  private handleNotificationClick(data?: { [key: string]: string }): void {
    if (!data) return;

    switch (data.type) {
      case 'token_created':
        if (data.tokenId) {
          // Navigate to token details
          window.location.href = `/tokens#${data.tokenId}`;
        }
        break;
      case 'liquidity_added':
        // Navigate to liquidity page
        window.location.href = '/liquidity';
        break;
      case 'achievement':
        // Show achievement modal or navigate to profile
        window.location.href = '/profile';
        break;
      default:
        // Default action
        window.location.href = '/';
    }
  }

  // Show in-app toast notification
  private showToastNotification(title: string, body: string, type?: string): void {
    // This would integrate with your toast system
    // For now, we'll use browser notification API
    console.log(`Toast: ${title} - ${body} (${type})`);
    
    // You can dispatch a custom event that your toast system can listen to
    window.dispatchEvent(new CustomEvent('firebaseNotification', {
      detail: { title, body, type }
    }));
  }

  // Send test notification (for development)
  async sendTestNotification(walletAddress: string): Promise<void> {
    // This would call a cloud function to send a test notification
    try {
      const testNotification = httpsCallable(functions, 'sendTestNotification');
      await testNotification({ walletAddress: walletAddress.toLowerCase() });
      console.log('Test notification sent');
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  }
}

export const messagingService = new MessagingService();