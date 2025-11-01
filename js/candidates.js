document.addEventListener('DOMContentLoaded', function() {
    const candidateCards = document.querySelectorAll('.candidate-card');
    let flipped = false;

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.2;

        candidateCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                if (!flipped) {
                    card.classList.add('flipped');
                }
            } else {
                card.classList.remove('flipped');
                flipped = false;
            }
        });
    }

    // Initial check
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});