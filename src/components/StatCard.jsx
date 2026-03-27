export default function StatCard({ icon: Icon, label, value, sub, color = "blue", trend }) {
  const colors = {
    blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   icon: "text-blue-400",   val: "text-blue-300"  },
    green:  { bg: "bg-green-500/10",  border: "border-green-500/20",  icon: "text-green-400",  val: "text-green-300" },
    yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: "text-yellow-400", val: "text-yellow-300"},
    red:    { bg: "bg-red-500/10",    border: "border-red-500/20",    icon: "text-red-400",    val: "text-red-300"   },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", icon: "text-purple-400", val: "text-purple-300"},
    cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   icon: "text-cyan-400",   val: "text-cyan-300"  },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4 flex items-start gap-4 hover:scale-[1.02] transition-transform duration-150`}>
      <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 ${c.icon}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-slate-400 text-xs font-medium mb-1">{label}</div>
        <div className={`text-2xl font-bold ${c.val} leading-none`}>{value}</div>
        {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
        {trend !== undefined && (
          <div className={`text-xs mt-1 font-medium ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs yesterday
          </div>
        )}
      </div>
    </div>
  );
}
