import { useState, useEffect } from 'react'
import { supabase, Message } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

export const useMessages = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch messages
  const fetchMessages = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name, avatar_url),
          recipient:profiles!messages_recipient_id_fkey(full_name, avatar_url)
        `)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error: any) {
      console.error('Error fetching messages:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Send message
  const sendMessage = async (recipientId: string, subject: string, content: string, attachments?: File[]) => {
    if (!user) return

    try {
      let attachmentUrls: string[] = []

      // Upload attachments if any
      if (attachments && attachments.length > 0) {
        for (const file of attachments) {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Date.now()}.${fileExt}`
          
          const { data, error } = await supabase.storage
            .from('message-attachments')
            .upload(fileName, file)

          if (error) throw error
          
          const { data: { publicUrl } } = supabase.storage
            .from('message-attachments')
            .getPublicUrl(fileName)

          attachmentUrls.push(publicUrl)
        }
      }

      const { error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            recipient_id: recipientId,
            subject,
            content,
            attachments: attachmentUrls.length > 0 ? attachmentUrls : null,
            is_read: false
          }
        ])

      if (error) throw error

      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès"
      })

      // Refresh messages
      fetchMessages()
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive"
      })
    }
  }

  // Mark message as read
  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)

      if (error) throw error

      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ))
    } catch (error: any) {
      console.error('Error marking message as read:', error)
    }
  }

  // Delete message
  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)

      if (error) throw error

      toast({
        title: "Message supprimé",
        description: "Le message a été supprimé"
      })

      // Update local state
      setMessages(prev => prev.filter(msg => msg.id !== messageId))
    } catch (error: any) {
      console.error('Error deleting message:', error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le message",
        variant: "destructive"
      })
    }
  }

  // Real-time subscription
  useEffect(() => {
    if (!user) return

    fetchMessages()

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `or(sender_id.eq.${user.id},recipient_id.eq.${user.id})`
        },
        () => {
          fetchMessages()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  return {
    messages,
    loading,
    sendMessage,
    markAsRead,
    deleteMessage,
    refetch: fetchMessages
  }
}