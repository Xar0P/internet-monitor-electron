import React, { useContext } from 'react'
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
}

const SpeedChart: React.FC = () => {
  const { recentData } = useContext(AppContext)

  if (recentData) {
    console.log(recentData)
  }

  const labels = recentData ? recentData.map((data) => data.date) : []

  console.log(labels)

  const data = {
    labels,
    datasets: [
      {
        label: 'Download',
        data: recentData ? recentData.map((data) => data.download) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Upload',
        data: recentData ? recentData.map((data) => data.upload) : [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }

  return (
    <Container>
      <Line options={options} data={data} />
    </Container>
  )
}

export default SpeedChart
