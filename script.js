const ACCESS_KEY = 'S60S8cNmuvOSWKM5atvn8JLhila4FDGUg0MX_Hd5VH0'
const pictureCount = 30
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${pictureCount}`

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photoUrls = []

const addPhotoToPage = (photo) => {
  let link = document.createElement('a')
  let img = document.createElement('img')
  link.href = photo.links.html
  link.target = "_blank"
  img.src = photo.urls.regular
  img.alt = photo.alt_description
  img.title = photo.alt_description
  img.href
  link.appendChild(img)
  imageContainer.appendChild(link)
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

let isScrolled=false;

const infiniteScroll = () => {
  // End of the document reached?
  if (imageContainer.scrollHeight>4000 && window.scrollY > (imageContainer.scrollHeight - 4000) && !isScrolled) {
    // Set “isScrolled” to “true” to prevent further execution
    isScrolled = true;
    getPhotos()
    // After 1 second the “isScrolled” will be set to “false” to allow the code inside the “if” statement to be executed again
    setTimeout(() => {
    isScrolled = false;
    }, 2000);
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
