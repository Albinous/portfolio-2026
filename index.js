document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSlider();
});

const initBurgerMenu = () => {
  const burger = document.body.querySelector(".burger");
  const nav = document.body.querySelector(".nav");
  const navLinks = document.body.querySelectorAll(".nav-menu__link");

  function showNavMenu() {
    burger.classList.toggle("active");
    nav.classList.toggle("active");

    document.body.classList.toggle("no-scroll");
  }

  function hideNavMenu() {
    burger.classList.remove("active");
    nav.classList.remove("active");
  }

  burger.addEventListener("click", showNavMenu);
  navLinks.forEach((link) => link.addEventListener("click", hideNavMenu));
};

const initSlider = () => {
  const slider = document.body.querySelector(".slider");
  const track = document.body.querySelector(".portfolio-slider");

  let isDragging = false; // проверка идет ли свайп;
  let speed = 0;
  let position = 0;

  let startX = 0;

  slider.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    slider.style.cursor = "grabbing";
  });

  slider.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const delta = event.clientX;
    -startX;
    startX = event.clientX;

    position += delta;
  });

  slider.addEventListener("pointerup", (event) => {
    isDragging = false;
    slider.style.cursor = "grabb";
  });

  slider.addEventListener("pointerleave", (event) => {
    isDragging = false;
  });

  slider.addEventListener("mousemove", (event) => {
    if (isDragging) return;

    const rect = slider.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;

    const percent = x / width;

    if (percent < 0.3) {
      speed = -2;
    } else if (percent > 0.7) {
      speed = 2;
    } else {
      speed = 0;
    }
  });

  slider.addEventListener("mouseleave", () => {
    speed = 0;
  });

  function animate() {
    position += speed;
    const sliderWidth = slider.offsetWidth;
    const trackWidth = track.scrollWidth;

    const limit = trackWidth - sliderWidth;

    position = Math.max(-limit, Math.min(limit, position));
    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
  }

  animate();
};
