import { supabase } from './supabase.js';

// ログアウトボタンのクリックイベントにリスナーを追加
document.getElementById('logout-btn').addEventListener('click', async () => {
    // Supabaseを使ってログアウト処理を実行
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('ログアウトに失敗しました:', error.message);
    } else {
        window.location.href = '/login';
    }
});

// 投票リセットボタンのクリックイベントにリスナーを追加
document.getElementById('vote-reset-btn').addEventListener('click', () => {
    window.location.href = '/vote-reset';
});