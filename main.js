const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

var ipc = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  //console.log('size',size);
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 500, height: 125,frame: false,x:size.width-500,y:0});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'djs.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// 前端发来可以关闭了
ipc.on('quit-app', function(event, arg) {

  console.log('get quit-app request -----last');

  if (mainWindow) {
    mainWindow.destroy();
    mainWindow = null;
  } else {
    app.quit();
  }

});

ipc.on('winreload',function(event,arg){
  if (process.platform == 'linux') {
    return;
  }
  mainWindow.reload();

});


ipc.on('wincenter',function(event,arg){
  if (process.platform == 'linux') {
    return;
  }

  mainWindow.center();

});


ipc.on('setfullscreen',function(event,arg){
  if (process.platform == 'linux') {
    return;
  }
 
 var fullFlag = mainWindow.isFullScreen();
 mainWindow.setFullScreen(!fullFlag);

});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
