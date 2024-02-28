const express = require("express");
const router = express.Router();
const peopleCtrl = require("../controllers/people");

router.get("/", peopleCtrl.getAllPeople);
router.get("/:id", peopleCtrl.getPeople);

module.exports = router;
