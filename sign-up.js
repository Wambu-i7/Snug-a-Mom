// sign-up.js
const joinButton = document.querySelector(".join-button");
const signUpContainer = document.getElementById("sign-up-container");
const logInContainer = document.getElementById("log-in-container");
const showLoginLink = document.getElementById("show-login");
const showSignUpLink = document.getElementById("show-sign-up");

const toggleForm = (showForm, hideForm) => {
  showForm.style.display = "block";
  hideForm.style.display = "none";
};

// Toggle Forms
joinButton.addEventListener("click", () => toggleForm(signUpContainer, logInContainer));
showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm(logInContainer, signUpContainer);
});
showSignUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm(signUpContainer, logInContainer);
});
