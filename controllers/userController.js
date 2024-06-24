const db = require('../utils/db');

const getUsers = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
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
    getRoles
};
