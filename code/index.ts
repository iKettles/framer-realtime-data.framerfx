import { RenderTarget } from "framer"
import SocketIO from "./lib/SocketIO"

const SOCKET_SERVER_URL = "http://localhost:1338"

async function startSocketConnection() {
    if (
        RenderTarget.current() === RenderTarget.canvas ||
        RenderTarget.current() === RenderTarget.thumbnail
    ) {
        return
    }
    if (window.framerRealtimeDataSocket) {
        return console.log(`[FramerRealtimeData] Socket already connected`)
    }

    try {
        console.log(
            `[FramerRealtimeData] Connecting to framer-realtime-data-api on ${SOCKET_SERVER_URL}`
        )
        const createdSocket = await SocketIO.connect(SOCKET_SERVER_URL)
        console.log(`[FramerRealtimeData] Created socket`)
        window.framerRealtimeDataSocket = createdSocket
    } catch (err) {
        console.error(
            `[FramerRealtimeData] Error trying to create socket `,
            err
        )
    }
}

startSocketConnection()
