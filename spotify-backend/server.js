require('dotenv').config(); 
// .env file पढ़कर variables (MONGO_URI, JWT_SECRET, etc.) को process.env में डालता है
// IMPORTANT: ये सबसे पहले चलना चाहिए ताकि बाकी files env use कर सकें

const app = require('./src/app'); 
// Express app import → इसमें middleware + routes defined हैं
// (app.use, cors, routes mapping etc.)

const connectDB = require('./src/db/db'); 
// function जो MongoDB से connection बनाता है (mongoose.connect)

connectDB(); 
// DB connect करते हैं पहले → ताकि बाद में कोई API DB use करे तो error ना आए

app.listen(3000, () => { 
  // server start होता है और port 3000 पर incoming requests listen करता है
  // frontend जब API call करेगा (http://localhost:3000/...) तो request यहीं आएगी
  
  console.log('Server is running on port 3000');
});