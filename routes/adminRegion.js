const express = require("express");

const router = express.Router();


const adminRegionController = require("../controllers/adminRegionController");

router.get("/regions", adminRegionController.getRegionlist);

router.get("/add-regions", adminRegionController.getAddRegion);

router.post("/add-regions", adminRegionController.postAddRegion);

router.get("/edit-regions/:regionId", adminRegionController.getEditRegion);

router.post("/edit-regions", adminRegionController.postEditRegion);

router.post("/drop-regions", adminRegionController.postDeleteRegion);

module.exports = router;