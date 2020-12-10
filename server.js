// Dependencies
const express = require("express");
const path = require('path');
const fs = require("fs");
const crypto = require("crypto");

// Sets up the express app
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"public/index.html"));
});

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"public/notes.html"));
});

app.get("/api/notes",(req,res)=>{
    fs.readFile(path.join(__dirname,"db/db.json"),"utf8",(err,data)=>{
        if(err) console.error(err);
        else{
            // console.log(data)
            res.json(JSON.parse(data));
        }
    });
});

app.post("/api/notes",(req,res)=>{

    const newNote = req.body;
    newNote.id = crypto.randomBytes(8).toString('hex');
    console.log(newNote);
    fs.readFile(path.join(__dirname,"db/db.json"),"utf8",(err,data)=>{
        if(err) console.error(err);
        else{
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile(path.join(__dirname,"db/db.json"),JSON.stringify(notes),(err)=>{
                if(err) console.error(err);
                else res.json(newNote);
            });
        }
    });
    
});

app.delete("/api/notes/:id",(req,res) =>{
    const id = req.params.id;
    fs.readFile(path.join(__dirname,"db/db.json"),"utf8",(err,data)=>{
        if(err) console.error(err);
        else{
            const notes = JSON.parse(data);
            let i = 0;
            notes.forEach((note,index)=>{
                if(note.id === id) i = index; 
            });
            const deletedNote = notes.splice(i,1);
            fs.writeFile(path.join(__dirname,"db/db.json"),JSON.stringify(notes),(err)=>{
                if(err) console.error(err);
                else res.json(deletedNote);
            });
        }
    });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));