var express = require("express");
var mongoose = require("mongoose");

var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var fs = require('fs');
var passport = require("passport");

var routes = require("./routes");
var passportsetup = require("./passportsetup");
var app = express();
var Favicon = require("express-favicon");



mongoose.connect("mongodb://raul:Raul123@ds125872.mlab.com:25872/porteros_nest", { useNewUrlParser: true });

passportsetup();


app.set("port", process.env.PORT || 3000);

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "HOLA ESTE ES MI PRIMER TRABAJO EN MONGODB",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize({
    userProperty: "usuarios"
}));
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), () => {
    console.log("La aplicacion inicio por el puerto " + app.get("port"));
});