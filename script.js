document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const appointmentSection = document.getElementById('appointmentSection');
  const calendlyPopup = document.getElementById('calendlyPopup');
  const portfolioSection = document.getElementById('portfolioSection');
  const portfolioModal = document.getElementById('portfolioModal');
  const closeBtns = document.querySelectorAll('.close');
  const closeCalendly = document.getElementById('closeCalendly');

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

  if (appointmentSection && calendlyPopup) {
    appointmentSection.addEventListener('click', () => toggleModal(calendlyPopup, true));
  }

  if (portfolioSection && portfolioModal) {
    portfolioSection.addEventListener('click', () => toggleModal(portfolioModal, true));
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleModal(btn.closest('.modal-content').parentNode, false);
    });
  });

  if (closeCalendly && calendlyPopup) {
    closeCalendly.addEventListener('click', () => toggleModal(calendlyPopup, false));
  }

  window.addEventListener('click', function (event) {
    if (calendlyPopup && !calendlyPopup.classList.contains('hidden') && event.target === calendlyPopup) {
      toggleModal(calendlyPopup, false);
    }
    if (portfolioModal && !portfolioModal.classList.contains('hidden') && event.target === portfolioModal) {
      toggleModal(portfolioModal, false);
    }
  });

  // 🎯 Load portfolio images from Google Drive via CORS proxy
  fetch('https://api.allorigins.win/raw?url=https://script.google.com/macros/s/AKfycbyvt3Oo_NEnfWA6Y49fLgSipiqkRX6EzeZvb4Fcc01uLqM0g3WgEWLCmGM0eGXtfxxX/exec')
  .then(res => res.text())
  .then(raw => {
    console.log("💬 RAW string from Google Drive:", raw);  // <-- this gotta show up

    let data;
    try {
      data = JSON.parse(raw);
      console.log("✅ JSON PARSED SUCCESSFULLY:", data); // <-- and this
    } catch (e) {
      console.error("❌ JSON PARSE FAILED:", e);
      return;
    }

    let imageArray;

    if (Array.isArray(data)) {
      imageArray = data;
    } else if (data && typeof data === 'object') {
      console.warn("⚠️ Data is an object. Trying Object.values()...");
      imageArray = data.images || Object.values(data); // images field OR fallback
    } else {
      console.error("❌ Unexpected data format:", typeof data);
      return;
    }

    if (!Array.isArray(imageArray)) {
      console.error("❌ Still not an array. Final value:", imageArray);
      return;
    }

    const container = document.querySelector('.portfolio-grid');
    if (!container) {
      console.error("❌ Could not find .portfolio-grid");
      return;
    }

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);

    imageArray.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
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
    console.error("❌ Fetch completely failed:", error);
  });

});
