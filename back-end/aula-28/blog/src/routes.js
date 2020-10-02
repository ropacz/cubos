const Router = require('koa-router');

const posts = require('./controllers/posts');
const autores = require('./controllers/autores');
const { deletarAutor } = require('./controllers/autores');

const router = new Router();

router.get('/posts', posts.obterPosts);
router.get('/posts/:id', posts.obterPost);
router.post('/posts', posts.adicionarPost);
router.put('/posts/:id', posts.atualizarPost);
router.delete('/posts/:id', posts.deletarPost);

router.get('/autores', autores.obterAutores);
router.get('/autores/:id', autores.obterAutor);
router.post('/autores', autores.adicionarAutor);
router.put('/autores/:id', autores.atualizarAutor);
router.delete('/autores/:id', autores.deletarAutor);

module.exports = router;
