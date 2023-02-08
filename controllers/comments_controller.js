const Comment= require('../models/comment');
const Post= require('../models/post');

// action to create comment
module.exports.create= async function(req,res){
try{
    let post= await Post.findById(req.body.post);
        if(post){
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

                post.comments.push(comment);
                post.save();
                req.flash('success','Successfully made a comment on post');
                res.redirect('/');
            
        }
}catch(err){
    req.flash('error',err);
    return res.redirect('back');
}
}


// action to delete comment
module.exports.destroy= async function(req,res){
try{
    let comment= await Comment.findById(req.params.id);
        if(comment.user== req.user.id){
            let postId= comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
            req.flash('success','Comment deleted');
            return res.redirect('back');

        }else{
            req.flash('error','You cannot delete this comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');  
    }
}