module.exports.profile= function(req,res){
    
    return res.render('user_profile',{
        title:'Profile'
    })
}

module.exports.posts= function(req,res){
    res.end('<h1>Posts</h1>');
}