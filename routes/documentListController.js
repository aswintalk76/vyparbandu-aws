const express = require('express')
const app = express()
const cors = require('cors');
// app.use(cors())
app.use(cors({origin:true}))
const DocumentListModal = require('../model/documentListModal');
const multer = require('multer')
const path = require("path");
const fs = require('fs')
const router = express.Router();
const Aws = require('aws-sdk');

require('dotenv/config');


const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '');
    }
});

const upload = multer({ storage: storage });

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, 'Documents')); // Destination folder for storing files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Filename with timestamp to avoid overwriting
//     }
// });

// const upload = multer({ storage: storage });

router.post('/create',upload.single('file'), async (req, res) => {

    try {
        const { name } = req.body;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: 'image/jpeg'
        };

        s3.upload(params, async (error, data) => {
            if (error) {
                console.error('Error uploading file to S3:', error);
                return res.status(500).json({ error: 'Failed to upload file to S3' });
            } else {
                const newDoc = new DocumentListModal({ name: name, image: data.Location });
        
                await newDoc.save();
        
                res.status(200).json({ message: 'Document Type saved successfully' });
            }

        });
    } catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }

});


router.get('/list', async (req, res) => {

    try {
        const documentData = await DocumentListModal.find();
        res.status(200).json(documentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post('/delete', async (req, res) => {

    try {
        const { dataId } = req.body;

        const documentData = await DocumentListModal.findByIdAndDelete({ _id: dataId });
        res.status(200).json({ message: 'Document Type delete successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});




module.exports = router