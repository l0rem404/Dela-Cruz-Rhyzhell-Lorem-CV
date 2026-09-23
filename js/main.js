document.addEventListener('DOMContentLoaded', () => {
  // Scroll progress
  const progressBar = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0 && progressBar) {
      progressBar.style.width = `${(totalScroll / windowHeight) * 100}%`;
    }
  }, { passive: true });

  // Section highlight in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-tracker a');

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 200;
    const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80);

    if (isBottom) {
      currentId = 'education';
    } else {
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = section.getAttribute('id');
        }
      });
    }

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Interactive Project Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Clipboard copy utility
  const toast = document.getElementById('toast');
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        if (toast) {
          toast.textContent = `Copied to clipboard: ${text}`;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2400);
        }
      });
    });
  });

  // Print button
  const printBtn = document.getElementById('print-cv');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
});
