const SUPABASE_URL = 'https://lthfrmaeialtaxtzunai.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aGZybWFlaWFsdGF4dHp1bmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjU2ODQsImV4cCI6MjA5MTI0MTY4NH0.Zmrq5YDyKL5PAstPDKt1tA0O4s6SSmFqx17mu5SphKA';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.addEventListener('DOMContentLoaded', async () => {
    loadData();

    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (session) {
        const metadata = session.user.user_metadata;
        
        const username = metadata.username || metadata.full_name || metadata.name || "Guest";
        
        let avatarUrl = "";
        
        if (metadata.avatar) {
            if (metadata.avatar.startsWith('http') || metadata.avatar.startsWith('data:image')) {
                avatarUrl = metadata.avatar;
            } else {
                let formattedName = metadata.avatar.replace(/ /g, '_').replace(/-/g, '');
                avatarUrl = `https://hellokittyislandadventure.wiki.gg/images/Icon_square_${formattedName}.png`;
            }
        } else if (metadata.avatar_url || metadata.picture) {
            avatarUrl = metadata.avatar_url || metadata.picture;
        } else {
            avatarUrl = `https://hellokittyislandadventure.wiki.gg/images/Icon_square_Hello_Kitty.png`;
        }

        document.getElementById('auth-corner').innerHTML = `
            <div class="profile-wrapper">
                <div class="user-profile-btn" onclick="toggleDropdown()" title="Profile Options">
                    <img src="${avatarUrl}" class="user-profile-icon" alt="Profile Icon" onerror="this.src=''; this.style.backgroundColor='#eee';">
                    <span>${username}</span>
                    <span style="font-size: 0.7em; margin-left: 2px;">▼</span>
                </div>
                
                <div class="dropdown-menu" id="profile-dropdown">
                    <a href="customize/" class="dropdown-item">Customize</a>
                    <button class="dropdown-item" onclick="signOut()">Sign Out</button>
                </div>
            </div>
        `;
    }
});

function toggleDropdown() {
    document.getElementById('profile-dropdown').classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.closest('.profile-wrapper')) {
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}

async function signOut() {
    await supabaseClient.auth.signOut();
    window.location.reload();
}

function showCustomAlert(message) {
    document.getElementById('custom-alert-text').innerText = message;
    document.getElementById('custom-alert-modal').style.display = 'flex';
}

const threeStarGifts = {
    "Badtzmaru": "Ultimate Joke Pizza",
    "Chococat": "Interactive History of Chocolate",
    "Hello Kitty": "Red Bow Apple Pie",
    "My Melody": "Pink Clouds Ice Cream",
    "Pochacco": "Pochacco Energy Pop",
    "Tuxedosam": "Designer Island Doll",
    "Keroppi": "Critter Totem",
    "Kuromi": "Pumpkin Spice Soda",
    "Cinnamoroll": "Chocolate Chai",
    "Pekkle": "Mountain Soundtrack",
    "Pompompurin": "Mama's Pudding",
    "Retsuko": "Volcanic Guitar",
    "Hangyodon": "Mermaid Figure",
    "Cogimyun": "Ultimate Wand",
    "Usahana": "Rainbow Dango",
    "Wish me mell": "Rare Candle",
    "My Sweet Piano": "Colorful Lamb Plush",
    "Big Challenges": "The Greatest Challenge",
    "TOPHAT": "The Future of Everything",
    "Kiki": "Starry Skies Shake",
    "Lala": "Quattro Formaggi Pizza",
    "Moppu": "GameBear"
}

const validCharacters = Object.keys(threeStarGifts);

const defaultCharacters = [
    "Hello Kitty", "My Melody", "Chococat", "Tuxedosam",
    "Badtzmaru", "Pochacco", "Keroppi", "Kuromi",
    "Cinnamoroll", "Pekkle", "Pompompurin", "Retsuko",
    "Hangyodon"
];

