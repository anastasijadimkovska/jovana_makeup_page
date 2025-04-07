document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const appointmentSection = document.getElementById('appointmentSection');
    const calendlyPopup = document.getElementById('calendlyPopup');
    const portfolioSection = document.getElementById('portfolioSection');
    const portfolioModal = document.getElementById('portfolioModal');
    const closeBtns = document.querySelectorAll('.close'); // This selects all close buttons
    const images = document.querySelectorAll('.portfolio-item');

    // Function to toggle modals
    function toggleModal(modal, isOpen) {
        modal.classList.toggle('hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }

    // Add event listeners to modal sections to open modals
    if (appointmentSection && calendlyPopup) {
        appointmentSection.addEventListener('click', () => toggleModal(calendlyPopup, true));
    }

    if (portfolioSection && portfolioModal) {
        portfolioSection.addEventListener('click', () => toggleModal(portfolioModal, true));
    }

    // Close modals on clicking the close button or outside the modal content
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleModal(btn.closest('.modal-content').parentNode, false));
    });

    // Handle clicking outside the modals
    window.addEventListener('click', function(event) {
        if (calendlyPopup && !calendlyPopup.hidden && !calendlyPopup.contains(event.target) && event.target !== appointmentSection) {
            toggleModal(calendlyPopup, false);
        }
        if (portfolioModal && !portfolioModal.hidden && event.target === portfolioModal) {
            toggleModal(portfolioModal, false);
        }
    });

    // Optional: Lightbox functionality for portfolio images
    if (images.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);

        const img = document.createElement('img');
        lightbox.appendChild(img);

        images.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                img.src = image.src; // Display the clicked image in a lightbox
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target !== img) {
                lightbox.style.display = 'none'; // Close the lightbox when clicking outside the image
            }
        });
    }
});
