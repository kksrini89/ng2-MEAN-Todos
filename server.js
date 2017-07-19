var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

//Set views path
app.set('views', path.join(__dirname, 'views'));
//Set view engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', index);
// app.get('/api/v1/', todos);

index.init(app);
todos.init(app);

// console.log(process.env);
app.listen(3000, () => {
    console.log("Server is started running on 3000");
});

require('nodemon').emit('quit');