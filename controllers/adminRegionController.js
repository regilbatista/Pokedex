const regions = require("../models/regions");

exports.getRegionlist = (req, res, next) => {

    regions.findAll().then((result) => {

    
    const region = result.map((result) => result.dataValues );
    res.render("admin/regions/region-list",
    {pageTitle: "Regiones-list", 
    regionsActive: true,
    regions: region,
    hasregions: region.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddRegion = (req, res, next) => {
    res.render("admin/regions/save-region",
    {pageTitle: "Agregar-Regiones",
    regionsActive: true,
     editMode: false});
};

exports.postDeleteRegion = (req, res, next) => {
    
    const regionid = req.body.regiId;

    regions.destroy({where: {id: regionid}}).then((result) => {
        res.redirect("/admin/regions");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddRegion = (req, res, next) => {
    const name = req.body.name;


    regions.create({name: name }).then((result) => {
         res.redirect("/admin/regions");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditRegion = (req, res, next) => {
    const edit = req.query.edit;
    const regionid = req.params.regionId;

    if(!edit){
        return res.redirect("/admin/regions");
    }

    regions.findOne({where: {id: regionid}}).then((result) => {
        const region = result.dataValues;
        if(!region){
            return res.redirect("/admin/regions");
        }

        res.render("admin/regions/save-region",
        {pageTitle: "Editar-regiones", 
        regionsActive: true,
        editMode: edit,
        region: region});
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditRegion = (req, res, next) => {
    const name = req.body.name;
    const id = req.body.regiId;

    regions.update({name: name}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/regions");
    }).catch((err) => {
        console.log(err);
    });
};

