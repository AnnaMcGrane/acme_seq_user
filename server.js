const express = require('express');
const nunjucks = require('nunjucks')
nunjucks.configure({ noCache: true });

const app = express();

app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());


app.set('view engine', 'html');
app.engine('html', nunjucks.render)

const db = require('./db');
const User = db.models.User;


const port = process.env.PORT || 3000;

app.use('/users', require ('./routes/users'));

app.listen(port, ()=> console.log(`listening on ${port}`));

db.sync()
    .then(() => db.seed());