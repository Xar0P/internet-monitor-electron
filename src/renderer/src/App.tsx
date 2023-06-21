import { useState } from 'react'

import { SpeedChart } from './components/Charts'

export interface Speedtest {
  ping: string
  download: string
  upload: string
  date: string
}

function App(): JSX.Element {
  const [speedTest, setSpeedtest] = useState<Speedtest | null>(null)
  const [recentData, setRecentData] = useState<Array<Speedtest> | null>(null)

  const speedTestFC = async (): Promise<void> => setSpeedtest(await window.api.speedTest())
  const selectDirectory = (): void => window.api.selectDirectory()

  return (
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
  )
}

export default App
