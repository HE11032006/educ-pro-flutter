import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { 
  BookOpen, 
  Search,
  Filter,
  Plus,
  Save,
  Users,
  FileSpreadsheet
} from "lucide-react";

// Classes disponibles
const classes = ["Première année B1", "Première année B2", "Deuxième année A1", "Deuxième année A2"];

// Matières
const subjects = ["Mathématiques", "Physique", "Français", "Histoire", "Anglais", "Philosophie", "SVT"];

// Données d'exemple des étudiants
const studentsData = [
  { id: 1, firstName: "Jean", lastName: "Dupont", class: "Première année B1" },
  { id: 2, firstName: "Marie", lastName: "Martin", class: "Première année B1" },
  { id: 3, firstName: "Pierre", lastName: "Durand", class: "Première année B2" },
  { id: 4, firstName: "Sophie", lastName: "Bernard", class: "Deuxième année A1" },
  { id: 5, firstName: "Lucas", lastName: "Petit", class: "Deuxième année A1" },
  { id: 6, firstName: "Emma", lastName: "Robert", class: "Deuxième année A2" },
  { id: 7, firstName: "Thomas", lastName: "Richard", class: "Première année B1" },
  { id: 8, firstName: "Camille", lastName: "Moreau", class: "Première année B2" },
  { id: 9, firstName: "Léa", lastName: "Dubois", class: "Deuxième année A1" },
  { id: 10, firstName: "Antoine", lastName: "Leroy", class: "Deuxième année A2" },
];

export const GradesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [grades, setGrades] = useState<{[key: string]: number}>({});

  // Filtrer les étudiants
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleGradeChange = (studentId: number, subject: string, grade: number) => {
    const key = `${studentId}-${subject}`;
    setGrades(prev => ({ ...prev, [key]: grade }));
  };

  const saveGrades = () => {
    // Ici on sauvegarderait les notes dans la base de données
    console.log("Sauvegarde des notes:", grades);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Gestion des Notes
          </h1>
          <p className="text-muted-foreground">
            Saisissez et gérez les notes des étudiants par classe et matière
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm" onClick={saveGrades}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{studentsData.length}</p>
                <p className="text-sm text-muted-foreground">Étudiants total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {classes.map((className) => {
          const count = studentsData.filter(s => s.class === className).length;
          return (
            <Card key={className}>
              <CardContent className="p-4">
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{className}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filtres et Recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrer par classe" />
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
      </div>

      {/* Tableau des étudiants et notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Saisie des notes ({filteredStudents.length} étudiants affichés)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Nom</TableHead>
                  <TableHead className="font-semibold">Prénom</TableHead>
                  <TableHead className="font-semibold">Classe</TableHead>
                  {subjects.map((subject) => (
                    <TableHead key={subject} className="text-center min-w-[100px] font-semibold">
                      {subject}
                    </TableHead>
                  ))}
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-secondary/50">
                    <TableCell className="font-medium">{student.lastName}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {student.class}
                      </Badge>
                    </TableCell>
                    {subjects.map((subject) => {
                      const gradeKey = `${student.id}-${subject}`;
                      const currentGrade = grades[gradeKey];
                      return (
                        <TableCell key={subject} className="text-center">
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            placeholder="--"
                            value={currentGrade || ""}
                            onChange={(e) => handleGradeChange(student.id, subject, parseFloat(e.target.value) || 0)}
                            className="w-20 text-center"
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Save className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};