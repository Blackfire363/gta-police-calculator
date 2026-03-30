import { OPERATIONS } from '../data/operations'
import WeaponReference from './WeaponReference'

export default function InputPanel({ opId, setOpId, rebels, setRebels, mraps, setMraps, escortSize, setEscortSize, bankLocation, setBankLocation }) {
  const op = OPERATIONS.find(o => o.id === opId)
  const groups = [...new Set(OPERATIONS.map(o => o.group))]

  return (
    <div className="flex flex-col gap-4 w-72 flex-shrink-0">
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-4 gap-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-base-content/50 pb-2 border-b border-base-300">
            Operation Setup
          </h2>

          <fieldset className="flex flex-col gap-1">
            <label className="label text-sm font-medium pb-0">Operation Type</label>
            <select
              className="select select-bordered select-sm w-full"
              value={opId}
              onChange={e => setOpId(e.target.value)}
            >
              {groups.map(g => (
                <optgroup key={g} label={g}>
                  {OPERATIONS.filter(o => o.group === g).map(o => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            {op && <p className="text-xs text-primary/80 mt-1">{op.sub}</p>}
          </fieldset>

          {opId === 'armoured_transport' && (
            <fieldset className="flex flex-col gap-1">
              <label className="label text-sm font-medium pb-0">Escort Size</label>
              <select
                className="select select-bordered select-sm w-full"
                value={escortSize}
                onChange={e => setEscortSize(e.target.value)}
              >
                <option value="small">Small Escort (min 10 officers)</option>
                <option value="large">Large Escort (min 18 officers)</option>
              </select>
            </fieldset>
          )}

          {opId === 'tier4_bank' && (
            <fieldset className="flex flex-col gap-1">
              <label className="label text-sm font-medium pb-0">Bank Location</label>
              <select
                className="select select-bordered select-sm w-full"
                value={bankLocation}
                onChange={e => setBankLocation(e.target.value)}
              >
                <option value="paros">Paros Reserve</option>
                <option value="athira">Athira Oil Depot</option>
              </select>
            </fieldset>
          )}

          <fieldset className="flex flex-col gap-1">
            <label className="label text-sm font-medium pb-0">Rebels / Hostile Members</label>
            <input
              type="number"
              className="input input-bordered input-sm w-full"
              min={0} max={100}
              value={rebels}
              onChange={e => setRebels(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <label className="label text-sm font-medium pb-0">Rebel MRAPs</label>
            <input
              type="number"
              className="input input-bordered input-sm w-full"
              min={0} max={20}
              value={mraps}
              onChange={e => setMraps(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </fieldset>

        </div>
      </div>

      <WeaponReference />
    </div>
  )
}
