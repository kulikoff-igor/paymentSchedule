var payment = {
    idPaymentSchedule: null,
    company: null,
    destinationObject: null,
    contract: null,
    amount: null,
    currency: null,
    conditions: null,
    scheduledDate: null,
    user: null
};
tableReport = $('#dataTableReportPlannedPayment').DataTable({
    paging: false,
    "lengthChange": false,
    "ordering": false,
    "info": true,
    "aoColumnDefs": [
        {"aTargets": [1], sDefaultContent: "n/a"}
    ]
});


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
    $('#printReport').click(function () {
        window.print();
    });
    $('#formatReport').click(function () {
        $.ajax({
            url: "api/report/sumCurrency",
            type: "Get",
            dataType: "json",
            data: {
                startDate: $('#startDateReport').val(),
                finishDate: $('#finishDateReport').val()
            },
            success: function (data) {
                $(".currencyPanel .currency").remove();
                for (let i = 0; i < data.length; i++) {
                    $(".currencyPanel").append("<div class=\"col-2 currency \" >" + data[i][0] + " : " + toLocaleStringSupportsLocales(data[i][1]) + "</div>");
                }
            }
        });
        $.ajax({
            url: "api/report/findPaymentSchedule",
            type: "Get",
            dataType: "json",
            data: {
                startDate: $('#startDateReport').val(),
                finishDate: $('#finishDateReport').val()
            },
            success: function (data) {
                tableReport.clear().draw();
                outputReportPlannedPayment(data);
            }
        });
    });

});

function outputReportPlannedPayment(data) {
    for (let i in data) {
        let row = tableReport.row.add([
            data[i].company,
            data[i].destinationObject,
            data[i].contract,
            toLocaleStringSupportsLocales(data[i].amount),
            data[i].currency,
            data[i].conditions,
            data[i].scheduledDate,
            data[i].user]
        ).draw();
        row.nodes().to$().attr('id', data[i].idPaymentSchedule);
    }
}

function toLocaleStringSupportsLocales(amount) {
    try {
        (amount).toLocaleString('ru-RU');
    } catch (e) {
        console.log(e + amount);
        return amount;
    }
    return (amount).toLocaleString('ru-RU');
}
