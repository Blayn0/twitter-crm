'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BarChart3, TrendingUp, Users, Target, Activity } from 'lucide-react'

interface AnalyticsData {
  totalInfluencers: number
  avgScore: number
  topPerformers: Array<{
    handle: string
    score: number
    followers: number
  }>
  statusDistribution: {
    'Hot Lead': number
    'Warm Lead': number
    'Cold Lead': number
    'Contacted': number
    'Engaged': number
  }
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalInfluencers: 0,
    avgScore: 0,
    topPerformers: [],
    statusDistribution: {
      'Hot Lead': 0,
      'Warm Lead': 0,
      'Cold Lead': 0,
      'Contacted': 0,
      'Engaged': 0
    }
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  const totalLeads = Object.values(analytics.statusDistribution).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Influencers</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{analytics.totalInfluencers}</div>
            <p className="text-sm text-muted-foreground">
              Avg Score: {analytics.avgScore.toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Hot Leads</CardTitle>
            <Target className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{analytics.statusDistribution['Hot Lead']}</div>
            <Progress 
              value={totalLeads > 0 ? (analytics.statusDistribution['Hot Lead'] / totalLeads) * 100 : 0} 
              className="mt-3 h-3" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Engagement Rate</CardTitle>
            <Activity className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {totalLeads > 0 ? Math.round((analytics.statusDistribution['Engaged'] / totalLeads) * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              {analytics.statusDistribution['Engaged']} engaged
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="h-6 w-6" />
              Lead Distribution
            </CardTitle>
            <CardDescription className="text-base">
              Breakdown of leads by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(analytics.statusDistribution).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={
                        status === 'Hot Lead' ? 'destructive' :
                        status === 'Warm Lead' ? 'secondary' :
                        status === 'Cold Lead' ? 'outline' :
                        'default'
                      }
                      className="text-sm px-3 py-1"
                    >
                      {status}
                    </Badge>
                    <span className="text-base font-medium">{count}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full" 
                        style={{ width: `${totalLeads > 0 ? (count / totalLeads) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-6 w-6" />
              Top Performers
            </CardTitle>
            <CardDescription className="text-base">
              Highest scoring leads this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {analytics.topPerformers.length > 0 ? (
                  analytics.topPerformers.map((influencer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <div className="font-semibold text-base">{influencer.handle}</div>
                        <div className="text-sm text-muted-foreground">
                          {(influencer.followers / 1000).toFixed(0)}K followers
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{influencer.score}</div>
                        <div className="text-sm text-muted-foreground">Score</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-12 text-base">
                    No data available yet. Add some influencers to see analytics.
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}