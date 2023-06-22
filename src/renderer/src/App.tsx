import { useEffect, useState } from 'react'

import { SpeedChart } from './components/Charts'
import { Speedtest } from './interfaces/Speedtest.interface'
import { AppContext } from './contexts/App.context'

function App(): JSX.Element {
  const [speedTest, setSpeedtest] = useState<Speedtest | null>(null)
  const [recentData, setRecentData] = useState<Array<Speedtest> | null>(null)

  const speedTestFC = async (): Promise<void> => setSpeedtest(await window.api.speedTest())
  const selectDirectory = (): void => window.api.selectDirectory()

  useEffect(() => {
    ;(async (): Promise<void> => {
      setRecentData(await window.api.readSummaryFile())
    })()
  }, [])

  return (
    <AppContext.Provider value={{ recentData }}>
      <div className="container">
        <button type="button" onClick={async (): Promise<void> => await speedTestFC()}>
          Clique aqui
        </button>
        <div>
          <h1>Velocidade de internet</h1>
          <p>{speedTest?.download ? speedTest.download : 'Carregando...'}</p>
          <h1>Velocidade de upload</h1>
          <p>{speedTest?.upload ? speedTest.upload : 'Carregando...'}</p>
          <h1>Ping</h1>
          <p>{speedTest?.ping ? speedTest.ping : 'Carregando...'}</p>
        </div>
        <button onClick={selectDirectory}>Selecionar Diretório</button>
        <SpeedChart />
      </div>
    </AppContext.Provider>
  )
}

export default App
