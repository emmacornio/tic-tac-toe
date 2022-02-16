const body = document.getElementById("body");
const main = document.getElementById("main");
const gato = document.getElementById("gato");
const footer = document.getElementById("footer");
const startGameBtn = document.getElementById("startGame");
const playerOne = document.getElementById("jugadorUno");
const playerTwo = document.getElementById("jugadorDos");
const restartGameBtn = document.getElementById("restartGameBtn");
const line = document.getElementById("line");
let currentUser;
let counter = 0;
window.addEventListener("load", () => {
	creaCuadricula();
	line.style.top = `0px`;
	line.style.left = `0px`;
	line.style.transform = `rotate(0deg)`;
	line.style.visibility = "hidden";
});
startGameBtn.addEventListener("click", () => {
	startGame();
});
restartGameBtn.addEventListener("click", () => {
	restartGame();
});
function startGame() {
	line.style.visibility = "hidden";
	turno("jugadorUno");
	counter = 0;
}
function turno(newUser) {
	currentUser = newUser;
	if (currentUser == "jugadorUno") {
		playerOne.style.backgroundColor = "#DFE7FD";
		playerTwo.style.backgroundColor = "white";
	} else if (currentUser == "jugadorDos") {
		playerTwo.style.backgroundColor = "#fad2e1";
		playerOne.style.backgroundColor = "white";
	}

	console.log(counter);
}

function creaCuadricula() {
	for (let i = 1; i <= 9; i++) {
		const cuadro = document.createElement("div");
		cuadro.className = "cuadro circulo equis vacio";
		cuadro.classList.toggle("circulo");
		cuadro.classList.toggle("equis");
		cuadro.addEventListener("click", () => dibuja(cuadro));
		cuadro.textContent = `${i - 1}`;
		gato.appendChild(cuadro);
		console.log("cuadro creado");
	}
	gato.style.cssText =
		"grid-template-columns:repeat(3, 1fr);grid-template-rows:repeat(3, 1fr)";
}
function dibuja(cuadro) {
	if (
		cuadro.textContent === "X" ||
		cuadro.textContent === "O" ||
		cuadro.textContent === " "
	) {
		return;
	}
	counter++;
	if (currentUser == "jugadorUno") {
		cuadro.classList.toggle("vacio");
		cuadro.classList.toggle("circulo");
		turno("jugadorDos");
		cuadro.textContent = `O`;
	} else if (currentUser == "jugadorDos") {
		cuadro.classList.toggle("equis");
		cuadro.classList.toggle("vacio");
		cuadro.textContent = `X`;
		turno("jugadorUno");
	}
	checkForVictory();
}

function checkForVictory() {
	console.log(gato.children[counter - 1]);
	switch (true) {
		case gato.children[0].textContent === gato.children[1].textContent &&
			gato.children[1].textContent === gato.children[2].textContent:
			console.log("primera linea");
			showLine(50, 0, 0);
			endGame(gato.children[0].textContent);
			break;
		case gato.children[3].textContent === gato.children[4].textContent &&
			gato.children[4].textContent === gato.children[5].textContent:
			console.log("segunda linea");
			showLine(150, 0, 0);
			endGame(gato.children[3].textContent);
			break;
		case gato.children[6].textContent === gato.children[7].textContent &&
			gato.children[7].textContent === gato.children[8].textContent:
			console.log("tercera linea");
			showLine(250, 0, 0);
			endGame(gato.children[6].textContent);
			break;
		case gato.children[0].textContent === gato.children[3].textContent &&
			gato.children[3].textContent === gato.children[6].textContent:
			console.log("cuarta linea");
			showLine(150, -100, 90);
			endGame(gato.children[0].textContent);
			break;
		case gato.children[1].textContent === gato.children[4].textContent &&
			gato.children[4].textContent === gato.children[7].textContent:
			console.log("quinta linea");
			showLine(150, 0, 90);
			endGame(gato.children[1].textContent);
			break;
		case gato.children[2].textContent === gato.children[5].textContent &&
			gato.children[5].textContent === gato.children[8].textContent:
			console.log("sexta linea");
			showLine(150, 100, 90);
			endGame(gato.children[2].textContent);
			break;
		case gato.children[0].textContent === gato.children[4].textContent &&
			gato.children[4].textContent === gato.children[8].textContent:
			console.log("septima linea");
			showLine(145, 0, 45);
			endGame(gato.children[0].textContent);
			break;
		case gato.children[6].textContent === gato.children[4].textContent &&
			gato.children[4].textContent === gato.children[2].textContent:
			console.log("octava linea");
			showLine(145, 0, 135);
			endGame(gato.children[6].textContent);
			break;
		case counter === 9:
			console.log("empate");
			endGame("");
			break;
		default:
			return;
	}
}

function restartGame() {
	for (let i = 0; i < gato.children.length; i++) {
		gato.children[i].textContent = i;
		if (gato.children[i].classList.contains("equis")) {
			gato.children[i].classList.toggle(`equis`);
			gato.children[i].classList.toggle("vacio");
		} else if (gato.children[i].classList.contains("circulo")) {
			gato.children[i].classList.toggle("circulo");
			gato.children[i].classList.toggle("vacio");
		}
	}
	counter = 0;
	startGame();
}

function endGame(ganador) {
	for (const child of gato.children) {
		if (child.textContent !== "X" && child.textContent !== "O") {
			child.textContent = " ";
		}
	}
	if (ganador === "X" || ganador === "O") {
		alert(`Gano ${ganador}`);
	} else {
		alert("Es un Empate");
	}
	counter = 0;
}
function showLine(top, left, deg) {
	line.style.top = `${top}px`;
	line.style.left = `${left}px`;
	line.style.transform = `rotate(${deg}deg)`;
	line.style.visibility = "visible";
}
