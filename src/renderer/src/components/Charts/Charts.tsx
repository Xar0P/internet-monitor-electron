import React from 'react'

import { Container, ChartWrapper } from './Charts.styles'
import { Averages, SpeedChart } from '.'

const Charts: React.FC = () => {
  return (
    <Container>
      <ChartWrapper>
        <SpeedChart />
        <Averages />
      </ChartWrapper>
    </Container>
  )
}

export default Charts
