import React, { useState } from "react"
import { MathUtils, PlaneGeometry, RepeatWrapping, ShaderMaterial, TextureLoader, Vector3 } from "three"
import { Water as WaterImpl } from "@/common/Water"
import { useFrame } from "@react-three/fiber"

export const Water = React.forwardRef((props, ref) => {
  const [water] = useState(() => {
    const waterGeometry = new PlaneGeometry(10000, 10000)
    const impl = new WaterImpl(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new TextureLoader().load("/waternormals.jpg", (texture) => {
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
      }),
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
    })
    const material = impl.material as ShaderMaterial

    const parameters = {
      elevation: 2,
      azimuth: 180,
    }

    const sun = new Vector3()
    const phi = MathUtils.degToRad(90 - parameters.elevation)
    const theta = MathUtils.degToRad(parameters.azimuth)

    sun.setFromSphericalCoords(1, phi, theta)
    material.uniforms.sunDirection.value.copy(sun).normalize()
    impl.rotation.x = -Math.PI / 2
    impl.position.y = -5

    return impl
  })

  useFrame(() => {
    const material = water.material as ShaderMaterial
    material.uniforms.time.value += 1.0 / 60.0
  })

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={water} ref={ref} />
})
