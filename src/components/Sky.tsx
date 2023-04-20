import React, { forwardRef, useEffect, useState } from "react"
import { Sky as SkyImpl } from "@/common/Sky"
import { ShaderMaterial, Vector3 } from "three"
import { PrimitiveProps } from "@react-three/fiber"

export interface SkyProps {
  sunPosition: Vector3
  scale?: number
}

export const Sky = forwardRef<PrimitiveProps, SkyProps>(function Sky({ sunPosition, scale = 450000 }, ref) {
  const [ sky ] = useState(() => {
    const impl = new SkyImpl()
    const material = impl.material as ShaderMaterial
    const skyUniforms = material.uniforms

    skyUniforms.turbidity.value = 10
    skyUniforms.rayleigh.value = 2
    skyUniforms.mieCoefficient.value = 0.005
    skyUniforms.mieDirectionalG.value = 0.8

    material.uniforms.sunPosition.value.copy(sunPosition)

    return impl
  })

  useEffect(() => {
    const material = sky.material as ShaderMaterial
    material.uniforms.sunPosition.value.copy(sunPosition)
  }, [ sky.material, sunPosition ])

  return <primitive object={sky} ref={ref} scale={scale} />
})
