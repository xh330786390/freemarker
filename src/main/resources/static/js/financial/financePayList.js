
function loadPayListTable() {

    var paramJson = getParam();

    console.info(paramJson);

    $("#tableList").pagination({

        url : "/zall/chain/finance/outPay/list",

        paramJson : paramJson,

        callback:function(){

        }
    });
}

function getParam() {

    var param = {};

    param.pageSize = 10;

    param.pageNum = 1;

    param.auditStatus = 2;

    param.contractCode = $("#contractCode").val().trim();//销售合同编号

    param.supplierName = $("#supplierName").val().trim();//客户名称

    param.payStatus = $("#payStatus").val();//状态

    param.applyCode = $("#applyCode").val().trim();//申请编号

    param.applyType = $("#applyType").val().trim();//申请类型

    if(getLongTime($("#payTime").val().trim()) > 0){

        param.startPayTime = getLongTime($("#payTime").val().trim()) - 3600000 * 8;//某天的00：00：00打款时间

        param.endPayTime = getLongTime($("#payTime").val().trim()) + 3600000 * 16;//某天的23：59：59打款时间
    }





    // param.startCreateTime = getLongTime($("#goodsJxp_createTime").val().trim());//添加日期
    // if(getLongTime($("#goodsJxp_createTime").val().trim()) != null){
    //     param.endCreateTime = getLongTime($("#goodsJxp_createTime").val().trim()) + 86400000;//添加日期
    // }
    //
    // param.startInvoiceTime = getLongTime($("#goodsJxp_invoiceTime").val().trim());//开票日期
    // if(getLongTime($("#goodsJxp_invoiceTime").val().trim()) != null){
    //     param.endInvoiceTime = getLongTime($("#goodsJxp_invoiceTime").val().trim()) + 86400000;//开票日期
    // }


    return param;
}

$(function () {
    loadPayListTable();
    // $(".btn-success").click(function () {
    //     loadTable();
    // })

});
