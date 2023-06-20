import { ElectronAPI } from '@electron-toolkit/preload'
import { Speedtest } from './index'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      speedTest: () => Promise<Speedtest>
      selectDirectory: () => void
    }
  }
}
