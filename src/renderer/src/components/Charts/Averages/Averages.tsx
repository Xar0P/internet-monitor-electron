/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Container } from './Averages.styles'
import { AppContext } from '../../../contexts/App.context'
import { Speedtest } from '../../../interfaces/Speedtest.interface'
import mp3Sound from '../../../assets/sound.mp3'

const getAverage = (
  recentData: Speedtest[] | null,
  type: 'download' | 'upload' | 'ping'
): number => {
  return recentData && recentData.length > 0
    ? recentData.reduce((pv, cr) => pv + cr[type], 0) / recentData.length
    : 0
}

const Averages: React.FC = () => {
  const { recentData } = useContext(AppContext)
  const [minAcceptableDownload, setMinAcceptableDownload] = useState<number>(10)
  const [minAcceptableUpload, setMinAcceptableUpload] = useState<number>(0)
  const [maxAcceptablePing, setMinAcceptablePing] = useState<number>(Infinity)
  const downloadAverage = useMemo(
    () => Math.floor(getAverage(recentData, 'download')),
    [recentData]
  )
  const uploadAverage = useMemo(() => Math.floor(getAverage(recentData, 'upload')), [recentData])
  const pingAverage = useMemo(() => Math.floor(getAverage(recentData, 'ping')), [recentData])

  const audio = new Audio(mp3Sound)

  useEffect(() => {
    if (recentData && recentData.length > 0 && downloadAverage !== 0) {
      if (
        minAcceptableDownload > downloadAverage ||
        minAcceptableUpload > uploadAverage ||
        maxAcceptablePing < pingAverage
      ) {
        audio.play()
      }
    }
  }, [recentData])

  return (
    <Container>
      <div>{downloadAverage}</div>
      <div>{uploadAverage}</div>
      <div>{pingAverage}</div>
    </Container>
  )
}

export default Averages
