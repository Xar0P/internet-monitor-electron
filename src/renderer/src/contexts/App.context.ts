import { createContext } from 'react'
import { Speedtest } from '../interfaces/Speedtest.interface'

export const AppContext = createContext<{ recentData: Array<Speedtest> | null }>({
  recentData: null
})
