const config = {
  apiKey: "AIzaSyDwZ5N4nHv2K0YcOduPy1ROilL0rVRRoDY",
  authDomain: "friendlychat-84bb9.firebaseapp.com",
  projectId: "friendlychat-84bb9",
  storageBucket: "friendlychat-84bb9.appspot.com",
  messagingSenderId: "159764654676",
  appId: "1:159764654676:web:cd261c6136df2436419bc1"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}