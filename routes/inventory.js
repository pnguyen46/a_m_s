const { Router } = require("express");
const router = Router();
const inventoryController = require('../controllers/inventory');
router.get("/", inventoryController.getIndex);

router.get("/searchItem", async (req, res, next) => {
  try {
    const { searchItem, searchQty, searchBrand, searchLocation } = req.query;
    const item = await inventory.find({
      $or: [{ name: searchItem }, { quantity: searchQty }, { Brand: searchBrand },{location:searchLocation}]
    }).find({userId:req.user._id});
    req.session.searchResult = item;
    res.redirect('/inventory');
  } catch (error) {
    return next(error);
  }
});

router.get("/:id",inventoryController.getItem);

router.post("/", inventoryController.postItem);

router.put("/editItem/:id", inventoryController.updateItem);

router.delete("/deleteItem/:id", inventoryController.deleteItem);

module.exports = router;
