const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.querySelector('.enquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you. Your enquiry form is ready; connect it to your preferred form service before launch.');
});
