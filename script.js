// 히어로는 페이지 진입 시 바로 보여야 하므로 reveal 제외
// 스크롤 애니메이션은 히어로 아래 섹션에만 적용
const revealTargets = document.querySelectorAll([
  '.section-label',
  '.section-title',
  '.bento-card',
  '.svc-card',
  '.wk-card',
  '.proc-item',
  '.contact-left',
  '.contact-form',
].join(', '));

revealTargets.forEach(el => {
  el.classList.add('reveal');
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = `${idx * 55}ms`;
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => io.observe(el));

// Nav scroll effect
const navWrap = document.querySelector('.nav-wrap');
window.addEventListener('scroll', () => {
  navWrap.style.top = window.scrollY > 40 ? '8px' : '16px';
}, { passive: true });

// Contact form → mailto
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('f-name').value.trim();
  const contact = document.getElementById('f-contact').value.trim();
  const type    = document.getElementById('f-type').value;
  const desc    = document.getElementById('f-desc').value.trim();

  const body = [
    `이름: ${name || '-'}`,
    `연락처: ${contact || '-'}`,
    `제작 종류: ${type || '-'}`,
    ``,
    `제작 방향 / 참고 내용:`,
    desc || '-',
  ].join('\n');

  const mailto = `mailto:dlatoquf1234@naver.com?subject=${encodeURIComponent(`[웹 제작 문의] ${name}`)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});
