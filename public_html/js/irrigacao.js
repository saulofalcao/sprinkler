/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('#selectConfigZona').on('change', function () {
//    alert('OI');
    $('#panelEditarZona').removeClass('hidden');
//    $('#inputNomeZona').val('Jardim da Frente');
//    alert($('select option:selected').html());
    $('#spanNomeZona').html($('select option:selected').html());
    $('#inputNomeZona').val($('select option:selected').html());

});


//eventos =    { events: [
//            {
//                title: 'Event1',
//                start: '2015-05-06'
//            },
//            {
//                title: 'Event2',
//                start: '2015-05-09'
//            }
//        ]
//    };

$(document).ready(function () {

    // page is now ready, initialize the calendar...
    var firstHour = new Date().getUTCHours() - 10;
//    alert(firstHour);
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        
        dayClick: function () {
            alert('Clicou num dia');
        },
        lang: 'pt-br',
        firstDay: 1,
        allDaySlot: false,
        axisFormat: 'H:mm',
//        contentHeight: 300,
//        aspectRatio: 2,
//        height: 400,
//        firstHour: firstHour,
        scrollTime: '13:00',

        
        views: {
            week: {// name of view
                titleFormat: 'DD/MM/YYYY'
                        // other view-specific options here
            }
        },
//        businessHours: true,
        events: [
            {
                title: 'Jardim Frente',
//                start: '2015-05-20 16:00',
//                end: '2015-05-20 16:30',
                start: '16:00',
                end: '16:30',
                dow: [0, 1, 3, 5]
            },
            {
                title: 'Jardim Frente',
                start: '2015-05-06 09:00',
                end: '2015-05-06 09:30'
            },
            {
                title: 'Jardim Piscina',
                start: '2015-05-09 16:00',
                end: '2015-05-09 16:30'
            }
        ],
        defaultView: 'agendaWeek'

    });

});

