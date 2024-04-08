const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    heading: { type: String },
    subheading: { type: String },
    description: { type: String },
    otherdata: {
        heading: String,
        image: String,
        details: String,
        data: [
            {
                heading: String,
                image: String,
                description: String,
            },
        ]
    },


});

const AboutUsModal = mongoose.model('AboutUsData', aboutSchema);

module.exports = AboutUsModal;