const pokemons = require("../models/pokemons");
const regions = require("../models/regions");
const types = require("../models/types");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
exports.getPokemon = (req, res, next) => {
    pokemons.findAll({include:[{model: regions},{model: types}]}).then((result) => {
        regions.findAll().then((result2) => {
        const region = result2.map((result2) => result2.dataValues );
        const pokemon = result.map((result) => result.dataValues );
        res.render("pokemones/index",
        {pageTitle: "Pokemones", 
        homeActive: true,
        pokemons: pokemon,
        regions: region,
        haspokemons: pokemon.length > 0,
          });
         }).catch(err2 => {
            console.log(err2);
         });
        }).catch(err => {
            console.log(err);
        });
};

exports.postfoundPokemon = (req, res, next) => {
    const name = req.body.pokemon;
    console.log(name);

     pokemons.findAll({ include:[{model: regions},{model: types}], where: { name: { [Op.like]: `${name+'%'}` } } }).then((result) => {
        regions.findAll().then((result2) => {
        const region = result2.map((result2) => result2.dataValues );
        const pokemon = result.map((result) => {return result.dataValues}  );
        if(!pokemon){
            return res.redirect("/");
        }
        res.render("pokemones/index",
        {pageTitle: "Pokemones", 
        homeActive: true,
        pokemons: pokemon,
        regions: region,
        haspokemons: pokemon.length > 0,
          });
        }).catch(err2 => {
            console.log(err2);
      });
    }).catch((err) => {
        console.log(err);
    });
};

exports.postfilterPokemon = (req, res, next) => {
    const filter = req.body.region;
    console.log(filter);

     pokemons.findAll({ include:[{model: regions},{model: types}], where: { regionId: { [Op.like]: `${filter+'%'}` } } }).then((result) => {
        regions.findAll().then((result2) => {
        const region = result2.map((result2) => result2.dataValues );
        const pokemon = result.map((result) => {return result.dataValues}  );
        if(!pokemon){
            return res.redirect("/");
        }
        res.render("pokemones/index",
        {pageTitle: "Pokemones", 
        homeActive: true,
        pokemons: pokemon,
        regions: region,
        haspokemons: pokemon.length > 0,
        filer: true,
          });
        }).catch(err2 => {
            console.log(err2);
      });
    }).catch((err) => {
        console.log(err);
    });
};
