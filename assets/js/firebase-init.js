// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTmGYVyDuiRg_bAZ_RO17HQGqm-hJa-h8",
    authDomain: "gamehub-91d29.firebaseapp.com",
    projectId: "gamehub-91d29",
    storageBucket: "gamehub-91d29.firebasestorage.app",
    messagingSenderId: "67437817081",
    appId: "1:67437817081:web:9f80aaf2c5ec5fb51a4628",
    measurementId: "G-JXH6LZWHSX"
};

// Initialize Firebase using Compat SDK
firebase.initializeApp(firebaseConfig);

// Export/Expose database
const db = firebase.database();
window.db = db;
