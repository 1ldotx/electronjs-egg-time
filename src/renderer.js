document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const eggButtons = document.querySelectorAll(".egg-btn");
  const timerDisplay = document.getElementById("timer");
  const subtitle = document.getElementById("subtitle");

  // Start button: Navigate to menu
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
  }

  // Egg selection: Store selected time and name, then navigate to timer page
  if (eggButtons.length > 0) {
    eggButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const time = button.getAttribute("data-time");
        const eggName = button.getAttribute("data-name"); // Get egg name

        localStorage.setItem("eggTime", time);
        localStorage.setItem("eggName", eggName); // Store egg name

        window.location.href = "timer.html";
      });
    });
  }

  // Update subtitle in timer.html
  if (subtitle) {
    const eggName = localStorage.getItem("eggName") || "Your egg"; // Default fallback
    subtitle.textContent = `${eggName} Is Ready In...`;
  }

  // Timer countdown logic
  if (timerDisplay) {
    let countdown = parseInt(localStorage.getItem("eggTime")) || 300; // Default 5 min

    const updateTimer = () => {
      const minutes = Math.floor(countdown / 60);
      const seconds = countdown % 60;
      timerDisplay.textContent = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      if (countdown > 0) {
        countdown--;
        setTimeout(updateTimer, 1000);
      } else {
        window.location.href = "done.html"; // Redirect when timer ends
      }
    };

    updateTimer(); // Start the countdown
  }

  // Electron window controls
  const { ipcRenderer } = window.electron || {};

  document.getElementById("minimize-btn")?.addEventListener("click", () => {
    ipcRenderer?.send("minimize-window");
  });

  document.getElementById("close-btn")?.addEventListener("click", () => {
    ipcRenderer?.send("close-window");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const eggNameElement = document.getElementById("egg-name");

  if (eggNameElement) {
    const eggName = localStorage.getItem("eggName") || "Your Egg";
    eggNameElement.textContent = eggName;
  }
});

document.getElementById("snooze-btn")?.addEventListener("click", () => {
  // Reload timer.html with the same egg time
  window.location.href = "timer.html";
});

document.getElementById("back-btn")?.addEventListener("click", () => {
  window.location.href = "index.html"; // Go back to home
});

const path = require("path");

document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.getElementById("close-btn");
  if (closeButton) {
    closeButton.src = path.join(__dirname, "asset", "closebutton_EggTimer.png");
  }

  const bgImage = document.getElementById("bg-home");
  if (bgImage) {
    bgImage.src = path.join(__dirname, "asset", "bg_home_EggTimer.png");
  }
});
