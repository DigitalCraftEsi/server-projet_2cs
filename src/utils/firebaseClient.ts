import credentials from './credentials';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
export const firebaseAdmin =  admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount)
});