const Post= require('../models/post');

// action to create posts in db from post form
module.exports.create= function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){console.log('Error in creating a post');return;}

        return res.redirect('back');
    });
}