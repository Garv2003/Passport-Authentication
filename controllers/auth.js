const bcrypt = require("bcrypt");
const User = require("../model/user");
const userSchema = require("../schema/user");

GetLogin = (req, res) => {
  res.render("login");
};

GetProfile = async (req, res) => {
  if (req.user) {
    const user = await User.findOne({ username: req.user.username });
    return res.render("profile", { user });
  }
  res.redirect("/login");
};

GetSign = (req, res) => {
  res.render("signin");
};

PostSign = async (req, res) => {
  try {
    const { value, error } = userSchema.validate(req.body);
    if (error) {
      return res.json({ message: error.message });
    }
    const user = await User.findOne({ username: value.username });
    if (user) {
      return res.json({
        message: "User already exists try another username",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    const newUser = new User({
      username: value.username,
      name: value.name,
      password: hashedPassword,
      email: value.email,
    });
    await newUser.save();
    res.json({ message: "Signup successful", success: true });
  } catch (err) {
    res.json({ message: "Internal server error", error: err });
  }
};

LogOut = (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
};

module.exports = {
  GetLogin,
  GetProfile,
  GetSign,
  PostSign,
  LogOut,
};
