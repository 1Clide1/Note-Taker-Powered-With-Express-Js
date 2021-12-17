// import express:

const express = require('express');
const app= express();
// require/get everything else that I need for this project:

const PORT = 3001;
// fs module for db.json file
const fs= require('fs');
const path= require('path');
const dbJson= ('db/db.json');
// get express middlewear/express functions if needed:

// this looks at the folder called public and loads all of the files 
// without having to write the full path for each item in that folder to load
app.use(express.static('public'));
app.use(express.json());
// below is basically home address
// GET * should return the index.html file:

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// below is website/notes
// GET /notes should return the notes.html file:

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET /api/notes should read the db.json file and return all saved notes as JSON:
// return all saved notes as json saved notes are going to be held in the db.json
app.get('/api/notes', (req, res) =>{
let data= readDataBase();
let notes = res.json(data)
return notes
});

// function to read db.json 
function readDataBase(){
let data= fs.readFileSync(path.join(__dirname, '/db/db.json'));
console.log(JSON.parse(data));
return JSON.parse(data);
};

// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, 
// and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved

// app.post('/api/notes', (req, res) =>

// );

// Bonus:
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 
// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, and then rewrite the notes to the db.json file.

// listen to the port that way I can personally test if the backend is working
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);