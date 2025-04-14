document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const appointmentSection = document.getElementById('appointmentSection');
  const calendlyPopup = document.getElementById('calendlyPopup');
  const portfolioSection = document.getElementById('portfolioSection');
  const portfolioModal = document.getElementById('portfolioModal');
  const closeBtns = document.querySelectorAll('.close');
  const closeCalendly = document.getElementById('closeCalendly');

  // 🔁 Modal toggle
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

  // 🎯 Load portfolio images from Google Drive via CORS proxy
  fetch('https://api.allorigins.win/raw?url=https://script.google.com/macros/s/AKfycbyvt3Oo_NEnfWA6Y49fLgSipiqkRX6EzeZvb4Fcc01uLqM0g3WgEWLCmGM0eGXtfxxX/exec')
    .then(res => res.text()) // grab text first in case it's stringified
    .then(raw => {
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.error("❌ Failed to parse data:", e);
        console.log("💬 Raw string:", raw);
        return;
      }

      console.log("📸 PARSED DATA FROM DRIVE:", data);

      if (!Array.isArray(data)) {
        console.error("❌ This ain’t no array. It's a", typeof data);
        return;
      }

      const container = document.querySelector('.portfolio-grid');
      if (!container) {
        console.error("❌ Could not find .portfolio-grid container.");
        return;
      }

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

        img.addEventListener('click', () => {
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src;
        });
      });

      lightbox.addEventListener('click', e => {
        if (e.target !== lightboxImg) {
          lightbox.style.display = 'none';
        }
      });
    })
    .catch(error => {
      console.error("❌ Failed to fetch from Google Script:", error);
    });
});
