import { motion } from "framer-motion";
import { User, Calendar as CalendarIcon, History, Settings } from "lucide-react";

export function Profile() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <div className="flex items-center gap-4 p-4 border border-border rounded-2xl bg-card mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary">
                <User className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white">Client Portal</h3>
                <p className="text-xs text-muted-foreground">Member since 2024</p>
              </div>
            </div>
            
            <nav className="flex flex-col gap-2">
              <button className="flex items-center gap-3 w-full p-4 rounded-xl text-left bg-primary/10 border border-primary text-primary font-medium">
                <CalendarIcon size={18} />
                Upcoming Appointments
              </button>
              <button className="flex items-center gap-3 w-full p-4 rounded-xl text-left hover:bg-white/5 border border-transparent hover:border-border text-muted-foreground transition-all">
                <History size={18} />
                History
              </button>
              <button className="flex items-center gap-3 w-full p-4 rounded-xl text-left hover:bg-white/5 border border-transparent hover:border-border text-muted-foreground transition-all">
                <Settings size={18} />
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-card/30 border border-border rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-bold mb-8 text-white border-b border-border pb-4">Upcoming Appointments</h2>
            
            <div className="space-y-6">
              {/* Empty State */}
              <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-6">You don't have any luxury sessions scheduled at the moment.</p>
                <a href="/booking" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,79,139,0.3)]">
                  Book a Session
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
