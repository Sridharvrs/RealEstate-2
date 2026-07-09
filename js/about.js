/*=========================================
        ACHIEVEMENT COUNTER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".achievement-card h3");

    const section = document.querySelector(".achievements");

    let started = false;

    function startCounter() {

        if (started) return;

        started = true;

        counters.forEach(counter => {

            const target = +counter.getAttribute("data-target");

            let count = 0;

            const increment = Math.ceil(target / 100);

            const updateCounter = () => {

                count += increment;

                if (count >= target) {

                    counter.textContent = target + "+";

                } else {

                    counter.textContent = count + "+";

                    requestAnimationFrame(updateCounter);

                }

            };

            updateCounter();

        });

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter();

                observer.disconnect();

            }

        });

    }, {

        threshold: 0.4

    });

    observer.observe(section);

});