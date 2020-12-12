// Dependencies
const express = require("express");
const path = require('path');
const fs = require("fs");
const crypto = require("crypto");

// Sets up the express app
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get access to the files in the public folder
app.use(express.static("public"));

// route - index page
app.get("/", (req,res) => res.sendFile(path.join(__dirname,"public/index.html")));

// route - notes page
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname,"public/notes.html")));

// function that reads the db.json file
const readDB = () => {
    const data = fs.readFileSync(path.join(__dirname,"db/db.json"),"utf8");
    return JSON.parse(data);
}

// function that writes the db.json file
const writeDB = (notes) => {
    fs.writeFileSync(path.join(__dirname,"db/db.json"),JSON.stringify(notes));
}

// get all the notes and return JSON
app.get("/api/notes",(req,res)=>{
    res.json(readDB());
});

// post a new note and rewrite the db.json file
app.post("/api/notes",(req,res)=>{
    const newNote = req.body;
    newNote.id = crypto.randomBytes(8).toString('hex');
    const notes = readDB();    
    notes.push(newNote);
    writeDB(notes);
    res.json();
});

// delete a note with an id
app.delete("/api/notes/:id",(req,res) =>{
    const id = req.params.id;
    const notes = readDB();  
    writeDB(notes.filter(note => note.id !== id));
    res.json();
});

// listen to the port
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));