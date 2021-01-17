const fs = require("fs");
const path = require("path");

module.exports = function(app) {

    // Note variables
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) throw err;

        const notes = JSON.parse(data);
        // GET api/notes route
        app.get("/api/notes", function(req, res) {
            res.json()
        });
        // POST api/notes route
        app.post("/api/notes", function(req, res) {
            const newNote = req.body;
            notes.push(newNote);
            updateDb();
        }
        }
}