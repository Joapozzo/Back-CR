const db = require('../utils/db');

const getUsers = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const getEquipos = (req, res) => {
    db.query('SELECT * FROM equipos', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

const getRoles = (req, res) => {
    db.query('SELECT * FROM roles', (err, result) => {
        if (err) return res.status(500).send('Error interno del servidor');
        res.send(result);
    });
};

module.exports = {
    getUsers,
    getEquipos,
    getRoles
};
