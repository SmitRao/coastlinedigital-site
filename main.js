/**
 * Coastline Digital - Main JavaScript
 * Tasteful interactions with motion preference respect
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('nav__menu--open');
      
      // Prevent body scroll when menu is open on mobile
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav__menu--open');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('nav__menu--open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav__menu--open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('nav__menu--open') && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav__menu--open');
        document.body.style.overflow = '';
      }
    });
  }

  // Nav scroll effect
  const nav = document.querySelector('.nav');
  
  if (nav) {
    let lastScrollY = 0;
    let ticking = false;
    
    function updateNav() {
      const scrollY = window.scrollY;
      
      if (scrollY > 20) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
      
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
    
    // Check initial state
    updateNav();
  }

  // Show success message if ?sent=1 in URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sent') === '1') {
    const successMessage = document.getElementById('success-message');
    const contactForm = document.getElementById('contact-form');
    const contactSection = document.getElementById('contact');
    
    if (successMessage) {
      successMessage.hidden = false;
      
      // Scroll to success message
      if (contactSection) {
        setTimeout(function() {
          contactSection.scrollIntoView({ 
            behavior: prefersReducedMotion ? 'auto' : 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
      
      // Disable the form
      if (contactForm) {
        contactForm.style.opacity = '0.5';
        contactForm.style.pointerEvents = 'none';
        const inputs = contactForm.querySelectorAll('input, textarea, button');
        inputs.forEach(function(input) {
          input.disabled = true;
        });
      }
    }
    
    // Clean URL without reload
    if (window.history && window.history.replaceState) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Account for fixed nav height
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 24;
        
        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        
        // Update URL
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', targetId);
        }
        
        // Set focus to the target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Intersection Observer for scroll animations (respects reduced motion)
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };
    
    const animateObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animateObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements with animation class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(function(el) {
      animateObserver.observe(el);
    });
  } else {
    // If reduced motion or no IntersectionObserver, show all elements immediately
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(function(el) {
      el.classList.add('is-visible');
    });
  }

  // Easter egg: Konami code reveals a tiny wave in console
  // Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        console.log('%c 🌊 ', 'font-size: 48px;');
        console.log('%cYou found the hidden wave! Thanks for exploring.', 'color: #0F2744; font-family: Georgia, serif; font-size: 14px;');
        console.log('%cCoastline Digital - SoCal local sites and listing video', 'color: #D4C4A8; font-size: 12px;');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Form validation enhancement
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form__input');
    
    inputs.forEach(function(input) {
      // Add subtle interaction feedback
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('form__group--focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('form__group--focused');
        
        // Mark as touched for styling
        if (this.value.trim() !== '') {
          this.classList.add('form__input--touched');
        } else {
          this.classList.remove('form__input--touched');
        }
      });
    });
    
    // Prevent double submission
    contactForm.addEventListener('submit', function() {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
    });
  }

  // Lazy parallax effect for hero (only if no reduced motion preference)
  if (!prefersReducedMotion) {
    const heroOrb = document.querySelector('.hero__orb');
    const heroParticles = document.querySelectorAll('.hero__particle');
    
    if (heroOrb || heroParticles.length > 0) {
      let rafId = null;
      
      function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        
        // Only apply parallax when hero is in view
        if (scrollY < heroHeight) {
          const progress = scrollY / heroHeight;
          
          if (heroOrb) {
            heroOrb.style.transform = `translate(${progress * 20}px, ${progress * 40}px) scale(${1 + progress * 0.1})`;
          }
          
          heroParticles.forEach(function(particle, i) {
            const speed = 0.5 + (i * 0.1);
            particle.style.transform = `translateY(${scrollY * speed * 0.3}px)`;
          });
        }
        
        rafId = null;
      }
      
      window.addEventListener('scroll', function() {
        if (rafId === null) {
          rafId = requestAnimationFrame(updateParallax);
        }
      }, { passive: true });
    }
  }

})();
