import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs, { existsSync } from 'fs'
import fsPromises from 'fs/promises'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('userConfig', () => {
    readConfigFile().then((config) => {
      mainWindow.webContents.send('userConfig', config)
    })
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('selectDirectory', () => {
  const dir = dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  dir
    .then((path) => {
      // Criar um toast
      console.log('Arquivo de configurações salvo')
      addToConfigFile('directoryToSave', path.filePaths[0])
    })
    .catch((err) => console.log(err))
})

const addToConfigFile = (prop: string, value: string): void => {
  const path = app.getPath('userData') + '/config.json'

  console.log(path)

  if (existsSync(path)) {
    fs.readFile(path, 'utf-8', (_, data) => {
      const json = JSON.parse(data)
      json[prop] = value

      fs.writeFile(path, JSON.stringify(json, null, 2), (err) => {
        console.log(err)
      })
    })
  } else {
    fs.writeFile(path, JSON.stringify({ [prop]: value }, null, 2), (err) => {
      console.log(err)
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readConfigFile = async (): Promise<any> => {
  const path = app.getPath('userData') + '/config.json'

  if (existsSync(path)) {
    try {
      const json = await fsPromises.readFile(path, 'utf-8')
      return JSON.parse(json)
    } catch (error) {
      console.log(error)
    }
  }
}
