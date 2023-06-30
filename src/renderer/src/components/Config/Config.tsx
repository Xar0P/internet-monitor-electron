import React, { useContext, useState } from 'react'
import { Container, SetLimits, Limits, LimitsContent } from './Config.styles'
import { AppContext } from '../../contexts/App.context'

const Config: React.FC = () => {
  const {
    minAcceptableDownload,
    minAcceptableUpload,
    maxAcceptablePing,
    setMaxAcceptablePing,
    setMinAcceptableDownload,
    setMinAcceptableUpload
  } = useContext(AppContext)
  const selectDirectory = (): void => window.api.selectDirectory()
  const [minDownload, setMinDownload] = useState('')
  const [minUpload, setMinUpload] = useState('')
  const [maxPing, setMaxPing] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (Number(minDownload)) {
      setMinAcceptableDownload(Number(minDownload))
      setMinDownload('')
    }
    if (Number(minUpload)) {
      setMinAcceptableUpload(Number(minUpload))
      setMinUpload('')
    }
    if (Number(maxPing)) {
      setMaxAcceptablePing(Number(maxPing))
      setMaxPing('')
    }
  }

  return (
    <Container>
      <Limits>
        <SetLimits onSubmit={handleSubmit}>
          <h3>Definir limites</h3>
          <div>
            Mínimo de Download
            <input
              type="text"
              name="minDownload"
              value={minDownload}
              onChange={(e): void => setMinDownload(e.target.value)}
            />
          </div>
          <div>
            Mínimo de Upload
            <input
              type="text"
              name="minUpload"
              value={minUpload}
              onChange={(e): void => setMinUpload(e.target.value)}
            />
          </div>
          <div>
            Ping Máximo
            <input
              type="text"
              name="maxPing"
              value={maxPing}
              onChange={(e): void => setMaxPing(e.target.value)}
            />
          </div>
          <input type="submit" value="Enviar" />
        </SetLimits>
        <LimitsContent>
          <h3>Limites já aplicados</h3>
          <p>Mínimo de Download configurado: {minAcceptableDownload}</p>
          <p>Mínimo de Upload configurado: {minAcceptableUpload}</p>
          <p>Máximo de Ping configurado: {maxAcceptablePing}</p>
        </LimitsContent>
      </Limits>
      <button onClick={selectDirectory}>Mudar o diretório</button>
    </Container>
  )
}

export default Config
