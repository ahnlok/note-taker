// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express ();
// Initial PORT
const PORT = process.env.PORT || 3000;

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Note variables
fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) throw err;

    var notes = JSON.parse(data);
        // GET api/notes route
    app.get("/api/notes", function(req, res) {
        res.json(notes)
    });
        // POST api/notes route
    app.post("/api/notes", function(req, res) {
        const newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("Added new note: "+newNote.title);
    });
        // Retrieving a note with id
    app.get("/api/notes/:id", function(req, res) {
        res.json(notes[req.params.id]);
    });
        // Delete the note with selected id
    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with id "+req.params.id);
    });

        // Routes
        // notes.html route when /notes is typed
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
        // index.html when all others have been accessed
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

        // Update the json file when a note is added or deleted by the users
    function updateDb() {
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    }
});

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});