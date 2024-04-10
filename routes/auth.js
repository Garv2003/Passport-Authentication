const bcrypt = require("bcrypt");
const passport = require("passport");
const router = require("express").Router();
const User = require("../model/user");
const joi = require("joi");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

router.get("/", (req, res) => {
  res.render("profile");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.redirect("/");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    });
    await newUser.save();
    res.redirect("/");
  } catch {
    res.redirect("/signin");
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
