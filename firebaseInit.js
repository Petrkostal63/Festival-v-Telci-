// ── Firebase initialization ───────────────────────────────
// Replace the placeholder values below with your actual Firebase project credentials.
// You can find them in Firebase Console → Project Settings → Your apps → Web app → Config

var firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "festival-v-telci.firebaseapp.com",
  projectId:         "festival-v-telci",
  storageBucket:     "festival-v-telci.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID",
  measurementId:     "YOUR_MEASUREMENT_ID"
};

try {
  firebase.initializeApp(firebaseConfig);
  window._fbAuth = firebase.auth();
  window._fbDb   = firebase.firestore();
  window._fbReady = true;
} catch (e) {
  console.warn('[FvT Firebase] Initialization failed. Fill in firebaseInit.js with real credentials.', e);
  window._fbReady = false;
}
