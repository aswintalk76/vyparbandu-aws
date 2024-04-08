const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable all CORS requests
app.use(cors());

// Example route
app.get('/', (req, res) => {
  res.send('Server is working!!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
