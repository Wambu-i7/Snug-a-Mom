import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { database } from "./config.js";  // Ensure this is the correct path

const postsRef = ref(database, "community-posts");
const postsContainer = document.getElementById("community-posts-container");
const postForm = document.getElementById("post-form");

// Check authentication status
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);  // Log signed-in user email

    // Allow post submission and display posts
    postsContainer.style.display = "block"; // Show posts container
    displayPosts(); // Fetch and display posts

    // Handle new post submissions
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("post-title").value.trim();
      const content = document.getElementById("post-content").value.trim();

      if (title && content) {
        // Save post to Firebase
        push(postsRef, {
          title,
          content,
          timestamp: Date.now(),
        }).then(() => {
          console.log("Post added successfully.");
          displayPosts();  // Refresh posts display after adding
        }).catch((error) => {
          console.error("Post submission error: ", error);
        });
      } else {
        alert("Both title and content are required.");
      }
    });
  } else {
    // Hide posts if user is not signed in
    postsContainer.style.display = "none";
    alert("You need to sign in to view and post content.");
  }
});

// Function to display posts
function displayPosts() {
  console.log("Fetching posts from Firebase...");

  onValue(postsRef, (snapshot) => {
    const posts = snapshot.val();
    postsContainer.innerHTML = "";  // Clear current posts content

    if (posts) {
      console.log("Posts fetched from Firebase:", posts);  // Log the fetched posts data

      Object.keys(posts).forEach((postId) => {
        const post = posts[postId];
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small>Posted at: ${new Date(post.timestamp).toLocaleString()}</small>
        `;
        postsContainer.appendChild(postElement);
      });
    } else {
      postsContainer.innerHTML = "<p>No posts available yet.</p>";
    }
  }, (error) => {
    console.error("Error fetching posts:", error);  // Log any database errors
  });
}
