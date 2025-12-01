document.addEventListener("DOMContentLoaded", function () {

  function includeHTML(callback) {
    const elements = document.querySelectorAll("[w3-include-html]");
    let loaded = 0;
    if (elements.length === 0) { initEverything(); return; }
    elements.forEach(elmnt => {
      const file = elmnt.getAttribute("w3-include-html");
      if (!file) return;
      fetch(file)
        .then(res => res.ok ? res.text() : "Error")
        .then(data => {
          elmnt.innerHTML = data;
          elmnt.removeAttribute("w3-include-html");
          loaded++;
          if (loaded === elements.length) {
            initEverything();
            if (callback) callback();
          }
        });
    });
  }

  function initEverything() {
    feather.replace();
    updateCurrentYear();      
    initMobileMenu();
    initShopDropdowns();
    initSearchOverlay();
    initCarousel(); 
  }

  // ====== FIXED: Har jagah current year update karega ======
  function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    // Saare elements jinka id="year" hai unko update kar do
    document.querySelectorAll('#year').forEach(span => {
      span.textContent = currentYear;
    });
    // Agar class se bhi use kar rahe ho to (future-proof)
    document.querySelectorAll('.current-year').forEach(span => {
      span.textContent = currentYear;
    });
  }

  // Desktop + Mobile Shop Dropdowns
  function initShopDropdowns() {
    const shopToggle = document.getElementById('shopToggle');
    const shopMenu = document.getElementById('shopMainMenu');
    const shopChevron = document.getElementById('shopChevron');
    const bulletToggle = document.getElementById('bulletToggle');
    const bulletMenu = document.getElementById('bulletSubMenu');
    const bulletChevron = document.getElementById('bulletChevron');

    // Desktop
    shopToggle?.addEventListener('click', e => {
      e.stopPropagation();
      shopMenu.classList.toggle('opacity-0');
      shopMenu.classList.toggle('invisible');
      shopMenu.classList.toggle('pointer-events-none');
      shopMenu.classList.toggle('translate-y-4');
      shopChevron.classList.toggle('rotate-180');
    });

    bulletToggle?.addEventListener('click', e => {
      e.stopPropagation();
      bulletMenu.classList.toggle('opacity-0');
      bulletMenu.classList.toggle('invisible');
      bulletMenu.classList.toggle('max-h-0');
      bulletMenu.classList.toggle('max-h-96');
      bulletChevron.classList.toggle('rotate-90');
    });

    // Mobile Shop Dropdown (Right Slide Menu)
    const mobileShopToggle = document.getElementById('mobileShopToggle');
    const mobileShopSubmenu = document.getElementById('mobileShopSubmenu');
    const mobileShopChevron = document.getElementById('mobileShopChevron');

    mobileShopToggle?.addEventListener('click', e => {
      e.stopPropagation();
      mobileShopSubmenu.classList.toggle('opacity-0');
      mobileShopSubmenu.classList.toggle('opacity-100');
      mobileShopSubmenu.classList.toggle('max-h-0');
      mobileShopSubmenu.classList.toggle('max-h-96');
      mobileShopChevron.classList.toggle('rotate-180');
    });

    // Close all dropdowns on outside click
    document.addEventListener('click', () => {
      if (shopMenu && !shopMenu.classList.contains('opacity-0')) {
        shopMenu.classList.add('opacity-0','invisible','pointer-events-none','translate-y-4');
        shopChevron?.classList.remove('rotate-180');
      }
      if (bulletMenu && !bulletMenu.classList.contains('opacity-0')) {
        bulletMenu.classList.add('opacity-0','invisible','max-h-0');
        bulletMenu.classList.remove('max-h-96');
        bulletChevron?.classList.remove('rotate-90');
      }
      if (mobileShopSubmenu && mobileShopSubmenu.classList.contains('opacity-100')) {
        mobileShopSubmenu.classList.remove('opacity-100','max-h-96');
        mobileShopSubmenu.classList.add('opacity-0','max-h-0');
        mobileShopChevron?.classList.remove('rotate-180');
      }
    });

    shopMenu?.addEventListener('click', e => e.stopPropagation());
    bulletMenu?.addEventListener('click', e => e.stopPropagation());
    mobileShopSubmenu?.addEventListener('click', e => e.stopPropagation());
  }

  // Right Side Slide-In Mobile Menu
  function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const closeMenu = document.getElementById('closeMenu');

    mobileToggle?.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => mobileMenuPanel.classList.remove('translate-x-full'), 10);
      feather.replace();
    });

    const closeMobile = () => {
      mobileMenuPanel.classList.add('translate-x-full');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }, 500);
    };

    closeMenu?.addEventListener('click', closeMobile);
    mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMobile(); });
  }

  function initSearchOverlay() {
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');

    searchBtn?.addEventListener('click', () => { searchOverlay?.classList.remove('hidden'); document.body.style.overflow = 'hidden'; });
    closeSearch?.addEventListener('click', () => { searchOverlay?.classList.add('hidden'); document.body.style.overflow = ''; });

    document.addEventListener('keydown', e => {
      if (e.key === "Escape") {
        if (searchOverlay && !searchOverlay.classList.contains('hidden')) { searchOverlay.classList.add('hidden'); document.body.style.overflow = ''; }
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) { mobileMenu.classList.add('hidden'); document.body.style.overflow = ''; }
      }
    });
  }

  includeHTML();
});

// Image Switch Script
    function changeImage(src) {
      document.getElementById('mainImage').src = src;
    }



    ///product-59-britain
    function changeImage(src) {
      document.getElementById('mainImage').src = src;
    }

    // Collapsible for all sections (works on both mobile & desktop)
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('button[class*="Btn"]');
      if (!btn) return;
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('i[data-feather]');
      content.classList.toggle('hidden');
      icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
      feather.replace();
    });



