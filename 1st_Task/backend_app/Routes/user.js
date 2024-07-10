// Import necessary modules and functions
const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const {
    handleSignUp,
    handleIndexFile,
    handleSign_Up,
    handleGetUserByEmail,
    handleFindUserByEmail,
    handleUpdateUser,
    handleDeleteUserbyEmail,
    handleGetAllUsers,


} = require('../controllers/user');

//middleware for parsingw the body
router.use(bodyParser.json());
router.use(express.static('views'));
router.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
router.get("/", handleIndexFile);
router.get("/sign_up", handleSignUp);


router.post("/sign_up", handleSign_Up);




// New route for handling forgot password form submission
router.post("/find_tailor",handleFindUserByEmail)
router.post("/update_tailor",handleUpdateUser)
router.post("/all_users",handleDeleteUserbyEmail)
router.post("/delete_tailor",handleDeleteUserbyEmail)


router.post("/allusers",handleGetAllUsers)




module.exports = router;