const twitch = window.Twitch.ext
const ebsUrl = "https://colavt-unbox.coolify.maddy.fyi"
console.log(`${ebsUrl}/static/html/panel.html (${twitch.version}-${twitch.environment})`)

const charGrid = document.getElementById('charGrid');
const spotlightZone = document.getElementById('spotlightZone');
const spotlightRender = document.getElementById('spotlightRender');
const spotlightBgText = document.getElementById('spotlightBgText');
const spotlightTagline = document.getElementById('spotlightTagline');

const fighterModal = document.getElementById('fighterModal');
const modalCard = document.getElementById("modalCard")
const modalRarity = document.getElementById('modalRarity');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function getEndpoint(route, token) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `${ebsUrl}/api/${route}`, false)
    xhr.setRequestHeader("Authorization", `Bearer ${token}`)
    xhr.send(null)
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText)
    } else {
        throw new Error(`Request failed: ${xhr.statusText}`)
    }
}

function addCellEvents(cell, item) {
    cell._controller = new AbortController()

    const handleEnter = () => {
        console.log("handleenter fired")
        spotlightZone.classList.add("active")
        spotlightRender.innerHTML = `<img src="${item._full_image_url}" style="width:100%; height:100%; object-fit:contain;" />`

        if (item._is_locked) {
            spotlightZone.classList.add("locked-preview")
            spotlightZone.style.borderColor = "var(--main-red)"
            spotlightBgText.innerText = "LOCKED"
            spotlightTagline.innerText = "WHO COULD IT BE NOW?"
            return
        }

        spotlightZone.style.borderColor = `var(--${item.rarity})`
        spotlightZone.classList.remove("locked-preview")
        spotlightBgText.innerText = item.name
        spotlightTagline.innerText = `${item.name} is in your team!`
    }

    const handleClick = () => {
        console.log("handleclick fired")
        if (item._is_locked) return

        modalTitle.innerText = item.name
        modalIcon.innerHTML = `<img src="${item._full_image_url}" style="width:100%; height:100%; object-fit:contain;" />`
        modalDesc.innerText = item.description
        modalRarity.innerText = item.rarity
        modalRarity.style.backgroundColor = `var(--${item.rarity})`

        modalCard.style.borderColor = `var(--${item.rarity})`
        fighterModal.classList.add("open")
    }

    cell.addEventListener("mouseenter", handleEnter, {signal: cell._controller.signal})
    cell.addEventListener("touchstart", handleEnter, {passive: true, signal: cell._controller.signal})
    cell.addEventListener("click", handleClick, {signal: cell._controller.signal})
}

// TODO: will this fire more than once and fuck things up?
twitch.onAuthorized(auth => {
    console.log(auth)
    let target = `whisper-${auth.userId}`
    console.log(`listening on ${target}`)

    let items = getEndpoint("items", auth.token)
    let inventoryItems = getEndpoint("inventory", auth.token)

    let inventoryItemIds = new Set(inventoryItems.map(item => item.item_id))
    
    for (const item of items) {
        let hasItem = inventoryItemIds.has(item.id)
        
        item._is_locked = hasItem ? "" : "is-locked"
        item._locked_name = hasItem ? item.name : "???"
        item._full_image_url = `${ebsUrl}/${item.image_url}`

        let cell = document.createElement("div")
        cell.setAttribute("data-id", item.id)

        cell.className = `char-cell ${item.rarity} ${item._is_locked}`
        cell.innerHTML = `
            <div class="char-art-placeholder">
                <img src="${item._full_image_url}" alt="${item.name}" class="cell-img" />
            </div>
            <div class="char-name">${item._locked_name}</div>
        `
        
        // add event listeners to cell
        addCellEvents(cell, item)
        charGrid.appendChild(cell)
    }

    const closeModal = () => fighterModal.classList.remove('open');
    modalCloseBtn.addEventListener('click', closeModal);
    fighterModal.addEventListener('click', (e) => {
        if (e.target === fighterModal) closeModal();
    });

    charGrid.addEventListener('mouseleave', () => {
        spotlightZone.classList.remove('active');
        spotlightZone.classList.remove('locked-preview');
        spotlightZone.style.borderColor = "#fff"
        spotlightRender.innerHTML = "❔"
        spotlightBgText.innerText = "CHOOSE";
        spotlightTagline.innerText = "WHO WILL YOU BE?";
    });

    twitch.listen(target, (_, __, message) => {
        let inventoryItem = JSON.parse(message)
        console.log(`inventoryItem.item_id = ${inventoryItem.item_id}`)
        if (inventoryItemIds.has(inventoryItem.item_id)) return

        let item = items.find(item => item.id === inventoryItem.item_id)
        console.log(`item.id = ${item.id}`)

        item._is_locked = ""
        item._locked_name = item.name
        item._full_image_url = `${ebsUrl}/${item.image_url}`

        let cell = document.querySelector(`div[data-id="${item.id}"]`)
        cell._controller.abort()

        cell.className = `char-cell ${item.rarity} ${item._is_locked}`
        cell.innerHTML = `
            <div class="char-art-placeholder">
                <img src="${item._full_image_url}" alt="${item.name}" class="cell-img" />
            </div>
            <div class="char-name">${item._locked_name}</div>
        `
        addCellEvents(cell, item)
    })
})