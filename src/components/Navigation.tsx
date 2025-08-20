import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Users, 
  FileText, 
  MessageCircle, 
  Folder,
  Bell,
  User,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Tableau de bord", icon: Home },
  { id: "grades", label: "Notes", icon: BookOpen },
  { id: "schedule", label: "Emploi du temps", icon: Calendar },
  { id: "attendance", label: "Présence", icon: Users },
  { id: "resources", label: "Ressources", icon: Folder },
  { id: "announcements", label: "Annonces", icon: Bell },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "reports", label: "Bulletins", icon: FileText },
  { id: "profile", label: "Profil", icon: User },
];

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Card className="p-2 bg-card/95 backdrop-blur-sm shadow-lg">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Card>
      </div>

      {/* Navigation Sidebar */}
      <nav className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Card className="h-full bg-card/95 backdrop-blur-sm border-r border-border/50 rounded-none">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  EducPro
                </h1>
                <p className="text-xs text-muted-foreground">Plateforme éducative</p>
              </div>
            </div>

            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r from-primary/10 to-primary-glow/10 text-primary border border-primary/20" 
                        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};