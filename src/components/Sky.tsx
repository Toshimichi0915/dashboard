import React, { useState } from "react"
import { Sky as SkyImpl } from "@/common/Sky"
import { MathUtils, ShaderMaterial, Vector3 } from "three"
import { PrimitiveProps } from "@react-three/fiber"

export interface SkyProps {
  scale?: number
}

export const Sky = React.forwardRef<PrimitiveProps, SkyProps>(({ scale = 450000 }, ref) => {
  const [sky] = useState(() => {
    const impl = new SkyImpl()
    const material = impl.material as ShaderMaterial
    const skyUniforms = material.uniforms

    skyUniforms.turbidity.value = 10
    skyUniforms.rayleigh.value = 2
    skyUniforms.mieCoefficient.value = 0.005
    skyUniforms.mieDirectionalG.value = 0.8

    const parameters = {
      elevation: 2,
      azimuth: 150,
    }

    const sun = new Vector3()
    const phi = MathUtils.degToRad(90 - parameters.elevation)
    const theta = MathUtils.degToRad(parameters.azimuth)

    sun.setFromSphericalCoords(1, phi, theta)
    material.uniforms.sunPosition.value.copy(sun)

    return impl
  })

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={sky} ref={ref} scale={scale} />
})
