/**
 * Helpers compartilhados do portal
 * - Sidebar rendering
 * - Logout
 * - Auth guard
 * - Mobile menu toggle
 */
(function () {
  'use strict';

  const aluno = window.AlunoStorage?.load();

  // === AUTH GUARD ===
  // Páginas que exigem login: dashboard.html, curso.html, modulo.html
  function guard() {
    const protectedPages = ['dashboard', 'curso', 'modulo'];
    const path = window.location.pathname.toLowerCase();
    const needsAuth = protectedPages.some((p) => path.includes(p));
    if (needsAuth && !aluno) {
      window.location.href = 'login.html';
    }
  }

  // === SIDEBAR ===
  function renderSidebar(activePage) {
    const links = [
      { id: 'dashboard', href: 'dashboard.html', icon: '🏠', label: 'Dashboard' },
      { id: 'curso', href: 'curso.html', icon: '📚', label: 'Conteúdo do curso' },
      { id: 'modulo', href: 'modulo.html?id=m1-a1', icon: '▶', label: 'Continuar aula' },
    ];

    const linksHTML = links.map((l) => `
      <a href="${l.href}" class="sidebar__link ${l.id === activePage ? 'is-active' : ''}">
        <span class="sidebar__link-icon">${l.icon}</span>
        <span>${l.label}</span>
      </a>
    `).join('');

    const initials = (aluno?.nome || 'A').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

    const html = `
      <aside class="sidebar" id="sidebar">
        <a href="dashboard.html" class="sidebar__brand">
          <span class="logo__dot"></span>
          <span>Impulso.IA</span>
        </a>

        <div class="sidebar__section">Navegação</div>
        ${linksHTML}

        <div class="sidebar__section">Outros</div>
        <a href="../index.html" class="sidebar__link" target="_blank">
          <span class="sidebar__link-icon">🌐</span>
          <span>Site principal</span>
        </a>
        <a href="https://wa.me/55XXXXXXXXX" class="sidebar__link" target="_blank">
          <span class="sidebar__link-icon">💬</span>
          <span>Suporte WhatsApp</span>
        </a>

        <div class="sidebar__footer">
          <div class="sidebar__user">
            <div class="sidebar__user-avatar">${initials}</div>
            <div class="sidebar__user-info">
              <div class="sidebar__user-name">${aluno?.nome || 'Aluno'}</div>
              <div class="sidebar__user-email">${aluno?.email || ''}</div>
            </div>
          </div>
          <button class="sidebar__logout" id="btnLogout">
            <span>↩</span><span>Sair</span>
          </button>
        </div>
      </aside>
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
    `;

    const target = document.getElementById('portalSidebar') || document.querySelector('.portal');
    if (target) {
      if (target.classList.contains('portal')) {
        target.insertAdjacentHTML('afterbegin', html);
      } else {
        target.innerHTML = html;
      }
    }
  }

  // === MENU TOGGLE (mobile) ===
  function bindMobileMenu() {
    const btn = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!btn || !sidebar) return;
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      overlay?.classList.toggle('is-open');
    });
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-open');
    });
  }

  // === LOGOUT ===
  function bindLogout() {
    document.getElementById('btnLogout')?.addEventListener('click', () => {
      if (confirm('Tem certeza que quer sair?')) {
        try { localStorage.removeItem('impulso_aluno_v1'); } catch {}
        window.location.href = 'login.html';
      }
    });
  }

  // === INIT ===
  document.addEventListener('DOMContentLoaded', () => {
    guard();
    bindMobileMenu();
    bindLogout();
  });
})();