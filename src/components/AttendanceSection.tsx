import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3
} from "lucide-react";

const attendanceData = [
  { date: "2024-01-15", status: "present", subject: "Mathématiques", time: "08:00-10:00" },
  { date: "2024-01-15", status: "present", subject: "Physique", time: "10:15-12:15" },
  { date: "2024-01-15", status: "present", subject: "Français", time: "14:00-15:00" },
  { date: "2024-01-14", status: "absent", subject: "Histoire", time: "08:00-09:00", reason: "Maladie" },
  { date: "2024-01-14", status: "present", subject: "Anglais", time: "09:00-10:00" },
  { date: "2024-01-14", status: "present", subject: "Sport", time: "14:00-16:00" },
  { date: "2024-01-12", status: "late", subject: "Mathématiques", time: "08:00-10:00", delay: "15 min" },
  { date: "2024-01-12", status: "present", subject: "Chimie", time: "10:15-12:15" },
];

const monthlyStats = {
  totalCourses: 85,
  present: 80,
  absent: 3,
  late: 2,
  attendanceRate: 94.1
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "absent":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "late":
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "present":
      return "text-success bg-success/10 border-success/20";
    case "absent":
      return "text-destructive bg-destructive/10 border-destructive/20";
    case "late":
      return "text-warning bg-warning/10 border-warning/20";
    default:
      return "text-muted-foreground bg-muted/10 border-muted/20";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "present":
      return "Présent";
    case "absent":
      return "Absent";
    case "late":
      return "Retard";
    default:
      return "Inconnu";
  }
};

export const AttendanceSection = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Présences
          </h1>
          <p className="text-muted-foreground mt-1">
            Suivi de votre assiduité et de vos présences
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Graphiques
          </Button>
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Justifier absence
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taux de présence</p>
                <p className="text-3xl font-bold text-success">{monthlyStats.attendanceRate}%</p>
                <p className="text-sm text-success font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2% ce mois
                </p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cours présents</p>
                <p className="text-3xl font-bold">{monthlyStats.present}</p>
                <p className="text-sm text-muted-foreground">sur {monthlyStats.totalCourses}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absences</p>
                <p className="text-3xl font-bold text-destructive">{monthlyStats.absent}</p>
                <p className="text-sm text-muted-foreground">ce mois</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retards</p>
                <p className="text-3xl font-bold text-warning">{monthlyStats.late}</p>
                <p className="text-sm text-muted-foreground">ce mois</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Progress */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Objectif de présence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {monthlyStats.attendanceRate}%
              </div>
              <p className="text-sm text-muted-foreground">Objectif: 95%</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span>{monthlyStats.attendanceRate}/95%</span>
                </div>
                <Progress value={monthlyStats.attendanceRate} className="h-3" />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Présent
                  </span>
                  <span className="font-medium">{monthlyStats.present}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <XCircle className="h-3 w-3 text-destructive" />
                    Absent
                  </span>
                  <span className="font-medium">{monthlyStats.absent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Retard
                  </span>
                  <span className="font-medium">{monthlyStats.late}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Présences récentes</CardTitle>
            <Badge variant="outline">{attendanceData.length} cours</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceData.slice(0, 6).map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                  </div>
                  <div>
                    <p className="font-medium">{record.subject}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {record.date}
                      <Clock className="h-3 w-3" />
                      {record.time}
                    </p>
                    {record.reason && (
                      <p className="text-xs text-destructive mt-1">Motif: {record.reason}</p>
                    )}
                    {record.delay && (
                      <p className="text-xs text-warning mt-1">Retard: {record.delay}</p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(record.status)}>
                  {getStatusLabel(record.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Vue hebdomadaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((day, index) => {
              const dayAttendance = Math.floor(Math.random() * 100) + 85; // Simulation
              return (
                <div key={day} className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="font-medium text-sm mb-2">{day}</p>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {dayAttendance}%
                  </div>
                  <Progress value={dayAttendance} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};