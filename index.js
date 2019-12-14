const fs = require("fs");
const express = require("express");
const uuidv1 = require("uuid/v1");

const PORT = process.env.PORT || 8000;
const app = express();
const path = require("path");
const publicFolder = "public";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicFolder));

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, `${publicFolder}/notes.html`));
});

app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  newNote.id = uuidv1();

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notesFile = JSON.parse(data);

    notesFile.push(newNote);
    const json = JSON.stringify(notesFile);

    fs.writeFile("./db/db.json", json, "utf8", err => {
      if (err) throw err;
      res.send("Note has been written");
    });
  });
});

app.delete("/api/notes/:id", function(req, res) {
  const noteId = req.params.id;
  console.log(noteId);

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notesFile = JSON.parse(data);

    const updatedNotes = notesFile.filter(note => note.id !== noteId);

    const json = JSON.stringify(updatedNotes);

    fs.writeFile("./db/db.json", json, "utf8", err => {
      if (err) throw err;
      res.send("Note has been deleted");
    });
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, `${publicFolder}/index.html`));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
