import { useEffect, useState } from 'react'
import { supabase, sendMessage, getMessages, subscribeToMessages, type Message } from '../lib/supabase'
import { toast } from 'sonner@2.0.3'

export function useChat(otherUserId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!otherUserId) return

    fetchMessages()

    // Subscribe to new messages
    const user = supabase.auth.getUser()
    user.then(({ data }) => {
      if (data.user) {
        const channel = subscribeToMessages(data.user.id, (newMessage) => {
          // Only add if from the current conversation
          if (newMessage.sender_id === otherUserId || newMessage.receiver_id === otherUserId) {
            setMessages(prev => [...prev, newMessage])
          }
        })

        return () => {
          supabase.removeChannel(channel)
        }
      }
    })
  }, [otherUserId])

  const fetchMessages = async () => {
    if (!otherUserId) return

    try {
      setLoading(true)
      const data = await getMessages(otherUserId)
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error('Erro ao carregar mensagens')
    } finally {
      setLoading(false)
    }
  }

  const send = async (message: string) => {
    if (!otherUserId) return

    try {
      const newMessage = await sendMessage(otherUserId, message)
      // Message will be added via realtime subscription
      return newMessage
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Erro ao enviar mensagem')
      throw error
    }
  }

  return {
    messages,
    loading,
    sendMessage: send,
    refreshMessages: fetchMessages
  }
}
