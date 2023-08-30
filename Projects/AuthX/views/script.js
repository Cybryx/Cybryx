// script.js
const darkModeToggle = document.querySelector('.dark-mode');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
});
