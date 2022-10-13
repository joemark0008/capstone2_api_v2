const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;


// Require Routes
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express();

// Allows all resources to access our backend application
// Middleware
app.use(cors());
app.use(express.json());


// Connect to our MongoDB Database
mongoose.connect("mongodb+srv://admin:admin123@batch204-hufano.2rq00td.mongodb.net/Capstone-2?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", () => console.error.bind(console, "Error"));
db.once("open", () => console.log("Now connected to MongoDB Atlas!"));


// End routes
app.use('/users', userRoutes); 
app.use('/products', productRoutes); 

// Listen to the port
app.listen(port, () => {
	console.log(`API is now online on port ${port}`);
});

