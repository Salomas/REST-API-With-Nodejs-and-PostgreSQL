const express = require("express");
const router = express.Router();
const ForecastController = require("../controllers/ForecastController");

// Retorna todos os produtos -> GET


router.post("/city_id/weather_id", ForecastController.store);

router.get("/:city_name", ForecastController.show);


module.exports = router;
