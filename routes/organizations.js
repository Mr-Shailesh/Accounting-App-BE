const router = require("express").Router();
const Organization = require("../models/Organization");

// Add ORGANIZATION

router.post("/", async (req, res) => {
  try {
    console.log("req", req);
    const newOrganization = new Organization({
      userId: req.body.userId,
      organizationName: req.body.organizationName,
      organizationEmail: req.body.organizationEmail,
      organizationLocation: req.body.organizationLocation,
      organizationGstNo: req.body.organizationGstNo,
    });

    const organization = await newOrganization.save();
    res.status(200).json(organization);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ORGANIZATION

router.put("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (organization) {
      try {
        const updatedOrganization = await Organization.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedOrganization);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(401).json("Organization not found");
  }
});

// DELETE ORGANIZATION

router.delete("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (organization) {
      try {
        await organization.delete();
        res.status(200).json("organization has been deleted..");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Organization not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORGANIZATION

router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
