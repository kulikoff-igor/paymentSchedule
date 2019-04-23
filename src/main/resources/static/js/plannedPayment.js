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
table = $('#dataTablePlannedPayment').DataTable({
    dom: 'Bfrtip',
    language: {
        buttons: {
            pageLength: {
                _: "Отображать %d строк",
                '-1': "Tout afficher"
            }
        }
    },
    buttons: [
        'pageLength',
        {
            text: '<i\n class="fa fa-print "></i> Открыть печатную форму',
            className: "btn btn-success btn-circle noprint",
            action: function (e, dt, node, config) {
                document.location.href = "reportForm";
            }
        }
    ],
    "aoColumnDefs": [
        {"aTargets": [1], sDefaultContent: "n/a"}
    ]
});

function outputAllPlannedPayment() {
    $.ajax({
        url: "api/getAllPayment/",
        type: "Get",
        async: false,
        contentType: "application/json",
        data: {},
        success: function (data) {
            table.clear().draw();
            outputPlannedPayment(data);
        }
    });
}

function clearPayment() {
    for (var key in payment) {
        delete payment[key];
    }
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

    $('#company').autocomplete({
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
    $('#destinationObject').autocomplete({
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
    $('#contract').autocomplete({
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
    $('#conditions').autocomplete({
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
    outputAllPlannedPayment();
    $("#addPlannedPayment").click(function () {
        clearPayment();
        if ($("#company").val() == "" || $("#scheduledDate").val() == "") {
            $("#addPanelPlannedPayment").append(" <div class=\"alert alert-danger alert-dismissable\">\n" +
                "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n" +
                "          Поля ПРЕДПРИЯТИЕ и ДАТА ПЛАТЕЖА не должны быть пустыми!!!" +
                "            </div>")
        }
        else {
            console.log(payment);
            payment.company = $("#company").val();
            payment.destinationObject = $("#destinationObject").val();
            payment.contract = $("#contract").val();
            payment.amount = $("#amount").val();
            payment.currency = $("#currency").val();
            payment.conditions = $("#conditions").val();
            payment.scheduledDate = new Date($("#scheduledDate").val());
            payment.user= $("#userFirstName").text()+" "+$("#userLastName").text();
            $.ajax({
                url: "api/addPlannedPayment",
                type: "Post",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(payment),
                success: function (data) {
                    $("#addPanelPlannedPayment").find('input:text')
                        .each(function () {
                            $(this).val('');
                        });
                    outputAllPlannedPayment();
                }
            });
        }
    });
    $("#cancelAddPlannedPayment").click(function () {
        $("#addPanelPlannedPayment").find('input:text')
            .each(function () {
                $(this).val('');
            });
        $("#addPanelPlannedPayment").css('display', 'none');
        $("#showButtonAddPlannedPayment").css('display', '');
        $("#addPlannedPayment").css('display', 'none');
        $("#cancelAddPlannedPayment").css('display', 'none');
    });
    $("#showButtonAddPlannedPayment").click(function () {
        $("#cancelEditPlannedPayment").click();
        $("#addPanelPlannedPayment").css('display', '');
        $("#showButtonAddPlannedPayment").css('display', 'none');
        $("#addPlannedPayment").css('display', '');
        $("#cancelAddPlannedPayment").css('display', '');
    })
    $("#cancelEditPlannedPayment").click(function () {
        clearPayment();
        $("#editPanelPlannedPayment").find('input:text')
            .each(function () {
                $(this).val('');
            });
        $("#editPanelPlannedPayment").css('display', 'none');
    });
    $("#deletePlannedPayment").click(function () {
        $.ajax({
            url: "api/deletePlannedPayment",
            type: "Get",
            async: false,
            contentType: "application/json",
            data: {
                idPaymentSchedule: payment.idPaymentSchedule
            },
            success: function () {
                $("#cancelEditPlannedPayment").click();
                clearPayment();
                outputAllPlannedPayment();

            }
        });
    });
    $("#editPlannedPayment").click(function () {
        if ($("#companyEdit").val() == "" || $("#scheduledDateEdit").val() == "") {
            $("#editPanelPlannedPayment").append(" <div class=\"alert alert-danger alert-dismissable\">\n" +
                "                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>\n" +
                "          Поля ПРЕДПРИЯТИЕ и ДАТА ПЛАТЕЖА не должны быть пустыми!!!" +
                "            </div>")
        }
        else {
            payment.company = $("#companyEdit").val();
            payment.destinationObject = $("#destinationObjectEdit").val();
            payment.contract = $("#contractEdit").val();
            payment.amount = $("#amountEdit").val();
            payment.currency = $("#currencyEdit").val();
            payment.conditions = $("#conditionsEdit").val();
            payment.scheduledDate = new Date($("#scheduledDateEdit").val());
            payment.user= $("#userFirstName").text()+" "+$("#userLastName").text();
            $.ajax({
                url: "api/editPlannedPayment",
                type: "Post",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(payment),
                success: function () {
                    $("#cancelEditPlannedPayment").click();
                    clearPayment();
                    outputAllPlannedPayment();

                }
            });
        }
    })

});

function outputPlannedPayment(data) {
    for (let i in data) {
        let row = table.row.add([
                data[i].company,
                data[i].destinationObject,
                data[i].contract,
                data[i].amount,
                data[i].currency,
                data[i].conditions,
                data[i].scheduledDate,
                data[i].user
            ]
        ).draw();
        row.nodes().to$().attr('id', data[i].idPaymentSchedule);
    }
    $('#dataTablePlannedPayment tbody').on('click', 'tr', function () {
        $("#cancelAddPlannedPayment").click();
        $("#editPanelPlannedPayment").css('display', '');
        let row = table.row(this).data();
        payment.idPaymentSchedule = this.getAttribute('id');
        $("#companyEdit").val(row[0]);
        $("#destinationObjectEdit").val(row[1]);
        $("#contractEdit").val(row[2]);
        $("#amountEdit").val(row[3]);
        $("#currencyEdit").val(row[4]);
        $("#conditionsEdit").val(row[5]);
        $("#scheduledDateEdit").val(row[6]);
    });
}
