let data = [];
let objectList = new Map;

let chartPlanned = Morris.Bar({
    element: 'PlannedChart',
    data: [[]],
    xkey: 'x',
    ymax: 'auto',
    barColors: ['#7a92a3', '#4da74d', '#edc240', '#0b62a4', '#afd8f8'],
    ykeys: ['Татьяна  Дунецкая', 'Ирина  Кот', 'Анастасия  Лойко', 'Анна  Тишкевич', 'null'],
    labels: ['Татьяна  Дунецкая', 'Ирина  Кот', 'Анастасия  Лойко', 'Анна  Тишкевич', 'Неопределен'],
    hideHover: false,
    horizontal: true,
    resize: true
});

let chartBLR = Morris.Donut({
    element: 'currencyBlr',
    data: [[]],
    colors: ['#ec1704', '#ecbb00', '#62ec7e'],
    resize: true
});
let chartUSD = Morris.Donut({
    element: 'currencyUsd',
    data: [[]],
    colors: ['#ec1704', '#ecbb00', '#62ec7e'],
    resize: true
});
let chartEUR = Morris.Donut({
    element: 'currencyEur',
    data: [[]],
    colors: ['#ec1704', '#ecbb00', '#62ec7e'],
    resize: true
});
let chartRUS = Morris.Donut({
    element: 'currencyRus',
    data: [[]],
    colors: ['#ec1704', '#ecbb00', '#04ec59'],
    resize: true
});


let chartUnPlanned = Morris.Bar({
    element: 'UnPlannedChart',
    data: [[]],
    xkey: 'x',
    ymax: 'auto',
    barColors: ['#7a92a3', '#4da74d', '#edc240', '#0b62a4', '#afd8f8'],
    ykeys: ['Татьяна  Дунецкая', 'Ирина  Кот', 'Анастасия  Лойко', 'Анна  Тишкевич', 'null'],
    labels: ['Татьяна  Дунецкая', 'Ирина  Кот', 'Анастасия  Лойко', 'Анна  Тишкевич', 'Неопределен'],
    hideHover: false,
    horizontal: true,
    resize: true
});

let payment = {
    idPaymentSchedule: null,
    company: null,
    destinationObject: null,
    contract: null,
    amount: null,
    currency: null,
    conditions: null,
    scheduledDate: null,
    actualDate: null,
    paid: null,
    actualAmount: null,
    user: null
};

tableAllPayment = $('#dataTableAllPayment').DataTable({
    "aoColumnDefs": [
        {"aTargets": [1], sDefaultContent: "n/a"},
    ]
});

let currencyUrgently = new Map;
let currencyPlanetPayment = new Map;
let currencyActualPayment = new Map;
let currencyBlr = [];
let currencyEur = [];
let currencyRus = [];
let currencyUsd = [];

function outputAllPlannedPayment() {
    $.ajax({
        url: "api/report/allByDatePayment",
        type: "Get",
        async: false,
        contentType: "application/json",
        data: {
            startDate: $('#startDateReport').val(),
            finishDate: $('#finishDateReport').val()
        },
        success: function (data) {
            tableAllPayment.clear().draw();
            for (let i in data) {
                if (data[i].scheduledDate != null) {
                    let row = tableAllPayment.row.add([
                        data[i].company,
                        data[i].destinationObject,
                        data[i].contract,
                        data[i].amount,
                        data[i].currency,
                        data[i].conditions,
                        data[i].scheduledDate,
                        data[i].user]
                    ).draw();
                    row.nodes().to$().addClass("table-success");
                }
                if (data[i].actualDate != null) {
                    let row = tableAllPayment.row.add([
                        data[i].company,
                        data[i].destinationObject,
                        data[i].contract,
                        data[i].amount,
                        data[i].currency,
                        data[i].conditions,
                        data[i].actualDate,
                        data[i].user]
                    ).draw();
                    row.nodes().to$().addClass("table-warning");
                }
            }
        }
    });
}

function getCurrency() {
    $.ajax({
        url: "api/report/currencyUrgently",
        type: "Get",
        dataType: "json",
        data: {
            startDate: $('#startDateReport').val(),
            finishDate: $('#finishDateReport').val()
        },
        success: function (data) {
            currencyUrgently.clear();
            for (let i = 0; i < data.length; i++) {
                currencyUrgently.set(data[i][0], data[i][1]);
            }
        }
    });
    $.ajax({
        url: "api/report/currencyPlanetPayment",
        type: "Get",
        dataType: "json",
        data: {
            startDate: $('#startDateReport').val(),
            finishDate: $('#finishDateReport').val()
        },
        success: function (data) {
            currencyPlanetPayment.clear()
            for (let i = 0; i < data.length; i++) {
                currencyPlanetPayment.set(data[i][0], data[i][1]);
            }
        }
    });
    $.ajax({
        url: "api/report/currencyActualPayment",
        type: "Get",
        dataType: "json",
        data: {
            startDate: $('#startDateReport').val(),
            finishDate: $('#finishDateReport').val()
        },
        success: function (data) {
            currencyActualPayment.clear();
            for (let i = 0; i < data.length; i++) {
                currencyActualPayment.set(data[i][0], data[i][1]);
            }
        }
    });
}

