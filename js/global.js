document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            MOBILE MENU
    ==============================*/

    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (burger && mobileMenu) {

        burger.addEventListener("click", () => {

            burger.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });

        document.querySelectorAll(".mobile-menu a").forEach(link => {

            link.addEventListener("click", () => {

                burger.classList.remove("active");

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 992) {

                burger.classList.remove("active");

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            }

        });

    }

    /*==============================
            SCROLL REVEAL
    ==============================*/

    const items = document.querySelectorAll(
        ".reveal-left,.reveal-right,.reveal-up,.reveal-pop"
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