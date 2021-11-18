import { useEffect, useRef } from "react"

const useObserver = (eventName, handler, observable) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      const eventListener = (event) => savedHandler.current?.(event)
      observable.on(eventName, eventListener)
      return () => {
        observable.off(eventName, eventListener)
      }
    },
    [eventName, observable] // Re-run if eventName or observable changes
  )
}

export default useObserver
