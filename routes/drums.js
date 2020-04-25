const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/drums', (req, res, next) => {
  res.render('drums');
});

module.exports = router;