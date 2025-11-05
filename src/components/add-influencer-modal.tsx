'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

interface AddInfluencerModalProps {
  onInfluencerAdded: () => void
  trigger?: React.ReactNode
}

export function AddInfluencerModal({ onInfluencerAdded, trigger }: AddInfluencerModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    handle: '',
    bio: '',
    profileUrl: '',
    websiteUrl: '',
    followerCount: '',
    potentialScore: '50'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.handle.trim()) {
      alert('Handle is required')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/influencers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: formData.handle.startsWith('@') ? formData.handle : `@${formData.handle}`,
          bio: formData.bio || undefined,
          profileUrl: formData.profileUrl || undefined,
          websiteUrl: formData.websiteUrl || undefined,
          followerCount: formData.followerCount || undefined,
          potentialScore: parseInt(formData.potentialScore) || 50
        })
      })

      if (response.ok) {
        const newInfluencer = await response.json()
        console.log('Successfully added influencer:', newInfluencer)
        
        // Reset form
        setFormData({
          handle: '',
          bio: '',
          profileUrl: '',
          websiteUrl: '',
          followerCount: '',
          potentialScore: '50'
        })
        
        // Close modal
        setOpen(false)
        
        // Notify parent to refresh data
        onInfluencerAdded()
        
        alert(`Successfully added ${newInfluencer.handle} to the CRM!`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add influencer')
      }
    } catch (error) {
      console.error('Error adding influencer:', error)
      alert('Error adding influencer')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Influencer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Influencer</DialogTitle>
          <DialogDescription>
            Add a new influencer to your CRM. They will be placed in the "Engaged" column.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="handle">Twitter Handle *</Label>
            <Input
              id="handle"
              placeholder="@_zerohege_"
              value={formData.handle}
              onChange={(e) => handleInputChange('handle', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Brief description of the influencer..."
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="followerCount">Follower Count</Label>
            <Input
              id="followerCount"
              type="number"
              placeholder="10000"
              value={formData.followerCount}
              onChange={(e) => handleInputChange('followerCount', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="potentialScore">Potential Score (0-100)</Label>
            <Input
              id="potentialScore"
              type="number"
              min="0"
              max="100"
              value={formData.potentialScore}
              onChange={(e) => handleInputChange('potentialScore', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profileUrl">Profile URL</Label>
            <Input
              id="profileUrl"
              type="url"
              placeholder="https://twitter.com/username"
              value={formData.profileUrl}
              onChange={(e) => handleInputChange('profileUrl', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              placeholder="https://example.com"
              value={formData.websiteUrl}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Influencer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
