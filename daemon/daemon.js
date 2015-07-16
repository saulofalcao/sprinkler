var gerenciadorTarefas = require('./gerenciador_tarefas.js');

// intervalo em SEGUNDOS
INTERVALO_CHECAGEM_EM_SEGUNDOS = 30;
//var bd = require('./BD.js');

function Daemon() {
    new gerenciadorTarefas();
    setInterval(function () {
        console.log('estou como Daemon');
        new gerenciadorTarefas();
    }, INTERVALO_CHECAGEM_EM_SEGUNDOS * 1000);
//    new gerenciadorTarefas();

}
Daemon.prototype.handleProgramacoes = function(programacoes){
  console.log(programacoes);
};

new Daemon();

//module.exports = Daemon;

