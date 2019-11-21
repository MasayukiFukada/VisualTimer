const { app, BrowserWindow } = require('electron');
let win;

function createWindow() {
  // ブラウザウィンドウを作成
  window = new BrowserWindow({
    width: 235,
    height: 235,
    webPreferences: {
      webSecurity: false
    }
  });
  window.loadURL(`file://${__dirname}/index.html`);

  // デベロッパーツール自動起動
  // win.webContents.openDevTools();

  //ウィンドウが閉じられると発生
  window.on('closed', () => {
    window = null
  });

}
//Electronが初期化&ブラウザウィンドウを作成する関数を呼ぶ
app.on('ready', createWindow);

//ウィンドウが閉じられると終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
