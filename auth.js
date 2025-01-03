// auth.js
import { auth } from "./firebase/config.js";

// Sign-Up Functionality
document.getElementById("sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.querySelector("input[name='email']").value;
  const password = e.target.querySelector("input[name='password']").value;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert("Sign-Up Successful!");
  } catch (error) {
    alert(`Sign-Up Error: ${error.message}`);
  }
});

// Log-In Functionality
document.getElementById("log-in-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.querySelector("input[name='email']").value;
  const password = e.target.querySelector("input[name='password']").value;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    alert("Log-In Successful!");
    window.location.href = "/";
  } catch (error) {
    alert(`Log-In Error: ${error.message}`);
  }
});
