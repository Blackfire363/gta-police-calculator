const CARD_CLASS = {
  blue:    'stat-highlight',
  green:   'stat-success',
  yellow:  'stat-warn',
  red:     'stat-danger',
  neutral: '',
}

const VALUE_COLOR = {
  blue:    'text-[#58a6ff]',
  green:   'text-[#3fb950]',
  yellow:  'text-[#e3b341]',
  red:     'text-[#f85149]',
  neutral: 'text-[#8b949e]',
}

export default function StatCard({ label, value, sub, color = 'neutral' }) {
  return (
    <div className={`card border border-[#30363d] bg-[#0d1117] ${CARD_CLASS[color] ?? ''}`}>
      <div className="card-body p-4 gap-1">
        <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#8b949e]">{label}</div>
        <div className={`text-4xl font-black leading-none ${VALUE_COLOR[color] ?? 'text-[#e6edf3]'}`}>{value}</div>
        {sub && <div className="text-[0.7rem] text-[#8b949e] mt-1">{sub}</div>}
      </div>
    </div>
  )
}
