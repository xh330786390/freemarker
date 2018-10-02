
function contractInvoceList() {
    var paramJson = getParam();
    $("#contractInvoceTable").pagination({
        url : "/zall/chain/purchase/contractOutPay/contractInvoceList",
        paramJson : paramJson,
        callback:function(){

        }
    });
}

function getParam() {
    var param = {};
    param.pageSize = 10;
    param.pageNum = 1;
    param.contractCode = $("#contractJxp_contractCode").val();//销售合同编号
    param.supplierName = $("#contractJxp_supplierName").val();//客户名称
    param.invoiceCode = $("#contractJxp_invoiceCode").val();//发票代码
    param.invoiceNumber = $("#contractJxp_invoiceNumber").val();//发票号码

    if ($("#contractJxp_invoiceTime").val()) {
    	param.startInvoiceTime = new Date($("#contractJxp_invoiceTime").val().split("/")[0]).getTime();
    	param.endInvoiceTime= new Date($("#contractJxp_invoiceTime").val().split("/")[1]).getTime()+24*60*60*1000-1;
    } else {
    	param.startInvoiceTime = null;
    	param.endInvoiceTime = null;
    }
    param.invoiceAttribute = $("#contractJxp_invoiceAttribute").val(); //票据属性
    param.invoiceType = $("#contractJxp_invoiceType").val();//发票号码
    return param;
}

$(function () {
	$("#searchBtn_contractGooodsList").on("click",contractGoodsList);
	contractGoodsList();
	$("#searchBtn_contractInvoceList").on("click",contractInvoceList);
	contractInvoceList();
});
jeDate("#contractJxp_invoiceTime",{
    theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
    multiPane:false,
    range:"/",
    format: "YYYY-MM-DD"
});


function contractGoodsList() {
    var paramJson = getParamGoods();
    $("#contractGoodsTable").pagination({
        url : "/zall/chain/purchase/contractOutPay/contractGoodsList",
        paramJson : paramJson,
        callback:function(){

        }
    });
}

function getParamGoods() {
    var param = {};
    param.pageSize = 10;
    param.pageNum = 1;
    param.supplierName = $("#contractGoods_supplierName").val();//客户名称
    param.invoiceCode = $("#contractGoods_invoiceCode").val();//发票代码
    param.invoiceNumber = $("#contractGoods_invoiceNumber").val();//发票号码
    if ($("#contractGoods_invoiceTime").val()) {
    	param.startInvoiceTime = new Date($("#contractGoods_invoiceTime").val().split("/")[0]).getTime();
    	param.endInvoiceTime= new Date($("#contractGoods_invoiceTime").val().split("/")[1]).getTime()+24*60*60*1000-1;
    } else {
    	param.startInvoiceTime = null;
    	param.endInvoiceTime = null;
    }
    param.breedName = $("#contractGoods_breedName").val();//品名
    param.specName = $("#contractGoods_specName").val();//规格
    param.materialName = $("#contractGoods_materialName").val();//材质
    return param;
}
jeDate("#contractGoods_invoiceTime",{
    theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
    multiPane:false,
    range:"/",
    format: "YYYY-MM-DD"
});