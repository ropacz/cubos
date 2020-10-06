const fs = require('fs');
const util = require('util');

const lerArquivo = util.promisify(fs.readFile);
const escreverArquivo = util.promisify(fs.writeFile);

async function carregarTabela() {
	return lerArquivo('brasileirao.txt');
}

const tabela = [];

const tabelaOrdenadaBrasileirao = async (t) => {
	const ordenar = (a, b) => {
		if (a.pontos < b.pontos) {
			return 1;
		}
		if (a.vitorias < b.vitorias) {
			return 1;
		}
		if (a.saldoDeGols < b.saldoDeGols) {
			return 1;
		}
		if (a.golsFeitos < b.golsFeitos) {
			return 1;
		}
		return a.time.localeCompare(b.time);
	};
	const novaTabela = await t.sort(ordenar);
	escreverArquivo(
		'tabelaOrdenadaBrasileirao.txt',
		JSON.stringify(novaTabela, null, 4)
	);
};

const tabelaEmOrdemAlfabetica = async (t) => {
	const novaTabela = await t.sort((a, b) => a.time.localeCompare(b.time));

	escreverArquivo(
		'tabelaEmOrdemAlfabetica.txt',
		JSON.stringify(novaTabela, null, 4)
	);
};

const tabelaOrdenadaEmEmpates = async (t) => {
	const novaTabela = await t.sort((a, b) => b.empates - a.empates);
	escreverArquivo(
		'tabelaOrdenadaEmEmpates.txt',
		JSON.stringify(novaTabela, null, 4)
	);
};

const tabelaOrdenadaEmSaldoDeGols = async (t) => {
	const novaTabela = await t.sort((a, b) => b.saldoDeGols - a.saldoDeGols);
	escreverArquivo(
		'tabelaOrdenadaEmSaldoDeGols.txt',
		JSON.stringify(novaTabela, null, 4)
	);
};

const tabelaOrdenadaEmGolsSofridos = async (t) => {
	const novaTabela = await t.sort((a, b) => b.golsSofridos - a.golsSofridos);
	escreverArquivo(
		'tabelaOrdenadaEmGolsSofridos.txt',
		JSON.stringify(novaTabela, null, 4)
	);
};

/**
 * Salva a tabela de forma organizada
 */

const salvarNaTabela = (time, pontos, resultado, golsFeitos, golsSofridos) => {
	let empates = 0;
	let vitorias = 0;
	let derrotas = 0;
	const saldoDeGols = golsFeitos - golsSofridos;

	if (resultado === 'empatou') {
		empates = 1;
	} else if (resultado === 'ganhou') {
		vitorias = 1;
	} else {
		derrotas = 1;
	}

	for (let i = 0; i < tabela.length; i++) {
		if (tabela[i].time === time) {
			tabela[i].pontos += pontos;
			tabela[i].partidas += 1;
			tabela[i].empates += empates;
			tabela[i].vitorias += vitorias;
			tabela[i].derrotas += derrotas;
			tabela[i].golsFeitos += golsFeitos;
			tabela[i].golsSofridos += golsSofridos;
			tabela[i].saldoDeGols += saldoDeGols;
			return;
		}
	}

	tabela.push({
		time,
		pontos,
		partidas: 1,
		empates,
		vitorias,
		derrotas,
		golsFeitos,
		golsSofridos,
		saldoDeGols,
	});
};

/**
 * Gera a tabela do Brasileirão
 */
const gerarTabelaDoBrasileirao = async () => {
	const dadosTabela = (await carregarTabela()).toString().split('\n');

	const jogos = dadosTabela.map((linha) => {
		return linha.split('\t');
	});

	const partidas = jogos.map((item) => {
		return {
			timeA: item[0],
			timeB: item[4],
			golsA: parseInt(item[1], 10),
			golsB: parseInt(item[3], 10),
		};
	});

	for (let i = 0; i < partidas.length; i++) {
		const { timeA, timeB, golsA, golsB } = partidas[i];

		if (golsA === golsB) {
			salvarNaTabela(timeA, 1, 'empatou', golsA, golsB);
			salvarNaTabela(timeB, 1, 'empatou', golsB, golsA);
		} else if (golsA > golsB) {
			salvarNaTabela(timeA, 3, 'ganhou', golsA, golsB);
			salvarNaTabela(timeB, 0, 'perdeu', golsB, golsA);
		} else {
			salvarNaTabela(timeA, 0, 'perdeu', golsA, golsB);
			salvarNaTabela(timeB, 3, 'ganhou', golsB, golsA);
		}
	}

	await tabelaOrdenadaBrasileirao(tabela);
	await tabelaEmOrdemAlfabetica(tabela);
	await tabelaOrdenadaEmEmpates(tabela);
	await tabelaOrdenadaEmSaldoDeGols(tabela);
	await tabelaOrdenadaEmGolsSofridos(tabela);
};

gerarTabelaDoBrasileirao();
