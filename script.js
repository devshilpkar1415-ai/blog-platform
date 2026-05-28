async function registerUser() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  

  const response = await fetch("http://localhost:5000/register", {
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
  alert(JSON.stringify(data));
}
async function loginUser() {

  const email =
  document.getElementById("login-email").value;
   
  localStorage.setItem("userEmail", 
    email);

  const password =
  document.getElementById("login-password").value;

  const response = await fetch("http://localhost:5000/login", {

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

  localStorage.setItem("username", email);

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
  const category =
  document.getElementById("category").value;
  

  

  const response = await fetch("http://localhost:5000/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      content: content,
      author:
  localStorage.getItem("username"),
     category: category,
    })
  });

  const data = await response.json();
  alert(JSON.stringify(data));
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

  const response = await fetch("http://localhost:5000/comment", {
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
  const response = await fetch("http://localhost:5000/posts");
  const posts = await response.json();

  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  posts.forEach(post => {
    postList.innerHTML += `
<div class="card">
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

  await fetch(`http://localhost:5000/like-post/${id}`,{
    method:"PUT"
  });

  showPosts();

}
async function editPost(id) {
  const title = prompt("Enter new title:");
  const content = prompt("Enter new content:");

  const response = await fetch(`http://localhost:5000/edit-post/${id}`, {
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
  const response = await fetch(`http://localhost:5000/delete-post/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();
  alert(data);
  showPosts();
}
showPosts();
async function loadPosts() {

  const response = await fetch("http://localhost:5000/posts");
  const posts = await response.json();

  const postList = document.getElementById("post-list");

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
function filterCategory() {
  const selected = document.getElementById("categoryFilter").value;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (selected === "All" || card.innerText.includes(selected)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
function openBlog(event) {

const card = event.target.closest(".card");

if (!card) return;

localStorage.setItem("selectedBlog", card.innerHTML);

window.location.href = "blog.html";

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