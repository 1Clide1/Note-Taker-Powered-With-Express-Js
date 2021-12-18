// import express:

const express = require('express');
const app= express();
// require/get everything else that I need for this project:

const PORT = 3001;
// fs module for db.json file
const fs= require('fs');
const path= require('path');
const dbJson= ('db/db.json');
// using helper module from previous class to help me with id numbers
const uuid = require('./helpers/uuid');
// get express middlewear/express functions if needed:

// this looks at the folder called public and loads all of the files 
// without having to write the full path for each item in that folder to load
app.use(express.static('public'));
// middlewear to parse json data; accepts only UTF-8
app.use(express.urlencoded({ extended: true }));
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


    
// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, 
// and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved

app.post('/api/notes', (req, res) =>{
    const { title, text }= req.body
    if (req.body) {
    const newNotes= {
        title,
        text,
        note_id: uuid()
    }
    readAndAppend(newNotes, dbJson)
    }
    else{
    res.json('error in posting notes')
    }
});

// Bonus:
// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 
// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) =>{
    const {id}= req.params;
    const notes= readDataBase();
    const noteIndex= notes.findIndex(note => note.note_id === id);
    // cool js feature with splice you can either add or delete elements in an array
    // in this case taking the noteIndex is the start and 1 is the delete count
    // if I put 0 then nothing would have gotten deleted
    notes.splice(noteIndex, 1);
    console.log("Deleted Note :)")
    saveToDataBase(dbJson, notes);
    return res.send();
});
// function to read db.json 
function readDataBase(){
    let data= fs.readFileSync(path.join(__dirname, dbJson));
    // console.log(JSON.parse(data));
    return JSON.parse(data);
};
// function to save
function saveToDataBase(db, data){
    fs.writeFile(db, JSON.stringify(data, null, 2), (err) =>
          err
            ? console.error(err)
            : console.log(`Notes have been saved to the db`)
              );
};
// function to read and write files
function readAndAppend(content, file){
    if (content, file) {
        data= readDataBase()
        data.push(content);
        saveToDataBase(file, data);
    }
    else{
        console.error("error")
    }
};
// listen to the port that way I can personally test if the backend is working
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);