const User = require("../Models/user");
const Blog = require("../Models/blog");
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

let role = "";




const handleAdminPanel = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send("Email is required");
    }

    const tailors = await Blog.find({ createdby:email });
    console.log(`Blogs fetched for user: ${email}`, tailors);

    res.render('adminPanel', { tailors });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
};




const handleUserPanel = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).send("Email is required");
    }

    const tailors = await Blog.find({ createdby:email });
    console.log(`Blogs fetched for user: ${email}`, tailors);

    res.render('userPanel', { tailors });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
};



async function handleIndexFile(req, res) {
  try {
      const tailors = await Blog.find({ }); // Adjust query based on your role definition
      res.render('index', { tailors });
  } catch (error) {
      console.error("Error fetching tailors:", error);
      res.status(500).send("Internal Server Error");
  }
};

async function handleBlogCreate(req,res) {
  return res.render("blog.html");
}

////////////////////////

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).send("Invalid email or password");
    }

    console.log(`User logged in: ${email}, Role: ${user.role}`);

    if (user.role === "USER") {
      return res.redirect(`userPanel?email=${email}`);
    } else if (user.role === "ADMIN") {
      return res.redirect(`adminPanel?email=${email}`);
    } else {
      return res.redirect("log-in.html");
    }
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};





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
          role: req.body.role,
          password: req.body.password,
      });

      role=newUser.role;

      // Save the new user
      await newUser.save();
      console.log("Record inserted successfully");
      res.redirect("Log-in.html");

      
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
  }
}

//
async function handleBlog(req, res) {
  try {
      // Check if user already exists based on email
      const existingUser = await Blog.findOne({ title: req.body.title });
      if (existingUser) {
          return res.status(400).send("Blog with the same title already exists.");
      }

      // Create a new user instance
      const newBlog = new Blog({
          title: req.body.title,
          description: req.body.description,
          createdby: req.body.createdby,
          imageUrl: req.file ? req.file.filename : null // Save the uploaded image filename

      });

      // Save the new user
      await newBlog.save();
      console.log("Record inserted successfully");

      const rol = await User.find({email:req.body.createdby});

      


      const tailors = await Blog.find({ createdby:req.body.createdby });


    // Redirect to admin.html with tailor details as query parameters
    if(rol.role=="ADMIN")
    {
      res.render('adminPanel', { tailors });
    }
    else{
      res.render('userPanel', { tailors });
    }

     
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
  }
}


async function handleSignUp(req, res) {
  res.sendFile(path.join(__dirname, "views", "sign_up.html"));
}



async function handleUpdateTailor(req, res) {
  try {
    // Extract data from the request body
    const { name, age, email, phone, gender, role, password } = req.body;

    // Find the tailor by email
    const foundTailor = await User.findOne({ email });

    // If tailor not found, send response
    if (!foundTailor) {
      return res.status(404).send("Tailor not found.");
    }

    // Update tailor details
    foundTailor.name = name;
    foundTailor.age = age;
    foundTailor.phone = phone;
    foundTailor.gender = gender;
    foundTailor.role = role;
    foundTailor.password = password;

    // Save the updated tailor
    await foundTailor.save();

    // Send email to updated tailor with new password
    const mailOptions = {
      from: "f219202@cfd.nu.edu.pk.com",
      to: email,
      subject: "Your password has been updated",
      text: `Dear ${name}, your password has been updated successfully. Your new password is: ${password}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to updated tailor with new password.");

    // Redirect to admin.html
    return res.redirect("/admin.html");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleDeleteBlogbyAdmin(req, res) {
  try {
    // Find tailor by email
    const foundTailor = await Blog.findOneAndDelete({
      title: req.body.title,
      createdby:req.body.email
    });

    if (!foundTailor) {
      return res.status(404).send("Blog not found.");
    }

    const rol = await User.find({email:req.body.email});

    // If tailor not found, send response
    if (!rol) {
      return res.status(404).send("User not found.");
    }

    const tailors = await Blog.find({ createdby:req.body.email });


    // Redirect to admin.html with tailor details as query parameters
    if(rol.role=="ADMIN")
    {
      res.render('adminPanel', { tailors });
    }
    else{
      res.render('userPanel', { tailors });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}








module.exports = {
  handleLogin,
  handleSignUp,
  handleIndexFile,
  handleSign_Up,
  handleUpdateTailor,
  handleAdminPanel,
  handleUserPanel,
  handleBlogCreate,
  handleBlog,
  handleDeleteBlogbyAdmin,
};
