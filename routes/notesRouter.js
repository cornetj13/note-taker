// Importing express and UUID packages.
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// Importing fs package from standard library.
const fs = require('fs');

// Importing the db.
const books = require('../db/db.json');

// Instantiating router.
const router = express.Router();

// GET route for retrieving the db in JSON format.
router.get("/api/notes", (req, res) => {
  // Confirm GET was sent.
  console.info(`${req.method} request received for notes`);

  // Read in DB.
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      res.json(JSON.parse(data));
    };
  });
});

// Post route for posting a note in the db.
router.post("/api/notes", (req, res) => {
  // Confirm POST was sent.
  console.info(`${req.method} request received for notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      id: uuidv4(),
      title,
      text
    };

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const notesArr = JSON.parse(data);
        notesArr.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notesArr,null,4), (err, data) => {
          if (err) {
            throw err;
          }
          res.send("note added!");
        });
      }
    });
  } else {
    res.json('Error in posting feedback');
  };
});

//  Delete route for deleting a specific note in the db.
router.delete("/api/notes/:id", (req, res) => {
  console.info(`${req.method} request received for notes`);
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const notesArr = JSON.parse(data);
      const toDelete = req.params.id;
      const updatedNotesArr = notesArr.filter(note => note.id !== toDelete);
      if(notesArr.length == updatedNotesArr.length) {
        return res.status(404).send("note not found.")
      } else {
        fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArr,null,4), (err, data) => {
          if (err) {
            throw err;
          }
          return res.send("note deleted!");
        });
      }
    };
  });
});

module.exports = router;