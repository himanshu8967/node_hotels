const express = require("express");
const router = express.Router(); // Corrected from required.Router()
const Menu = require("./../models/menu"); // Ensure this path is correct

// POST route to add a menu item
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Accessing the request body correctly

    // Create a new Menu document using the mongoose model
    const newMenu = new Menu(data);

    // Save the menu to the database
    const savedMenu = await newMenu.save(); // Await the save operation

    // Send success response
    res
      .status(201)
      .json({ message: "Menu added successfully", menu: savedMenu });
  } catch (error) {
    // Handle errors in case of failure
    console.error("Error saving menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all menu items
router.get("/", async (req, res) => {
  try {
    // Fetch all menu items from the database
    const menu = await Menu.find();

    // Send the menu items in the response with a 200 status code
    res.status(200).json(menu);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching menu:", error);

    // Send a 500 status code with an error message
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch menu items based on tasteType
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract tasteType from route parameters

    // Check if tasteType is one of the allowed values
    if (
      tasteType === "sweet" ||
      tasteType === "spicy" ||
      tasteType === "sour"
    ) {
      // Fetch menu items with the specified tasteType
      const response = await Menu.find({ taste: tasteType });
      console.log("response Fetch:", response);

      // Send the found menu items in the response
      res.status(200).json(response);
    } else {
      // Handle invalid tasteType values
      res.status(400).json({ error: "Invalid tasteType" });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching menu by tasteType:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route to update a menu by ID
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the ID from the URL parameter
    const updatedMenuData = req.body; // Updated data for the person

    // Find the menu by ID and update with new data
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      updatedMenuData,
      {
        new: true,
        runValidators: true,
      } // Options: return updated document, run validators
    );

    // Check if the menu exists
    if (!updatedMenu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    // Send the updated Menu data in response
    res
      .status(200)
      .json({ message: "Menu updated successfully", menu: updatedMenu });
  } catch (error) {
    // Handle any errors that occur during the update
    console.error("Error updating menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete route to delete the menu by id
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the ID from the URL parameter

    // assuming you have menu model
    const response = await Menu.findByIdAndDelete(menuId);
    // Check if the person exists
    if (!response) {
      return res.status(404).json({ error: "Menu not found" });
    }
    console.log("data delete");
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the update
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
