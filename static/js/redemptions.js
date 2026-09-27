var ws
var data

var redemptionLogs = document.getElementsByClassName("redemption-logs")[0]

function performAction(element, rid, action) {
    ws.send(JSON.stringify({
        "action": action,
        "redemption_id": rid
    }))
    
    element.parentElement.remove()
}

function connect() {
    ws = new WebSocket("https://colavt-unbox.coolify.maddy.fyi/ws/redemptions")

    ws.onmessage = (e) => {
        data = JSON.parse(e.data)
        console.log(data)
        main()
    }

    ws.onclose = (e) => {
        setTimeout(connect, 5000)
    }

    ws.onerror = ws.close
}

async function main() {
    div = document.createElement("div")
    div.innerHTML = `<p> [${data.owner}] ${data.item.desc} </p><a href="#" onclick="performAction(this, '${data.redemption_id}', 'complete')">complete</a><br/><a href="#" onclick="performAction(this, '${data.redemption_id}', 'refund')">refund</a>`
    redemptionLogs.append(div)
}

document.addEventListener("DOMContentLoaded", connect)
window.addEventListener("beforeunload", (e) => {
    ws.close()
})