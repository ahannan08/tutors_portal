// helpers/createNotification.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../context/firebase';

export const createNotification = async ({
  senderId,
  recipientId,
  message,
  type,
  status = 'unread',
  timestamp = new Date().toISOString(),
}) => {
  try {
    const notificationRef = doc(db, 'notifications', `${recipientId}_${timestamp}`);
    const notificationData = {
      senderId,
      recipientId,
      message,
      type,
      status,
      timestamp,
    };

    await setDoc(notificationRef, notificationData);
    console.log('✅ Notification created successfully');
  } catch (error) {
    console.error('❌ Error creating notification:', error);
  }
};
