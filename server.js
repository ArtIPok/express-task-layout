const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('formidable');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style.css'));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'main' });
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.post('/contact/send-message', (req, res, next) => {

  const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if(err) {
        next(err);
      } else if(fields.author && fields.sender && fields.title && fields.message && files.file.name) {
        res.render('contact', { fields, files, isSent: true });
        // res.json({files});
      } else {
        res.render('contact', { isError: true });
      }
    });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});