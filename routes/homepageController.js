
const express = require('express')
const app = express()
const cors = require('cors');
const ExpertCallModal = require('../model/exportCallModal');
const ConatctUsCallModal = require('../model/contactusModal');
const HomepageModal = require('../model/homepageModal');
// app.use(cors())
app.use(cors({ origin: true }))

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



router.post('/creat', async (req, res) => {


    try {


        const newDoc = new HomepageModal({
            sliderImage: [{ image: " " }],
            services:
            {
                heading: "Our Most Popular Services",
                data: [
                    {
                        name: "",
                        image: "",
                        details: ""
                    },
                    {
                        name: "",
                        image: "",
                        details: ""
                    },
                    {
                        name: "",
                        image: "",
                        details: ""
                    },
                    {
                        name: "",
                        image: "",
                        details: ""
                    },
                    {
                        name: "",
                        image: "",
                        details: ""
                    },
                    {
                        name: "",
                        image: "",
                        details: ""
                    },
                ]
            },
            workFlow: {
                heading: "Our Work Flow",
                image: '',
                data: [
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },
                    {
                        name: "",
                    },

                ]
            },
            about: {
                heading: "About Vyapar Bandhu",
                description: "",
                image: "",
                data: [
                    {
                        name: "",
                    },
                ]
            },
            whyvyparbandhu: {
                heading: "Why Vyapar Bandhu",
                image: "",
                data: [
                    {
                        image: "",
                        name: "",
                    },
                    {
                        image: "",
                        name: "",
                    },
                    {
                        image: "",
                        name: "",
                    },
                    {
                        image: "",
                        name: "",
                    },
                    {
                        image: "",
                        name: "",
                    },
                    {
                        image: "",
                        name: "",
                    },
                ]
            },
        });

        await newDoc.save();

        res.status(200).json({ message: 'create Expert call   successfully', data: newDoc });
    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});


router.get('/getData', async (req, res) => {
    try {
        const newDoc = await HomepageModal.find();
        res.status(200).json(newDoc);
    } catch (error) {
        console.error('Error get list:', error);
        res.status(500).json({ error: 'Failed get list' });
    }
});
router.post('/delete', async (req, res) => {
    const { dataId } = req.body
    try {
        const newDoc = await HomepageModal.findOneAndDelete({ _id: dataId });
        await newDoc.save();
        res.status(200).json(newDoc);
    } catch (error) {
        console.error('Error get list:', error);
        res.status(500).json({ error: 'Failed get list' });
    }
});




router.post('/addImage', async (req, res) => {
    const { innerId } = req.body;
    try {

        const doc = await HomepageModal.findById({ _id: innerId });
        console.log(doc)

        doc.sliderImage.push({ image: "" });

        await doc.save();

        res.status(200).json(doc);
    } catch (error) {
        console.error('Error adding blank object to slider:', error);
        res.status(500).json({ error: 'Failed to add blank object to slider' });
    }
});
router.post('/addAttribute', async (req, res) => {
    const { innerId } = req.body;
    try {

        const doc = await HomepageModal.findById({ _id: innerId });
        console.log(doc)

        doc.about.data.push({ name: "" });

        await doc.save();

        res.status(200).json(doc);
    } catch (error) {
        console.error('Error adding blank object to slider:', error);
        res.status(500).json({ error: 'Failed to add blank object to slider' });
    }
});

router.post('/deleteImage', async (req, res) => {
    try {
        const { docId, objectId } = req.body;
        console.log(docId, objectId)

        const doc = await HomepageModal.findById({ _id: docId });

        doc.sliderImage = doc.sliderImage.filter(obj => obj._id.toString() == objectId);


        await doc.save();

        res.status(200).json({ message: "delete successfully" });
    } catch (error) {
        console.error('Error deleting object from slider:', error);
        res.status(500).json({ error: 'Failed to delete object from slider' });
    }
});

router.post('/saveImage', upload.single('file'), async (req, res) => {
    const { dataId, Imageid } = req.body;
    console.log(dataId, 'dataId');
    console.log(Imageid, 'Imageid');
    try {

        const doc = await HomepageModal.findById(dataId);
        console.log(doc)

        // doc.sliderImage = doc.sliderImage.filter(obj => obj._id.toString() != Imageid);
        const stepTwoDataIndex = doc.sliderImage.findIndex(data => data._id.toString() == Imageid);
        console.log(stepTwoDataIndex)
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
                doc.sliderImage[stepTwoDataIndex].image = data.Location;


                await doc.save();

                res.status(200).json(doc);
            }

        });

    } catch (error) {
        console.error('Error deleting object from slider:', error);
        res.status(500).json({ error: 'Failed to delete object from slider' });
    }
});

router.post('/mostHeadingsave', async (req, res) => {
    const { dataid, heading } = req.body;
    try {

        const doc = await HomepageModal.findById({ _id: dataid });
        console.log(doc)

        doc.services.heading = heading;

        await doc.save();

        res.status(200).json(doc);
    } catch (error) {
        console.error('Error adding blank object :', error);
        res.status(500).json({ error: 'Failed to add blank object ' });
    }
});

