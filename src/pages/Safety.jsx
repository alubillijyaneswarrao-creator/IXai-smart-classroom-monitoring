import { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Shield, Zap, Activity, Eye, Users } from 'lucide-react';
import Topbar from '../components/Topbar';
import { alerts, zones } from '../data/mockData';

const SEV_STYLE = {
  high:   'bg-red-500/10 border-red-500/40 text-red-300',
  medium: 'bg-yellow-500/10 border-yellow-500/40 text-yellow-300',
  low:    'bg-blue-500/10 border-blue-500/40 text-blue-300',
  info:   'bg-slate-500/10 border-slate-500/40 text-slate-400',
};
const SEV_DOT = { high: 'bg-red-400', medium: 'bg-yellow-400', low: 'bg-blue-400', info: 'bg-slate-500' };
const CAT_ICON = { safety: ShieldAlert, crowd: Users, engagement: Eye, attendance: CheckCircle, mood: Activity };

const weaponLog = [
  { time: '08:12 AM', result: 'CLEAR', confidence: 99.1 },
  { time: '08:20 AM', result: 'CLEAR', confidence: 99.4 },
  { time: '08:30 AM', result: 'CLEAR', confidence: 98.9 },
  { time: '08:45 AM', result: 'CLEAR', confidence: 99.6 },
  { time: '09:00 AM', result: 'CLEAR', confidence: 99.2 },
  { time: '09:15 AM', result: 'CLEAR', confidence: 98.7 },
  { time: '09:22 AM', result: 'CLEAR', confidence: 99.5 },
];

export default function Safety() {
  const [alertList, setAlertList] = useState(alerts);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(t);
  }, []);

  const resolve = (id) => setAlertList(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  const activeAlerts = alertList.filter(a => !a.resolved);

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Safety & Security Monitor" subtitle="Weapon detection · fight detection · crowd density · YOLO v8" />
      <div className="p-6 space-y-6">

        {/* Status bar */}
        <div className={`flex items-center gap-4 p-4 rounded-xl border ${
          activeAlerts.some(a => a.severity === 'high')
            ? 'bg-red-900/20 border-red-500/40'
            : activeAlerts.length > 0
            ? 'bg-yellow-900/20 border-yellow-500/30'
            : 'bg-green-900/20 border-green-500/30'
        }`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            activeAlerts.some(a => a.severity === 'high') ? 'bg-red-500/20' : activeAlerts.length > 0 ? 'bg-yellow-500/20' : 'bg-green-500/20'
          }`}>
            <Shield size={22} className={activeAlerts.some(a => a.severity === 'high') ? 'text-red-400' : activeAlerts.length > 0 ? 'text-yellow-400' : 'text-green-400'} />
          </div>
          <div>
            <div className="text-white font-semibold">
              {activeAlerts.some(a => a.severity === 'high') ? 'HIGH PRIORITY ALERT' : activeAlerts.length > 0 ? 'Active Alerts Detected' : 'Classroom Secure'}
            </div>
            <div className="text-slate-400 text-sm">
              {activeAlerts.length > 0 ? `${activeAlerts.length} unresolved alert${activeAlerts.length > 1 ? 's' : ''} — review required` : 'All AI safety models running normally · No threats detected'}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300 ${
              activeAlerts.length > 0 ? 'bg-yellow-400' : 'bg-green-400'
            }`} />
            <span className="text-xs text-slate-400">Live monitoring</span>
          </div>
        </div>

        {/* Model status row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Fight Detection",     status: "active",  icon: Zap,        detail: "YOLO v8 · 94.1% acc" },
            { label: "Weapon Detection",    status: "standby", icon: ShieldAlert, detail: "On-demand · 99.3% acc" },
            { label: "Crowd Density",       status: "active",  icon: Users,      detail: "Density map active" },
            { label: "Behavior Anomaly",    status: "active",  icon: Activity,   detail: "Optical flow · 91%" },
          ].map(m => (
            <div key={m.label} className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <m.icon size={14} className={m.status === 'active' ? 'text-green-400' : 'text-slate-500'} />
                <span className="text-slate-300 text-xs font-medium">{m.label}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                m.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-600/20 text-slate-500 border border-slate-600/20'
              }`}>
                {m.status.toUpperCase()}
              </span>
              <div className="text-[10px] text-slate-600 mt-1">{m.detail}</div>
            </div>
          ))}
        </div>

        {/* Alerts + Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Alert list */}
          <div className="lg:col-span-3 bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white font-semibold text-sm">Alert History</div>
                <div className="text-slate-500 text-xs">Click "Resolve" to acknowledge</div>
              </div>
              <span className="bg-yellow-500/10 text-yellow-300 text-[10px] px-2 py-0.5 rounded-full border border-yellow-500/20 font-semibold">
                {activeAlerts.length} ACTIVE
              </span>
            </div>
            <div className="space-y-2">
              {alertList.map(alert => {
                const Icon = CAT_ICON[alert.category] || AlertTriangle;
                return (
                  <div key={alert.id} className={`p-3 rounded-lg border transition-all ${alert.resolved ? 'opacity-50 border-[#1e2d4a]' : SEV_STYLE[alert.severity]}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.resolved ? 'bg-slate-600' : SEV_DOT[alert.severity]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Icon size={12} />
                          <span className="text-xs font-semibold">{alert.title}</span>
                          {!alert.resolved && (
                            <span className="text-[9px] font-bold px-1 rounded bg-current/10">{alert.severity.toUpperCase()}</span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{alert.desc}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{alert.time}</div>
                      </div>
                      {!alert.resolved && (
                        <button
                          onClick={() => resolve(alert.id)}
                          className="text-[10px] font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-green-500/10 hover:text-green-300 hover:border-green-500/30 transition-colors shrink-0"
                        >
                          Resolve
                        </button>
                      )}
                      {alert.resolved && (
                        <CheckCircle size={14} className="text-green-500 shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zone density + weapon log */}
          <div className="lg:col-span-2 space-y-4">

            {/* Zone density */}
            <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
              <div className="text-white font-semibold text-sm mb-3">Crowd Density by Zone</div>
              <div className="space-y-2">
                {zones.map(z => {
                  const pct = Math.round((z.density / 10) * 100);
                  return (
                    <div key={z.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400 text-xs">{z.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-300 font-mono">{z.density} students</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            z.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                            z.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>{z.risk}</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-[#1e2d4a] overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${
                          z.risk === 'high' ? 'bg-red-500' : z.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weapon scan log */}
            <div className="bg-[#0a1120] border border-[#1e2d4a] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert size={13} className="text-green-400" />
                <div className="text-white font-semibold text-sm">Weapon Scan Log</div>
              </div>
              <div className="space-y-1.5">
                {weaponLog.map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-mono">{log.time}</span>
                    <span className="text-green-400 font-semibold">{log.result}</span>
                    <span className="text-slate-500">{log.confidence}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-[#1e2d4a] text-[11px] text-green-400 text-center font-semibold">
                ✓ No weapons detected today
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
