var express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
var router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;