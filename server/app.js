var express = require('express');

var mysql = require("mysql");
var bodyParser = require("body-parser");
//var md5 = require('MD5');
var rest = require("./REST.js");
//var bd = require('./BD.js');
//var daemon = require('./daemon.js');


//var repositorio = require('./repositorio');

//var api = require('./rest-api');;

var app = express();

//app.get('/listazonas', api.listaZonas);
//app.get('/criazona', repositorio.criaZona);
//app.get('/criaprogramacao', repositorio.criaProgramacao);

//app.get('/', function (request, response) {
//    response.send('Olá mundo');
//});

//app.listen(3000, function () {
//    console.log('Escutando na porta 3000');
//});


function REST() {
    var self = this;
    self.connectMysql();
}


REST.prototype.connectMysql = function () {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'sprinkler',
        database: 'sprinkler',
        debug: false
    });
    pool.getConnection(function (err, connection) {
        if (err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function (connection) {
    var self = this;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router, connection);
    self.startServer();
};

REST.prototype.startServer = function () {
    app.listen(3000, function () {
        console.log("All right ! I am alive at Port 3000.");
    });
};

REST.prototype.stop = function (err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
};

new REST();





//new bd();

new daemon();