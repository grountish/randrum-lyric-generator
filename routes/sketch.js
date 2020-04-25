const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/sketch', (req, res, next) => {
  res.render('sketch');
});

module.exports = router;