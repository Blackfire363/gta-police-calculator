export default function WeaponReference() {
  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-4 gap-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-base-content/50">Weapon Reference</h3>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="badge badge-error badge-sm">Heavy</span>
            <span>All 7.62mm + MK200</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-success badge-sm">Not Heavy</span>
            <span>AK-12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-warning badge-sm">Still Heavy</span>
            <span>RPK-12</span>
          </div>
        </div>
        <div className="divider my-1" />
        <div className="text-xs font-bold uppercase tracking-widest text-base-content/50 mb-1">Special Weapons</div>
        <ul className="text-sm flex flex-col gap-0.5 text-base-content/70">
          <li>· Zafir 7.62mm</li>
          <li>· Cyrus 9.3mm</li>
          <li>· MAR-10 .338 LM</li>
          <li>· .50 cal BW mags (Type 115 itself is not restricted)</li>
        </ul>
      </div>
    </div>
  )
}
