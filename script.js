const ACCESS_KEY = getAccessKey()
const pictureCount = 30
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${pictureCount}`

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photoUrls = [];
let isScrolled = false;
let ready = false;
let loadedImages = 0;

const addPhotoToPage = (photo) => {
  loadedImages++
  let link = document.createElement('a')
  let img = document.createElement('img')
  link.href = photo.links.html
  link.target = "_blank"
  img.src = photo.urls.regular
  img.alt = photo.alt_description
  img.title = photo.alt_description
  link.appendChild(img)
  imageContainer.appendChild(link)
  if (loadedImages > 0 && loadedImages%30 === 0) {
    ready = true
  }
}

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl)
    photoUrls = await response.json()
    await photoUrls.map(photo => {
      addPhotoToPage(photo)
    })
  } catch (error) {
    console.log(error)
  }
}

const infiniteScroll = () => {
  // End of the document reached?
  if (imageContainer.scrollHeight>4000 && window.scrollY > (imageContainer.scrollHeight - 4000) && ready) {
    ready = false;
    getPhotos()
  }
}

const loadingPhotos = () => {
  loader.hidden = false;
  imageContainer.hidden = true;
}

const photosLoaded = () => {
  loader.hidden = true;
  imageContainer.hidden = false;
}

window.onscroll = function () {
  infiniteScroll()
}

window.onload = async () => {
  loadingPhotos()
  await getPhotos()
  photosLoaded()
}
