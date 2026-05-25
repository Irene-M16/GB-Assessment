const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/Signup");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { fname, lname, email, role, phone, password,} = req.body;

    if (!terms) {
      return res.render("signup", { error: "You must agree to the Terms of Service." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered." });
    }

    const phoneRegex = /^(\+256|0)(7\d{8}|4[0-5]\d{7})$/;
    const ninRegex = /^[A-Z0-9]{14}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.render("signup", { error: "Enter a valid Ugandan phone number." });
    }
    if (!ninRegex.test(nin.replace(/\s/g, '').toUpperCase())) {
      return res.render("signup", { error: "NIN must be exactly 14 characters (letters and numbers only)." });
    }

    const newUser = new User({
      fname,
      lname,
      email: email.toLowerCase(),
      role: role.toLowerCase(),
      phone,
      nin: nin.toUpperCase(),
      terms: true,
      notification: true,
      status: 'Active',
    });

    await User.register(newUser, password);
    res.redirect("/login");

  } catch (error) {
    console.error(error);
    res.render("signup", { error: error.message });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
}), (req, res) => {

  return res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;