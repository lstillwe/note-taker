const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

// These 2 allows us to handle POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET request for index.html
app.get('/', (req, res) =>
  console.info("received get request for /")
);

// GET request for notes.html
app.get('/notes', (req, res) =>
console.info("received get request for /notes")
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  console.info("received get request for /api/notes")

});

// POST request to add a note
app.post('/api/notes', (req, res) => {
  console.info("received get request for /api/notes")
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
