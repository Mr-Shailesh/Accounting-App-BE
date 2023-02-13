const router = require("express").Router();
const auth = require("../middleware/auth");
const Sale = require("../models/Sale");

// Add SALE

router.post("/", auth, async (req, res) => {
  const userID = req.userId;

  try {
    console.log("req", req);
    const newSale = new Sale({
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
    const sale = await newSale.save();
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE SALE

router.put("/:id", auth, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale) {
      try {
        const updatedSale = await Sale.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedSale);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(401).json("Sale not found");
  }
});

// DELETE SALE

router.delete("/:id", auth, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (sale) {
      try {
        await sale.delete();
        res.status(200).json("sale has been deleted..");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Sale not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL SALE

router.get("/", auth, async (req, res) => {
  const userID = req.userId;
  try {
    const sales = await Sale.find();
    const newSales = sales.filter((sale) => sale.userId === userID);
    res.status(200).json(newSales);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
