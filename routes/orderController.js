
const express = require('express')
const app = express()
const cors = require('cors');
const OrderDataModal = require('../model/orderModal');
// app.use(cors())
app.use(cors({origin:true}))

const router = express.Router();


router.post('/createOrder', async (req, res) => {
    const { userData, package, userId } = req.body;

    try {
        const newDoc = new OrderDataModal({ status: 'pending', userData: userData, package: package, userId: userId });
        await newDoc.save();
        res.status(200).json(newDoc);

    } catch (error) {
        console.error('Error create account:', error);
        res.status(500).json({ error: 'Failed create account' });
    }
});

router.get('/getOrder', async (req, res) => {

    try {
        const newDoc = await OrderDataModal.find();

        res.status(200).json(newDoc);

    } catch (error) {
        console.error('Error data get:', error);
        res.status(500).json({ error: 'Failed data get' });
    }
});
router.post('/getUserOrder', async (req, res) => {
    const { userId } = req.body

    try {
        const newDoc = await OrderDataModal.find({ userId: userId });

        res.status(200).json(newDoc);

    } catch (error) {
        console.error('Error data get:', error);
        res.status(500).json({ error: 'Failed data get' });
    }
});
router.post('/changeStatus', async (req, res) => {
    const { userId, status } = req.body

    try {
        const newDoc = await OrderDataModal.findById({ _id: userId });
        console.log(newDoc)
        if (status) {
            newDoc.status = status;
        }
      

        await newDoc.save();

        res.status(200).json({ message: 'User information updated successfully', user: newDoc });


    } catch (error) {
        console.error('Error data get:', error);
        res.status(500).json({ error: 'Failed data get' });
    }
});
router.post('/deleteOrder', async (req, res) => {
    const { userId } = req.body

    try {
        const newDoc = await OrderDataModal.deleteOne({ _id: userId });;
        res.status(200).json({ message: 'User information updated successfully' });


    } catch (error) {
        console.error('Error data get:', error);
        res.status(500).json({ error: 'Failed data get' });
    }
});


module.exports = router
