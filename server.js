// SECTION 1: Dependencies
const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();
const connectDb = require('./config/db');

// import user models
const User = require('./models/Signup');
// SECTION 2: Instantiations
const app = express();
const port = 4000;

// SECTION 3: Configurations
connectDb();
// set the templating engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));


// SECTION 4: Middleware
app.use(express.static(path.join(__dirname,'public')));
// To parse URL encoded data
app.use(express.urlencoded({ extended: false }));

// express-session configurations
app.use(expressSession({
  secret:"secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport configurations
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// global variable to make the logged in user available to all pug templates
app.use((req,res,next) => {
  res.locals.user = req.user || null
  next();
});


//5. ROUTES
// //for index
// app.use("/", require("./routes/indexRoutes"));
// //for stock
// app.use("/", require("./routes/stockRoutes"));
// //for sales
// app.use("/", require("./routes/salesRoutes"));
// //for admin
// app.use("/", require("./routes/adminRoutes"));
//for auth
app.use("/", require("./routes/authRoutes"));




// Second last chunk of code in this file ever
// Handling non-existent routes
app.use((req, res) => {
  res.status(404).send('Oops! Route not found.');
});

// SECTION 6: Bootstrapping Server
// Last line of code in this file ever because it's responsible for running the server.
app.listen(port, () => console.log(`listening on port ${port}`));