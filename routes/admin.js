const express = require("express");

const router = express.Router();


const adminController = require("../controllers/adminController");

router.get("/pokemons", adminController.getPokemonlist);

router.get("/add-pokemons", adminController.getAddPokemon);

router.post("/add-pokemons", adminController.postAddPokemon);

router.get("/edit-pokemons/:pokemonId", adminController.getEditPokemon);

router.post("/edit-pokemons", adminController.postEditPokemon);

router.post("/drop-pokemons", adminController.postDeletePokemon);

module.exports = router;