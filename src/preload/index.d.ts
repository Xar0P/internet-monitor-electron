import { ElectronAPI } from '@electron-toolkit/preload'
import { Speedtest, Limits } from './'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      speedTest: () => Promise<Speedtest>
      selectDirectory: () => void
      saveLimits: (limits: Limits) => void
      readSummaryFile: () => Promise<Speedtest[] | null>
      hasDirectory: () => string
      getLimits: () => Limits | null
    }
  }
}
