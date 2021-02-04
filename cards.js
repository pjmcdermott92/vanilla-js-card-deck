import Deck from './deck.js'

const cardDeck = document.querySelector('[data-card-deck]')
const cardSlot = document.querySelector('[data-card-slot]')
const message = document.querySelector('[data-message]')
const flipEffectEl = document.querySelector('[data-flip]')
const cardCount = document.querySelector('[data-cards-count]')

let deckOfCards, inRound, allowFlip, stop

cardDeck.addEventListener('click', () => {
    if (stop) {
        brandNewDeck()
        return
    }
    animateCardFlip()
})

brandNewDeck()

function animateCardFlip() {
    if (inRound) {
        allowFlip = false
        flipEffectEl.classList.add('flip')
        setTimeout(() => {
            cleanBeforeDeal()
            dealCard()
            flipEffectEl.classList.remove('flip')
        }, 200)
    } else {
        flipEffectEl.classList.add('flip')
        setTimeout(() => {
            dealCard()
            flipEffectEl.classList.remove('flip')
        }, 200)
    }
}

function brandNewDeck() {
    deckOfCards = new Deck()
    deckOfCards.shuffle()
    stop = false
    cleanBeforeDeal()
    cardDeck.classList.add('full-deck')
    cardDeck.classList.add('is-cards')
    message.innerHTML = 'Click on the stack of cards to deal a new card.'
    countDealtCards()
}

function cleanBeforeDeal() {
    inRound = false
    allowFlip = true
    cardSlot.innerHTML = ''
}

function dealCard() {
    if (!allowFlip) return
    inRound = true
    const currentCard = deckOfCards.pop()
    cardSlot.appendChild(currentCard.createHtml())
    countDealtCards()
    isDeckEmpty()
}

function isDeckEmpty() {
    if (deckOfCards.numberOfCards === 0) {
        stop = true
        cardDeck.classList.remove('is-cards')
        message.innerText = 'Click on the empty deck to shuffle a new deck of cards.'
    }
}

function countDealtCards() {
    cardCount.innerText = deckOfCards.numberOfCards
    const card = cardSlot.querySelector('div')
    if (deckOfCards.numberOfCards < 51) {
        card.classList.add('full-deck')
    }
    if (deckOfCards.numberOfCards < 2) {
        cardDeck.classList.remove('full-deck')
    }
}