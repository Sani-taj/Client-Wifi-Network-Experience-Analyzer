const form = document.getElementById("signupForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  localStorage.setItem("user", JSON.stringify({ username, password }));

  msg.innerText = "Account created! Redirecting...";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});