const express = require('express');
const app = express();
const port = 3000;
	
app.use(express.json());

let db = [
  { title: 'Joke 1', comedian: 'Comedian 1', year: 2020, id: 0 },
  { title: 'Joke 2', comedian: 'Comedian 2', year: 2021, id: 1 },
  { title: 'Joke 3', comedian: 'Comedian 3', year: 2022, id: 2 }
];

app.route('/')
  .get((req, res) => {
    res.json(db);
  })
  .post((req, res) => {
    const newJoke = req.body;
    newJoke.id = db.length;
    db.push(newJoke);
    res.json(db);
  });

app.route('/joke/:id')
  .patch((req, res) => {
    const id = parseInt(req.params.id);
    const updatedJoke = req.body;
    updatedJoke.id = id;
    db[id] = updatedJoke;
    res.json(updatedJoke);
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const deletedJoke = db.splice(id, 1)[0];
    res.json(deletedJoke);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

