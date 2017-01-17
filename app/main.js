/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var electron_1 = __webpack_require__(141);
	var main_window_1 = __webpack_require__(140);
	__webpack_require__(162)();
	var mainWindow = void 0;
	electron_1.app.on('ready', function () {
	    mainWindow = new main_window_1.MainWindow();
	});
	electron_1.app.on('window-all-closed', function () {
	    if (process.platform !== 'darwin') {
	        electron_1.app.quit();
	    }
	});
	electron_1.app.on('activate', function () {
	    mainWindow.createIfRequired();
	});

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var electron_1 = __webpack_require__(141);
	var path = __webpack_require__(142);
	var url = __webpack_require__(143);

	var MainWindow = function () {
	    function MainWindow() {
	        _classCallCheck(this, MainWindow);

	        var appPath = electron_1.app.getAppPath();
	        this.createIfRequired();
	        this._loadIndex();
	    }

	    _createClass(MainWindow, [{
	        key: "createIfRequired",
	        value: function createIfRequired() {
	            this._window = new electron_1.BrowserWindow({
	                width: 800,
	                height: 600
	            });
	            console.log('window created');
	            this._window.setMenu(null);
	        }
	    }, {
	        key: "_bindWindowEvents",
	        value: function _bindWindowEvents() {
	            var _this = this;

	            this._window.on('closed', function () {
	                _this._window = null;
	            });
	        }
	    }, {
	        key: "_loadIndex",
	        value: function _loadIndex() {
	            var indexPath = path.join(electron_1.app.getAppPath(), 'app', 'index.html');
	            var fileUrl = url.format({
	                pathname: indexPath,
	                protocol: 'file:',
	                slashes: true
	            });
	            this._window.loadURL(fileUrl);
	        }
	    }]);

	    return MainWindow;
	}();

	exports.MainWindow = MainWindow;
	;

/***/ },

/***/ 141:
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ },

/***/ 142:
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },

