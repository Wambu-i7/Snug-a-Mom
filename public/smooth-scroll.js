// smooth-scroll.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const href = this.getAttribute('href');
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // Adjusted for navbar height
            behavior: 'smooth'
          });
        }
      }
    });
  });
  