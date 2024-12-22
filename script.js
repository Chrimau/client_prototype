
function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    showSlide(currentSlide);
}

// Automatically change slide every 1 seconds
setInterval(() => {
    changeSlide(1);
}, 1000);

// Initial display
showSlide(currentSlide);

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector(".background-video");

    // Add event listener for lazy loading video
    window.addEventListener('scroll', () => {
        if (video && !video.classList.contains('loaded')) {
            const videoPosition = video.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            if (videoPosition < screenPosition) {
                video.load(); // Load the video when in view
                video.classList.add('loaded');
            }
        }
    });
    });
