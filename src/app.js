import './styles/style.css';
import './script/components/index.js';
import home from './view/home.js';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    disable: false,
  });

  home();
});
