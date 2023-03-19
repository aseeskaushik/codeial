const Post= require('../../../models/post');
const Comment= require('../../../models/comment');

// to render posts in json format
module.exports.index= async function(req,res){
    
    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });


    return res.json(200,{
        message: "List of posts",
        posts: posts
    })
}


// to delete posts
module.exports.destroy= async function(req,res){
    try{
    let post= await Post.findById(req.params.id);
        
          post.remove();

          await Comment.deleteMany({post: req.params.id});

        //   if(req.xhr){
        //     return res.status(200).json({
        //         data: {
        //             post_id: req.params.id
        //         },
        //         message: "Post deleted"
        //     });
        //   }
           return res.json(200,{
            message: "Post and asssociated comments deleted successfully"
           })
          
          
        
    }catch(err){
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
    
}