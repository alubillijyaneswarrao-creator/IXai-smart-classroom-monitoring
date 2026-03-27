import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, CheckSquare, Brain,
  ShieldAlert, Video, Settings, Zap, ChevronRight
} from 'lucide-react';

const nav = [
  { to: "/",           icon: LayoutDashboard, label: "Overview"     },
  { to: "/attendance", icon: CheckSquare,     label: "Attendance"   },
  { to: "/engagement", icon: Brain,           label: "Engagement"   },
  { to: "/safety",     icon: ShieldAlert,     label: "Safety"       },
  { to: "/students",   icon: Users,           label: "Students"     },
  { to: "/live",       icon: Video,           label: "Live Feed"    },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-[#0a1120] border-r border-[#1e2d4a] z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1e2d4a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-900/40">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">INFRAWATCH</div>
            <div className="text-blue-400 text-[10px] font-semibold tracking-widest uppercase">X · Classroom AI</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-2 mb-2">Modules</div>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={12} className="text-blue-400/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom system status */}
      <div className="px-4 py-4 border-t border-[#1e2d4a]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-400">All AI models online</span>
        </div>
        <div className="text-[10px] text-slate-600">
          Camera · Face Rec · YOLO · NLP active
        </div>
      </div>
    </aside>
  );
}
