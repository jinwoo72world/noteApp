const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./models");
const Contact = require("./models/contact");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).send("Error fetching contacts");
  }
});

app.post("/api/contacts", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).send("Error adding contact");
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      await contact.update(req.body);
      res.json({ message: "Contact updated", updatedAt: contact.updatedAt });
    } else {
      res
        .status(404)
        .send("Contact not found. Please ensure the contact ID is correct.");
    }
  } catch (error) {
    res.status(500).send("Error updating contact");
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      await contact.destroy();
      res.send("Contact deleted");
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting contact");
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Ensure database connection is established
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
