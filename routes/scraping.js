// /Dpendencies
const cheerio = require("cheerio");

// // Scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");

// Require all models
const db = require("../models");

// // Routes
// // Following lines of code are responsible for scraping articles to the handlberas pages.
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index", { title: "Main" });
  });
  app.get("/api/all", function (req, res) {
    db.Article.find({})
      .populate("notes")
      .then(function (scrapedArticles) {
        // If all Users are successfully found, send them back to the client
        res.render("saved", { title: "articles", scrapedArticles: scrapedArticles })
      })
      .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });

  });
  app.get("/api/scrape", function (req, res) {
    const scrapedArticles = [];
    axios.get("https://www.chron.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      let $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $(".article-deck a:first-child").each(function (i, element) {
        // Save an empty result object
        let result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .text();
        result.link = $(this)
          .attr("href");
        scrapedArticles.push(result);
      })
    }).then(_ => {
      res.render("index", { title: "Main", scrapedArticles: scrapedArticles })
    })

  });
  app.post("/api/post", function (req, res) {
    db.Article.create({ title: req.body.title, link: req.body.link })
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, it will be logged here
        console.log(err);
      });
  });
  app.post("/api/note/:id", function (req, res) {
    const id = req.params.id;
    db.Note.create({ text: req.body.text })
      .then(function (dbNote) {
        return db.Article.findOneAndUpdate({ _id: id }, { $push: { notes: dbNote._id } }, { new: true });
      })
      .then(function (aSingleNote) {
        res.json(aSingleNote);
        // Send the user back to prior client, only IF the user was updated correctly from notes
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  app.delete("/api/article/:id", function (req, res) {
    const id = req.params.id;
    db.Article.findByIdAndDelete(id)
      .then(function (dbArticle) {
        // May see the noted note in the console
        console.log(dbArticle);
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, it will be logged here
        console.log(err);
      });
  });
  app.delete("/api/note/:id", function (req, res) {
    const id = req.params.id;
    db.Note.findByIdAndDelete(id)
      .then(function (dbNote) {
        // May see the noted note in the console
        console.log(dbNote);
        res.json(dbNote);
      })
      .catch(function (err) {
        // If an error occurred, it will be logged here
        console.log(err);
      });
  })
};