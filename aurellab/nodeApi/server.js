var fs = require('fs');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS on ExpressJS 
//In your ExpressJS app on node.js, do the following with your routes:
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = process.env.PORT || 3000;
var router = express.Router();


router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/movies')
    .get(function (req, res) {
        console.log("HEJ!");
        fs.readFile("./movies.json", function (err, result) {
            let movies = JSON.parse(result);
            res.json(movies);
        });

    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .put(function (req, res) {
        var movie = { id: req.body.id, title: req.body.title, releaseYear: req.body.releaseYear, info: req.body.info, pic: req.body.pic, cast: req.body.cast };
        // save the bear and check for errors
        console.log("INSIDE PUT")
        fs.readFile("./movies.json", function (err, result) {
            let movies = JSON.parse(result);
            let movieInDb = movies.find(x => x.id == movie.id);
            movies[movies.indexOf(movieInDb)] = movie;
            fs.writeFile("./movies.json", JSON.stringify(movies))
            res.json(movie);
        });
    })
    .post(function (req, res) {
        var movie = { id: req.body.id, title: req.body.title, releaseYear: req.body.releaseYear, info: req.body.info, pic: req.body.pic, cast: req.body.cast };
        // save the bear and check for errors
        console.log("INSIDE POST: ", movie)
        fs.readFile("./movies.json", function (err, result) {
            let movies = JSON.parse(result);
            if (movies.find(x => x.id == movie.id)) {
                res.status(500).send({ error: 'Movie with that id already exists' });
            } else {
                movies.push(movie);
                fs.writeFile("./movies.json", JSON.stringify(movies))
                res.json(movie);
            }

        });
    });
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


