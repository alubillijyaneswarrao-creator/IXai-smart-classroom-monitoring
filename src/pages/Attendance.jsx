import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Topbar from '../components/Topbar';
import { students, attendanceWeek } from '../data/mockData';

const MOOD_COLORS = {
  focused: '#3b82f6', happy: '#22c55e', neutral: '#94a3b8',
  confused: '#f59e0b', bored: '#f97316', distracted: '#ef4444', absent: '#475569'
};

export default function Attendance() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'present' && s.present) || (filter === 'absent' && !s.present);
    return matchSearch && matchFilter;
  });

  const presentCount = students.filter(s => s.present).length;
  const pct = Math.round((presentCount / students.length) * 100);

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Attendance Management" subtitle="Auto attendance via face recognition · Class CS-301" />
      <div className="p-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Enrolled", value: students.length, color: "text-white" },
            { label: "Present Today", value: presentCount, color: "text-green-400" },
            { label: "Absent", value: students.length - presentCount, color: "text-red-400" },
            { label: "Attendance Rate", value: `${pct}%`, color: "text-blue-400" },
          ].map(stat => (
            <div key={stat.label} className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4 text-center">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm font-medium">Attendance Rate — Today</span>
            <span className="text-blue-400 font-bold">{pct}%</span>
          </div>
          <div className="h-3 rounded-full bg-[#1e2d4a] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>Face recognition logged at 08:02 AM</span>
            <span>Model accuracy: 98.2%</span>
          </div>
        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Weekly chart */}
          <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="text-white font-semibold text-sm mb-1">Weekly Trend</div>
            <div className="text-slate-500 text-xs mb-3">7-day attendance overview</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                <XAxis dataKey="day" stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis stroke="#334155" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ background: '#0f1d35', border: '1px solid #1e2d4a', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }} />
                <Bar dataKey="present" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="absent" fill="#ef444455" radius={[4, 4, 0, 0]} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student table */}
          <div className="lg:col-span-2 bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="text-white font-semibold text-sm">Student List</div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="bg-[#0f1d35] border border-[#1e2d4a] rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 w-32"
                  />
                </div>
                <div className="flex gap-1">
                  {['all', 'present', 'absent'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        filter === f ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30' : 'text-slate-400 border border-[#1e2d4a] hover:text-white'
                      }`}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {filtered.map(s => (
                <div key={s.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-colors ${
                  s.present ? 'border-[#1e2d4a] hover:border-blue-500/20 hover:bg-blue-500/5' : 'border-red-500/10 bg-red-500/5'
                }`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    s.present ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-700 text-slate-500'
                  }`}>
                    {s.avatar}
                  </div>
                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${s.present ? 'text-slate-200' : 'text-slate-500'}`}>{s.name}</div>
                    <div className="text-[10px] text-slate-600">{s.rollNo} · Seat {s.seat}</div>
                  </div>
                  {/* Status */}
                  {s.present ? (
                    <div className="flex items-center gap-1 text-green-400 text-[10px] font-semibold">
                      <CheckCircle size={12} />
                      PRESENT
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-400 text-[10px] font-semibold">
                      <XCircle size={12} />
                      ABSENT
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
