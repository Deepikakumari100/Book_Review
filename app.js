const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bookApp');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.redirect('/login')
})

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

const userRoutes = require('./routes/auth');
const bookRoutes = require('./routes/review');

app.use(userRoutes);
app.use(bookRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));