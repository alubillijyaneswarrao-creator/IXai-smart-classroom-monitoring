import { useState } from 'react';
import { User, ChevronRight, X, TrendingUp, Clock, Eye, Brain, Smile } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import Topbar from '../components/Topbar';
import { students, focusTimeline } from '../data/mockData';

const MOOD_COLORS = {
  focused: '#3b82f6', happy: '#22c55e', neutral: '#94a3b8',
  confused: '#f59e0b', bored: '#f97316', distracted: '#ef4444', absent: '#475569'
};
const MOOD_BG = {
  focused: 'bg-blue-500/20 text-blue-300', happy: 'bg-green-500/20 text-green-300',
  neutral: 'bg-slate-500/20 text-slate-300', confused: 'bg-yellow-500/20 text-yellow-300',
  bored: 'bg-orange-500/20 text-orange-300', distracted: 'bg-red-500/20 text-red-300',
  absent: 'bg-slate-700 text-slate-500',
};

function StudentModal({ student, onClose }) {
  if (!student) return null;

  const radarData = [
    { subject: 'Focus',     A: student.focus },
    { subject: 'Engage',    A: student.engagement },
    { subject: 'Attend',    A: student.present ? 92 : 0 },
    { subject: 'Posture',   A: student.present ? Math.round(student.focus * 0.9) : 0 },
    { subject: 'Eye',       A: student.present ? Math.round(student.focus * 0.85) : 0 },
    { subject: 'Response',  A: student.present ? Math.round(student.engagement * 0.95) : 0 },
  ];

  const weekFocus = [
    { day: 'Mon', score: Math.round(student.focus * 0.95) },
    { day: 'Tue', score: Math.round(student.focus * 1.05) },
    { day: 'Wed', score: Math.round(student.focus * 0.88) },
    { day: 'Thu', score: Math.round(student.focus * 1.10) },
    { day: 'Fri', score: Math.round(student.focus * 0.92) },
    { day: 'Sat', score: Math.round(student.focus * 1.02) },
    { day: 'Today', score: student.focus },
  ].map(d => ({ ...d, score: Math.min(100, Math.max(0, d.score)) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${student.present ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-700 text-slate-500'}`}>
            {student.avatar}
          </div>
          <div className="flex-1">
            <div className="text-white text-lg font-bold">{student.name}</div>
            <div className="text-slate-400 text-sm">{student.rollNo} · Seat {student.seat}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${MOOD_BG[student.mood]}`}>{student.mood}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${student.present ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {student.present ? 'Present' : 'Absent'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Focus', value: `${student.focus}%`, icon: Brain, color: 'text-blue-400' },
            { label: 'Engagement', value: `${student.engagement}%`, icon: TrendingUp, color: 'text-purple-400' },
            { label: 'Attendance', value: student.present ? 'Present' : 'Absent', icon: Clock, color: student.present ? 'text-green-400' : 'text-red-400' },
          ].map(c => (
            <div key={c.label} className="bg-[#0f1d35] border border-[#1e2d4a] rounded-xl p-3 text-center">
              <c.icon size={16} className={`${c.color} mx-auto mb-1`} />
              <div className={`text-lg font-bold ${c.color}`}>{c.value}</div>
              <div className="text-slate-500 text-xs">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-slate-400 text-xs mb-2 font-medium">Weekly Focus Trend</div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={weekFocus}>
                <defs>
                  <linearGradient id="sfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} />
                <Tooltip contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, fontSize: 11 }}
                  formatter={v => [`${v}%`, 'Focus']} />
                <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="url(#sfGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-2 font-medium">Skill Profile</div>
            <ResponsiveContainer width="100%" height={130}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e2d4a" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b' }} />
                <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Students() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filtered = students
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'focus') return b.focus - a.focus;
      if (sortBy === 'engagement') return b.engagement - a.engagement;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Student Profiles" subtitle="Per-student analytics, engagement scores & mood tracking" />
      <div className="p-6 space-y-4">

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or roll number..."
            className="bg-[#0a1120] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 w-64"
          />
          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-xs mr-1">Sort by:</span>
            {['name', 'focus', 'engagement'].map(s => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sortBy === s ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30' : 'text-slate-400 border border-[#1e2d4a] hover:text-white'
                }`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-slate-500">{filtered.length} students</span>
        </div>

        {/* Student grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {filtered.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`text-left p-4 rounded-xl border transition-all duration-150 hover:scale-[1.02] hover:shadow-lg ${
                s.present ? 'bg-[#0a1120] border-[#1e2d4a] hover:border-blue-500/30 hover:shadow-blue-900/20' : 'bg-[#0a1120] border-[#1a2030] opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  s.present ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-200' : 'bg-slate-700 text-slate-500'
                }`}>
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{s.name}</div>
                  <div className="text-[11px] text-slate-500">{s.rollNo} · Seat {s.seat}</div>
                </div>
                <ChevronRight size={14} className="text-slate-600" />
              </div>

              {s.present ? (
                <>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Focus</span>
                    <span className={`font-bold ${s.focus >= 80 ? 'text-green-400' : s.focus >= 60 ? 'text-blue-400' : 'text-yellow-400'}`}>{s.focus}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1e2d4a] overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${s.focus >= 80 ? 'bg-green-500' : s.focus >= 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                      style={{ width: `${s.focus}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${MOOD_BG[s.mood]}`}>{s.mood}</span>
                    <span className="text-[10px] text-slate-500">Eng: {s.engagement}%</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-2 text-xs text-slate-600">— absent today —</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {selected && <StudentModal student={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
