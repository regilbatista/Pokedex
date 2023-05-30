const express = require("express");

const router = express.Router();


const adminTypesController = require("../controllers/adminTypesController");

router.get("/types", adminTypesController.getTypelist);

router.get("/add-types", adminTypesController.getAddType);

router.post("/add-types", adminTypesController.postAddType);

router.get("/edit-types/:typeId", adminTypesController.getEditType);

router.post("/edit-types", adminTypesController.postEditType);

router.post("/drop-types", adminTypesController.postDeleteType);

module.exports = router;