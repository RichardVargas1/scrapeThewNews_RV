// Require mongoose package
var mongoose = require("mongoose");
// Saving a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to the model of Sequelize
var NoteSchema = new Schema({
    // `title` is of type String
    title: String,
    // `body` is of type String
    body: String
    // article: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Article"
    // },
});

// Model is made from the above schema, using "mongoose's model method"
var Note = mongoose.model("Note", NoteSchema);

// Exporting Note model
module.exports = Note;