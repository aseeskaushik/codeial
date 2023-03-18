const express= require('express');
const cookieParser= require('cookie-parser');
const app= express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');

const db= require('./config/mongoose');
// used for session cookie
const session= require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');

// const MongoStore= require('connect-mongo')(session);
// const MongoStore= require('connect-mongo');
const sassMiddleware= require('node-sass-middleware');


const flash= require('connect-flash');
const customMware= require('./config/middleware');

// app.use('/scripts', express.static(path.join(__dirname, 'node_modules/node-sass-middleware')));
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts);

// extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine
app.set('view engine','ejs');
app.set('views','./views');

// middlewares for session
// mongostore is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
//    store: new MongoStore({
//     mongooseConnection: db,
//     autoRemove: 'disabled'
//    },
//    function(err){
//     console.log(err||'Connect mongodb setup ok');
//    }
//    )
//    ,
    // Store: MongoStore.create(
    //     {
    //         mongoUrl: 'mongodb://127.0.0.1/codeial_development',
    //         autoremove: 'disabled'
    //     }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    
    console.log(`Server is running on port :${port}`)
});