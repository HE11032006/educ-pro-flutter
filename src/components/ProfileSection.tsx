import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Settings,
  Camera,
  Edit,
  Save,
  X,
  Shield,
  Bell,
  Palette,
  Download,
  Upload,
  Award,
  Target,
  TrendingUp
} from "lucide-react";

const studentProfile = {
  personalInfo: {
    firstName: "Alexandre",
    lastName: "Dupuis", 
    dateOfBirth: "2006-03-15",
    email: "alexandre.dupuis@educpro.fr",
    phone: "06 12 34 56 78",
    address: "123 Rue de l'École, 75001 Paris",
    studentId: "EDU2024001",
    class: "Terminale S",
    startDate: "2021-09-01"
  },
  academic: {
    level: "Terminale S",
    section: "Sciences",
    mainSubjects: ["Mathématiques", "Physique-Chimie", "SVT"],
    optionalSubjects: ["Anglais renforcé", "Informatique"],
    averageGrade: 16.2,
    rank: 3,
    totalStudents: 28,
    attendance: 96,
    objectives: [
      { subject: "Mathématiques", current: 16.5, target: 17.0, progress: 89 },
      { subject: "Physique", current: 15.2, target: 16.0, progress: 78 },
      { subject: "SVT", current: 15.8, target: 16.5, progress: 85 }
    ]
  },
  achievements: [
    { title: "Élève de l'année", date: "2023", type: "excellence" },
    { title: "Prix de mathématiques", date: "2023", type: "subject" },
    { title: "Mention Très Bien", date: "Trimestre 1", type: "grade" },
    { title: "Parfaite assiduité", date: "2023", type: "attendance" }
  ],
  preferences: {
    theme: "system",
    notifications: {
      email: true,
      push: true,
      grades: true,
      schedule: true,
      announcements: true
    },
    language: "fr",
    privacy: "public"
  }
};

export const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState(studentProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Save changes logic here
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "excellence":
        return <Award className="h-5 w-5 text-warning" />;
      case "subject":
        return <BookOpen className="h-5 w-5 text-primary" />;
      case "grade":
        return <TrendingUp className="h-5 w-5 text-success" />;
      case "attendance":
        return <Target className="h-5 w-5 text-accent" />;
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const tabs = [
    { id: "personal", label: "Informations personnelles", icon: User },
    { id: "academic", label: "Parcours académique", icon: BookOpen },
    { id: "achievements", label: "Récompenses", icon: Award },
    { id: "preferences", label: "Préférences", icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/10 via-primary/5 to-success/10 p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"></div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              <div className="p-3 rounded-xl bg-accent/10 backdrop-blur-sm">
                <User className="h-8 w-8 text-accent" />
              </div>
              Mon Profil
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Gérez vos informations personnelles et préférences
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="backdrop-blur-sm bg-background/80 border-destructive/20 hover:bg-destructive/10">
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-success to-success/80 hover:shadow-lg hover:shadow-success/25 transition-all">
                  <Save className="h-4 w-4 mr-2" />
                  Enregistrer
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-accent to-accent/80 hover:shadow-lg hover:shadow-accent/25 transition-all">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1 backdrop-blur-sm bg-card/90 border-primary/10 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <div className="w-28 h-28 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-3xl font-bold text-primary mx-auto mb-4 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                {profileData.personalInfo.firstName[0]}{profileData.personalInfo.lastName[0]}
              </div>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-accent/10 border-accent/30 hover:bg-accent/20 hover:scale-110 transition-all">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
            </CardTitle>
            <p className="text-muted-foreground text-lg">{profileData.academic.level}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge className="mb-2">{profileData.personalInfo.studentId}</Badge>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{profileData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.academic.level}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{profileData.academic.averageGrade}</p>
                  <p className="text-xs text-muted-foreground">Moyenne</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{profileData.academic.rank}</p>
                  <p className="text-xs text-muted-foreground">Rang</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={profileData.personalInfo.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: { ...profileData.personalInfo, firstName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={profileData.personalInfo.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: { ...profileData.personalInfo, lastName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.personalInfo.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: { ...profileData.personalInfo, email: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profileData.personalInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: { ...profileData.personalInfo, phone: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date de naissance</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.personalInfo.dateOfBirth}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        personalInfo: { ...profileData.personalInfo, dateOfBirth: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">N° étudiant</Label>
                    <Input
                      id="studentId"
                      value={profileData.personalInfo.studentId}
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    value={profileData.personalInfo.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      personalInfo: { ...profileData.personalInfo, address: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "academic" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Parcours académique</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Classe actuelle</Label>
                      <p className="text-lg font-medium">{profileData.academic.level}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Section</Label>
                      <p className="text-lg font-medium">{profileData.academic.section}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Début de scolarité</Label>
                      <p className="text-lg font-medium">{profileData.personalInfo.startDate}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Matières principales</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.academic.mainSubjects.map((subject, index) => (
                        <Badge key={index} variant="default">{subject}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Options</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.academic.optionalSubjects.map((subject, index) => (
                        <Badge key={index} variant="outline">{subject}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Objectifs académiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.academic.objectives.map((objective, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{objective.subject}</span>
                        <span className="text-sm text-muted-foreground">
                          {objective.current}/20 → {objective.target}/20
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${objective.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{objective.progress}% de l'objectif atteint</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "achievements" && (
            <Card>
              <CardHeader>
                <CardTitle>Récompenses et distinctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {getAchievementIcon(achievement.type)}
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label>Notifications push</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      {profileData.preferences.notifications.push ? "Activées" : "Désactivées"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label>Notifications email</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      {profileData.preferences.notifications.email ? "Activées" : "Désactivées"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Apparence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <Label>Thème</Label>
                    </div>
                    <select className="px-3 py-2 rounded-md border border-input bg-background text-sm">
                      <option value="system">Système</option>
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Données</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Exporter mes données
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Importer des données
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};