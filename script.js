/** @format */
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
// Unsplash Api
const imageCount = 10;
const apiKey = "UxXYqqTO4gEQsW4fCXFLi7XvQE0vZetdrAQ9HokoxrE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// diisplay photos
function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");

        // create image for photos
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);

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

// onload
getPhotos();
