const path = require('path');
const express = require('express');
const HANDLEBARS = require('handlebars');
const {engine} = require("express-handlebars");
const sequelize = require("./util/database");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Pokemon = require("./models/pokemons");
const Region = require("./models/regions");
const type = require("./models/types");

const compareHelpers = require("./util/helpers/hbs/compare");
const errorController = require("./controllers/errorController");


const app = express();
app.engine("hbs", engine({
    layousDir: "views/layouts/", 
    defaultLayout: "main-layout", 
    extname: "hbs",
    helpers:{
        equals: compareHelpers.equals,
       },
    handlebars: allowInsecurePrototypeAccess(HANDLEBARS),
    }, 
    ));
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));

const pokemonsRouter = require("./routes/pokemons");

const adminRouter = require("./routes/admin");
const adminRegionRouter = require("./routes/adminRegion");
const adminTypesRouter = require("./routes/adminTypes");

app.use("/admin",adminRouter);
app.use("/admin",adminRegionRouter);
app.use("/admin",adminTypesRouter);
app.use(pokemonsRouter);

app.use(errorController.Get404);

Pokemon.belongsTo(Region, {constraints: true, onDelete: "CASCADE"});
Region.hasMany(Pokemon);
Pokemon.belongsTo(type, {constraints: true, onDelete: "CASCADE"});
type.hasMany(Pokemon);

sequelize.sync().then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});

