function getEndpoint(route, auth) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `https://localhost:8080/api/${route}`, false)
    xhr.setRequestHeader("Authorization", `Bearer ${auth.token}`)
    xhr.send(null)
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText)
    } else {
        throw new Error(`Request failed: ${xhr.statusText}`)
    }
}

function getEndpointNoResponse(route, auth) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `https://localhost:8080/api/${route}`, false)
    xhr.setRequestHeader("Authorization", `Bearer ${auth.token}`)
    xhr.send(null)
    if (xhr.status === 200) {
        return
    } else {
        throw new Error(`Request failed: ${xhr.statusText}`)
    }
}

function getRarityColor(rarityName) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${rarityName.toLowerCase()}`).trim();
}

function main(auth) {
    const inventoryItems = getEndpoint("inventory", auth)

    // we only want the item ids so we know what they have
    let inventoryItemIds = []
    inventoryItems.forEach(item => {
        if (!inventoryItemIds.includes(item.item_id)) {
            inventoryItemIds.push(item.item_id)
        }
    })

    const items = getEndpoint("items", auth).map(item => {
        item.desc = item.description
        item.icon = `https://localhost:8080/${item.image_url}`
        // item.locked = Math.random() >= 0.5 ? true : false
        item.locked = inventoryItemIds.includes(item.id) ? false : true
        return item
    })

    const charGrid = document.getElementById('charGrid');
    const spotlightZone = document.getElementById('spotlightZone');
    const spotlightRender = document.getElementById('spotlightRender');
    const spotlightBgText = document.getElementById('spotlightBgText');
    const spotlightTagline = document.getElementById('spotlightTagline');

    const fighterModal = document.getElementById('fighterModal');
    const modalRarity = document.getElementById('modalRarity');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Build the Grid Layout dynamically with image components
    items.forEach(f => {
        const cell = document.createElement('div');
        cell.className = `char-cell ${f.rarity.toLowerCase()} ${f.locked ? 'is-locked' : ''}`;
        
        cell.innerHTML = `
            <div class="char-art-placeholder">
                <img src="${f.icon}" alt="${f.name}" class="cell-img" />
            </div>
            <div class="char-name">${f.locked ? '???' : f.name}</div>
        `;

        const handleEnter = () => {
            spotlightZone.classList.add('active');
            spotlightRender.innerHTML = `<img src="${f.icon}" style="width:100%; height:100%; object-fit:contain;" />`;

            if (f.locked) {
                spotlightZone.classList.add('locked-preview');
                spotlightZone.style.borderColor = "var(--melee-red)"; // Locked defaults to Melee Red border
                spotlightBgText.innerText = "LOCKED";
                spotlightTagline.innerText = "CHALLENGER APPROACHING!";
            } else {
                spotlightZone.classList.remove('locked-preview');
                spotlightZone.style.borderColor = getRarityColor(f.rarity); // Updates border to current rarity color
                spotlightBgText.innerText = f.name;
                spotlightTagline.innerText = `${f.name} Joins The Fray!`;
            }
        }

        cell.addEventListener('mouseenter', handleEnter);
        cell.addEventListener('touchstart', handleEnter, {passive: true});

        cell.addEventListener('click', () => {
            if (!f.locked) {
                modalTitle.innerText = f.name;
                modalIcon.innerHTML = `<img src="${f.icon}" style="width:100px; height:100px; object-fit:contain;" />`;
                modalDesc.innerText = f.desc;
                modalRarity.innerText = f.rarity;
                modalRarity.style.backgroundColor = `var(--${f.rarity.toLowerCase()})`;
                fighterModal.classList.add('open');
            }
        });

        charGrid.appendChild(cell);
    });

    // Resets back to default golden-yellow border when leaving the grid space
    charGrid.addEventListener('mouseleave', () => {
        spotlightZone.classList.remove('active');
        spotlightZone.classList.remove('locked-preview');
        spotlightZone.style.borderColor = "#ffcc00"; 
        spotlightRender.innerHTML = "❓";
        spotlightBgText.innerText = "CHOOSE";
        spotlightTagline.innerText = "WHO WILL YOU BE?";
    });

    const closeModal = () => fighterModal.classList.remove('open');
    modalCloseBtn.addEventListener('click', closeModal);
    fighterModal.addEventListener('click', (e) => {
        if (e.target === fighterModal) closeModal();
    });
}

function pubSubCallback(target, contentType, message) {
    console.log("received pubsub message:")
    console.log(target)
    console.log(contentType)
    console.log(message)
}

window.Twitch.ext.onAuthorized((auth) => {
    console.log("Handshake complete! Channel ID:", auth.channelId);

    try {
        window.Twitch.ext.listen("broadcast", pubSubCallback)
    } catch (error) {
        console.error(error)
    }

    // getEndpointNoResponse("pubsub", auth)
    main(auth)
});

