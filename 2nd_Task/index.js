const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/user");



const { connectMongoDb } = require('./connection');

const app = express();
app.set('view engine', 'ejs');




app.use(bodyParser.json());
app.use(express.static('views'));
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory
app.use(bodyParser.urlencoded({ extended: true }));

connectMongoDb('mongodb://localhost:27017/Blogs');

app.use("/", userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
