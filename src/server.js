const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

// Express APIs
const imdbApi = require('./routes/imdb.route');
const movieApi = require('./routes/movieextend.route');
const userApi = require('./routes/user.route');
const loginApi = require('./routes/login.route');
const startApi = require('./routes/start.route');

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

// Serve static resources
app.use('/src', express.static('src'));
app.use('/assets', express.static('assets'));
app.use('/html', express.static('html'));

app.use(startApi)
app.use('/api', imdbApi)
app.use('/api', movieApi)
app.use('/api', userApi)
app.use(loginApi)

// Define PORT
const port = process.env.PORT || dbConfig.PORT;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (error, req, res, next) {
    console.error(error.message);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send(error.message);
});