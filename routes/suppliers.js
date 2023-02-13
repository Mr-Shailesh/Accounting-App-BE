const router = require("express").Router();
const auth = require("../middleware/auth");
const Supplier = require("../models/Supplier");

// Add SUPPLIER

router.post("/", auth, async (req, res) => {
  const userID = req.userId;

  try {
    const newSupplier = new Supplier({
      adminId: userID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      companyName: req.body.companyName,
      companyEmail: req.body.companyEmail,
      companyLocation: req.body.companyLocation,
      companyGstNo: req.body.companyGstNo,
    });

    const supplier = await newSupplier.save();
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE SUPPLIER

router.put("/:id", auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedSupplier);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(401).json("Supplier not found");
  }
});

// DELETE SUPPLIER

router.delete("/:id", auth, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      try {
        await supplier.delete();
        res.status(200).json("supplier has been deleted..");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Supplier not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL SUPPLIER

router.get("/", auth, async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const newSuppliers = suppliers.filter(
      (supplier) => supplier.userId === userID
    );
    res.status(200).json(newSuppliers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
