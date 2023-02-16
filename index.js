const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

const { Users, Admin } = require("./models");
const { validateJWTToken } = require("./utils");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "N!ruva$huT@!puZ3r0",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://Kaname:Kaname-29@crud.oivx6kz.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB 💾");
  })
  .catch((error) => {
    console.log(error);
  });

// Reading a Userdata from MongoDB
app.get("/:id", (req, res) => {
  validateJWTToken(token).then((response) => {
    if (response.status) {
      Users.findById(req.params.id, ({ user }) => res.send(user));
    } else {
      res.send({
        status: 0,
        message: response.message,
      });
    }
  });
});

// Route for handling the login form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the admin user by email
  const admin = await Admin.findOne({ email });

  // Check if the password is correct
  const passwordMatch = String(password).match(admin.password);

  // If no user is found, return an error
  if (!admin || !passwordMatch) {
    return res.status(401).send("Invalid email or password");
  }

  // Create a JWT token for the authenticated user
  const token = jwt.sign({ email: admin.email }, "Test#Secret@123");

  res.send({
    status: 1,
    message: "Successful Login",
    data: {
      token,
    },
  });
});

app.post("/getAllUsers", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  validateJWTToken(token).then((response) => {
    if (response.status) {
      // Retrieve all users from the database
      Users.find()
        .then((userdata) => res.send(userdata))
        .catch((err) => res.send(err));
    } else {
      res.send({
        status: 0,
        message: response.message,
      });
    }
  });
});

// Adding a User to MongoDB
app.post("/addUser", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  fullname = req.body.name;
  email = req.body.email;
  password = req.body.password;

  try {
    let newUser = new Users({
      name: fullname,
      email: email,
      password: password,
    });

    validateJWTToken(token).then((response) => {
      if (response.status) {
        newUser
          .save()
          .then(() => {
            res.send({
              status: 1,
              message: "User created successfully",
            });
          })
          .catch((err) => {
            // In case user exists with email
            if (err.code === 11000) {
              res.send({
                status: 0,
                message: "User exists with given email",
              });
            }
          });
      } else {
        res.send({
          status: 0,
          message: response.message,
        });
      }
    });
  } catch (err) {
    res.send({
      status: 0,
      message: "Something went wrong! Please try again later",
    });
  }
});

// Adding Admin User to MongoDB
/**
    app.post('/addAdmin', (req, res) => {

        console.log(req.body);

        email = req.body?.email,
        password = req.body?.password

        let newAdmin = new Admin({
            email: email,
            password: password
        })

        newAdmin.save().then((result) => {
            res.send({
                status: 1,
                message: 'Admin created successfully!'
            })
        }).catch((err) => console.log(err))
    })
*/

// Updating the User in MongoDB
app.post("/updateUser/:id", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let user = {};
  if (req.body?.name) {
    user.name = req.body.name;
  }

  if (req.body?.email) {
    user.email = req.body.email;
  }

  if (req.body?.password) {
    user.password = req.body.password;
  }

  user = { $set: user };

  try {
    validateJWTToken(token).then((response) => {
      if (response.status) {
        Users.updateOne({ _id: req.params.id }, user)
          .then(() => {
            res.send({
              status: 1,
              message: "User updated successfuly",
            });
          })
          .catch((err) =>
            res.send({
              status: 0,
              message: "Something went wrong! Please try again later",
            })
          );
      } else {
        res.send({
          status: 0,
          message: response.message,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle any errors
  }
});

// Deleting the User from MongoDB
app.delete("/deleteUser/:id", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    validateJWTToken(token).then((response) => {
      if (response.status) {
        Users.deleteOne({ _id: req.params.id })
          .then(() => {
            res.send({
              status: 1,
              message: "User deleted successfully",
            });
          })
          .catch((err) =>
            res.send({
              status: 0,
              message: "Something went wrong! Please try again later",
            })
          );
      } else {
        res.send({
          status: 0,
          message: response.message,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => console.log(`Up and running ⚡ @ ${port}!`));
