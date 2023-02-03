const Post= require('../models/post');
const Comment= require('../models/comment');

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

// action to delete posts from database
module.exports.destroy= function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
          post.remove();

          Comment.deleteMany({post: req.params.id},function(err){
            return res.redirect('back');
          });
        }else{
            return res.redirect('back');
        }
    });
}