if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/default');
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('✅ Connected to Mongoose'));

const initializePassport = require('./passport-config');
initializePassport(passport);

const {checkAuthenticated, checkNotAuthenticated} = require('./middleware');

const indexRouter = require('./routes/index');
const articleRouter = require('./routes/articles');

const adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/admin', checkAuthenticated, adminRouter);

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', { layout: 'layouts/auth', title: 'Login' });
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

app.use((req, res, next) => {
    res.status(404);
    
    if (req.accepts('html')) {
        res.render('404', {
            title: "404 Page Not Found | Norse Mythology - නෝර්වීජියානු මිත්‍යා කතා",
            overview: "Norse Mythology - නෝර්වීජියානු මිත්‍යා කතා, සුද්ද සිංහලෙන් කියවන්න",
            base_url: req.baseUrl,
            og_type: "website",
            og_description: "නෝර්වීජියානු / ස්කැන්ඩිනේවියානු පුරාවෘත්ත, සුද්ද සිංහලෙන් කියවන්න",
            url: req.url
        });
        return;
    }

    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    res.type('txt').send('Not found');
});

app.listen(process.env.PORT || 3000);