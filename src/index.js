const { app, BrowserWindow } = require("electron");
const path = require("node:path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 577,
    height: 700,
    resizable: false, // ❌ Prevent resizing
    maximizable: false, // ❌ Disable maximize button
    fullscreenable: false, // ❌ Prevent fullscreen
    autoHideMenuBar: true, // Optional: Hides the menu bar
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Uncomment if you want to enable DevTools during development
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished initialization
// and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create the window when the dock icon is clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
