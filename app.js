var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config");

var routes = require("./routes/routes");
var documentationRoutes = require("./routes/documentation-routes");
var app = express();


mongoose.connect(config.mongoDbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected...")
  })
  .catch(err => console.log(err));

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use("/v1/",routes);
app.use("/documentation/",documentationRoutes);


app.use(function(err, req, res, next) {
    console.error(err);
    next(err);
});


app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});

module.exports = app;

