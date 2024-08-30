import { supabase } from './supabase.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert('正しいメールアドレスとパスワードを入力してください: ' + error.message);
    } else {
        const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/vote';
        window.location.href = redirectUrl;
    }
});