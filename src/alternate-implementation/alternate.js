import './style.css';

const players = document.querySelector('.players');
const refreshBtn = document.querySelector('.btn-refresh');
const playerName = document.getElementById('playerName');
const playerScore = document.getElementById('playerScore');
const addScore = document.getElementById('addScore');

const addNewScore = async (event) => {
  event.preventDefault();
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tV0qQc99xs0jNy5lTQLw/scores/',
    {
      method: 'POST',
      body: JSON.stringify({
        user: playerName.value,
        score: Number(playerScore.value),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  playerName.value = '';
  playerScore.value = '';
  return response;
};

const refreshScores = async () => {
  players.innerHTML = '';
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tV0qQc99xs0jNy5lTQLw/scores/',
  )
    .then((response) => response.json())
    .then((json) => {
      json.result.forEach((element) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = `${element.user}: ${element.score}`;
        li.appendChild(p);
        players.appendChild(li);
      });
    });
  return response;
};
refreshScores();
addScore.addEventListener('click', addNewScore);
refreshBtn.addEventListener('click', refreshScores);