const materialsData = [
    "Apple", "Banana", "Basic Plush", "Batter", "Beeswax", "Blank Book", "Box Clam", 
    "Bubble", "Cactus Cream", "Cafe Coin", "Calming Crystal", "Candlenut", "Candy Cloud", 
    "Cherry", "Chips", "Chocolate Coin", "Cinna Bloom", "Coconut", "Coral Milk", 
    "Currency Chests", "Decorating Kits", "Dough", "Dragonfruit", "Dye Pouches", "Egg", 
    "Fabric", "Fairy Dust", "Feather", "Fizzy Crystal", "Fizzy Ore", "Fleck", "Flour", 
    "Frost", "Game Ticket", "Gemstones", "Gift Box", "Gizmo", "Glitch", "Glow Berry", 
    "Grapes", "Honeycomb", "Ingot", "Iron", "Jam Jars", "Jemmies", "Kiwi", "Lamb Plush", 
    "Lemon", "Light Stone", "Lime", "Little Challenge", "Lotus Blossom", "Lotus Silk", 
    "Lychee", "Magma Bloom", "Mango", "Materials", "Mechanism", "Moon Cheese", "Moonbeam", 
    "Mushroom", "Noodle Grass", "Obsidian Shard", "Orange", "Paper", "Peach", "Pear", 
    "Pineapple", "Plum", "Pollen Puff", "Pumpkin", "Rainbow Beam", "Rainbow Sprinkles", 
    "Raindrop", "Ribbon", "Rice", "Rice Flour", "Rubber", "Sakura", "Sand Dollar", 
    "Seashell", "Seaweed", "Seaweed Sheet", "Seed", "Shaved Ice", "Shimmersand", "Shiny", 
    "Snowcicle", "Snowdrop", "Spark", "Sparkle", "Spinip", "Stained Glass", "Star", 
    "Stardrop", "Stardust", "Starfish", "Starfruit", "Steamdrop", "Stick", "Strawberry", 
    "Sugarkelp", "Swampmallow", "Tapioca", "Tea Leaves", "Thread", "Toasted Almond", 
    "Tofu", "Trash", "Trophy Pieces", "Whipped Cream", "Woodblock", "Wool", "Worm Tail"
];

const crittersData = [
    "Blue Berryfly", "Castle Crab", "Dragondarter", "Dunebug", "Honey Bandit", "Scruffy Shortleg", 
    "Sunslime", "Bush Friend", "Frost Friend", "Grassy Glowbuddy", "Lily Frog", "Orchid Glowbuddy", 
    "Phantom Flutterby", "Pumpkin Spiceler", "Swampy Snapper", "Barnabeetle", "Crustocean", 
    "Dreamshell Drifter", "Inky Ballooper", "Rainbow Ribbiter", "Sapphire Seapony", "Slugnautica", 
    "Wollypog", "Acactnid", "Frondhawk", "Rockadoodler", "Rosy Duster", "Scarlet Scuttler", 
    "Soaking Slugler", "Stony Slugler", "Sunset Scooter", "Tumblebug", "Twinklebug", "Eruptoad", 
    "Fumefly", "Geyser Grub", "Grubble", "Lady Bean", "Magmiter", "Stampeedle", "Tigersnoot", 
    "Cloudragon", "Stardrake", "Starry Nightwing", "Blubby", "Crabloo", "Penguino", "Woolox", 
    "Blossom Bounder", "Catercreeper", "Flowerfly", "Hearthling", "Mossling", "Comet Hopper", 
    "Cosmouse", "Starlien", "Lovebug", "Citywing()", "Colorpillar()", "Crowbert()", "Dust Bun()", 
    "Squeakle()", "Flider", "Flirb", "Flockadoodler", "Floopy Ballooper", "Flourflap", "Flouster", 
    "Flovern", "Flowl", "Flubby", "Fluffny"
];

