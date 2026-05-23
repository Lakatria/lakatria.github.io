const SUPABASE_URL = 'https://lthfrmaeialtaxtzunai.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aGZybWFlaWFsdGF4dHp1bmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjU2ODQsImV4cCI6MjA5MTI0MTY4NH0.Zmrq5YDyKL5PAstPDKt1tA0O4s6SSmFqx17mu5SphKA';
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const messageEl = document.getElementById('message');

    window.addEventListener('DOMContentLoaded', async () => {
        if (window.location.hash && window.location.hash.includes('type=recovery')) {
            toggleView('update');
            return;
        }
        
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            window.location.href = "../";
        }
    });

    function toggleView(view) {
        messageEl.innerText = "";
        messageEl.style.color = "#ff4d88";

        document.getElementById('signin-view').classList.add('hidden');
        document.getElementById('signup-view').classList.add('hidden');
        document.getElementById('forgot-view').classList.add('hidden');
        document.getElementById('update-view').classList.add('hidden');

        if (view === 'signup') {
            document.getElementById('signup-view').classList.remove('hidden');
            document.getElementById('form-subtitle').innerText = "Join the island!";
        } else if (view === 'forgot') {
            document.getElementById('forgot-view').classList.remove('hidden');
            document.getElementById('form-subtitle').innerText = "Let's get your account back!";
        } else if (view === 'update') {
            document.getElementById('update-view').classList.remove('hidden');
            document.getElementById('form-subtitle').innerText = "Enter your new password.";
        } else {
            document.getElementById('signin-view').classList.remove('hidden');
            document.getElementById('form-subtitle').innerText = "Sign in to save your progress!";
        }
    }
    

    async function handleSignUp() {
        try {
            const username = document.getElementById('signup-username').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;

            if (!username || !email || !password) {
                messageEl.innerText = "Please fill out all fields!";
                return;
            }
            if (password !== confirmPassword) {
                messageEl.innerText = "Passwords do not match!";
                return;
            }
            if (password.length < 6) {
                messageEl.innerText = "Password must be at least 6 characters!";
                return;
            }

            messageEl.style.color = "#555";
            messageEl.innerText = "Creating account...";

            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username
                    }
                }
            });

            if (error) {
                messageEl.style.color = "#ff4d88";
                messageEl.innerText = "Error: " + error.message;
                console.error("Supabase Error:", error);
            } else {
                messageEl.style.color = "green";
                messageEl.innerText = "Welcome! Redirecting...";
                setTimeout(() => { window.location.href = "../customize/"; }, 1500);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            messageEl.style.color = "#ff4d88";
            messageEl.innerText = "Something went wrong! Check the console.";
        }
    }

    async function handleSignIn() {
        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;

        if (!email || !password) {
            messageEl.innerText = "Please enter email and password!";
            return;
        }

        messageEl.style.color = "#555";
        messageEl.innerText = "Signing in...";

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            messageEl.style.color = "#ff4d88";
            messageEl.innerText = error.message;
        } else {
            messageEl.style.color = "green";
            messageEl.innerText = "Success! Redirecting...";
            setTimeout(() => { window.location.href = "../"; }, 1000);
        }
    }

    async function signInWithOAuth(provider) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: new URL('../', window.location.href).href 
            }
        });
        
        if (error) {
            messageEl.style.color = "#ff4d88";
            messageEl.innerText = error.message;
        }
    }

    async function sendResetLink() {
        const email = document.getElementById('forgot-email').value.trim();
        if (!email) {
            messageEl.innerText = "Please enter your email!";
            return;
        }

        messageEl.style.color = "#555";
        messageEl.innerText = "Sending link...";

        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + window.location.pathname
        });

        if (error) {
            messageEl.style.color = "#ff4d88";
            messageEl.innerText = error.message;
        } else {
            messageEl.style.color = "green";
            messageEl.innerText = "Check your email for the reset link! 💌";
        }
    }

    async function updatePassword() {
        const newPassword = document.getElementById('new-password').value;
        
        if (newPassword.length < 6) {
            messageEl.innerText = "Password must be at least 6 characters!";
            return;
        }

        messageEl.style.color = "#555";
        messageEl.innerText = "Updating password...";

        const { data, error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });

        if (error) {
            messageEl.style.color = "#ff4d88";
            messageEl.innerText = error.message;
        } else {
            messageEl.style.color = "green";
            messageEl.innerText = "Password updated! Redirecting...";
            setTimeout(() => { window.location.href = "index"; }, 1500);
        }
    }