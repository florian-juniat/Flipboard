const router = require("express").Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const {client} = require('../database/db');
const NewsAPI = require('newsapi');

router.post("/add-tags", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');

    if (!req.body.addtags) {
        res.status(400).send("Need tags to add or the tags id.");
        return;
    }
    var id_user = decoded.indice;
    await client.query("update users set tags = array_append(tags, '" + req.body.addtags + "') where id = " + id_user + ";");
    res.status(200).send("Add tags.")
});

router.post("/remove-tags", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;

    await client.query("update users set tags = array_remove(tags, '" + req.body.removetags + "') where id = " + id_user + ";");
    res.status(200).send("Removed tags.")
});


router.get("/liked-articles", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var like_url_user = await client.query("select like_url from users where id =" + id_user + ";");
    var infos = [];

    for (let i = 0; i < like_url_user.rows[0].like_url.length; i++) {
        var tmp = like_url_user.rows[0].like_url[i];
        var result = await client.query("select * from articles where id =" + tmp + ";")
        infos.push({
            id : result.rows[0].id,
            tags : result.rows[0].category_tags,
            author : result.rows[0].author,
            title : result.rows[0].title,
            description : result.rows[0].description,
            url : result.rows[0].url,
            image : result.rows[0].urltoimage,
            date : result.rows[0].publishedat,
            content : result.rows[0].content,
        })
    }
    res.status(200).send(infos);
});


router.post("/like", async(req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var id_article = req.body.id_article
    var like_article = await client.query("update users set like_url = array_append(like_url," + id_article + ") where id = " + id_user + ";");
    res.status(200).send("Article liked.")
});

router.post("/unlike", async(req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var id_article = req.body.id_article
    var like_article = await client.query("update users set like_url = array_remove(like_url," + id_article + ") where id = " + id_user + ";");
    res.status(200).send("Article unliked.")
});


router.post("/all-created-articles" , async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var create_article_user = await client.query("select create_article from users where id =" + id_user + ";");
    var infos = [];

    for (let i = 0; i < create_article_user.rows[0].create_article.length; i++) {
        var tmp = create_article_user.rows[0].create_article[i];
        var result = await client.query("select * from articles where id =" + tmp + ";")
        infos.push({
            id : result.rows[0].id,
            tags : result.rows[0].category_tags,
            author : result.rows[0].author,
            title : result.rows[0].title,
            description : result.rows[0].description,
            url : result.rows[0].url,
            image : result.rows[0].urltoimage,
            date : result.rows[0].publishedat,
            content : result.rows[0].content,
        })
    }
    res.status(200).send(infos);
});


router.post("/create-article", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var infos = {
        category_tags : req.body.tags,
        author : req.body.author,
        title : req.body.title,
        description : req.body.description,
        url : req.body.url,
        urlToImage : req.body.image,
        publishedAt : req.body.date,
        content : req.body.content,
    }
    var tmp = await client.query("insert into articles(category_tags, author, title, description, url, urlToImage, publishedAt, content) values ('" + 
        infos.category_tags + "','" + 
        infos.author + "','" +
        infos.title + "', '" +
        infos.description + "','" +
        infos.url + "','" +
        infos.urlToImage + "','" +
        infos.publishedAt + "','" +
        infos.content + "') returning id;");
    var test = await client.query("update users set create_article = array_append(create_article," + tmp.rows[0].id + ") where id = " + id_user + ";")
    res.status(200).send("Article created.")
})

router.post("/:id/delete-article" , async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    await client.query("update users set create_article = array_remove(create_article, '" + req.params.id + "') where id = " + id_user + ";");
    await client.query("delete from articles where id = " + req.params.id + ";")
    res.status(200).send("Article removed.")
});

router.get("/", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var result = [];
    var tags = await client.query("select tags from tags");
    
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var tags_user = await client.query("select tags from users where id = " + id_user + ";");

    for (let i = 0; i < tags.rows.length; i++) {
        if (!tags_user.rows[0].tags.includes(tags.rows[i].tags)) {
            result.push(tags.rows[i].tags);
        }
    }

    var info = [];
    for (let i = 0; i < tags_user.rows[0].tags.length; i++) {
        var article_tag = await client.query("select * from articles where category_tags = '" + tags_user.rows[0].tags[i] + "';")
        info.push({
            nom_du_tag : tags_user.rows[0].tags[i],
            first : {
                id : article_tag.rows[0].id,
                url : article_tag.rows[0].url,
                title : article_tag.rows[0].title,
                picture : article_tag.rows[0].urltoimage,
                author : article_tag.rows[0].author
            },
            second : {
                id : article_tag.rows[1].id,
                url : article_tag.rows[1].url,
                title : article_tag.rows[1].title,
                picture : article_tag.rows[1].urltoimage,
                author : article_tag.rows[1].author
            },
            third : {
                id : article_tag.rows[2].id,
                url : article_tag.rows[2].url,
                title : article_tag.rows[2].title,
                picture : article_tag.rows[2].urltoimage,
                author : article_tag.rows[2].author
            },
        });
    }
    var end = {
        tags : result,
        info : info,
    }
    res.status(200).send(end);
});


router.get("/articles/:tags" , async(req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var articles = [];
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_tag = req.params.tags;
    var id_user = decoded.indice;
    var article_tag = await client.query("select * from articles where category_tags = '" + id_tag + "';")
    var tags_user = await client.query("select like_url from users where id = " + id_user + ";");
    var like_article = false;

    tags_user.rows[0].like_url = tags_user.rows[0].like_url ? tags_user.rows[0].like_url : []
    
    for (let i = 0; i < article_tag.rows.length; i++) {
        articles.push({
            id : article_tag.rows[i].id,
            title : article_tag.rows[i].title,
            snippet : article_tag.rows[i].description,
            picture : article_tag.rows[i].urltoimage,
            url : article_tag.rows[i].url,
            date : article_tag.rows[i].publishedat,
            like : tags_user.rows[0].like_url.includes(article_tag.rows[i].id) ? true : false,
        });
    }
    var end = {
        tag : id_tag,
        articles : articles,
    }
    res.status(200).send(end);
});

router.get("/for-you", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var articles = [];
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    var id_user = decoded.indice;
    var tags_interesst = await client.query("select tags from users where id =" + id_user + ";");
    var article_tag = await client.query("select * from articles;")
    for (let i = 0; i < tags_interesst.rows[0].tags.length; i++) {
        for (let j = 0; j < article_tag.rows.length; j++) {
            if (tags_interesst.rows[0].tags[i] == article_tag.rows[j].category_tags) {
                console.log(article_tag.rows[j])
                articles.push({
                    id : article_tag.rows[j].id,
                    category_tags : article_tag.rows[j].category_tags,
                    url : article_tag.rows[j].url,
                    title : article_tag.rows[j].title,
                    picture : article_tag.rows[j].urltoimage,
                    author : article_tag.rows[j].author,
                    date :  article_tag.rows[j].publishedat
                })
            }
        }
    }
    res.status(200).send(articles);
})


module.exports = router;