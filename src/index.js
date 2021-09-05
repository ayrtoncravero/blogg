const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    //helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');
app.set('port', process.env.port || port);
app.use(express.json());

const posts = [
    {
        handle: 'configuracion-de-handlebars',
        title: 'configuracion de hablebars',
        description: 'te enseñamos a configurar el motor de vistas'
    },
    {
        handle: 'servidor-con-node',
        title: 'configurar servidor con node',
        description: 'como configurar un servidor con node completamente desde cero'
    }
]

app.get('/', (req, res) => {
    res.render('home', { posts });
});
app.get('/posts/:handle', (req, res) => {
    const handle = req.params.handle;
    res.render(`posts/${handle}`, {posts}[0]);
});

app.listen(app.get('port'), () => {
    console.log('Server on port localhost:3000');
});