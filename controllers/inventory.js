const inventory = require('../models/Inventory');
module.exports = {
    getIndex: async (req,res,next) => {
        try {
            req.session.searchResult = null;
            const inventoryItems = await inventory.find({userId:req.user._id});
            return res.render("inventory", { title: "Inventory", inventoryItems });
          } catch (error) {
            return next(error);
          }
    },
    getItem:  async (req, res, next) => {
        try {
          const item = await inventory.find({ _id: req.params.id,userId:req.user._id });
          res.json({ item });
        } catch (error) {
          return next(error);
        }
    },
    postItem: async (req, res, next) => {
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
    },
    updateItem: async (req, res, next) => {
        try {
          await inventory.findOneAndUpdate(
            { _id: req.params.id,userId:req.user._id },
            {
              name: req.body.itemName,
              quantity: req.body.itemQty,
              brand: req.body.itemBrand,
              location: req.body.itemLocation,
            }
          );
          console.log("Item Updated");
          res.redirect("/inventory");
        } catch (error) {
          return next(error);
        }
    },
    deleteItem: async (req, res, next) => {
        try {
          await inventory.findOneAndDelete({ _id: req.params.id });
          return res.redirect("/inventory");
        } catch (error) {
          return next(error);
        }
    }
}