/* ============================================
   IMPULSO.IA — Interactions
   - Scroll reveal
   - FAQ (native <details>)
   - Lead form: máscara WhatsApp + submit simulado
   - Smooth scroll p/ CTAs internos
   ============================================ */

(function () {
  'use strict';

  /* ----------- SCROLL REVEAL ----------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ----------- WHATSAPP MASK ----------- */
  const wppInput = document.getElementById('whatsapp');
  if (wppInput) {
    wppInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
      else if (v.length > 9) v = v.slice(0, 9) + '-' + v.slice(9);
      e.target.value = v;
    });
  }

  /* ----------- TIER TRACKING ----------- */
  // Quando o usuário clica em "Quero o FULL / LIGHT / PRO", marca o tier no form
  const tierField = document.getElementById('tierField');
  document.querySelectorAll('[data-tier]').forEach((link) => {
    link.addEventListener('click', () => {
      const tier = link.getAttribute('data-tier');
      if (tierField) tierField.value = tier;
      // Persist choice no localStorage (útil se voltar depois)
      try { localStorage.setItem('impulso_selected_tier', tier); } catch (_) {}
    });
  });

  // Restore tier from previous visit
  try {
    const saved = localStorage.getItem('impulso_selected_tier');
    if (saved && tierField) tierField.value = saved;
  } catch (_) {}

  /* ----------- FORM SUBMIT ----------- */
  const form = document.getElementById('leadForm');
  const successBox = document.getElementById('formSuccess');

  if (form && successBox) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());
      const required = ['nome', 'whatsapp', 'email', 'segmento'];
      const missing = required.filter((k) => !data[k] || !data[k].toString().trim());
      if (missing.length) {
        alert('Preencha os campos obrigatórios: ' + missing.join(', '));
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Enviando…';
      btn.style.opacity = '0.7';

      const payload = {
        ...data,
        page_version: document.body.dataset.page || document.body.dataset.theme || 'full',
        source: 'landing-impulso-ia',
        ts: new Date().toISOString(),
      };

      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json();

        if (!res.ok || !result.ok) {
          throw new Error(result.message || result.error || `HTTP ${res.status}`);
        }

        successBox.classList.add('is-visible');
        form.reset();
        btn.innerHTML = result.emailSent
          ? '✓ Recebido! Confere seu e-mail ✉️'
          : '✓ Recebido! Em breve te chamamos';
        btn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
        btn.style.opacity = '1';

        console.log('[LEAD OK]', result);
      } catch (err) {
        console.error('[LEAD FAIL]', err);
        btn.innerHTML = '⚠️ Erro ao enviar — tente de novo';
        btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        btn.style.opacity = '1';
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        btn.style.background = '';
      }, 6000);
    });
  }

  /* ----------- SMOOTH SCROLL ----------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ----------- SUBTLE NAV SHRINK ----------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            nav.style.borderBottomColor = window.scrollY > 30
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(255, 255, 255, 0.08)';
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }
})();