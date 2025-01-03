
// post.js
import { database } from "./config.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const postsRef = ref(database, "community-posts");
const postsContainer = document.getElementById("community-posts-container");

onValue(postsRef, (snapshot) => {
  const posts = snapshot.val();
  postsContainer.innerHTML = "";
  if (posts) {
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
});

document.getElementById("post-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  if (title && content) {
    push(postsRef, { title, content, timestamp: Date.now() }).then(() => {
      console.log("Post added successfully.");
    }).catch((error) => {
      console.error("Post submission error: ", error);
    });
  } else {
    alert("Both title and content are required.");
  }
});
