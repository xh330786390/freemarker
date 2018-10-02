
    function tipInfo() {
        var str = '<tr class="data-none-tips">\n' +
            '<td colspan="11">\n' +
            '<p class="redport">请先输入查询条件，进行查询。</p>\n' +
            '</td>\n' +
            '</tr>';
        $("#invoiceBody").empty();
        $("#invoiceBody").append(str);
    }

function checkParam() {

    var str = '';
    var businessType = $("#businessType").val();
    var contractCode = $("#contractCode").val().trim();
    var supplierCode = $("#supplierCode").val().trim();

    if(businessType == 0 || (contractCode.length == 0 && supplierCode.length == 0)){
        str = '<tr class="data-none-tips">\n' +
            '<td colspan="11">\n' +
            '<p class="redport">必须选择一种业务类型+其他查询条件，进行查询。</p>\n' +
            '</td>\n' +
            '</tr>';
        $("#invoiceBody").empty();
        $("#invoiceBody").append(str);
        return false;
    }else{
        return true;
    }


}


function getParam() {

    var param = {};

    param.businessType = $("#businessType").val();
    param.contractCode = $("#contractCode").val().trim();
    param.supplierCode = $("#supplierCode").val().trim();

    return param;
}

function queryInvoiceContractList() {
    var str = '';
    if(checkParam()){
        $.ajax({
            url:'/zall/chain/purchase/inInvoice/queryInvoiceContractList',
            type:'POST',
            data: getParam(),
            dataType: 'json',
            success: function (data) {


                if(data.status == 400){
                    alert('获取列表失败!');
                    return;
                }

                if(data.inInvoiceVOS.length == 0){
                    str = '<tr class="data-none-tips">\n' +
                        '<td colspan="11">\n' +
                        '<p class="redport">暂无数据！</p>\n' +
                        '</td>\n' +
                        '</tr>';
                    $("#invoiceBody").empty();
                    $("#invoiceBody").append(str);
                }else{
                    console.info(data.inInvoiceVOS);
                    $("#invoiceBody").empty();
                    var businessType = '卓团购';
                    for(var i = 0; i < data.inInvoiceVOS.length; i++){
                        if(data.inInvoiceVOS[i].businessType == 5){
                            businessType = '卓帮融';
                        }
                        str = '<tr><td><input type="checkbox" class="good-box"></td>\n' + '<td>' + businessType + '</td>' +
                            '<td>'+ data.inInvoiceVOS[i].contractCode + '</td>' +
                            '<td>'+ data.inInvoiceVOS[i].supplierCode + '</td>' +
                            '<td>'+ data.inInvoiceVOS[i].supplierName + '</td>' +
                            '<td>'+ numUtils.floatMoney(data.inInvoiceVOS[i].invoiceAmount) + '</td>' +
                            '<td>'+ '<a href="javascript:void(0);" class="luRu-jxp">录入进项票</a></td></tr>';
                        var contractCode = data.inInvoiceVOS[i].contractCode ;
                        $(".luRu-jxp").click(function(){
                            insertInvoices(contractCode);
                        });
                        $("#invoiceBody").append(str);
                        goodBoxClick();
                    }
                }

                // $('#invoiceTable').bootstrapTable();

            },
            error:function(result){
                alert("发生错误！获取列表失败！");
            }
        });
    }


}

function goodBoxClick() {
    $(".good-box").click(function () {
        $(".good-box:checkbox:checked").length == $(".good-box").length ? $("#check_all").prop('checked',true) : $("#check_all").prop('checked',false);
    })
}

function insertInvoices(contractCode) {
    var contractStr = '';
    var i = 0;
    if(contractCode.length == 0){
        $(".good-box:checkbox:checked").each(function () {

            var row=$(this).parent("td").parent("tr");

            var contractCode = row.find("td").eq(2).html();

            if(i == 0){
                contractStr = contractCode + "";
            }else{
                contractStr = contractStr + "," + contractCode;
            }

            i++;

        });
    }else{
        contractStr = contractCode;
    }
    if(contractStr.length > 0){
        window.location.href="/zall/chain/purchase/inInvoice/insertInvoiceItemInfo?contractStr=" + contractStr;
    }else{
        alert("暂无数据！")
    }

}

$(function () {
    tipInfo();

    $("#check_all").click(function () {
        if (($(this).prop("checked"))){
            $(".good-box").prop('checked',true)
        }else {
            $(".good-box").prop('checked',false)
        }
    });

    goodBoxClick();

});