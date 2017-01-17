import { app } from 'electron';
import { MainWindow } from './main-window';
require('electron-debug')();

let mainWindow;
app.on('ready', () => {
  mainWindow = new MainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  mainWindow.createIfRequired();
});

