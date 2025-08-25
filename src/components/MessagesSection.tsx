import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Search, 
  Send,
  User,
  Clock,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  CheckCheck,
  Circle
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "M. Dupont",
    role: "Professeur de Mathématiques",
    avatar: "MD",
    lastMessage: "Félicitations pour votre excellent travail sur le dernier contrôle !",
    timestamp: "2024-01-15 14:30",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "M. Dupont",
        content: "Bonjour, j'ai corrigé votre contrôle de mathématiques.",
        timestamp: "2024-01-15 14:15",
        read: true
      },
      {
        id: 2,
        sender: "M. Dupont", 
        content: "Félicitations pour votre excellent travail sur le dernier contrôle !",
        timestamp: "2024-01-15 14:30",
        read: false
      }
    ]
  },
  {
    id: 2,
    name: "Mme Martin",
    role: "Professeur de Physique",
    avatar: "MM",
    lastMessage: "N'oubliez pas le TP de demain à 10h15",
    timestamp: "2024-01-14 16:45", 
    unread: 0,
    online: false,
    messages: [
      {
        id: 3,
        sender: "Moi",
        content: "Bonjour Madame, pourriez-vous m'envoyer la correction du TP ?",
        timestamp: "2024-01-14 15:30",
        read: true
      },
      {
        id: 4,
        sender: "Mme Martin",
        content: "Bien sûr, je vous l'envoie en pièce jointe. N'oubliez pas le TP de demain à 10h15",
        timestamp: "2024-01-14 16:45",
        read: true
      }
    ]
  },
  {
    id: 3,
    name: "Administration",
    role: "Secrétariat",
    avatar: "AD",
    lastMessage: "Votre bulletin du 1er trimestre est disponible",
    timestamp: "2024-01-12 09:00",
    unread: 1,
    online: false,
    messages: [
      {
        id: 5,
        sender: "Administration",
        content: "Votre bulletin du 1er trimestre est disponible dans la section Bulletins.",
        timestamp: "2024-01-12 09:00",
        read: false
      }
    ]
  },
  {
    id: 4,
    name: "Mme Durand",
    role: "Professeur de Français",
    avatar: "MF",
    lastMessage: "Merci pour votre dissertation, très bon travail !",
    timestamp: "2024-01-10 11:20",
    unread: 0,  
    online: true,
    messages: [
      {
        id: 6,
        sender: "Moi",
        content: "Bonjour, j'ai envoyé ma dissertation sur Molière",
        timestamp: "2024-01-09 18:00",
        read: true
      },
      {
        id: 7,
        sender: "Mme Durand",
        content: "Merci pour votre dissertation, très bon travail ! Note: 16/20",
        timestamp: "2024-01-10 11:20",
        read: true
      }
    ]
  }
];

export const MessagesSection = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unread, 0);
  const onlineCount = conversations.filter(conv => conv.online).length;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simulate sending message
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-primary" />
            Messages
          </h1>
          <p className="text-muted-foreground mt-1">
            Communiquez avec vos professeurs et l'administration
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Archivés
          </Button>
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Nouveau message
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total conversations</p>
                <p className="text-2xl font-bold">{conversations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-warning/10">
                <Circle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Non lus</p>
                <p className="text-2xl font-bold text-warning">{totalUnread}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-success/10">
                <User className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En ligne</p>
                <p className="text-2xl font-bold text-success">{onlineCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Favoris</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                    selectedConversation?.id === conversation.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium ${
                        conversation.online ? 'ring-2 ring-success' : ''
                      }`}>
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm truncate">{conversation.name}</p>
                        {conversation.unread > 0 && (
                          <Badge className="text-xs ml-2">{conversation.unread}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.role}</p>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp.split(' ')[1]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium ${
                        selectedConversation.online ? 'ring-2 ring-success' : ''
                      }`}>
                        {selectedConversation.avatar}
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{selectedConversation.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
                      {selectedConversation.online && (
                        <p className="text-xs text-success">En ligne</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-4 flex-1 overflow-y-auto max-h-[350px]">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "Moi" ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "Moi" 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs opacity-70">{message.timestamp.split(' ')[1]}</p>
                          {message.sender === "Moi" && (
                            <CheckCheck className={`h-3 w-3 ${message.read ? 'text-success' : 'opacity-50'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[60px] resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Sélectionnez une conversation</p>
                <p className="text-muted-foreground">Choisissez une conversation pour commencer à échanger</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};