const fishData = [
    "Amethyst Snipe", "Armored Bass", "Aurora Beta", "Banded Spelunker", 
    "Blue Grin", "Bog Clamfish", "Bottlefish", "Briny Clamfish", 
    "Burning Perch", "Cavern Clamfish", "Cherryfin", "Citrusfin", 
    "Coastal Clamfish", "Coral Scouter", "Crescent Minnow", "Crystalfin", 
    "Electric Tang", "Floral Flyer", "Flurry Flyer", "Flying Springtail", 
    "Galaxy Grouper", "Geranium Gar", "Golden Loach", "Half-Dipped Dace", 
    "Halfmoon Herring", "Jeweled Goby", "Kelpfin", "Magma Clamfish", 
    "Marbled Mackerel", "Masked Wrassler", "Meadow Stripe", "Midnight Pike", 
    "Moonla", "Mountain Gulper", "Nebula Peeper", "Neon Longtail", 
    "Opal Flutterfin", "Pastel Perch", "Peppermint Tetra", "Petalscale", 
    "Powranha", "Quagfish", "Royal Lance", "Ruby Dreamscale", 
    "Sailing Charmfish", "Sandy Puffler", "Seaweed Skipper", "Shadow Spray", 
    "Shower Springtail", "Slimescale", "Snowdrifter", "Spirit Betta", 
    "Starlight Floater", "Starry Snipe", "Steamy Sunfish", "Summer Sole", 
    "Sunbarb", "Sunset Guppy", "Tinted Tetro", "Tropical Sunfish", 
    "Twilight Eye", "Zebra Swampling"
];

const imageOverrides = {
    "Wish me mell": "WishMeMell",
    "TOPHAT": "Tophat"
};

let saveTimeout = null;

async function saveData() {
    const state = {
        gifts: [],
        tasks: { active: [], completed: [] },
        items: []
    };

    document.querySelectorAll('#gifts-grid .item-card:not(.fade-out)').forEach(card => {
        const name = card.querySelector('.item-name').innerText;
        const isCompleted = card.classList.contains('gift-completed');
        const confirmedSpan = card.querySelector('.confirmed-gift span');
        const inputBox = card.querySelector('.gift-input');
        const giftText = confirmedSpan ? confirmedSpan.innerText : (inputBox ? inputBox.value : "");
        const isLocked = !!confirmedSpan;
        state.gifts.push({ name, isCompleted, giftText, isLocked });
    });

    document.querySelectorAll('#task-list .task-item:not(.fade-out)').forEach(item => {
        state.tasks.active.push(item.querySelector('.task-text').innerText);
    });
    document.querySelectorAll('#completed-list .task-item:not(.fade-out)').forEach(item => {
        state.tasks.completed.push(item.querySelector('.task-text').innerText);
    });

    document.querySelectorAll('#tracker-grid .item-card:not(.fade-out)').forEach(card => {
        const name = card.querySelector('.item-name').innerText;
        const count = parseInt(card.querySelector('.count-input').value) || 0;
        state.items.push({ name, count });
    });

    localStorage.setItem('hkia_companion_save', JSON.stringify(state));

    clearTimeout(saveTimeout);

    saveTimeout = setTimeout(async () => {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            const { error } = await supabaseClient.from('user_saves').upsert({
                user_id: session.user.id,
                save_state: state
            }, { onConflict: 'user_id' });

            if (error) console.error("Cloud Save Error:", error);
            else console.log("saved to cloud");
        }
    }, 500);
}

async function loadData() {
    let state = null;

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        const { data, error } = await supabaseClient
            .from('user_saves')
            .select('save_state')
            .eq('user_id', session.user.id)
            .single();

        if (data && data.save_state) {
            state = data.save_state;
            console.log("loaded from cloud");
        } else {
            const localData = localStorage.getItem('hkia_companion_save');
            if (localData) {
                state = JSON.parse(localData);
                console.log("moved to cloud");
                saveData();
            }
        }
    } else {
        const localData = localStorage.getItem('hkia_companion_save');
        if (localData) {
            state = JSON.parse(localData);
            console.log("loaded from local storage");
        }
    }

    if (state) {
        document.querySelectorAll('.task-item').forEach(el => el.remove());
        document.querySelectorAll('#gifts-grid .item-card').forEach(el => el.remove());
        document.querySelectorAll('#tracker-grid .item-card').forEach(el => el.remove());

        state.gifts.forEach(gift => {
            createGiftCard(gift.name, gift.isCompleted, gift.giftText, gift.isLocked || false, false);
        });

        state.tasks.active.forEach(text => createExistingTask(text, false));
        state.tasks.completed.forEach(text => createExistingTask(text, true));

        state.items.forEach(item => {
            createItemCard(item.name, item.count, false);
        });
    } else {
        // First time ever opening the app!
        defaultCharacters.forEach(char => createGiftCard(char, false, "", false, false));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadData();
});

