//查询合同退款给客户的信息列表
function getRefundList(){
    // type:合同类型 frameCode:合同编号
    var type=$("#contractType").val();
    var sellContractCode = $("#sellContractCode").text().trim();

    var param = {
        "url":1,
        "contractType":type,
        "contractCode":sellContractCode
    };

    //审核状态
    var auditStatus = $("#refundAuditStatus").val();
    if(auditStatus != null && auditStatus != ''){
        param.auditStatus=auditStatus;
    }

    $.ajax({
        url:'/zall/chain/purchase/assureInRefund/queryList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#refundList").html("");
            $("#refundList").append(data);
        }
    });
}

//查询合同剩余总金额
function  createTkModal(){
    $("#tkModalAvailableMoney").text("");//可退款金额
    $("#tkModalApplyMoney").val("");//申请金额
    $("#tkModalReceiveBank").val("");//收款银行
    $("#tkModalReceiveAccount").val("");//收款账号
    $("#tkModalRemark").val("");//备注


    $("#ptkModalApplyMoney").hide();
    $("#ptkModalReceiveBank").hide();
    $("#ptkModalReceiveAccount").hide();

    var contractCode = $("#sellContractCode").text().trim();
    var contractType = $("#contractType").val();
    $.ajax({
        url:'/zall/chain/purchase/assureInRefund/createUI',
        type:'POST',
        data:{
            "contractType":contractType,    //合同类型
            "contractCode":contractCode,    //合同编号
        },
        success: function(data) {
            $("#tkModalAvailableMoney").html(numUtils.floatMoney(data.totalMoney));//可用金额
        }
    });
}

//新增参数校验
function checkTkModalCreate(){
    var sub = true;

    //申请金额
    var applyMoney = $("#tkModalApplyMoney").val();
    if(applyMoney == null || applyMoney == ''){
        $("#ptkModalApplyMoney").show();
        sub = false;
    }else{
        //可用金额
        var tkModalAvailableMoney = $("#tkModalAvailableMoney").text().trim();
        if(parseFloat(applyMoney) > parseFloat(tkModalAvailableMoney)){
            $("#ptkModalApplyMoney").show();
            sub = false;
        }else{
            $("#ptkModalApplyMoney").hide();
        }
    }

    //收款银行
    var receiveBank = $("#tkModalReceiveBank").val();
    if(receiveBank == null || receiveBank == ''){
        $("#ptkModalReceiveBank").show();
        sub = false;
    }else{
        $("#ptkModalReceiveBank").hide();
    }

    //收款账号
    var receiveAccount = $("#tkModalReceiveAccount").val();
    if(receiveAccount == null || receiveAccount == ''){
        $("#ptkModalReceiveAccount").show();
        sub = false;
    }else{
        $("#ptkModalReceiveAccount").hide();
    }

    return sub;
}

//新增退款
function createTkModalRefeund(){
alert($("#tkModalBusinessType").val())
    //参数校验
    var sub = checkTkModalCreate();
    if(!sub){
        return;
    }
    var sellContractCode = $("#sellContractCode").text().trim();//合同编号
    var customerId = $("#customerId").val();//客户公司id
    var customerName = $("#tkModalCustomerName").text();//客户公司名称
    var id = $("#createId").val();//合同Id
    var applyMoney = numUtils.longMoney($("#tkModalApplyMoney").val());//申请金额
    var receiveBank = $("#tkModalReceiveBank").val();//收款银行
    var receiveAccount = $("#tkModalReceiveAccount").val();//收款账号
    var payPattern = $("#tkModalPayPattern").val();//付款方式
    var remark = $("#tkModalRemark").val();//备注
    var businessType = $("#tkModalBusinessType").val();//业务类型
    var contractType = $("#tkModalContractType").val();//框架协议合同类型


    var param={
        "businessType":businessType,//业务类型
        "contractType":contractType,//框架协议合同类型
        "contractCode":sellContractCode,//框架协议编号
        "supplierId":customerId,//客户公司id
        "supplierName":customerName,//客户公司名称
        "receiveAccount":receiveAccount,    //收款账号
        "receiveBank":receiveBank,    //收款银行
        "applyMoney":applyMoney,    //申请金额
        "payPurpose":99,//付款类型
        "payPattern":payPattern,    //付款方式
        "remark":remark,    //备注
        "type":1
    }
    $.ajax({
        url:'/zall/chain/purchase/contractOutPay/startApprove',
        type:'POST',
        data:param,
        success: function() {
            window.location.href="/zall/chain/purchase/contract/receipt?contractCode="+sellContractCode;
        }
    });
}