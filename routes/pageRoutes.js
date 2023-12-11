const express = require("express");
const router = express.Router();

const { renderIndex } = require("../controllers/pageController");

router.get("/", renderIndex);

module.exports = router;
