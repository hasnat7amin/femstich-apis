const { Server } = require( "socket.io");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http  = require("http");
const passport = require('./utils/passport');
const {Strategy} = require('passport-google-oauth20');
require("dotenv/config");
const session = require('express-session');

// importing other modules
const api = require("./routes/index");
const chat = require("./chat");


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

module.exports = io;

/* A middleware that is used to parse the incoming request bodies in a middleware before your handlers,
available under the req.body property. */
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));
app.use('/images', express.static('uploads'));
app.use(
  session({
    secret: "yoursecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/api", api);

io.on("connection", chat)

 
/* Connecting to the database. */
mongoose.set("strictQuery", true); 
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));



/* This is the port that the server will be listening on. */
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("listening on port http://localhost:" + port);
});

module.exports = app;

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

// passport.use(new Strategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: 'http://localhost:9000/api/auth/google/callback'
//     },
//     function (accessToken, refreshToken, profile, done) {
//         // if user already exist in your dataabse login otherwise
//         // save data and signup
//         done(null, {});
//     }
// ));





// const express = require("express");
// const passport = require('passport');
// const {Strategy} = require('passport-google-oauth20');
// require("dotenv/config");
// const session = require("express-session");


// const app = express();
// app.listen(9000, () => {
//     console.log('server is started');
// })

// app.use(session({
//   secret: 'yoursecretkey',
//   resave: false,
//   saveUninitialized: true
// }))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

// passport.use(new Strategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: 'http://localhost:9000/api/auth/google/callback'
//     },
//     function (accessToken, refreshToken, profile, done) {
//         // if user already exist in your dataabse login otherwise
//         // save data and signup
//         done(null, {});
//     }
// ));

// app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile']}));

// app.get('/api/auth/google/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),
//     (req, res, next) => {
//         console.log(req.user, req.isAuthenticated());
//         res.send('user is logged in');
//     })

// app.get('/auth/fail', (req, res, next) => {
//     res.send('user logged in failed');
// });

// app.get('/logout', (req, res, next) => {
//     req.logout();
//     res.send('user is logged out');
// });

