const startBtn = document.getElementById("startBtn");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const gameContainer = document.getElementById("gameContainer");
const colors = document.querySelectorAll(".color-box");

const correctPassword = "CH4NCH3Z";  // Cambia esta contraseña si lo deseas
let colorSequence = [];
let userSequence = [];
let round = 0;

function startGame() {
    if (passwordInput.value !== correctPassword) {
        message.textContent = "Contraseña incorrecta.";
        gameContainer.style.display = "none";  // Oculta el juego si la contraseña es incorrecta
        return;
    }

    // Mostrar el juego si la contraseña es correcta
    gameContainer.style.display = "block"; 
    message.textContent = "¡Juego iniciado! Memorizando secuencia...";
    round = 0;
    colorSequence = [];
    userSequence = [];
    nextRound();
}

function nextRound() {
    round++;
    userSequence = [];
    if (round > 10) {
        message.textContent = "¡Felicidades! La proxima contraseña es 1402, haz click en una de las estrellas para continuar.";
        gameContainer.style.display = "none";  // Oculta el juego al finalizar
        return;
    }

    colorSequence.push(generateRandomColor());
    displaySequence();
}

function generateRandomColor() {
    const colorsArray = ["red", "green", "blue", "yellow"];
    return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

function displaySequence() {
    let index = 0;
    const interval = setInterval(() => {
        const color = colorSequence[index];
        highlightColor(color);
        index++;

        if (index === colorSequence.length) {
            clearInterval(interval);
            message.textContent = "Tu turno. Repite la secuencia.";
        }
    }, 1000);
}

function highlightColor(color) {
    const colorBox = document.getElementById(color);
    colorBox.classList.add("active");
    setTimeout(() => colorBox.classList.remove("active"), 500);
}

colors.forEach(colorBox => {
    colorBox.addEventListener("click", () => {
        const color = colorBox.id;
        userSequence.push(color);

        highlightColor(color);
        checkUserSequence();
    });
});

function checkUserSequence() {
    const lastIndex = userSequence.length - 1;

    if (userSequence[lastIndex] !== colorSequence[lastIndex]) {
        message.textContent = "¡Perdiste! La secuencia era: " + colorSequence.join(", ");
        gameContainer.style.display = "none";  // Oculta el juego si se pierde
        return;
    }

    if (userSequence.length === colorSequence.length) {
        message.textContent = "¡Correcto! Avanzando a la siguiente ronda...";
        setTimeout(nextRound, 1000);
    }
}

startBtn.addEventListener("click", startGame);