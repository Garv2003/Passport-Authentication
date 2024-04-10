const passport = require("passport");
const router = require("express").Router();
const {
  GetLogin,
  GetProfile,
  GetSign,
  PostSign,
  LogOut,
} = require("../controllers/auth");

router.get("/login", GetLogin);
router.get("/", GetProfile);
router.get("/signin", GetSign);
router.get("/logout", LogOut);

router.post("/signin", PostSign);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.json({ status: "success" });
  }
);

module.exports = router;
