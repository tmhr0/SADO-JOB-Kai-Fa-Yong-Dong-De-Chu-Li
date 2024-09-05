import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loginButton = document.querySelector('.blue-btn');

  // ログイン状態を確認
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
      // 非ログイン状態の場合、ログインボタンを表示
      loginButton.classList.remove('btn-hidden');
  }

  const linksToCheck = [
  { id: 'vote-link', href: '/vote' },
  { id: 'confirm-vote-btn', href: '/vote' },
 ];

 linksToCheck.forEach(linkData => {
  const linkElement = document.getElementById(linkData.id);

  if (linkElement) {
   linkElement.addEventListener('click', async (event) => {
    event.preventDefault(); // デフォルトのリンク動作を防ぐ

    // ログイン状態をチェック
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
     // 非ログイン状態なら、ログインページへリダイレクト
      window.location.href = '/login/index.html';

    } else {
     // ログイン済みなら指定のページへ遷移
     window.location.href = linkData.href;
    }
   });
  }
 });
});