// All require modules
var express = require("express");
var ejs = require("ejs");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require("./config/favicon.js");
var flash = require("connect-flash");
var https = require("https");
var http = require("http");
var httpsOptions = require("./config/https.js");
var Connection = require("./config/connection.js");


// Creating appp
var app = express();

//Public folder to use 
app.use("/Images", express.static(__dirname + "/public/Images"));
app.use("/CSS", express.static(__dirname + "/public/css"));
app.use("/JS", express.static(__dirname + "/public/js"));
app.use("/FONT", express.static(__dirname + "/public/font"));


// Set view engine
app.set("view engine", "ejs");

// assign port number
var port = process.env.PORT || 2002;

//seting favicon by passing app
favicon(app);

app.use(flash());
app.use(cookieParser("this is cokkie for TaxManager"));
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'Bittu',
    resave: false,
    saveUninitialized: false
}));

//for http data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app using midelwaer 
app.use((req, res, next) => {
    res.locals.succes = req.flash("succes");
    res.locals.error = req.flash("error");
    next();
});


//  Routes
app.use("/", require("./routes/mainpageroutes.js"));
app.use("/service", require("./routes/serviceroutes.js"));
app.use("/blog", require("./routes/blogroutes.js"));
app.use("/terms-and-conditions", require("./routes/termsandconditionsroutes.js"));


//Error 404 page
app.get("/*", (req, res) => {
    return res.status(404).render("../views/mainpages/error-404.ejs", { title: "Error 404 " });
});


// Creating server
http.createServer(httpsOptions, app).listen(port, () => {
    console.log("Server Runing on this port" + port);
    console.log(`http://localhost:${port}`);
});