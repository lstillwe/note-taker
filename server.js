const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const { getNotes, saveNotes } = require('./helpers/notesIO');

const PORT = 3001;

const app = express();

// These 2 allows us to handle POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET resquest for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  res.json(getNotes());

});

// POST request to add a note
app.post('/api/notes', (req, res) => {

  // get the current notes in the DB
  currentNotes = getNotes();

  // save the title and text data from the new note to add
  const {title, text } = req.body;

  // if both title and text are present,
  // create a new note object and add it to the current notes array
  if (title && text) {

    const newNote = {
      id: uuid(),
      title,
      text,
    };
    currentNotes.push(newNote);

    // save the updated notes to the DB
    saveNotes(currentNotes);

    // send back a success response
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  }
  else {
    res.json('Error in saving new note');
  }
});

// DELETE request to remove a note
app.delete('/api/notes/:id', (req, res) => {

  // get the id of the note from the DELETE request
  var noteId = req.params.id
  // get the current notes in the db
  var notes = getNotes();
  // find the note to delete
  var noteToDelete = notes.filter(function(item) { return item.id === noteId; });
  // get the index of the note in the notes array
  var index = notes.findIndex(function(item, i) {
    return item.id === noteId
  });

  // remove the note from the current array of notes
  if (index > -1) {
    notes.splice(index, 1);
  }

  // save the updated notes back to the db
  saveNotes(notes);

  // return a success response
  const response = {
    status: 'success',
    body: noteToDelete,
  };

  res.json(response);

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
