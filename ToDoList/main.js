const { app, BrowserWindow } = require("electron");
const path = require("path");
try {
  const electronReload = require("electron-reload");
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
} catch {
  console.log("Kein Reload gefunden");
}
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 1200,
    backgroundColor: "#ffffff",
    icon: `file://${__dirname}/dist/assets/logo.png`,
  });

  win.loadURL(`file://${__dirname}/dist/to-do-list/index.html`);

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on("closed", function () {
    win = null;
  });
}

// Create window on electron intialization
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
