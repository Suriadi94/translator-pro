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

                              // 5. Interactive Sandbox Demo Logic
                              const btnTranslate = document.getElementById('btn-translate-demo');
      const demoInput = document.getElementById('demo-input');
      const demoOutput = document.getElementById('demo-output');
      const demoStatus = document.getElementById('demo-status');
      const btnMic = document.getElementById('btn-mic');
      const btnSpeak = document.getElementById('btn-speak');
      const btnCopy = document.getElementById('btn-copy');
      const selectSrc = document.getElementById('demo-src');
      const selectDest = document.getElementById('demo-dest');

                              const translateText = async (text, sl, tl) => {
                                        try {
                                                      demoStatus.style.opacity = '1';
                                                      demoStatus.innerText = 'Menghubungkan ke Synergy Engine...';

                                            // Public Google Translate API Endpoint (Keyless for Demo)
                                            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURI(text)}`;

                                            const response = await fetch(url);
                                                      const data = await response.json();

                                            if (data && data[0]) {
                                                              let translated = '';
                                                              data[0].forEach(item => {
                                                                                    if (item[0]) translated += item[0];
                                                              });
                                                              return translated;
                                            }
                                                      return '[Error: Gagal memproses terjemahan]';
                                        } catch (error) {
                                                      console.error('Translation Error:', error);
                                                      return '[Error: Koneksi bermasalah]';
                                        } finally {
                                                      demoStatus.style.opacity = '0';
                                        }
                              };

                              if (btnTranslate) {
                                        btnTranslate.addEventListener('click', async () => {
                                                      const text = demoInput.value.trim();
                                                      if (!text) return;

                                                                                  btnTranslate.disabled = true;
                                                      btnTranslate.innerText = '\u231B Memproses...';

                                                                                  const sl = selectSrc.value;
                                                      const tl = selectDest.value;

                                                                                  const result = await translateText(text, sl, tl);
                                                      demoOutput.value = result;

                                                                                  btnTranslate.disabled = false;
                                                      btnTranslate.innerText = '\u2728 Terjemahkan Sekarang';
                                        });
                              }

                              // Voice - Text to Speech (TTS)
                              if (btnSpeak) {
                                        btnSpeak.addEventListener('click', () => {
                                                      const text = demoOutput.value.trim();
                                                      if (!text) return;

                                                                              const utterance = new SpeechSynthesisUtterance(text);
                                                      const lang = selectDest.value;
                                                      utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
                                                      utterance.rate = 0.9;
                                                      window.speechSynthesis.speak(utterance);
                                        });
                              }

                              // Mic - Speech to Text (STT)
                              if (btnMic) {
                                        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                                        if (SpeechRecognition) {
                                                      const recognition = new SpeechRecognition();
                                                      recognition.continuous = false;
                                                      recognition.interimResults = false;

                                            btnMic.addEventListener('click', () => {
                                                              const lang = selectSrc.value;
                                                              recognition.lang = lang === 'zh-CN' ? 'zh-CN' : 'id-ID';

                                                                                    recognition.start();
                                                              btnMic.innerText = '\u25CF';
                                                              demoStatus.style.opacity = '1';
                                                              demoStatus.innerText = 'Mendengarkan...';
                                            });

                                            recognition.onresult = (event) => {
                                                              const transcript = event.results[0][0].transcript;
                                                              demoInput.value = transcript;
                                                              btnMic.innerText = 'Mic';
                                                              demoStatus.style.opacity = '0';
                                            };

                                            recognition.onerror = () => {
                                                              btnMic.innerText = 'Mic';
                                                              demoStatus.style.opacity = '1';
                                                              demoStatus.innerText = 'Gagal mendeteksi suara.';
                                                              setTimeout(() => demoStatus.style.opacity = '0', 2000);
                                            };

                                            recognition.onend = () => {
                                                              btnMic.innerText = 'Mic';
                                            };
                                        } else {
                                                      btnMic.style.display = 'none';
                                        }
                              }

                              // Copy to Clipboard
                              if (btnCopy) {
                                        btnCopy.addEventListener('click', () => {
                                                      const text = demoOutput.value.trim();
                                                      if (!text) return;
                                                      navigator.clipboard.writeText(text).then(() => {
                                                                        btnCopy.innerText = '\u2705';
                                                                        setTimeout(() => btnCopy.innerText = 'Copy', 2000);
                                                      });
                                        });
                              }

                              console.log('Translator Pro Landing Page Initialized | Synergy v4.8.18');
});
