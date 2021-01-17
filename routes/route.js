const fs = require("fs");
const path = require("path");

module.exports = function(app) {

    // Note variables
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;

        const notes = JSON.parse(data);
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
        }
        }
}