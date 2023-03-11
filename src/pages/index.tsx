import { Sky } from "@/components/Sky"
import { Water } from "@/components/Water"
import { Canvas } from "@react-three/fiber"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MathUtils, Vector3 } from "three/src/Three"

export interface SunParameters {
  elevation: number
  azimuth: number
}

function useSun(): [Vector3, Dispatch<SetStateAction<SunParameters>>] {
  const [sun, setSun] = useState(() => new Vector3())
  const [parameters, setParameters] = useState(() => ({
    elevation: 2,
    azimuth: 180,
  }))

  useEffect(() => {
    const phi = MathUtils.degToRad(90 - parameters.elevation)
    const theta = MathUtils.degToRad(parameters.azimuth)

    const newPos = new Vector3()
    newPos.setFromSphericalCoords(1, phi, theta)
    setSun(newPos)
  }, [parameters])

  return [sun, setParameters]
}

export default function Page() {
  const [sun] = useSun()

  return (
    <main
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <Canvas>
        <ambientLight />
        <Water sun={sun} />
        <Sky sun={sun} />
      </Canvas>
    </main>
  )
}
