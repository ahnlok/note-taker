// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express ();
// Initial PORT
const PORT = process.env.PORT || 8080;

let notesData = [];

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Note variables
    // GET api/notes route
    app.get("/api/notes", function(req, res) {
        try {
            notesData = fs.readFileSync("db/db.json", "utf8");
            notesData = JSON.parse(notesData);
        } 
        catch (err) {
            console.log(err);
        }
        res.json(notesData);
    });
    // POST api/notes route
    app.post("/api/notes", function(req, res) {
        try {
            notesData = fs.readFileSync("db/db.json", "utf8");
            notesData = JSON.parse(notesData);
            req.body.id = notesData.length;
            notesData.push(req.body);
            notesData = JSON.stringify(notesData);
            // Writes the new note to file
            fs.writeFile("db/db.json", notesData, "utf8", function(err) {
                if (err) throw err;
            });
            res.json(JSON.parse(notesData));
        }
        catch (err) {
            throw err;
            console.log(err);
        }
    });
    
    // Delete the note with selected id
    app.delete("/api/notes/:id", function(req, res) {
        try {
            notesData = fs.readFileSync("db/db.json", "utf8");
            notesData = JSON.parse(notesData);
            notesData = notesData.filter(function(note) {
                return note.id != req.params.id
        });
        notesData = JSON.stringify(notesData);
        
        fs.writeFile("db/db.json", notesData, "utf8", function(err) {
            if(err) throw err;
        });
        res.send(JSON.stringify(notesData));
        // Handling error
        }
        catch (err) {
            throwerr;
            console.log(err);
        }
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

    app.get("/api/notes", function(req, res) {
        return res.sendFile(path.json(__dirname, "db/db.json"));
    });


 
// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});