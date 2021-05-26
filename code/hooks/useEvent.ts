import * as React from "react"

export function useEvent(eventName: string, onEvent?: (event: any) => void) {
    const eventListener = React.useRef<(event: any) => void | undefined>()
    React.useEffect(() => {
        eventListener.current = onEvent
    }, [onEvent])

    React.useEffect(() => {
        const handler = (event) => {
            if (event.eventName === eventName && eventListener.current) {
                eventListener.current(event.payload)
            }
        }
        const setupEvents = (retryCount = 0) => {
            if (!window.framerRealtimeDataSocket) {
                setTimeout(
                    () => setupEvents(retryCount + 1),
                    retryCount + 1 * 500
                )
                return
            }

            if (eventListener.current) {
                window.framerRealtimeDataSocket.on("globalEvent", handler)
            }
        }
        setupEvents()

        return () => {
            if (window.framerRealtimeDataSocket)
                window.framerRealtimeDataSocket.off("globalEvent", handler)
        }
    }, [])

    const emitEvent = React.useCallback((payload?: any) => {
        if (!window.framerRealtimeDataSocket) return
        window.framerRealtimeDataSocket.emit("globalEvent", {
            eventName,
            payload: payload,
        })
    }, [])

    return [emitEvent]
}
