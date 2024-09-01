const express = require("express");
const app = express();
const db = require("./db"); // Ensure this path is correct

// Use the built-in middleware for parsing JSON
app.use(express.json());

// Route for the home page
app.get("/", function (req, res) {
  res.send(
    "Welcome to my hotel... How can I help you? We have a list of menu."
  );
});

// Import menu route file
const menuItemRoutes = require("./routes/menuItemRoutes"); // Corrected from required('./routes/menuItemRoutes')
const personRoutes = require("./routes/PersonRoutes"); // Corrected from required('./routes/personRoutes')

// Use routes for menu
app.use("/menu", menuItemRoutes);

// Use routes for persons
app.use("/person", personRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
