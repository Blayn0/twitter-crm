'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MoreHorizontal, Eye, MessageCircle, Mail, User, Search, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface Influencer {
  id: number
  handle: string
  followerCount?: number
  bio?: string
  profileUrl?: string
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

interface InfluencerKanbanProps {
  onInfluencerChange?: () => void
}

const columns = [
  { id: 'New', title: 'New Leads', color: 'bg-gray-100' },
  { id: 'Contacted', title: 'Contacted', color: 'bg-purple-50' },
  { id: 'Engaged', title: 'Engaged', color: 'bg-green-50' },
  { id: 'Warm Lead', title: 'Warm Leads', color: 'bg-orange-50' },
  { id: 'Hot Lead', title: 'Hot Leads', color: 'bg-red-50' },
  { id: 'Cold Lead', title: 'Cold Leads', color: 'bg-blue-50' }
]

export function InfluencerKanban({ onInfluencerChange }: InfluencerKanbanProps) {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchInfluencers()
  }, [])

  const fetchInfluencers = async () => {
    try {
      const response = await fetch('/api/influencers')
      const data = await response.json()
      
      // Check if data is an error response
      if (data.error) {
        console.error('API Error:', data.error)
        setInfluencers([])
      } else if (Array.isArray(data)) {
        setInfluencers(data)
      } else {
        console.error('Unexpected data format:', data)
        setInfluencers([])
      }
    } catch (error) {
      console.error('Error fetching influencers:', error)
      setInfluencers([])
    } finally {
      setLoading(false)
    }
  }

  const updateInfluencerStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/influencers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      setInfluencers(prev => 
        prev.map(inf => inf.id === id ? { ...inf, status: newStatus } : inf)
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  // Filter influencers based on search term
  const filteredInfluencers = useMemo(() => {
    if (!searchTerm.trim()) return influencers
    
    const lowerSearchTerm = searchTerm.toLowerCase()
    return influencers.filter(influencer => 
      influencer.handle.toLowerCase().includes(lowerSearchTerm) ||
      influencer.bio?.toLowerCase().includes(lowerSearchTerm) ||
      influencer.status.toLowerCase().includes(lowerSearchTerm)
    )
  }, [influencers, searchTerm])

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

  const formatFollowers = (count?: number) => {
    if (!count) return 'N/A'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading influencers...</div>
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by handle, bio, or status... (e.g., @SJosephBurns)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm('')}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            Found {filteredInfluencers.length} influencer{filteredInfluencers.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6 px-2">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-96">
            <Card className={`${column.color} min-h-[700px]`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center justify-between">
                  {column.title}
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {filteredInfluencers.filter(inf => inf.status === column.id).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {filteredInfluencers
                      .filter(influencer => influencer.status === column.id)
                      .map(influencer => (
                        <Card 
                          key={influencer.id} 
                          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 border-transparent hover:border-blue-200"
                        >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage 
                                  src={`https://unavatar.io/${influencer.handle.replace('@', '')}`} 
                                  onError={(e) => {
                                    // Fallback to a deterministic avatar based on handle
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                  {influencer.handle.replace('@', '').slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-base">
                                  <a 
                                    href={influencer.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {influencer.handle}
                                  </a>
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {formatFollowers(influencer.followerCount)} followers
                                </p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Send DM
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Move to column
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {influencer.potentialScore && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Potential Score</span>
                                <span className="text-sm font-bold">{influencer.potentialScore}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-primary h-3 rounded-full transition-all duration-300" 
                                  style={{ width: `${influencer.potentialScore}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {influencer.bio && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                              {influencer.bio}
                            </p>
                          )}

                          <div className="flex items-center justify-between mb-4">
                            <Badge variant={getStatusColor(influencer.status) as any} className="text-sm">
                              {influencer.status}
                            </Badge>
                            <div className="flex gap-2">
                              {influencer.contacts && influencer.contacts.length > 0 && (
                                <div className="h-3 w-3 bg-green-500 rounded-full" title="Has contact info" />
                              )}
                              {influencer.activities && influencer.activities.length > 0 && (
                                <div className="h-3 w-3 bg-blue-500 rounded-full" title="Has activity" />
                              )}
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="flex flex-wrap gap-2">
                            {columns
                              .filter(col => col.id !== influencer.status)
                              .map(col => (
                                <Button
                                  key={col.id}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-8 px-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateInfluencerStatus(influencer.id, col.id)
                                  }}
                                >
                                  {col.title.split(' ')[0]}
                                </Button>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
