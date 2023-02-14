const router = require("express").Router();
const auth = require("../middleware/auth");
const Purchase = require("../models/Purchase");

// Add PURCHASE
router.post("/", auth, async (req, res) => {
  const userID = req.userId;
  try {
    const newPurchase = new Purchase({
      adminId: userID,
      description: req.body.description,
      date: req.body.date,
      amount: req.body.amount,
      organizationId: req.body.organizationId,
      organizationName: req.body.organizationName,
      userId: req.body.userId,
      userName: req.body.userName,
      companyName: req.body.companyName,
      isExpense: req.body.isExpense,
    });
    const purchase = await newPurchase.save();
    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE PURCHASE
router.put("/:id", auth, async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (purchase) {
      try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPurchase);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(401).json("Purchase not found");
  }
});

// DELETE PURCHASE
router.delete("/:id", auth, async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (purchase) {
      try {
        await purchase.delete();
        res.status(200).json("purchase has been deleted..");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Purchase not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PURCHASE
router.get("/", auth, async (req, res) => {
  const userID = req.userId;
  try {
    const purchases = await Purchase.find();
    const newPurchases = purchases.filter(
      (purchase) => purchase.adminId === userID
    );
    res.status(200).json(newPurchases);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
