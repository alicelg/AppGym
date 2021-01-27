const router = require('express').Router();
const { getAll, getById, create } = require('../../models/ejercicios');

/* recupera todos los ejercicios de la base de  datos */
router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
});


/* crea un nuevo ejercicio */
router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);

        if (result.affectedRows === 1) {
            const nuevoEjercicio = await getById(result.insertId);
            res.json({
                mensaje: 'Se agrego correctamente el ejercicio',
                ejercicio: nuevoEjercicio

            });

        } else {
            res.json({ error: 'Ha ocurrido un problema y no se agrego el ejercicio' });
        }
    } catch (error) {
        res.json({ error: error.message });

    }


});


module.exports = router;