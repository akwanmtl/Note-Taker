// Dependencies
const express = require("express");
// const path = require('path');
// const fs = require("fs");
// const crypto = require("crypto");

// Sets up the express app
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get access to the files in the public folder
app.use(express.static("public"));

// Calling on the different routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// listen to the port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));