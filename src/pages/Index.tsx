import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { GradesSection } from "@/components/GradesSection";
import { ScheduleSection } from "@/components/ScheduleSection";

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
        return <div className="p-8 text-center text-muted-foreground">Section Présence - En cours de développement</div>;
      case "resources":
        return <div className="p-8 text-center text-muted-foreground">Section Ressources - En cours de développement</div>;
      case "announcements":
        return <div className="p-8 text-center text-muted-foreground">Section Annonces - En cours de développement</div>;
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
