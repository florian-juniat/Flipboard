const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {client} = require('../database/db');


router.get("/" ,async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var infos_likes = [];
    var infos_articles = [];
    var infos_tags = [];
    var like_url_user = await client.query("select like_url from users where id =" + id_user + ";");
    var create_article_user = await client.query("select create_article from users where id =" + id_user + ";");
    var my_tags = await client.query("select tags from users where id = " + id_user + ";")

    like_url_user.rows[0].like_url = like_url_user.rows[0].like_url ? like_url_user.rows[0].like_url : [];
    for (let i = 0; i < like_url_user.rows[0].like_url.length; i++) {
        var tmp = like_url_user.rows[0].like_url[i];
        var result = await client.query("select * from articles where id =" + tmp + ";")
        infos_likes.push({
            id : result.rows[0].id,
            title : result.rows[0].title,
            url : result.rows[0].url,
            image : result.rows[0].urltoimage,
        })
    }

    my_tags.rows[0].tags = my_tags.rows[0].tags ? my_tags.rows[0].tags : []
    for (let i = 0; i < my_tags.rows[0].tags.length; i++) {
        infos_tags.push({
            id : i,
            tag : my_tags.rows[0].tags[i],
        });
    }

    create_article_user.rows[0].create_article = create_article_user.rows[0].create_article ? create_article_user.rows[0].create_article : []
    for (let i = 0; i < create_article_user.rows[0].create_article.length; i++) {
        var tmp = create_article_user.rows[0].create_article[i];
        var result = await client.query("select * from articles where id =" + tmp + ";")
        infos_articles.push({
            id : result.rows[0].id,
            title : result.rows[0].title,
            url : result.rows[0].url,
            image : result.rows[0].urltoimage,
        })
    }
    var end = {
        likes : infos_likes,
        tags : infos_tags,
        ajout : infos_articles
    }
    res.status(200).send(end);
});

module.exports = router;