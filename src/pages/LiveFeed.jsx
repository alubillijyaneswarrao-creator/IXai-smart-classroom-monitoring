import { useState, useEffect, useRef } from 'react';
import { Video, Play, Pause, Maximize2, Activity, Users, Wifi, Cpu, Eye, AlertTriangle } from 'lucide-react';
import Topbar from '../components/Topbar';
import { students, aiModels } from '../data/mockData';

// Simulated scanning overlay boxes
function ScanOverlay({ active }) {
  const boxes = [
    { x: 8, y: 12, w: 11, h: 15, label: 'Priya N. · 94%', color: '#22c55e' },
    { x: 22, y: 18, w: 10, h: 14, label: 'Aisha M. · 87%', color: '#3b82f6' },
    { x: 40, y: 10, w: 11, h: 15, label: 'Rahul S. · 62%', color: '#f59e0b' },
    { x: 58, y: 15, w: 10, h: 14, label: 'Fatima Z. · 89%', color: '#3b82f6' },
    { x: 72, y: 12, w: 11, h: 15, label: 'Usman T. · 97%', color: '#22c55e' },
    { x: 14, y: 55, w: 10, h: 14, label: 'Ali R. · 93%',   color: '#22c55e' },
    { x: 30, y: 60, w: 11, h: 15, label: 'Arjun P. · 45%', color: '#ef4444' },
    { x: 50, y: 58, w: 10, h: 14, label: 'Zara K. · 78%',  color: '#3b82f6' },
    { x: 65, y: 55, w: 11, h: 15, label: 'Dev K. · 71%',   color: '#3b82f6' },
  ];

  if (!active) return null;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h}
            fill="none" stroke={b.color} strokeWidth="0.3" opacity="0.9"
            strokeDasharray={i % 2 === 0 ? "1 0.5" : "0"}
          />
          <rect x={b.x} y={b.y - 3.5} width={b.label.length * 0.95} height="3"
            fill={b.color} opacity="0.85" rx="0.3" />
          <text x={b.x + 0.3} y={b.y - 1.2} fontSize="1.8" fill="white" fontFamily="monospace">{b.label}</text>
          {/* Corner markers */}
          <line x1={b.x} y1={b.y} x2={b.x + 2} y2={b.y} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + 2} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x + b.w - 2} y1={b.y} x2={b.x + b.w} y2={b.y} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x + b.w} y1={b.y} x2={b.x + b.w} y2={b.y + 2} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x} y1={b.y + b.h - 2} x2={b.x} y2={b.y + b.h} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x} y1={b.y + b.h} x2={b.x + 2} y2={b.y + b.h} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x + b.w - 2} y1={b.y + b.h} x2={b.x + b.w} y2={b.y + b.h} stroke={b.color} strokeWidth="0.5" />
          <line x1={b.x + b.w} y1={b.y + b.h - 2} x2={b.x + b.w} y2={b.y + b.h} stroke={b.color} strokeWidth="0.5" />
        </g>
      ))}
      {/* Scan line */}
      <line x1="0" y1="50" x2="100" y2="50" stroke="#3b82f640" strokeWidth="0.2" strokeDasharray="2 1" />
    </svg>
  );
}