/***/ 143:
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	const electron = __webpack_require__(141);
	const localShortcut = __webpack_require__(163);
	const isDev = __webpack_require__(164);

	const app = electron.app;
	const BrowserWindow = electron.BrowserWindow;
	const isMacOS = process.platform === 'darwin';

	function devTools(win) {
		win = win || BrowserWindow.getFocusedWindow();

		if (win) {
			win.toggleDevTools();
		}
	}

	function openDevTools(win, showDevTools) {
		win = win || BrowserWindow.getFocusedWindow();

		if (win) {
			const mode = showDevTools === true ? undefined : showDevTools;
			win.webContents.openDevTools({mode});
		}
	}

	function refresh(win) {
		win = win || BrowserWindow.getFocusedWindow();

		if (win) {
			win.webContents.reloadIgnoringCache();
		}
	}

	function inspectElements() {
		const win = BrowserWindow.getFocusedWindow();
		const inspect = () => {
			win.devToolsWebContents.executeJavaScript('DevToolsAPI.enterInspectElementMode()');
		};

		if (win) {
			if (win.webContents.isDevToolsOpened()) {
				inspect();
			} else {
				win.webContents.on('devtools-opened', inspect);
				win.openDevTools();
			}
		}
	}

	module.exports = opts => {
		opts = Object.assign({
			enabled: null,
			showDevTools: false
		}, opts);

		if (opts.enabled === false || (opts.enabled === null && !isDev)) {
			return;
		}

		app.on('browser-window-created', (e, win) => {
			if (opts.showDevTools) {
				openDevTools(win, opts.showDevTools);
			}
		});

		app.on('ready', () => {
			// activate devtron for the user if they have it installed and it's not already added
			try {
				const devtronAlreadyAdded = BrowserWindow.getDevToolsExtensions &&
					{}.hasOwnProperty.call(BrowserWindow.getDevToolsExtensions(), 'devtron');

				if (!devtronAlreadyAdded) {
					BrowserWindow.addDevToolsExtension(__webpack_require__(165).path);
				}
			} catch (err) {}

			localShortcut.register('CmdOrCtrl+Shift+C', inspectElements);
			localShortcut.register(isMacOS ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', devTools);
			localShortcut.register('F12', devTools);

			localShortcut.register('CmdOrCtrl+R', refresh);
			localShortcut.register('F5', refresh);
		});
	};

	module.exports.refresh = refresh;
	module.exports.devTools = devTools;
	module.exports.openDevTools = openDevTools;


/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const electron = __webpack_require__(141);

	const globalShortcut = electron.globalShortcut;
	const BrowserWindow = electron.BrowserWindow;
	const app = electron.app;
	const windowsWithShortcuts = new WeakMap();

	// a placeholder to register shortcuts
	// on any window of the app.
	const ANY_WINDOW = {};

	function isAccelerator(arg) {
		return typeof arg === 'string';
	}

	function unregisterAllShortcuts(win) {
		const shortcuts = windowsWithShortcuts.get(win);
		shortcuts.forEach(sc =>
			globalShortcut.unregister(sc.accelerator)
		);
	}

	function registerAllShortcuts(win) {
		const shortcuts = windowsWithShortcuts.get(win);

		shortcuts.forEach(sc =>
			globalShortcut.register(sc.accelerator, sc.callback)
		);
	}

	function unregisterAll(win) {
		if (win === undefined) {
			// unregister shortcuts for any window in the app
			unregisterAll(ANY_WINDOW);
			return;
		}

		if (!windowsWithShortcuts.has(win)) {
			return;
		}

		unregisterAllShortcuts(win);
		windowsWithShortcuts.delete(win);
	}

	function register(win, accelerator, callback) {
		if (arguments.length === 2 && isAccelerator(win)) {
			// register shortcut for any window in the app
			// win = accelerator, accelerator = callback
			register(ANY_WINDOW, win, accelerator);
			return;
		}

		if (windowsWithShortcuts.has(win)) {
			const shortcuts = windowsWithShortcuts.get(win);
			shortcuts.push({
				accelerator,
				callback
			});
		} else {
			windowsWithShortcuts.set(win, [{
				accelerator,
				callback
			}]);
		}

		const focusedWin = BrowserWindow.getFocusedWindow();
		if ((win === ANY_WINDOW && focusedWin !== null) || focusedWin === win) {
			globalShortcut.register(accelerator, callback);
		}
	}

	function indexOfShortcut(win, accelerator) {
		if (!windowsWithShortcuts.has(win)) {
			return -1;
		}

		const shortcuts = windowsWithShortcuts.get(win);
		let shortcutToUnregisterIdx = -1;
		shortcuts.some((s, idx) => {
			if (s.accelerator === accelerator) {
				shortcutToUnregisterIdx = idx;
				return true;
			}
			return false;
		});
		return shortcutToUnregisterIdx;
	}

	function unregister(win, accelerator) {
		if (arguments.length === 1 && isAccelerator(win)) {
			// unregister shortcut for any window in the app
			// win = accelerator
			unregister(ANY_WINDOW, win);
			return;
		}
		const shortcutToUnregisterIdx = indexOfShortcut(win, accelerator);

		if (shortcutToUnregisterIdx !== -1) {
			globalShortcut.unregister(accelerator);
			const shortcuts = windowsWithShortcuts.get(win);
			shortcuts.splice(shortcutToUnregisterIdx, 1);
		}
	}

	function isRegistered(win, accelerator) {
		if (arguments.length === 1 && isAccelerator(win)) {
			// check shortcut for any window in the app
			// win = accelerator
			return isRegistered(ANY_WINDOW, win);
		}

		return indexOfShortcut(win, accelerator) !== -1;
	}

	app.on('browser-window-focus', (e, win) => {
		if (windowsWithShortcuts.has(ANY_WINDOW)) {
			registerAllShortcuts(ANY_WINDOW);
		}

		if (!windowsWithShortcuts.has(win)) {
			return;
		}

		registerAllShortcuts(win);
	});

	app.on('browser-window-blur', (e, win) => {
		if (windowsWithShortcuts.has(ANY_WINDOW)) {
			unregisterAllShortcuts(ANY_WINDOW);
		}

		if (!windowsWithShortcuts.has(win)) {
			return;
		}

		unregisterAllShortcuts(win);
	});

	module.exports = {
		register,
		unregister,
		isRegistered,
		unregisterAll,
		enableAll: registerAllShortcuts,
		disableAll: unregisterAllShortcuts
	};


/***/ },

/***/ 164:
/***/ function(module, exports) {

	'use strict';
	module.exports = process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);


/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {const electron = __webpack_require__(141)

	exports.install = () => {
	  if (process.type === 'renderer') {
	    console.log(`Installing Devtron from ${__dirname}`)
	    if (electron.remote.BrowserWindow.getDevToolsExtensions &&
	        electron.remote.BrowserWindow.getDevToolsExtensions().devtron) return true
	    return electron.remote.BrowserWindow.addDevToolsExtension(__dirname)
	  } else if (process.type === 'browser') {
	    console.log(`Installing Devtron from ${__dirname}`)
	    if (electron.BrowserWindow.getDevToolsExtensions &&
	        electron.BrowserWindow.getDevToolsExtensions().devtron) return true
	    return electron.BrowserWindow.addDevToolsExtension(__dirname)
	  } else {
	    throw new Error('Devtron can only be installed from an Electron process.')
	  }
	}

	exports.uninstall = () => {
	  if (process.type === 'renderer') {
	    console.log(`Uninstalling Devtron from ${__dirname}`)
	    return electron.remote.BrowserWindow.removeDevToolsExtension('devtron')
	  } else if (process.type === 'browser') {
	    console.log(`Uninstalling Devtron from ${__dirname}`)
	    return electron.BrowserWindow.removeDevToolsExtension('devtron')
	  } else {
	    throw new Error('Devtron can only be uninstalled from an Electron process.')
	  }
	}

	exports.path = __dirname

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }

/******/ });