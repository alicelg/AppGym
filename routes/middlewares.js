const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getByUsuarioId } = require('../models/usuario');


const checkToken = async (req, res, next) => {

    /* esto es si esta el middleware esta desactivado "FALSE" directamente pasa la información. Si esta true pedira una cabecera */
    if (process.env.MIDDLEWARE_ACTIVE === 'OFF') {
        return next();
    }


    /*  console.log('Pasaste por el middleware 😃👍🏻');  comprobar que funciona*/


    /* comprobar si el token viene en las cabeceras de la petición */
    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Necesitas la cabecera Authorization 👽🛸✨' });
    }

    /* Si el token viene comprobar que el token es correcto */
    const token = req.headers['authorization'];
    const obj = jwt.decode(token, process.env.SECRET_KEY);

    /* obj-> usuarioId, caducidad, iat */
    if (!obj) {
        return res.status(403).json({ error: 'El token es incorrecto 🥴' });
    }

    /* comprobar si a caducado  */
    /* console.log(obj.caducidad); */

    if (dayjs().unix() > obj.caducidad) {
        return res.status(403).json({ error: 'El token esta caducado 🤪' })
    }

    /* Comprobar si el usuario existe, con su id  */
    const usuario = await getByUsuarioId(obj.usuarioId);
    if (!usuario) {
        return res.status(403).json({ error: 'El usuario no existe ' });
    }

    req.user = usuario;

    next();
}


const adminRole = (req, res, next) => {

    if (process.env.MIDDLEWARE_ACTIVE === 'OFF') {
        return next();
    }


    /*  console.log(req.user.username); */
    if (req.user.role !== 'ADMIN') {
        res.status(403).json({ error: 'Debes tener permisos de administración' })
    }
    next();
}



module.exports = {
    checkToken, adminRole
}