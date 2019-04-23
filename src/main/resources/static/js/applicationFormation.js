var payment = {
    idPaymentSchedule: "",
    company: "",
    destinationObject: "",
    contract: "",
    amount: "",
    currency: "",
    conditions: "",
    scheduledDate: "",
    actualDate: "",
    actualAmount: "",
    user: null
};

tablePlanned = $('#dataTablePlannedPayment').DataTable({
    paging: false,
    "lengthChange": false,
    "ordering": false,
    "info": true,
    "aoColumnDefs": [
        {"aTargets": [1], sDefaultContent: "n/a"},
    ],
    "createdRow": function (row, data, index) {
        $(row).addClass("table-success");
    }
});
tableUnPlanned = $('#dataTableUnPlannedPayment').DataTable({
    paging: false,
    "searching": false,
    "info": true,
    "lengthChange": false,
    "ordering": false,
    "aoColumnDefs": [
        {"aTargets": [1], sDefaultContent: "n/a"},
    ],
    "createdRow": function (row, data, index) {
        $(row).addClass("table-warning");
    }

});

function outputAllPlannedPayment() {

    $.ajax({
        url: "api/getForDatePaymentPlanned",
        type: "Get",
        async: false,
        contentType: "application/json",
        data: {
            scheduledDate: $("#selectDateOrder").val()
        },
        success: function (data) {
            outputPlannedPayment(data);
        }
    });
    $.ajax({
        url: "api/getForDateUnPaymentPlanned",
        type: "Get",
        async: false,
        contentType: "application/json",
        data: {
            actualDate: $("#selectDateOrder").val()
        },
        success: function (data) {
            outputUnPlannedPayment(data);
        }
    });
}

function clearPayment() {
    for (var key in payment) {
        delete payment[key];
    }
}

