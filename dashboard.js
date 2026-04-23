// 🔐 Protect dashboard
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

// Data
let latencyData = [];
let throughputData = [];
let labels = [];

// QoE
function calculateQoE(latency, jitter, loss, throughput) {
    let score = 100;

    if (latency > 100) score -= 30;
    if (jitter > 30) score -= 20;
    if (loss > 2) score -= 30;
    if (throughput < 20) score -= 20;

    let status = "Good";
    if (score < 80) status = "Moderate";
    if (score < 50) status = "Poor";

    return { score, status };
}

// Root Cause
function detectRootCause(latency, jitter, loss, throughput) {
    if (throughput < 15 && latency > 100) return { cause: "Congestion", impact: "Slow speeds" };
    if (loss > 3) return { cause: "Interference", impact: "Packet loss" };
    if (latency > 150) return { cause: "ISP Issue", impact: "High delay" };
    return { cause: "Stable", impact: "Normal usage" };
}

// Charts
const latencyChart = new Chart(document.getElementById("latencyChart"), {
    type: "line",
    data: { labels: labels, datasets: [{ label: "Latency", data: latencyData }] }
});

const throughputChart = new Chart(document.getElementById("throughputChart"), {
    type: "line",
    data: { labels: labels, datasets: [{ label: "Throughput", data: throughputData }] }
});

// Fake Data
function generateData() {
    return {
        latency: Math.floor(Math.random() * 150),
        jitter: Math.floor(Math.random() * 50),
        loss: Math.random() * 5,
        throughput: Math.floor(Math.random() * 100)
    };
}

// Update
function updateDashboard() {
    const m = generateData();

    document.getElementById("latency").innerText = m.latency;
    document.getElementById("jitter").innerText = m.jitter;
    document.getElementById("loss").innerText = m.loss.toFixed(2);
    document.getElementById("throughput").innerText = m.throughput;

    const q = calculateQoE(m.latency, m.jitter, m.loss, m.throughput);
    document.getElementById("qoe").innerText = `QoE: ${q.status} (${q.score})`;

    const r = detectRootCause(m.latency, m.jitter, m.loss, m.throughput);
    document.getElementById("root").innerText = `Cause: ${r.cause}`;

    labels.push(new Date().toLocaleTimeString());
    latencyData.push(m.latency);
    throughputData.push(m.throughput);

    if (labels.length > 10) {
        labels.shift();
        latencyData.shift();
        throughputData.shift();
    }

    latencyChart.update();
    throughputChart.update();
}

setInterval(updateDashboard, 3000);
updateDashboard();

// Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}