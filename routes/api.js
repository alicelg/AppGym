const router = require('express').Router();

const { checkToken, adminRole } = require('./middlewares');

const apiClientesRouter = require('./api/clientes');
const apiEjerciciosRouter = require('./api/ejercicios');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/clientes', checkToken, adminRole, apiClientesRouter);
router.use('/ejercicios', checkToken, apiEjerciciosRouter);
router.use('/usuarios', apiUsuariosRouter);


module.exports = router;