import { createContext } from 'react'
import { Speedtest } from '../interfaces/Speedtest.interface'

export const AppContext = createContext<{
  recentData: Array<Speedtest> | null
  minAcceptableDownload: number
  minAcceptableUpload: number
  maxAcceptablePing: number
  setMinAcceptableDownload: React.Dispatch<React.SetStateAction<number>>
  setMinAcceptableUpload: React.Dispatch<React.SetStateAction<number>>
  setMaxAcceptablePing: React.Dispatch<React.SetStateAction<number>>
  setHasAlert: React.Dispatch<React.SetStateAction<boolean>>
  hasAlert: boolean
}>({
  recentData: null,
  minAcceptableDownload: 0,
  minAcceptableUpload: 0,
  maxAcceptablePing: Infinity,
  setMinAcceptableDownload: () => {},
  setMinAcceptableUpload: () => {},
  setMaxAcceptablePing: () => {},
  setHasAlert: () => {},
  hasAlert: false
})