function showTab(tabId) {
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openCharModal() {
    document.getElementById('new-char-input').value = '';
    document.getElementById('char-modal').style.display = 'flex';
    document.getElementById('new-char-input').focus();
}

document.getElementById('new-char-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') submitNewCharacter();
});

function submitNewCharacter() {
    const inputName = document.getElementById('new-char-input').value.trim();
    const matchedChar = validCharacters.find(char => char.toLowerCase() === inputName.toLowerCase());
    
    if (matchedChar) {
        const success = createGiftCard(matchedChar, false, "", false, true);
        if (success) {
            closeModal('char-modal');
            document.getElementById('new-char-input').value = '';
        }
    } else if (inputName !== "") {
        showCustomAlert(`Oops! Character "${inputName}" not found.`);
    }
}

function createGiftCard(characterName, isCompleted = false, savedGiftText = "", isLocked = false, isManualAdd = true) {
    const existingChars = Array.from(document.querySelectorAll('#gifts-grid .item-name')).map(el => el.innerText.toLowerCase());
    
    if (existingChars.includes(characterName.toLowerCase())) {
        if (isManualAdd) {
            showCustomAlert(`${characterName} is already on your gift list!`);
        }
        return false;
    }

    const grid = document.getElementById('gifts-grid');
    const addBtn = document.getElementById('add-char-btn');

    const card = document.createElement('div');
    card.className = 'item-card';

    if (isCompleted) card.classList.add('gift-completed');

    const topBar = document.createElement('div');
    topBar.className = 'card-top-bar';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.onchange = function() {
        if(this.checked) {
            card.classList.add('gift-completed');
        } else {
            card.classList.remove('gift-completed');
        }
        saveData();
    };

    topBar.appendChild(checkbox);

    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    const icon = document.createElement('img');
    icon.className = 'item-icon';
    
    let urlName = imageOverrides[characterName] || characterName.replace(/ /g, '_').replace(/-/g, '');
    icon.src = `https://hellokittyislandadventure.wiki.gg/images/Icon_square_${urlName}.png`;
    icon.alt = characterName;
    icon.onerror = function() {
        this.onerror = null;
        this.src = '';
        this.style.backgroundColor = '#eee';
        this.style.borderRadius = '50%';
    };

    const checkmark = document.createElement('div');
    checkmark.className = 'checkmark-overlay';
    checkmark.innerHTML = '✓';

    imgContainer.appendChild(icon);
    imgContainer.appendChild(checkmark);

    const title = document.createElement('p');
    title.className = 'item-name';
    title.innerText = characterName;

    const inputContainer = document.createElement('div');
    inputContainer.className = 'gift-input-container';

    const expectedGift = threeStarGifts[characterName];
    
    if (expectedGift && savedGiftText.trim().toLowerCase() === expectedGift.toLowerCase()) {
        buildLockedGiftUI(inputContainer, expectedGift, characterName, true);
    } else if (isLocked && savedGiftText.trim() !== "") {
        buildLockedGiftUI(inputContainer, savedGiftText, characterName, false);
    } else {
        buildInputUI(inputContainer, characterName, savedGiftText);
    }

    card.appendChild(topBar);
    card.appendChild(imgContainer);
    card.appendChild(title);
    card.appendChild(inputContainer);

    grid.insertBefore(card, addBtn);
    saveData(); 
    
    return true;
}

