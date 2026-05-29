async function registerUser() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  

  const response = await fetch("https://blog-backend-ashen-eight.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: name,
      email: email,
      password: password
    })
  });

  const data = await response.json();
  console.log(data);
  alert(JSON.stringify(data, null,2));
}
async function loginUser() {

  const email =
  document.getElementById("login-email").value;
   
  localStorage.setItem("userEmail", 
    email);

  const password =
  document.getElementById("login-password").value;

  const response = await fetch("https://blog-backend-ashen-eight.vercel.app/login", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      email,
      password
    })

  });

  const data = await response.json();

  alert(data.message || data);

  localStorage.setItem("username", email.split("@")[0]);

  if(data.token){

    localStorage.setItem("token", data.token);

    window.location.href = "dashboard.html";
  }

}

async function createPost() {
  const title = 
  document.getElementById("title").value;
  const content = 
  document.getElementById("content").value;
  
  

  

  const response = await fetch("https://blog-backend-ashen-eight.vercel.app/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      content: content,
      author:
  localStorage.getItem("username"),
     
    })
  });

  const data = await response.json();
  alert("Post Created Successfully!");
  window.location.href = "dashboard.html";
}
async function addComment(button) {

  const card = button.parentElement;
  const textarea = card.querySelector("textarea");
  const commentsDiv = card.querySelector(".comments");

  const commentText = textarea.value;

  if(commentText === "") {
    alert("Write a comment");
    return;
  }

  const response = await fetch("https://blog-backend-ashen-eight.vercel.app/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      comment: commentText,
      username: "Dev",
      postId: "123"
    })
  });

  const data = await response.json();

  const p = document.createElement("p");
  p.innerText = "💬 " + commentText;

  commentsDiv.appendChild(p);

  textarea.value = "";

  alert("Comment Added");
}
async function showPosts() {
  const response = await fetch("https://blog-backend-ashen-eight.vercel.app/posts");
  const posts = await response.json();

  const postList = document.getElementById("post-list");
  if (!postList) return;

  postList.innerHTML = "";

  posts.forEach(post => {
    postList.innerHTML += `
<div class="card"
 data-category="$
{post.category?.toLowerCase()}">
  <h3>${post.title || "No Title"}</h3>
  <p>${post.content || "No Content"}</p>
  <p><b>Author:</b> ${post.author || "Dev Shilpkar"}</p>
  <p><b>Category:</b> ${post.category || "General"}</p>

  <p>❤️ ${post.likes || 0}</p>
  <button onclick="likePost('${post._id}')">Like</button>

  <textarea placeholder="Write a comment"></textarea>
  <button onclick="addComment(this)">Comment</button>
  <div class="comments"></div>

</div>
`;

  });
}
async function likePost(id){

  await fetch(`https://blog-backend-ashen-eight.vercel.app/like-post/${id}`,{
    method:"PUT"
  });

  showPosts();

}
async function editPost(id) {
  const title = prompt("Enter new title:");
  const content = prompt("Enter new content:");

  const response = await fetch(`https://blog-backend-ashen-eight.vercel.app/edit-post/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  const data = await response.json();
  alert(data);
  showPosts();
}
async function deletePost(id) {
  const response = await fetch(`https://blog-backend-ashen-eight.vercel.app/delete-post/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();
  alert(data);
  showPosts();
}
showPosts();
async function loadPosts() {

  const response = await fetch("https://blog-backend-ashen-eight.vercel.app/posts");
  const posts = await response.json();

  const postList = document.getElementById("post-list");
  if (!postList) return;

  postList.innerHTML = "";

  posts.forEach((post) => {

    postList.innerHTML += `
    
    <div class="card">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <p><b>Author:</b> ${post.author}</p>
    </div>

    `;
  });
}

loadPosts();
function logout() {
  alert("Logged out successfully");
  window.location.href = "login.html";
  
}

function searchPosts() {

    const input = document.getElementById("search").value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const title = card.innerText.toLowerCase();

        if(title.includes(input)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

function toggleTheme(){

  document.body.classList.toggle("light-mode");

}
function checkLogin() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
    }
}

function openBlog(event) {

const card = event.target.closest(".card");

if (!card) return;

localStorage.setItem("selectedBlog", card.innerHTML);

window.location.href = "blog.html";
}

function filterCategory() {

    const selected =
    document.getElementById("categoryFilter")
    .value
    .toLowerCase();

    const cards =
    document.querySelectorAll(".card, .post-card");

    cards.forEach(card => {

        const cardText =
        card.innerText.toLowerCase();

        if (
            selected === "all" ||
            cardText.includes(selected)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });

}
function addComment(button) {
  const card = button.parentElement;
  const textarea = card.querySelector("textarea");
  const commentsDiv = card.querySelector(".comments");

  if (textarea.value.trim() === "") {
    alert("Please write a comment");
    return;
  }

  const p = document.createElement("p");
  p.innerText = textarea.value;

  commentsDiv.appendChild(p);
  textarea.value = "";
}
function addComment(button) {

const card = button.parentElement;

const textarea = card.querySelector("textarea");

const commentsDiv = card.querySelector(".comments");

if(textarea.value === ""){
alert("Write something");
return;
}

const comment = document.createElement("p");

comment.innerText = textarea.value;

commentsDiv.appendChild(comment);

textarea.value = "";

}
function filterCategory() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const posts = document.querySelectorAll(".post-card");

    posts.forEach(post => {
        const postCategory = post.getAttribute("data-category");

        if (selectedCategory === "All" || postCategory === selectedCategory) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}