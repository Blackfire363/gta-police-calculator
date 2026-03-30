import StatCard from './StatCard'
import NoteItem from './NoteItem'

const GEAR_LABEL = { patrol: 'Patrol Only', box: 'Box Gear', any: 'Any / Box' }
const GEAR_COLOR = { patrol: 'yellow', box: 'green', any: 'green' }

function SectionHeader({ children }) {
  return (
    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2 mt-1">
      {children}
    </div>
  )
}

export default function ResultPanel({ res, rebels, mraps }) {
  const maxOfficersValue = res.maxOfficers === null ? '∞' : String(res.maxOfficers)
  const maxOfficersSub   = res.maxOfficers === null ? 'Unlimited response' : `Based on ${rebels} rebels`
  const maxOfficersColor = res.maxOfficers === null ? 'green' : 'blue'

  const heaviesValue = res.heavies === Infinity ? '∞' : String(res.heavies)
  const heaviesSub   = res.heavies === Infinity ? 'Unlimited' : res.heavies === 0 ? 'None permitted' : `0.5:1 ratio (${rebels} rebels)`
  const heaviesColor = res.heavies === Infinity ? 'green' : res.heavies === 0 ? 'red' : 'yellow'

  return (
    <div className="card bg-base-200 border border-base-300 flex-1">
      <div className="card-body p-4 gap-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-base-content/50 pb-2 border-b border-base-300">
          Response Calculations — {rebels} rebel{rebels !== 1 ? 's' : ''}
          {mraps > 0 ? `, ${mraps} enemy MRAP${mraps !== 1 ? 's' : ''}` : ''}
        </h2>

        {/* ── Key stats grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Max Officers" value={maxOfficersValue} sub={maxOfficersSub} color={maxOfficersColor} />
          <StatCard label="Heavies Allowed" value={heaviesValue} sub={heaviesSub} color={heaviesColor} />
          <StatCard
            label="Gear Allowed"
            value={GEAR_LABEL[res.gear] ?? res.gear}
            sub={res.gear === 'box' ? 'Box is open' : res.gear === 'any' ? 'Full access' : 'Patrol loadout only'}
            color={GEAR_COLOR[res.gear] ?? 'blue'}
          />
          <StatCard
            label="Police MRAPs"
            value={String(res.policeMraps)}
            sub={res.mrapNote || (mraps === 0 ? 'No enemy MRAPs' : '')}
            color={res.policeMraps > 0 ? 'green' : 'neutral'}
          />
          {res.minOfficers !== null && (
            <StatCard label="Min Officers" value={String(res.minOfficers)} sub="Minimum required" color="blue" />
          )}
        </div>

        {/* ── Special weapons permitted ── */}
        {res.specials.length > 0 && (
          <div>
            <SectionHeader>Special Weapons Permitted</SectionHeader>
            <div className="flex flex-wrap gap-1">
              {res.specials.map((s, i) => (
                <span key={i} className="badge badge-success badge-sm gap-1">✓ {s}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── Prohibited specials ── */}
        {res.prohibitedSpecials.length > 0 && (
          <div>
            <SectionHeader>Prohibited in This Zone</SectionHeader>
            <div className="flex flex-wrap gap-1">
              {res.prohibitedSpecials.map((s, i) => (
                <span key={i} className="badge badge-error badge-sm gap-1">✕ {s}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── Vehicle rules ── */}
        {res.vehicles.length > 0 && (
          <div>
            <SectionHeader>Vehicle Rules</SectionHeader>
            <div className="flex flex-col gap-1">
              {res.vehicles.map((v, i) => <NoteItem key={i} type={v.type} text={v.text} />)}
            </div>
          </div>
        )}

        {/* ── Rank requirements ── */}
        {res.rank.length > 0 && (
          <div>
            <SectionHeader>Rank Requirements</SectionHeader>
            <div className="flex flex-col gap-1">
              {res.rank.map((r, i) => <NoteItem key={i} type="warn" text={r} />)}
            </div>
          </div>
        )}

        {/* ── Regulations & notes ── */}
        {res.notes.length > 0 && (
          <div>
            <SectionHeader>Regulations & Notes</SectionHeader>
            <div className="flex flex-col gap-1">
              {res.notes.map((n, i) => <NoteItem key={i} type={n.type} text={n.text} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
