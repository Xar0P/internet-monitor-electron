import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { Charts } from './components/Charts'
import { Speedtest } from './interfaces/Speedtest.interface'
import { AppContext } from './contexts/App.context'
import { configPtBr } from './utils/momentjs-pt-br.utils'
import mp3Sound from './assets/sound.mp3'

moment.updateLocale('pt-br', configPtBr)

function App(): JSX.Element {
  const [speedTest, setSpeedtest] = useState<Speedtest | null>(null)
  const [recentData, setRecentData] = useState<Array<Speedtest> | null>(null)
  const appContext = useMemo(
    () => ({
      recentData: recentData || null
    }),
    [speedTest, recentData]
  )

  const speedTestFC = async (): Promise<void> => setSpeedtest(await window.api.speedTest())
  const selectDirectory = (): void => window.api.selectDirectory()

  useEffect(() => {
    ;(async (): Promise<void> => {
      setRecentData(await window.api.readSummaryFile())
    })()

    const interval = setInterval(() => {
      ;(async (): Promise<void> => {
        setRecentData(await window.api.readSummaryFile())
      })()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      ;(async (): Promise<void> => {
        console.log('Fazendo análise de internet')
        await speedTestFC()
      })()
    }, 1 * 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AppContext.Provider value={appContext}>
      <div className="container">
        <button onClick={selectDirectory}>Selecionar Diretório</button>
        <Charts />
        <audio controls>
          {/* <source src="audio.ogg" type="audio/ogg" /> */}
          <source src={mp3Sound} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </AppContext.Provider>
  )
}

export default App
