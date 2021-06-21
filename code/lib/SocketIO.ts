import { io, Socket } from "socket.io-client"

export default {
    connect(endpoint: string): Promise<Socket> {
        return new Promise((resolve, reject) => {
            const socket = io(endpoint)
            socket.on("connect", () => {
                console.log(`[FramerRealtimeData] Socket connected`)
                return resolve(socket)
            })
            socket.on("reconnect", (data) => {
                console.error(`[FramerRealtimeData] Socket reconnected`)
            })
            socket.on("connect_error", (err) => {
                console.error(
                    `[FramerRealtimeData] Socket had a connection error: ${err.message}`,
                    socket
                )
                return reject(err)
            })
            socket.on("connect_timeout", (err) => {
                console.error(
                    `[FramerRealtimeData] Socket connection timed out: ${err.message}`
                )
                return reject(err)
            })
        })
    },
}
