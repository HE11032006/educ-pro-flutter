import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  Clock,
  Users,
  Bell,
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const stats = [
  { title: "Total étudiants", value: "42", trend: "4 classes", icon: Users, color: "primary" },
  { title: "Cours plannifiés", value: "120", trend: "Cette semaine", icon: BookOpen, color: "accent" },
  { title: "Professeurs", value: "15", trend: "Actifs", icon: Users, color: "success" },
  { title: "Salles utilisées", value: "12", trend: "Disponibles", icon: Clock, color: "warning" },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Education" 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="relative p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Interface d'Administration EducPro 👨‍🏫
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Gérez les notes, emplois du temps et suivez la progression de vos étudiants.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground hover:bg-white/30">
                <Users className="h-4 w-4 mr-1" />
                Administrateur
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground hover:bg-white/30">
                <Award className="h-4 w-4 mr-1" />
                EducPro 2024
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm text-${stat.color} font-medium`}>
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Activité récente
            </CardTitle>
            <Badge variant="outline">Aujourd'hui</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div>
                <p className="font-medium">Note saisie - Mathématiques</p>
                <p className="text-sm text-muted-foreground">Première année B1 • Il y a 2h</p>
              </div>
              <Badge variant="default" className="text-xs">
                Complété
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div>
                <p className="font-medium">Emploi du temps modifié</p>
                <p className="text-sm text-muted-foreground">Deuxième année A1 • Il y a 4h</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Mis à jour
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div>
                <p className="font-medium">Nouveau cours ajouté</p>
                <p className="text-sm text-muted-foreground">Physique - Salle B101 • Hier</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Planifié
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Tâches à venir
            </CardTitle>
            <Badge variant="outline">
              <Bell className="h-3 w-3 mr-1" />
              3 prioritaires
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Saisir notes de contrôle</p>
                <p className="text-sm text-muted-foreground">
                  Mathématiques - Première année B1
                </p>
              </div>
              <Badge variant="destructive" className="text-xs">Urgent</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Planifier examen final</p>
                <p className="text-sm text-muted-foreground">
                  Toutes classes - Semaine 15
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">À faire</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Réunion équipe pédagogique</p>
                <p className="text-sm text-muted-foreground">
                  Demain 14h00 - Salle des profs
                </p>
              </div>
              <Badge variant="outline" className="text-xs">Planifié</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};