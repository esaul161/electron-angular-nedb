const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({ frame: true,
    icon: path.join(__dirname, 'dist/assets/icons/png/icono.png')
  })

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
    title: "Punto de Venta",
    transparent: true
  }))
  win.maximize();
   win.setMenu(null);
win.show();
// Menu.remove();
// win.setMenu(null);

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
