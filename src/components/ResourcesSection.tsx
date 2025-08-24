import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  Folder, 
  Search,
  Filter,
  Plus,
  FileText,
  Download,
  Edit,
  Trash2,
  Upload,
  Link,
  BookOpen,
  Video,
  Image,
  File
} from "lucide-react";

// Classes et matières
const classes = ["Première année B1", "Première année B2", "Deuxième année A1", "Deuxième année A2"];
const subjects = ["Mathématiques", "Physique", "Français", "Histoire", "Anglais", "Philosophie", "SVT"];

// Types de ressources
const resourceTypes = [
  { id: "document", label: "Document", icon: FileText },
  { id: "video", label: "Vidéo", icon: Video },
  { id: "image", label: "Image", icon: Image },
  { id: "link", label: "Lien", icon: Link },
  { id: "other", label: "Autre", icon: File }
];

// Données d'exemple des ressources
const resourcesData = [
  {
    id: 1,
    title: "Cours de Mathématiques - Chapitre 1",
    description: "Introduction aux fonctions polynomiales",
    type: "document",
    subject: "Mathématiques",
    class: "Première année B1",
    dateAdded: "2024-01-15",
    fileSize: "2.5 MB",
    downloads: 24
  },
  {
    id: 2,
    title: "Vidéo explicative - Physique Quantique",
    description: "Concepts de base de la physique quantique",
    type: "video",
    subject: "Physique",
    class: "Deuxième année A1",
    dateAdded: "2024-01-20",
    fileSize: "150 MB",
    downloads: 18
  },
  {
    id: 3,
    title: "Exercices corrigés - Français",
    description: "Analyse de textes littéraires",
    type: "document",
    subject: "Français",
    class: "Première année B2",
    dateAdded: "2024-01-25",
    fileSize: "1.2 MB",
    downloads: 32
  },
  {
    id: 4,
    title: "Carte mentale - Histoire moderne",
    description: "Résumé de la révolution française",
    type: "image",
    subject: "Histoire",
    class: "Deuxième année A2",
    dateAdded: "2024-02-01",
    fileSize: "800 KB",
    downloads: 15
  },
  {
    id: 5,
    title: "Lien vers simulation SVT",
    description: "Simulation interactive du système circulatoire",
    type: "link",
    subject: "SVT",
    class: "Première année B1",
    dateAdded: "2024-02-05",
    fileSize: "-",
    downloads: 28
  }
];

export const ResourcesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Formulaire pour nouvelle ressource
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "",
    subject: "",
    class: "",
    link: ""
  });

  // Filtrer les ressources
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || resource.class === selectedClass;
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    
    return matchesSearch && matchesClass && matchesSubject && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const resourceType = resourceTypes.find(rt => rt.id === type);
    const IconComponent = resourceType?.icon || File;
    return <IconComponent className="h-4 w-4" />;
  };

  const getTypeBadge = (type: string) => {
    const resourceType = resourceTypes.find(rt => rt.id === type);
    const colors = {
      document: "bg-blue-100 text-blue-800 border-blue-200",
      video: "bg-red-100 text-red-800 border-red-200",
      image: "bg-green-100 text-green-800 border-green-200",
      link: "bg-purple-100 text-purple-800 border-purple-200",
      other: "bg-gray-100 text-gray-800 border-gray-200"
    };
    
    return (
      <Badge variant="secondary" className={colors[type as keyof typeof colors] || colors.other}>
        {resourceType?.label || "Autre"}
      </Badge>
    );
  };

  const handleAddResource = () => {
    console.log("Nouvelle ressource:", newResource);
    setIsAddDialogOpen(false);
    setNewResource({
      title: "",
      description: "",
      type: "",
      subject: "",
      class: "",
      link: ""
    });
  };

  // Calculer les statistiques
  const totalResources = resourcesData.length;
  const documentCount = resourcesData.filter(r => r.type === "document").length;
  const videoCount = resourcesData.filter(r => r.type === "video").length;
  const totalDownloads = resourcesData.reduce((sum, r) => sum + r.downloads, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Folder className="h-8 w-8 text-primary" />
            Gestion des Ressources
          </h1>
          <p className="text-muted-foreground">
            Gérez les documents, vidéos et liens pédagogiques pour vos classes
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une ressource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle ressource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre de la ressource"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newResource.description}
                  onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la ressource"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newResource.type} onValueChange={(value) => setNewResource(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subject">Matière</Label>
                  <Select value={newResource.subject} onValueChange={(value) => setNewResource(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Matière" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="class">Classe</Label>
                <Select value={newResource.class} onValueChange={(value) => setNewResource(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {newResource.type === "link" ? (
                <div>
                  <Label htmlFor="link">Lien URL</Label>
                  <Input
                    id="link"
                    type="url"
                    value={newResource.link}
                    onChange={(e) => setNewResource(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="file">Fichier</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour sélectionner un fichier ou glissez-déposez
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddResource} className="flex-1">
                  Ajouter
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Folder className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalResources}</p>
                <p className="text-sm text-muted-foreground">Total ressources</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{documentCount}</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Video className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{videoCount}</p>
                <p className="text-sm text-muted-foreground">Vidéos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Download className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalDownloads}</p>
                <p className="text-sm text-muted-foreground">Téléchargements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et Recherche */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher une ressource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full lg:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les classes</SelectItem>
            {classes.map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full lg:w-48">
            <BookOpen className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Matière" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les matières</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full lg:w-48">
            <File className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {resourceTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                <div className="flex items-center gap-2">
                  <type.icon className="h-4 w-4" />
                  {type.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Liste des ressources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(resource.type)}
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {resource.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {getTypeBadge(resource.type)}
                <Badge variant="outline" className="text-xs">
                  {resource.subject}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {resource.class}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{resource.dateAdded}</span>
                <span>{resource.fileSize}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {resource.downloads} téléchargements
                </span>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Folder className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Aucune ressource trouvée</h3>
            <p className="text-muted-foreground">
              Aucune ressource ne correspond à vos critères de recherche.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};