/* crear un ejercicio*/
const create = ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios(username, email,  password, role, fecha_registro) values(?,?,?,?,?)', [username, email, password, 'NONE', new Date()], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};


const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email = ?', [pEmail], (error, rows) => {
            if (error) reject(error);
            if (rows.length !== 1) resolve(null); /* el email debe ser unico, no dejar registrar más de una vez */
            resolve(rows[0]);
        });
    });
}


const getByUsuarioId = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE id = ?', [pUsuarioId], (error, rows) => {
            if (error) reject(error);
            if (rows.length == 0) resolve(null);
            resolve(rows[0]);
        });
    });
}

module.exports = {
    create, getByEmail, getByUsuarioId
}
