import { Socket } from "socket.io-client"

export {}

declare global {
    interface Window {
        MAPBOX_DEBUG: boolean
        framerRealtimeDataSocket: Socket | undefined
    }
}
