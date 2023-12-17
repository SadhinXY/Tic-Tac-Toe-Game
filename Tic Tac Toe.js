const cardElements = document.querySelectorAll('.js-card');
const containerElement = document.querySelector('.js-card-container');
const winingMessageTextElement = document.querySelector('.js-wining-message-text');
const winingMessageContainerElement = document.querySelector('.js-wining-message-container');
const restartButton = document.querySelector('.js-restart-button');
const xMove = 'x';
const circleMove = 'circle';
const WINING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame)

function startGame () {
  circleTurn = false;
  cardElements.forEach(card => {
    card.classList.remove(xMove);
    card.classList.remove(circleMove);
    card.removeEventListener('click', handleClick)
    card.addEventListener('click', handleClick, { once: true })
  });
  cardHover();
  winingMessageContainerElement.classList.remove('show');
}

function handleClick (e) {
  const card = e.target;
  const currentClass = circleTurn ? circleMove : xMove;
  placeMark(card, currentClass);
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    cardHover();
  }
}

function endGame (draw) {
  if (draw) {
    winingMessageTextElement.innerText = 'Draw!'
  } else {
    winingMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winingMessageContainerElement.classList.add('show');
}

function isDraw () {
  return [...cardElements].every(cell => {
    return cell.classList.contains(xMove) || 
    cell.classList.contains(circleMove);
  })
}

function placeMark (card, currentClass) {
  card.classList.add(currentClass);
}

function swapTurns () {
  circleTurn = !circleTurn;
}

function cardHover () {
  containerElement.classList.remove(xMove);
  containerElement.classList.remove(circleMove);

  if (circleTurn) {
    containerElement.classList.add(circleMove)
  } else {
    containerElement.classList.add(xMove)
  }
}

function checkWin(currentClass) {
  return WINING_COMBINATIONS.some(Combination => {
    return Combination.every(index => {
      return cardElements[index].classList.contains(currentClass)
    })
  })
}
