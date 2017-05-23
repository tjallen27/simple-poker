console.log('JS Loaded');

// Generate a random card
function getRandomCard() {
  var hand = [];
  while(hand.length < 5){
    var randomNumber = Math.ceil(Math.random()*13);
    if(hand.indexOf(randomNumber) > -1) continue;
    hand[hand.length] = randomNumber;
  }

  // Get the sum of the 5 cards
  function getSum(a, b){
    return a + b;
  }
  console.log(hand.reduce(getSum));
  console.log(hand);

  hand.sort(function(a, b){
    return a - b;
  });

  return hand.join(',').replace(/,/g, ' | ').split().sort();
}

function specialCards (randomNumber){
  let card;

  // set: 1-Ace, 12-Jack, 13-Queen, 14-King
  switch (randomNumber){
    case 12:
      card = 'Jack';
      break;
    case 13:
      card = 'Queen';
      break;
    case 14:
      card = 'King';
      break;
    case 1:
      card = 'Ace';
      break;
    default:
      card = randomNumber;
  }
  return card;
}

function playGame () {

    //get card numbers
  let player = getRandomCard(),
    computer = getRandomCard(),

    //check to see if the player won or if there is a tie game
    winnerIsPlayer = player > computer,
    tieGame = player === computer,

    //begin building html
    cardImage = '<div class="card-image">',
    cardNumberDiv = '<div class="cardNumber">',
    tieDiv = '</div><div class="winner">Tie</div>',
    winnerDiv = '</div><div class="winner">Winner!</div>';

    //check for special Cards
  player = specialCards(player);
  computer = specialCards(computer);

    //update HTML with card, text && increase score
  if (winnerIsPlayer){
    scorePlayer++;
    $('#card1').html(cardNumberDiv + player + winnerDiv + cardImage);
    $('#card2').html(cardNumberDiv + computer + '<br><br></div>' + cardImage);

  } else if (!tieGame) {
    scoreComputer++;
    $('#card1').html(cardNumberDiv + player + '<br><br></div>' + cardImage);
    $('#card2').html(cardNumberDiv + computer + winnerDiv + cardImage);

  } else {
    $('#card1').html(cardNumberDiv + player + tieDiv + cardImage);
    $('#card2').html(cardNumberDiv + computer + tieDiv + cardImage);
  }

  //display updated score
  $('#scoreComputer').text(scoreComputer);
  $('#scorePlayer').text(scorePlayer);

  if (scorePlayer > scoreComputer){
    document.getElementById('scorePlayer').style.color = 'green';
    document.getElementById('scoreComputer').style.color = 'red';
  } else {
    document.getElementById('scoreComputer').style.color = 'green';
    document.getElementById('scorePlayer').style.color = 'red';
  }
}

let scorePlayer = 0,
  scoreComputer = 0;

$('#dealCards').click(playGame);
