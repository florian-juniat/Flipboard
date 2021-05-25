const cors = require('cors')
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const http = require("http").createServer(app)

const authRouter = require("./routes/auth");
const tagsRouter = require("./routes/tags");
const homeRouter = require("./routes/home");
const profilRouter = require("./routes/profil");
const searchRouter = require("./routes/search");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/auth", authRouter);
app.use("/tags", tagsRouter);
app.use("/home", homeRouter);
app.use("/profil", profilRouter);
app.use("/search", searchRouter)

app.get("/", (req, res) => {
	res.send("this is not a server")
})

// app.use((req, res, next) => {
//     const err = new Error(`${req.method} ${req.url} Not Found`);
//     err.status = 404;
//     next(err);
// });

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  });

http.listen(8080, '0.0.0.0' ,() => {
	console.log("listening on port 8080")
})