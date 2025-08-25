import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { GradesSection } from "@/components/GradesSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AttendanceSection } from "@/components/AttendanceSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { AnnouncementsSection } from "@/components/AnnouncementsSection";
import { MessagesSection } from "@/components/MessagesSection";
import { ReportsSection } from "@/components/ReportsSection";
import { ProfileSection } from "@/components/ProfileSection";

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
        return <MessagesSection />;
      case "reports":
        return <ReportsSection />;
      case "profile":
        return <ProfileSection />;
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
