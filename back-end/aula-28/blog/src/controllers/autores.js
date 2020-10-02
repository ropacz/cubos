const { formatarErro, formatarSucesso } = require('./formatar');
const autores = require('../repositories/autores');
const posts = require('../repositories/posts');

/**
 * Função retorna todos os autores.
 */
const obterAutores = (ctx) => {
	const dados = autores.filter((autor) => !autor.deletado);
	formatarSucesso(ctx, dados, 200);
};
/**
 * Função retorna apenas um autor.
 * Necessário passar na função o ID do autor.
 */
const obterAutor = (ctx) => {
	const { id } = ctx.params;

	const dados = autores.filter((autor) => autor.id == id && !autor.deletado);
	formatarSucesso(ctx, dados, 200);
};

/**
 * Funcão adiciona um novo autor.
 * Necessário enviar nome, sobrenome, email e senha no corpo da requisição.
 */
const adicionarAutor = (ctx) => {
	const { body } = ctx.request;

	if (!body.nome || !body.sobrenome || !body.email || !body.senha) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	const autor = {
		id: autores.length + 1,
		nome: body.nome,
		sobrenome: body.sobrenome,
		email: body.email,
		senha: body.senha,
		deletado: false,
	};

	autores.push(autor);

	formatarSucesso(ctx, autor, 201);
};

/**
 * Função atualiza um autor existente.
 * Necessário passar na função o ID do autor.
 * Necessário enviar nome, sobrenome, email e senha no corpo da requisição.
 */
const atualizarAutor = (ctx) => {
	const { id } = ctx.params;
	const { body } = ctx.request;

	if (!body.nome && !body.sobrenome && !body.email && !body.senha) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			const autorAtualizado = {
				id: Number(id),
				nome: body.nome ? body.nome : autorAtual.nome,
				sobrenome: body.sobrenome
					? body.sobrenome
					: autorAtual.sobrenome,
				email: body.email ? body.email : autorAtual.email,
				senha: body.senha ? body.senha : autorAtual.senha,
				deletado: autorAtual.deletado,
			};

			autores[id - 1] = autorAtualizado;

			formatarSucesso(ctx, autorAtualizado, 200);
		}
	} else {
		formatarErro(ctx, 'Autor não encontrado', 404);
	}
};

/**
 * Funcão retorna todos os posts do autor.
 * Necessário passar na função o ID do autor.
 */
const obterPostsDeAutor = (autorId) => {
	const postsDoAutor = posts.filter((post) => {
		return post.autor == autorId && post.deletado === false;
	});

	return postsDoAutor;
};

/**
 * Funcão deleta um autor para isso muda a estado deletado para true.
 * Necessário enviar o estado no corpo da requisição.
 */
const deletarAutor = (ctx) => {
	const { id } = ctx.params;
	const { body } = ctx.request;

	if (typeof body.estado !== 'boolean') {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			if (body.estado === true && obterPostsDeAutor(id).length > 0) {
				formatarErro(ctx, 'Ação proibida', 403);
				return;
			}

			const autorAtualizado = {
				id: autorAtual.id,
				nome: autorAtual.nome,
				sobrenome: autorAtual.sobrenome,
				email: autorAtual.email,
				senha: autorAtual.senha,
				deletado: body.estado,
			};

			autores[id - 1] = autorAtualizado;

			formatarSucesso(ctx, autorAtualizado, 200);
		}
	} else {
		formatarErro(ctx, 'Usuário não encontrado', 404);
	}
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	obterPostsDeAutor,
	atualizarAutor,
	deletarAutor,
};
