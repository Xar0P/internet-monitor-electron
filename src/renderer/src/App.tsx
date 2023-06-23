import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { Charts } from './components/Charts'
import { Speedtest } from './interfaces/Speedtest.interface'
import { AppContext } from './contexts/App.context'
import { configPtBr } from './utils/momentjs-pt-br.utils'

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
        <div>
          <h1>Download</h1>
          <p>{speedTest?.download ? `${speedTest.download}Mbps` : 'Carregando...'}</p>
          <h1>Upload</h1>
          <p>{speedTest?.upload ? `${speedTest.upload}Mbps` : 'Carregando...'}</p>
          <h1>Ping</h1>
          <p>{speedTest?.ping ? `${speedTest.ping}ms` : 'Carregando...'}</p>
        </div>

        <button onClick={selectDirectory}>Selecionar Diretório</button>

        <Charts />
      </div>
    </AppContext.Provider>
  )
}

export default App
