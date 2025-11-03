'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { 
  MessageSquare, 
  Mail, 
  Clock, 
  GitBranch, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  ChevronRight,
  Settings
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SequenceStep {
  id: number
  stepOrder: number
  stepType: 'dm' | 'email' | 'wait' | 'condition'
  template?: string
  waitDays?: number
  condition?: string
}

interface OutreachSequence {
  id: number
  name: string
  description?: string
  isActive: boolean
  createdAt: string
  steps: SequenceStep[]
}

export function OutreachSequences() {
  const [sequences, setSequences] = useState<OutreachSequence[]>([])
  const [selectedSequence, setSelectedSequence] = useState<OutreachSequence | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newSequenceName, setNewSequenceName] = useState('')
  const [newSequenceDescription, setNewSequenceDescription] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchSequences()
  }, [])

  const fetchSequences = async () => {
    try {
      const response = await fetch('/api/outreach-sequences')
      const data = await response.json()
      setSequences(data)
    } catch (error) {
      console.error('Error fetching sequences:', error)
    }
  }

  const createSequence = async () => {
    if (!newSequenceName.trim()) return

    try {
      const response = await fetch('/api/outreach-sequences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSequenceName,
          description: newSequenceDescription
        })
      })

      if (response.ok) {
        const newSequence = await response.json()
        setSequences(prev => [...prev, newSequence])
        setNewSequenceName('')
        setNewSequenceDescription('')
        setIsCreating(false)
        toast({
          title: "Sequence Created",
          description: "New outreach sequence has been created",
        })
      }
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create sequence. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleSequence = async (id: number, isActive: boolean) => {
    try {
      await fetch(`/api/outreach-sequences/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      })

      setSequences(prev => 
        prev.map(seq => seq.id === id ? { ...seq, isActive } : seq)
      )
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update sequence status.",
        variant: "destructive",
      })
    }
  }

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case 'dm': return <MessageSquare className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      case 'wait': return <Clock className="h-4 w-4" />
      case 'condition': return <GitBranch className="h-4 w-4" />
      default: return <ChevronRight className="h-4 w-4" />
    }
  }

  const getStepColor = (stepType: string) => {
    switch (stepType) {
      case 'dm': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'email': return 'bg-green-100 text-green-800 border-green-200'
      case 'wait': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'condition': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const defaultSequence: OutreachSequence = {
    id: 0,
    name: 'Default Crypto Outreach',
    description: 'Standard 3-step sequence for crypto influencer outreach',
    isActive: true,
    createdAt: new Date().toISOString(),
    steps: [
      {
        id: 1,
        stepOrder: 1,
        stepType: 'dm',
        template: 'Hi {handle}, your recent analysis on {topic} was spot-on. My AI backtests show 90% accuracy on entries like that. Would love to share the full report...'
      },
      {
        id: 2,
        stepOrder: 2,
        stepType: 'wait',
        waitDays: 2
      },
      {
        id: 3,
        stepOrder: 3,
        stepType: 'email',
        template: 'Subject: Following up on {topic} analysis\n\nHi {name},\n\nI wanted to follow up on my DM regarding your excellent {topic} analysis. I\'ve prepared a detailed backtest report that I think you\'d find valuable.\n\nWould you be open to a quick call to discuss potential collaboration?\n\nBest regards'
      },
      {
        id: 4,
        stepOrder: 4,
        stepType: 'wait',
        waitDays: 5
      },
      {
        id: 5,
        stepOrder: 5,
        stepType: 'condition',
        condition: '{"field": "reply_received", "operator": "equals", "value": false}'
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Outreach Sequences</h2>
          <p className="text-muted-foreground">
            Create and manage automated outreach workflows
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Sequence
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Sequence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sequenceName">Sequence Name</Label>
              <Input
                id="sequenceName"
                value={newSequenceName}
                onChange={(e) => setNewSequenceName(e.target.value)}
                placeholder="e.g., VIP Influencer Outreach"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sequenceDescription">Description</Label>
              <Textarea
                id="sequenceDescription"
                value={newSequenceDescription}
                onChange={(e) => setNewSequenceDescription(e.target.value)}
                placeholder="Describe the purpose of this sequence..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={createSequence}>Create Sequence</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Sequences</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {/* Default sequence */}
                  <Card 
                    className={`cursor-pointer transition-colors ${
                      selectedSequence?.id === 0 ? 'ring-2 ring-primary' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSequence(defaultSequence)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{defaultSequence.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Default</Badge>
                          <Switch checked={defaultSequence.isActive} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {defaultSequence.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{defaultSequence.steps.length} steps</Badge>
                        <Badge variant={defaultSequence.isActive ? "default" : "outline"}>
                          {defaultSequence.isActive ? 'Active' : 'Paused'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User-created sequences */}
                  {sequences.map(sequence => (
                    <Card 
                      key={sequence.id}
                      className={`cursor-pointer transition-colors ${
                        selectedSequence?.id === sequence.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSequence(sequence)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{sequence.name}</h4>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={sequence.isActive}
                              onCheckedChange={(checked) => toggleSequence(sequence.id, checked)}
                            />
                          </div>
                        </div>
                        {sequence.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {sequence.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{sequence.steps.length} steps</Badge>
                          <Badge variant={sequence.isActive ? "default" : "outline"}>
                            {sequence.isActive ? 'Active' : 'Paused'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedSequence ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedSequence.name}</CardTitle>
                    {selectedSequence.description && (
                      <CardDescription>{selectedSequence.description}</CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Test Sequence
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Step
                    </Button>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {selectedSequence.steps.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepColor(step.stepType)}`}>
                              {getStepIcon(step.stepType)}
                            </div>
                            {index < selectedSequence.steps.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                            )}
                          </div>
                          
                          <Card className="flex-1">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="capitalize">
                                    Step {step.stepOrder}
                                  </Badge>
                                  <Badge variant="secondary" className="capitalize">
                                    {step.stepType}
                                  </Badge>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>

                              {step.stepType === 'dm' && step.template && (
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">DM Template</Label>
                                  <div className="p-3 bg-blue-50 rounded text-sm">
                                    {step.template}
                                  </div>
                                </div>
                              )}

                              {step.stepType === 'email' && step.template && (
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Email Template</Label>
                                  <div className="p-3 bg-green-50 rounded text-sm whitespace-pre-wrap">
                                    {step.template}
                                  </div>
                                </div>
                              )}

                              {step.stepType === 'wait' && step.waitDays && (
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Wait Duration</Label>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                    <span className="text-sm">{step.waitDays} days</span>
                                  </div>
                                </div>
                              )}

                              {step.stepType === 'condition' && step.condition && (
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Condition</Label>
                                  <div className="p-3 bg-purple-50 rounded text-sm font-mono">
                                    {step.condition}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Select a Sequence</h3>
                  <p>Choose a sequence from the left to view and edit its steps</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}