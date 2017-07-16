(function (index) {

    index.init = function (app) {
        app.get('/', (req, res) => {
            res.send('Index Page');
        });
    }

})(module.exports);