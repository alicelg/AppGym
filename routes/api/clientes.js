const router = require('express').Router();
const { getAll, create, getById, updateById, deleteById } = require('../../models/cliente');
const { getByClienteId } = require('../../models/ejercicios');
const { body, validationResult } = require('express-validator')


/* recupera todos los clientes de la base de  datos */
router.get('/', async (req, res) => {

    /* valor del usuario que ha hecho login lo veremos en la consola */
    console.log(req.user);

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
});


/* saber los ejercicios del cliente */
router.get('/:clienteId/ejercicios', async (req, res) => {
    /* res.send('funciona 😜') */
    /* res.send(req.params.clienteId); */

    /* RECUPERAR EL CLIENTE - GETBYID  (models/cliente.js)*/

    /* RECUPERAR LOS EJERCICIOS DE UN CLIENTE  */


    getById(req.params.clienteId)

        .then(cliente => {
            if (cliente) {
                getByClienteId(cliente.id)
                    .then(rows => {
                        cliente.ejercicios = rows;
                        res.json({
                            cliente: cliente
                        });
                    })
                    .catch(error => res.json({ error: error.message }))
            } else {
                res.json({ error: error.message })
            };
        })
        .catch(error => res.json({ error: error.message }));
});








/* crea un nuevo cliente */
router.post('/', [
    /* validadores del BODY */
    body('nombre', 'El campo nombre debe tener valor').exists().not().isEmpty(),
    body('email', 'El email debe tener una estructura basica').isEmail(),
    body('dni').custom(dniValue => {
        /* validacion del dni */
        return true;
    })



], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    /* vamos a poner aqui dentro validadores, estos vienen mucho más tarde y provienen de la libreria express-validator */


    const result = await create(req.body);

    /* result  
        - affectedRows(número de registros afectados por la acción SQL )
        - insetId (id del nuevo cliente) */

    /* res.json(result); */

    /* comprobaciones */
    if (result.affectedRows === 1) {
        /* el  cliente se ha insertado */
        const nuevoCliente = await getById(result.insertId);
        res.json(nuevoCliente);
    } else {
        res.json({ error: 'Ha ocurrido un error en la inserción' });
        /* el cliente no se ha insertado   */
    }
});


/* MODIFICAR INFORMACION DE UN CLIENTE */
router.put('/', async (req, res) => {

    try {
        const result = await updateById(req.body.clienteId, req.body);
        if (result.affectedRows === 1) {
            const clienteActualizado = await getById(req.body.clienteId);
            res.json({
                message: 'El cliente se ha actualizado 👍🏻',
                cliente: clienteActualizado
            });
        } else {
            res.json({ error: 'No se ha podido actualizar' });
        }

    } catch (error) {
        /*   console.log(error); */
        res.json({ error: error.message });
    }

    /* res.json(result); */
});

/* BORRAR */
router.delete('/:clienteId', async (req, res) => {

    try {
        const result = await deleteById(req.params.clienteId);
        /* res.json(result); */

        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Se ha borrado correctamente' });

        } else {
            res.json({ error: 'Ha ocurrido un error en el borrado' })
        }
    } catch (error) {
        /*   console.log(error); */
        res.json({ error: error.message });
    }
});

/* Ruta  */



module.exports = router;