import { useCallback, useState } from "react"
import { MathUtils, Vector3 } from "three"

export interface Sun {
  position: Vector3
  update(parameters: SunParameters): void
}

export interface SunParameters {
  elevation: number
  azimuth: number
}

export function useSun(): Sun {
  const [position, setPosition] = useState(() => new Vector3())

  const update = useCallback(
    (parameters?: SunParameters) => {
      if (!parameters) return
      const phi = MathUtils.degToRad(90 - parameters.elevation)
      const theta = MathUtils.degToRad(parameters.azimuth)

      const newPos = new Vector3()
      newPos.setFromSphericalCoords(1, phi, theta)

      if (position.equals(newPos)) return
      setPosition(newPos)
    },
    [position]
  )

  return {
    position,
    update,
  }
}
