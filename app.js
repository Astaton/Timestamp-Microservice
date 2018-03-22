const express = require('express');
const bodyParser = require('body-parser');
const port =process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
//send style sheets
app.use('/static',express.static('public'));

//sets the template engine that is being used, by default it looks for the template engine in the views folder.
app.set('view engine', 'pug');

const timeRoutes = require('./routes');
app.use('/convert', timeRoutes);

app.get('/', (req, res)=>{
	res.render('index');
});

app.use((req, res, next) => {
 	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next)=>{
	res.locals.error = err;
	res.status(err.status);
	res.render('error', err);
});

app.listen(port, ()=>{
	console.log('App is starting on port: '+port);
});