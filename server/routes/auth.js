const router = require("express").Router();
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const {client} = require('../database/db');
const fs = require('file-system');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile'];

router.post("/login", async (req, res) => {
    if (!req.body.password || !req.body.email) {
        res.status(400).send("missing one or more arguments");
        return;
    }
    const response = await client.query("select * from users")
    console.log(response.rows.length);
    for (var i = 0; i < response.rows.length; i++) {
        if (response.rows[i].email == req.body.email) {
            var token = jwt.sign({indice : response.rows[i].id}, 'N4sti4_n4_pl8s_d_st4g9');
            res.status(200).send({token: token});
            return;
        }
    }
    res.status(400).send("you don't have an account")
});

router.get('/verify/:token', async (req, res) => {
    var token = req.params.token;
    const response = await client.query("select * from users")
    var decoded = jwt.verify(token, 'N4sti4_n4_pl8s_d_st4g9');
    for (var i = 0; i < response.rows.length; i++) {
        if (response.rows[i].email == decoded.email) {
            client.query("update users set verify = 'true';");
            req.body.verify = 'Verification succed';
            res.send(req.body.verify);
            return;
        }
    }
});

router.post("/register", async (req, res) => {
    const verify = false;
    if (!req.body.password || !req.body.email) {
        res.status(400).send("missing one or more arguments");
        return;
    }
    const response = await client.query("select * from users")
    for (var i = 0; i < response.rows.length; i++) {
        if (response.rows[i].email == req.body.email) {
            res.status(401).send("already have an account");
        }
    }
    var tmp = req.body.choose_tags;
    tmp = tmp.map(item => "'" + item + "'")
    console.log(tmp);
    var command = ("insert into users(email, password, verify, tags) values ('" + req.body.email + "', '" + req.body.password + "' , '" + verify + "' , ARRAY[" + tmp + "]);");
    const insert = await client.query(command)
    var token = jwt.sign({email: req.body.email}, 'N4sti4_n4_pl8s_d_st4g9');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jeanmarcelleaugustin@gmail.com',
                    pass: 'FakePasword'
                }
            });
            var url = "http://localhost:8080/auth/verify/".concat(token);
            var mailOptions = {
                from: 'flipboard@gmail.com',
                to: req.body.email,
                subject: 'Confirmate your EpiFlipboard account',
                text: "click on the following url to validate your account : ",
                html:url
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error)
                    console.log(error);
                else
                    console.log('Email sent: ' + info.response);
            });
    res.status(200).send("registered");
});


var client_secret;
var client_id;
var redirect_uris;
var cred = "";
var oAuth2Client;

fs.readFile("./credentials/credentials_google.json", (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    cred = JSON.parse(content);
    client_secret = cred.web.client_secret;
    client_id = cred.web.client_id;
    redirect_uris = cred.web.redirect_uris;
    oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
});


router.get("/google-connection", async (req, res) => {
    if (!req.headers.authorization) {
        res.send("not authorized")
        return;
    }
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        state: req.headers.authorization
    });
    res.send({authUrl: authUrl});
    
});

router.get("/google", async (req, res) => {
    console.log("test");
    tok = req.query.state;
    var decoded = jwt.verify(tok, "N4sti4_n4_pl8s_d_st4g9");

    oAuth2Client.getToken(req.query.code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        client.query("update users set authGmail = '" + JSON.stringify(token)+ "' where id = " + decoded.indice.toString() + ";");
        res.send("token send")
    });
})



const NewsAPI = require('newsapi');
router.get("/", async (req, res) => {
    var tags = ["business", "technology", "sports", "science", "health", "entertainment", "general"];
    for (let tag = 0; tag < tags.length; tag++) {
        const newsapi = new NewsAPI('5d5ba64da31d48d1a1a76a2ce20657c7');
        var response = await newsapi.v2.topHeadlines({
            category: tags[tag],
            language: 'en',
            country: 'us'
        })

        for (let i = 0; i < response.articles.length; i++) {
            var author = response.articles[i].author ? response.articles[i].author : "";
            var title = response.articles[i].title ? response.articles[i].title : "";
            var description = response.articles[i].description ? response.articles[i].description : "";
            var url = response.articles[i].url ? response.articles[i].url : "";
            var urlToImage = response.articles[i].urlToImage ? response.articles[i].urlToImage : "";
            var publishedAt = response.articles[i].publishedAt ? response.articles[i].publishedAt : "";
            var content = response.articles[i].content ? response.articles[i].content : "";
            client.query("insert into articles (category_tags, author, title, description, url, urltoimage, publishedat,content) values ('" + 
            tags[tag] + "','" + 
            author + "','" + 
            title + "','" + 
            description + "','" + 
            url + "','" + 
            urlToImage + "','" + 
            publishedAt + "','" + 
            content + "');");
        }
    }
    
    res.send(response.articles);
});


var request = require("request");
router.get("/newslist" , async (req, res) => {
    const newsapi = new NewsAPI('5d5ba64da31d48d1a1a76a2ce20657c7');
    newsapi.v2.sources({
        language: 'en',
        sources : 'Google News'
      }).then(response => {
        res.send(response)
      });
});


module.exports = router