// Dependencies
const bodyParser = require("body-parser");
const express = require("express");
const handlebars = require("handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

// Set Port
const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware:

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(process.cwd() + "/public"));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Handlebars const
handlebars.registerHelper('each_upto', function (ary, max, options) {
    if (!ary || ary.length == 0)
        return options.inverse(this);

    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

// Mongo deployed database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Require Routes
require("./routes/scraping")(app);

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
