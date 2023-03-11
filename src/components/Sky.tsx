import React, { useEffect, useState } from "react"
import { Sky as SkyImpl } from "@/common/Sky"
import { ShaderMaterial } from "three"
import { PrimitiveProps } from "@react-three/fiber"
import { Sun } from "@/hook/sun"

export interface SkyProps {
  sun: Sun
  scale?: number
}

export const Sky = React.forwardRef<PrimitiveProps, SkyProps>(({ sun, scale = 450000 }, ref) => {
  const [sky] = useState(() => {
    const impl = new SkyImpl()
    const material = impl.material as ShaderMaterial
    const skyUniforms = material.uniforms

    skyUniforms.turbidity.value = 10
    skyUniforms.rayleigh.value = 2
    skyUniforms.mieCoefficient.value = 0.005
    skyUniforms.mieDirectionalG.value = 0.8

    material.uniforms.sunPosition.value.copy(sun.position)

    return impl
  })

  useEffect(() => {
    const material = sky.material as ShaderMaterial
    material.uniforms.sunPosition.value.copy(sun.position)
  }, [sky.material, sun])

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={sky} ref={ref} scale={scale} />
})