//  <!-- MAGIC SCRIPT - TRUE AUTOPLAY ON MOBILE (2025 Working) -->
// यह ट्रिक 2025 में भी 100% काम करती है
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".autoplay-video");

  // पहला वीडियो तुरंत प्ले करो (user interaction के बिना)
  const playFirstVideo = () => {
    if (videos.length > 0) {
      const firstVideo = videos[0];
      firstVideo.muted = false;  // साउंड ऑन
      firstVideo.play().catch(() => {
        // अगर फिर भी ब्लॉक हो जाए तो muted करके प्ले करो फिर unmute
        firstVideo.muted = true;
        firstVideo.play();
      });
    }
  };

  // Intersection Observer - जब वीडियो स्क्रीन पर आए तो प्ले करो
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.muted = false;
        video.play().catch(() => {
          video.muted = true;
          video.play();
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.6 }); // 60% visible होने पर प्ले

  videos.forEach(video => {
    observer.observe(video);

    // टैप करने पर पॉज़/प्ले (optional)
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });

  // पेज लोड होते ही पहला वीडियो प्ले कर दो
  playFirstVideo();
});
  


    // hot deals
    function initCarousel() {
  const carousel = document.getElementById("carousel");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  // Agar HTML load nahi hua to kuch mat karo
  if (!carousel || !next || !prev) return;

  const slides = carousel.children.length;
  let index = 0;

  next.addEventListener("click", () => {
    index = (index + 1) % slides;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides) % slides;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  });
}


// HOLIDAY KIT / POUT PERFECT PAGE – FULL JS LOGIC

    document.addEventListener("DOMContentLoaded", function () {
      feather.replace();

      window.changeMainImage = function (thumb) {
        const mainImg = document.getElementById("mainImage");
        if (mainImg) mainImg.src = thumb.src;

        document.querySelectorAll('.grid-cols-5 img').forEach(img => {
          img.classList.remove('border-black', 'border-4');
          img.classList.add('border-gray-300', 'border-2');
        });
        thumb.classList.remove('border-gray-300', 'border-2');
        thumb.classList.add('border-black', 'border-4');
      };

      let selected = { liner: null, gloss: null, lipstick: null, oil: null };

      window.selectShade = function (type, name, el) {
        const selectedText = document.getElementById("selected" + type.charAt(0).toUpperCase() + type.slice(1));
        const finalText = document.getElementById("final" + type.charAt(0).toUpperCase() + type.slice(1));
        if (selectedText) selectedText.textContent = name;
        if (finalText) finalText.textContent = name;

        selected[type] = name;

        el.parentElement.querySelectorAll('.swatch').forEach(s => s.classList.remove('selected'));
        el.classList.add('selected');

        // MAIN IMAGE CHANGE ON SHADE SELECTION
        const imgPath = el.getAttribute("data-image");
        if (imgPath) {
          document.getElementById("mainImage").src = imgPath;
        }

        if (selected.liner && selected.gloss && selected.lipstick && selected.oil) {
          const btn = document.getElementById("addToCartBtn");
          btn.innerHTML = "ADD TO CART – ₹499";
          btn.classList.remove("opacity-50", "cursor-not-allowed");
          btn.disabled = false;
          btn.onclick = () => alert("Holiday Kit added to cart!");
        }

        if (selected.gloss && selected.lipstickTime && selected.oil) {
          const btn = document.getElementById("addToCartBtnTimetoparty");
          btn.innerHTML = "ADD TO CART – ₹499";
          btn.classList.remove("opacity-50", "cursor-not-allowed");
          btn.disabled = false;
          btn.onclick = () => alert("Time To Party Kit added to cart!");
        }

        if (selected.lipstickGloss && selected.oil) {
          const btn = document.getElementById("addToCartBtnJuicy");
          btn.innerHTML = "ADD TO CART – ₹499";
          btn.classList.remove("opacity-50", "cursor-not-allowed");
          btn.disabled = false;
          btn.onclick = () => alert("Juicy Plum Kit added to cart!");
        }

        if (selected.liner && selected.oil) {
          const btn = document.getElementById("addToCartBtnShineup");
          btn.innerHTML = "ADD TO CART – ₹499";
          btn.classList.remove("opacity-50", "cursor-not-allowed");
          btn.disabled = false;
          btn.onclick = () => alert("Shine up girl Lip Kit added to cart!");
        }

        
      };

      // Default first shades already have .selected class → trigger them
      // document.querySelectorAll('.swatch.selected').forEach(el => {
      //   const onclickStr = el.getAttribute('onclick');
      //   const match = onclickStr.match(/'([^']+)',\s*'([^']+)'/);
      //   if (match) {
      //     const type = match[1];
      //     const name = match[2];
      //     selectShade(type, name, el);
      //   }
      // });
    });

    // Simple & Smooth JS for Promotional banner
  let bannerIndex = 0;
  const carousel = document.getElementById('bannerCarousel');

  function goToBanner(n) {
    bannerIndex = (n + 3) % 3;
    carousel.style.transform = `translateX(-${bannerIndex * 100}%)`;
    document.querySelectorAll('button[onclick^="goToBanner"]').forEach((dot, i) => {
      dot.style.backgroundColor = i === bannerIndex ? 'white' : 'rgba(255,255,255,0.8)';
    });
  }

  setInterval(() => goToBanner(bannerIndex + 1), 5000);
  goToBanner(0); // Initialize


  // Contact Form Success Message
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your message has been sent. We will get back to you within 24 hours. 🖤');
        contactForm.reset();
      });
    }


    // <!-- Feather Icons को री-इनिशियलाइज़ करना ज़रूरी है (अगर पहले से नहीं किया हो) -->
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  });