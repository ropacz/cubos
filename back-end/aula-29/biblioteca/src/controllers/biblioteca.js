const biblioteca = require('../repositories/biblioteca');

const obterLivros = async (ctx) => {
	const { autor = null, deletado = false } = ctx.query;

	const estado = deletado === 'true';

	const livros = await biblioteca.obterLivros();

	if (!autor) {
		ctx.body = livros.filter((livro) => livro.deletado === estado);
		return;
	}

	ctx.body = livros.filter(
		(livro) => livro.deletado === estado && livro.autor === autor
	);
};

const obterLivro = async (ctx) => {
	const { id = null } = ctx.params;

	if (!id) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}

	const livro = await biblioteca.obterLivro(id);

	if (livro) {
		ctx.body = { livro };
		return;
	}

	ctx.status = 404;
	ctx.body = { livro: null };
};

const adicionarLivros = async (ctx) => {
	await biblioteca.criarBiblioteca();
	const { titulo = null, autor = null } = ctx.request.body;

	if (!titulo || !autor) {
		ctx.status = 400;
		ctx.body = 'error';
		return;
	}

	const novoLivro = { titulo, autor };
	const livro = await biblioteca.adicionarLivro(novoLivro);

	ctx.status = 201;
	ctx.body = livro;
};

module.exports = { obterLivros, obterLivro, adicionarLivros };
