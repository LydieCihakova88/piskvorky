import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';
let currentPlayer = 'circle';

const vsechnaHerniPolicka = document.querySelectorAll('.game button');

const picturePlayer = document.querySelector('img');

const zpracujKlikNaPolicko = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    picturePlayer.src = 'cross.svg';
  } else {
    event.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    picturePlayer.src = 'circle.svg';
  }

  const herniPole = vytvorHerniPole();

  zjistiViteze(herniPole);
};

vsechnaHerniPolicka.forEach((policko) => {
  policko.addEventListener('click', zpracujKlikNaPolicko);
});

const zjistiViteze = (herniPole) => {
  const winner = findWinner(herniPole);
  if (winner === 'x') {
    setTimeout(() => {
      alert('Vyhrál křížek!');
      location.reload();
    }, 200);
  } else if (winner === 'o') {
    setTimeout(() => {
      alert('Vyhrálo kolečko!');
      location.reload();
    }, 200);
  } else if (winner === 'tie') {
    setTimeout(() => {
      alert('Hra skončila nerozhodně.');
      location.reload();
    }, 200);
  }
};

const vytvorHerniPole = () => {
  const polePolicek = Array.from(vsechnaHerniPolicka);
  return polePolicek.map((button) => {
    if (button.classList.contains('board__field--circle')) {
      return 'o';
    }
    if (button.classList.contains('board__field--cross')) {
      return 'x';
    }

    return '_';
  });
};
