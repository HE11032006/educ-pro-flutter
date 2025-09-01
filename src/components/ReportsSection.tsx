import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Star,
  Award,
  Target,
  BarChart3,
  Eye
} from "lucide-react";

const bulletins = [
  {
    id: 1,
    period: "1er Trimestre 2023-2024",
    date: "2024-01-15",
    status: "available",
    averageGeneral: 16.2,
    rank: 3,
    totalStudents: 28,
    downloaded: false,
    subjects: [
      { name: "Mathématiques", average: 16.5, coefficient: 4, rank: 2, evolution: "up" },
      { name: "Physique-Chimie", average: 15.2, coefficient: 3, rank: 5, evolution: "down" },
      { name: "Français", average: 14.8, coefficient: 4, rank: 8, evolution: "stable" },
      { name: "Histoire-Géo", average: 16.0, coefficient: 3, rank: 4, evolution: "up" },
      { name: "Anglais", average: 17.5, coefficient: 3, rank: 1, evolution: "up" },
      { name: "SVT", average: 15.8, coefficient: 2, rank: 6, evolution: "stable" },
      { name: "EPS", average: 18.0, coefficient: 1, rank: 1, evolution: "up" }
    ],
    comments: [
      { teacher: "M. Dupont", subject: "Mathématiques", comment: "Excellent élève, très sérieux dans son travail. Continue ainsi !" },
      { teacher: "Mme Martin", subject: "Physique-Chimie", comment: "Bonnes bases mais doit approfondir la méthodologie." },  
      { teacher: "Conseil de classe", subject: "Général", comment: "Très bon trimestre. Élève sérieux et motivé. Félicitations !" }
    ]
  },
  {
    id: 2,
    period: "2ème Trimestre 2023-2024",
    date: "2024-04-15",
    status: "coming",
    averageGeneral: null,
    rank: null,
    totalStudents: 28,
    downloaded: false
  },
  {
    id: 3,
    period: "3ème Trimestre 2023-2024", 
    date: "2024-07-15",
    status: "coming",
    averageGeneral: null,
    rank: null,
    totalStudents: 28,
    downloaded: false
  }
];

const getEvolutionIcon = (evolution: string) => {
  switch (evolution) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-success" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    case "stable":
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getSubjectColor = (average: number) => {
  if (average >= 16) return "text-success bg-success/10 border-success/20";
  if (average >= 14) return "text-primary bg-primary/10 border-primary/20";
  if (average >= 12) return "text-warning bg-warning/10 border-warning/20";
  return "text-destructive bg-destructive/10 border-destructive/20";
};

const getMention = (average: number) => {
  if (average >= 16) return "Très Bien";
  if (average >= 14) return "Bien";
  if (average >= 12) return "Assez Bien";
  if (average >= 10) return "Passable";
  return "Insuffisant";
};

export const ReportsSection = () => {
  const currentBulletin = bulletins.find(b => b.status === "available");
  const totalDownloads = bulletins.filter(b => b.downloaded).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-success/10 via-primary/5 to-warning/10 p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent"></div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              <div className="p-3 rounded-xl bg-success/10 backdrop-blur-sm">
                <FileText className="h-8 w-8 text-success" />
              </div>
              Bulletins scolaires
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Consultez et téléchargez vos bulletins de notes
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 backdrop-blur-sm bg-background/80 border-primary/20 hover:bg-primary/10">
              <BarChart3 className="h-4 w-4" />
              Graphiques
            </Button>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-success to-success/80 hover:shadow-lg hover:shadow-success/25 transition-all">
              <Download className="h-4 w-4" />
              Télécharger tout
            </Button>
          </div>
        </div>
      </div>

      {currentBulletin && (
        <>
          {/* Current Bulletin Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary-glow/10 border-primary/20 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Moyenne générale</p>
                    <p className="text-4xl font-bold text-primary mb-2">{currentBulletin.averageGeneral}<span className="text-lg text-muted-foreground">/20</span></p>
                    <Badge className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/30">{getMention(currentBulletin.averageGeneral!)}</Badge>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rang en classe</p>
                    <p className="text-3xl font-bold">{currentBulletin.rank}<span className="text-lg">/{currentBulletin.totalStudents}</span></p>
                    <p className="text-sm text-success font-medium">Top {Math.round((currentBulletin.rank! / currentBulletin.totalStudents) * 100)}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-success/10">
                    <Award className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Matières réussies</p>
                    <p className="text-3xl font-bold">{currentBulletin.subjects.filter(s => s.average >= 10).length}<span className="text-lg">/{currentBulletin.subjects.length}</span></p>
                    <p className="text-sm text-accent font-medium">{Math.round((currentBulletin.subjects.filter(s => s.average >= 10).length / currentBulletin.subjects.length) * 100)}% réussite</p>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Bulletins téléchargés</p>
                    <p className="text-3xl font-bold">{totalDownloads}<span className="text-lg">/{bulletins.length}</span></p>
                    <p className="text-sm text-muted-foreground">Archivés</p>
                  </div>
                  <div className="p-3 rounded-xl bg-warning/10">
                    <Download className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Détail par matière - {currentBulletin.period}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentBulletin.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${getSubjectColor(subject.average)}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{subject.name}</p>
                          <div className="flex items-center gap-2">
                            {getEvolutionIcon(subject.evolution)}
                            <span className="text-2xl font-bold text-primary">{subject.average}/20</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Coefficient: {subject.coefficient}</span>
                          <span>Rang: {subject.rank}/{currentBulletin.totalStudents}</span>
                          <Badge variant="outline" className={getSubjectColor(subject.average)}>
                            {getMention(subject.average)}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <Progress value={(subject.average / 20) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Appréciations des professeurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentBulletin.comments.map((comment, index) => (
                <div key={index} className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{comment.subject}</Badge>
                      <span className="text-sm font-medium">{comment.teacher}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{comment.comment}"</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {/* All Bulletins */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les bulletins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bulletins.map((bulletin) => (
              <div key={bulletin.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    bulletin.status === "available" 
                      ? "bg-success/10 border border-success/20" 
                      : "bg-muted/10 border border-muted/20"
                  }`}>
                    <FileText className={`h-6 w-6 ${
                      bulletin.status === "available" ? "text-success" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{bulletin.period}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {bulletin.date}
                      </div>
                      {bulletin.averageGeneral && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Moyenne: {bulletin.averageGeneral}/20
                        </div>
                      )}
                      {bulletin.rank && (
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Rang: {bulletin.rank}/{bulletin.totalStudents}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={bulletin.status === "available" ? "default" : "secondary"}>
                    {bulletin.status === "available" ? "Disponible" : "À venir"}
                  </Badge>
                  {bulletin.status === "available" && (
                    <>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};