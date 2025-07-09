AOS.init({
      duration: 1000, // Slightly faster AOS animation
      once: true,
    });

    // Splash screen animation
    const companyText = "SP MACHINING TECHNOLOGIES";
    const nameDiv = document.getElementById("company-name");

    setTimeout(() => {
      companyText.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.setProperty("--i", index);
        nameDiv.appendChild(span);
      });
    }, 2000);

    // Show navbar after splash
    setTimeout(() => {
      document.querySelector('.topnav').classList.add('show-nav');
    }, 5600); // Matches your existing delay

    // Navbar scroll effect (adds shadow on scroll)
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.topnav');
      if (window.scrollY > 0) { // Check if scrolled at all
        nav.style.boxShadow = 'var(--shadow-medium)';
      } else {
        nav.style.boxShadow = 'var(--shadow-light)'; // Maintain initial subtle shadow
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');

    // Duplicate items for seamless infinite scroll effect
    // We duplicate a few items from the beginning and end to make the loop smooth
    const numToDuplicate = 2; // Duplicate 2 items from each end
    for (let i = 0; i < numToDuplicate; i++) {
        const firstItemClone = carouselItems[i].cloneNode(true);
        const lastItemClone = carouselItems[carouselItems.length - 1 - i].cloneNode(true);
        carouselTrack.appendChild(firstItemClone); // Add clones of first items to the end
        carouselTrack.prepend(lastItemClone); // Add clones of last items to the beginning
    }

    // Recalculate items after duplication
    const allCarouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = allCarouselItems.length; // Including clones

    // Calculate the width of a single carousel item including its margins
    // This is crucial for accurate scrolling
    function getItemWidth() {
        if (allCarouselItems.length === 0) return 0;
        const item = allCarouselItems[numToDuplicate]; // Get a non-cloned item for accurate measurement
        const style = window.getComputedStyle(item);
        const width = item.offsetWidth; // Includes padding and border
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        return width + marginLeft + marginRight;
    }

    let itemWidth = getItemWidth();
    let currentIndex = numToDuplicate; // Start at the first original item (after the prepended clones)
    let scrollInterval;
    const scrollSpeed = 2000; // Time in milliseconds between scrolls (e.g., 3000ms = 3 seconds)
    const transitionDuration = 800; // Milliseconds for the scroll transition (CSS transition on track)

    // Apply initial position to show the first original item
    carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    carouselTrack.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`; // Set transition

    function updateCarousel() {
        itemWidth = getItemWidth(); // Recalculate width in case of resize

        currentIndex++;
        carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        // Check if we've scrolled past the last original item
        if (currentIndex >= (totalItems - numToDuplicate)) {
            // If so, smoothly transition to the cloned items at the beginning
            setTimeout(() => {
                carouselTrack.style.transition = 'none'; // Disable transition for instant snap
                currentIndex = numToDuplicate; // Reset to the first original item's position
                carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
                // Re-enable transition after a very short delay
                setTimeout(() => {
                    carouselTrack.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
                }, 50); // Small delay to ensure reflow
            }, transitionDuration); // Wait for the current scroll animation to finish
        }
    }

    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing interval
        scrollInterval = setInterval(updateCarousel, scrollSpeed);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    // Start auto-scrolling on load
    startAutoScroll();

    // Pause on hover
    carouselTrack.addEventListener('mouseenter', stopAutoScroll);
    carouselTrack.addEventListener('mouseleave', startAutoScroll);

    // For touch devices, we need to handle potential issues with hover
    // It's tricky to replicate 'hover' on touch for pausing auto-scroll.
    // A common approach is to pause auto-scroll on any touch interaction
    // and resume after a short delay if no further interaction.
    let touchTimeout;
    carouselTrack.addEventListener('touchstart', () => {
        stopAutoScroll();
        clearTimeout(touchTimeout);
    });

    carouselTrack.addEventListener('touchend', () => {
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(startAutoScroll, 5000); // Resume after 5 seconds of no touch
    });

    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            stopAutoScroll(); // Pause during resize
            itemWidth = getItemWidth(); // Recalculate item width
            carouselTrack.style.transition = 'none'; // Temporarily disable transition
            carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`; // Snap to correct position
            setTimeout(() => {
                carouselTrack.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;
                startAutoScroll(); // Resume auto-scroll
            }, 100); // Small delay before resuming
        }, 200); // Debounce resize event
    });
});
    // Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.navbar-right'); 
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navRight.classList.toggle('active'); // This still toggles the overlay of links
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.navbar-right ul li a').forEach(link => { 
        link.addEventListener('click', () => {
            if (navRight.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navRight.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Calculate offset to account for fixed navbar height
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.topnav').offsetHeight; // Get dynamic height

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - navbarHeight - 20; // 20px extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
      const menuToggle = document.querySelector(".menu-toggle");
      const navList = document.querySelector(".navbar-right ul");

      menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
      });
    });