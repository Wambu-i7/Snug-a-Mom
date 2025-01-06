import { auth } from "./config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Sign-Up Functionality
document.getElementById("sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.querySelector("input[name='email']").value;
  const password = e.target.querySelector("input[name='password']").value;

  try {
    // Check if user already exists by trying to sign in
    await signInWithEmailAndPassword(auth, email, password);
    alert("User already exists! You are signed in.");
  } catch (signInError) {
    if (signInError.code === "auth/user-not-found") {
      // If user doesn't exist, create a new one
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign-Up Successful! You are now signed up.");
    } else {
      alert(`Sign-Up Error: ${signInError.message}`);
    }
  }
});

// Log-In Functionality
document.getElementById("log-in-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.querySelector("input[name='email']").value;
  const password = e.target.querySelector("input[name='password']").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Log-In Successful!");
    window.location.href = "/";
  } catch (error) {
    alert(`Log-In Error: ${error.message}`);
  }
});
