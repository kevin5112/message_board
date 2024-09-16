const express = require('express');
const app = express();
const path = require('node:path');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

app.get('/new', (req, res) => res.render('form'));

app.post('/new', (req, res) => {
  messages.push({
    text: req.body.messageText,
    user: req.body.authorName,
    added: new Date(),
  });
  res.redirect('/');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
