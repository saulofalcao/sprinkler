var bd = require('./BD.js');

function GerenciadorTarefas() {
    var verificaSeExisteProgramacaoAgora = function (BD) {
        var agora = new Date();
//        console.dir(agora);
//        console.dir(BD);
        BD.getProgramacaoAtivaPorHoraInicio(BD.conexao, agora, function(programacoes){
            console.log('getProgramacaoPorHoraInicio:');
            console.log(programacoes);
        });
//        BD.getProgramacoes(BD.conexao, function (programacoes) {
//            console.log('sou callback de getProgramacoes');
//            console.log(programacoes);
//        });
    };

//    var gerenciaProgramacoes = function(programacoes){
////        console.log('eu sou gerenciaProgramacoes');
//        console.log(programacoes);
//    };

    var gerenciaConexao = function (BD) {
        verificaSeExisteProgramacaoAgora(BD);
    };


    var BD = new bd(gerenciaConexao);

}

module.exports = GerenciadorTarefas;