function buildInputUI(container, characterName, initialValue) {
    container.innerHTML = '';
    
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.width = '100%';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '5px';

    const giftInput = document.createElement('input');
    giftInput.type = 'text';
    giftInput.className = 'gift-input';
    giftInput.placeholder = 'Gift...';
    giftInput.value = initialValue;

    const lockBtn = document.createElement('button');
    lockBtn.innerHTML = '✔';
    lockBtn.className = 'btn-primary mini-confirm';
    lockBtn.title = "Lock in custom gift";

    lockBtn.onclick = () => {
        const val = giftInput.value.trim();
        if (val !== "") {
            const expected = threeStarGifts[characterName];
            const is3Star = expected && val.toLowerCase() === expected.toLowerCase();
            buildLockedGiftUI(container, is3Star ? expected : val, characterName, is3Star);
        }
    };

    giftInput.addEventListener('input', function() {
        saveData(); 
        const expectedGift = threeStarGifts[characterName];
        if (expectedGift && this.value.trim().toLowerCase() === expectedGift.toLowerCase()) {
            buildLockedGiftUI(container, expectedGift, characterName, true);
        }
    });

    giftInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') lockBtn.click();
    });

    wrapper.appendChild(giftInput);
    wrapper.appendChild(lockBtn);
    container.appendChild(wrapper);
}

function buildLockedGiftUI(container, giftName, characterName, isThreeStar) {
    container.innerHTML = ''; 
    
    const confirmedDiv = document.createElement('div');
    confirmedDiv.className = 'confirmed-gift';
    
    const giftIcon = document.createElement('img');
    let cleanGiftName = giftName.replace(/\(.*\)/g, '').trim();
    let formattedGift = cleanGiftName.replace(/ /g, '_');
    giftIcon.src = `https://hellokittyislandadventure.wiki.gg/images/${formattedGift}.png`;
    
    giftIcon.onerror = function() { this.style.display = 'none'; };

    const textSpan = document.createElement('span');
    textSpan.innerText = giftName;
    textSpan.style.lineHeight = "1.1";

    confirmedDiv.appendChild(giftIcon);
    confirmedDiv.appendChild(textSpan);
    
    if (!isThreeStar) {
        const pencilBtn = document.createElement('button');
        pencilBtn.className = 'edit-btn';
        pencilBtn.innerHTML = '✏️';
        pencilBtn.style.padding = '0';
        pencilBtn.style.fontSize = '0.9em';
        pencilBtn.style.marginLeft = '4px';
        pencilBtn.onclick = (e) => {
            e.stopPropagation();
            buildInputUI(container, characterName, giftName);
            saveData();
        };
        confirmedDiv.appendChild(pencilBtn);
    } else {
        confirmedDiv.style.cursor = 'default';
    }

    container.appendChild(confirmedDiv);
    saveData();
}

let currentSearchTab = 'materials';

function openItemSearchModal() {
    document.getElementById('item-search-modal').style.display = 'flex';
    document.getElementById('item-search-input').value = '';
    
    currentSearchTab = 'materials';
    document.getElementById('tab-materials').classList.add('active-subtab');
    document.getElementById('tab-critters').classList.remove('active-subtab');
    
    document.getElementById('search-results-container').innerHTML = '';
    
    document.getElementById('item-search-input').focus();
}

function switchSearchTab(tab) {
    currentSearchTab = tab;
    document.getElementById('tab-materials').classList.toggle('active-subtab', tab === 'materials');
    document.getElementById('tab-critters').classList.toggle('active-subtab', tab === 'critters');
    document.getElementById('tab-fish').classList.toggle('active-subtab', tab === 'fish');
    
    document.getElementById('search-results-container').innerHTML = '';
    document.getElementById('item-search-input').value = '';
    document.getElementById('item-search-input').focus();
}

