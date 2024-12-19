// Scroll to Top on Page Load
function scrollToTop() {
  window.scrollTo(0, 0);
}
window.onload = function() {
  scrollToTop();
};

// AOS Animation Initialization
AOS.init({
  offset: 120,
  duration: 1000
});

// YouTube Video Player with Swiper Integration
var players = [];
var swiper = new Swiper('.swiper-container', {
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});
document.querySelectorAll('.play-button').forEach((button) => {
  button.addEventListener('click', function () {
      const slide = this.closest('.swiper-slide');
      const videoId = slide.getAttribute('data-id');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`;
      iframe.width = '100%';
      iframe.height = '315';
      iframe.allowFullscreen = true;

      slide.innerHTML = '';
      slide.appendChild(iframe);

      const player = new YT.Player(iframe, {
          events: { onStateChange: onPlayerStateChange }
      });
      players.push(player);
  });
});
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
      players.forEach((player) => {
          if (player !== event.target) {
              player.pauseVideo();
          }
      });
  }
}

// Gallery with Lightbox
document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery li');
  const lessButton = document.querySelector('.less');
  const moreButton = document.querySelector('.more');
  const lightbox = document.getElementById('lightbox');
  const fullImage = document.getElementById('fullImage');
  const closeBtn = document.getElementById('closeBtn');
  const images = document.querySelectorAll('.logo-gallery img');

  let items = 9, shown = 3;

  // Show Initial Gallery Items
  for (let i = 0; i < shown; i++) {
      if (galleryItems[i]) galleryItems[i].style.display = 'list-item';
  }
  lessButton.style.display = 'none';

  // "More" Button Functionality
  moreButton.addEventListener('click', function () {
      lessButton.style.display = 'block';
      shown += 3;
      galleryItems.forEach((item, index) => {
          if (index < shown) item.style.display = 'list-item';
      });
      if (shown >= items) moreButton.style.display = 'none';
  });

  // "Less" Button Functionality
  lessButton.addEventListener('click', function () {
      galleryItems.forEach((item, index) => {
          if (index >= 3) item.style.display = 'none';
      });
      moreButton.style.display = 'block';
      lessButton.style.display = 'none';
  });

  // Lightbox Functionality
  let currentIndex = 0;
  images.forEach((image, index) => {
      image.addEventListener('click', function () {
          currentIndex = index;
          showImage(currentIndex);
      });
  });
  function showImage(index) {
      fullImage.src = images[index].src;
      lightbox.style.display = 'block';
      setTimeout(() => (fullImage.style.opacity = 1), 10);
  }
  closeBtn.addEventListener('click', function () {
      lightbox.style.display = 'none';
  });
  lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) lightbox.style.display = 'none';
  });
  document.getElementById('prevBtn').addEventListener('click', function () {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      showImage(currentIndex);
  });
  document.getElementById('nextBtn').addEventListener('click', function () {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      showImage(currentIndex);
  });
});

// Toggle "Read More/Less"
document.querySelectorAll('.btn-more').forEach((btnMore, index) => {
  const listHide = document.querySelectorAll('.list-hide')[index];
  btnMore.addEventListener('click', function () {
      const isVisible = listHide.style.display === 'block';
      listHide.style.display = isVisible ? 'none' : 'block';
      btnMore.textContent = isVisible ? 'Read More' : 'Read Less';
  });
});

// Disable Right-Click and Developer Tools
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === 'u' || e.ctrlKey && e.shiftKey && e.key === 'I' || e.key === "F12") {
      e.preventDefault();
      alert("Developer tools are disabled!");
  }
});
