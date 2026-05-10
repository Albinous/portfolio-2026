document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSlider();
  initAccordion();
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

  // проверяем touch устройство или нет(для телефонов, планшетов)
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  let speed = 0,
    position = 0,
    targetPosition = 0,
    startX = 0,
    isDragging = false; // идет ли сейчас свайп

  // =========================================
  // HELPERS

  const clamp = (value, min, max) => {
    return Math.max(min, Math.min(max, value));
  };

  const stopDragging = () => {
    isDragging = false;
  };

  // =========================================
  // TOUCH EVENTS

  if (isTouchDevice) {
    slider.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      isDragging = true;
      // запоминаем стартовую позицию пальца
      startX = event.clientX;
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("pointermove", (event) => {
      if (!isDragging) return;

      const currentX = event.clientX;
      // разница между прошлой и текущей позицией пальца
      const delta = currentX - startX;

      // свайп следует за пальцем и двигается столько, сколько и палец
      targetPosition += delta;

      startX = currentX;
    });

    slider.addEventListener("pointerup", (event) => {
      stopDragging;
    });

    slider.addEventListener("pointerleave", (event) => {
      stopDragging;
    });

    slider.addEventListener("pointercancel", (event) => {
      stopDragging;
    });
  }

  // =========================================
  // DESKTOP HOVER
  else {
    slider.addEventListener("mousemove", (event) => {
      // получаем размеры и позицию слайдера
      const rect = slider.getBoundingClientRect();
      // clientX - позиция мыши в координатах Х, rect.left - начало слайдера относительно документа. x - позиция мыши относительно слайдера
      const x = event.clientX - rect.left;
      const width = rect.width;

      // вычисляем позицию мышки в процентах
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
  }
  function animate() {
    if (!isTouchDevice) {
      targetPosition += speed;
    }
    position += (targetPosition - position) * 0.1;
    const sliderWidth = slider.offsetWidth;
    const trackWidth = track.scrollWidth;

    const limit = trackWidth - sliderWidth;

    targetPosition = clamp(targetPosition, -limit, limit);
    // ограничиваем значение position, чтобы слайдер не уехал слишком далеко
    position = clamp(position, -limit, limit);
    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
  }

  animate();
};

const initAccordion = () => {
  const accordion = document.querySelector(".faq-right");

  function toggleFaqAnswer(answer) {
    answer.classList.toggle("active");
  }

  function updateBtn(answer, btn) {
    btn.textContent = answer.classList.contains("active") ? "-" : "+";
  }

  const handleFaqClick = (event) => {
    const faqHeader = event.target.closest(".faq-header");
    if (!faqHeader) return;
    const faqAnswer = faqHeader.nextElementSibling;
    const toggleBtn = faqHeader.querySelector(".faq-btn");
    toggleFaqAnswer(faqAnswer);
    updateBtn(faqAnswer, toggleBtn);
  };

  accordion.addEventListener("click", handleFaqClick);
};
