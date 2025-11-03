'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Bot, Plus, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface DiscoveredInfluencer {
  handle: string
  followerCount: number
  bio: string
  profileUrl: string
  websiteUrl?: string
  score?: number
  status?: string
}

export function InfluencerDiscovery() {
  const [isSearching, setIsSearching] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [discoveredInfluencers, setDiscoveredInfluencers] = useState<DiscoveredInfluencer[]>([])
  const [searchQuery, setSearchQuery] = useState('top crypto influencers')
  const [minFollowers, setMinFollowers] = useState('100000')
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([])
  const { toast } = useToast()

  const handleDiscover = async () => {
    setIsSearching(true)
    try {
      // Simulate API call to Comet Browser API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock discovered influencers
      const mockInfluencers: DiscoveredInfluencer[] = [
        {
          handle: '@CryptoGuru',
          followerCount: 250000,
          bio: 'Bitcoin maximalist and technical analysis expert. Daily BTC signals and market insights.',
          profileUrl: 'https://twitter.com/CryptoGuru',
          websiteUrl: 'https://cryptoguru.com'
        },
        {
          handle: '@BitcoinBelle',
          followerCount: 120000,
          bio: 'Cryptocurrency trader and blockchain enthusiast. Sharing trading strategies and market analysis.',
          profileUrl: 'https://twitter.com/BitcoinBelle',
          websiteUrl: 'https://bitcoinbelle.com'
        },
        {
          handle: '@AlphaTrader',
          followerCount: 180000,
          bio: 'Professional crypto trader with 8+ years experience. RSI and MACD specialist.',
          profileUrl: 'https://twitter.com/AlphaTrader'
        }
      ]
      
      setDiscoveredInfluencers(mockInfluencers)
      toast({
        title: "Discovery Complete",
        description: `Found ${mockInfluencers.length} potential influencers`,
      })
    } catch (error) {
      toast({
        title: "Discovery Failed",
        description: "Failed to discover influencers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleAnalyze = async (influencer: DiscoveredInfluencer) => {
    setIsAnalyzing(true)
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update influencer with AI-generated score
      setDiscoveredInfluencers(prev => 
        prev.map(inf => 
          inf.handle === influencer.handle 
            ? { ...inf, score: Math.floor(Math.random() * 40) + 60 } // Random score 60-100
            : inf
        )
      )
      
      toast({
        title: "Analysis Complete",
        description: `AI analysis finished for ${influencer.handle}`,
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze influencer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAnalyzeAll = async () => {
    setIsAnalyzing(true)
    try {
      for (const influencer of discoveredInfluencers) {
        if (!influencer.score) {
          await handleAnalyze(influencer)
          await new Promise(resolve => setTimeout(resolve, 1000)) // Small delay between requests
        }
      }
    } catch (error) {
      console.error('Error in batch analysis:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAddToCRM = async (influencer: DiscoveredInfluencer) => {
    try {
      const response = await fetch('/api/influencers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: influencer.handle,
          followerCount: influencer.followerCount,
          bio: influencer.bio,
          profileUrl: influencer.profileUrl,
          websiteUrl: influencer.websiteUrl,
          status: influencer.score && influencer.score >= 75 ? 'Hot Lead' : 
                  influencer.score && influencer.score >= 50 ? 'Warm Lead' : 'Cold Lead',
          potentialScore: influencer.score
        })
      })

      if (response.ok) {
        toast({
          title: "Added to CRM",
          description: `${influencer.handle} has been added to your CRM`,
        })
        
        // Remove from discovered list
        setDiscoveredInfluencers(prev => prev.filter(inf => inf.handle !== influencer.handle))
      }
    } catch (error) {
      toast({
        title: "Failed to Add",
        description: "Could not add influencer to CRM. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddSelectedToCRM = async () => {
    for (const handle of selectedInfluencers) {
      const influencer = discoveredInfluencers.find(inf => inf.handle === handle)
      if (influencer) {
        await handleAddToCRM(influencer)
      }
    }
    setSelectedInfluencers([])
  }

  const toggleSelection = (handle: string) => {
    setSelectedInfluencers(prev => 
      prev.includes(handle) 
        ? prev.filter(h => h !== handle)
        : [...prev, handle]
    )
  }

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500'
    if (score >= 75) return 'text-red-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-blue-600'
  }

  const getScoreBadge = (score?: number) => {
    if (!score) return null
    if (score >= 75) return 'destructive'
    if (score >= 50) return 'secondary'
    return 'outline'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            AI-Powered Discovery
          </CardTitle>
          <CardDescription>
            Automatically discover and analyze cryptocurrency influencers using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchQuery">Search Query</Label>
              <Input
                id="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., top crypto influencers"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minFollowers">Minimum Followers</Label>
              <Input
                id="minFollowers"
                type="number"
                value={minFollowers}
                onChange={(e) => setMinFollowers(e.target.value)}
                placeholder="100000"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleDiscover} 
                disabled={isSearching}
                className="w-full"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Discovering...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Discover Influencers
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {discoveredInfluencers.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Discovered Influencers</CardTitle>
                <CardDescription>
                  Review and analyze potential leads before adding to CRM
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleAnalyzeAll}
                  disabled={isAnalyzing || discoveredInfluencers.every(inf => inf.score)}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing All...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Analyze All
                    </>
                  )}
                </Button>
                {selectedInfluencers.length > 0 && (
                  <Button onClick={handleAddSelectedToCRM}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Selected ({selectedInfluencers.length})
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {discoveredInfluencers.map((influencer, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{influencer.handle}</h3>
                            {influencer.score && (
                              <Badge variant={getScoreBadge(influencer.score) as any}>
                                Score: {influencer.score}
                              </Badge>
                            )}
                            <Badge variant="outline">
                              {(influencer.followerCount / 1000).toFixed(0)}K followers
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{influencer.bio}</p>
                          {influencer.websiteUrl && (
                            <p className="text-sm text-blue-600 hover:underline">
                              {influencer.websiteUrl}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedInfluencers.includes(influencer.handle)}
                            onChange={() => toggleSelection(influencer.handle)}
                            className="h-4 w-4"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAnalyze(influencer)}
                            disabled={isAnalyzing}
                          >
                            {influencer.score ? (
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            ) : (
                              <Bot className="h-4 w-4 mr-2" />
                            )}
                            {influencer.score ? 'Re-analyze' : 'Analyze'}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCRM(influencer)}
                            disabled={!influencer.score}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add to CRM
                          </Button>
                        </div>
                      </div>

                      {influencer.score && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Potential Score</span>
                            <span className={`text-sm font-bold ${getScoreColor(influencer.score)}`}>
                              {influencer.score}/100
                            </span>
                          </div>
                          <Progress value={influencer.score} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {influencer.score >= 75 && 'Hot Lead - High potential for partnership'}
                            {influencer.score >= 50 && influencer.score < 75 && 'Warm Lead - Moderate potential'}
                            {influencer.score < 50 && 'Cold Lead - Lower priority'}
                          </div>
                        </div>
                      )}

                      {!influencer.score && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="h-4 w-4" />
                          Click "Analyze" to run AI-powered analysis and scoring
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}