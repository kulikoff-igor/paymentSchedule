var payment = {
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
    $('#dataTableAllPayment tbody tr td ').on('click', 'button', function () {
        if ($(this).closest("tr").find("input").val() == "") {
        } else {
            if ($(this).hasClass('btn-danger') == true) {
                payment.idPaymentSchedule = $(this).closest("tr").attr("id");
                payment.paid = false;
                payment.actualAmount = '';

            }
            if ($(this).hasClass('btn-success') == true) {
                payment.idPaymentSchedule = $(this).closest("tr").attr("id");
                payment.paid = true;
                payment.actualAmount = $(this).closest("tr").find("input").val();
            }
            $.ajax({
                url: "api/paymentConfirmation",
                type: "POST",
                async: false,
                contentType: "application/json",
                data: JSON.stringify(payment),
                success: function (data) {
                    outputAllPlannedPayment(data);
                }
            });
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
    $("#selectDateOrder").change(function () {
        outputAllPlannedPayment();
    });
});

function outputUnPlannedPayment(data) {

    for (let i in data) {
        let actualAmount = null;
        let paid = null;
        if (data[i].actualAmount != null) {
            actualAmount = data[i].actualAmount
        } else {
            actualAmount = "<input type='number' class='form-control'/>";
        }
        if (data[i].paid == true) {
            paid = "<button class='btn btn-danger  fa fa-minus' style='width: 50%'></button>";
        } else {
            paid = "<button class='btn btn-success  fas fa-fw fa-check' style='width: 50%'></button>";
        }
        let row = tableAllPayment.row.add([
            data[i].company,
            data[i].destinationObject,
            data[i].contract,
            data[i].amount,
            data[i].currency,
            data[i].conditions,
            data[i].user,
            actualAmount,
            paid]
        ).draw();
        row.nodes().to$().attr('id', data[i].idPaymentSchedule);
        row.nodes().to$().addClass("table-warning");
    }

}

function outputPlannedPayment(data) {
    tableAllPayment.clear().draw();
    for (let i in data) {
        let actualAmount = null;
        let paid = null;
        if (data[i].actualAmount != null) {
            actualAmount = data[i].actualAmount
        } else {
            actualAmount = "<input type='number' class='form-control'/>";
        }
        if (data[i].paid == true) {
            paid = "<button class='btn btn-danger  fa fa-minus' style='width: 50%'></button>";
        } else {
            paid = "<button class='btn btn-success  fas fa-fw fa-check' style='width: 50%'></button>";
        }
        let row = tableAllPayment.row.add([
            data[i].company,
            data[i].destinationObject,
            data[i].contract,
            data[i].amount,
            data[i].currency,
            data[i].conditions,
            data[i].user,
            actualAmount,
            paid]
        ).draw();
        row.nodes().to$().attr('id', data[i].idPaymentSchedule);
        row.nodes().to$().addClass("table-success");
    }
}

