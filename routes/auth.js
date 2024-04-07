const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const Product = require("../model/product");
const Post = require("../model/post");
const passport = require("passport");
const router = require("express").Router();
const User = require("../model/user");
const joi = require("joi");

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    req.flash("success", "Successfully logged in");
    res.redirect("/profile");
  }
);

router.get("/profile", async (req, res) => {
  const id = req.user._id.toString();
  try {
    res.render("profile", { user: req.user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  res.render("login");
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

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      image: req.body.image,
      User: req.user._id,
    });
    await newProduct.save();
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    res.redirect("/create");
  }
});

router.get("/showproduct", async (req, res) => {
  const product = await Product.find({}).populate("User");
  res.render("showproduct", { products: product });
});

router.get("/getpost", async (req, res) => {
  const post = await Post.find({});
  res.send([post, req.user._id]);
});

router.get("/showpost", async (req, res) => {
  const post = await Post.find({});
  res.render("showpost", { post: post, UserId: req.user._id });
});

router.get("/showcart", async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");
  res.render("showcart", { user: user, products: user.cart });
});

router.post("/addtocart/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  const user = await User.findById(req.user._id);
  // if(user.cart.includes(product._id)){
  //   return res.send("product already added to cart");
  // }
  user.cart.push({ product: product._id, quantity: 1 });
  await user.save();
  res.send("product added to cart");
});

router.post("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.like.includes(req.user._id)) {
      post.like.pull(req.user._id);
    } else {
      post.like.push(req.user._id);
    }
    post.save();
    res.json("send");
  } catch (err) {
    console.log(err);
  }
});

router.post("/createpost", (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      image: req.body.image,
      user: req.user._id,
    });
    newPost.save();
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
    res.redirect("/createpost");
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
