(function (todos) {
    var mongojs = require('mongojs');
    const dbUrl = 'mongodb://srini:srini@ds161262.mlab.com:61262/meantodos';
    var db = mongojs(dbUrl, ['todos']);

    const url = '/api/v1';

    todos.init = function (app) {
        /**
         * GET Todos
         */
        app.get(`${url}/todos`, (req, res, next) => {
            db.todos.find((err, todos) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(todos);
                }
            });
        });

        //GET Single Todo
        app.get(`${url}/todo/:id`, (req, res, next) => {
            db.todos.find({
                _id: mongojs.ObjectId(req.params.id)
            }, (err, todo) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(todo);
                }
            });
        });

        //SAVE todo
        app.post(`${url}/todo`, (req, res, next) => {
            var todo = req.body;
            if (!todo.text || !(todo.isCompleted + '')) {
                res.status(400).json({ "error": "Invalid data" });
            } else {
                db.todos.save(todo, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(result);
                    }
                });
            }
        });

        //Update todo
        app.put(`${url}/todos/:id`, (req, res, next) => {
            var todo = req.body;
            var updatedObj = {};
            if (todo.isCompleted) {
                updatedObj.isCompleted = todo.isCompleted;
            }
            if (todo.text) {
                updatedObj.text = todo.text;
            }
            if (!updatedObj) {
                res.status(400).json({ "error": "Invalid data" });
            } else {
                db.todos.update({
                    _id: mongojs.ObjectId(req.params.id)
                }, updatedObj, {}, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(result);
                    }
                });
            }
        });

        //Delete todo
        app.delete(`${url}/todo/:id`, (req, res, next) => {
            db.todos.remove({
                _id: mongojs.ObjectId(req.params.id)
            }, '', (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        });
    }

})(module.exports);