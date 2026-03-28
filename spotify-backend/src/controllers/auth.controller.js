const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { uploadFile } = require("../services/storage.service")


/**
 * REGISTER USER CONTROLLER
 * This is the "Heart" of the Spotify Clone's onboarding.
 * It handles: Security (Bcrypt), Identity (JWT), and Media (ImageKit).
 */
async function registerUser(req, res) {

    // 1. DATA EXTRACTION: Pull info from the request body.
    // Default 'role' to "user" if the frontend doesn't specify (Listener vs Artist).
    const { username, email, password, role = "user" } = req.body;

    // 2. DUPLICATE CHECK: Prevent two people from using the same Email/Username.
    // We use $or because both must be unique in our Spotify database.
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        // 409 Conflict: Tell the user "This account is already taken!"
        return res.status(409).json({ message: "User already exists" })
    }

    // 3. PASSWORD HASHING (THE ONE-WAY STREET):
    // We NEVER save plain text. Even if a hacker steals the DB, they see gibberish.
    // '10' is the salt rounds; it makes the math slow enough to stop brute-force attacks.
    const hash = await bcrypt.hash(password, 10)

    let photoUri;
    const file = req.file; // This is the buffer provided by Multer memoryStorage.

    // 4. MEDIA UPLOAD: Only upload a profile pic if they are an "artist".
    if (file && role === "artist") {
        // Convert the binary Buffer to a Base64 string so ImageKit can "travel" with it.
        // uploadFile returns the Cloud URL where the image is permanently stored.
        const uploadResult = await uploadFile(file.buffer.toString('base64'));
        photoUri = uploadResult.url;
    }

    // 5. DATABASE CREATION: Save the user. 
    // Notice: We save the 'hash', NOT the 'password'.
    const user = await userModel.create({
        username,
        email,
        password: hash, 
        role,
        photoUri, // This is just a link (String), the actual pixels are in ImageKit.
    })

    // 6. JWT GENERATION (THE ID CARD):
    // We sign the User's ID and Role using our secret 'Stamp' (JWT_SECRET).
    // If a hacker tries to change the role, the 'Signature' will break.
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    // 7. COOKIE DELIVERY (THE POCKET):
    // We give the browser the ID card. Because it's a cookie, the browser 
    // will automatically send it back every time the user plays a song.
    res.cookie("token", token)

    // 8. FINAL RESPONSE: Send success, but DON'T send the password back!
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photoUri: user.photoUri,
        }
    })
}


async function loginUser(req, res) {

    console.log("BODY:", req.body)

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials try with another password " })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            photoUri: user.photoUri,
        }
    })

}


async function logoutUser(req, res) {
res.clearCookie("token")
res.status(200).json({ message: "User logged out successfully" })
}


module.exports = { registerUser, loginUser, logoutUser }