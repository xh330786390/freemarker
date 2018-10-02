
$(function () {
    $("#check_all").click(function () {
        if (($(this).prop("checked"))){
            $(".fina-box").prop('checked',true)
        }else {
            $(".fina-box").prop('checked',false)
        }
    });

    check();

    /**计算开票数量*/
    openNum();
    openAmount();
    openTax();
    openTaxAmount();
    openStampTax();
    openStampTaxAmount();
    $(".open-num").change(function () {
        openNum();
    });

    $(".open-amount").change(function () {
        openAmount();
    });
    $(".open-tax").change(function () {
        openTax();
    });

    $(".open-tax-amount").change(function () {
        openTaxAmount();
    });
    $(".open-stamp-tax").change(function () {
        openStampTax();
    });

    $(".open-stamp-tax-amount").change(function () {
        openStampTaxAmount();
    });
});

function check() {
    $(".fina-box").click(function () {
        $(".fina-box:checkbox:checked").length >= $(".fina-box").length ? $("#check_all").prop('checked',true) : $("#check_all").prop('checked',false);
    })
}

function addTR($this) {
    var $_table=$(".choseSelectTable tbody");
    // var tr = $_table.find("tr:first").html();
    // tr = "<tr>"+tr+"</tr>";
    // console.log(tr);
    // $_table.append(tr);
    // check()

    var tr = $($this).parent().parent().html();
    tr = "<tr>"+tr+"</tr>";
    console.log(tr);
    $_table.append(tr);
    // 带搜索功能的输入框
    chosFun();
    $(".choseSelectTable tbody tr:last td").eq(7).find('.chosen-container').eq(1).remove();
    // $('.chosen-container-single').remove();
    $('.input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });
    check()

}

function openNum() {
    var $_table=$(".choseSelectTable tbody");
    var openNum=0;
    $_table.find(".open-num").each(function (i) {
        if($(this).val()){
            openNum=numUtils.add(openNum,$(this).val());
        }
    });
    openNum=numUtils.weight(openNum);
    $("#openNum").html(openNum);
}

function openAmount() {
    var $_table=$(".choseSelectTable tbody");
    var openAmount=0;
    $_table.find(".open-amount").each(function (i) {
        if($(this).val()) {
            openAmount = numUtils.add(openAmount, $(this).val());
        }
    });
    openAmount=numUtils.money(openAmount);
    $("#openMoney").html(openAmount);
}

function openTax() {
    var $_table=$(".choseSelectTable tbody");
    var openTax=0;
    $_table.find(".open-tax").each(function (i) {
        if($(this).val()) {
            openTax=numUtils.add(openTax,$(this).val());
        }
    });
    openTax=numUtils.money(openTax);
    $("#openTax").html(openTax);
}

function openTaxAmount() {
    var $_table=$(".choseSelectTable tbody");
    var openTaxAmount=0;
    $_table.find(".open-tax-amount").each(function (i) {
        if($(this).val()) {
            openTaxAmount=numUtils.add(openTaxAmount,$(this).val());
        }
    });
    openTaxAmount=numUtils.money(openTaxAmount);
    $("#openTotal").html(openTaxAmount);
}

function openStampTax() {
    var $_table=$(".choseSelectTable tbody");
    var openStampTax=0;
    $_table.find(".open-stamp-tax").each(function (i) {
        if($(this).val()) {
            openStampTax=numUtils.add(openStampTax,$(this).val());
        }
    });
    openStampTax=numUtils.money(openStampTax);
    $("#openStampTax").html(openStampTax);
}

function openStampTaxAmount() {
    var $_table=$(".choseSelectTable tbody");
    var openStampTaxAmount=0;
    $_table.find(".open-stamp-tax-amount").each(function (i) {
        if($(this).val()) {
            openStampTaxAmount=numUtils.add(openStampTaxAmount,$(this).val());
        }
    });
    openStampTaxAmount=numUtils.money(openStampTaxAmount);
    $("#openStampTaxAmount").html(openStampTaxAmount);
}

function getParam() {
    var inInvoiceVOS = {};
    $(".fina-box:checkbox:checked").each(function (i) {
        var row=$(this).parent("td").parent("tr");
        var business = 2;
        if(row.find("td").eq(2).html() == "卓帮融"){
            business = 5;
        }
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].contractType"] = row.find("td").eq(1).html();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].businessType"] = business;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].contractCode"] = row.find("td").eq(3).html();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].supplierCode"] = row.find("td").eq(4).html();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceAttribute"] = row.find("td").eq(5).find("select :selected").val();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceType"] = row.find("td").eq(6).find("select :selected").val();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].supplierId"] = row.find("td").eq(7).find("select :selected").val();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].supplierName"] = row.find("td").eq(7).find("select :selected").text();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceTime"] = getLongTime(row.find("td").eq(8).find("input").val());
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceCode"] = row.find("td").eq(9).find("input").val();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceNumber"] = row.find("td").eq(10).find("input").val();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceContent"] = row.find("td").eq(11).find("select :selected").val();
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceWeight"] = row.find("td").eq(12).find("input").val() * 10000;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceAmount"] = row.find("td").eq(13).find("input").val() * 100;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].taxRate"] = parseFloat(row.find("td").eq(14).find("input").val()) * 100;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceTax"] = row.find("td").eq(15).find("input").val() * 100;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].invoiceTaxAmount"] = row.find("td").eq(16).find("input").val() * 100;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].stampTax"] = row.find("td").eq(17).find("input").val() * 100;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].stampTaxAmount"] = row.find("td").eq(18).find("input").val() * 100;
        inInvoiceVOS["inInvoiceItemVOS[" + i + "].remark"] = row.find("td").eq(19).find("input").val();
    });
    console.info(JSON.stringify(inInvoiceVOS));
    return inInvoiceVOS;
}

function insertInvoiceItems() {

    var second = 0;
    second = $(".fina-box:checkbox:checked").length;
    if(second == 0){
        alert("暂无数据！")
        return;
    }else {
        console.info(JSON.stringify(getParam()));
        $.ajax({
            url:'/zall/chain/purchase/inInvoice/insertInvoiceItem',
            type:'POST',
            data:getParam(),
            dataType: 'json',
            success: function (data) {

                if(data.status == 400){
                    alert('录入进项票失败!');
                    return;
                }
                alert('录入进项票成功！')
                // window.location.href="/zall/chain/purchase/inInvoice/stockList";

            },
            error:function(result){
                alert("发生错误！录入进项票失败！");
            }
        });
    }

}