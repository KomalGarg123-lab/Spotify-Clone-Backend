const express = require('express');
const authController = require("../controllers/auth.controller");
const multer = require('multer');

const router = express.Router();

/** * MULTER CONFIGURATION
 * --------------------
 * We use 'memoryStorage' because we don't want to save files on our local server hard drive.
 * Instead, it keeps the file in RAM (temporary memory) as a "Buffer".
 * This is perfect for Spotify clones because we can send this Buffer directly 
 * to a cloud service (like Cloudinary or AWS S3) from the controller.
 */
const upload = multer({
    storage: multer.memoryStorage()
});

/**
 * ROUTE: User Registration
 * -----------------------
 * 1. Listening for a POST request at /api/auth/register.
 * 2. 'upload.single("photo")' is the gatekeeper. It looks for a file named "photo" 
 * in the incoming form, processes it, and attaches it to 'req.file'.
 * 3. After the file is processed, it moves to 'authController.registerUser' to 
 * save the user data and the image URL to the database.
 */
router.post('/register', upload.single("photo"), authController.registerUser);

/**
 * ROUTE: User Login
 * -----------------
 * Standard login. No file upload needed here. 
 * 'express.json()' (in app.js) will parse the email and password from 'req.body'.
 */
router.post('/login', authController.loginUser);

/**
 * ROUTE: User Logout
 * ------------------
 * This tells the server to clear the session or the login cookie 
 * (which we parsed using cookie-parser in app.js).
 */
router.post('/logout', authController.logoutUser);

// Export the router so it can be used in app.js under the prefix /api/auth
module.exports = router;