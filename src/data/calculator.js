// Police MRAPs for Tier 3/4: base 2, or gang+1 if gang has 2+
function calcBankMraps(gangMraps, base = 2) {
  return gangMraps >= 2 ? Math.max(base, gangMraps + 1) : base
}

export function calculate(opId, rebels, mrapCount, escortSize, bankLocation) {
  const r = Math.max(0, rebels)
  const m = Math.max(0, mrapCount)

  const result = {
    maxOfficers: null,
    minOfficers: null,
    heavies: 0,
    heaviesNote: '',       // override subtitle for heavies stat card
    policeMraps: 0,        // number of MRAPs/Ifrits police may bring
    mrapNote: '',          // explanation for policeMraps value
    specials: [],          // string[] — permitted special weapons
    prohibitedSpecials: [],
    vehicles: [],          // { text, type }[]
    notes: [],             // { text, type }[]
    rank: [],              // string[]
    gear: 'patrol',        // 'patrol' | 'box' | 'any'
  }

  switch (opId) {

    // ── TIER 1 ───────────────────────────────────────────────────────────────
    case 'tier1_bank': {
      result.minOfficers = 14
      // Minimum 14 always; ratio 1.5:1 only applies once minimum is exceeded
      result.maxOfficers = Math.max(14, Math.ceil(r * 1.5))
      result.heavies = Math.floor(r * 0.4)
      result.heaviesNote = `0.4:1 ratio, rounded down (${r} rebels)`
      result.gear = 'box'
      result.prohibitedSpecials = ['All Specials']
      // MRAPs: none unless 10+ rebels (Hunter only) or matching rebel MRAPs
      if (r >= 10) {
        result.policeMraps = Math.max(1, m)
        result.mrapNote = m > 0 ? `10+ rebels: Hunter allowed + match gang MRAPs 1:1 (${m})` : '10+ rebels: 1 Hunter allowed (Hunter only)'
        result.vehicles.push({ text: '10+ rebels: 1 Police Hunter permitted (Hunter only, no Ifrit)', type: 'ok' })
        if (m > 0) result.vehicles.push({ text: `${m} gang MRAP(s) → match 1:1`, type: 'ok' })
      } else if (m > 0) {
        result.policeMraps = m
        result.mrapNote = `Match gang MRAPs 1:1 (${m} allowed)`
        result.vehicles.push({ text: `${m} gang MRAP(s) → ${m} Police MRAP(s) allowed (1:1 only)`, type: 'ok' })
      } else {
        result.policeMraps = 0
        result.mrapNote = 'No MRAPs unless 10+ rebels or matching gang MRAPs'
      }
      result.vehicles.push({ text: 'All attending officers may take an unmarked vehicle', type: 'ok' })
      result.vehicles.push({ text: 'LSVs (light or regular) allowed if your rank grants access', type: 'info' })
      result.vehicles.push({ text: 'Orca: allowed without Hellcat regardless of rebel count; with Hellcat if 6+ rebels (SFO 2 or C/INSP+ permission)', type: 'info' })
      result.notes.push({ text: 'NO specials at Tier 1 banks — box gear otherwise allowed', type: 'danger' })
      result.notes.push({ text: 'No MRAPs unless 10+ rebels online or matching gang MRAPs (Hunter only for 10+)', type: 'warn' })
      result.notes.push({ text: 'Heavy ratio: 0.4:1, always round down — A/CC+ count towards heavy limit', type: 'warn' })
      result.notes.push({ text: 'Ratio 1.5:1 — minimum 14 officers regardless of rebel count', type: 'info' })
      result.notes.push({ text: 'Hellcat should go up as soon as possible with pilot and spotter', type: 'warn' })
      result.notes.push({ text: 'PCSOs are allowed to attend', type: 'ok' })
      break
    }

    // ── TIER 2 ───────────────────────────────────────────────────────────────
    case 'tier2_bank': {
      result.minOfficers = 16
      result.maxOfficers = Math.max(16, Math.ceil(r * 1.5))
      result.heavies = Math.floor(r * 0.4)
      result.heaviesNote = `0.4:1 ratio, rounded down (${r} rebels)`
      result.gear = 'box'
      result.prohibitedSpecials = ['All Specials']

      // Police MRAPs: 1 if 10+ rebels; match gang 1:1 (.50 offroad = MRAP)
      result.policeMraps = Math.max(r >= 10 ? 1 : 0, m)
      if (r >= 10 && m === 0) result.mrapNote = '10+ rebels: 1 Ifrit allowed (no gang MRAPs)'
      else if (m > 0) result.mrapNote = `Match gang MRAPs 1:1 — ${m} Ifrit(s) allowed (.50 offroad counts as MRAP)`
      else result.mrapNote = 'No Ifrits (< 10 rebels, no gang MRAPs)'

      result.vehicles.push({ text: 'All attending officers may take an unmarked vehicle', type: 'ok' })
      result.vehicles.push({ text: 'LSVs (light or regular) allowed if your rank grants access; SUPT+ can give to lower ranks with sufficient reason', type: 'info' })
      result.vehicles.push({ text: 'Orca: allowed without Hellcat regardless; with Hellcat if 6+ rebels (SFO 2 or C/INSP+ permission)', type: 'info' })
      result.notes.push({ text: 'NO specials at Tier 2 banks', type: 'danger' })
      result.notes.push({ text: 'Ratio 1.5:1 — minimum 16 officers regardless of rebel count', type: 'info' })
      result.notes.push({ text: 'Heavy ratio: 0.4:1, always round down — A/CC+ count towards heavy limit', type: 'warn' })
      result.notes.push({ text: 'SUPT+ can drop heavies to lower ranks', type: 'info' })
      result.notes.push({ text: 'Hellcat should go up as soon as possible with pilot and spotter', type: 'warn' })
      result.notes.push({ text: 'PCSOs are allowed to attend', type: 'ok' })
      break
    }

    // ── TIER 3 (USS Destroyers) ───────────────────────────────────────────────
    case 'tier3_bank': {
      result.minOfficers = 22
      // Minimum 22; ratio 1.5:1 applies above minimum
      result.maxOfficers = Math.max(22, Math.ceil(r * 1.5))
      result.heavies = Math.floor(r * 0.4)
      result.heaviesNote = `0.4:1 ratio, rounded down (${r} rebels)`
      result.gear = 'any'

      result.specials.push('1× Zafir 7.62mm (always)')
      result.specials.push('2× .50 cal BW mags each to 2 officers (always)')
      result.prohibitedSpecials = ['Cyrus 9.3mm', 'MAR-10 .338 LM']

      result.notes.push({ text: 'NO Cyrus/MAR-10 at Tier 3 — Zafir and .50 mags allowed', type: 'danger' })
      result.notes.push({ text: 'Heavy ratio: 0.4:1, always round down — A/CC+ count towards heavy limit', type: 'warn' })
      result.notes.push({ text: 'SUPT+ drops heavies (restrictively); C/SUPT+ drops specials', type: 'info' })

      // MRAPs: 2 base; if gang has 2+ MRAPs, take 1 more than gang (.50 offroad = MRAP)
      result.policeMraps = calcBankMraps(m, 2)
      if (m >= 2) result.mrapNote = `Gang has ${m} MRAPs → Police may take ${result.policeMraps} (gang+1)`
      else result.mrapNote = '2 MRAPs always (Hunter or Ifrit)'

      result.vehicles.push({ text: 'All attending officers may take an unmarked vehicle', type: 'ok' })
      result.vehicles.push({ text: 'LSVs if rank grants access; SUPT+/SFO can give to all lower ranks (doorless LSVs on Destroyers)', type: 'info' })
      result.vehicles.push({ text: 'Orca may be used in combination with Hellcat regardless of rebel count', type: 'ok' })
      result.notes.push({ text: 'Ratio 1.5:1 — minimum 22 officers regardless of rebel count', type: 'info' })
      result.notes.push({ text: 'Hellcat should go up as soon as possible with pilot and spotter', type: 'warn' })
      result.notes.push({ text: 'PCSOs are allowed to attend', type: 'ok' })
      break
    }

    // ── TIER 4 (Paros & Athira Oil Depot) ────────────────────────────────────
    case 'tier4_bank': {
      result.minOfficers = 22
      result.maxOfficers = null  // no ceiling
      result.heavies = Math.floor(r * 0.4)
      result.heaviesNote = `0.4:1 ratio, rounded down (${r} rebels)`
      result.gear = 'any'

      result.specials.push('1× Zafir 7.62mm (always)')
      if (r >= 14) result.specials.push('2nd Zafir 7.62mm (14+ rebels)')
      result.specials.push('2× .50 cal BW mags each to 2 officers (always)')
      result.specials.push('1× Cyrus 9.3mm or MAR-10 (always)')
      if (r >= 10) result.specials.push('2nd Cyrus/MAR-10 (10+ rebels)')

      result.notes.push({ text: 'Cyrus/MAR-10: minimum 600m range; CQC only if 5 or fewer officers remain on ground', type: 'warn' })
      result.notes.push({ text: 'No response ceiling — unlimited officers', type: 'info' })
      result.notes.push({ text: 'Heavy ratio: 0.4:1, always round down — A/CC+ count towards heavy limit', type: 'warn' })
      result.notes.push({ text: 'SUPT+ drops heavies (restrictively); C/SUPT+ drops specials', type: 'info' })

      // MRAPs: 2 base; +1 over gang if gang has 2+
      result.policeMraps = calcBankMraps(m, 2)
      if (m >= 2) result.mrapNote = `Gang has ${m} MRAPs → Police may take ${result.policeMraps} (gang+1)`
      else result.mrapNote = '2 MRAPs always (Hunter or Ifrit)'

      result.vehicles.push({ text: 'All attending officers may take an unmarked vehicle', type: 'ok' })
      result.vehicles.push({ text: 'LSVs if rank grants access; SUPT+/SFO can give to all lower ranks (doored on Paros/Mint)', type: 'info' })
      if (bankLocation === 'paros') {
        result.vehicles.push({ text: 'PAROS: 1× Armed Quillin / Offroad .50 cal permitted (counts as 1 police MRAP)', type: 'ok' })
      } else {
        result.vehicles.push({ text: 'ATHIRA OIL DEPOT: Armed Quillin / Offroad .50 cal is NOT permitted', type: 'danger' })
      }
      result.vehicles.push({ text: 'Orca may be used in combination with Hellcat regardless of rebel count', type: 'ok' })
      result.notes.push({ text: 'Hellcat should go up as soon as possible with pilot and spotter', type: 'warn' })
      result.notes.push({ text: 'PCSOs are allowed to attend', type: 'ok' })
      break
    }

    // ── TIER 5 (Royal Mint) ───────────────────────────────────────────────────
    case 'tier5_bank': {
      result.minOfficers = 28
      result.maxOfficers = null
      result.heavies = Math.floor(r * 0.4)
      result.heaviesNote = `0.4:1 ratio, rounded down (${r} rebels)`
      result.gear = 'any'

      result.specials.push('2× Zafir 7.62mm (always)')
      result.specials.push('2× .50 cal BW mags each to 3 officers (always)')
      result.specials.push('1× Cyrus 9.3mm or MAR-10 (always)')
      if (r >= 10) result.specials.push('2nd Cyrus/MAR-10 (10+ rebels)')

      result.notes.push({ text: 'Cyrus/MAR-10: minimum 600m range; CQC only if 5 or fewer officers remain on ground', type: 'warn' })
      result.notes.push({ text: 'No response ceiling — unlimited officers', type: 'info' })
      result.notes.push({ text: 'Heavy ratio: 0.4:1, always round down — A/CC+ count towards heavy limit', type: 'warn' })
      result.notes.push({ text: 'SUPT+ drops heavies (restrictively); C/SUPT+ drops specials', type: 'info' })

      // MRAPs: 4 base; +1 over gang if gang has 2+
      result.policeMraps = Math.max(4, m >= 2 ? m + 1 : 4)
      if (m >= 2 && m + 1 > 4) result.mrapNote = `Gang has ${m} MRAPs → Police may take ${result.policeMraps} (gang+1)`
      else result.mrapNote = '4 MRAPs always (Hunter or Ifrit)'

      result.vehicles.push({ text: 'All attending officers may take an unmarked vehicle', type: 'ok' })
      result.vehicles.push({ text: 'LSVs if rank grants access; SUPT+/SFO can give to all lower ranks (doored on Paros/Mint)', type: 'info' })
      result.vehicles.push({ text: '1× Armed Quillin / Offroad .50 cal permitted', type: 'ok' })
      result.vehicles.push({ text: 'Orca may be used in combination with Hellcat regardless of rebel count', type: 'ok' })
      result.notes.push({ text: 'Hellcat should go up as soon as possible with pilot and spotter', type: 'warn' })
      result.notes.push({ text: 'PCSOs are allowed to attend', type: 'ok' })
      break
    }

    // ── HEIST ────────────────────────────────────────────────────────────────
    case 'heist': {
      result.minOfficers = 8
      result.maxOfficers = Math.max(8, Math.ceil(r * 1.5))
      result.notes.push({ text: 'Minimum 8 officers regardless of rebel count', type: 'info' })
      result.notes.push({ text: 'Ratio: 1:1.5 (police:rebels)', type: 'info' })
      result.notes.push({ text: 'Police go off number of players online in triggering gang unless dispatch specifically states the number attending', type: 'warn' })
      result.notes.push({ text: 'KOS on triggering gang — no roleplay required', type: 'warn' })
      result.notes.push({ text: 'PCSO may only attend if RTO+ is present', type: 'warn' })
      if (r >= 8) {
        result.gear = 'box'
        result.heavies = Math.ceil(r * 0.5)
        result.vehicles.push({ text: 'Unmarked vehicles allowed for all', type: 'ok' })
        result.vehicles.push({ text: 'LSVs allowed if rank grants access — no dropping to lower ranks in heists', type: 'warn' })
        result.notes.push({ text: '8+ rebels: box gear open, heavies ratio 0.5:1', type: 'ok' })
        result.notes.push({ text: 'Box: NO special weapons unless it is your patrol gear', type: 'danger' })
      } else {
        result.gear = 'patrol'
        result.notes.push({ text: `Box gear requires 8+ rebels (currently ${r}) — patrol gear only`, type: 'warn' })
      }
      break
    }

    // ── GENERAL OPERATIONS ────────────────────────────────────────────────────
    case 'operations': {
      result.maxOfficers = Math.max(2, Math.floor(r * 1.5))
      result.notes.push({ text: 'Ratio 1.5:1 (police:rebels)', type: 'info' })
      result.notes.push({ text: 'Use common sense — consider gear AND vehicles, not just numbers', type: 'warn' })
      result.notes.push({ text: 'Appoint an Operations Commander (OC) immediately', type: 'info' })
      result.notes.push({ text: 'You cannot be dropped a heavy weapon without A/CC+ approval', type: 'danger' })
      if (r >= 10) {
        result.gear = 'box'
        result.heavies = Math.ceil(r * 0.5)
        result.notes.push({ text: `Box open (10+ rebels): ${Math.ceil(r * 0.5)} heavies allowed (0.5:1 ratio)`, type: 'ok' })
        result.notes.push({ text: 'Heavies can be dropped to lower ranks by SUPT+', type: 'info' })
        result.notes.push({ text: 'Box: no special weapons unless it is your patrol gear', type: 'danger' })
        result.notes.push({ text: 'Cyrus/MAR-10: benching ONLY if you have access — other specials require A/CC+ permission', type: 'warn' })
      } else {
        result.gear = 'patrol'
        result.notes.push({ text: `Box requires 10+ rebels to open (currently ${r})`, type: 'warn' })
      }
      if (r >= 8) {
        result.vehicles.push({ text: 'Unmarked vehicles allowed for all', type: 'ok' })
        result.vehicles.push({ text: 'SUPT+ can drop LSVs to lower ranks', type: 'ok' })
      } else {
        result.vehicles.push({ text: 'PCSO–INSP must use marked vehicles (< 8 rebels)', type: 'warn' })
        result.vehicles.push({ text: 'C/INSP+ may use unmarked vehicles', type: 'info' })
      }
      if (m > 0) {
        result.policeMraps = m
        result.mrapNote = `1:1 Ifrit counter to ${m} rebel MRAP(s)`
        result.notes.push({ text: `${m} rebel MRAP(s) → ${m} Police Ifrit(s) allowed (1:1 ratio)`, type: 'ok' })
      }
      break
    }

    // ── POWER PLANT ───────────────────────────────────────────────────────────
    case 'power_plant': {
      result.maxOfficers = Math.floor(r * 1.5)
      result.gear = 'patrol'
      result.notes.push({ text: 'Patrol gear ONLY — no box gear', type: 'danger' })
      result.notes.push({ text: 'Ratio: 1.5:1 (police:rebels)', type: 'info' })
      result.notes.push({ text: '20-minute NLR timer if you die', type: 'danger' })
      result.notes.push({ text: 'Only attend AFTER power plant has been captured', type: 'warn' })
      result.notes.push({ text: 'Leave immediately once fight ends and police hold it', type: 'warn' })
      result.notes.push({ text: 'PCSOs allowed — can be given lethal weapons', type: 'ok' })
      if (m > 0) {
        result.policeMraps = 1
        result.mrapNote = 'Ifrit allowed to counter hostile MRAP'
        result.notes.push({ text: `${m} rebel MRAP(s) detected → 1 Police Ifrit permitted`, type: 'ok' })
      }
      break
    }

    // ── POWERPLAY ─────────────────────────────────────────────────────────────
    case 'powerplay': {
      result.maxOfficers = Math.floor(r * 1.5)
      result.gear = 'patrol'
      result.notes.push({ text: 'Patrol gear ONLY — no box gear', type: 'danger' })
      result.notes.push({ text: 'Ratio: 1.5:1 (police:rebels)', type: 'info' })
      result.notes.push({ text: '20-minute NLR timer if you die', type: 'danger' })
      result.notes.push({ text: 'Requires C/INSP+ permission to attend', type: 'warn' })
      result.notes.push({ text: 'After capture: 3 cops may stay to defend, everyone else must leave', type: 'warn' })
      result.notes.push({ text: 'Once you leave, you cannot return (even if recaptured)', type: 'danger' })
      result.notes.push({ text: 'Max hold time: 30 minutes unless active combat', type: 'warn' })
      result.notes.push({ text: 'Police may NOT go to credit cache or air drops', type: 'danger' })
      result.rank.push('C/INSP+ required to authorise attendance')
      break
    }

    // ── RED ZONE RAID ─────────────────────────────────────────────────────────
    case 'redzone': {
      result.notes.push({ text: 'NOTE: Redzone raids not authorised until further notice', type: 'danger' })
      result.prohibitedSpecials = ['.50 cal BW magazines', 'Zafir 7.62mm', 'Heavy Snipers']
      if (r < 6) {
        // 3-5 rebels capped a point: SFO may attend, but only Chief/Co-Chief or A/CC+ can authorise
        result.maxOfficers = Math.ceil(r * 0.5)
        result.heavies = Math.ceil(r * 0.5)
        result.notes.push({ text: `Under 6 rebels: SFO-only, ratio 0.5:1 — ${Math.ceil(r * 0.5)} officer(s) max`, type: 'info' })
        result.notes.push({ text: 'CONDITION: gang must have capped Church / OG Credit Cartel / Drug Cartel (3+ rebels)', type: 'warn' })
        result.rank.push('Chief / Co-Chief or A/CC+ must authorise (SFO 3 is NOT enough for under-6-rebel raids)')
        result.rank.push('Authorising officer MUST be in attendance')
        result.rank.push('C/SUPT CANNOT authorise raids')
      } else {
        result.maxOfficers = r
        result.heavies = Math.ceil(r * 0.5)
        result.notes.push({ text: 'Ratio: 1:1 (police:rebels)', type: 'info' })
        result.notes.push({ text: 'Heavy ratio: 0.5:1', type: 'info' })
        result.notes.push({ text: 'CONDITION: gang with 6+ members captures Church / OG Credit Cartel / Drug Cartel', type: 'warn' })
        result.rank.push('SFO 3 / A/CC+ must authorise and MUST be in attendance')
        result.rank.push('SFO 2 can authorise for other SFO members only')
        result.rank.push('SFO 3 can authorise non-SFO DC+ members')
        result.rank.push('C/SFO / A/CC+ may authorise non-SFO members regardless of rank')
        result.rank.push('C/SUPT CANNOT authorise raids')
      }
      result.notes.push({ text: '60-minute cooldown before another redzone raid after completion', type: 'warn' })
      result.notes.push({ text: 'You may freely enter the redzone if ACTIVELY following someone who fled a chase into it (not a raid)', type: 'info' })
      break
    }

    // ── SHIPWRECK RECOVERY ────────────────────────────────────────────────────
    case 'shipwreck': {
      result.minOfficers = 3
      if (r > 0) {
        result.maxOfficers = r * 2
        result.notes.push({ text: `Combat scenario: max ${r * 2} officers (2:1 ratio)`, type: 'info' })
      } else {
        result.maxOfficers = null
        result.notes.push({ text: 'No combat: bring as many as needed (min 3)', type: 'info' })
      }
      result.notes.push({ text: 'Minimum 3 officers (one must be NPAS when SDV needs slingloading)', type: 'info' })
      result.notes.push({ text: 'If another gang engages: max officers capped at 2:1 rebel ratio', type: 'warn' })
      result.notes.push({ text: 'Max 2 shipwrecks per restart; additional spawned wrecks can only be attended once tampered', type: 'warn' })
      result.notes.push({ text: 'Extra spawned wrecks: must be authorised by SUPT+ who is IN-GAME (not just on TS/Discord)', type: 'danger' })
      result.notes.push({ text: 'Mark every attempted shipwreck on the map — a marked wreck requires C/INSP+ to authorise another in same restart', type: 'warn' })
      result.notes.push({ text: 'Use Vans or Zamaks to transport Gold Bullion from coast to PD', type: 'info' })
      result.notes.push({ text: 'Public server announcement required: "(Attention all, APC will be conducting a search of a nearby shipwreck)"', type: 'warn' })
      result.notes.push({ text: 'SDV slingload: PD→wreck (with cops), wreck→coast (with gold+cops), coast→PD (empty) only', type: 'info' })
      result.rank.push('First recovery: C/INSP+ must authorise and attend')
      result.rank.push('Additional recovery: C/INSP+ authorises only after original situation fully ends')
      break
    }

    // ── CHECKPOINT ────────────────────────────────────────────────────────────
    case 'checkpoint': {
      result.minOfficers = 5
      result.maxOfficers = null
      result.notes.push({ text: 'Minimum 5 officers required', type: 'info' })
      result.notes.push({ text: 'At least 1 officer must be DC or above', type: 'warn' })
      result.notes.push({ text: 'If PCSOs attending: RTO or SPC+ must be present', type: 'warn' })
      result.notes.push({ text: 'Officers must wear hi-vis uniform (INSP+ may use own uniform)', type: 'info' })
      result.notes.push({ text: 'Use Tactical Ops channel (or Kavala Checkpoint if near Kavala)', type: 'info' })
      result.notes.push({ text: 'Bring a Zamak with spike strips, food, water, toolkits', type: 'info' })
      result.notes.push({ text: 'Minimum 2 Police Interceptors required', type: 'warn' })
      result.vehicles.push({ text: '2+ Police Interceptors required', type: 'warn' })
      result.vehicles.push({ text: '1 Zamak required (spike strips, food, water, toolkits)', type: 'warn' })
      result.rank.push('1× DC or above required')
      break
    }

    // ── ARMOURED TRANSPORT ────────────────────────────────────────────────────
    case 'armoured_transport': {
      const isLarge = escortSize === 'large'
      result.minOfficers = isLarge ? 18 : 10
      result.maxOfficers = null
      result.gear = 'box'
      result.heavies = Infinity

      // 6+ rebels online required to trigger the event
      if (r < 6) result.notes.push({ text: `WARNING: A gang of 6+ rebels must be online to trigger the event (currently ${r})`, type: 'danger' })

      result.specials.push('1× Zafir 7.62mm (always)')
      result.specials.push(isLarge ? '2× .50 cal BW mags each to 2 officers' : '2× .50 cal BW mags to 1 officer')
      result.specials.push('1× Cyrus 9.3mm or MAR-10 (always — benching / end zone only)')
      result.notes.push({ text: 'Cyrus/MAR-10: benching or end zone ONLY — CQC strictly forbidden regardless of officers remaining', type: 'danger' })
      result.notes.push({ text: 'No heavy weapon limit; SUPT+ drops heavies (restrictively); C/SUPT+ drops specials', type: 'info' })

      // MRAPs: small=1, large=2 base; always 1 more than gang
      const baseMraps = isLarge ? 2 : 1
      result.policeMraps = Math.max(baseMraps, m + 1)
      if (m === 0) result.mrapNote = `${isLarge ? 'Large' : 'Small'} escort base: ${baseMraps} MRAP(s)`
      else result.mrapNote = `Gang has ${m} MRAP(s) → always 1 more: ${result.policeMraps} Police MRAP(s)`

      result.vehicles.push({ text: 'Doored LSVs (regular version) for all ranks regardless of rebel count', type: 'ok' })
      if (isLarge) result.vehicles.push({ text: 'LARGE escort: 1× Armed Quillin / Offroad .50 cal permitted', type: 'ok' })
      else result.vehicles.push({ text: 'SMALL escort: Armed Quillin / Offroad .50 cal NOT permitted', type: 'danger' })
      result.vehicles.push({ text: 'Orca at minimum; Hellcat if OC deems necessary', type: 'warn' })

      result.rank.push('INSP+ or SFO only can command (OC) Armoured Transport Escorts')
      result.notes.push({ text: `${isLarge ? 'Large' : 'Small'} escort: minimum ${isLarge ? 18 : 10} officers attending`, type: 'info' })
      result.notes.push({ text: 'PCSOs are allowed to attend', type: 'ok' })
      break
    }

    default: break
  }

  return result
}
