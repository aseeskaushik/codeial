const { request } = require('express');
const express= require('express');

const router= express.Router();
const homeController=require('../controllers/home_controller');

console.log('jai ho');

router.get('/',homeController.home);
router.use('/users',require('./users'));

//for posts routes
router.use('/posts',require('./posts'));

// for comments routes
router.use('/comments',require('./comments'));


module.exports= router;