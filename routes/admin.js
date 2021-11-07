const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');

const bcrypt = require('bcrypt');

const User = require('./../models/user');
app.use(passport.session());

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', { layout: 'layouts/admin', title: 'Home', name: req.user.name });
});

router.post('/user', async (req, res) => {
    try {
        const hasedPassword = await bcrypt.hash(req.body.password, 10);
        if (!validateEmail(req.body.email.trim())) res.redirect('/admin/user/add', { error: 'email' });
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hasedPassword
        });
        user = await user.save();
        res.redirect('/admin/dashboard');
    } catch (e) {
        res.redirect('/admin/user/add', { user: user });
    }
});

router.get('/user/add', (req, res) => {
    res.render('user/add.ejs', { layout: 'layouts/admin', title: 'Add User', name: req.user.name, user: new User() });
});

module.exports = router;