
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');

router.get('/get/:email', userController.getUserByEmail);
router.post('/add', userController.addUser);
router.get('/get', userController.getUsers);

module.exports = router;
