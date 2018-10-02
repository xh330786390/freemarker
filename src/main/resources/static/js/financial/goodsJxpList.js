var invoiceAttribute = "1";
var cancelInvoiceId; //取消时所取消的哪条记录

function loadTable() {

    var paramJson = getParam();

    console.info(paramJson);

    $("#tableList").pagination({

        url : "/zall/chain/purchase/inInvoice/list",

        paramJson : paramJson,

        callback:function(){

        }
    });
}

function getParam() {

    var param = {};

    param.pageSize = 10;

    param.pageNum = 1;

    param.contractCode = $("#goodsJxp_contractCode").val().trim();//销售合同编号

    param.supplierName = $("#goodsJxp_supplierName").val().trim();//客户名称

    param.invoiceCode = $("#goodsJxp_invoiceCode").val().trim();//发票代码

    param.invoiceNumber = $("#goodsJxp_invoiceNumber").val().trim();//发票号码


    if(getLongTime($("#goodsJxp_createTime").val().trim()) > 0){
        param.startCreateTime = getLongTime($("#goodsJxp_createTime").val().trim()) - 3600000 * 8;//添加日期
        param.endCreateTime = getLongTime($("#goodsJxp_createTime").val().trim()) + 3600000 * 16;//添加日期
    }

    if(getLongTime($("#goodsJxp_invoiceTime").val().trim()) > 0){
        param.startInvoiceTime = getLongTime($("#goodsJxp_invoiceTime").val().trim()) - 3600000 * 8;//开票日期
        param.endInvoiceTime = getLongTime($("#goodsJxp_invoiceTime").val().trim()) + 3600000 * 16;//开票日期
    }
    if($("#goodsJxp_businessType").val().trim() != "全部"){

        param.businessType = $("#goodsJxp_businessType").val().trim() //业务类型

    }

    if($("#goodsJxp_status").val().trim() != "全部"){

        param.status = $("#goodsJxp_status").val().trim();//状态

    }

    param.invoiceAttribute = invoiceAttribute; //票据属性

    return param;
}

function getCancelInvoiceId(invoiceId) {

    cancelInvoiceId = invoiceId;

    $("#qxspModal").modal("show");

}

function cancelInvoice() {

    var reason = $("#reason").val();

    if(reason.length <= 0){

        alert("请填写取消收票原因！")

    }else{

        $.ajax({
            url:'/zall/chain/purchase/inInvoice/cancelInvoice',
            type:'POST',
            data:{invoiceId : cancelInvoiceId, reason : reason},
            dataType: 'json',
            success: function (data) {
                
                if(data.status == 400){
                    alert('取消失败!');
                    return;
                }

                $("#reason").val("");

                $("#reason").text("");

                $("#qxspModal").modal("hide");

                alert('取消成功!');

                loadTable();
            },
            error:function(result){
                alert("发生错误！取消失败！");
            }
        });

    }
}

function enterAddGoodsJxpView() {
    window.location.href="/zall/chain/purchase/inInvoice/enterAddGoodsJxpView";
}


$(function () {
    loadTable();
    $(".btn-success").click(function () {
        loadTable();
    })
});
