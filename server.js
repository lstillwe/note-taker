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

  currentNotes = getNotes();

  const {title, text } = req.body;

  if (title && text) {

    const newNote = {
      id: uuid(),
      title,
      text,
    };
    currentNotes.push(newNote);

    saveNotes(currentNotes);

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

app.delete('/api/notes/:id', (req, res) => {

  var noteId = req.params.id
  var notes = getNotes();
  var noteToDelete = notes.filter(function(item) { return item.id === noteId; });
  var index = notes.findIndex(function(item, i) {
    return item.id === noteId
  });

  if (index > -1) {
    notes.splice(index, 1);
  }

  saveNotes(notes);

  const response = {
    status: 'success',
    body: noteToDelete,
  };

  res.json(response);

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
