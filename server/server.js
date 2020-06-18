const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../config/keys');

const app = express();

const expressGraphQL = require("express-graphql");
const models = require('./models');
const schema = require("./schema/schema");

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");


app.use(express.static("public"));

if(!db){
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}


// const User = require("./models/user");

/////////////////////

mongoose
.connect(db.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);
//
// app.use(
//   "/graphql",
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// )
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;


// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const db = require("../config/keys").mongoURI;
// const schema = require("./schema/schema");
// const expressGraphQL = require("express-graphql");
//
// const app = express();
//
//
// app.use(
//   "/graphql",
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// );
//
//
// if(!db){
//   throw new Error("You must provide a string to connect to MongoDB Atlas");
// }
//
// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch(err => console.log(err));
//
//
// app.use(bodyParser.json());
//
// module.exports = app;
//
// // app.listen(5000, () => console.log("Server is running on port 5000"));
