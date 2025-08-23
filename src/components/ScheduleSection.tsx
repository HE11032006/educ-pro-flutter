import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit,
  Trash2,
  Save,
  BookOpen,
  Users,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const classes = ["Première année B1", "Première année B2", "Deuxième année A1", "Deuxième année A2"];
const subjects = ["Mathématiques", "Physique", "Français", "Histoire", "Anglais", "Philosophie", "SVT"];
const teachers = ["M. Dupont", "Mme Martin", "Mme Durand", "M. Moreau", "Miss Smith", "M. Bernard", "M. Lopez"];
const rooms = ["A203", "B101", "C205", "A105", "D302", "B102", "Gymnase"];

type ScheduleItem = {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  class: string;
  type: "cours" | "tp" | "td" | "oral" | "sport";
};

// Données d'exemple de l'emploi du temps
const initialScheduleData: ScheduleItem[] = [
  { id: "1", day: "Lundi", time: "08:00-09:00", subject: "Mathématiques", teacher: "M. Dupont", room: "A203", class: "Première année B1", type: "cours" },
  { id: "2", day: "Lundi", time: "09:00-10:00", subject: "Physique", teacher: "Mme Martin", room: "B101", class: "Première année B1", type: "tp" },
  { id: "3", day: "Mardi", time: "08:00-09:00", subject: "Français", teacher: "Mme Durand", room: "C205", class: "Première année B2", type: "cours" },
  { id: "4", day: "Mercredi", time: "10:00-11:00", subject: "Histoire", teacher: "M. Moreau", room: "A105", class: "Deuxième année A1", type: "cours" },
];

const getSubjectColor = (type: string) => {
  const colors = {
    cours: "bg-primary/10 text-primary border-primary/20",
    tp: "bg-accent/10 text-accent border-accent/20", 
    td: "bg-success/10 text-success border-success/20",
    oral: "bg-warning/10 text-warning border-warning/20",
    sport: "bg-destructive/10 text-destructive border-destructive/20"
  };
  return colors[type as keyof typeof colors] || colors.cours;
};

export const ScheduleSection = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(initialScheduleData);
  const [selectedClass, setSelectedClass] = useState("all");
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ScheduleItem>>({
    day: "Lundi",
    time: "08:00-09:00",
    subject: "",
    teacher: "",
    room: "",
    class: "",
    type: "cours"
  });

  // Filtrer par classe
  const filteredSchedule = scheduleData.filter(item => 
    selectedClass === "all" || item.class === selectedClass
  );

  const handleAddCourse = () => {
    if (newItem.day && newItem.time && newItem.subject && newItem.teacher && newItem.room && newItem.class) {
      const id = Date.now().toString();
      setScheduleData(prev => [...prev, { ...newItem, id } as ScheduleItem]);
      setNewItem({
        day: "Lundi",
        time: "08:00-09:00",
        subject: "",
        teacher: "",
        room: "",
        class: "",
        type: "cours"
      });
      setIsDialogOpen(false);
    }
  };

  const handleEditCourse = (item: ScheduleItem) => {
    setEditingItem(item);
    setNewItem(item);
    setIsDialogOpen(true);
  };

  const handleUpdateCourse = () => {
    if (editingItem && newItem.day && newItem.time && newItem.subject && newItem.teacher && newItem.room && newItem.class) {
      setScheduleData(prev => prev.map(item => 
        item.id === editingItem.id ? { ...newItem, id: editingItem.id } as ScheduleItem : item
      ));
      setEditingItem(null);
      setNewItem({
        day: "Lundi",
        time: "08:00-09:00",
        subject: "",
        teacher: "",
        room: "",
        class: "",
        type: "cours"
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteCourse = (id: string) => {
    setScheduleData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Gestion des Emplois du Temps
          </h1>
          <p className="text-muted-foreground">
            Créez et modifiez les emplois du temps par classe
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un cours
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Modifier le cours" : "Ajouter un cours"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Jour</Label>
                  <Select value={newItem.day} onValueChange={(value) => setNewItem(prev => ({ ...prev, day: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weekDays.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Horaire</Label>
                  <Select value={newItem.time} onValueChange={(value) => setNewItem(prev => ({ ...prev, time: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00-09:00">08h00-09h00</SelectItem>
                      <SelectItem value="09:00-10:00">09h00-10h00</SelectItem>
                      <SelectItem value="10:00-11:00">10h00-11h00</SelectItem>
                      <SelectItem value="11:00-12:00">11h00-12h00</SelectItem>
                      <SelectItem value="14:00-15:00">14h00-15h00</SelectItem>
                      <SelectItem value="15:00-16:00">15h00-16h00</SelectItem>
                      <SelectItem value="16:00-17:00">16h00-17h00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Matière</Label>
                <Select value={newItem.subject} onValueChange={(value) => setNewItem(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="teacher">Professeur</Label>
                <Select value={newItem.teacher} onValueChange={(value) => setNewItem(prev => ({ ...prev, teacher: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un professeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map(teacher => (
                      <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="room">Salle</Label>
                  <Select value={newItem.room} onValueChange={(value) => setNewItem(prev => ({ ...prev, room: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Salle" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map(room => (
                        <SelectItem key={room} value={room}>{room}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newItem.type} onValueChange={(value) => setNewItem(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cours">Cours</SelectItem>
                      <SelectItem value="tp">TP</SelectItem>
                      <SelectItem value="td">TD</SelectItem>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="class">Classe</Label>
                <Select value={newItem.class} onValueChange={(value) => setNewItem(prev => ({ ...prev, class: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(className => (
                      <SelectItem key={className} value={className}>{className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={editingItem ? handleUpdateCourse : handleAddCourse} 
                className="w-full"
              >
                {editingItem ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{scheduleData.length}</p>
                <p className="text-sm text-muted-foreground">Cours planifiés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {classes.map((className) => {
          const count = scheduleData.filter(s => s.class === className).length;
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

      {/* Filtre par classe */}
      <div className="flex gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
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

      {/* Planning par jour */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {weekDays.map((day) => {
          const daySchedule = filteredSchedule.filter(item => item.day === day);
          
          return (
            <Card key={day}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {day}
                  <Badge variant="outline">{daySchedule.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {daySchedule.map((item) => (
                  <Card key={item.id} className={cn("p-3 border", getSubjectColor(item.type))}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {item.time}
                        </Badge>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleEditCourse(item)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 text-destructive"
                            onClick={() => handleDeleteCourse(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.subject}</p>
                        <p className="text-xs text-muted-foreground">{item.class}</p>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {item.teacher}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.room}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};