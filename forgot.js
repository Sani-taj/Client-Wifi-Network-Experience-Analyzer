const form = document.getElementById("forgotForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const newPassword = document.getElementById("newPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.username === username) {
    user.password = newPassword;
    localStorage.setItem("user", JSON.stringify(user));
    msg.innerText = "Password updated!";
  } else {
    msg.innerText = "User not found";
  }
});