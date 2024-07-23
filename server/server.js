const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./database');
const admin = require('./api/routes/admin_routes')
const user = require('./api/routes/general_routes');
const hairstylist = require('./api/routes/stylist_route');
const authorization = require('./api/routes/authorization')
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json( {limit: "50mb" }));
app.use(bodyParser.json());

app.use('/api/admin', admin);
app.use('/api/users', user);
app.use('/api/hairstylist', hairstylist)
app.use('/api/authorization', authorization)

app.get('', (req, res) => {
    res.status(200).json({ message: "Welcome to Dyablue" })
})

 
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


