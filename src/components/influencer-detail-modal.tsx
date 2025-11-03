'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Users, 
  Calendar, 
  Bot, 
  Activity,
  Phone,
  Globe,
  Star,
  TrendingUp
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface InfluencerDetail {
  id: number
  handle: string
  followerCount?: number
  bio?: string
  websiteUrl?: string
  potentialScore?: number
  status: string
  createdAt: string
  contacts?: Array<{
    email?: string
    contactType?: string
    isVerified: boolean
  }>
  activities?: Array<{
    activityType: string
    content?: string
    timestamp: string
  }>
  analyses?: Array<{
    grokSummary?: string
    scoreBreakdown?: string
    analysisDate: string
  }>
}

interface InfluencerDetailModalProps {
  influencer: InfluencerDetail | null
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

export function InfluencerDetailModal({ 
  influencer, 
  isOpen, 
  onClose, 
  onUpdate 
}: InfluencerDetailModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isEnriching, setIsEnriching] = useState(false)
  const { toast } = useToast()

  if (!influencer) return null

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId: influencer.id,
          handle: influencer.handle,
          bio: influencer.bio,
          recentContent: 'Recent crypto analysis and trading signals'
        })
      })

      if (response.ok) {
        toast({
          title: "Analysis Complete",
          description: "AI analysis has been completed successfully",
        })
        onUpdate()
      } else {
        toast({
          title: "Analysis Failed",
          description: "Failed to complete AI analysis",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "An error occurred during analysis",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleContactEnrichment = async () => {
    if (!influencer.websiteUrl) {
      toast({
        title: "No Website",
        description: "This influencer doesn't have a website URL",
        variant: "destructive",
      })
      return
    }

    setIsEnriching(true)
    try {
      const response = await fetch('/api/contacts/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerId: influencer.id,
          websiteUrl: influencer.websiteUrl
        })
      })

      if (response.ok) {
        toast({
          title: "Enrichment Complete",
          description: "Contact information has been enriched",
        })
        onUpdate()
      } else {
        toast({
          title: "Enrichment Failed",
          description: "Failed to enrich contact information",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Enrichment Error",
        description: "An error occurred during enrichment",
        variant: "destructive",
      })
    } finally {
      setIsEnriching(false)
    }
  }

  const formatFollowers = (count?: number) => {
    if (!count) return 'N/A'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot Lead': return 'destructive'
      case 'Warm Lead': return 'secondary'
      case 'Cold Lead': return 'outline'
      case 'Contacted': return 'default'
      case 'Engaged': return 'default'
      default: return 'outline'
    }
  }

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500'
    if (score >= 75) return 'text-red-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-blue-600'
  }

  const latestAnalysis = influencer.analyses?.[0]
  const scoreBreakdown = latestAnalysis?.scoreBreakdown ? 
    JSON.parse(latestAnalysis.scoreBreakdown) : null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="text-2xl">{influencer.handle}</div>
            <Badge variant={getStatusColor(influencer.status) as any}>
              {influencer.status}
            </Badge>
            {influencer.potentialScore && (
              <Badge variant="outline" className={getScoreColor(influencer.potentialScore)}>
                Score: {influencer.potentialScore}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Detailed view and management for {influencer.handle}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Followers</span>
                    <span className="text-sm">{formatFollowers(influencer.followerCount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant={getStatusColor(influencer.status) as any} className="text-xs">
                      {influencer.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Added Date</span>
                    <span className="text-sm">
                      {new Date(influencer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {influencer.websiteUrl && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <a 
                        href={influencer.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {influencer.websiteUrl}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Potential Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {influencer.potentialScore ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Score</span>
                        <span className={`text-lg font-bold ${getScoreColor(influencer.potentialScore)}`}>
                          {influencer.potentialScore}/100
                        </span>
                      </div>
                      <Progress value={influencer.potentialScore} className="h-3" />
                      <div className="text-xs text-muted-foreground">
                        {influencer.potentialScore >= 75 && 'High potential - Priority outreach'}
                        {influencer.potentialScore >= 50 && influencer.potentialScore < 75 && 'Moderate potential - Consider outreach'}
                        {influencer.potentialScore < 50 && 'Lower potential - Monitor for now'}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No AI analysis yet</p>
                      <p className="text-xs">Run AI analysis to get scoring</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {influencer.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{influencer.bio}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI Analysis Results</h3>
              <Button 
                onClick={handleAIAnalysis} 
                disabled={isAnalyzing}
                size="sm"
              >
                {isAnalyzing ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Run AI Analysis
                  </>
                )}
              </Button>
            </div>

            {latestAnalysis ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Latest Analysis
                    </CardTitle>
                    <CardDescription>
                      {new Date(latestAnalysis.analysisDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {latestAnalysis.grokSummary && (
                      <div className="space-y-3">
                        <h4 className="font-medium">Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          {latestAnalysis.grokSummary}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {scoreBreakdown && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Score Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Trading Depth (40%)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${scoreBreakdown.tradingDepth}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">
                              {scoreBreakdown.tradingDepth}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Signal Accuracy (30%)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${scoreBreakdown.signalAccuracy}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">
                              {scoreBreakdown.signalAccuracy}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sales History (20%)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${scoreBreakdown.salesHistory}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">
                              {scoreBreakdown.salesHistory}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Engagement Quality (10%)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${scoreBreakdown.engagementQuality}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">
                              {scoreBreakdown.engagementQuality}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Run AI analysis to get detailed insights and scoring
                  </p>
                  <Button onClick={handleAIAnalysis} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Bot className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <Button 
                onClick={handleContactEnrichment} 
                disabled={isEnriching || !influencer.websiteUrl}
                size="sm"
              >
                {isEnriching ? (
                  <>
                    <Bot className="h-4 w-4 mr-2 animate-spin" />
                    Enriching...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Enrich Contacts
                  </>
                )}
              </Button>
            </div>

            {influencer.contacts && influencer.contacts.length > 0 ? (
              <div className="space-y-3">
                {influencer.contacts.map((contact, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{contact.email}</p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {contact.contactType}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {contact.isVerified ? (
                            <Badge variant="default" className="text-xs">Verified</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">Unverified</Badge>
                          )}
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Contacts Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {influencer.websiteUrl 
                      ? "Enrich contacts to find email addresses"
                      : "No website URL available for contact enrichment"
                    }
                  </p>
                  {influencer.websiteUrl && (
                    <Button onClick={handleContactEnrichment} disabled={isEnriching}>
                      {isEnriching ? (
                        <>
                          <Bot className="h-4 w-4 mr-2 animate-spin" />
                          Enriching...
                        </>
                      ) : (
                        <>
                          <Bot className="h-4 w-4 mr-2" />
                          Enrich Contacts
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <h3 className="text-lg font-semibold">Activity Timeline</h3>
            
            {influencer.activities && influencer.activities.length > 0 ? (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {influencer.activities.map((activity, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Activity className="h-4 w-4 text-muted-foreground mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs capitalize">
                                {activity.activityType.replace('_', ' ')}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(activity.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {activity.content && (
                              <p className="text-sm text-muted-foreground">
                                {activity.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Activities Yet</h3>
                  <p className="text-muted-foreground">
                    Activities will appear here as you interact with this influencer
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Twitter Profile
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send DM
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Outreach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Compose Email
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Bot className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 mr-2" />
                        Run Analysis
                      </>
                    )}
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleContactEnrichment}
                    disabled={isEnriching || !influencer.websiteUrl}
                  >
                    {isEnriching ? (
                      <>
                        <Bot className="h-4 w-4 mr-2 animate-spin" />
                        Enriching...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 mr-2" />
                        Find Contacts
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Status Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Mark as Contacted
                  </Button>
                  <Button className="w-full" variant="outline">
                    Add to Campaign
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}