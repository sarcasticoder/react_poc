import React from 'react'
import { useAuth } from '@/shared/contexts/AuthContext'
import ChartBarMultiple from '@/commons/charts/BarChart'
import ChartLineDefault from '@/commons/charts/LineChart'
import ChartPieLegend from '@/commons/charts/PieChart'
import ChartAreaDefault from '@/commons/charts/AreaChart'
import ChartMixedDefault from '@/commons/charts/MixedChart'
import ChartRadarDefault from '@/commons/charts/RadarChart'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.name}! Here's an overview of your admin panel.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg border">
          <ChartBarMultiple />
        </div>
        
        {/* Line Chart */}
        <div className="bg-white rounded-lg border">
          <ChartLineDefault />
        </div>
        
        {/* Pie Chart */}
        <div className="bg-white rounded-lg border">
          <ChartPieLegend />
        </div>
        
        {/* Area Chart */}
        <div className="bg-white rounded-lg border">
          <ChartAreaDefault />
        </div>
        
        {/* Mixed Chart */}
        <div className="bg-white rounded-lg border">
          <ChartMixedDefault />
        </div>
        
        {/* Radar Chart */}
        <div className="bg-white rounded-lg border">
          <ChartRadarDefault />
        </div>
      </div>
    </>
  )
}

export default Dashboard
