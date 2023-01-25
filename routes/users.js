const express= require('express');
const router= express.Router();

const userscontroller= require('../controllers/users_controller');

router.get('/profile',userscontroller.profile);

// route for sign-up
router.get('/sign-up',userscontroller.signup);

// route for sign-in
router.get('/sign-in',userscontroller.signin);

// route to get sign up data
router.post('/create',userscontroller.create);


module.exports= router;