const ws = new WebSocket(`wss://${window.location.href}/ws`)

ws.addEventListener("open", event => {
    console.log("ws connection open")
})

ws.addEventListener("message", event => {
    console.log(`ws message from server: ${event.data}`)
})

ws.addEventListener("error", event => {
    console.error(`ws encounter error: ${event}`)
})

ws.addEventListener("close", event => {
    console.log(`ws connection closed: ${event.code} (${event.reason})`)
})