$(document).ready(function () {
    $.ajax({
        url: "api/findNameUser",
        type: "Get",
        dataType: "json",
        async: false,
        contentType: "application/json",
        data: {},
        success: function (data) {
            $("#userFirstName").text(data.name);
            $("#userLastName").text(data.lastName);
        }
    });
    $('#formatReport').click(function () {
        $.ajax({
            url: "api/report/userCountPlanetPayment",
            type: "Get",
            dataType: "json",
            data: {
                startDate: $('#startDateReport').val(),
                finishDate: $('#finishDateReport').val()
            },
            success: function (data) {
                objectList = new Map;
                for (let i = 0; i < data.length; i++) {
                    if (objectList.has(data[i][1]) == false) {
                        objectList.set(data[i][1], new Array({name: data[i][0], count: data[i][2]}));
                        continue;
                    }
                    if (objectList.has(data[i][1]) == true) {
                        objectList.get(data[i][1]).push({name: data[i][0], count: data[i][2]});
                    }

                }
                object = {};
                data = [];
                objectList.forEach(function (value, key) {
                    let object = {};
                    object['x'] = key;
                    value.forEach(function (element) {
                        object[element.name] = element.count;
                    });
                    data.push(object);
                });
                chartPlanned.setData(data);
            }
        });

        $.ajax({
            url: "api/report/userCountActualPayment",
            type: "Get",
            dataType: "json",
            data: {
                startDate: $('#startDateReport').val(),
                finishDate: $('#finishDateReport').val()
            },
            success: function (data) {
                objectList = new Map;
                for (let i = 0; i < data.length; i++) {
                    if (objectList.has(data[i][1]) == false) {
                        objectList.set(data[i][1], new Array({name: data[i][0], count: data[i][2]}));
                        continue;
                    }
                    if (objectList.has(data[i][1]) == true) {
                        objectList.get(data[i][1]).push({name: data[i][0], count: data[i][2]});
                    }

                }
                object = {};
                data = [];
                objectList.forEach(function (value, key) {
                    let object = {};
                    object['x'] = key;
                    value.forEach(function (element) {
                        object[element.name] = element.count;
                    });
                    data.push(object);
                });
                chartUnPlanned.setData(data);
            }
        });
        $.when(getCurrency()).then(function () {
                chartEUR.setData([[]]);
                chartRUS.setData([[]]);
                chartUSD.setData([[]]);
                chartBLR.setData([[]]);
                let type = ["Срочные", "Внеплановые", "Плановые"];
                let typeCurrency = ["BLR", "RUS", "USD", "EUR"];
                for (let i = 0; i < typeCurrency.length; i++) {
                    let dataChart = new Array;
                    let temp = 0;
                    for (let j = 0; j < type.length; j++) {
                        if (j === 0) {
                            if (currencyUrgently.has(typeCurrency[i])) {
                                dataChart.push({label: "Срочные", value: currencyUrgently.get(typeCurrency[i])});
                            }
                            else {
                                dataChart.push({label: "Срочные", value: 0});
                                temp++;
                            }
                        }
                        if (j === 1) {
                            if (currencyActualPayment.has(typeCurrency[i])) {
                                dataChart.push({label: "Внеплановые", value: currencyActualPayment.get(typeCurrency[i])});
                            }
                            else {
                                dataChart.push({label: "Внеплановые", value: 0});
                                temp++;
                            }
                        }
                        if (j === 2) {
                            if (currencyPlanetPayment.has(typeCurrency[i])) {
                                dataChart.push({label: "Плановые", value: currencyPlanetPayment.get(typeCurrency[i])});
                            }
                            else {
                                dataChart.push({label: "Плановые", value: 0});
                                temp++;
                            }
                        }
                    }
                    if (temp === 3) {
                        continue;
                    } else {
                        if (i === 0) {
                            chartBLR.setData(dataChart);
                        }
                        if (i === 1) {
                            chartRUS.setData(dataChart);
                        }
                        if (i === 2) {
                            chartUSD.setData(dataChart);
                        }
                        if (i === 3) {
                            chartEUR.setData(dataChart);
                        }
                    }
                }
            }
        );
        outputAllPlannedPayment();
    });

});