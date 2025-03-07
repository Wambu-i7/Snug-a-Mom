import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
const auth = getAuth(app);
const database = getDatabase(app);
const postsRef = ref(database, "community-posts");

// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("postForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (title && content) {
      push(postsRef, {
        title,
        content,
        timestamp: Date.now(),
      });
      document.getElementById("postForm").reset();
    } else {
      alert("Both title and content are required.");
    }
  });

  document.getElementById('sign-up-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        document.getElementById('sign-up-container').style.display = 'none';
        document.getElementById('log-in-container').style.display = 'block';
      })
      .catch((error) => {
        console.log("Error:", error.code, error.message);
      });
  });

  document.getElementById('log-in-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log-in-email').value;
    const password = document.getElementById('log-in-password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/public/index.html";
      })
      .catch((error) => {
        console.log("Error:", error.code, error.message);
      });
  });

  document.getElementById('show-sign-up')?.addEventListener('click', () => {
    document.getElementById('log-in-container').style.display = 'none';
    document.getElementById('sign-up-container').style.display = 'block';
  });

  document.getElementById('show-login')?.addEventListener('click', () => {
    document.getElementById('sign-up-container').style.display = 'none';
    document.getElementById('log-in-container').style.display = 'block';
  });
});
