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
import { Container } from './SpeedChart.styles'
import { AppContext } from '../../../contexts/App.context'
import moment from 'moment'
import { DefaultChart } from '../../../interfaces/DefaultChart.interface'
import { DEFAULTCHART } from '../../../constants/DefaultChart.constant'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: '#fff'
      }
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      min: 1,
      ticks: {
        stepSize: 50,
        color: '#fff'
      }
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false
      },
      max: 50,
      ticks: {
        stepSize: 5,
        color: '#fff'
      }
    }
  },
  scaleFontColor: '#FFFFFF',
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#fff'
      }
    }
  }
}

const SpeedChart: React.FC = () => {
  const [data, setData] = useState<DefaultChart>(DEFAULTCHART)
  const { recentData } = useContext(AppContext)

  useEffect(() => {
    const labels = recentData ? recentData.map((data) => moment(data.date).format('LT')) : []

    setData({
      labels,
      datasets: [
        {
          label: 'Download',
          data: recentData ? recentData.map((data) => data.download) : [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y'
        },
        {
          label: 'Upload',
          data: recentData ? recentData.map((data) => data.upload) : [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y'
        },
        {
          label: 'Ping',
          data: recentData ? recentData.map((data) => data.ping) : [],
          borderColor: 'rgb(99, 109, 255)',
          backgroundColor: 'rgba(99, 135, 255, 0.5)',
          yAxisID: 'y1'
        }
      ]
    })
  }, [recentData])

  return (
    <Container>
      <Line options={options} data={data} />
    </Container>
  )
}

export default SpeedChart
