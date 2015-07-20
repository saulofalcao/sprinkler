var mysql = require('mysql');
//var daemon = require('./daemon.js');

function BD(callback) {
//    var self = this;
    this.callback = callback;
    
    
    this.connectMysql(callback);
//    return self;

}

BD.prototype.connectMysql = function (callback) {
//    this.callback = callback;
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
            console.log('conectou mysql');
//            var programacoes = self.getProgramacoes(connection);
//            handleProgramacoes(programacoes);
//            console.dir(connection);
//            self.configureExpress(connection);
//            daemon.handleProgramacoes(programacoes);
//              return connection;
//            console.log('conexao 2:');
//            console.dir(connection);
            this.conexao = connection;
            this.callback(this);
//            this.connection = connection;
        }
        
    }.bind(this));
};

BD.prototype.getProgramacoes = function (connection, callback) {
    var sql = "SELECT * FROM ??";
    var table = ["programacoes"];
    var query = mysql.format(sql, table);
    connection.query(query, function (err, rows) {
        if (err) {
            console.log({"Error": true, "Mensagem": "Erro executando query BD.prototype.getProgramacoes", "Detalhe": err.message});
        }
        else {
//            console.log({"Error": false, "Mensagem": "Sucesso ao executar query BD.prototype.getProgramacoes", "Programacoes": rows});
            console.log({"Error": false, "Mensagem": "Sucesso ao executar query BD.prototype.getProgramacoes"});
            callback(rows);
        }
    });
};

BD.prototype.getProgramacaoAtivaPorHoraInicio = function (connection, hora) {
//SELECT * FROM `programacoes` WHERE TIME(`hora_inicio`) >= TIME('11:30:00') AND TIME(`hora_inicio`) <= TIME('2014-10-10 11:30:00' + INTERVAL 10 MINUTE)
    var sql = "SELECT * FROM ?? WHERE TIME(??) >= TIME(?) AND TIME(??) <= TIME(? + INTERVAL " + INTERVALO_CHECAGEM_EM_SEGUNDOS * 2 + " SECOND) AND ??=?";
    var table = ["programacoes", "hora_inicio", hora, "hora_inicio",hora, "ativa",true];
    var query = mysql.format(sql, table);
    console.log(query);
    
    connection.query(query, function (err, rows) {
        if (err) {
            console.log({"Error": true, "Mensagem": "Erro executando query BD.prototype.getProgramacoes", "Detalhe": err.message});
        }
        else {
//            console.log({"Error": false, "Mensagem": "Sucesso ao executar query BD.prototype.getProgramacoes", "Programacoes": rows});
            console.log({"Error": false, "Mensagem": "Sucesso ao executar query BD.prototype.getProgramacoes"});
            return rows;
//            callback(rows);
        }
    });
};

//BD.prototype.getZonasProgramacao = function (connection, programacao, callback) {
//    var programacaoId = 
//    var sql = "SELECT ?? FROM ?? WHERE ??=?";
//    var table = ["zona_id","zona_programacao","programacao",];
//    var query = mysql.format(sql, table);
//    connection.query(query, function (err, rows) {
//        if (err) {
//            console.log({"Error": true, "Mensagem": "Erro executando query BD.prototype.getProgramacoes", "Detalhe": err.message});
//        }
//        else {
////            console.log({"Error": false, "Mensagem": "Sucesso ao executar query BD.prototype.getProgramacoes", "Programacoes": rows});
//            console.log({"Error": false, "Mensagem": "Sucesso ao executar query BD.prototype.getProgramacoes"});
//            callback(rows);
//        }
//    });
//};



module.exports = BD;
