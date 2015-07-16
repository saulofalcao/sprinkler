/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    var app = angular.module('irrigacao', []);
    app.controller('IrrigacaoController', function () {
        this.oi = "Mais omi doido";
        this.url = 'partials/menu.html';
        this.javascriptIncludesUrls = 'partials/javascript_includes.html';
//        this.exibeOutraFrequencia = exibeOutraFrequencia();
        this.frequenciasDeIrrigacao = frequenciasDeIrrigacao;
        this.minhaFrequenciaDeIrrigacao = this.frequenciasDeIrrigacao[0]; // Semanal
//        this.minhaFrequenciaDeIrrigacao.periodoEmDias = 3;
//        this.minhaFrequenciaDeIrrigacao = {
//            periodoEmDias: 5
//        };
    });
    app.controller('ZonasController', function () {
        this.zonas = zonas;
        this.ids = getZonasIds();
    });
    app.controller('ProgramacaoController', ['filterFilter', function (filterFilter) {
        this.zonas = zonas;
        this.programacao = new Programacao("Programacao " + Math.floor(Math.random() * 10 + 1));
        
//        this.programacoes = [];
        this.salvaProgramacao = function(programacao){
            this.programacao = programacao;
            console.log(this.programacao);
        };
        
//        this.zonas_selecionadas = [
//            {
//                zona_id: 1,
////                selecionada: false
//            },
//            {
//                zona_id: 2,
////                selecionada: true
//                
//            },
//            {
//                zona_id: 3,
//                selecionada: false
//            }
//        ];
//        this.zonas_selecionadas = [{zona_id: 1}, {zona_id: 3}];

//        this.programacao
        
        this.zonas_selecionadas = zonas;
        this.atualizaZonasSelecionadas = function () {
            this.zonasApenasSelecionadas = filterFilter(this.zonas_selecionadas, {selecionada: true});

        };
//        for (var i =0; i < this.zonas_selecionadas.length; i++)
//        {
//        this.zonasApenasSelecionadas.push(filterFilter(this.zonas_selecionadas[i], {selecionada: true}));
//            
//        }



        this.atualizaProgramacaoZonas = function () {
            var i = 0;
            for (var i = 0; i < zonas.length; i++)
            {
                if (this.programacao.zonas[i] === true)
                {
//                    this.zonas_selecionadas[i]

                    this.programacao.zonas.push(zonas[i].nome);
                }
                else if (this.programacao.zonas[i] === false)
                {
                    this.programacao.zonas.pop(zonas[i].nome);

                }
            }
        };



        if (this.programacao.frequencia === 'semanal')
        {
            this.programacao.partial_frequencia_url = 'partials/partial_frequencia.html';

        }
        ;



    }]);
    var zonas = [
        {
            id: 1,
            nome: 'Jardim do Lado Direito numero 2'
        },
        {
            id: 2,
            nome: 'Jardim da Frente'
        },
        {
            id: 3,
            nome: 'Quintal'
        }
    ];
    var getZonasIds = function () {
        var ids = [];
        var i;
        for (i = 0; i < zonas.length; i++)
        {
            ids.push(zonas[i].id);
        }
        return ids;
    };
    var getZonaNomeById = function (id) {
        var nome;
        zonas.some(function (zona) {
            if (zona.id === id)
            {
                nome = zona.nome;
                true;
            }
        });
        return nome;
    };
    var ehZonaNomeDoId = function (id, nome) {
        if (nome === getZonaNomeById(id))
        {
            return true;
        }
        return false;
    };
    var exibeOutraFrequencia = function (id) {
        $('#outrafrequencia').show('slow', function () {
            //animacao completa 
        });
    };

    var Programacao = function (nome) {
        this.nome = nome;
        this.zonas = [];
        this.hora_inicio = ''; //ex: 16:30
        this.duracao = 30; // em minutos
        this.frequencia = 'semanal'; // pode ser 'diaria', 'cada2dias', 'cada3dias'
        this.dia_da_semana = ['seg', 'qua', 'sex', 'dom'];
        this.data_inicio = 'today'; // somente usado se a frequencia NÃO for semanal. Ex: 'today', 'tomorrow', '25/05/2015'
        this.partial_frequencia = '<div id="partial_frequencia" class=""></div>';   // codigo html para ser incluido com a seleção da frequencia. Será diferente se a freq
        // frequencia for semanal, diaria, etc
    };

    var frequenciasDeIrrigacao = [
        {
            val: 1,
            tipo: "Semanal"
        }
        ,
        {
            val: 2,
            tipo: "Diária",
            periodoEmDias: 1
        },
        {
            val: 3,
            tipo: "Outra",
            periodoEmDias: 2
        }


    ];
})();

