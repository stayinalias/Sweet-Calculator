/* -------------------------------------------------------------
 * app.js – Calculator logic + game unlock
 * ------------------------------------------------------------- */
const calcOutput = document.getElementById('calc-output');
const cdBtn = document.getElementById('cd-btn');
const gameSection = document.getElementById('games');
const gameList = document.getElementById('game-list');
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const eqButton = document.querySelector('.eq');
const delButton = document.querySelector('.del');

let currentExpression = '';
let isUnlocked = false;

// ---------- Calculator helpers ----------
function updateDisplay(val) {
  calcOutput.value = val;
}

numButtons.forEach(btn => btn.addEventListener('click', () => {
  if (!isUnlocked) {
    currentExpression += btn.textContent;
    updateDisplay(currentExpression);
  }
}));

opButtons.forEach(btn => btn.addEventListener('click', () => {
  if (!isUnlocked) {
    currentExpression += btn.textContent;
    updateDisplay(currentExpression);
  }
}));

eqButton.addEventListener('click', () => {
  if (!isUnlocked) {
    try {
      const res = eval(currentExpression);
      updateDisplay(res);
      currentExpression = res.toString();
    } catch {
      updateDisplay('Error');
      currentExpression = '';
    }
  }
});

delButton.addEventListener('click', () => {
  if (!isUnlocked) {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay(currentExpression);
  }
});

// ---------- CD button unlock ----------
cdBtn.addEventListener('click', () => {
  if (isUnlocked) return; // Already unlocked

  // Ask user for code
  const code = prompt('Enter the secret code:');
  if (code === null) return; // Cancelled

  if (code.trim() === '9999') {
    unlockGames();
  } else {
    alert('Incorrect code. Try again.');
  }
});

function unlockGames() {
  isUnlocked = true;
  // Show game list
  gameSection.classList.remove('hidden');
  // Load games from JSON
  fetch('games.json')
    .then(r => r.json())
    .then(games => {
      gameList.innerHTML = ''; // clear
      games.forEach(g => {
        const li = document.createElement('li');
        li.style.marginBottom = '12px';

        // Image preview (fallback if missing)
        if (g.image) {
          const img = document.createElement('img');
          img.src = g.image;
          img.alt = g.title;
          img.style.width = '60px';
          img.style.verticalAlign = 'middle';
          img.style.marginRight = '8px';
          li.appendChild(img);
        }

        const link = document.createElement('a');
        link.href = g.link;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = g.title;
        link.style.fontSize = '1.1rem';
        link.style.color = '#0af';

        li.appendChild(link);
        gameList.appendChild(li);
      });
    })
    .catch(err => console.error('Could not load games:', err));
}

/* ---------- Optional: Random AI names for multiplayer games ----------
 *  If you want to display AI opponents, you can call this function:
 *  generateGamertag() → returns a random name
 * ------------------------------------------------------------------- */
const firstNames = ['Ace', 'Nova', 'Pixel', 'Jazzy', 'Slick', 'Zelda', 'Milo', 'Nora', 'Rex', 'Luna'];
const lastNames = ['Blaze', 'Storm', 'Shadow', 'Knight', 'Rogue', 'Phoenix', 'Spark', 'Dash', 'Glitch', 'Vortex'];

function generateGamertag() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return ${first}${last};
}

// Example usage (you can inject this into your game UI if needed)
// console.log(generateGamertag()); // e.g., "NovaRogue"
