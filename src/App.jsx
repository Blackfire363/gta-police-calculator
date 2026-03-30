import { useState, useMemo } from 'react'
import { calculate } from './data/calculator'
import Header from './components/Header'
import InputPanel from './components/InputPanel'
import ResultPanel from './components/ResultPanel'

export default function App() {
  const [opId, setOpId] = useState('operations')
  const [rebels, setRebels] = useState(6)
  const [mraps, setMraps] = useState(0)
  const [escortSize, setEscortSize] = useState('small')
  const [bankLocation, setBankLocation] = useState('paros')

  const res = useMemo(
    () => calculate(opId, rebels, mraps, escortSize, bankLocation),
    [opId, rebels, mraps, escortSize, bankLocation]
  )

  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      <div className="flex gap-4 p-4 max-w-5xl mx-auto items-start flex-wrap lg:flex-nowrap">
        <InputPanel
          opId={opId} setOpId={setOpId}
          rebels={rebels} setRebels={setRebels}
          mraps={mraps} setMraps={setMraps}
          escortSize={escortSize} setEscortSize={setEscortSize}
          bankLocation={bankLocation} setBankLocation={setBankLocation}
        />
        <ResultPanel res={res} rebels={rebels} mraps={mraps} />
      </div>
    </div>
  )
}
