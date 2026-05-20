const supabaseUrl = 'https://lthfrmaeialtaxtzunai.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aGZybWFlaWFsdGF4dHp1bmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjU2ODQsImV4cCI6MjA5MTI0MTY4NH0.Zmrq5YDyKL5PAstPDKt1tA0O4s6SSmFqx17mu5SphKA';
    
    let changelogClient = null;

    async function fetchChangelog() {
        const listContainer = document.getElementById('changelog-list');
        const loadingMsg = document.getElementById('loading-msg');
        
        try {
            if (!window.supabase) {
                throw new Error("Supabase library failed to load.");
            }

            changelogClient = window.supabase.createClient(supabaseUrl, supabaseKey);

            const { data, error } = await changelogClient
                .from('changelog')
                .select('*')
                .order('release_date', { ascending: false });

            if (error) throw error;
            
                loadingMsg.style.display = 'none';

                if (data.length === 0) {
                    listContainer.innerHTML = '<p style="color: #aaa;">No updates yet!</p>';
                    return;
                }

                data.forEach((entry, index) => {
            const card = document.createElement('div');
            card.className = 'log-card';
            card.style.animationDelay = `${index * 0.1}s`; 

            const dateObj = new Date(entry.release_date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric', 
                timeZone: 'UTC' 
            });

            card.innerHTML = `
                <div class="log-header">
                    <span class="version-badge">v${entry.version}</span>
                    <span class="date-text">${formattedDate}</span>
                </div>
                
                <div class="log-content">${entry.description || ''}</div>
                
                <div class="log-divider"></div>
                
                <div class="log-content" style="font-weight: bold; color: var(--pink-main); margin-bottom: 10px;">Changes:</div>
                <div class="log-content">${entry.changes}</div>
            `;

            listContainer.appendChild(card);
        });

            } catch (err) {
                console.error("Error fetching changelog:", err);
                loadingMsg.innerText = "Oops! Couldn't load updates.";
                loadingMsg.style.color = "#ff4d88";
                loadingMsg.style.animation = "none";
            }
        }

        window.addEventListener('DOMContentLoaded', fetchChangelog);