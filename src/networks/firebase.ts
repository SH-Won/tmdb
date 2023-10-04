// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID.trim(),
}
