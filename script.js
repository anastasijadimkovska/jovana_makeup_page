document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const appointmentSection = document.getElementById('appointmentSection');
    const calendlyPopup = document.getElementById('calendlyPopup');
    const portfolioSection = document.getElementById('portfolioSection');
    const portfolioModal = document.getElementById('portfolioModal');
    const closeBtns = document.querySelectorAll('.close');
    const images = document.querySelectorAll('.portfolio-item');
    const closeCalendly = document.getElementById('closeCalendly');
  
    // 🔁 Reusable modal toggle function
    function toggleModal(modal, isOpen) {
      modal.classList.toggle('hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  
    // 🖱️ Click triggers
    if (appointmentSection && calendlyPopup) {
      appointmentSection.addEventListener('click', () => toggleModal(calendlyPopup, true));
    }
  
    if (portfolioSection && portfolioModal) {
      portfolioSection.addEventListener('click', () => toggleModal(portfolioModal, true));
    }
  
    // ❌ Close buttons
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleModal(btn.closest('.modal-content').parentNode, false);
      });
    });
  
    // ❌ Special closeCalendly using same toggle
    if (closeCalendly && calendlyPopup) {
      closeCalendly.addEventListener('click', () => toggleModal(calendlyPopup, false));
    }
  
    // 🧱 Click outside modal closes it
    window.addEventListener('click', function (event) {
      if (calendlyPopup && !calendlyPopup.classList.contains('hidden') &&
          event.target === calendlyPopup) {
        toggleModal(calendlyPopup, false);
      }
      if (portfolioModal && !portfolioModal.classList.contains('hidden') &&
          event.target === portfolioModal) {
        toggleModal(portfolioModal, false);
      }
    });
  
    // 💡 Lightbox image click
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
          img.src = image.src;
        });
      });
  
      lightbox.addEventListener('click', e => {
        if (e.target !== img) {
          lightbox.style.display = 'none';
        }
      });
    }
  });
  