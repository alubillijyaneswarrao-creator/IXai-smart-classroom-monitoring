import { useEffect, useState } from 'react';
import { Brain, TrendingUp, TrendingDown, Eye, Smile } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import { students, focusTimeline, engagementHourly, moodData } from '../data/mockData';

const MOOD_ICON = { focused: '🎯', happy: '😊', neutral: '😐', confused: '😕', bored: '😴', distracted: '😵', absent: '–' };
const MOOD_COLOR = {
  focused: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  happy:   'bg-green-500/20 text-green-300 border-green-500/30',
  neutral: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  confused:'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  bored:   'bg-orange-500/20 text-orange-300 border-orange-500/30',
  distracted:'bg-red-500/20 text-red-300 border-red-500/30',
  absent:  'bg-slate-700 text-slate-500 border-slate-600/30',
};

function FocusBar({ score, max = 100 }) {
  const pct = Math.round((score / max) * 100);
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-[#1e2d4a] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-mono font-bold w-8 text-right" style={{ color }}>{score}%</span>
    </div>
  );
}

const radarData = [
  { subject: 'Attention',  A: 78 },
  { subject: 'Eye Contact',A: 65 },
  { subject: 'Posture',    A: 82 },
  { subject: 'Interaction',A: 70 },
  { subject: 'Mood',       A: 75 },
  { subject: 'Pace',       A: 68 },
];

export default function Engagement() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const presentStudents = students.filter(s => s.present);
  const avgFocus = Math.round(presentStudents.reduce((a, b) => a + b.focus, 0) / presentStudents.length);
  const avgEngagement = Math.round(presentStudents.reduce((a, b) => a + b.engagement, 0) / presentStudents.length);
  const highFocus = presentStudents.filter(s => s.focus >= 80).length;
  const lowFocus  = presentStudents.filter(s => s.focus < 50).length;

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Engagement & Focus Analytics" subtitle="Head pose · eye tracking · mood detection · real-time scoring" />
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Brain}       label="Avg Focus Score"    value={`${avgFocus}%`}       sub="Live average"          color="blue"   trend={3}  />
          <StatCard icon={TrendingUp}  label="Avg Engagement"     value={`${avgEngagement}%`}  sub="Real-time composite"   color="purple" trend={5}  />
          <StatCard icon={Eye}         label="Highly Focused"     value={highFocus}             sub={`/${presentStudents.length} students`} color="green" trend={2}  />
          <StatCard icon={TrendingDown}label="Low Attention"      value={lowFocus}              sub="Need intervention"     color="yellow" trend={-1} />
        </div>

        {/* Area chart + Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="lg:col-span-2 bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="text-white font-semibold text-sm mb-1">Focus Score Over Time</div>
            <div className="text-slate-500 text-xs mb-4">Class average attention score · last 90 min</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={focusTimeline}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                <XAxis dataKey="time" stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis domain={[40, 100]} stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
                  formatter={v => [`${v}%`, 'Focus']} />
                <Area type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} fill="url(#focusGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="text-white font-semibold text-sm mb-1">Class Engagement Radar</div>
            <div className="text-slate-500 text-xs mb-2">Multi-dimensional attention analysis</div>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e2d4a" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b' }} />
                <Radar name="Class" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Per-student grid */}
        <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-semibold text-sm">Per-Student Focus Board</div>
              <div className="text-slate-500 text-xs">Individual attention scores · head pose · mood</div>
            </div>
            <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold">
              LIVE · updates every 3s
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {students.map(s => (
              <div key={s.id} className={`p-3 rounded-lg border ${s.present ? 'border-[#1e2d4a] bg-[#0f1d35]' : 'border-[#1a2030] bg-[#0c1320] opacity-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${s.present ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-700 text-slate-500'}`}>
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-200 truncate">{s.name}</div>
                    <div className="text-[10px] text-slate-500">{s.rollNo}</div>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${MOOD_COLOR[s.mood]}`}>
                    {MOOD_ICON[s.mood]} {s.mood}
                  </span>
                </div>
                {s.present ? (
                  <FocusBar score={s.focus} />
                ) : (
                  <div className="text-xs text-slate-600 text-center py-1">— absent —</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hourly bar */}
        <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
          <div className="text-white font-semibold text-sm mb-1">Hourly Engagement Score</div>
          <div className="text-slate-500 text-xs mb-4">Average engagement score per hour today</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={engagementHourly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
              <XAxis dataKey="hour" stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
                formatter={v => [`${v}%`, 'Engagement']} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} name="Score">
                {engagementHourly.map((e, i) => (
                  <Cell key={i} fill={e.score >= 80 ? '#22c55e' : e.score >= 65 ? '#3b82f6' : e.score >= 50 ? '#f59e0b' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
