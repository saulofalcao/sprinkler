var bd = require('./BD.js');
var mqtt = require('mqtt');

function GerenciadorTarefas() {
    var verificaSeExisteProgramacaoAgora = function (BD) {
        var agora = new Date();

        BD.getProgramacaoAtivaPorHoraInicio(BD.conexao, agora, function(programacoes){
            console.log('getProgramacaoPorHoraInicio:');
            console.log(programacoes);
        });

//        var programacoes = BD.getProgramacaoAtivaPorHoraInicio(BD.conexao, agora);
//        console.log(programacoes);
    };
    
//    function getZonaProgramacao(programacao){
//        BD.
//    }

    var gerenciaConexao = function (BD) {
        verificaSeExisteProgramacaoAgora(BD);
    };

    var BD = new bd(gerenciaConexao);

}

function iniciaProgramacao(programacao){
    
}

module.exports = GerenciadorTarefas;


