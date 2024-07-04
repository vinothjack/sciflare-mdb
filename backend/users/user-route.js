const express = require('express');
const userRouter = express.Router();
const userController = require('./user-controller');
const middleWare = require('../utils/middleware-passport');


userRouter.post('/sign-up', userController.signup);
userRouter.post('/login',userController.login);
userRouter.get('/', middleWare.authenticate, userController.getUserList);

module.exports = userRouter;
