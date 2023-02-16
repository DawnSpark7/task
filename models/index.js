const mongoose = require('mongoose')


// Define the schema for the admin collection
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// // Add an admin login to the collection
// const admin = new Admin({ email: 'admin@example.com', password: 'Kaname#29' });

// admin.save((err, admin) => {
//     if (err) return console.error(err);
//     console.log('Admin login created: ' + admin.email);
// });

// Schema for users
const usersSchema = mongoose.Schema({
    name: {
     type: String,
     required: true
    },
    email: {
     type: String,
     required: true,
     unique: true
    },
    password: {
     type: String,
     required: true
    }
   })

// Creating the collection
const Admin = mongoose.model('Admin', adminSchema);
const Users = mongoose.model('Users', usersSchema)

// Export the users Model
module.exports = {Users, Admin};