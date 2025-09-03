"use client"

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Story {
  _id: string
  author: {
    _id: string
    name: string
    avatar: string
  }
  mediaUrl: string
  mediaType: 'image' | 'video'
  createdAt: string
}

interface StoryViewerProps {
  stories: Story[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function StoryViewer({ 
  stories, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrevious 
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0)
  const currentStory = stories[currentIndex]

  useEffect(() => {
    setProgress(0)
    const duration = 5000 // 5 seconds per story
    const interval = 50 // Update every 50ms
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onNext()
          return 0
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, onNext])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrevious()
    if (e.key === 'ArrowRight') onNext()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!currentStory) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <Image
            src={currentStory.author.avatar}
            alt={currentStory.author.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="text-white font-semibold">{currentStory.author.name}</h3>
            <p className="text-white text-sm opacity-75">
              {new Date(currentStory.createdAt).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors z-10"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Story Content */}
      <div className="w-full h-full flex items-center justify-center">
        {currentStory.mediaType === 'image' ? (
          <Image
            src={currentStory.mediaUrl}
            alt="Story"
            fill
            className="object-contain"
          />
        ) : (
          <video
            src={currentStory.mediaUrl}
            autoPlay
            muted
            className="max-w-full max-h-full object-contain"
            onEnded={onNext}
          />
        )}
      </div>

      {/* Click areas for navigation */}
      <div className="absolute inset-0 flex">
        <div className="flex-1" onClick={onPrevious} />
        <div className="flex-1" onClick={onNext} />
      </div>
    </div>
  )
}