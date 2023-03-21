const router = require("express").Router();
const auth = require("../middleware/auth");
const Client = require("../models/Client");

// ADD CLIENT
router.post("/", auth, async (req, res) => {
  const userID = req.userId;
  try {
    const newClient = new Client({
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

    const client = await newClient.save();
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE CLIENT
router.put("/:id", auth, async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
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
router.get("/", auth, async (req, res) => {
  const userID = req.userId;
  try {
    const clients = await Client.find();
    const newClients = clients.filter((client) => client.adminId === userID);
    res.status(200).json(newClients);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
