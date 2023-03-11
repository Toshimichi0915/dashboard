import { Sky } from "@/components/Sky"
import { Water } from "@/components/Water"
import { Canvas } from "@react-three/fiber"

export default function Page() {
  return (
    <main
      style={{
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <Canvas>
        <ambientLight />
        <Water />
        <Sky />
      </Canvas>
    </main>
  )
}
