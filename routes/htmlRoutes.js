const path = require('path');

// ROUTING

module.exports = (app) => {
    // route - notes page
    app.get("/notes", (req,res) => res.sendFile(path.join(__dirname,"../public/notes.html")));

    // route - index page
    app.get("*", (req,res) => res.sendFile(path.join(__dirname,"../public/index.html")));

};