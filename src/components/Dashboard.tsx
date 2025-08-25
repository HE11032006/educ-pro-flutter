import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock,
  Star,
  Users,
  Bell,
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const recentGrades = [
  { subject: "Mathématiques", grade: 18, date: "2024-01-15", type: "Contrôle" },
  { subject: "Physique", grade: 16, date: "2024-01-14", type: "TP" },
  { subject: "Français", grade: 15, date: "2024-01-12", type: "Dissertation" },
];

const upcomingEvents = [
  { title: "Examen de Mathématiques", date: "2024-01-20", time: "14:00" },
  { title: "Réunion parents-professeurs", date: "2024-01-22", time: "18:00" },
  { title: "Sortie pédagogique", date: "2024-01-25", time: "09:00" },
];

const stats = [
  { title: "Moyenne générale", value: "16.2", trend: "+0.5", icon: TrendingUp, color: "success" },
  { title: "Présence", value: "96%", trend: "+2%", icon: Users, color: "primary" },
  { title: "Devoirs rendus", value: "24/25", trend: "100%", icon: BookOpen, color: "accent" },
  { title: "Heures de cours", value: "28h", trend: "Cette semaine", icon: Clock, color: "warning" },
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
              Bienvenue sur EducPro ! 👋
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Suivez votre progression scolaire, consultez vos notes et restez organisé avec votre emploi du temps.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground hover:bg-white/30">
                <Star className="h-4 w-4 mr-1" />
                Élève de l'année
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground hover:bg-white/30">
                <Award className="h-4 w-4 mr-1" />
                96% présence
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
        {/* Recent Grades */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Notes récentes
            </CardTitle>
            <Badge variant="outline">3 nouvelles</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div>
                  <p className="font-medium">{grade.subject}</p>
                  <p className="text-sm text-muted-foreground">{grade.type} • {grade.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{grade.grade}/20</p>
                  <Badge variant={grade.grade >= 16 ? "default" : grade.grade >= 12 ? "secondary" : "destructive"} className="text-xs">
                    {grade.grade >= 16 ? "Excellent" : grade.grade >= 12 ? "Bien" : "À améliorer"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Événements à venir
            </CardTitle>
            <Badge variant="outline">
              <Bell className="h-3 w-3 mr-1" />
              {upcomingEvents.length}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.date} à {event.time}
                  </p>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};