
const express = require('express')
const app = express()
const cors = require('cors');
const LoginModal = require('../model/loginModal');
// app.use(cors())
app.use(cors({origin:true}))
const path = require("path");
const fs = require('fs')
const Aws = require('aws-sdk');
const multer = require('multer')

const router = express.Router();




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, 'Documents')); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

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




// router.post('/addDocuments', upload.single('file'), async (req, res) => {
//     const { name, id } = req.body;

//     try {
//         const existingData = await LoginModal.findById(id);

//         if (!existingData) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }
//         const filePath = path.relative(path.join(__dirname, 'Documents'), req.file.path);
//         existingData.documents.push({ image: filePath, name: name });

//         await existingData.save();

//         res.status(200).json({ message: 'Documents updated successfully', user: existingData });
//     } catch (error) {
//         console.error('Error updating documents:', error);
//         res.status(500).json({ error: 'Failed to update documents' });
//     }
// });

router.post('/profileImage', upload.single('file'), async (req, res) => {
    const { id } = req.body;

    try {
        const existingData = await LoginModal.findById(id);

        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // const filePath = path.relative(path.join(__dirname, 'Documents'), req.file.path);

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: 'image/jpeg'
        };

        s3.upload(params, async(error, data) => {
            if (error) {
                res.status(500).send({ "err": error });
            } else {
                existingData.image = data.Location
                await existingData.save();

                res.status(200).json({ message: 'Documents updated successfully', user: existingData });
            }
        });

        // existingData.image = filePath;

        // await existingData.save();

        // res.status(200).json({ message: 'Documents updated successfully', user: existingData });
    } catch (error) {
        console.error('Error updating documents:', error);
        res.status(500).json({ error: 'Failed to update documents' });
    }
});

router.get('/file/:filename', (req, res) => {
    const fileName = req.params.filename;
    res.sendFile(__dirname + `/Documents/${fileName}`);
});

router.post('/createAccount', async (req, res) => {
    const { email, name, number, password } = req.body;

    try {
        const existingData = await LoginModal.findOne({ email });
        if (existingData) {
            return res.status(400).send({ error: 'email already exists' });
        }
        const existingData1 = await LoginModal.findOne({ number });
        if (existingData1) {
            return res.status(400).send({ error: 'number already exists' });
        }
        else {

            const newDoc = new LoginModal({ name: name, email: email, password: password, number: number, image: '' });

            await newDoc.save();

            res.status(200).json({ message: 'create account  successfully' });
        }
    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});

router.post('/ForgotPassword', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingData = await LoginModal.findOne({ email });
        if (!existingData) {
            return res.status(400).send({ error: 'Email does not exist' });
        } else {
            // Update the password
            existingData.password = password;
            await existingData.save();

            res.status(200).json({ message: 'Password updated successfully' });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Failed to update password' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingData = await LoginModal.findOne({ email });
        if (existingData) {
            if (existingData.password === password) {

                res.status(200).json(existingData);
            }
            else {
                res.status(500).json({ error: 'Not find account' });

            }
        }

    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});


router.post('/editAccount', async (req, res) => {
    const { email, name, number, id } = req.body;

    try {
        // Find the user by ID
        const existingData = await LoginModal.findById(id);
        console.log(existingData)
        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user information
        if (email) {
            existingData.email = email;
        }
        if (name) {
            existingData.name = name;
        }
        if (number) {
            existingData.number = number;
        }

        // Save the updated user document
        await existingData.save();

        res.status(200).json({ message: 'User information updated successfully', user: existingData });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

router.post('/getuser', async (req, res) => {
    const { id } = req.body;

    try {
        const existingData = await LoginModal.findById(id);
        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User information get successfully', user: existingData });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Failed to update user information' });
    }
});

router.post('/addDocuments', upload.single('file'), async (req, res) => {
    const { name, id } = req.body;

    try {
        const existingData = await LoginModal.findById(id);

        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

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
                existingData.documents.push({ image: data.Location, name });
                await existingData.save();
    
                res.status(200).json({ message: 'Documents updated successfully', user: existingData });
            }

        });

    } catch (error) {
        console.error('Error updating documents:', error);
        res.status(500).json({ error: 'Failed to update documents' });
    }
});

router.post('/deleteDocument', async (req, res) => {
    const { userId, docId } = req.body;

    try {
        // Find the user by ID
        const existingData = await LoginModal.findById({ _id: userId });

        if (!existingData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the document within the user's documents array
        const documentIndex = existingData.documents.findIndex(doc => doc._id == docId);

        if (documentIndex === -1) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Remove the document from the documents array
        existingData.documents.splice(documentIndex, 1);

        // Save the updated user document
        await existingData.save();

        res.status(200).json({ message: 'Document deleted successfully', user: existingData });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});





module.exports = router
