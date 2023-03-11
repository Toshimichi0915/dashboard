import { SunParameters, useSun } from "@/hook/sun"
import { Canvas } from "@react-three/fiber"
import { Sky } from "@/components/Sky"
import { SunAnimation } from "@/components/SunAnimation"
import { Water } from "@/components/Water"

export function World({ params }: { params: SunParameters }) {
  const sun = useSun()

  return (
    <div className="fixed top-0 left-0 -z-10" style={{ width: "100dvw", height: "100dvh" }}>
      <Canvas>
        <SunAnimation sun={sun} params={params} />
        <ambientLight />
        <Water sun={sun} />
        <Sky sun={sun} />
      </Canvas>
    </div>
  )
}