function calculationSummDayPayment() {
    $.ajax({
        url: "api/report/daySumCurrency",
        type: "Get",
        dataType: "json",
        data: {
            dayDate: $('#selectDateOrder').val()
        },
        success: function (data) {
            $(".currencyPanel .currency").remove();
            for (let i = 0; i < data.length; i++) {
                console.log(data[i][0] + data[i][1])
                $(".currencyPanel").append("<div class=\"col-2 currency \" >" + data[i][0] + " : " + toLocaleStringSupportsLocales(data[i][1]) + "</div>");
            }
        }
    });
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

$(document).ready(function () {
    $('#companyAddUnPlanned').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "api/autocomplete/company",
                type: "Get",
                dataType: "json",
                data: {
                    company: request.term,
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item
                        };
                    }))
                }
            });
        }
    });
    $('#destinationObjectAddUnPlanned').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "api/autocomplete/destinationObject",
                type: "Get",
                dataType: "json",
                data: {
                    destinationObject: request.term,
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item
                        };
                    }))
                }
            });
        }
    });
    $('#contractAddUnPlanned').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "api/autocomplete/contract",
                type: "Get",
                dataType: "json",
                data: {
                    contract: request.term,
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item
                        };
                    }))
                }
            });
        }
    });
    $('#conditionsAddUnPlanned').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "api/autocomplete/conditions",
                type: "Get",
                dataType: "json",
                data: {
                    conditions: request.term,
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item
                        };
                    }))
                }
            });
        }
    });
    $('#printReport').click(function () {
        calculationSummDayPayment();
        window.print();
    });

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
    $("#editUnPlannedPayment").click(function () {
        if ($("#companyEditUnPlanned").val() == "" || $("#selectDateOrder").val() == "") {
            $("#panelAddUnPlannedPayment").append(" <div class=\"alert alert-danger alert-dismissable\">\n" +
                "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n" +
                "          Поля ПРЕДПРИЯТИЕ и ДАТА ПЛАТЕЖА не должны быть пустыми!!!" +
                "            </div>")
        }
        else {
            payment.company = $("#companyEditUnPlanned").val();
            payment.destinationObject = $("#destinationObjectEditUnPlanned").val();
            payment.contract = $("#contractEditUnPlanned").val();
            payment.amount = $("#amountEditUnPlanned").val();
            payment.currency = $("#currencyEditUnPlanned").val();
            payment.conditions = $("#conditionsEditUnPlanned").val();
            payment.actualDate = $("#selectDateOrder").val();
            payment.user = $("#userFirstName").text() + " " + $("#userLastName").text();
            $.ajax({
                url: "api/editPlannedPayment",
                type: "Post",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(payment),
                success: function (data) {
                    $("#cancelEditUnPlannedPayment").click();
                    outputAllPlannedPayment();

                }
            });
            calculationSummDayPayment();
        }
    });

    $("#deleteUnPlannedPayment").click(function () {
        $.ajax({
            url: "api/deletePlannedPayment",
            type: "Get",
            async: false,
            contentType: "application/json",
            data: {
                idPaymentSchedule: payment.idPaymentSchedule
            },
            success: function () {
                $("#cancelEditUnPlannedPayment").click();
                clearPayment();
                outputAllPlannedPayment();
                calculationSummDayPayment();
            }
        });
    });
    $("#cancelEditUnPlannedPayment").click(function () {
        clearPayment();
        $("#panelEditUnPlannedPayment").find('input:text')
            .each(function () {
                $(this).val('');
            });
        $("#panelEditUnPlannedPayment").css('display', 'none');
    });
    $("#addUnPlannedPayment").click(function () {
        if ($("#companyAddUnPlanned").val() == "" || $("#selectDateOrder").val() == "") {
            $("#panelAddUnPlannedPayment").append(" <div class=\"alert alert-danger alert-dismissable\">\n" +
                "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n" +
                "          Поля ПРЕДПРИЯТИЕ и ДАТА ПЛАТЕЖА не должны быть пустыми!!!" +
                "            </div>")
        }
        else {
            payment.company = $("#companyAddUnPlanned").val();
            payment.destinationObject = $("#destinationObjectAddUnPlanned").val();
            payment.contract = $("#contractAddUnPlanned").val();
            payment.amount = $("#amountAddUnPlanned").val();
            payment.currency = $("#currencyAddUnPlanned").val();
            payment.conditions = $("#conditionsAddUnPlanned").val();
            payment.actualDate = $("#selectDateOrder").val();
            payment.user = $("#userFirstName").text() + " " + $("#userLastName").text();
            $.ajax({
                url: "api/addPlannedPayment",
                type: "Post",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(payment),
                success: function (data) {
                    $("#panelAddUnPlannedPayment").find('input:text')
                        .each(function () {
                            $(this).val('');
                        });
                    outputAllPlannedPayment();
                }
            });
            calculationSummDayPayment();
        }
    });
    $("#showAddPanelUnPlannedPayment").click(function () {
        $("#showAddPanelUnPlannedPayment").css('display', 'none');
        $("#panelAddUnPlannedPayment").css('display', '');
        $("#panelEditUnPlannedPayment").css('display', 'none');
        $("#addUnPlannedPayment").css('display', '');
        $("#cancelAddUnPlannedPayment").css('display', '');
        $("#panelEditUnPlannedPayment").css('display', 'none');
    });
    $("#cancelAddUnPlannedPayment").click(function () {
        $("#panelAddUnPlannedPayment").css('display', 'none');
        $("#panelEditUnPlannedPayment").css('display', 'none');
        $("#addUnPlannedPayment").css('display', 'none');
        $("#cancelAddUnPlannedPayment").css('display', 'none');
        $("#showAddPanelUnPlannedPayment").css('display', '');
    });
    $("#selectDateOrder").change(function () {
        outputAllPlannedPayment();
        calculationSummDayPayment();
    });
});

function outputUnPlannedPayment(data) {
    tableUnPlanned.clear().draw();
    for (let i in data) {
        let row = tableUnPlanned.row.add([
            data[i].company,
            data[i].destinationObject,
            data[i].contract,
            data[i].amount,
            data[i].currency,
            data[i].conditions,
            data[i].user]
        ).draw();
        row.nodes().to$().attr('id', data[i].idPaymentSchedule);
    }
    $('#dataTableUnPlannedPayment tbody').on('click', 'tr', function () {
        $("#cancelAddUnPlannedPayment").click();
        $("#panelEditUnPlannedPayment").css('display', '');
        let row = tableUnPlanned.row(this).data();
        payment.idPaymentSchedule = this.getAttribute('id');
        $("#companyEditUnPlanned").val(row[0]);
        $("#destinationObjectEditUnPlanned").val(row[1]);
        $("#contractEditUnPlanned").val(row[2]);
        $("#amountEditUnPlanned").val(row[3]);
        $("#currencyEditUnPlanned").val(row[4]);
        $("#conditionsEditUnPlanned").val(row[5]);
    });
}

function outputPlannedPayment(data) {
    tablePlanned.clear().draw();
    for (let i in data) {
        let row = tablePlanned.row.add([
            data[i].company,
            data[i].destinationObject,
            data[i].contract,
            data[i].amount,
            data[i].currency,
            data[i].conditions,
            data[i].user]
        ).draw();
        row.nodes().to$().attr('id', data[i].idPaymentSchedule);
    }
}

