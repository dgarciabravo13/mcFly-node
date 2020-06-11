const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

const note = require("./note.router.js");
router.use("/note", note);

const user = require("./user.router.js");
router.use("/user", user);

module.exports = router;
