// const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let notes = [
 {
  id: 1,
  content: "HTML is easy",
  date: "2019-05-30T17:30:31.098Z",
  important: true
 },
 {
  id: 2,
  content: "Browser can execute only Javascript",
  date: "2019-05-30T18:39:34.091Z",
  important: false
 },
 {
  id: 3,
  content: "GET and POST are the most important methods of HTTP protocol",
  date: "2019-05-30T19:20:14.298Z",
  important: true
 },
 {
  id: 4,
  content: "new item",
  date: "2020-05-30T19:20:14.298Z",
  important: true
 }
]





// generate the max number of the newest Id
const generateId = () => {
 const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
 return maxId + 1;

}

//Route
app.get('/', cors(), (req, res) => {
 res.send('<h1>Hi I am brenda</h1>')
})

app.get('/api/notes', cors(), (req, res) => {
 res.json(notes)
})
// Find one item
app.get('/api/notes/:id', cors(), (req, res) => {
 // This ID need to convert to a number
 const id = Number(req.params.id);
 const note = notes.find(note => note.id === id);
 if (note) {
  res.json(note);
 }
 else {
  res.status(404).end();
 }
})

// Delete one item
app.delete('/api/notes/:id', cors(), (req, res) => {
 const id = Number(req.params.id);
 notes = notes.filter(note => note.id !== id);
 res.status(204).end();
})


// post an item
app.post('/api/notes', cors(), (req, res) => {
 const body = req.body;
 if (!body.content) {
  return res.status(400).json({
   error: 'content missing'
  })
 }

 const note = {
  content: body.content,
  important: body.important || false,
  date: new Date(),
  id: generateId(),
 }

 notes = notes.concat(note)
 res.json(note)
})

//  create web server without express
// const app = http.createServer((req, res) => {
//  res.writeHead(200, { 'Constent-Type': "text/plain" })
//  res.end(JSON.stringify(notes))
// })


//Listen port 3001
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)