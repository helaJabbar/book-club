const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
