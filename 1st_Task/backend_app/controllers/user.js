const User = require("../Models/user");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const path = require("path");

router.use(bodyParser.json());
router.use(express.static("views"));
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

////////////////////////

async function handleSign_Up(req, res) {
  try {
    // Check if user already exists based on email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User with the same email already exists.");
    }

    // Create a new user instance
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phoneNumber,
      gender: req.body.gender,
      password: req.body.password,
    });

    // Save the new user
    await newUser.save();
    console.log("Record inserted successfully");

    // Generate verification code
    
    // Redirect to email verification page
    return res.redirect("/index.html");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleIndexFile(req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
}

async function handleSignUp(req, res) {
  res.render('sign_up');
}



async function handleFindUserByEmail(req, res) {
  try {
    // Find tailor by email
    const foundUser = await User.findOne({ email: req.body.email });

    // If tailor not found, send response
    if (!foundUser) {
      return res.status(404).send("User not found.");
    }

    // Redirect to update.html with tailor details as query parameters
    return res.redirect(
      `/update_user.html?name=${foundUser.name}&age=${foundUser.age}&email=${foundUser.email}&phone=${foundUser.phone}&gender=${foundUser.gender}`
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}


async function handleUpdateUser(req, res) {
  try {
    // Extract data from the request body
    const { name, age, email, phone, gender, password } = req.body;

    // Find the tailor by email
    const foundTailor = await User.findOne({ email });

    // If tailor not found, send response
    if (!foundTailor) {
      return res.status(404).send("User not found.");
    }

    // Update tailor details
    foundTailor.name = name;
    foundTailor.age = age;
    foundTailor.phone = phone;
    foundTailor.gender = gender;
    foundTailor.password = password;

    // Save the updated tailor
    await foundTailor.save();

    // Redirect to admin.html
    return res.redirect("/index.html");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleDeleteUserbyEmail(req, res) {
  try {
    // Find tailor by email
    const foundTailor = await User.findOneAndDelete({
      email: req.body.email,
    });

    // If tailor not found, send response
    if (!foundTailor) {
      return res.status(404).send("User not found.");
     
    }

    // Redirect to admin.html with tailor details as query parameters
    return res.redirect(
      `/index.html?name=${foundTailor.name}&age=${foundTailor.age}&email=${foundTailor.email}&phone=${foundTailor.phone}&gender=${foundTailor.gender}`
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}



async function handleGetUserByEmail(req, res) {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};


async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({});

    if (!users.length) {
      return res.status(404).send("No users found");
    }

    res.render('users', { users });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}


module.exports = {
  handleSignUp,
  handleIndexFile,
  handleSign_Up,
  handleFindUserByEmail,
  handleUpdateUser,
  handleDeleteUserbyEmail,
  handleGetUserByEmail,
  handleGetAllUsers,
};
