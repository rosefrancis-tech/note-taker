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
        const newNoteArr = [];

        notes.push(req.body);

        for(let i=0; i<notes.length; i++) {
            const note = {
                title: notes[i].title,
                text: notes[i].text,
                id: i
            };
            newNoteArr.push(note);
        }
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNoteArr, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Note added!");
            res.json(req.body);
        });
    })
});

module.exports  = router;