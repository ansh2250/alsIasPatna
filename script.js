
function scrollToTop() {
    window.scrollTo(0, 0);
  }

  window.onload = function() {
    scrollToTop();
  };

  AOS.init({
    offset: 120,
    duration: 1000
});

var players = [];

function onYouTubeIframeAPIReady() {
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe, index) {
        var player = new YT.Player(iframe, {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        players[index] = player;
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        players.forEach(function(player, index) {
            if (player != event.target) {
                player.pauseVideo();
            }
        });
    }
}

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
});



  // gallery page

  document.addEventListener('DOMContentLoaded', function () {
    // Initial setup
    const galleryItems = document.querySelectorAll('.gallery li');
    const lessButton = document.querySelector('.less');
    const moreButton = document.querySelector('.more');
    const lightbox = document.getElementById('lightbox');
    const fullImage = document.getElementById('fullImage');
    const closeBtn = document.getElementById('closeBtn');
    const images = document.querySelectorAll('.logo-gallery img');
    
    let items = 9;
    let shown = 3;

    // Show initial gallery items
    for (let i = 0; i < shown; i++) {
        if (galleryItems[i]) {
            galleryItems[i].style.display = 'list-item';
        }
    }
    lessButton.style.display = 'none';

    // Event listener for "more" button
    moreButton.addEventListener('click', function () {
        lessButton.style.display = 'block';
        shown = Array.from(galleryItems).filter(item => item.style.display === 'list-item').length + 3;

        if (shown < items) {
            for (let i = 0; i < shown; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].style.display = 'list-item';
                }
            }
        } else {
            for (let i = 0; i < items; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].style.display = 'list-item';
                }
            }
            moreButton.style.display = 'none';
        }
    });

    // Event listener for "less" button
    lessButton.addEventListener('click', function () {
        for (let i = 3; i < galleryItems.length; i++) {
            galleryItems[i].style.display = 'none';
        }
        moreButton.style.display = 'block';
        lessButton.style.display = 'none';
    });

    // Lightbox functionality
    let currentIndex = 0;

    // Click event for images
    images.forEach((image, index) => {
        image.addEventListener('click', function () {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    function showImage(index) {
        const src = images[index].src;
        fullImage.src = src;
        fullImage.style.opacity = 0; // Set opacity to 0 for smooth transition
        lightbox.style.display = 'block'; // Show the lightbox
        setTimeout(() => {
            fullImage.style.opacity = 1; // Fade in effect
        }, 10);
    }

    // Close lightbox
    closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', function () {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    });
});




//FAIZAN JS code underneath         FAIZAN JS code underneath           FAIZAN JS code underneath           FAIZAN JS code underneath           FAIZAN JS code underneath           FAIZAN JS code underneath           


// Select all 'Read More' buttons and 'list-hide' elements
const btnMoreList = document.querySelectorAll('.btn-more');
const listHideList = document.querySelectorAll('.list-hide');

// Attach click event to each 'Read More' button
btnMoreList.forEach((btnMore, index) => {
  btnMore.addEventListener('click', function () {
    const listHide = listHideList[index]; // Select the corresponding 'list-hide' element
    
    if (listHide.style.display === "block") {
      listHide.style.display = "none";
      btnMore.textContent = "Read More"; // Change button text to "Read More"
    } else {
      listHide.style.display = "block";
      btnMore.textContent = "Read Less"; // Change button text to "Read Less"
    }
  });
});



// Disable Right Click for user to  prevent to see code.
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disabling Ctrl + U shortcut button to prevent to see code.
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      alert("Viewing source is disabled!");
  }
});

// Disabling Ctrl + Shift + I shortcut button to prevent to see code.
document.addEventListener("keydown", function (e) {
  // Disable Ctrl + Shift + I
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      alert("Developer tools are disabled!");
  }
  // Disable F12 (another way to open DevTools) 
  if (e.key === "F12") {
      e.preventDefault();
      alert("Developer tools are disabled!");
  }
});