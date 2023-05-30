const pokemons = require("../models/pokemons");
const regions = require("../models/regions");
const types = require("../models/types");

exports.getPokemonlist = (req, res, next) => {

    pokemons.findAll({include:[{model: regions},{model: types}]}).then((result) => {
    const pokemon = result.map((result) => result.dataValues );
    
    res.render("admin/pokemones/pokemons-list",
    {pageTitle: "Pokemones-list", 
    pokeActive: true,
    pokemons: pokemon,
    haspokemons: pokemon.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddPokemon = (req, res, next) => {
    
    regions.findAll().then((result) => {
        types.findAll().then((result2) => {

            const region = result.map((result) => result.dataValues );
            const type = result2.map((result2) => result2.dataValues );
            res.render("admin/pokemones/save-pokemons",
            {pageTitle: "Agregar-pokemones",
            pokeActive: true,
            editMode: false,
            regions: region,
            types: type,
            hasregions: region.length > 0,
            hastypes: type.length > 0,});
            
        }).catch(err2 => {
            console.log(err2);
        });

    }).catch(err => {
        console.log(err);
    });
};

exports.postDeletePokemon = (req, res, next) => {
    
    const pokeid = req.body.pokeId;

    pokemons.destroy({where: {id: pokeid}}).then((result) => {
        res.redirect("/admin/pokemons");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddPokemon = (req, res, next) => {
    const name = req.body.name;
    const image = req.body.image;
    const region = req.body.region;
    const type = req.body.type;

    pokemons.create({name: name, imageurl: image, regionId: region, typeId: type}).then((result) => {
         res.redirect("/admin/pokemons");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditPokemon = (req, res, next) => {
    const edit = req.query.edit;
    const pokeId = req.params.pokemonId;

    if(!edit){
        return res.redirect("/admin/pokemons");
    }

    pokemons.findOne({where: {id: pokeId}}).then((result) => {
        const pokemon = result.dataValues;
        if(!pokemon){
            return res.redirect("/admin/pokemons");
        }

        regions.findAll().then((result2) => {
            types.findAll().then((result3) => {
    
                const region = result2.map((result2) => result2.dataValues );
                const type = result3.map((result3) => result3.dataValues );
                console.log (region.length > 0);
                console.log (type.length > 0);
                res.render("admin/pokemones/save-pokemons",
                    {pageTitle: "Editar-pokemones", 
                    pokeActive: true,
                    editMode: edit,
                    pokemon: pokemon,
                    regions: region,
                    types: type,
                    hasregions: region.length > 0,
                    hastypes: type.length > 0,});
            }).catch(err3 => {
                console.log(err3);
            });
    
        }).catch(err2 => {
            console.log(err2);
        });
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditPokemon = (req, res, next) => {
    const name = req.body.name;
    const image = req.body.image;
    const region = req.body.region;
    const type = req.body.type;
    const id = req.body.pokeId;

    pokemons.update({name: name, imageurl: image, regionId: region, typeId: type}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/pokemons");
    }).catch((err) => {
        console.log(err);
    });

    console.log(name, image, region, type);

    res.redirect("/admin/pokemons");
};

