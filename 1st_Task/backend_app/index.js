const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/user");

const { connectMongoDB } = require('./connection');

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(express.static('views'));
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory
app.use(bodyParser.urlencoded({ extended: true }));

connectMongoDB('mongodb://localhost:27017/CRUD_API');

app.use("/", userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
