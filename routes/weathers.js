const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");


// Retorna todos os produtos -> GET
router.get("/", weatherController.index);

router.post("/", weatherController.store);

router.get("/:weather_id", weatherController.show);


module.exports = router;