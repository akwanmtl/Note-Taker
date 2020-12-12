const fs = require("fs");
const path = require('path');
const crypto = require("crypto");

module.exports = (app) => {
    // function that reads the db.json file
    const readDB = () => {
        const data = fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf8");
        return JSON.parse(data);
    }

    // function that writes the db.json file
    const writeDB = (notes) => {
        fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify(notes));
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
}