(function (todos) {
    var mongojs = require('mongojs');
    const dbUrl = 'mongodb://srini:srini@ds161262.mlab.com:61262/meantodos';
    var db = mongojs(dbUrl, ['todos']);

    const url = '/api/v1';

    todos.init = function (app) {
        app.get(`${url}/todos`, (req, res) => {
            db.todos.find((err, todos) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(todos);
                }
            });
        });
    }

})(module.exports);