const mongoose = require("mongoose");

// Define the schema for the admin collection
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  borrowedBooks: {
    count: { type: Number, default: 0 },
    bookIds: [String]
  }
});

// // Add an admin login to the collection
// const admin = new Admin({ email: 'admin@example.com', password: 'Kaname#29' });

// admin.save((err, admin) => {
//     if (err) return console.error(err);
//     console.log('Admin login created: ' + admin.email);
// });

// Schema for users
const booksSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

// Creating the collection
const Admin = mongoose.model("Admin", adminSchema);
const Books = mongoose.model("Books", booksSchema);

// Export the users Model
module.exports = { Books, Admin };
