const express = require("express");
const router = express.Router();
const cityController = require("../controllers/CityController");


router.get("/", cityController.index);

router.post("/", cityController.store);

router.get("/:city_id", cityController.show);


module.exports = router;
