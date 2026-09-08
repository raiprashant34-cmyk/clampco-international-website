const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Route the main product CTA to the detailed catalogue page.
const productCta = document.querySelector('.hero-actions .btn.primary');
if (productCta && location.pathname.endsWith('/index.html') || productCta && location.pathname.endsWith('/')) {
  productCta.href = 'products.html';
}

// Give each homepage product family a direct route into the detailed catalogue.
const productSections = ['welding','wires','abrasives','fasteners','hvac','vibration'];
document.querySelectorAll('.product-family .text-link').forEach((link, index) => {
  if (productSections[index]) link.href = `products.html#${productSections[index]}`;
});

const enquiryForm = document.querySelector('.enquiry-form');
if (enquiryForm && !enquiryForm.action.startsWith('mailto:')) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you. Your enquiry form is ready; connect it to your preferred form service before launch.');
  });
}
