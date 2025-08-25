import { useState } from 'react'
import { useMessages } from '@/hooks/useMessages'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Mail, Plus, Search, Paperclip, Send, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export const MessageCenter = () => {
  const { user } = useAuth()
  const { messages, loading, sendMessage, markAsRead, deleteMessage } = useMessages()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [isComposing, setIsComposing] = useState(false)
  
  // Compose message state
  const [newMessage, setNewMessage] = useState({
    recipientEmail: '',
    subject: '',
    content: '',
    attachments: [] as File[]
  })

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const unreadCount = messages.filter(msg => 
    !msg.is_read && msg.recipient_id === user?.id
  ).length

  const handleSendMessage = async () => {
    if (!newMessage.recipientEmail || !newMessage.subject || !newMessage.content) return

    // In a real app, you'd need to resolve email to user ID
    // For now, we'll use a placeholder recipient ID
    const recipientId = 'placeholder-recipient-id'
    
    await sendMessage(
      recipientId,
      newMessage.subject,
      newMessage.content,
      newMessage.attachments.length > 0 ? newMessage.attachments : undefined
    )

    // Reset form
    setNewMessage({
      recipientEmail: '',
      subject: '',
      content: '',
      attachments: []
    })
    setIsComposing(false)
  }

  const handleMessageClick = async (messageId: string) => {
    setSelectedMessage(messageId)
    const message = messages.find(m => m.id === messageId)
    
    // Mark as read if user is recipient and message is unread
    if (message && !message.is_read && message.recipient_id === user?.id) {
      await markAsRead(messageId)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Chargement des messages...</div>
      </div>
    )
  }

  const selectedMsg = selectedMessage ? messages.find(m => m.id === selectedMessage) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Messages</h2>
          <p className="text-muted-foreground">
            Centre de messagerie interne
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
              </Badge>
            )}
          </p>
        </div>
        
        <Dialog open={isComposing} onOpenChange={setIsComposing}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau message</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Destinataire</label>
                <Input
                  placeholder="email@example.com"
                  value={newMessage.recipientEmail}
                  onChange={(e) => setNewMessage({...newMessage, recipientEmail: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Sujet</label>
                <Input
                  placeholder="Sujet du message"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Votre message..."
                  rows={4}
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Pièces jointes
                </Button>
                <span className="text-sm text-muted-foreground">
                  {newMessage.attachments.length} fichier(s)
                </span>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsComposing(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans les messages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Aucun message
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                        selectedMessage === message.id ? 'bg-muted' : ''
                      } ${!message.is_read && message.recipient_id === user?.id ? 'bg-primary/5' : ''}`}
                      onClick={() => handleMessageClick(message.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={(message as any).sender?.avatar_url} />
                          <AvatarFallback>
                            {(message as any).sender?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm truncate">
                              {(message as any).sender?.full_name || 'Utilisateur'}
                            </span>
                            {!message.is_read && message.recipient_id === user?.id && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          
                          <p className="font-medium text-sm truncate">
                            {message.subject}
                          </p>
                          
                          <p className="text-xs text-muted-foreground truncate">
                            {message.content}
                          </p>
                          
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(message.created_at), 'dd MMM yyyy', { locale: fr })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMsg ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMsg.subject}</CardTitle>
                    <CardDescription>
                      De: {(selectedMsg as any).sender?.full_name || 'Utilisateur'} • {' '}
                      {format(new Date(selectedMsg.created_at), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                    </CardDescription>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(selectedMsg.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <Separator />
              
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{selectedMsg.content}</p>
                </div>
                
                {selectedMsg.attachments && selectedMsg.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Pièces jointes</h4>
                    <div className="space-y-2">
                      {selectedMsg.attachments.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <Paperclip className="w-4 h-4" />
                          Pièce jointe {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-[400px]">
                <div className="text-center text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Sélectionnez un message pour le lire</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}