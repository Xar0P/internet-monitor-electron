export interface DefaultChart {
  labels: string[]
  datasets: {
    label: string
    data: string[] | number[]
    borderColor: string
    backgroundColor: string
    yAxisID?: string
  }[]
}
