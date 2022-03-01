const express = require("express");
const router = express();
const passport = require("passport");

// Passport Middleware
router.use(passport.initialize());

// Passport Configuration
require("../config/passport")(passport);

module.exports = router;
