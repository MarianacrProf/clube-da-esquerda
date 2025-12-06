import { useEffect, useState } from 'react'
import { supabase, getPosts, createPost, toggleUpvote, type Post } from '../lib/supabase'
import { toast } from 'sonner@2.0.3'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()

    // Subscribe to new posts
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts'
        },
        async (payload) => {
          // Fetch full post with author info
          const { data } = await supabase
            .from('posts')
            .select(`
              *,
              author:users(id, name, username, avatar_url)
            `)
            .eq('id', payload.new.id)
            .single()

          if (data) {
            setPosts(prev => [data, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts()
      
      // Calculate upvotes count and check if user has upvoted
      const user = await supabase.auth.getUser()
      
      const postsWithUpvotes = await Promise.all(
        data.map(async (post) => {
          const { count } = await supabase
            .from('upvotes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id)

          let hasUpvoted = false
          if (user.data.user) {
            const { data: upvoteData } = await supabase
              .from('upvotes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', user.data.user.id)
              .single()
            
            hasUpvoted = !!upvoteData
          }

          return {
            ...post,
            upvotes_count: count || 0,
            has_upvoted: hasUpvoted
          }
        })
      )

      setPosts(postsWithUpvotes)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Erro ao carregar publicações')
    } finally {
      setLoading(false)
    }
  }

  const addPost = async (postData: {
    content: string
    image_url?: string
    images?: string[]
    video_url?: string
    external_link?: string
    embed_url?: string
  }) => {
    try {
      const newPost = await createPost(postData)
      // Post will be added via realtime subscription
      toast.success('Publicação criada com sucesso!')
      return newPost
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Erro ao criar publicação')
      throw error
    }
  }

  const handleUpvote = async (postId: number) => {
    try {
      const result = await toggleUpvote(postId)
      
      // Update local state
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            upvotes_count: result.action === 'added' 
              ? (post.upvotes_count || 0) + 1 
              : (post.upvotes_count || 0) - 1,
            has_upvoted: result.action === 'added'
          }
        }
        return post
      }))

      if (result.action === 'added') {
        toast.success('UP! dado com sucesso! 🔥')
      }
    } catch (error) {
      console.error('Error toggling upvote:', error)
      toast.error('Erro ao dar UP!')
    }
  }

  return {
    posts,
    loading,
    addPost,
    handleUpvote,
    refreshPosts: fetchPosts
  }
}
