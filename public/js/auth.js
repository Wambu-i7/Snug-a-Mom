// Initialize Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Config (you should use your actual Firebase configuration details here)
const firebaseConfig = {
    apiKey: "AIzaSyA6awSEYlpu56pxOqlHX2DmrAe4wvGS4CQ",
    authDomain: "snug-a-mom.firebaseapp.com",
    databaseURL: "https://snug-a-mom-default-rtdb.firebaseio.com",
    projectId: "snug-a-mom",
    storageBucket: "snug-a-mom.firebasestorage.app",
    messagingSenderId: "716177570331",
    appId: "1:716177570331:web:16238bb3973bba8a41d6be"
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-Up Function
document.getElementById('sign-up-form').addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent form submission

    const email = document.getElementById('sign-up-email').value.trim();
    const password = document.getElementById('sign-up-password').value.trim();

    // Ensure both email and password are valid
    if (email === "" || password === "") {
        alert("Email and password cannot be empty.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            alert("Sign-up successful! Welcome, " + user.email);
            document.getElementById('sign-up-container').style.display = 'none';
            document.getElementById('log-in-container').style.display = 'block';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Sign-Up Error: ${errorCode} - ${errorMessage}`);
        });
});

// Login Function
document.getElementById('log-in-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('log-in-email').value.trim();
    const password = document.getElementById('log-in-password').value.trim();

    if (email === "" || password === "") {
        alert("Email and password cannot be empty.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in successfully
            const user = userCredential.user;
            alert("Login successful! Welcome, " + user.email);
            window.location.href = "/";  // Redirect to the homepage after login
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Login Error: ${errorCode} - ${errorMessage}`);
        });
});
