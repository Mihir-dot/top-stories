const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/config');
const cors = require('cors');
const app = express();

// Use CORS middleware to allow all origins
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Import routes
const parentRoutes = require('./routes/parentRoutes');
const variantRoutes = require('./routes/variantRoutes');
app.use('/api', parentRoutes);
app.use('/api', variantRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
