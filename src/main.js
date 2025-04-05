const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 577,
    height: 1172,
    resizable: false, // 🔒 Prevent window resize
    fullscreenable: false, // Optional: disallow fullscreen
    maximizable: false, // Optional: disallow maximize
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // If you're using preload
    },
  });

  win.loadFile("index.html"); // Load your first page
}

app.whenReady().then(createWindow);