function ClassroomSim({ running, scanActive }) {
  const rows = [
    ['A1','A2','A3','A4'],
    ['B1','B2','B3','B4'],
    ['C1','C2','C3','C4'],
    ['D1','D2','D3','D4'],
    ['E1','E2','E3','E4'],
  ];
  const seatMap = {};
  students.forEach(s => { seatMap[s.seat] = s; });

  return (
    <div className="relative bg-[#050c18] rounded-xl overflow-hidden border border-[#1e2d4a]" style={{ aspectRatio: '16/9' }}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Classroom floor */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-1.5">
        {/* Teacher desk */}
        <div className="w-24 h-4 bg-[#1e3a5f] border border-blue-800/40 rounded mb-1 flex items-center justify-center">
          <span className="text-[8px] text-blue-400 font-semibold">TEACHER DESK</span>
        </div>

        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.map(seat => {
              const s = seatMap[seat];
              const color = !s ? '#1e2d4a' :
                !s.present ? '#1a2030' :
                s.focus >= 80 ? '#16534a' :
                s.focus >= 60 ? '#1e3a5f' :
                s.focus >= 40 ? '#3d2e0a' : '#3d0a0a';
              return (
                <div key={seat} className="relative w-8 h-6 rounded-sm flex items-center justify-center transition-all duration-500"
                  style={{ background: color, border: `1px solid ${!s?.present ? '#1a2030' : s?.focus >= 80 ? '#22c55e40' : s?.focus >= 60 ? '#3b82f640' : '#f59e0b40'}` }}>
                  {s?.present && scanActive && (
                    <span className="text-[6px] font-mono text-white/70 font-bold">{s.focus}%</span>
                  )}
                  {!s?.present && s && (
                    <span className="text-[5px] text-red-900 font-bold">ABS</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* AI overlay */}
      <ScanOverlay active={scanActive} />

      {/* Corner HUD */}
      {running && (
        <>
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] text-red-400 font-mono font-bold">● REC LIVE</span>
          </div>
          <div className="absolute top-2 right-2 text-[9px] text-blue-300 font-mono bg-black/40 px-1.5 py-0.5 rounded">
            Cam-01 · 1080p · 30fps
          </div>
          <div className="absolute bottom-2 left-2 text-[9px] text-green-400 font-mono bg-black/40 px-1.5 py-0.5 rounded">
            INFRAWATCH X · AI PIPELINE ACTIVE
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] text-slate-400 font-mono bg-black/40 px-1.5 py-0.5 rounded">
            09:22:14
          </div>
        </>
      )}

      {!running && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="text-center">
            <Video size={32} className="text-slate-600 mx-auto mb-2" />
            <div className="text-slate-500 text-sm">Feed paused</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LiveFeed() {
  const [running, setRunning] = useState(true);
  const [scanActive, setScanActive] = useState(true);
  const [fps, setFps] = useState(28);
  const [latency, setLatency] = useState(14);
  const [detections, setDetections] = useState(9);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setFps(f => Math.max(22, Math.min(30, f + (Math.random() > 0.5 ? 1 : -1))));
      setLatency(l => Math.max(10, Math.min(25, l + (Math.random() > 0.5 ? 1 : -1))));
      setTick(x => x + 1);
    }, 2000);
    return () => clearInterval(t);
  }, [running]);

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Live Video Feed" subtitle="Real-time classroom surveillance with AI overlay" />
      <div className="p-6 space-y-4">

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setRunning(r => !r)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              running ? 'bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600/30' : 'bg-green-600/20 text-green-300 border border-green-500/30 hover:bg-green-600/30'
            }`}>
            {running ? <><Pause size={14} /> Pause Feed</> : <><Play size={14} /> Resume Feed</>}
          </button>
          <button
            onClick={() => setScanActive(s => !s)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              scanActive ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'bg-slate-600/20 text-slate-400 border border-slate-600/30'
            }`}>
            <Eye size={14} /> {scanActive ? 'AI Overlay: ON' : 'AI Overlay: OFF'}
          </button>
          <div className="ml-auto flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1"><Wifi size={11} className="text-green-400" /> <span>{running ? fps : 0} fps</span></div>
            <div className="flex items-center gap-1"><Activity size={11} className="text-blue-400" /> <span>{running ? latency : '–'} ms latency</span></div>
            <div className="flex items-center gap-1"><Users size={11} className="text-purple-400" /> <span>{detections} detected</span></div>
          </div>
        </div>

        {/* Main feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ClassroomSim running={running} scanActive={scanActive} />
          </div>

          {/* Side panel */}
          <div className="space-y-3">

            {/* Live detections */}
            <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <Eye size={13} className="text-blue-400" />
                <span className="text-white text-xs font-semibold">Live Detections</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-h-52 overflow-y-auto">
                {students.filter(s => s.present).slice(0, 9).map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 text-xs">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.focus >= 80 ? 'bg-green-400' : s.focus >= 60 ? 'bg-blue-400' : 'bg-yellow-400'}`} />
                    <span className="text-slate-400 flex-1 truncate">{s.name}</span>
                    <span className={`font-mono font-bold text-[10px] ${s.focus >= 80 ? 'text-green-400' : s.focus >= 60 ? 'text-blue-400' : 'text-yellow-400'}`}>{s.focus}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI pipeline stats */}
            <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={13} className="text-purple-400" />
                <span className="text-white text-xs font-semibold">AI Pipeline</span>
              </div>
              <div className="space-y-2">
                {aiModels.map(m => (
                  <div key={m.name}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-slate-400 truncate flex-1 mr-2">{m.name}</span>
                      <span className={`text-[10px] font-bold ${m.status === 'active' ? 'text-green-400' : 'text-slate-500'}`}>
                        {m.status === 'active' ? `${m.fps}fps` : 'STBY'}
                      </span>
                    </div>
                    {m.status === 'active' && (
                      <div className="h-1 rounded-full bg-[#1e2d4a] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          style={{ width: `${m.load}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-3">
              <div className="text-xs text-white font-semibold mb-2">Seat Color Legend</div>
              <div className="space-y-1.5 text-[10px] text-slate-400">
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-[#16534a] border border-green-500/30" /><span>High focus (≥80%)</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-[#1e3a5f] border border-blue-500/30" /><span>Normal focus (60–79%)</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-[#3d2e0a] border border-yellow-500/30" /><span>Low focus (40–59%)</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-[#3d0a0a] border border-red-500/30" /><span>Very low focus (&lt;40%)</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-[#1a2030] border border-slate-700/30" /><span>Absent</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
