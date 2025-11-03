'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, TrendingUp, Target, Activity, Plus, Search, Filter, Database } from 'lucide-react'
import { InfluencerKanban } from '@/components/influencer-kanban'
import { InfluencerDiscovery } from '@/components/influencer-discovery'
import { OutreachSequences } from '@/components/outreach-sequences'
import { AnalyticsDashboard } from '@/components/analytics-dashboard'

interface DashboardStats {
  totalInfluencers: number
  newLeadsThisWeek: number
  conversionRate: number
  topScoringInfluencers: number
  hotLeads: number
  warmLeads: number
  coldLeads: number
  contacted: number
  engaged: number
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInfluencers: 0,
    newLeadsThisWeek: 0,
    conversionRate: 0,
    topScoringInfluencers: 0,
    hotLeads: 0,
    warmLeads: 0,
    coldLeads: 0,
    contacted: 0,
    engaged: 0
  })

  const [isSeeding, setIsSeeding] = useState(false)
  const [isSeedingExtended, setIsSeedingExtended] = useState(false)

  useEffect(() => {
    // Fetch dashboard stats
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error)
  }, [])

  const seedDatabase = async () => {
    setIsSeeding(true)
    try {
      const response = await fetch('/api/seed-influencers', { method: 'POST' })
      const data = await response.json()
      if (response.ok) {
        // Refresh stats after seeding
        fetch('/api/dashboard/stats')
          .then(res => res.json())
          .then(data => setStats(data))
          .catch(console.error)
        alert(`Database seeded successfully! Added ${data.influencers?.length || 0} influencers.`)
      } else {
        alert('Failed to seed database')
      }
    } catch (error) {
      console.error('Error seeding database:', error)
      alert('Error seeding database')
    } finally {
      setIsSeeding(false)
    }
  }

  const seedExtendedDatabase = async () => {
    setIsSeedingExtended(true)
    try {
      const response = await fetch('/api/seed-influencers-extended', { method: 'POST' })
      const data = await response.json()
      if (response.ok) {
        // Refresh stats after seeding
        fetch('/api/dashboard/stats')
          .then(res => res.json())
          .then(data => setStats(data))
          .catch(console.error)
        alert(`Extended database seeded successfully! Added ${data.influencers?.length || 0} additional influencers.`)
      } else {
        alert('Failed to seed extended database')
      }
    } catch (error) {
      console.error('Error seeding extended database:', error)
      alert('Error seeding extended database')
    } finally {
      setIsSeedingExtended(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Crypto-Influencer CRM</h1>
            <p className="text-lg text-muted-foreground mt-1">
              AI-Powered Lead Generation & Outreach Automation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={seedDatabase} disabled={isSeeding}>
              <Database className="w-5 h-5 mr-2" />
              {isSeeding ? 'Seeding...' : 'Seed Core'}
            </Button>
            <Button variant="outline" size="sm" onClick={seedExtendedDatabase} disabled={isSeedingExtended}>
              <Database className="w-5 h-5 mr-2" />
              {isSeedingExtended ? 'Seeding...' : 'Add 50+ More'}
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="w-5 h-5 mr-2" />
              Add Influencer
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Total Influencers</CardTitle>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.totalInfluencers}</div>
              <p className="text-sm text-muted-foreground">
                +{stats.newLeadsThisWeek} this week
              </p>
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.conversionRate}%</div>
              <Progress value={stats.conversionRate} className="mt-3 h-3" />
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Hot Leads</CardTitle>
              <Target className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.hotLeads}</div>
              <div className="flex gap-2 mt-3">
                <Badge variant="destructive" className="text-sm">Hot</Badge>
                <Badge variant="secondary" className="text-sm">{stats.warmLeads} Warm</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Engaged</CardTitle>
              <Activity className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.engaged}</div>
              <p className="text-sm text-muted-foreground">
                {stats.contacted} contacted
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="kanban" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="kanban" className="text-base py-3">Kanban Board</TabsTrigger>
            <TabsTrigger value="discovery" className="text-base py-3">Discovery</TabsTrigger>
            <TabsTrigger value="outreach" className="text-base py-3">Outreach</TabsTrigger>
            <TabsTrigger value="analytics" className="text-base py-3">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-4 mt-6">
            <InfluencerKanban />
          </TabsContent>

          <TabsContent value="discovery" className="space-y-4 mt-6">
            <InfluencerDiscovery />
          </TabsContent>

          <TabsContent value="outreach" className="space-y-4 mt-6">
            <OutreachSequences />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-6">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}