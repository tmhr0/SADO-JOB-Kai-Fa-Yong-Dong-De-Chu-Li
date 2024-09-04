import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const voteResultLink = document.querySelector('a[href="/vote/result.html"]');

  const { data: users, error: usersError } = await supabase
      .from('user')
      .select('id');

  if (usersError) {
      console.error('ユーザーの取得に失敗しました:', usersError);
      return;
  }

  // 各ユーザーの投票状況をチェック
  const { data: voteRecords, error: voteRecordsError } = await supabase
      .from('vote-record')
      .select('user_id');

  if (voteRecordsError) {
      console.error('投票記録の取得に失敗しました:', voteRecordsError);
      return;
  }

  const allUsersVoted = users.every(user => 
    voteRecords.some(voteRecord => voteRecord.user_id === user.id)
  );
  if (allUsersVoted) {
        voteResultLink.classList.remove('disabled');
      }
  });