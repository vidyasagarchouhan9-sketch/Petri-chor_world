importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCcowY_FOYnXUGIb8HqPT2X6Bwp62Rq1s8",
  authDomain: "petri-chor-world.firebaseapp.com",
  projectId: "petri-chor-world",
  storageBucket: "petri-chor-world.firebasestorage.app",
  messagingSenderId: "380703206428",
  appId: "1:380703206428:web:e312d344e50689949183d9"
});

const messaging = firebase.messaging();
