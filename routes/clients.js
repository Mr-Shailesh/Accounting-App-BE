const router = require("express").Router();
const Client = require("../models/Client");

// ADD CLIENT

router.post("/", async (req, res) => {
  try {
    console.log("req", req);
    const newClient = new Client({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      companyName: req.body.companyName,
      companyEmail: req.body.companyEmail,
      companyLocation: req.body.companyLocation,
      companyGstNo: req.body.companyGstNo,
    });

    const client = await newClient.save();
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE CLIENT

router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      try {
        const updatedClient = await Client.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedClient);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(401).json("Client not found");
  }
});

// DELETE CLIENT

router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      try {
        await client.delete();
        res.status(200).json("client has been deleted..");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Client not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CLIENT

router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
