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
