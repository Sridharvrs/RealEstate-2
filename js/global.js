document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            MOBILE MENU
    ==============================*/

    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (burger && mobileMenu) {

        function openMenu() {
            burger.classList.add("active");
            mobileMenu.classList.add("active");

            document.body.classList.add("menu-open");
            document.documentElement.classList.add("menu-open");
        }

        function closeMenu() {
            burger.classList.remove("active");
            mobileMenu.classList.remove("active");

            document.body.classList.remove("menu-open");
            document.documentElement.classList.remove("menu-open");
        }

        burger.addEventListener("click", (e) => {
            e.stopPropagation();

            if (mobileMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.querySelectorAll(".mobile-menu a, .mobile-menu button").forEach(item => {
            item.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (e) => {
            if (
                mobileMenu.classList.contains("active") &&
                !mobileMenu.contains(e.target) &&
                !burger.contains(e.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 992) {
                closeMenu();
            }
        });

    }

    /*==============================
            SCROLL REVEAL
    ==============================*/

    const items = document.querySelectorAll(
        ".reveal-left, .reveal-right, .reveal-up, .reveal-pop"
    );

    items.forEach((el, index) => {
        if (el.classList.contains("reveal-pop")) {
            el.style.setProperty("--delay", index % 6);
        }
    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    items.forEach(el => observer.observe(el));

});