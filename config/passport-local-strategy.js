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


module.exports= passport;

