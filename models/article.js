// Require mongoose package
var mongoose = require("mongoose");

// Save a reference to the Schema constructor (Making Schema Class)
var Schema = mongoose.Schema;

// Creates a new UserSchema object, using the Schema constructor
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean
    },
    // note: object that stores a Note "id"
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Model is made from the above schema, using "mongoose's model method"
var Article = mongoose.model("Article", ArticleSchema);

// Exporting Article model
module.exports = Article;