const express = require('express');
const app = express();
const { port } = require('./config');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/menu', routes.menu);
app.use('/api/news', routes.news);
app.use('/api/events', routes.events);
app.use('/api/directory', routes.directory);
app.use('/admin', routes.admin);

app.use(errorMiddleware);

app.listen(port, (error) => {
	error && console.log(error)
  console.log(`Example app listening at http://localhost:${port}`)
})