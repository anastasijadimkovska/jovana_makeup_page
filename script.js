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


});
