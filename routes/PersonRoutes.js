const express = require("express");
const router = express.Router(); // Corrected from required.Router()
const Person = require("./../models/person"); // Corrected from required('./../models/Person')

// POST route to add a person using try-catch
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Accessing the request body correctly

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    // Save the person to the database
    const savedPerson = await newPerson.save(); // Await the save operation

    // Send success response
    res
      .status(201)
      .json({ message: "Person added successfully", person: savedPerson });
  } catch (error) {
    // Handle errors in case of failure
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// GET route to fetch all persons
router.get("/", async (req, res) => {
  try {
    // Find all person documents in the database
    const persons = await Person.find();

    // Send the found persons in the response
    res.status(200).json(persons);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// GET route to fetch persons based on workType
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract workType from route parameters

    // Check if workType is one of the allowed values
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      // Fetch persons with the specified workType
      const response = await Person.find({ work: workType });
      console.log("response Fetch");
      // Send the found persons in the response
      res.status(200).json(response);
    } else {
      // Handle invalid workType values
      res.status(400).json({ error: "Invalid workType" });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching persons by workType:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// PUT route to update a person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the ID from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    // Find the person by ID and update with new data
    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      } // Options: return updated document, run validators
    );

    // Check if the person exists
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    // Send the updated person data in response
    res
      .status(200)
      .json({ message: "Person updated successfully", person: updatedPerson });
  } catch (error) {
    // Handle any errors that occur during the update
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete route to delete the person by id
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the ID from the URL parameter

    // assuming you have person model
    const response = await Person.findByIdAndDelete(personId);
    // Check if the person exists
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data delete");
    res.status(200).json({ message: "Person deleteted successfully" });
  } catch (error) {
    // Handle any errors that occur during the update
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
