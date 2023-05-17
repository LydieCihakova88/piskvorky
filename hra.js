import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';
let currentPlayer = 'circle';

const vsechnaHerniPolicka = document.querySelectorAll('.game button');

const picturePlayer = document.querySelector('img');

const zpracujKlikNaPolicko = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    picturePlayer.src = 'cross.svg';
    answer();
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

//přidání fetch
const answer = () => {
  btns.forEach((button) => {
    button.disabled = true;
  });

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
  fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      board: vytvorHerniPole,
      player: 'x',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { x, y } = data.position;
      const index = x + y * 10;
      btns.forEach((button) => {
        if (
          button.classList.contains('board__field--cross') ||
          button.classList.contains('board__field--circle')
        ) {
          button.disabled = true;
        } else {
          button.disabled = false;
        }
      });

      btns[index].click();
    });
};

//Window refresh
const restart = (event) => {
  if (window.confirm('Opravdu chceš začít znovu?')) {
    location.reload();
  } else {
    event.preventDefault();
  }
};
document.querySelector('.restart-btn').addEventListener('click', restart);

//Adding event listener to all buttons
document.querySelectorAll('.playBtn').forEach((button) => {
  button.addEventListener('click', selectButton);
});
