const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
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
} = require('../controllers/user');



//multer
// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});

const upload = multer({ storage: storage });




router.use(bodyParser.json());
router.use(express.static('views'));
router.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory
router.use(bodyParser.urlencoded({ extended: true }));

// Routes
router.get("/", handleIndexFile);
router.get("/sign_up", handleSignUp);
router.get("/adminPanel", handleAdminPanel);
router.get("/userPanel", handleUserPanel);
router.get("/blog", handleBlogCreate);



router.post("/log-in", handleLogin);
router.post('/sign_up', handleSign_Up); // Ensure upload is used correctly here
router.post("/submit-blog",upload.single('image'), handleBlog);


// Routes for tailor management
router.post("/update_tailor", handleUpdateTailor);
router.post("/delete_blog_by_admin", handleDeleteBlogbyAdmin);

module.exports = router;
