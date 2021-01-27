/* todas las acciones sobre los EJERCICIOS */


/* recupera todos los  ejercicios */
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from ejercicios', (error, rows) => {
            if (error) reject(error);
            resolve(rows)
        });
    });
};

/* crear un ejercicio*/
const create = ({ titulo, duracion, repeticiones }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO ejercicios(titulo, duracion, repeticiones) values(?,?,?)', [titulo, duracion, repeticiones], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

/* recuperar el id del ejercicio */
const getById = (pEjercicioId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ejercicios WHERE id = ?', [pEjercicioId], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        });
    });
};

const getByClienteId = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('select ejer.* from tbi_clientes_ejercicios as tbi, ejercicios as ejer where tbi.fk_cliente = ? and tbi.fk_ejercicio = ejer.id;', [pClienteId],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            });
    });
}

module.exports = {
    getAll, create, getById, getByClienteId
}
