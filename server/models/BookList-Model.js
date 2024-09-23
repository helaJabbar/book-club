const mongoose = require('mongoose');

// Schéma du livre
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  
    },
    description: {
        type: String,
        required: true,  
    },
    imageUrl: {
        type: String,
        required: true,  
    },
});  

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;
