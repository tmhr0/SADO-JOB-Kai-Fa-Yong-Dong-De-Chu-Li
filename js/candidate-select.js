document.addEventListener('cardsGenerated', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('candidate');

    if (candidateId) {
        const radioButton = document.getElementById(`candidate-${candidateId}`);
        if (radioButton) {
            radioButton.checked = true;
            const candidateCard = radioButton.closest('.candidate-card');
            if (candidateCard) {
                candidateCard.classList.add('selected');
            }
        } else {
            console.error("Radio button for candidate not found");
        }
    } else {
        console.error("Candidate ID not found in URL");
    }

    // カードクリック時に選択状態を切り替える
    const candidateCards = document.querySelectorAll('.candidate-card');
    candidateCards.forEach(card => {
        card.addEventListener('click', function() {
            candidateCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});