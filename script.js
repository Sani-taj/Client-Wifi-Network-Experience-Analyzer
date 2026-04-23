function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

// Charts
if (document.getElementById("latencyChart")) {
  new Chart(document.getElementById("latencyChart"), {
    type: "line",
    data: {
      labels: ["10:23","10:24","10:25","10:26"],
      datasets: [{
        label: "Latency",
        data: [25, 28, 35, 22],
        borderColor: "red"
      }]
    }
  });

  new Chart(document.getElementById("throughputChart"), {
    type: "line",
    data: {
      labels: ["10:23","10:24","10:25","10:26"],
      datasets: [{
        label: "Throughput",
        data: [35, 40, 50, 45],
        borderColor: "lime"
      }]
    }
  });
}