import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const schedule = {
  "Lundi": [
    { time: "08:00-09:00", subject: "Mathématiques", teacher: "M. Dupont", room: "A203", type: "cours" },
    { time: "09:00-10:00", subject: "Mathématiques", teacher: "M. Dupont", room: "A203", type: "cours" },
    { time: "10:15-11:15", subject: "Physique", teacher: "Mme Martin", room: "B101", type: "tp" },
    { time: "11:15-12:15", subject: "Français", teacher: "Mme Durand", room: "C205", type: "cours" },
    { time: "14:00-15:00", subject: "Histoire", teacher: "M. Moreau", room: "A105", type: "cours" },
    { time: "15:00-16:00", subject: "Anglais", teacher: "Miss Smith", room: "D302", type: "oral" },
  ],
  "Mardi": [
    { time: "08:00-09:00", subject: "Physique", teacher: "Mme Martin", room: "B101", type: "cours" },
    { time: "09:00-10:00", subject: "Chimie", teacher: "M. Bernard", room: "B102", type: "tp" },
    { time: "10:15-11:15", subject: "Mathématiques", teacher: "M. Dupont", room: "A203", type: "td" },
    { time: "11:15-12:15", subject: "Sport", teacher: "M. Lopez", room: "Gymnase", type: "sport" },
    { time: "14:00-15:00", subject: "Français", teacher: "Mme Durand", room: "C205", type: "cours" },
    { time: "15:00-16:00", subject: "Géographie", teacher: "M. Moreau", room: "A105", type: "cours" },
  ],
  // Ajoutez plus de jours si nécessaire...
};

const today = "Lundi"; // Simulation du jour actuel

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
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(today);

  const nextClass = schedule[today]?.find(cls => {
    const [startTime] = cls.time.split("-");
    const currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    return startTime > currentTime;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Emploi du temps
          </h1>
          <p className="text-muted-foreground mt-1">
            Votre planning de la semaine
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">Semaine du 15-19 Janvier 2024</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Next Class Card */}
      {nextClass && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="mb-2">Prochain cours</Badge>
                <h3 className="text-xl font-bold">{nextClass.subject}</h3>
                <p className="text-muted-foreground">
                  {nextClass.time} • {nextClass.teacher} • Salle {nextClass.room}
                </p>
              </div>
              <div className="text-right">
                <div className="p-3 rounded-xl bg-primary/10 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Dans 15 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day Selection (Mobile) */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {weekDays.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              size="sm"
              className="min-w-fit"
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      {/* Schedule Grid - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Planning hebdomadaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-4">
            {/* Time column */}
            <div className="space-y-4">
              <div className="h-12"></div> {/* Header space */}
              {timeSlots.map((time) => (
                <div key={time} className="h-16 flex items-center">
                  <span className="text-sm text-muted-foreground font-medium">{time}</span>
                </div>
              ))}
            </div>

            {/* Days columns */}
            {weekDays.map((day) => (
              <div key={day} className="space-y-4">
                <div className="h-12 flex items-center justify-center">
                  <Badge variant={day === today ? "default" : "outline"} className="font-medium">
                    {day}
                  </Badge>
                </div>
                {timeSlots.map((time) => {
                  const classItem = schedule[day]?.find(cls => cls.time.startsWith(time));
                  
                  return (
                    <div key={time} className="h-16">
                      {classItem && (
                        <Card className={cn("h-full p-2 border", getSubjectColor(classItem.type))}>
                          <div className="text-xs font-medium truncate">{classItem.subject}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {classItem.room}
                          </div>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule List - Mobile */}
      <div className="md:hidden space-y-4">
        {schedule[selectedDay]?.map((classItem, index) => (
          <Card key={index} className={cn("border", getSubjectColor(classItem.type))}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {classItem.time}
                </Badge>
                <Badge className="text-xs capitalize">
                  {classItem.type}
                </Badge>
              </div>
              <h3 className="font-bold text-lg mb-1">{classItem.subject}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  {classItem.teacher}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Salle {classItem.room}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cours aujourd'hui</p>
                <p className="text-2xl font-bold">{schedule[today]?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Heures de cours</p>
                <p className="text-2xl font-bold">6h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Matières différentes</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};