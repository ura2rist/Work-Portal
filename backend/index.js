const express = require('express');
const app = express();
const { port } = require('./config');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-middleware');
const fs = require('fs');
const https = require( "https" );

httpsOptions = {
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("certificate.crt")
}



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

app.use('/api/menu', routes.menu);
app.use('/api/news', routes.news);
app.use('/api/events', routes.events);
app.use('/api/directory', routes.directory);
app.use('/admin', routes.admin);

app.use(errorMiddleware);

https.createServer(httpsOptions, app).listen(port, (error) => {
	error && console.log(error)
  console.log(`Example app listening at http://localhost:${port}`)
})