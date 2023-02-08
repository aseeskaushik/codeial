const User= require('../models/user');

// action to render profile page
module.exports.profile= function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user: user
        });
    });
}

// action to handle upadate form
module.exports.update= function(req,res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Profile updated successfullly');
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// action to render sign up page
module.exports.signup= function(req,res){
   if(req.isAuthenticated()){
    return res.redirect('/users/profile');
   }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

// render sign in page action
module.exports.signin= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating user while signing up');return}

                return res.redirect('/users/sign-in');
            })
        }
    })
}

// sign-in and create a session for user
module.exports.createSession= function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

// sign out controller
module.exports.destroySession= function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','You have logged Out!');
      res.redirect('/');
    });
  };
