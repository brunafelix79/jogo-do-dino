const coragem = document.querySelector('.coragem');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          coragem.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      coragem.style.bottom = position + 'px';
    }
  }, 20);
}

function createCacto() {
  const cacto = document.createElement('div');
  let cactoPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cacto.classList.add('cacto');
  background.appendChild(cacto);
  cacto.style.left = cactoPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactoPosition <- 60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cacto);
    } else if (cactoPosition > 0 && cactoPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactoPosition -= 10;
      cacto.style.left = cactoPosition + 'px';
    }
  }, 20);

  setTimeout(createCacto, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
