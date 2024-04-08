
const express = require('express')
const app = express()
const cors = require('cors');
const AboutUsModal = require('../model/aboutusModal');
// app.use(cors())
app.use(cors({origin:true}))
const router = express.Router();
const Aws = require('aws-sdk');
const multer = require('multer')

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


router.post('/create', async (req, res) => {


    try {


        const newDoc = new AboutUsModal({
            heading: "",
            subheading: "",
            description: "",
            otherdata: {
                heading: "",
                image: "",
                details: "",
                data: [
                    {
                        heading: "",
                        image: "",
                        description: "",
                    },
                ]
            },
        });

        await newDoc.save();

        res.status(200).json({ message: 'create About data   successfully', data: newDoc });
    } catch (error) {
        console.error('Error create data:', error);
        res.status(500).json({ error: 'Failed create data' });
    }
});


router.get('/getData', async (req, res) => {
    try {
        const newDoc = await AboutUsModal.find();
        res.status(200).json(newDoc);
    } catch (error) {
        console.error('Error get list:', error);
        res.status(500).json({ error: 'Failed get list' });
    }
});

router.post('/updateMainData', async (req, res) => {
    const { heading, subheading, dataId, description } = req.body;
    const document = await AboutUsModal.findById(dataId);
    try {


        if (document) {
            document.heading = heading;
            document.subheading = subheading,
                document.description = description,
                await document.save();

            res.status(200).json({ message: 'Document updated successfully', document });
        } else {
            res.status(404).json({ error: 'Document not found' });
        }

    }

    catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal server error' });
    }
})

router.post('/AddotherData', async (req, res) => {
    const { dataId } = req.body;
    console.log(dataId);
    try {
        const document = await AboutUsModal.findById(dataId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Push new data into the array
        document.otherdata.data.push({
            heading: "",
            image: "",
            description: "",
        });

        await document.save();

        res.status(200).json({ message: 'Document updated successfully', document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





router.post('/editOtherData', upload.single('file'), async (req, res) => {
    const { dataId, heading, details } = req.body;
    try {
        const document = await AboutUsModal.findById(dataId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        if (req.file) {
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

                    if (heading) {
                        document.otherdata.heading = heading;
                    }
                    if (details) {
                        document.otherdata.details = details;
                    }

                    document.otherdata.image = data.Location;
                    await document.save();

                    res.status(200).json(document);
                }

            });

        } else {

            if (heading) {
                document.otherdata.heading = heading;
            }
            if (details) {
                document.otherdata.details = details;
            }
            await document.save();

            res.status(200).json({ message: 'Document updated successfully', document });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/edittableData', upload.single('file'), async (req, res) => {
    const { dataId, dataObjectId, heading, description } = req.body;
    try {
        const document = await AboutUsModal.findById(dataId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        const dataIndex = document.otherdata.data.findIndex(data => data._id.toString() === dataObjectId);

        if (dataIndex === -1) {
            return res.status(400).json({ error: 'Data object not found' });
        }

        // Update the data object at the specified index with new data
        const dataToUpdate = document.otherdata.data[dataIndex];

        if (req.file) {
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

                    if (heading) {
                        dataToUpdate.heading = heading;
                    }
                    if (description) {
                        dataToUpdate.description = description;
                    }

                    dataToUpdate.image = data.Location;
                    await document.save();

                    res.status(200).json({ message: 'Document updated successfully', document });
                }

            });

        } else {

            if (heading) {
                dataToUpdate.heading = heading;
            }
            // if (image) {
            //     dataToUpdate.image = image;
            // }
            if (description) {
                dataToUpdate.description = description;
            }

            await document.save();

            res.status(200).json({ message: 'Document updated successfully', document });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router
