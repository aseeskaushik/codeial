const express= require('express');
const router= express.Router();

const userscontroller= require('../controllers/users_controller');

router.get('/profile',userscontroller.profile);
router.get('/posts',userscontroller.posts);

module.exports= router;