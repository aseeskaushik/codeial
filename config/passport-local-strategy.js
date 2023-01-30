const passport= require('passport');

const LocalStartegy= require('passport-local').Strategy;

const User= require('../models/user');

// authentication using passport
passport.use(new LocalStartegy({
    usernameField:'email'
},
function(email,password,done){
    // find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Errror in finding user --> Passport');
            return done(err);
        }

        if(!user || user.password!= password){
            console.log('Invalid username/password');
            return done(null,false)
        }

        return done(null,user);
    });
}
));


// Seralizing the user to decide which key is kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// deseralizing the user from key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finbding user--> passport');
            return done(err);
        }
        return done(null,user);
    });
});


// check if the user is authenticated
passport.checkAuthentication= function(req,res,next){
    // if user is signed in then pass on the req to next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the sesssion coookie and we are just this to locals for the views
        res.locals.user= req.user;
    }
    next();
}




module.exports= passport;

