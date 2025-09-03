"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Heart, MessageCircle, Share, Send, Users, Home, Bell, Search, Plus, Camera } from 'lucide-react'
import PostCard from '@/components/PostCard'
import PostComposer from '@/components/PostComposer'
import ChatBot from '@/components/ChatBot'
import StoryViewer from '@/components/StoryViewer'
import Image from 'next/image'

interface Post {
  _id: string
  content: string
  author: {
    _id: string
    name: string
    avatar: string
  }
  media?: Array<{
    url: string
    kind: 'image' | 'video'
  }>
  likesCount: number
  commentsCount: number
  createdAt: string
  likes: string[]
}

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

interface StoryGroup {
  author: {
    _id: string
    name: string
    avatar: string
  }
  stories: Story[]
}

export default function CommunityPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([])
  const [showStoryViewer, setShowStoryViewer] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [currentStories, setCurrentStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }
    
    fetchPosts()
    fetchStories()
  }, [status, router])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories')
      if (response.ok) {
        const data = await response.json()
        setStoryGroups(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
    }
  }

  const handleLikePost = async (postId: string) => {
    // Optimistic update
    setPosts(prev => prev.map(post => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(session?.user?.id || '')
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== session?.user?.id)
            : [...post.likes, session?.user?.id || ''],
          likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1
        }
      }
      return post
    }))
  }

  const openStory = (groupIndex: number) => {
    const group = storyGroups[groupIndex]
    if (group && group.stories.length > 0) {
      setCurrentStories(group.stories)
      setCurrentStoryIndex(0)
      setShowStoryViewer(true)
    }
  }

  const nextStory = () => {
    if (currentStoryIndex < currentStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else {
      setShowStoryViewer(false)
    }
  }

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Cộng đồng</h1>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm trong cộng đồng..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Home className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Users className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <Image
                src={session.user?.image || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <Image
                  src={session.user?.image || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-gray-900">{session.user?.name}</h3>
                <p className="text-sm text-gray-500">Thành viên cộng đồng</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bài viết</span>
                  <span className="font-semibold text-gray-900">{posts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Theo dõi</span>
                  <span className="font-semibold text-gray-900">245</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Người theo dõi</span>
                  <span className="font-semibold text-gray-900">189</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stories */}
            {storyGroups.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Stories</h2>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {storyGroups.map((group, index) => (
                    <div 
                      key={group.author._id} 
                      className="flex-shrink-0 text-center cursor-pointer"
                      onClick={() => openStory(index)}
                    >
                      <div className="relative">
                        <Image
                          src={group.author.avatar}
                          alt={group.author.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover transition-transform hover:scale-105 ring-4 ring-blue-500 ring-offset-2"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 truncate w-16">{group.author.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Post */}
            <PostComposer onPostCreated={fetchPosts} />

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  currentUserId={session.user?.id}
                  onLike={handleLikePost}
                />
              ))}
              
              {posts.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có bài viết nào</h3>
                  <p className="text-gray-500">Hãy là người đầu tiên chia sẻ trong cộng đồng!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Gợi ý kết bạn</h3>
              <div className="space-y-4">
                {[
                  { name: 'Nguyễn Văn A', mutual: 5, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' },
                  { name: 'Trần Thị B', mutual: 3, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' },
                  { name: 'Lê Văn C', mutual: 8, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop' },
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.mutual} bạn chung</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors">
                      Kết bạn
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Viewer */}
      {showStoryViewer && currentStories.length > 0 && (
        <StoryViewer
          stories={currentStories}
          currentIndex={currentStoryIndex}
          onClose={() => setShowStoryViewer(false)}
          onNext={nextStory}
          onPrevious={previousStory}
        />
      )}

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  )
}