const express = require('express');
const app = express();
const connectDB=require('./database/db')
require('dotenv').config();
const cors = require('cors') 
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoute')
const PORT = process.env.PORT || 3000;
connectDB()
app.use(express.json()); // Place this before defining routes
app.use(express.urlencoded({extended:true}))
app.use(cors())
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use('/api/auth',authRoutes)
app.use('/api/books',bookRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
