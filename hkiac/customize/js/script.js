const SUPABASE_URL = 'https://lthfrmaeialtaxtzunai.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aGZybWFlaWFsdGF4dHp1bmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjU2ODQsImV4cCI6MjA5MTI0MTY4NH0.Zmrq5YDyKL5PAstPDKt1tA0O4s6SSmFqx17mu5SphKA';
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const defaultCharacters = [
        "Hello Kitty", "My Melody", "Chococat", "Tuxedosam",
        "Badtzmaru", "Pochacco", "Keroppi", "Kuromi",
        "Cinnamoroll", "Pekkle", "Pompompurin", "Retsuko",
        "Hangyodon"
    ];

    let selectedAvatar = "Hello Kitty";

    function getImageUrl(charName) {
        let formattedName = charName.replace(/ /g, '_').replace(/-/g, '');
        return `https://hellokittyislandadventure.wiki.gg/images/Icon_square_${formattedName}.png`;
    }

    window.addEventListener('DOMContentLoaded', async () => {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (!session) {
            window.location.href = "../login/index.html";
            return;
        }

        const metadata = session.user.user_metadata;
        
        const username = metadata.username || metadata.full_name || metadata.name || "Islander";
        document.getElementById('preview-name').value = username;

        if (metadata.avatar) {
            selectedAvatar = metadata.avatar;
        } else if (metadata.avatar_url || metadata.picture) {
            selectedAvatar = metadata.avatar_url || metadata.picture;
        } else {
            selectedAvatar = "Hello Kitty";
        }

        renderIconGrid();
        updatePreview(selectedAvatar);
    });

    function renderIconGrid() {
        const grid = document.getElementById('icon-grid');
        grid.innerHTML = '';

        defaultCharacters.forEach(char => {
            const img = document.createElement('img');
            img.src = getImageUrl(char);
            img.className = 'icon-option';
            img.alt = char;
            img.title = char;

            if (char === selectedAvatar) img.classList.add('selected');

            img.onclick = () => {
                selectedAvatar = char;
                updatePreview(char);
                document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('selected', 'camera-btn'));
                img.classList.add('selected');
            };

            img.onerror = function() { this.src = ''; this.style.backgroundColor = '#eee'; };
            grid.appendChild(img);
        });

        const cameraBtn = document.createElement('div');
        cameraBtn.className = 'icon-option camera-btn';
        cameraBtn.innerHTML = '📷';
        cameraBtn.onclick = () => {
            document.getElementById('custom-image-modal').style.display = 'flex';
        };
        grid.appendChild(cameraBtn);
    }

    function updatePreview(val) {
        if (val.startsWith('http') || val.startsWith('data:image')) {
            document.getElementById('preview-image').src = val;
        } else {
            document.getElementById('preview-image').src = getImageUrl(val);
        }
    }

    async function saveCustomization() {
        const messageEl = document.getElementById('message');
        messageEl.style.color = "#555";
        messageEl.innerText = "Saving your profile...";

        const newUsername = document.getElementById('preview-name').value.trim() || "Islander";

        const { data, error } = await supabaseClient.auth.updateUser({
            data: { 
                avatar: selectedAvatar,
                username: newUsername
            }
        });

        if (error) {
            messageEl.style.color = "#ff4d88";
            messageEl.innerText = "Error saving profile: " + error.message;
            console.error("Supabase Error:", error);
        } else {
            messageEl.style.color = "green";
            messageEl.innerText = "Looking cute! Redirecting...";
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);
        }
    }
    
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    function handleUrlUpload() {
        const url = document.getElementById('image-url-input').value.trim();
        if (url) {
            selectedAvatar = url;
            updatePreview(url);
            
            document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('selected'));
            closeModal('custom-image-modal');
            document.getElementById('image-url-input').value = '';
        }
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 150;
                canvas.height = 150;
                
                const size = Math.min(img.width, img.height);
                const startX = (img.width - size) / 2;
                const startY = (img.height - size) / 2;
                
                ctx.drawImage(img, startX, startY, size, size, 0, 0, 150, 150);
                
                const tinyImage = canvas.toDataURL('image/jpeg', 0.8);
                
                selectedAvatar = tinyImage;
                updatePreview(tinyImage);
                
                document.querySelectorAll('.icon-option').forEach(el => el.classList.remove('selected'));
                closeModal('custom-image-modal');
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }