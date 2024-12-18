// Select the grid and message elements
const grid = document.querySelector('.grid');
const message = document.querySelector('.message');

// Card data (pairs of numbers)
const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
const cards = [...cardValues, ...cardValues]; // Duplicate for pairs

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

// Track the game state
let flippedCards = [];
let matchedPairs = 0;

// Create cards
cards.forEach((value) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value; // Store the card value for matching
  card.textContent = ''; // Initially hidden
  grid.appendChild(card);

  // Add click event to each card
  card.addEventListener('click', () => {
    // Ignore clicks on already matched cards or when two cards are flipped
    if (card.classList.contains('face-up') || flippedCards.length === 2) return;

    // Flip the card
    card.classList.add('face-up');
    card.textContent = value;
    flippedCards.push(card);

    // Check for a match
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  });
});

// Check if two flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    // Match found
    card1.classList.add('hidden');
    card2.classList.add('hidden');
    matchedPairs++;
    flippedCards = [];

    // Check for game over
    if (matchedPairs === cardValues.length) {
      message.classList.remove('hidden');
    }
  } else {
    // No match, flip cards back
    setTimeout(() => {
      card1.classList.remove('face-up');
      card2.classList.remove('face-up');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}
