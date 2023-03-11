import { Sun, SunParameters } from "@/hooks/sun"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"

const clampSteps = 120

export function SunAnimation({ sun, params }: { sun: Sun; params: SunParameters }) {
  const [step, setStep] = useState(clampSteps)

  const paramsRef = useRef({
    value: params,
    prev: params,
  })

  const { value, prev } = paramsRef.current

  if (value !== params) {
    paramsRef.current = {
      value: params,
      prev: value,
    }
    setStep(0)
  }

  const clamp = useMemo(
    () => ({
      elevation: (params.elevation - prev.elevation) * (step / clampSteps) + prev.elevation,
      azimuth: (params.azimuth - prev.azimuth) * (step / clampSteps) + prev.azimuth,
    }),
    [params.azimuth, params.elevation, prev.azimuth, prev.elevation, step]
  )

  useFrame(() => {
    if (step < clampSteps) {
      setStep(step + 1)
    }
    sun.update(clamp)
  })

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={{}} />
}
