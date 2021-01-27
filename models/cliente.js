/* todas las acciones osbre la tabla de clientes */

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from  clientes', (error, rows) => {
            if (error) reject(error);
            resolve(rows)
        });
    });
};

/* 1. qué datos recibe el método */
/* 2. sentencia mysql */
/* 3. que devuelve la query y cómo lo gestionamos  */
/* 4. exportar la función */

const create = ({ nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni }) => {
    return new Promise((resolve, reject) => {

        /*  Es correcto, pero es mejor no hacerlo así
        
        db.query(`INSERT INTO clientes(nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, fecha_incripcio) values('${nombre}', '${apellidos}' , '${direccion}', '${email}, '${edad}', '${sexo}', '${cuota}', '${fecha_nacimiento}')`); */

        db.query('INSERT INTO clientes(nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, fecha_inscripcion) values(?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, new Date()], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};


/* 1. qué datos recibe el método */
/* 2. sentencia mysql */
/* 3. que devuelve la query y cómo lo gestionamos  */
/* 4. exportar la función */

const getById = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM clientes WHERE id = ?', [pClienteId], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        });
    });
};

const deleteById = (pClienteId) => {
    return new Promise((resolve, result) => {
        db.query('DELETE FROM clientes WHERE id = ?', [pClienteId], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

const updateById = (pClienteId, { nombre, apellidos, email, edad, direccion, cuota, dni }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE clientes SET nombre = ?, apellidos = ?, email = ?, edad =?, direccion =?, cuota=?, dni=? WHERE id = ?', [nombre, apellidos, email, edad, direccion, cuota, dni, pClienteId], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};






module.exports = {
    getAll, create, getById, deleteById, updateById
}

