const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    sliderImage:[{image:String}],
    services:
    {
        heading: String,
        data: [
            {
                name: String,
                image: String,
                details: String
            },
        ]
    },
    workFlow:{
        heading: String,
        image: String,
        data: [
            {
                name: String,
            },
        ]
    },
    about:{
        heading: String,
        description: String,
        image: String,
        data: [
            {
                name: String,
            },
        ]
    },
    whyvyparbandhu:{
        heading: String,
        image: String,
        data: [
            {
                image:String,
                name: String,
            },
        ]
    },


});

const HomepageModal = mongoose.model('HomepageData', homeSchema);

module.exports = HomepageModal;