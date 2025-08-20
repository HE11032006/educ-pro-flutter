import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  TrendingUp, 
  Download,
  Calendar,
  Target,
  BarChart3
} from "lucide-react";

const subjects = [
  { 
    name: "Mathématiques", 
    average: 16.5, 
    grades: [18, 15, 17, 16], 
    coefficient: 4,
    target: 16,
    progress: 92
  },
  { 
    name: "Physique-Chimie", 
    average: 15.2, 
    grades: [16, 14, 15, 16], 
    coefficient: 3,
    target: 15,
    progress: 85
  },
  { 
    name: "Français", 
    average: 14.8, 
    grades: [15, 14, 15, 14], 
    coefficient: 4,
    target: 15,
    progress: 78
  },
  { 
    name: "Histoire-Géo", 
    average: 16.0, 
    grades: [17, 15, 16, 16], 
    coefficient: 3,
    target: 14,
    progress: 95
  },
  { 
    name: "Anglais", 
    average: 17.5, 
    grades: [18, 17, 18, 17], 
    coefficient: 3,
    target: 16,
    progress: 98
  },
];

const recentGrades = [
  { subject: "Mathématiques", grade: 18, date: "2024-01-15", type: "Contrôle", coefficient: 2 },
  { subject: "Physique", grade: 16, date: "2024-01-14", type: "TP", coefficient: 1 },
  { subject: "Français", grade: 15, date: "2024-01-12", type: "Dissertation", coefficient: 3 },
  { subject: "Anglais", grade: 17, date: "2024-01-10", type: "Oral", coefficient: 2 },
  { subject: "Histoire", grade: 16, date: "2024-01-08", type: "Contrôle", coefficient: 2 },
];

export const GradesSection = () => {
  const overallAverage = subjects.reduce((acc, subject) => 
    acc + (subject.average * subject.coefficient), 0
  ) / subjects.reduce((acc, subject) => acc + subject.coefficient, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Notes & Bulletins
          </h1>
          <p className="text-muted-foreground mt-1">
            Suivez votre progression et téléchargez vos bulletins
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Graphiques
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Bulletin PDF
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Moyenne générale</p>
                <p className="text-3xl font-bold text-primary">{overallAverage.toFixed(1)}/20</p>
                <p className="text-sm text-success font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.3 ce trimestre
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rang en classe</p>
                <p className="text-3xl font-bold">3<span className="text-lg">/28</span></p>
                <Badge variant="outline" className="text-xs">Top 11%</Badge>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Objectifs atteints</p>
                <p className="text-3xl font-bold">4<span className="text-lg">/5</span></p>
                <p className="text-sm text-success font-medium">80% réalisés</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <Target className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subjects Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Moyennes par matière</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{subject.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Coef. {subject.coefficient} • Objectif: {subject.target}/20
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      {subject.average}/20
                    </p>
                    <Badge 
                      variant={subject.average >= subject.target ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {subject.average >= subject.target ? "Objectif atteint" : "En cours"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression vers objectif</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Notes récentes</CardTitle>
            <Badge variant="outline">{recentGrades.length} notes</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{grade.subject}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      {grade.type} • Coef. {grade.coefficient}
                      <Calendar className="h-3 w-3" />
                      {grade.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{grade.grade}/20</p>
                  <Badge 
                    variant={grade.grade >= 16 ? "default" : grade.grade >= 12 ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {grade.grade >= 16 ? "Excellent" : grade.grade >= 12 ? "Bien" : "À améliorer"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};