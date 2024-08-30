import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loginButton = document.querySelector('.btn-screen');

    // 非ログイン状態の場合、ログインボタンを表示
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      loginButton.classList.remove('hidden');
    }
});