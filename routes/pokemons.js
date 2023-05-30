const express = require("express");

const router = express.Router();


const pokemonsController = require("../controllers/pokemonsController");

router.get("/", pokemonsController.getPokemon);

router.post("/found", pokemonsController.postfoundPokemon);

router.post("/filter", pokemonsController.postfilterPokemon);




module.exports = router;