function performSearch() {
    const query = document.getElementById('item-search-input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results-container');
    resultsContainer.innerHTML = '';

    if (query === '') return; 

    let sourceList;
    if (currentSearchTab === 'materials') sourceList = materialsData;
    else if (currentSearchTab === 'critters') sourceList = crittersData;
    else sourceList = fishData;

    let filteredResults = sourceList.filter(item => item.toLowerCase().includes(query));

    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = '<p style="grid-column: 1 / -1; color: #aaa; width: 100%; text-align: center; margin-top: 20px;">No items found! ✨</p>';
        return;
    }

    filteredResults.forEach(item => {
        const card = document.createElement('div');
        card.className = 'search-result-card';
        
        const title = document.createElement('p');
        title.innerText = item;
        
        const img = document.createElement('img');
        let cleanItemName = item.replace(/\(.*\)/g, '').trim(); 
        let formattedName = cleanItemName.replace(/ /g, '_');
        img.src = `https://hellokittyislandadventure.wiki.gg/images/${formattedName}.png`;
        
        img.onerror = function() { 
            this.src = ''; 
            this.style.backgroundColor = '#eee'; 
            this.style.borderRadius = '50%';
        };

        const chooseBtn = document.createElement('button');
        chooseBtn.className = 'btn-primary choose-btn';
        chooseBtn.innerText = 'Choose';
        chooseBtn.onclick = () => {
            createItemCard(item);
            closeModal('item-search-modal');
        };

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(chooseBtn);
        resultsContainer.appendChild(card);
    });
}

function createItemCard(itemName, initialCount = 0, isManualAdd = true) {
    const existingItems = Array.from(document.querySelectorAll('#tracker-grid .item-name')).map(el => el.innerText);
    if (existingItems.includes(itemName)) {
        if (isManualAdd) {
            showCustomAlert(`You are already tracking ${itemName}!`);
        }
        return false;
    }

    const grid = document.getElementById('tracker-grid');
    const addBtn = document.getElementById('add-item-btn');

    const card = document.createElement('div');
    card.className = 'item-card';

    const topBar = document.createElement('div');
    topBar.className = 'card-top-bar';
    topBar.style.justifyContent = 'flex-end'; 

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.onclick = () => {
        card.classList.add('fade-out');
        setTimeout(() => {
            card.remove();
            saveData(); 
        }, 290); 
    };
    topBar.appendChild(deleteBtn);

    const icon = document.createElement('img');
    icon.className = 'item-icon';
    icon.style.width = '70px';
    icon.style.height = '70px';
    
    let cleanItemName = itemName.replace(/\(.*\)/g, '').trim(); 
    let formattedName = cleanItemName.replace(/ /g, '_');
    icon.src = `https://hellokittyislandadventure.wiki.gg/images/${formattedName}.png`;
    icon.alt = itemName;
    
    icon.onerror = function() {
        this.onerror = null;
        this.src = '';
        this.style.backgroundColor = '#eee';
        this.style.borderRadius = '50%';
    };

    const title = document.createElement('p');
    title.className = 'item-name';
    title.innerText = itemName;

    const counter = document.createElement('div');
    counter.className = 'counter';

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'count-input';
    input.value = initialCount;
    input.min = 0;
    input.onchange = saveData; 

    const leftArrow = document.createElement('button');
    leftArrow.className = 'arrow-btn';
    leftArrow.innerHTML = '◀'; 
    leftArrow.onclick = () => {
        let val = parseInt(input.value) || 0;
        if (val > 0) input.value = val - 1;
        saveData();
    };

    const rightArrow = document.createElement('button');
    rightArrow.className = 'arrow-btn';
    rightArrow.innerHTML = '▶';
    rightArrow.onclick = () => {
        let val = parseInt(input.value) || 0;
        input.value = val + 1;
        saveData();
    };

    counter.appendChild(leftArrow);
    counter.appendChild(input);
    counter.appendChild(rightArrow);

    card.appendChild(topBar); 
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(counter);

    grid.insertBefore(card, addBtn);
    saveData(); 
    
    return true;
}

function openTaskInput() {
    document.getElementById('add-task-btn').style.display = 'none';
    document.getElementById('task-input-area').style.display = 'flex';
    document.getElementById('new-task-input').focus();
}

function submitNewTask() {
    const inputField = document.getElementById('new-task-input');
    const taskText = inputField.value.trim();

    if (taskText !== "") {
        createExistingTask(taskText, false);
    }

    inputField.value = '';
    document.getElementById('task-input-area').style.display = 'none';
    document.getElementById('add-task-btn').style.display = 'flex';
}

