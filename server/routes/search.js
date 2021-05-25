const router = require("express").Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const {client} = require('../database/db');
const NewsAPI = require('newsapi');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getElementByName(searchElement, article_tag) {
    var articles = [];
    var search = searchElement.split(' ')
    search = search.filter(item => item.length > 0)
    search = search.map(item => item.toLowerCase())

    for (let i = 0; i < article_tag.length; i++) {
        var find = false
        for (var j = 0; j < search.length; j++) {
            find = find || article_tag[i].category_tags.toLowerCase().includes(search[j])
            find = find || article_tag[i].description.toLowerCase().includes(search[j])
            find = find || article_tag[i].content.toLowerCase().includes(search[j])
            find = find || article_tag[i].author.toLowerCase().includes(search[j])
            find = find || article_tag[i].title.toLowerCase().includes(search[j])
        }
        if (find === true && article_tag[i].urltoimage.length > 10 && article_tag[i].urltoimage[0] == 'h') {
            articles.push({
                id : article_tag[i].id,
                category_tags : article_tag[i].category_tags,
                url : article_tag[i].url,
                title : article_tag[i].title,
                image : article_tag[i].urltoimage,
                author : article_tag[i].author,
                description: article_tag[i].description
            })
        }
    }
    return articles
}

router.get("/explorer", async (req, res) => {

    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var article_tag = await client.query("select * from articles;")
    var articles = article_tag.rows
    
    var ret = []
    var feature = []
    while (feature.length < 10) {
        var alea = getRandomInt(articles.length)
        if (!feature.includes(articles[alea]) && articles[alea].urltoimage.length > 10 && articles[alea].urltoimage[0] == 'h') {
            feature.push(articles[alea])
        }
    }
    var feature_inedit = []
    for (var i = 0; i < 4; i++) {
        feature_inedit.push({
            id: feature[i].id,
            title: feature[i].title,
            url : feature[i].url,
            image: feature[i].urltoimage
        })
    }
    var info_feature = []
    for (var i = 4; i < 10; i++) {
        info_feature.push({
            id: feature[i].id,
            title: feature[i].title,
            url : feature[i].url,
            image: feature[i].urltoimage
        })
    }
    ret.push({
        id: ret.length,
        name: "inédit",
        indice: ret.length,
        inedit: feature_inedit,
        info: info_feature
    })

    var game = []
    var idea_game = ["game", "sony", "play"]
    var id_game = []
    for (var i = 0; i < idea_game.length; i++) {
        var oneGame = getElementByName(idea_game[i], articles)
        for (var j = 0; j < oneGame.length; j++) {
            if (id_game.includes(oneGame[j].id) == false) {
                id_game.push(oneGame[j].id)
                game.push(oneGame[j])
            }
        }
    }
    var game_inedit = []
    var info_game = []
    for (var i = 0; i <  Math.round(game.length / 3); i++) {
        game_inedit.push(game[i])
    }
    for (var i =  Math.round(game.length / 3); i < game.length; i++) {
        info_game.push(game[i])
    }
    ret.push({
        id: ret.length,
        name: "game",
        indice: ret.length,
        inedit: game_inedit,
        info: info_game
    })




    var solar = []
    var idea_solar = ["solar", "moon", "plane", "sun", "sky", "air", "rocket"]
    var id_solar = []
    for (var i = 0; i < idea_solar.length; i++) {
        var oneGame = getElementByName(idea_solar[i], articles)
        for (var j = 0; j < oneGame.length; j++) {
            if (id_solar.includes(oneGame[j].id) == false) {
                id_solar.push(oneGame[j].id)
                solar.push(oneGame[j])
            }
        }
    }
    var solar_inedit = []
    var info_solar = []
    for (var i = 0; i <  Math.round(solar.length / 3); i++) {
        solar_inedit.push(solar[i])
    }
    for (var i =  Math.round(solar.length / 3); i < solar.length; i++) {
        console.log(i)
        info_solar.push(solar[i])
    }
    ret.push({
        id: ret.length,
        name: "sky",
        indice: ret.length,
        inedit: solar_inedit,
        info: info_solar
    })

    var nature = []
    var idea_nature = ["animal", "life", "tree", "flower", "plant"]
    var id_nature = []
    for (var i = 0; i < idea_nature.length; i++) {
        var oneGame = getElementByName(idea_nature[i], articles)
        for (var j = 0; j < oneGame.length; j++) {
            if (id_nature.includes(oneGame[j].id) == false) {
                id_nature.push(oneGame[j].id)
                nature.push(oneGame[j])
            }
        }
    }
    var nature_inedit = []
    var info_nature = []
    for (var i = 0; i <  Math.round(nature.length / 3); i++) {
        nature_inedit.push(nature[i])
    }
    for (var i =  Math.round(nature.length / 3); i < nature.length; i++) {
        info_nature.push(nature[i])
    }
    ret.push({
        id: ret.length,
        name: "nature",
        indice: ret.length,
        inedit: nature_inedit,
        info: info_nature
    })


    res.send(ret)
})


router.post("/", async (req, res) => {

    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    if (!req.body.search) {
        res.status(401).send("Missing body")
        return
    }
    var articles = [];
    var article_tag = await client.query("select * from articles;")
    var search = req.body.search.split(' ')
    search = search.filter(item => item.length > 0)
    search = search.map(item => item.toLowerCase())

    for (let i = 0; i < article_tag.rows.length; i++) {
        var find = false
        for (var j = 0; j < search.length; j++) {
            find = find || article_tag.rows[i].category_tags.toLowerCase().includes(search[j])
            find = find || article_tag.rows[i].description.toLowerCase().includes(search[j])
            find = find || article_tag.rows[i].content.toLowerCase().includes(search[j])
            find = find || article_tag.rows[i].author.toLowerCase().includes(search[j])
            find = find || article_tag.rows[i].title.toLowerCase().includes(search[j])
        }
        if (find === true) {
            articles.push({
                id : article_tag.rows[i].id,
                category_tags : article_tag.rows[i].category_tags,
                url : article_tag.rows[i].url,
                title : article_tag.rows[i].title,
                picture : article_tag.rows[i].urltoimage,
                author : article_tag.rows[i].author,
                description: article_tag.rows[i].description
            })
        }
    }
    res.status(200).send(articles);
});

module.exports = router;