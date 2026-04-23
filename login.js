const form = document.getElementById("loginForm");
const error = document.getElementById("error");

// Auto redirect
if (localStorage.getItem("token")) {
  window.location.href = "dashboard.html";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && username === user.username && password === user.password) {
    localStorage.setItem("token", "logged_in");
    window.location.href = "dashboard.html";
  } else {
    error.innerText = "Invalid credentials";
  }
});