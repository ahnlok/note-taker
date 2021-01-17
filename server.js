// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express ();
// Initial PORT
const port =process.env.PORT || 3000;

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require("./routes/route")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});