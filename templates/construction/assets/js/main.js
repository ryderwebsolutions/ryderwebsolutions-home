const COMPONENT_PATH = "/templates/construction/components";

async function loadComponents() {
    const targets = document.querySelectorAll("[data-component]");

    await Promise.all(
        Array.from(targets).map(async (target) => {
            const name = target.getAttribute("data-component");
            if (!name) {
                return;
            }

            try {
                const response = await fetch(`${COMPONENT_PATH}/${name}.html`);
                if (!response.ok) {
                    return;
                }

                target.innerHTML = await response.text();
            } catch (error) {
                console.error(`Failed to load component: ${name}`, error);
            }
        })
    );
}

function setActiveNav() {
    const page = document.body.getAttribute("data-page");
    if (!page) {
        return;
    }

    const activeLinks = document.querySelectorAll(`[data-nav='${page}']`);
    activeLinks.forEach((link) => link.classList.add("is-active"));
}

function initMobileNav() {
    const shell = document.querySelector(".header-shell");
    const button = document.querySelector(".mobile-menu-button");
    if (!shell || !button) {
        return;
    }

    button.addEventListener("click", () => {
        const open = shell.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
    });
}

function initReveal() {
    const blocks = document.querySelectorAll(".reveal-on-scroll");
    if (!blocks.length) {
        return;
    }

    const showAll = () => {
        blocks.forEach((block) => block.classList.add("is-visible"));
    };

    if (!("IntersectionObserver" in window)) {
        showAll();
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.17 }
    );

    blocks.forEach((block) => observer.observe(block));

    // Safety fallback: never leave sections hidden if observer callbacks are delayed.
    window.setTimeout(() => {
        blocks.forEach((block) => {
            if (!block.classList.contains("is-visible")) {
                block.classList.add("is-visible");
            }
        });
    }, 1200);
}

function initFooterYear() {
    const yearTarget = document.querySelector("[data-year]");
    if (yearTarget) {
        yearTarget.textContent = String(new Date().getFullYear());
    }
}

function initTestimonialSlider() {
    const root = document.querySelector("[data-testimonials]");
    if (!root) {
        return;
    }

    const slides = Array.from(root.querySelectorAll(".testimonial-slide"));
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    let index = 0;

    const update = () => {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    };

    if (window.matchMedia("(min-width: 1025px)").matches) {
        slides.forEach((slide) => {
            slide.style.display = "block";
        });

        if (prev) {
            prev.style.display = "none";
        }

        if (next) {
            next.style.display = "none";
        }

        return;
    }

    update();

    if (prev) {
        prev.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            update();
        });
    }

    if (next) {
        next.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            update();
        });
    }
}

async function initializeSite() {
    await loadComponents();
    setActiveNav();
    initMobileNav();
    initReveal();
    initFooterYear();
    initTestimonialSlider();
}

initializeSite();
