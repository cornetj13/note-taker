// Importing express packages
const express = require('express');

// Importing path package from standard library
const path = require('path');

// Assigning a port value
const PORT = process.env.PORT || 3000;

// Instantiating an express server
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes for notes endpoints.
const notesRoutes = require("./routes/notesRouter");
app.use(notesRoutes);

// GET route for notes page.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET route for homepage.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// Setting express server to listen (go live).
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);