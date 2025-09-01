import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download,
  Search,
  Filter,
  Eye,
  Clock,
  User,
  Folder,
  ExternalLink
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Cours de Mathématiques - Chapitre 5",
    type: "pdf",
    subject: "Mathématiques",
    teacher: "M. Dupont",
    date: "2024-01-15",
    size: "2.3 MB",
    downloads: 45,
    description: "Fonctions dérivées et applications"
  },
  {
    id: 2,
    title: "TP Physique - Lois de Newton",
    type: "document",
    subject: "Physique",
    teacher: "Mme Martin",
    date: "2024-01-14",
    size: "1.8 MB",
    downloads: 32,
    description: "Travaux pratiques sur les lois fondamentales de la mécanique"
  },
  {
    id: 3,
    title: "Vidéo - La Révolution Française",
    type: "video",
    subject: "Histoire",
    teacher: "M. Moreau",
    date: "2024-01-12",
    size: "124 MB",
    downloads: 28,
    description: "Documentaire sur les événements de 1789-1799",
    duration: "45 min"
  },
  {
    id: 4,
    title: "Exercices Français - Analyse littéraire",
    type: "pdf",
    subject: "Français",
    teacher: "Mme Durand",
    date: "2024-01-10",
    size: "856 KB",
    downloads: 67,
    description: "Méthode d'analyse des textes littéraires"
  },
  {
    id: 5,
    title: "Audio - Prononciation Anglaise",
    type: "audio",
    subject: "Anglais",
    teacher: "Miss Smith",
    date: "2024-01-08",
    size: "15.2 MB",
    downloads: 39,
    description: "Exercices de prononciation niveau intermédiaire",
    duration: "25 min"
  },
  {
    id: 6,
    title: "Présentation - Système solaire",
    type: "presentation",
    subject: "Sciences",
    teacher: "M. Bernard",
    date: "2024-01-05",
    size: "8.4 MB",
    downloads: 51,
    description: "Exploration du système solaire et des planètes"
  }
];

const subjects = ["Tous", "Mathématiques", "Physique", "Français", "Histoire", "Anglais", "Sciences"];
const resourceTypes = ["Tous", "pdf", "video", "audio", "document", "presentation"];

const getResourceIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "document":
      return <FileText className="h-5 w-5 text-destructive" />;
    case "video":
      return <Video className="h-5 w-5 text-primary" />;
    case "audio":
      return <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-white"></div>
      </div>;
    case "presentation":
      return <BookOpen className="h-5 w-5 text-warning" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "pdf":
    case "document":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "video":
      return "bg-primary/10 text-primary border-primary/20";
    case "audio":
      return "bg-success/10 text-success border-success/20";
    case "presentation":
      return "bg-warning/10 text-warning border-warning/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "pdf":
      return "PDF";
    case "video":
      return "Vidéo";
    case "audio":
      return "Audio";
    case "document":
      return "Document";
    case "presentation":
      return "Présentation";
    default:
      return type;
  }
};

export const ResourcesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tous");
  const [selectedType, setSelectedType] = useState("Tous");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "Tous" || resource.subject === selectedSubject;
    const matchesType = selectedType === "Tous" || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const totalSize = resources.reduce((acc, resource) => {
    const size = parseFloat(resource.size.split(" ")[0]);
    const unit = resource.size.split(" ")[1];
    return acc + (unit === "MB" ? size : size / 1000);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/10 via-primary/5 to-warning/10 p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"></div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              <div className="p-3 rounded-xl bg-accent/10 backdrop-blur-sm">
                <Folder className="h-8 w-8 text-accent" />
              </div>
              Ressources
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Accédez à tous vos documents de cours et ressources pédagogiques
            </p>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent/80 hover:shadow-lg hover:shadow-accent/25 transition-all">
            <ExternalLink className="h-4 w-4" />
            Bibliothèque en ligne
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="relative overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total ressources</p>
                <p className="text-3xl font-bold mb-1">{resources.length}</p>
                <p className="text-xs text-primary/70">Disponibles</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg hover:shadow-success/10 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Téléchargements</p>
                <p className="text-3xl font-bold mb-1">{resources.reduce((acc, r) => acc + r.downloads, 0)}</p>
                <p className="text-xs text-success/70">Ce mois</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                <Download className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Taille totale</p>
                <p className="text-3xl font-bold mb-1">{totalSize.toFixed(1)}<span className="text-lg text-muted-foreground">MB</span></p>
                <p className="text-xs text-accent/70">Stockage utilisé</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <FileText className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg hover:shadow-warning/10 transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Matières</p>
                <p className="text-3xl font-bold mb-1">{subjects.length - 1}</p>
                <p className="text-xs text-warning/70">Actives</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10 group-hover:bg-warning/20 transition-colors">
                <Folder className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-sm bg-card/80 border-primary/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans les ressources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/80 border-primary/20 focus:border-primary/50 transition-colors backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Filter className="h-4 w-4 text-primary" />
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-input bg-background/80 text-sm hover:border-primary/50 focus:border-primary transition-colors backdrop-blur-sm"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background/80 text-sm hover:border-primary/50 focus:border-primary transition-colors backdrop-blur-sm"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "Tous" ? "Tous types" : getTypeLabel(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group backdrop-blur-sm bg-card/90 border-primary/10">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-3 rounded-xl ${getTypeColor(resource.type)} group-hover:scale-110 transition-transform duration-300`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className={`${getTypeColor(resource.type)} group-hover:scale-105 transition-transform`}>
                  {getTypeLabel(resource.type)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {resource.description}
              </p>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  {resource.teacher}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3 w-3" />
                  {resource.subject}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {resource.date}
                  </div>
                  <span>{resource.size}</span>
                </div>
                {resource.duration && (
                  <div className="flex items-center gap-2">
                    <Video className="h-3 w-3" />
                    Durée: {resource.duration}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Download className="h-3 w-3" />
                  {resource.downloads} téléchargements
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    Voir
                  </Button>
                  <Button size="sm" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune ressource trouvée</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou vos filtres.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};