document.getElementById('new-task-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') submitNewTask();
});

function uncheckAllGifts() {
    const completedGifts = document.querySelectorAll('#gifts-grid .item-card.gift-completed');
    
    completedGifts.forEach(card => {
        card.classList.remove('gift-completed');
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = false;
        }
    });
    
    saveData();
}

function createExistingTask(taskText, isCompleted) {
    const taskList = document.getElementById('task-list');
    const completedList = document.getElementById('completed-list');
    
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.innerText = taskText;
    if (isCompleted) textSpan.classList.add('completed-text');

    checkbox.onchange = function() {
        taskItem.classList.add('fade-out');
        setTimeout(() => {
            taskItem.classList.remove('fade-out');
            if(this.checked) {
                textSpan.classList.add('completed-text');
                completedList.appendChild(taskItem);
            } else {
                textSpan.classList.remove('completed-text');
                taskList.appendChild(taskItem);
            }
            saveData(); 
        }, 290); 
    };

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '✏️';

    editBtn.onclick = () => {
        if (checkbox.checked) return; 

        if (editBtn.innerHTML === '✏️') {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = textSpan.innerText;
            editInput.className = 'task-edit-input';
            
            taskItem.insertBefore(editInput, textSpan);
            taskItem.removeChild(textSpan);
            editInput.focus();
            
            editBtn.innerHTML = '💾';
            
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') saveEdit();
            });

            function saveEdit() {
                const newText = editInput.value.trim();
                if (newText) textSpan.innerText = newText;
                taskItem.insertBefore(textSpan, editInput);
                taskItem.removeChild(editInput);
                editBtn.innerHTML = '✏️';
                saveData(); 
            }
            editBtn.onclick = saveEdit;
        }
    };

    const trashBtn = document.createElement('button');
    trashBtn.className = 'edit-btn';
    trashBtn.innerHTML = '🗑️';
    trashBtn.onclick = () => {
        taskItem.classList.add('fade-out');
        setTimeout(() => {
            taskItem.remove();
            saveData(); 
        }, 290);
    };
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(textSpan);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(trashBtn);
    
    if (isCompleted) {
        completedList.appendChild(taskItem);
    } else {
        taskList.appendChild(taskItem);
    }
    
    saveData(); 
}

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('.item-card, .task-item');
    if (target && !target.classList.contains('add-box') && !target.draggable) {
        if (!target.querySelector('input[type="text"]:focus')) {
            target.draggable = true;
        }
    }
});

document.addEventListener('mousedown', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const parent = e.target.closest('.item-card, .task-item');
        if (parent) parent.draggable = false;
    }
});

let draggedEl = null;

document.addEventListener('dragstart', (e) => {
    const target = e.target.closest('.item-card, .task-item');
    if (target && !target.classList.contains('add-box')) {
        draggedEl = target;
        setTimeout(() => target.classList.add('dragging'), 0);
    }
});

document.addEventListener('dragend', (e) => {
    if (draggedEl) {
        draggedEl.classList.remove('dragging');
        
        const container = draggedEl.parentElement;
        if (container.classList.contains('item-grid')) {
            const addBtn = container.querySelector('.add-box');
            if (addBtn) container.appendChild(addBtn);
        }
        
        draggedEl = null;
        saveData();
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!draggedEl) return;

    const container = draggedEl.parentElement;
    const target = e.target.closest('.item-card, .task-item');

    if (target && target !== draggedEl && target.parentElement === container) {
        if (target.classList.contains('add-box')) return;

        const rect = target.getBoundingClientRect();
        const isGrid = container.classList.contains('item-grid');
        let insertBeforeTarget = false;

        if (isGrid) {
            const midX = rect.left + rect.width / 2;
            insertBeforeTarget = e.clientX < midX;
        } else {
            const midY = rect.top + rect.height / 2;
            insertBeforeTarget = e.clientY < midY;
        }

        if (insertBeforeTarget) {
            container.insertBefore(draggedEl, target);
        } else {
            container.insertBefore(draggedEl, target.nextSibling);
        }
    }
});