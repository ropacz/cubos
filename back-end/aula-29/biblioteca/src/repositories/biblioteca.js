const db = require('../utils/database');

const dropBiblioteca = async () => {
	return db.query(`DROP TABLE biblioteca;`);
};

const criarBiblioteca = async () => {
	const query = `CREATE TABLE IF NOT EXISTS biblioteca (
		id SERIAL,
		titulo TEXT,
		autor TEXT,
		deletado BOOL DEFAULT FALSE
	)`;

	return db.query(query);
};

const adicionarLivro = async (livro) => {
	const { titulo = null, autor = null, deletado = false } = livro;

	const query = {
		text: `INSERT INTO biblioteca 
		(titulo, autor, deletado)
		VALUES ($1, $2, $3) RETURNING *`,
		values: [titulo, autor, deletado],
	};

	const result = await db.query(query);
	return result.rows;
};

const obterLivro = async (id) => {
	const query = {
		text: `SELECT * FROM biblioteca WHERE id = $1`,
		values: [id],
	};

	const result = await db.query(query);
	return result.rows.shift();
};

const obterLivros = async () => {
	const query = {
		text: `SELECT * FROM biblioteca;`,
	};
	const result = await db.query(query);
	return result.rows;
};

module.exports = {
	dropBiblioteca,
	criarBiblioteca,
	adicionarLivro,
	obterLivro,
	obterLivros,
};
