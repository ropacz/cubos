const box = document.querySelector('.box')
const button = document.querySelectorAll('.container button')


function gerarNumeroInteiroAleatorio(min, max) {
	// número fracionário aleatório maior ou igual a 0 e menor que 1
	const aleatorioDeBase = Math.random();
	// número fracionário aleatório maior ou igual a 0 e menor que (max - min + 1)
	const aleatorioFracionario = Math.random() * (max - min + 1);
	// número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
	// Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
	const aleatorioInteiro = Math.trunc(aleatorioFracionario);
	// número inteiro aleatório maior ou igual a min e menor ou igual a max
	return min + aleatorioInteiro;
}

function gerarCorAleatoria() {
	const vermelho = gerarNumeroInteiroAleatorio(0, 255);
	const verde = gerarNumeroInteiroAleatorio(0, 255);
	const azul = gerarNumeroInteiroAleatorio(0, 255);

	return "rgb(" + vermelho + ", " + verde + ", " + azul + ")";
}

function escolherElementoAleatorio(array) {
	return array[gerarNumeroInteiroAleatorio(0, array.length - 1)]
}

////
let acerto = 0

function incializar() {
	let colors = []
	colors.push(
		gerarCorAleatoria(),
		gerarCorAleatoria(),
		gerarCorAleatoria()
	)	
	box.style["background-color"] = escolherElementoAleatorio(colors)
	button[0].innerText = colors[0]
	button[1].innerText = colors[1]
	button[2].innerText = colors[2]

	if(acerto === 10){
		ganhou()
	}

}

function ganhou() {
	alert('Você venceu!')
}


for (let i = 0; i < button.length; i++) {
	button[i].addEventListener("click", () => {
		if (box.style["background-color"] === button[i].innerText) {
			console.log("Você acertou!")
			acerto++
		} else {
			console.log("Você errou!")
		}
		incializar()
	})
}




incializar()