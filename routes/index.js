const express = require('express');
const router = express.Router();

const Article = require('./../models/article');

router.get('/', async (req, res) => {
    try {
        const level1 = await Article.find({parent: null, level: 1});
        let articles = [];

        for (let level1Article of level1) {
            let level2 = await Article.find({parent: level1Article.id, level: 2});
            if (level2 != null) {
                let lvl2 = [];
                for (let level2Article of level2) {
                    let level3 = await Article.find({parent: level2Article.id, level: 3});
                    if (level3 != null) {
                        lvl2.push(
                            level2Article,
                            level3
                        );
                    } else {
                        lvl2.push(
                            level2Article
                        );
                    }
                }
                articles.push([
                    level1Article,
                    lvl2
                ]);
            } else {
                articles.push(level1Article);
            }
        }
        res.render('index', {
            title: "නෝර්වීජියානු මිත්‍යා කතා - Mythology World Fantasia",
            overview: "Norse Mythology - නෝර්වීජියානු මිත්‍යා කතා, සුද්ද සිංහලෙන් කියවන්න",
            base_url: req.baseUrl,
            og_type: "website",
            og_description: "නෝර්වීජියානු / ස්කැන්ඩිනේවියානු පුරාවෘත්ත, සුද්ද සිංහලෙන් කියවන්න",
            articles: articles
        });
    } catch {
        res.status(505).send("Server error!");
    }
});

module.exports = router;