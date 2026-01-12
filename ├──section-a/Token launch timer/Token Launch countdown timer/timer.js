let timer;
let targetDate;
let startDate;

// handle date change
document.getElementById("dateInput").addEventListener("change", function () {
  targetDate = new Date(this.value);
  startDate = new Date();
  startCountdown();
});

function startCountdown() {
  clearInterval(timer);

  timer = setInterval(() => {

    const now = new Date();
    const diff = targetDate - now;

    // if time over
    if (diff <= 0) {
      document.getElementById("countdown").innerText = "🎉 Launched!";
      clearInterval(timer);
      document.getElementById("progress").style.width = "100%";
      return;
    }

    // convert milliseconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // display countdown
    document.getElementById("countdown").innerText =
      `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

    // progress bar logic
    const totalTime = targetDate - startDate;
    const elapsedTime = now - startDate;
    const percent = Math.min((elapsedTime / totalTime) * 100, 100);

    document.getElementById("progress").style.width = percent + "%";

  }, 1000);
}

// subscribe button
document.getElementById("subscribeBtn").addEventListener("click", function () {
  const email = document.getElementById("emailInput").value;
  console.log("Subscribed:", email);
  document.getElementById("emailInput").value = "";
});