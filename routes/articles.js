const express = require('express');
const app = express();
const Article = require('./../models/article');
const router = express.Router();
const passport = require('passport');

const {checkAuthenticated, checkNotAuthenticated} = require('./../middleware');

app.use(passport.session());

router.get('/new', checkAuthenticated, async (req, res) => {
    try {
        const articles = await Article.find({level: {$in: [1, 2]}});
        res.render('article/add', { layout: 'layouts/admin', title: 'Add Article', name: req.user.name, article: new Article(), parentArticles: articles });
    } catch {
        res.redirect('/admin/dashboard');
    }
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) res.redirect('/');
    res.render('article/show', {
        title: article.title + " | Norse Mythology - නෝර්වීජියානු මිත්‍යා කතා",
        overview: "Norse Mythology - නෝර්වීජියානු මිත්‍යා කතා, සුද්ද සිංහලෙන් කියවන්න",
        base_url: req.protocol + "://" + req.hostname + req.originalUrl,
        og_type: "website",
        og_description: "නෝර්වීජියානු / ස්කැන්ඩිනේවියානු පුරාවෘත්ත, සුද්ද සිංහලෙන් කියවන්න",
        article: article
    });
});

router.post('/', checkAuthenticated, async (req, res) => {
    let article = new Article({
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug,
        parent: req.body.parent,
        level: req.body.level
    });
    try {
        article = await article.save();
        res.redirect(`/article/${article.slug}`);
    } catch(e) {
        console.log(e);
        res.render('article/add', {
            layout: 'layouts/admin',
            title: 'Add Article',
            name: req.user.name,
            article: article,
            errorMessage: 'Error creating article!'
        });
    }
});

module.exports = router;