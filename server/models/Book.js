const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    caption: {
        type:String , 
        required:true 
    } ,
    image:{
        type:String, 
        required:true , 
    },
    rating:{
        type:String , 
        required:true 
    },
     user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
