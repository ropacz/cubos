const Router = require('koa-router');
const { shorter } = require('./controllers/short');
const { redirect } = require('./controllers/short');

const router = new Router();

router.post('/encurta', shorter);
router.get('/encurta/:id', redirect);

module.exports = router;
