/* 
  Translator Pro Landing Page - Interactions
  Logic for smooth UX and professional feel.
*/
document.addEventListener('DOMContentLoaded', () => {
      // 1. Smooth Scrolling for Navigation
                              const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
                link.addEventListener('click', function(e) {
                              e.preventDefault();
                              const targetId = this.getAttribute('href');
                              const targetElement = document.querySelector(targetId);
                              if (targetElement) {
                                                window.scrollTo({
                                                                      top: targetElement.offsetTop - 80, // Offset for sticky header
                                                                      behavior: 'smooth'
                                                });
                              }
                });
      });
      // 2. Reveal Animations on Scroll
                              const observerOptions = {
                                        threshold: 0.1
                              };
      const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                              if (entry.isIntersecting) {
                                                entry.target.style.opacity = '1';
                                                entry.target.style.transform = 'translateY(0)';
                                                revealObserver.unobserve(entry.target);
                              }
                });
      }, observerOptions);
      const revealElements = document.querySelectorAll('.glass-card, .section-title, .hero-tag');
      revealElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
                revealObserver.observe(el);
      });
      // 3. Navbar background scroll effect
                              const header = document.querySelector('header');
      window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                              header.style.background = 'rgba(15, 23, 42, 0.95)';
                              header.style.padding = '1rem 5%';
                } else {
                              header.style.background = 'rgba(15, 23, 42, 0.8)';
                              header.style.padding = '1.5rem 5%';
                }
      });
      // 4. Interactive Hover for Pricing Cards
                              const pricingCards = document.querySelectorAll('.pricing-card');
      pricingCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                              if (!card.classList.contains('featured')) {
                                                card.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                              }
                });
                card.addEventListener('mouseleave', () => {
                              if (!card.classList.contains('featured')) {
                                                card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                              }
                });
      });
      console.log('Translator Pro Landing Page Initialized | Synergy v4.8');
});
