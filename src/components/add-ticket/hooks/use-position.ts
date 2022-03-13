import { useState, useEffect } from "react"

export const usePosition = () => {
  const [position, setPosition] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }
  const onError = (error) => {
    setError(error.message)
  }
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
