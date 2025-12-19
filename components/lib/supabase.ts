import { createClient } from '@supabase/supabase-js'

// Variáveis de ambiente do Supabase
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Tipos do banco de dados
export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar_url?: string
  bio?: string
  is_beta_tester: boolean
  created_at: string
}

export interface Post {
  id: number
  author_id: string
  content: string
  image_url?: string
  images?: string[]
  video_url?: string
  external_link?: string
  embed_url?: string
  created_at: string
  author?: User
  upvotes_count?: number
  comments_count?: number
  shares_count?: number
  has_upvoted?: boolean
}

export interface Message {
  id: number
  sender_id: string
  receiver_id: string
  message: string
  read: boolean
  created_at: string
  sender?: User
}

export interface Community {
  id: number
  name: string
  description: string
  icon: string
  category: string
  members_count: number
  created_at: string
}

export interface Event {
  id: number
  title: string
  description: string
  image_url: string
  date: string
  location: string
  created_by: string
  created_at: string
  participants_count: number
}

export interface Upvote {
  id: number
  user_id: string
  post_id: number
  created_at: string
}

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Upload de imagem
export const uploadImage = async (file: File, bucket: string = 'images') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}

// Posts
export const createPost = async (postData: {
  content: string
  image_url?: string
  images?: string[]
  video_url?: string
  external_link?: string
  embed_url?: string
}) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('posts')
    .insert([{
      author_id: user.id,
      ...postData
    }])
    .select(`
      *,
      author:users(id, name, username, avatar_url)
    `)
    .single()

  if (error) throw error
  return data
}

export const getPosts = async (limit: number = 50) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:users(id, name, username, avatar_url),
      upvotes:upvotes(count)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export const toggleUpvote = async (postId: number) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  // Check if already upvoted
  const { data: existing } = await supabase
    .from('upvotes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existing) {
    // Remove upvote
    const { error } = await supabase
      .from('upvotes')
      .delete()
      .eq('id', existing.id)
    
    if (error) throw error
    return { action: 'removed' }
  } else {
    // Add upvote
    const { error } = await supabase
      .from('upvotes')
      .insert([{ post_id: postId, user_id: user.id }])
    
    if (error) throw error
    return { action: 'added' }
  }
}

// Messages
export const sendMessage = async (receiverId: string, message: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('messages')
    .insert([{
      sender_id: user.id,
      receiver_id: receiverId,
      message,
      read: false
    }])
    .select(`
      *,
      sender:users(id, name, username, avatar_url)
    `)
    .single()

  if (error) throw error
  return data
}

export const getMessages = async (otherUserId: string) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:users(id, name, username, avatar_url)
    `)
    .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

// Realtime subscription para mensagens
export const subscribeToMessages = (userId: string, callback: (message: Message) => void) => {
  const channel = supabase
    .channel('messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${userId}`
      },
      (payload) => {
        callback(payload.new as Message)
      }
    )
    .subscribe()

  return channel
}

// Events
export const createEvent = async (eventData: {
  title: string
  description: string
  image_url: string
  date: string
  location: string
}) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('events')
    .insert([{
      ...eventData,
      created_by: user.id
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) throw error
  return data
}

export const participateInEvent = async (eventId: number) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('event_participants')
    .insert([{
      event_id: eventId,
      user_id: user.id
    }])

  if (error) throw error
}
