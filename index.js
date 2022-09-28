import getImages from './unsplashData.js'
import getID from './unsplash.js'

// JavaScript Document
// Carousel
const carousel = document.querySelector(".carousel")
// const cards = document.querySelectorAll(".card")
// const contents = document.querySelectorAll(".card-content")

// for each item in unsplashData, create a card
// and add it to the carousel
const unsplashData = await getImages(YOUR_ACCESS_KEY, 100)
console.log(unsplashData)
unsplashData.forEach((image, index) => {
    const card = document.createElement("div")
    card.classList.add("card")
    
    const content = document.createElement("div")
    content.classList.add("card-content")
    content.style.backgroundImage = `url(${image.urls.regular})`
    content.innerHTML = `
        <div class="unsplash-img-info">
            <p class="unsplash-img-location">${image.location.name === null ? "" : image.location.name}</p>
            <p class="unsplash-author-name">
                By: ${image.user.name}
                <a class="unsplash-author-link" href="${image.user.links.html}" target="_blank">View Profile</a>
            </p>
        </div>
    `

    card.appendChild(content)
    carousel.appendChild(card)
})

const cards = document.querySelectorAll(".card")
const contents = document.querySelectorAll(".card-content")

const prev = document.querySelector(".prev")
const next = document.querySelector(".next")

const radius = Math.round(270 / Math.tan(Math.PI / cards.length))
const theta = 270 / (cards.length - 1)

let current_card = 0
let previous_card = 1
let start_position = 315
let card_num = 0
let transZ = 0

function reset_rotaton () {
    if (window.innerWidth < 800) {
        transZ = 250
    } else if (window.innerWidth < 1000) {
        transZ = 300
    } else if (window.innerWidth < 1200) {
        transZ = 350
    } else {
        transZ = 400
    }
    rotate_carousel()
}

function rotate_carousel() {
  let offset = current_card
  let degrees = start_position
  
  cards[previous_card].style.transition = `10ms`

  for(let i = 0; i < cards.length; i++) {
    let index = (i + offset) % cards.length
    cards[current_card].style.transform = `rotateY(-45deg) translateZ(${transZ}px) rotateY(90deg)`   
    cards[index].style.transform = `rotateY(${degrees}deg) translateZ(${transZ}px) rotateY(90deg)`
    degrees -= theta
    
    let midpoint = current_card + (Math.floor(cards.length / 2))
    if (midpoint > cards.length) {
        midpoint -= cards.length
    }
    let highpoint = midpoint + (Math.floor(cards.length / 2) - 1)
    let lowpoint = (previous_card -1 !== -1) ? previous_card - 1 : 0
    if (index >= midpoint && index <= highpoint) {
      contents[index].style.transform = `scaleX(-1)`
    } else if (index < lowpoint) {
      contents[index].style.transform = `scaleX(-1)`
    } else {
      contents[index].style.transform = `scaleX(1)`
    }
  }

  reset_transition()
}

function init_carousel() {
//  contents.forEach((content, index) => {
//    content.textContent = card_num
//    card_num++
//  })
  reset_rotaton()
}

next.addEventListener("click", (event) => {
  previous_card = current_card;
  current_card--;
  (current_card == -1) ? current_card = cards.length - 1 : current_card = current_card
  rotate_carousel()
})

prev.addEventListener("click", (event) => {
  current_card++;
  previous_card = current_card;
  (current_card == cards.length) ? current_card = 0 : current_card = current_card
  rotate_carousel()
})

async function reset_transition() {
  await new Promise(resolve => setTimeout(resolve, 5));
  cards[previous_card].style.transition = `1s`
}


// next and prev addEventListeners on user scrolling 
window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    previous_card = current_card;
    current_card--;
    (current_card == -1) ? current_card = cards.length - 1 : current_card = current_card
    rotate_carousel()
  } else {
    current_card++;
    previous_card = current_card;
    (current_card == cards.length) ? current_card = 0 : current_card = current_card
    rotate_carousel()
  }
})

// next and prev addEventListeners on user touch
window.addEventListener("touchstart", (event) => {
    if (event.touches[0].clientX < window.innerHeight / 2) {
         current_card++;
        previous_card = current_card;
        (current_card == cards.length) ? current_card = 0 : current_card = current_card
        rotate_carousel()
    } else {
        previous_card = current_card;
        current_card--;
        (current_card == -1) ? current_card = cards.length - 1 : current_card = current_card
        rotate_carousel()
    }
    }
)

init_carousel()

// on window resize, reset the rotation
window.addEventListener("resize", (event) => {
    reset_rotaton()
})
