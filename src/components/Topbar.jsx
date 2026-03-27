import { Bell, Search, RefreshCw, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Topbar({ title, subtitle }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = t => t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const fmtDate = t => t.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#1e2d4a] bg-[#0a1120]/80 backdrop-blur sticky top-0 z-20">
      <div>
        <h1 className="text-white font-semibold text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Time */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-[#0f1d35] border border-[#1e2d4a] rounded-lg px-3 py-1.5">
          <Clock size={12} className="text-blue-400" />
          <span className="font-mono text-blue-300">{fmt(time)}</span>
          <span className="text-slate-600">|</span>
          <span>{fmtDate(time)}</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search student..."
            className="bg-[#0f1d35] border border-[#1e2d4a] rounded-lg pl-8 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 w-40"
          />
        </div>

        {/* Refresh */}
        <button className="p-1.5 rounded-lg border border-[#1e2d4a] text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors">
          <RefreshCw size={14} />
        </button>

        {/* Bell */}
        <button className="relative p-1.5 rounded-lg border border-[#1e2d4a] text-slate-400 hover:text-yellow-400 hover:border-yellow-500/40 transition-colors">
          <Bell size={14} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">2</span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
          AD
        </div>
      </div>
    </header>
  );
}