router.post('/overworkHeadingsave', upload.single('file'), async (req, res) => {
    const { dataId, heading } = req.body;
    console.log(dataId, heading)
    try {

        const doc = await HomepageModal.findById({ _id: dataId });
        console.log(doc)
        if (!doc) {
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
                    doc.workFlow.heading = heading;
                    doc.workFlow.image = data.Location;

                    await doc.save();

                    res.status(200).json(doc);
                }

            });

        } else {

            doc.workFlow.heading = heading;

            await doc.save();

            res.status(200).json(doc);
        }

    } catch (error) {
        console.error('Error adding blank object :', error);
        res.status(500).json({ error: 'Failed to add blank object ' });
    }
});

router.post('/abutHeadingsave', upload.single('file'), async (req, res) => {
    const { dataid, heading, description } = req.body;
    try {

        const doc = await HomepageModal.findById({ _id: dataid });
        if (!doc) {
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
                    doc.about.heading = heading;
                    doc.about.description = description;
                    doc.about.image = data.Location;

                    await doc.save();

                    res.status(200).json(doc);
                }

            });

        } else {

            doc.about.heading = heading;
            doc.about.description = description;

            await doc.save();

            res.status(200).json(doc);
        }

    } catch (error) {
        console.error('Error adding blank object :', error);
        res.status(500).json({ error: 'Failed to add blank object ' });
    }
});

router.post('/whyHeadingsave', upload.single('file'), async (req, res) => {
    const { dataid, heading } = req.body;
    try {

        const doc = await HomepageModal.findById({ _id: dataid });
        if (!doc) {
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
                    doc.whyvyparbandhu.heading = heading;
                    doc.whyvyparbandhu.image = data.Location;

                    await doc.save();

                    res.status(200).json(doc);
                }

            });

        } else {

            doc.whyvyparbandhu.heading = heading;

            await doc.save();

            res.status(200).json(doc);
        }
    } catch (error) {
        console.error('Error adding blank object :', error);
        res.status(500).json({ error: 'Failed to add blank object ' });
    }
});


router.post('/saveServices', upload.single('file'), async (req, res) => {
    const { mainID, dataId, name, details } = req.body;

    try {

        const doc = await HomepageModal.findById(mainID);
        console.log(doc)

        const stepTwoDataIndex = doc.services.data.findIndex(data => data._id.toString() == dataId);

        if (req.file) {
            console.log('call ', req.file)
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

                    console.log(data.Location, 'data.Location')
                    doc.services.data[stepTwoDataIndex].name = name;
                    doc.services.data[stepTwoDataIndex].details = details;
                    doc.services.data[stepTwoDataIndex].image = data.Location;


                    await doc.save();

                    res.status(200).json(doc);
                }

            });
        } else {

            doc.services.data[stepTwoDataIndex].name = name;
            doc.services.data[stepTwoDataIndex].details = details;


            await doc.save();

            res.status(200).json(doc);
        }


    }

    catch (error) {
        console.error('Error deleting object from slider:', error);
        res.status(500).json({ error: 'Failed to delete object from slider' });
    }
});

router.post('/saveAbout', async (req, res) => {
    const { mainID, dataId, name } = req.body;

    try {

        const doc = await HomepageModal.findById(mainID);
        const stepTwoDataIndex = doc.about.data.findIndex(data => data._id.toString() == dataId);
        doc.about.data[stepTwoDataIndex].name = name;
        await doc.save();
        res.status(200).json(doc);

    }

    catch (error) {
        console.error('Error deleting object from slider:', error);
        res.status(500).json({ error: 'Failed to delete object from slider' });
    }
});

router.post('/saveOur', async (req, res) => {
    const { mainID, dataId, name } = req.body;

    try {

        const doc = await HomepageModal.findById(mainID);
        const stepTwoDataIndex = doc.workFlow.data.findIndex(data => data._id.toString() == dataId);
        doc.workFlow.data[stepTwoDataIndex].name = name;
        await doc.save();
        res.status(200).json(doc);

    }

    catch (error) {
        console.error('Error deleting object from slider:', error);
        res.status(500).json({ error: 'Failed to delete object from slider' });
    }
});

router.post('/saveWhyVypar', upload.single('file'), async (req, res) => {
    const { mainID, dataId, name } = req.body;

    try {

        const doc = await HomepageModal.findById(mainID);
        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }
        const stepTwoDataIndex = doc.whyvyparbandhu.data.findIndex(data => data._id.toString() == dataId);

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
                    doc.whyvyparbandhu.data[stepTwoDataIndex].name = name;
                    doc.whyvyparbandhu.data[stepTwoDataIndex].image = data.Location;
                    await doc.save();
                    res.status(200).json(doc);
                }

            });
        } else {

            doc.whyvyparbandhu.data[stepTwoDataIndex].name = name;
            await doc.save();
            res.status(200).json(doc);
        }

    }

    catch (error) {
        console.error('Error deleting object from slider:', error);
        res.status(500).json({ error: 'Failed to delete object from slider' });
    }
});

module.exports = router
