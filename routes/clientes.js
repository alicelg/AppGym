const router = require('express').Router();
const { getAll, create, getById, deleteById, updateById } = require('../models/cliente');


/* GET */


/* esto va a la ruta http://localhost:3000/clientes */
router.get('/', async (req, res) => {
    /* recupero todos los clientes de la base de datos */

    /* async - await */
    const rows = await getAll();
    res.render('clientes/index', { clientes: rows });


    /* normal, quitar de arriba el async al lado del (req, res) */
    /*  getAll()
         .then(rows => {
             res.render('clientes/index', { clientes: rows });
         })
         .catch(error => console.log(error)); */


    /*  db.query('select * from  clientes', (error, rows) => {
         if (error) return console.log(error);
         console.log(rows);
         res.render('clientes/index', { clientes: rows });
     }); */

});

/* esto va a la ruta http://localhost:3000/clientes/new */
router.get('/new', (req, res) => {
    res.render('clientes/formNew')
});




/* esto va a http://localhost:3000/clientes/edita/2142 */
router.get('/edita/:clienteId', async (req, res) => {
    /* recuperar el id del cliente de la url */
    const clienteId = req.params.clienteId;
    /*   console.log(req.params.clienteId);*/

    /* recuperar de la base de datos el cliente a editar */
    const cliente = await getById(clienteId);

    /* renderizar la vista pasanlo el cliente  */
    res.render('clientes/formEdit', { cliente });
});





/* esto borra a un cliente en especifico */
router.get('/borrar/:clienteId', async (req, res) => {
    /* recuperar el id del clientte de la url */
    const clienteId = req.params.clienteId;
    /* borrar el cliente de la base de datos */
    const result = await deleteById(clienteId);
    console.log(result);
    /* redirigir a la lista clientes */
    res.redirect('/clientes');

});



/* con esta estoy estrayendo un solo cliente por su id */
router.get('/:clienteId', (req, res) => {
    /*   res.send('la ruta funciona :) '); */
    const clienteId = req.params.clienteId;

    /* Recuperar el cliente de la base  de datos */
    getById(clienteId)
        .then(cliente => {
            /* res.json(cliente); esto se usa para verlo */

            /* renderizar la vista con el cliente recuperado */
            res.render('clientes/show', { cliente })
        })
        .catch(error => console.log(error));



});


/* POST */

/* ruta post http://localhost:3000/clientes/create */
router.post('/create', async (req, res) => {
    console.log(req.body);
    const result = await create(req.body);
    /*  console.log(req.headers); */
    /* res.send('Los datos del formulario'); */
    console.log(result);
    res.redirect('/clientes');
});

/* ruta post http://localhost:3000/clientes/update */
router.post('/update', async (req, res) => {
    /* recupero el body de la peticion post */
    /* trae todos los datos a modificiar y el cliente id */
    console.log(req.body);

    /* ejecuto el update sobre la base de datos */
    const result = await updateById(req.body.clienteId, req.body)
    console.log(result);

    /* redirijo al cliente editado  */
    res.redirect('/clientes/' + req.body.clienteId);
});


module.exports = router;


