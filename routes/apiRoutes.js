const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// Function to get data from saved data
router.get("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        res.json(JSON.parse(data));
    });
});

// Function to add data to the saved data
router.post("/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const notes = JSON.parse(data);
        req.body.id = notes.length.toString();
        notes.push(req.body);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Note added!");
            res.json(req.body);
        });
    })
});

// Function to delete saved notes
router.delete("/notes/:id", function(req, res) {
    const id = parseInt(req.params.id);

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        const notes = JSON.parse(data);

        let index = notes.findIndex(note => note.id == id);
        if(index != -1){
            notes.splice(index, 1);
        } else {
            return;
        }
  
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Note removed.");
            res.json(req.body);
        });
    })
        
});

module.exports  = router;