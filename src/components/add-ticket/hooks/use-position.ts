import { useState, useEffect } from "react"

export const usePosition = () => {
  const [position] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError("Geolocation is not supported")
      return
    }
    return
  }, [])
  return { ...position, error }
}
