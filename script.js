/** @format */
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
totalImages = 0;
let photosArray = [];
// Unsplash Api
const imageCount = 5;
const apiKey = "UxXYqqTO4gEQsW4fCXFLi7XvQE0vZetdrAQ9HokoxrE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// check if all the images has loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// diisplay photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");

        // create image for photos
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);

        // event listner, check when each is finished loading
        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos();
    } catch (error) {
        // catch error
    }
}

// check to see if scrolling at the bottom of the page, load more photos
window.addEventListener("scroll", () => {
    // console.log("scrolling to bottom");
    // when bottom 1000px is remaining
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});
// onload
getPhotos();
