import { SunParameters, useSun } from "@/hooks/sun"
import { Canvas } from "@react-three/fiber"
import { Sky } from "@/components/Sky"
import { SunAnimation } from "@/components/SunAnimation"
import { Water } from "@/components/Water"

export function World({ params }: { params: SunParameters }) {
  const sun = useSun()

  return (
    <div className="fixed top-0 left-0 -z-10 w-screen h-screen overflow-hidden">
      <Canvas>
        <SunAnimation sun={sun} params={params} />
        <ambientLight />
        <Water sunPosition={sun.position} />
        <Sky sunPosition={sun.position} />
      </Canvas>
    </div>
  )
}
