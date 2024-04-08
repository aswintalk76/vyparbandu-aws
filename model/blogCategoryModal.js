const mongoose = require('mongoose');


const blogCategorySchema = new mongoose.Schema({
   
    categoryName: {
        type: String,
    },
  
   
    
  
});

const blogCategoryModal = mongoose.model('BlogCategory', blogCategorySchema);

module.exports = blogCategoryModal;