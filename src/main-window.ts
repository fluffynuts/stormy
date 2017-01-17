import { BrowserWindow, app } from 'electron';
import * as path from 'path';
import * as url from 'url';

export class MainWindow {
  private _window: Electron.BrowserWindow;

  constructor() {
    const appPath = app.getAppPath();
    this.createIfRequired();
    this._loadIndex();
  }

  public createIfRequired(): void {
    this._window = new BrowserWindow({
      width: 800,
      height: 600
    });
    console.log('window created');
    this._window.setMenu(null);
  }

  _bindWindowEvents(): void {
    this._window.on('closed', () => {
      this._window = null;
    });
  }

  _loadIndex(): void {
    const indexPath = path.join(app.getAppPath(), 'app', 'index.html');
    const fileUrl = url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true
    });
    this._window.loadURL(fileUrl);
  }
};

