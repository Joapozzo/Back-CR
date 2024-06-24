const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/get-users', userController.getUsers);
router.get('/get-roles', userController.getRoles);

module.exports = router;
