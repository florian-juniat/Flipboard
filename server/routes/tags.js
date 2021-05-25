const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {client} = require('../database/db');

router.get("/", async (req, res) => {
    var tmp = await client.query("select tags from tags");
    res.status(200).send(tmp.rows);
});


module.exports = router;