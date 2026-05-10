displayVacCardsFromLocalStorage()

const deleteButs = document.querySelectorAll('.delete-card')
for(const deleteBut of deleteButs){
    deleteBut.addEventListener('click', deleteVacCard)
}
const likeButs = document.querySelectorAll('.like-but')
for(const likebut of likeButs){
    likebut.addEventListener('click', addLike)
}

document.querySelector('#card-maker').addEventListener('click', addVacCard)

function starMaker(num) {
    let p = document.createElement('p')
    for(let i = 1; i <= num; i++){
        const star = document.createElement('i')
        star.className = 'bi bi-star-fill'
        p.appendChild(star)
        
    }
    return p
}

function addVacCard() {
    const vacName = document.querySelector('#vac-name').value
    const vacPictLink = document.querySelector('#vac-pict-link').value
    const vacPrice = document.querySelector('#vac-price').value
    const numberOfStars = document.querySelector('#vac-rating').value

    if(!vacName){
        alert('Please enter vacation\'s name')
        return
    }
    if(!vacPictLink){
        alert('Please enter vacation\'s photo')
        return
    }
    if(!vacPrice){
        alert('Please enter price for vacation')
        return
    }
    if(!numberOfStars){
        alert('You forgot to rate it!')
        return
    }

    const cardsContainer = document.querySelector('#cards-container')

    const card = document.createElement('div')
    card.className = 'card col-sm-3 mx-2 mt-2 px-0 text-bg-success'

    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header text-end bg-warning'
    const deleteCardBut = document.createElement('button')
    deleteCardBut.className = 'delete-card btn btn-sm btn-light'
    const deleteButIcon = document.createElement('i')
    deleteButIcon.className = 'bi bi-x-lg'
    deleteCardBut.append(deleteButIcon)
    deleteCardBut.addEventListener('click', deleteVacCard)
    cardHeader.append(deleteCardBut)

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    const vacTitle = document.createElement('h4')
    vacTitle.className = 'card-title'
    vacTitle.innerText = vacName
    const rating = document.createElement('div')
    rating.append(starMaker(numberOfStars))
    const vacImg = document.createElement('img')
    vacImg.src = vacPictLink
    vacImg.alt = 'picture of the vacation'
    vacImg.className = 'card-img img-thumbnail mb-3'
    const priceDiv = document.createElement('div')
    priceDiv.className = 'd-flex justify-content-center'
    const price = document.createElement('h4')
    price.innerText = vacPrice
    const dollarSign = document.createElement('h4')
    dollarSign.innerText = '$'
    priceDiv.append(price, dollarSign)
    cardBody.append(vacTitle, rating, vacImg, priceDiv)

    const cardFooter = document.createElement('div')
    cardFooter.className = 'card-footer d-flex justify-content-start text-bg-warning'
    const likeBut = document.createElement('button')
    likeBut.className = 'like-but btn btn-success btn-sm mb-1'
    const likeIcon = document.createElement('i')
    likeIcon.className = 'bi bi-hand-thumbs-up'
    likeBut.append(likeIcon)
    likeBut.addEventListener('click', addLike)
    const likeAmount = document.createElement('h6')
    likeAmount.className = 'like-amount mt-2 mx-3'
    likeAmount.innerText = 0
    cardFooter.append(likeBut, likeAmount)

    card.append(cardHeader, cardBody, cardFooter)

    cardsContainer.append(card)

    addVacCardToLocalStorage(card)

    document.querySelector('#vac-name').value = ''
    document.querySelector('#vac-pict-link').value = ''
    document.querySelector('#vac-price').value = ''
    document.querySelector('#vac-rating').value = ''


}

function deleteVacCard(event) {
    if(!confirm('If you click OK all of this card information will be lost forever! are you sure you want to delete this card?')){
    }
    const cardToBeDeleted = event.target.closest('.card')
    const cardsContainer = cardToBeDeleted.parentElement
    cardsContainer.removeChild(cardToBeDeleted)

    deleteVacCardFromLocalStorage(cardToBeDeleted)
}

function addVacCardToLocalStorage(element) {
    const oldCounter = parseInt(localStorage.getItem('counter'))
    const counter = oldCounter ? oldCounter + 1 : 1
    element.setAttribute('counter', counter)
    localStorage.setItem('counter', counter)

    let storedVacCards = JSON.parse(localStorage.getItem('cards-list'))
    storedVacCards = storedVacCards ? storedVacCards : {}
    storedVacCards[counter] = element.outerHTML
    localStorage.setItem('cards-list', JSON.stringify(storedVacCards))
}

function deleteVacCardFromLocalStorage(element) {
    let storedVacCards = JSON.parse(localStorage.getItem('cards-list'))
    const counter = element.getAttribute('counter')
    delete storedVacCards[counter]
    localStorage.setItem('cards-list', JSON.stringify(storedVacCards))
}

function displayVacCardsFromLocalStorage() {
    let storedVacCards = JSON.parse(localStorage.getItem('cards-list'))
    if(!storedVacCards){
        return
    }
    const placeholder = document.createElement('div')
    for(const key in storedVacCards){
        placeholder.innerHTML = storedVacCards[key]
        document.querySelector('#cards-container').append(placeholder.firstElementChild)
    }
}

// function addLike(cardLiked) {
//     const cardTolike = cardLiked.target.parentElement.parentElement.parentElement
//     const likeAmount = cardTolike.querySelector('.like-amount')
//     const newLikeAmount = parseInt(likeAmount.innerText) + 1
//     likeAmount.innerText = newLikeAmount
//     let storedVacCards = JSON.parse(localStorage.getItem('cards-list'))
//     localStorage.setItem('cards-list', JSON.stringify(storedVacCards))
// }

function addLike(cardLiked) {
    const cardTolike = cardLiked.target.closest('.card')
    const likeAmount = cardTolike.querySelector('.like-amount')
    const newLikeAmount = parseInt(likeAmount.innerText) + 1
    likeAmount.innerText = newLikeAmount
    addLikeToLocalStorage(cardTolike)
}

function addLikeToLocalStorage(element) {
    let storedVacCards = JSON.parse(localStorage.getItem('cards-list'))
    const cardNum = element.getAttribute('counter')
    const oldlikes = element.getAttribute('likes')
    const likes = oldlikes ? oldlikes + 1 : 1 
    element.setAttribute('likes', likes)
    storedVacCards[cardNum] = element.outerHTML
    localStorage.setItem('cards-list', JSON.stringify(storedVacCards))
}
