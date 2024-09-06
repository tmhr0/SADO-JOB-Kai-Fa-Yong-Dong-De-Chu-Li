import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    // URLパラメータから候補者IDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('id');

    if (!candidateId) {
        alert('候補者IDが指定されていません。');
        window.location.href = '/candidate/index.html';
        return;
    }

    // Supabaseから候補者情報を取得
    const { data: candidate, error } = await supabase
        .from('candidate')
        .select('*')
        .eq('id', candidateId)
        .single();

    if (error) {
        console.error('候補者情報の取得に失敗しました:', error);
        alert('候補者情報の取得に失敗しました。');
        return;
    }

    // 性別の表示を設定
    const genderDisplay = candidate.gender == 0 ? '男性' : '女性';

    // ページに候補者情報を挿入
    const detailContainer = document.getElementById('candidate-detail');
    detailContainer.innerHTML = `
        <div class="candidate-photo-container">
            <img src href="/vote-system/image/candidate/candidate_0${candidate.id}.jpg" alt="${candidate.name}" class="candidate-photo">
        </div>
        <div class="candidate-info">
            <div class="candidate-attribute__title">
                <h2>${candidate.name}</h2>
                <p class="candidate-attribute__subtitle">${candidate.age}歳(${genderDisplay})</p>
                <p class="carrer">${candidate.career}</p>
            </div>
            <h3>Policies</h3>
            <p>${candidate.policies}</p>
            <h3>Vision</h3>
             <p>${candidate.vision}</p>
            <h3>Get in Touch</h3>
             <div class="social-links">
                 <div class="social-link">
                     <a href="#"><img src href="/vote-system/image/candidate-detail/twitter-icon.svg" alt="Twitter"></a>
                     <p>Twitter</p>
                 </div>
                 <div class="social-link">
                      <a href="#"><img src href="/vote-system/image/candidate-detail/facebook-icon.svg" alt="Facebook"></a>
                      <p>Facebook</p>
                  </div>
                  <div class="social-link">
                       <a href="#"><img src href="/vote-system/image/candidate-detail/instagram-icon.svg" alt="Instagram"></a>
                       <p>Instagram</p>
                   </div>
             </div>
　　 　　         <h3>Video</h3>
 　　　　         <div class="video-container"></div>
              
        </div>
    `;

    // 候補者のビデオ情報を挿入
    const videoContainer = document.querySelector('.video-container');
    if (candidate.video_url) {
        const iframeElement = document.createElement('iframe');
        iframeElement.width = '400';
        iframeElement.height = '300';
        iframeElement.src = candidate.video_url.trim();
        iframeElement.frameBorder = '0';
        iframeElement.allowFullscreen = true;

        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper');
        videoWrapper.appendChild(iframeElement);

        videoContainer.appendChild(videoWrapper);
    } else {
        videoContainer.textContent = 'ビデオがありません';
    }
});