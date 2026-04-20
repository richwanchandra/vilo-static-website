document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('vims-navbar');
    const mobileTopbar = document.getElementById('vims-mobile-topbar');
    const desktopLogo = document.querySelector('.vims-brand-logo');
    const mobileLogo = document.querySelector('.vims-mobile-logo');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (mobileTopbar) mobileTopbar.classList.add('scrolled');
            if (desktopLogo) desktopLogo.src = 'images/Logowhite.svg';
            if (mobileLogo) mobileLogo.src = 'images/Logowhite.svg';
        } else {
            navbar.classList.remove('scrolled');
            if (mobileTopbar) mobileTopbar.classList.remove('scrolled');
            if (desktopLogo) desktopLogo.src = 'images/logo.svg';
            if (mobileLogo) mobileLogo.src = 'images/logo.svg';
        }
    });

    const hamburger = document.getElementById('vims-hamburger');
    const overlay = document.getElementById('vims-overlay');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navbar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            navbar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }

    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        requestAnimationFrame(() => heroContent.classList.add("show"));
    }

    const textSlides = document.querySelectorAll(".text-slide");
    const imageSlides = document.querySelectorAll(".image-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");

    if (textSlides.length > 0 && imageSlides.length > 0) {
        let current = 0;
        const total = textSlides.length;
        let slideInterval;

        function goToSlide(index) {
            textSlides[current].classList.remove("is-active");
            imageSlides[current].classList.remove("is-active");
            if (dots.length > 0) dots[current].classList.remove("active");

            current = index;

            textSlides[current].classList.add("is-active");
            imageSlides[current].classList.add("is-active");
            if (dots.length > 0) dots[current].classList.add("active");
        }

        function nextSlide() {
            goToSlide((current + 1) % total);
        }

        slideInterval = setInterval(nextSlide, 4500);

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                clearInterval(slideInterval);
                goToSlide(index);
                slideInterval = setInterval(nextSlide, 4500);
            });
        });

        const stats = document.querySelectorAll(".stat");

        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    const delay = Array.from(stats).indexOf(target) * 150;
                    setTimeout(() => {
                        target.classList.add("is-visible");

                        const counterElement = target.querySelector('.counter');
                        if (counterElement) {
                            const targetValue = parseInt(counterElement.getAttribute('data-target'));
                            animateValue(counterElement, 0, targetValue, 2000);
                        }
                    }, delay);

                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.2
        });

        stats.forEach(stat => {
            statObserver.observe(stat);
        });
    }

    const storyContainer = document.getElementById('vilo-story-carousel');
    if (storyContainer) {
        const slides = Array.from(storyContainer.querySelectorAll('.story-slide'));
        let idx = 0;
        function render() {
            slides.forEach((s,i)=> s.style.display = i===idx ? '' : 'none');
        }
        storyContainer.addEventListener('click', function(e){
            const btn = e.target.closest('.slide-btn');
            if (!btn) return;
            if (btn.hasAttribute('data-prev')) {
                idx = (idx - 1 + slides.length) % slides.length;
                render();
            } else if (btn.hasAttribute('data-next')) {
                idx = (idx + 1) % slides.length;
                render();
            }
        });
        render();
    }
});
