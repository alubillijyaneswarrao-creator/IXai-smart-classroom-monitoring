import { useEffect, useState } from 'react';
import {
  Users, CheckSquare, Brain, ShieldAlert,
  TrendingUp, AlertTriangle, Cpu, Eye
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import {
  students, attendanceWeek, focusTimeline,
  moodData, aiModels, alerts
} from '../data/mockData';

const MOOD_COLORS = {
  focused: '#3b82f6', happy: '#22c55e', neutral: '#94a3b8',
  confused: '#f59e0b', bored: '#f97316', distracted: '#ef4444', absent: '#334155'
};

export default function Overview() {
  const [liveScore, setLiveScore] = useState(78);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveScore(s => Math.max(60, Math.min(98, s + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4))));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const presentCount  = students.filter(s => s.present).length;
  const absentCount   = students.length - presentCount;
  const avgFocus      = Math.round(students.filter(s => s.present).reduce((a, b) => a + b.focus, 0) / presentCount);
  const activeAlerts  = alerts.filter(a => !a.resolved).length;

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="System Overview" subtitle="INFRAWATCH X — Real-time Classroom Intelligence Dashboard" />

      <div className="p-6 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users}      label="Total Students"    value={students.length}   sub="Class CS-301"           color="blue"   trend={0}    />
          <StatCard icon={CheckSquare}label="Present Today"     value={`${presentCount}/20`} sub={`${absentCount} absent`} color="green"  trend={6}    />
          <StatCard icon={Brain}      label="Avg Focus Score"   value={`${avgFocus}%`}    sub="Live · updating"        color="purple" trend={3}    />
          <StatCard icon={ShieldAlert}label="Active Alerts"     value={activeAlerts}      sub="2 unresolved"           color={activeAlerts > 0 ? "yellow" : "green"} trend={-1} />
        </div>

        {/* Live engagement + AI models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Focus timeline */}
          <div className="lg:col-span-2 bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white font-semibold text-sm">Class Focus Timeline</div>
                <div className="text-slate-500 text-xs">Live avg attention score over time</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 font-mono font-bold text-lg">{liveScore}%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={focusTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                <XAxis dataKey="time" stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis domain={[40, 100]} stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
                  formatter={(v) => [`${v}%`, 'Avg Focus']}
                />
                <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Mood distribution */}
          <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="text-white font-semibold text-sm mb-1">Mood Distribution</div>
            <div className="text-slate-500 text-xs mb-3">Current class emotional state</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={moodData} dataKey="count" nameKey="mood" cx="50%" cy="50%" outerRadius={55} innerRadius={30}>
                  {moodData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {moodData.map(m => (
                <div key={m.mood} className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                  <span className="text-slate-400">{m.mood}</span>
                  <span className="text-slate-300 ml-auto">{m.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance bar + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Attendance trend */}
          <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="text-white font-semibold text-sm mb-1">Weekly Attendance</div>
            <div className="text-slate-500 text-xs mb-4">Present vs Absent — this week</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={attendanceWeek} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                <XAxis dataKey="day" stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
                />
                <Bar dataKey="present" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="absent"  fill="#ef444460" radius={[4, 4, 0, 0]} name="Absent"  />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent alerts */}
          <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white font-semibold text-sm">Recent Alerts</div>
                <div className="text-slate-500 text-xs">AI-generated system notifications</div>
              </div>
              <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-0.5 rounded-full border border-red-500/20 font-semibold">
                {alerts.filter(a => !a.resolved).length} ACTIVE
              </span>
            </div>
            <div className="space-y-2">
              {alerts.slice(0, 5).map(alert => (
                <div key={alert.id} className={`flex items-start gap-3 p-2.5 rounded-lg border ${
                  !alert.resolved ? 'border-yellow-500/20 bg-yellow-500/5' : 'border-[#1e2d4a] bg-white/2'
                }`}>
                  <AlertTriangle size={13} className={alert.resolved ? 'text-slate-600 mt-0.5' : 'text-yellow-400 mt-0.5'} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium ${alert.resolved ? 'text-slate-500' : 'text-slate-200'}`}>
                      {alert.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{alert.desc}</div>
                  </div>
                  <div className="text-[10px] text-slate-600 shrink-0">{alert.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Model Status */}
        <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={15} className="text-blue-400" />
            <div className="text-white font-semibold text-sm">AI Model Pipeline Status</div>
            <span className="ml-auto text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-semibold">5/6 ACTIVE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiModels.map(m => (
              <div key={m.name} className="bg-[#0f1d35] border border-[#1e2d4a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-xs font-medium">{m.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    m.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-600/20'
                  }`}>
                    {m.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-slate-400 text-[10px]">Accuracy</div>
                    <div className="text-blue-300 text-xs font-bold">{m.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">FPS</div>
                    <div className="text-cyan-300 text-xs font-bold">{m.fps}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">CPU</div>
                    <div className="text-purple-300 text-xs font-bold">{m.load}%</div>
                  </div>
                </div>
                {m.status === 'active' && (
                  <div className="mt-2 h-1 rounded-full bg-[#1e2d4a] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${m.load}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
