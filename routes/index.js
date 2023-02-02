const express= require('express');

const router= express.Router();
const homeController=require('../controllers/home_controller');

console.log('jai ho');

router.get('/',homeController.home);
router.use('/users',require('./users'));

//for posts routes
router.use('/posts',require('./posts'));


module.exports= router;