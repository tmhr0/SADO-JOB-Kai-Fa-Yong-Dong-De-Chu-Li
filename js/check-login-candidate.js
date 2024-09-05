import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loginButton = document.querySelector('.blue-btn');

    // 投票ボタンをクリックした際の処理
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault(); // デフォルトのリンク動作を防ぐ

        // ログイン状態を再確認
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            // 非ログイン状態ならログインページへリダイレクト
            window.location.href = '/login/index.html';
        } else {
            // ログイン済みなら候補者IDをURLに追加して投票ページに遷移
            const candidateId = new URLSearchParams(window.location.search).get('id');  // 'id' で取得

            // 候補者IDがある場合のみ投票ページに遷移
            if (candidateId) {
                window.location.href = `/vote/index.html?candidate=${candidateId}`;
            }
        }
    });
});