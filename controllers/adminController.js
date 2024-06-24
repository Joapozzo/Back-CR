const db = require('../utils/db');

const crearCategoria = (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send('Categoria registrada con éxito');
    });
};

const getCategorias = (req, res) => {
    db.query('SELECT * FROM categorias', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const crearTorneo = (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('INSERT INTO torneos(nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send('Torneo registrado con éxito');
    });
};

const getTorneos = (req, res) => {
    db.query('SELECT * FROM torneos', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const crearSede = (req, res) => {
    const { nombre, descripcion } = req.body;
    db.query('INSERT INTO sedes(nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send('Sede registrada con éxito');
    });
};

const getSedes = (req, res) => {
    db.query('SELECT * FROM sedes', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const crearAnio = (req, res) => {
    const { año, descripcion } = req.body;
    db.query('INSERT INTO años(año, descripcion) VALUES (?, ?)', [año, descripcion], (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send('Año registrado con éxito');
    });
};

const importarAnio = (req, res) => {
    const años = req.body;
    if (!Array.isArray(años)) {
        return res.status(400).send('Invalid data format');
    }

    // Construye el query para insertar múltiples registros
    const values = años.map(({ año, descripcion }) => [año, descripcion]);
    const query = 'INSERT INTO años (año, descripcion) VALUES ?';

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al insertar datos en la base de datos');
        }
        res.status(200).send('Datos importados correctamente');
    });
};

const deleteAnio = (req, res) => {
    const { id } = req.body;
    
    // Sentencia SQL para eliminar el año por ID
    const sql = 'DELETE FROM años WHERE id_año = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error eliminando el año:', err);
            return res.status(500).send('Error eliminando el año');
        }
        res.status(200).send('Año eliminado correctamente');
    });
};

const getAnios = (req, res) => {
    db.query('SELECT * FROM años ORDER BY año DESC', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const crearTemporada = (req, res) => {
    const { año, sede, categoria, torneo, descripcion } = req.body;
    db.query('INSERT INTO temporadas(id_torneo, id_categoria, id_año, id_sede, descripcion) VALUES (?, ?, ?, ?, ?)', [torneo, categoria, año, sede, descripcion], (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send('Temporada registrada con éxito');
    });
};

const getTemporadas = (req, res) => {
    db.query(`SELECT id_temporada, torneos.nombre AS torneo, categorias.nombre AS categoria, años.año, sedes.nombre AS sede, temporadas.descripcion 
            FROM temporadas 
            INNER JOIN torneos ON temporadas.id_torneo = torneos.id_torneo 
            INNER JOIN categorias ON temporadas.id_categoria = categorias.id_categoria 
            INNER JOIN años ON temporadas.id_año = años.id_año 
            INNER JOIN sedes ON temporadas.id_sede = sedes.id_sede`, 
    (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const crearEquipo = (req, res) => {
    const { nombre, img, id_categoria, descripcion } = req.body;
    db.query('INSERT INTO equipos(nombre, id_categoria, descripcion, img) VALUES (?, ?, ?, ?)', [nombre, id_categoria, descripcion, img], (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send('Temporada registrada con éxito');
    });
};

const getEquipos = (req, res) => {
    db.query(
        `SELECT 
            e.nombre,
            e.img,
            c.nombre as categoria,
            e.descripcion
        FROM equipos as e
        INNER JOIN categorias as c ON c.id_categoria = e.id_categoria`
    ,(err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

module.exports = {
    crearCategoria,
    getCategorias,
    crearTorneo,
    getTorneos,
    crearSede,
    getSedes,
    crearAnio,
    importarAnio,
    deleteAnio,
    getAnios,
    crearTemporada,
    getTemporadas,
    crearEquipo,
    getEquipos
    
};
