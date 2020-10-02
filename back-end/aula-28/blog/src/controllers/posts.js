const { formatarErro, formatarSucesso } = require('./formatar');
const autores = require('../repositories/autores');
const posts = require('../repositories/posts');

const { obterPostsDeAutor } = require('./autores');

/**
 * Função retorna todos os posts.
 */
const obterPosts = (ctx) => {
	const { autor } = ctx.query;

	if (autor) {
		const postDoAutor = obterPostsDeAutor(autor);
		if (postDoAutor.length > 0) {
			formatarSucesso(ctx, postDoAutor, 200);
		}
	} else {
		const dados = posts.filter((post) => !post.deletado);
		formatarSucesso(ctx, dados, 200);
	}
};
/**
 * Função retorna apenas um post.
 * Necessário passar na função o ID do post.
 */
const obterPost = (ctx) => {
	let { id } = ctx.params;
	id = parseInt(id, 10);

	const dados = posts.filter((post) => post.id === id && !post.deletado);
	formatarSucesso(ctx, dados, 200);
};

/**
 * Funcão adiciona um novo post.
 * Necessário enviar titulo, conteudo, subtitulo e autor no corpo da requisição.
 */
const adicionarPost = (ctx) => {
	const { body } = ctx.request;

	if (!body.titulo || !body.conteudo || !body.subtitulo || !body.autor) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}
	if (autores[body.autor - 1].deletado === true) {
		formatarErro(ctx, 'Pedido proibido', 403);
		return;
	}

	const novoPost = {
		id: posts.length + 1,
		titulo: body.titulo,
		conteudo: body.conteudo,
		subtitulo: body.subtitulo,
		autor: body.autor,
		publicado: false,
		deletado: false,
	};

	posts.unshift(novoPost);

	formatarSucesso(ctx, novoPost, 201);
};

/**
 * Função atualiza um post existente.
 * Necessário passar na função o ID do post.
 * Para atualizar todo conteúdo é necessário enviar titulo, conteúdo, subtitulo no corpo da requisição.
 * Para publicar/despublicar um artigo enviar apenas publicado no corpo da requisição.
 */
const atualizarPost = (ctx) => {
	const { id } = ctx.params;
	const { body } = ctx.request;
	if (
		(!body.conteudo && !body.titulo && !body.subtitulo) ||
		typeof body.publicado !== 'boolean'
	) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			let postAtualizado = null;
			postAtualizado = {
				id: Number(id),
				conteudo: body.conteudo ? body.conteudo : postAtual.conteudo,
				titulo: body.titulo ? body.titulo : postAtual.titulo,
				subtitulo: body.subtitulo
					? body.subtitulo
					: postAtual.subtitulo,
				senha: body.senha ? body.senha : postAtual.senha,
				autor: postAtual.autor,
				publicado: !!body.publicado,
				deletado: postAtual.deletado,
			};

			posts[id - 1] = postAtualizado;

			formatarSucesso(ctx, postAtualizado, 200);
		}
	} else {
		formatarErro(ctx, 'Autor não encontrado', 404);
	}
};

/**
 * Funcão deleta um post para isso muda a estado deletado para true.
 * Necessário enviar o estado no corpo da requisição.
 */
const deletarPost = (ctx) => {
	const { id } = ctx.params;
	const { body } = ctx.request;

	if (typeof body.estado !== 'boolean') {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				id: postAtual.id,
				titulo: postAtual.titulo,
				subtitulo: postAtual.subtitulo,
				conteudo: postAtual.conteudo,
				autor: postAtual.autor,
				publicado: postAtual.publicado,
				deletado: body.estado,
			};

			posts[id - 1] = postAtualizado;

			formatarSucesso(ctx, postAtualizado, 200);
		}
	} else {
		formatarErro(ctx, 'Post não encontrado', 404);
	}
};

module.exports = {
	obterPosts,
	obterPost,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
