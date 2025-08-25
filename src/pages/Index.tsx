import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { GradesSection } from "@/components/GradesSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AttendanceSection } from "@/components/AttendanceSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { AnnouncementsSection } from "@/components/AnnouncementsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "grades":
        return <GradesSection />;
      case "schedule":
        return <ScheduleSection />;
      case "attendance":
        return <AttendanceSection />;
      case "resources":
        return <ResourcesSection />;
      case "announcements":
        return <AnnouncementsSection />;
      case "messages":
        return <div className="p-8 text-center text-muted-foreground">Section Messages - En cours de développement</div>;
      case "reports":
        return <div className="p-8 text-center text-muted-foreground">Section Bulletins - En cours de développement</div>;
      case "profile":
        return <div className="p-8 text-center text-muted-foreground">Section Profil - En cours de développement</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="md:ml-64 transition-all duration-300">
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;
