// src/utils/sidebar.ts

export function initializeSidebar(): void {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const mainContent = document.querySelector('.main-content') as HTMLElement;

  if (!hamburgerBtn || !sidebar || !overlay || !mainContent) {
    return; // Elements not found
  }

  // Toggle sidebar function
  function toggleSidebar() {
    const isOpen = sidebar!.classList.contains('open');
    
    if (isOpen) {
      // Close sidebar
      sidebar!.classList.remove('open');
      overlay!.classList.remove('active');
      hamburgerBtn!.classList.remove('active');
      mainContent!.classList.remove('sidebar-open');
    } else {
      // Open sidebar
      sidebar!.classList.add('open');
      overlay!.classList.add('active');
      hamburgerBtn!.classList.add('active');
      mainContent!.classList.add('sidebar-open');
    }
  }

  // Event listeners
  hamburgerBtn.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', toggleSidebar);

  // Close sidebar when clicking on a nav link (mobile behavior)
  const navLinks = sidebar.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        toggleSidebar();
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      // Desktop: ensure sidebar is visible and overlay is hidden
      sidebar!.classList.add('open');
      overlay!.classList.remove('active');
      hamburgerBtn!.classList.remove('active');
      mainContent!.classList.add('sidebar-open');
    } else {
      // Mobile: ensure sidebar is hidden unless explicitly opened
      if (!sidebar!.classList.contains('open')) {
        mainContent!.classList.remove('sidebar-open');
      }
    }
  });

  // Initialize proper state based on screen size
  if (window.innerWidth >= 1024) {
    sidebar.classList.add('open');
    mainContent.classList.add('sidebar-open');
  }
}

export function setActiveNavLink(): void {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === currentPath || 
        (currentPath === '/' && href === '/') ||
        (currentPath.endsWith('.html') && href === currentPath)) {
      link.classList.add('active');
    }
  });
}
