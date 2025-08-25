import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  Calendar, 
  Clock,
  User,
  Pin,
  AlertTriangle,
  Info,
  CheckCircle,
  Filter,
  Bell,
  Eye,
  BookOpen
} from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Changement d'horaire - Cours de Mathématiques",
    content: "Le cours de mathématiques du vendredi 19 janvier est avancé à 14h00 au lieu de 15h00. Merci de vous présenter en salle A203 à l'heure prévue.",
    type: "important",
    category: "Emploi du temps",
    author: "M. Dupont",
    date: "2024-01-15",
    time: "14:30",
    pinned: true,
    read: false,
    expiresAt: "2024-01-19"
  },
  {
    id: 2,
    title: "Nouvelle ressource disponible - Physique Quantique",
    content: "Un nouveau chapitre sur la physique quantique est maintenant disponible dans la section Ressources. Ce document comprend des exercices pratiques et des vidéos explicatives.",
    type: "info",
    category: "Ressources",
    author: "Mme Martin",
    date: "2024-01-14",
    time: "16:45",
    pinned: false,
    read: true,
    expiresAt: null
  },
  {
    id: 3,
    title: "Examens de mi-semestre - Planning",
    content: "Les examens de mi-semestre auront lieu du 22 au 26 janvier 2024. Consultez votre emploi du temps pour connaître les dates et heures spécifiques de chaque matière.",
    type: "urgent",
    category: "Examens",
    author: "Administration",
    date: "2024-01-12",
    time: "09:00",
    pinned: true,
    read: false,
    expiresAt: "2024-01-26"
  },
  {
    id: 4,
    title: "Sortie pédagogique - Musée des Sciences",
    content: "Une sortie pédagogique au Musée des Sciences est organisée le 25 janvier. Les élèves intéressés doivent s'inscrire avant le 20 janvier auprès de leur professeur principal.",
    type: "event",
    category: "Sorties",
    author: "Mme Durand",
    date: "2024-01-10",
    time: "11:20",
    pinned: false,
    read: true,
    expiresAt: "2024-01-20"
  },
  {
    id: 5,
    title: "Maintenance informatique - Interruption de service",
    content: "Une maintenance du système informatique aura lieu le samedi 20 janvier de 08h00 à 12h00. L'accès à la plateforme sera temporairement indisponible.",
    type: "warning",
    category: "Technique",
    author: "Service IT",
    date: "2024-01-08",
    time: "13:15",
    pinned: false,
    read: true,
    expiresAt: "2024-01-20"
  },
  {
    id: 6,
    title: "Nouvelle politique de présence",
    content: "À partir du 1er février, la nouvelle politique de présence entre en vigueur. Consultez le règlement intérieur mis à jour pour tous les détails.",
    type: "info",
    category: "Règlement",
    author: "Direction",
    date: "2024-01-05",
    time: "08:30",
    pinned: false,
    read: true,
    expiresAt: null
  }
];

const categories = ["Toutes", "Emploi du temps", "Ressources", "Examens", "Sorties", "Technique", "Règlement"];
const types = ["Tous", "urgent", "important", "info", "warning", "event"];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "urgent":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "important":
      return <Pin className="h-4 w-4 text-warning" />;
    case "info":
      return <Info className="h-4 w-4 text-primary" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case "event":
      return <Calendar className="h-4 w-4 text-success" />;
    default:
      return <Megaphone className="h-4 w-4 text-muted-foreground" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "urgent":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "important":
      return "bg-warning/10 text-warning border-warning/20";
    case "info":
      return "bg-primary/10 text-primary border-primary/20";
    case "warning":
      return "bg-warning/10 text-warning border-warning/20";
    case "event":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "urgent":
      return "Urgent";
    case "important":
      return "Important";
    case "info":
      return "Information";
    case "warning":
      return "Attention";
    case "event":
      return "Événement";
    default:
      return type;
  }
};

export const AnnouncementsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedType, setSelectedType] = useState("Tous");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === "Toutes" || announcement.category === selectedCategory;
    const matchesType = selectedType === "Tous" || announcement.type === selectedType;
    const matchesRead = !showUnreadOnly || !announcement.read;
    
    return matchesCategory && matchesType && matchesRead;
  });

  const unreadCount = announcements.filter(a => !a.read).length;
  const pinnedCount = announcements.filter(a => a.pinned).length;
  const urgentCount = announcements.filter(a => a.type === "urgent").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-primary" />
            Annonces
          </h1>
          <p className="text-muted-foreground mt-1">
            Restez informé des dernières actualités et informations importantes
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button 
            variant={showUnreadOnly ? "default" : "outline"}
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {showUnreadOnly ? "Toutes" : "Non lues"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total annonces</p>
                <p className="text-3xl font-bold text-primary">{announcements.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Non lues</p>
                <p className="text-3xl font-bold text-warning">{unreadCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <Bell className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Épinglées</p>
                <p className="text-3xl font-bold text-accent">{pinnedCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <Pin className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgentes</p>
                <p className="text-3xl font-bold text-destructive">{urgentCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtres:</span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-sm"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === "Tous" ? "Tous types" : getTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className={`hover:shadow-lg transition-all duration-300 ${
              !announcement.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
            } ${announcement.pinned ? 'ring-1 ring-warning/20 bg-warning/5' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(announcement.type)} mt-1`}>
                    {getTypeIcon(announcement.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.pinned && (
                        <Pin className="h-4 w-4 text-warning" />
                      )}
                      {!announcement.read && (
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      )}
                      <Badge variant="outline" className={getTypeColor(announcement.type)}>
                        {getTypeLabel(announcement.type)}
                      </Badge>
                      <Badge variant="outline">
                        {announcement.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">
                      {announcement.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mb-3">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {announcement.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {announcement.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {announcement.time}
                      </div>
                      {announcement.expiresAt && (
                        <div className="flex items-center gap-1 text-warning">
                          <AlertTriangle className="h-3 w-3" />
                          Expire le {announcement.expiresAt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!announcement.read && (
                  <Button size="sm" variant="outline" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Marquer comme lu
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune annonce trouvée</h3>
            <p className="text-muted-foreground">
              {showUnreadOnly 
                ? "Toutes les annonces ont été lues !" 
                : "Essayez de modifier vos critères de filtrage."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};