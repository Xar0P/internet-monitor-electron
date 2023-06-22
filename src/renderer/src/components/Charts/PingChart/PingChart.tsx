/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Container } from './PingChart.styles'
import { AppContext } from '../../../contexts/App.context'
import moment from 'moment'
import { DefaultChart } from '../../../interfaces/DefaultChart.interface'
import { DEFAULTCHART } from '../../../constants/DefaultChart.constant'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: false
    }
  }
}
const PingChart: React.FC = () => {
  const [data, setData] = useState<DefaultChart>(DEFAULTCHART)
  const { recentData } = useContext(AppContext)

  useEffect(() => {
    const labels = recentData ? recentData.map((data) => moment(data.date).calendar()) : []

    setData({
      labels,
      datasets: [
        {
          label: 'Ping',
          data: recentData ? recentData.map((data) => data.ping) : [],
          borderColor: 'rgb(99, 109, 255)',
          backgroundColor: 'rgba(99, 135, 255, 0.5)'
        }
      ]
    })
  }, [recentData])

  return (
    <Container>
      {/** @ts-ignore */}
      <Line options={options} data={data} />
    </Container>
  )
}

export default PingChart
