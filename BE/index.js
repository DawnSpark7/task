const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors')
const port = 3000;

const { Books, Admin } = require("./models");
const { validateJWTToken } = require("./utils");
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
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

// Route for handling the login form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the admin user by email
  const admin = await Admin.findOne({ email });

  // Check if the password is correct
  const passwordMatch = String(password).match(admin?.password);

  // If no user is found, return an error
  if (!admin || !passwordMatch) {
    return res.status(401).send({
      status: 0,
      message: "Invalid email or password"
    });
  }

  // Create a JWT token for the authenticated user
  const token = jwt.sign({ email: admin.email }, "Test#Secret@123");

  res.send({
    status: 1,
    message: "Successful Login",
    data: {
      token,
      email: admin.email
    },
  });
});

app.post("/getAllUsers", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  validateJWTToken(token).then((response) => {
    if (response.status) {
      // Retrieve all users from the database
      Books.find()
        .then((userdata) => res.send({
          status: 1,
          data: userdata
        }))
        .catch((err) => res.send(err));
    } else {
      res.send({
        status: 0,
        message: {message: response.message},
      });
    }
  });
});

app.post("/borrowBook", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const {id, email} = req.body;
  validateJWTToken(token).then((resp) => {
    if (resp.status) {
      // Retrieve all users from the database
      Books.findById(id)
        .then((bookdata) => {
          // console.log("Previous ", bookdata);

          if(bookdata) {
            
            Admin.findOne({ email })
            .then(user => {

              if (user) {
                const newData = user.borrowedBooks.bookIds
                const newCount = user.borrowedBooks.count + 1;
                newData.push(bookdata._id)

                const update = {
                  $set: {
                    borrowedBooks: {
                      count: newCount,
                      bookIds: newData,
                    },
                  },
                };
  
                Admin.updateOne({ email }, update)
                .then(user => {
                   if(user.acknowledged) {
                      const newQty = bookdata.qty - 1;
                      const update = {
                        $set: {
                          qty: newQty
                        },
                      };

                      Books.findByIdAndUpdate(id, update)
                      .then(book => {
                        if(book) {
                          res.send({
                            status: 1,
                            message: 'Success'
                          })
                        }
                      })
                   }
                });
              } else {
                throw new Error('User not found');
              }
            })

          }

        })
        .catch((err) => res.send(err));
    } else {
      res.send({
        status: 0,
        message: {message: response.message},
      });
    }
  });
});

app.post("/getBorrowDetails", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { email } = req.body;

  validateJWTToken(token).then((response) => {
    if (response.status) {
      // Retrieve all users from the database
      Admin.findOne({ email })
        .then((userdata) => {
            res.send({
            status: 1,
            data: userdata?.borrowedBooks
          })
        })
        .catch((err) => res.send(err));
    } else {
      res.send({
        status: 0,
        message: {message: response.message},
      });
    }
  });
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

app.listen(port, () => console.log(`Up and running ⚡ @ ${port}!`));
