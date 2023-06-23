/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo } from 'react'
import { Container } from './Averages.styles'
import { AppContext } from '../../../contexts/App.context'
import { Speedtest } from '../../../interfaces/Speedtest.interface'

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

  const downloadAverage = useMemo(
    () => Math.floor(getAverage(recentData, 'download')),
    [recentData]
  )
  const uploadAverage = useMemo(() => Math.floor(getAverage(recentData, 'upload')), [recentData])
  const pingAverage = useMemo(() => Math.floor(getAverage(recentData, 'ping')), [recentData])

  return (
    <Container>
      <div>{downloadAverage}</div>
      <div>{uploadAverage}</div>
      <div>{pingAverage}</div>
    </Container>
  )
}

export default Averages
