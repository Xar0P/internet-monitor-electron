import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { Charts } from './components/Charts'
import { Speedtest } from './interfaces/Speedtest.interface'
import { AppContext } from './contexts/App.context'
import { configPtBr } from './utils/momentjs-pt-br.utils'
import { Config } from './components'

moment.updateLocale('pt-br', configPtBr)

function App(): JSX.Element {
  const [speedTest, setSpeedtest] = useState<Speedtest | null>(null)
  const [hasAlert, setHasAlert] = useState<boolean>(false)
  const [recentData, setRecentData] = useState<Array<Speedtest> | null>(null)
  const [minAcceptableDownload, setMinAcceptableDownload] = useState<number>(0)
  const [minAcceptableUpload, setMinAcceptableUpload] = useState<number>(0)
  const [maxAcceptablePing, setMaxAcceptablePing] = useState<number>(Infinity)
  const hasDirectory = useMemo(() => window.api.hasDirectory(), [window])
  const appContext = useMemo(
    () => ({
      recentData: recentData || null,
      minAcceptableDownload,
      minAcceptableUpload,
      maxAcceptablePing,
      setMinAcceptableDownload,
      setMinAcceptableUpload,
      setMaxAcceptablePing,
      setHasAlert,
      hasAlert
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
        {hasDirectory ? (
          <>
            <Charts />
            <Config />
          </>
        ) : (
          <>
            <p>SELECIONE UM DIRETÓRIO PARA SALVAR OS ARQUIVOS DE TESTE DE INTERNET</p>
            <button onClick={selectDirectory}>Selecionar Diretório</button>
          </>
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
