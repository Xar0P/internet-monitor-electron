import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { exec } from 'child_process'
import fsPromises from 'fs/promises'
import { existsSync } from 'fs'

export interface Speedtest {
  ping: string
  download: string
  upload: string
}

const api = {
  speedTest: async (): Promise<Speedtest> => await speedTest(),
  selectDirectory: (): void => selectDirectory()
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

const speedTest = async (): Promise<Speedtest> => {
  const fastTest = (): Promise<string> =>
    new Promise((resolve) => {
      exec('npx fast --upload --json', (err, stdout, stderr) => {
        if (err || stderr) return console.log('Error while testing internet speed.')
        resolve(stdout ? stdout : stderr)
      })
    })

  let directory = ''

  ipcRenderer.send('userConfig')
  ipcRenderer.on('userConfig', (_, config) => {
    directory = config.directoryToSave
  })

  const result = JSON.parse(await fastTest())
  const today = new Date(Date.now())
  const fileName = today.toISOString().split('T')[0]
  const path = `${directory}/${fileName}.json`

  const speedData = {
    download: result.downloadSpeed,
    upload: result.uploadSpeed,
    ping: result.latency,
    date: today.toISOString()
  }

  if (existsSync(path)) {
    fsPromises.readFile(path, 'utf-8').then((data) => {
      const json = JSON.parse(data)
      json.push(speedData)

      fsPromises
        .writeFile(path, JSON.stringify(json, null, 2))
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    })
  } else {
    fsPromises
      .writeFile(path, JSON.stringify([speedData], null, 2))
      .then((data) => {
        // Criar um toast
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  return speedData
}

const selectDirectory = (): void => {
  ipcRenderer.send('selectDirectory')
}
