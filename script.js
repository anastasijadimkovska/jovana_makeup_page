document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const appointmentSection = document.getElementById('appointmentSection');
  const calendlyPopup = document.getElementById('calendlyPopup');
  const portfolioSection = document.getElementById('portfolioSection');
  const portfolioModal = document.getElementById('portfolioModal');
  const closeBtns = document.querySelectorAll('.close');
  const closeCalendly = document.getElementById('closeCalendly');

  // 🔁 Reusable modal toggle function
  function toggleModal(modal, isOpen) {
    if (isOpen) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
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

  // 🎯 Load portfolio images from Google Drive
  fetch('https://script.google.com/macros/s/AKfycbyvt3Oo_NEnfWA6Y49fLgSipiqkRX6EzeZvb4Fcc01uLqM0g3WgEWLCmGM0eGXtfxxX/exec')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('.portfolio-grid');
      const lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.className = 'lightbox';
      document.body.appendChild(lightbox);

      const lightboxImg = document.createElement('img');
      lightbox.appendChild(lightboxImg);

      data.forEach(imageURL => {
        const img = document.createElement('img');
        img.src = imageURL;
        img.alt = "Makeup Image";
        img.classList.add('portfolio-item');
        container.appendChild(img);

        // Add click to open lightbox
        img.addEventListener('click', () => {
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src;
        });
      });

      // Click outside closes lightbox
      lightbox.addEventListener('click', e => {
        if (e.target !== lightboxImg) {
          lightbox.style.display = 'none';
        }
      });
    });
});
