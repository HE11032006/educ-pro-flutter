import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Users, 
  Search,
  Filter,
  CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  FileSpreadsheet,
  Save,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// Classes disponibles
const classes = ["Première année B1", "Première année B2", "Deuxième année A1", "Deuxième année A2"];

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

type AttendanceStatus = "present" | "absent" | "late" | "";

export const AttendanceSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<{[key: string]: AttendanceStatus}>({});

  // Filtrer les étudiants
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAttendanceChange = (studentId: number, status: AttendanceStatus) => {
    const key = `${studentId}-${format(selectedDate, "yyyy-MM-dd")}`;
    setAttendance(prev => ({ ...prev, [key]: status }));
  };

  const getAttendanceStatus = (studentId: number): AttendanceStatus => {
    const key = `${studentId}-${format(selectedDate, "yyyy-MM-dd")}`;
    return attendance[key] || "";
  };

  const saveAttendance = () => {
    console.log("Sauvegarde des présences:", attendance);
  };

  // Calculer les statistiques
  const totalStudents = filteredStudents.length;
  const presentCount = filteredStudents.filter(s => getAttendanceStatus(s.id) === "present").length;
  const absentCount = filteredStudents.filter(s => getAttendanceStatus(s.id) === "absent").length;
  const lateCount = filteredStudents.filter(s => getAttendanceStatus(s.id) === "late").length;

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Présent</Badge>;
      case "absent":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">Absent</Badge>;
      case "late":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Retard</Badge>;
      default:
        return <Badge variant="outline">Non défini</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-primary" />
            Gestion des Présences
          </h1>
          <p className="text-muted-foreground">
            Marquez les présences, absences et retards des étudiants
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm" onClick={saveAttendance}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total étudiants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Présents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                <p className="text-sm text-muted-foreground">Absents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
                <p className="text-sm text-muted-foreground">En retard</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {format(selectedDate, "dd MMMM yyyy", { locale: fr })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tableau des présences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Feuille de présence - {format(selectedDate, "dd MMMM yyyy", { locale: fr })}
            <span className="text-sm font-normal text-muted-foreground">
              ({filteredStudents.length} étudiants affichés)
            </span>
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
                  <TableHead className="text-center font-semibold">Statut</TableHead>
                  <TableHead className="text-center font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const status = getAttendanceStatus(student.id);
                  return (
                    <TableRow key={student.id} className="hover:bg-secondary/50">
                      <TableCell className="font-medium">{student.lastName}</TableCell>
                      <TableCell>{student.firstName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {student.class}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(status)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            size="sm"
                            variant={status === "present" ? "default" : "outline"}
                            onClick={() => handleAttendanceChange(student.id, "present")}
                            className={cn(
                              "h-8 w-8 p-0",
                              status === "present" && "bg-green-600 hover:bg-green-700"
                            )}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={status === "absent" ? "default" : "outline"}
                            onClick={() => handleAttendanceChange(student.id, "absent")}
                            className={cn(
                              "h-8 w-8 p-0",
                              status === "absent" && "bg-red-600 hover:bg-red-700"
                            )}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={status === "late" ? "default" : "outline"}
                            onClick={() => handleAttendanceChange(student.id, "late")}
                            className={cn(
                              "h-8 w-8 p-0",
                              status === "late" && "bg-yellow-600 hover:bg-yellow-700"
                            )}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};