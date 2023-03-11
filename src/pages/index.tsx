import { Sky } from "@/components/Sky"
import { SunAnimation } from "@/components/SunAnimation"
import { Water } from "@/components/Water"
import { useSun } from "@/hook/sun"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"

const sunHidden = {
  elevation: -2,
  azimuth: 160,
}

const sunShown = {
  elevation: -0.5,
  azimuth: 160,
}

export default function Page() {
  const sun = useSun()

  const [params, setParams] = useState(sunHidden)

  return (
    <main
      className="relative"
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <div
        className="absolute top-0 left-0 -z-10"
        style={{
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <Canvas>
          <SunAnimation sun={sun} params={params} />
          <ambientLight />
          <Water sun={sun} />
          <Sky sun={sun} />
        </Canvas>
      </div>

      <div
        className="grid place-items-center"
        style={{
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <p>Watch the sunrise</p>
      </div>
    </main>
  )
}
