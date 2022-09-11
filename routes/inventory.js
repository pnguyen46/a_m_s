const { Router } = require("express");

const router = Router();
const inventory = require("../models/Inventory");

router.get("/", async (req, res, next) => {
  try {
    req.session.searchResult = null;
    const inventoryItems = await inventory.find({userId:req.user._id});
    return res.render("inventory", { title: "Inventory", inventoryItems });
  } catch (error) {
    return next(error);
  }
});

router.get("/seatchItem", async (req, res, next) => {
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

router.get("/:id", async (req, res, next) => {
  try {
    const item = await inventory.find({ _id: req.params.id,userId:req.user._id });
    res.json({ item });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await inventory.create({
      userId: req.user._id,
      name: req.body.itemName,
      quantity: req.body.itemQty,
      brand: req.body.itemBrand,
      location: req.body.itemLocation,
    });
    console.log("Item Added");
    return res.redirect("/inventory");
  } catch (error) {
    return next(error);
  }
});

router.put("/editItem/:id", async (req, res, next) => {
  try {
    await inventory.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.editName,
        quantity: req.body.editQty,
        brand: req.body.editBrand,
        location: req.body.editLocation,
      }
    );
    console.log("Item Updated");
    res.redirect("/inventory");
  } catch (error) {
    return next(error);
  }
});

router.delete("/deleteItem/:id", async (req, res, next) => {
  try {
    await inventory.findOneAndDelete({ _id: req.params.id });
    return res.redirect("/inventory");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
