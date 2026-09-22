(() => {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  const year = document.getElementById("year");
  const cursor = document.querySelector(".cursor");
  const form = document.getElementById("contact-form");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    nav.classList.toggle("is-solid", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (finePointer && cursor && !reduceMotion) {
    cursor.classList.add("is-on");
    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    document.querySelectorAll("a, button, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-grow"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-grow"));
    });
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document
      .querySelectorAll(".practice__fig, .practice__copy, .work__card, .core article, .skills article, .job, .edu__visual, .edu__list li, .form, .contact__intro")
      .forEach((el, i) => {
        el.style.animationDelay = `${(i % 4) * 80}ms`;
        io.observe(el);
      });
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const status = form.querySelector(".form__status");

    if (!name || !email || !message) {
      if (status) status.textContent = "Please complete every field.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:vipulpatil6667@gmail.com?subject=${subject}&body=${body}`;
    if (status) status.textContent = "Opening your email client…";
  });
})();
