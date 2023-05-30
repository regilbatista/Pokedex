const types = require("../models/types");

exports.getTypelist = (req, res, next) => {

    types.findAll().then((result) => {

    const type = result.map((result) => result.dataValues );
    res.render("admin/types/type-list",
    {pageTitle: "Tipos-list", 
    typeActive: true,
    types: type,
    hastypes: type.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddType = (req, res, next) => {
    res.render("admin/types/save-type",
    {pageTitle: "Agregar-Tipos",
     typeActive: true,
     editMode: false});
};

exports.postDeleteType = (req, res, next) => {
    
    const typeid = req.body.typeId;

    types.destroy({where: {id: typeid}}).then((result) => {
        res.redirect("/admin/types");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddType = (req, res, next) => {
    const name = req.body.name;
    

    types.create({name: name }).then((result) => {
         res.redirect("/admin/types");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditType = (req, res, next) => {
    const edit = req.query.edit;
    const typeid = req.params.typeId;

    if(!edit){
        return res.redirect("/admin/types");
    }

    types.findOne({where: {id: typeid}}).then((result) => {
        const type = result.dataValues;
        if(!type){
            return res.redirect("/admin/types");
        }

        res.render("admin/types/save-type",
        {pageTitle: "Editar-Tipos", 
        typeActive: true,
        editMode: edit,
        type: type});
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditType = (req, res, next) => {
    const name = req.body.name;
    const id = req.body.typeId;

    types.update({name: name }, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/types");
    }).catch((err) => {
        console.log(err);
    });
};

