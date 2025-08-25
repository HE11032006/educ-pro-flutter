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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Folder className="h-8 w-8 text-primary" />
            Ressources
          </h1>
          <p className="text-muted-foreground mt-1">
            Accédez à tous vos documents de cours et ressources pédagogiques
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          Bibliothèque en ligne
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total ressources</p>
                <p className="text-3xl font-bold">{resources.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Téléchargements</p>
                <p className="text-3xl font-bold">{resources.reduce((acc, r) => acc + r.downloads, 0)}</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Download className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taille totale</p>
                <p className="text-3xl font-bold">{totalSize.toFixed(1)}<span className="text-lg">MB</span></p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matières</p>
                <p className="text-3xl font-bold">{subjects.length - 1}</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <Folder className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher dans les ressources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-sm"
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
          <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-2">
                      {resource.title}
                    </CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className={getTypeColor(resource.type)}>
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