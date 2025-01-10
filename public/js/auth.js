// Top-level Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// DOMContentLoaded listener for runtime initialization
document.addEventListener('DOMContentLoaded', function () {
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

    // Attach event handler to form submission
    document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form submission

        const email = document.getElementById('sign-up-email').value.trim();
        const password = document.getElementById('sign-up-password').value.trim();

        if (email === "" || password === "") {
            alert("Email and password cannot be empty.");
            return;
        }

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Success message and UI changes
            alert("Sign-up successful! Welcome, " + user.email);
            document.getElementById('sign-up-container').style.display = 'none';
            document.getElementById('log-in-container').style.display = 'none';
            document.getElementById('join-us-button').style.display = 'none';

            // Redirect to homepage after success
            window.location.href = "/public/index.html";
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Sign-Up Error: ${errorCode} - ${errorMessage}`);
        }
    });
});
