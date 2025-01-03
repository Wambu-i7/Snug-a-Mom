
// config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6awSEYlpu56pxOqlHX2DmrAe4wvGS4CQ",
  authDomain: "snug-a-mom.firebaseapp.com",
  databaseURL: "https://snug-a-mom-default-rtdb.firebaseio.com",
  projectId: "snug-a-mom",
  storageBucket: "snug-a-mom.firebasestorage.app",
  messagingSenderId: "716177570331",
  appId: "1:716177570331:web:16238bb3973bba8a41d6be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
