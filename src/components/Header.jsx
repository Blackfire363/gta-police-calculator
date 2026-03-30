export default function Header() {
  return (
    <div className="police-header flex items-center gap-3 px-6 py-4">
      <div className="bg-[#1e6fa8] text-white rounded-lg w-11 h-11 flex items-center justify-center text-xl flex-shrink-0">
        🚔
      </div>
      <div>
        <div className="text-base font-bold text-[#58a6ff] leading-tight">GTA Police Operation Calculator</div>
        <div className="text-xs text-[#8b949e] mt-0.5">Grand Theft Arma · APC Regulations Reference Tool</div>
      </div>
    </div>
  )
}
