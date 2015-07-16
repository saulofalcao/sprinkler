var mysql = require("mysql");

function REST_ROUTER(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection) {
    console.log('entrou handleRoutes');
    router.get("/", function (request, resource) {
        resource.json({"Message": "Hello World !"});
    });

    router.get("/zonas", function (request, resource) {
        var sql = "SELECT * FROM ??";
        var table = ["zonas"];
        var query = mysql.format(sql, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "Error Message": err.message});
            }
            else {
                resource.json({"Error": false, "Message": "Success", "Zonas": rows});
            }
        });
    });
    router.get("/zonas/:zona_id", function (request, resource) {
        var sql = "SELECT * FROM ?? WHERE ??=?";
        var table = ["zonas", "id", request.params.zona_id];
        var query = mysql.format(sql, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "Error Message": err.message});
            }
            else if (rows.length === 0) {
                resource.json({"Error": true, "Message": "Zona não encontrada!"});
            }
            else {
                resource.json({"Error": false, "Message": "Success", "Zona": rows});
            }
        });
    });



    router.post("/zonas", function (request, resource) {
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var agora = new Date();
        console.log(request.body.id);
        console.log(request.body.nome);
        var table = ["zonas", "nome", "createdAt", "updatedAt", request.body.nome, agora, agora];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "msg2": err.message});
            } else {
                resource.json({"Error": false, "Message": "User Added !"});
            }
        });
    });

    router.put("/zonas/:zona_id", function (request, resource) {
        var sql = "UPDATE ?? SET ??=?, ??=? WHERE ??=?";
        var agora = new Date();
//        console.log(request.body.id);
//        console.log(request.body.nome);
        var table = ["zonas", "nome", request.body.nome, "updatedAt", agora, "id", request.params.zona_id];
        var query = mysql.format(sql, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "msg2": err.message});
            } else {
                resource.json({"Error": false, "Message": "Zona atualizada!"});
            }
        });
    });

    router.get("/programacoes", function (request, resource) {
        var sql = "SELECT * FROM ??";
        var table = ["programacoes"];
        var query = mysql.format(sql, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "Error Message": err.message});
            }
            else {
                resource.json({"Error": false, "Message": "Success", "Programações": rows});
            }
        });
    });

    router.get("/programacoes/:programacao_id", function (request, resource) {
        var sql = "SELECT * FROM ?? WHERE ??=?";
        var table = ["programacoes", "id", request.params.programacao_id];
        var query = mysql.format(sql, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "Error Message": err.message});
            }
            else if (rows.length === 0) {
                resource.json({"Error": true, "Message": "Programação não encontrada!"});
            }
            else {
                resource.json({"Error": false, "Message": "Success", "Programação": rows});
            }
        });
    });



    router.post("/programacoes", function (request, resource) {
        var agora = new Date();
        var query_programacao = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
//        var table_programacoes = ["programacoes", "nome", "frequencia", "ativa", "hora_inicio", "duracao", "createdAt", "updatedAt", request.body.nome, request.body.frequencia, request.body.ativa, request.body.hora_inicio, request.body.duracao, agora, agora];
        var ativa = '';
        ativa = request.body.ativa === 'true'? true: false;
//        if (request.body.ativa === 'true')
//        {
//           ativa = true;
//           
//        }
//        else {
//            ativa = false;
//        }
        var table_programacoes = ["programacoes", "nome", "frequencia", "ativa", "hora_inicio", "duracao", "createdAt", "updatedAt", request.body.nome, request.body.frequencia, ativa, agora, request.body.duracao, agora, agora];

        query_programacao = mysql.format(query_programacao, table_programacoes);


        var error_all = [];
        var msg_all = [];
        var rows_all = [];

//        var retorno = {"Error": {"Programacao": "", "Zona_Programacao": ""}, "Msg": {"Programacao": "", "Zona_Programacao": ""}, "Detalhe": {"Programacao": "", "Zona_Programacao": ""}};

//        var teste = this;
        connection.query(query_programacao, function (err, result) {
            this.retorno2 = [];
            var retorno = this.retorno;
            console.log('retorno 1');
            console.dir(retorno);

            if (err) {
                retorno.Error.Programacao = true;
                retorno.Detalhe.Programacao = err.message;
                retorno.Msg.Programacao = "Erro ao inserir a Programação";
                console.log('retorno 2');
                console.dir(retorno);
//                return;
//                return retorno;
                this.retorno2.push(retorno);
                resource.json(this.retorno2);
                return;

            } else {
                this.programacaoId = result.insertId;

                retorno.Error.Programacao = false;
                retorno.Detalhe.Programacao = "";
                retorno.Msg.Programacao = "Programação " + this.programacaoId + " inserida";
                console.log('retorno 3');
                console.dir(retorno);


                console.log("request.body.zonas_ids.length");
                console.log(request.body.zonas_ids.length);
                var inseridos = 0;
                for (this.i = 0; this.i < request.body.zonas_ids.length; this.i++)
                {
                    var zonaId = request.body.zonas_ids[this.i];
                    
//                    console.log("this.zonaId: " + this.zonaId);

//                    console.log("i < request.body.zonas_ids.length? " + this.i);
//                    console.dir(request.body.zonas);  
//                    console.dir(request.body);
                    var query_zona_programacao = "INSERT INTO ??(??,??) VALUES (?,?)";
                    var table_zona_programacao = ["zona_programacao", "zona_id", "programacao_id", request.body.zonas_ids[this.i], this.programacaoId];
                    query_zona_programacao = mysql.format(query_zona_programacao, table_zona_programacao);

                    connection.query(query_zona_programacao, function (zonaId, err, result) {
//                        console.log("this: ");
//                        console.dir(this);
                        var retorno = this.retorno;
                        if (err) {
                            retorno.Error.Zona_Programacao = true;
                            retorno.Detalhe.Zona_Programacao = err.message;
                            retorno.Msg.Zona_Programacao = "Erro ao inserir a Zona_Programação: request.body.zonas_ids[" + this.i + "]";
//                            console.log('retorno 4');
//                            console.dir(retorno);

                            this.retorno2.push(retorno);
                            resource.json(this.retorno2);

                            return;


                        } else {
                            inseridos++;
                            console.log("result");
                            console.dir(result);
                            console.log("zonaId:");
                            console.log(zonaId);
//                            var prog = "Zona_PRogramacao" + this.i;
                            retorno.Error.Zona_Programacao = false;
                            retorno.Detalhe.Zona_Programacao = "";
                            retorno.Msg.Zona_Programacao = "Zona_Id " + zonaId + " inserida na Programação " + this.programacaoId;
                                
                            
//                            console.log('retorno 5');
//                            console.dir(retorno);
                            console.log('retorno:');
                            console.dir(retorno);
//                            jQuery.extend({}, retorno);
                            
                            this.retorno2.push(JSON.parse(JSON.stringify(retorno)));
 
                                

                            if (inseridos === request.body.zonas_ids.length)
                            {
                                resource.json(this.retorno2);
                            }


                        }

//                        this.retorno2.push(retorno);
//                        resource.json(this.retorno2);
                    }.bind(this, zonaId));
//                    });
//                        resource.json(this.retorno2);

                }
//                resource.json(retorno);

            }
//        }.bind({retorno: {"Error": {"Programacao": "", "Zona_Programacao": ""}, "Msg": {"Programacao": "", "Zona_Programacao": ""}, "Detalhe": {"Programacao": "", "Zona_Programacao": ""}}}));
        }.bind(this));
        console.log('this.retorno 6');
        console.dir(this.retorno);
//        resource.json({"Error": this.retorno.error, "Message": this.retorno.msg, "Detalhes": this.retorno.Detalhe});
//        resource.json(this.retorno2);


//        }.bind({retorno: {"Error": {"Programacao": "", "Zona_Programacao": ""}, "Msg": {"Programacao": "", "Zona_Programacao": ""}, "Detalhe": {"Programacao": "", "Zona_Programacao": ""}}}));
    }.bind({retorno: {"Error": {"Programacao": ""}, "Msg": {"Programacao": ""}, "Detalhe": {"Programacao": ""}}}));

    router.delete("/programacoes/:programacao_id", function (request, resource) {
        var sql = "DELETE FROM ?? WHERE ??=?";
        var table = ["programacoes", "id", request.params.programacao_id];
        var query = mysql.format(sql, table);
        connection.query(query, function (err, rows) {
            if (err) {
                resource.json({"Error": true, "Message": "Error executing MySQL query", "Error Message": err.message});
            }
            else if (rows.length === 0) {
                resource.json({"Error": true, "Message": "Programação não encontrada!"});
            }
            else {
                resource.json({"Error": false, "Message": "Programação " + request.params.programacao_id + " excluída com sucesso", "Programação": rows});
            }
        });
        // AQUI FALTA EXCLUIR AS PROGRAMAÇÕES DA TABELA ZONA_PROGRAMACAO
    });




};



module.exports = REST_ROUTER;