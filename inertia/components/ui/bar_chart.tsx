import { ReactNode } from 'react'
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

export interface BarChartData {
  label: string
  value: number
  [key: string]: any
}

interface BarChartProps {
  data: BarChartData[]
  dataKey?: string
  height?: number
  tooltipContent?: (data: BarChartData) => ReactNode
}

export function BarChart(props: BarChartProps) {
  const { data, dataKey = 'value', height = 300, tooltipContent } = props

  const defaultTooltipContent = (item: BarChartData) => (
    <div className="bg-primary text-white rounded-md px-3 py-2 text-[13px]/4 min-w-25">
      <div className="text-muted-foreground">{item.label}</div>
      <div className="font-semibold pt-1">{item.value}</div>
    </div>
  )

  return (
    <RechartsBarChart
      responsive
      data={data}
      height={height}
      margin={{ top: 10 }}
      barSize={21}
      barGap={4}
      barCategoryGap="10%"
      className="[&>svg]:overflow-visible [&_*:focus]:outline-none"
    >
      <XAxis
        dataKey="label"
        type="category"
        axisLine={false}
        tick={{ fill: 'var(--color-muted)', fontSize: 12, lineHeight: 17 }}
        angle={-55}
        textAnchor="end"
        height={50}
      />
      <YAxis
        type="number"
        domain={[0, (dataMax: number) => Math.max(dataMax, 8)]}
        axisLine={false}
        width={60}
        tick={{ fill: 'var(--color-muted)', fontSize: 12, lineHeight: 17 }}
      />
      <CartesianGrid stroke="#e7e8e9" vertical={false} />
      <Tooltip
        cursor={{ fill: 'transparent' }}
        content={({ active, payload }) => {
          if (!active || !payload?.length) return null
          const item = payload[0].payload as BarChartData
          return tooltipContent ? tooltipContent(item) : defaultTooltipContent(item)
        }}
      />
      <Bar dataKey={dataKey} fill="var(--color-accent)" isAnimationActive={false} />
    </RechartsBarChart>
  )
}
