//var express   =    require("express");
var mysql     =    require('mysql');
//var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'sprinkler',
    database : 'sprinkler',
    debug    :  false
});

function handle_database(request,resource) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          resource.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                resource.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              resource.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}



//
////var Sequelize = require('sequelize');
//
//var sequelize = new Sequelize('sprinkler', 'root', 'sprinkler', {
//    host: 'localhost',
//    dialect: 'mysql',
//    pool: {
//        max: 5,
//        min: 0,
//        idle: 10000
//    }
//});
//
//var Zona = sequelize.define('zonas', {
//    nome: {
//        type: Sequelize.STRING,
//        field: 'nome' // Will result in an attribute that is firstName when user facing but first_name in the database
//    },
//    id: {
//        type: Sequelize.INTEGER,
//        autoincrement: true
//    }
//}, {
//    freezeTableName: true // Model tableName will be the same as the model name
//});
//
//var Programacao = sequelize.define('programacoes', {
//    id: {
//        type: Sequelize.INTEGER,
//        autoincrement: true
//    },
//    nome: {
//        type: Sequelize.STRING,
//        field: 'nome'
//    },
//    frequencia: {
//        type: Sequelize.STRING,
//        field: 'frequencia'
//    },
//    horaInicio: {
//        type: Sequelize.DATE,
//        field: 'hora_inicio'
//    },
//    duracao: {
//        type: Sequelize.DATE,
//        field: 'duracao'
//    }
//});
//
//Zona.belongsToMany(Programacao, {through: 'ZonaProgramacao'});
//Programacao.belongsToMany(Zona, {through: 'ZonaProgramacao'});
//
//
//exports.criaZona = function () {
//
//    Zona.sync({force: false}).then(function () {
//        // Table created
//        return Zona.create({
//            id: 1,
//            nome: "Jardim da Frente"
//        });
//    });
//};
//
//exports.criaProgramacao = function () {
//
//    Zona.sync({force: false}).then(function () {
//        // Table created
//      
//        Programacao.create({
////            id: 1,
//            nome: "Programacao 1",
//            frequencia: 'semanal',
//            horaInicio: new Date('2015/10/01 17:30:00'),
//            duracao: 45
//        });
////        var zona = Zona.findAll({id: 1});
//        var zona = Zona.findAll({
//            where: {
//                id: 1
//            }
//        });
//        Programacao.addZona(zona);
//        return Programacao;
//    });
//};
//
