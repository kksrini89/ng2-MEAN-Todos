(function (index) {

    index.init = function (app) {
        app.get('/', (req, res) => {
            res.render("index.html");
        });
    }

})(module.exports);