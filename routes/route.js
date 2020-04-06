const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
 
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.allowIfLoggedIn, userController.getUser);
 
router.get('/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'topic'), userController.getUsers);
 
router.put('/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'topic'), userController.updateUser);
 
router.delete('/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'topic'), userController.deleteUser);
 
module.exports = router;