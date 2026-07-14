document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Drawer Menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-drawer a');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      // Hamburger animation
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // --- App Screenshot Carousel Slider ---
  const slides = document.querySelectorAll('.phone-mockup-carousel');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentIdx = 1; // Start on the middle slide (Dashboard mockup)

  // Generate dots
  if (dotsContainer && slides.length > 0) {
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === currentIdx) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    slides.forEach((slide, idx) => {
      slide.className = 'phone-mockup-carousel'; // Reset classes
      
      if (idx === currentIdx) {
        slide.classList.add('active-slide');
      } else if (idx === (currentIdx - 1 + slides.length) % slides.length) {
        slide.classList.add('prev-slide');
      } else if (idx === (currentIdx + 1) % slides.length) {
        slide.classList.add('next-slide');
      } else {
        slide.classList.add('hidden-slide');
      }
    });

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIdx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentIdx = index;
    updateSlider();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % slides.length;
      updateSlider();
    });
    
    // Add click events to prev/next slides to navigate to them
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (index !== currentIdx) {
          goToSlide(index);
        }
      });
    });

    // Add touch swipe support for mobile
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
      let touchStartX = 0;
      let touchEndX = 0;
      
      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        const swipeThreshold = 50; // minimum distance in px
        if (touchEndX < touchStartX - swipeThreshold) {
          // Swiped left, show next slide
          currentIdx = (currentIdx + 1) % slides.length;
          updateSlider();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swiped right, show prev slide
          currentIdx = (currentIdx - 1 + slides.length) % slides.length;
          updateSlider();
        }
      }
    }

    // Initialize
    updateSlider();
  }


  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current one
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- APK Download Simulator Modal ---
  const downloadTriggers = document.querySelectorAll('.trigger-apk-download');
  const modal = document.querySelector('.download-modal');
  const modalClose = document.querySelector('.modal-close');
  const progressBar = document.querySelector('.progress-bar');
  const progressContainer = document.querySelector('.progress-container');
  const statusText = document.querySelector('.download-status-text');
  const modalSubText = document.querySelector('.modal-card p');

  if (modal) {
    downloadTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        startDownloadSimulation();
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      resetDownloadModal();
    });

    // Close when clicking outside card
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        resetDownloadModal();
      }
    });
  }

  function startDownloadSimulation() {
    progressContainer.style.display = 'block';
    statusText.style.display = 'block';
    statusText.textContent = 'Preparing download files...';
    progressBar.style.width = '0%';
    modalSubText.textContent = 'Downloading AjahFi application installation package.';

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        statusText.textContent = 'Download Complete! (AjahFi.apk)';
        modalSubText.textContent = 'Please open the downloaded APK file on your Android device to install the application. Make sure to allow "Install from Unknown Sources" in your system settings.';
      } else {
        statusText.textContent = `Downloading... ${progress}%`;
      }
      progressBar.style.width = `${progress}%`;
    }, 150);
  }

  function resetDownloadModal() {
    setTimeout(() => {
      progressContainer.style.display = 'none';
      statusText.style.display = 'none';
      progressBar.style.width = '0%';
      modalSubText.textContent = 'Downloading AjahFi application installation package.';
    }, 300);
  }

  // --- Info Modals (Privacy / Terms) ---
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  const openPrivacy = document.getElementById('openPrivacy');
  const openTerms = document.getElementById('openTerms');
  const closePrivacy = document.getElementById('closePrivacy');
  const closeTerms = document.getElementById('closeTerms');

  if (openPrivacy && privacyModal) {
    openPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.classList.add('active');
    });
  }

  if (openTerms && termsModal) {
    openTerms.addEventListener('click', (e) => {
      e.preventDefault();
      termsModal.classList.add('active');
    });
  }

  if (closePrivacy && privacyModal) {
    closePrivacy.addEventListener('click', () => {
      privacyModal.classList.remove('active');
    });
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        privacyModal.classList.remove('active');
      }
    });
  }

  if (closeTerms && termsModal) {
    closeTerms.addEventListener('click', () => {
      termsModal.classList.remove('active');
    });
    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) {
        termsModal.classList.remove('active');
      }
    });
  }
});
