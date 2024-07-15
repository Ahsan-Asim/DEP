const mongoose = require("mongoose");

// Define user schema
const blogSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    description: String,
    createdby: String,
    imageUrl: String // Add this field

});


// Create user model
const Blog = mongoose.model('Blog', blogSchema);

module.exports=Blog;