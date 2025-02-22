// Import Firebase Authentication
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// Select relevant DOM elements
const joinButton = document.querySelector(".join-button");
const signUpContainer = document.getElementById("sign-up-container");
const logInContainer = document.getElementById("log-in-container");
const showLoginLink = document.getElementById("show-login");
const showSignUpLink = document.getElementById("show-sign-up");
const signUpForm = document.getElementById("sign-up-form");
const logInForm = document.getElementById("log-in-form");

// Password Fields and Checkboxes
const signUpPasswordInput = document.getElementById("sign-up-password");
const signUpShowPasswordCheckbox = document.getElementById("show-sign-up-password");
const logInPasswordInput = document.getElementById("log-in-password");
const logInShowPasswordCheckbox = document.getElementById("show-log-in-password");

// Helper function to toggle forms
const toggleForm = (showForm, hideForm) => {
  showForm.style.display = "block";
  hideForm.style.display = "none";
};

// Toggle forms (sign-up and log-in)
joinButton.addEventListener("click", () => toggleForm(signUpContainer, logInContainer));
showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm(logInContainer, signUpContainer);
});
showSignUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm(signUpContainer, logInContainer);
});

// Handle "Show Password" functionality
const togglePasswordVisibility = (checkbox, passwordInput) => {
  checkbox.addEventListener("change", () => {
    passwordInput.type = checkbox.checked ? "text" : "password";
  });
};

// Attach "Show Password" toggling to checkboxes
togglePasswordVisibility(signUpShowPasswordCheckbox, signUpPasswordInput);
togglePasswordVisibility(logInShowPasswordCheckbox, logInPasswordInput);

// Handle sign-up form submission
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  // Get email and password values from form
  const email = document.getElementById("sign-up-email").value.trim();
  const password = document.getElementById("sign-up-password").value.trim();

  if (!email || !password) {
    displayMessage(signUpContainer, "Please fill in all fields.");
    return;
  }

  try {
    // Firebase sign-up API call
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);

    // Notify user of success (popup alert)
    alert("Sign-Up Successful! You are being redirected to the homepage.");

    // Redirect to homepage after a brief delay
    window.location.href = "/public/index.html";
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
    displayMessage(signUpContainer, `Error: ${error.message}`);
  }
});

// Helper function to display messages in UI
const displayMessage = (container, message, type = "error") => {
  let messageElement = container.querySelector(".message");
  if (!messageElement) {
    messageElement = document.createElement("div");
    messageElement.className = "message";
    container.appendChild(messageElement);
  }
  messageElement.textContent = message;
  messageElement.style.color = type === "success" ? "green" : "red";
};
