const router = require('express').Router();
const { create, getByEmail } = require('../../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

router.post('/registro', async (req, res) => {
    try {

        /* COMPROBAR SI EL EMAIL EXISTE */

        /* esto lo hacemos para incriptar la password */
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
});



router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    /* console.log(email, password); para verlo desde consola  */
    try {
        const usuario = await getByEmail(email);
        /* res.json(usuario);  para ver el resultado en peticiones*/
        if (!usuario) {
            /* si no existe el usuario a partir de ese email, muestro ese error */
            return res.json({ error: 'Error 🚫 en email 💌 y/o contraseña 🥴' });
        }
        /* comprobamos que la password coincide  */
        const iguales = bcrypt.compareSync(password, usuario.password);
        if (!iguales) {
            return res.json({ error: 'Error 🚫 en email 💌 y/o contraseña 🥴' });
        }
        /* console.log(createToken(usuario));  creado para hacer pruebas */

        res.json({
            success: 'Login correcto ☺️',
            token: createToken(usuario)
        })

    } catch (error) {
        res.json({ error: error.message })
    }
});

function createToken(pUsuario) {
    const obj = {
        usuarioId: pUsuario.id,
        caducidad: dayjs().add(10, 'minute').unix()
    }
    /*  console.log(obj); */

    /* LA parte rosada de process en adelante lo traemos desde .env */
    return jwt.sign(obj, process.env.SECRET_KEY);
}


module.exports = router;