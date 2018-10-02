$(function(){
    //结转明细tab
    //业务类型文本改变事件
    $("#settleModalBusinessType").change(function(){
    	settleModalContractCode();
    })
    //合同文本改变事件
    $("#settleModalTargetContractCode").change(function(){
    	var contractType=$(this).val();
    	if(contractType==0){//框架协议合同，只展示“保证金”
    		$("#settleModalSettlePurpose option[value!='2']").hide();
    	}else{
    		$("#settleModalSettlePurpose option").show();
    	}
    })

})

function querySettleTransfer(){
    //查询转入集合
    inSettleTransfer();
    //查询转出集合
    outSettleTransfer();
}

//--------------- 结算 ----------------
//查询合同结算转入列表
function inSettleTransfer(){
    var param={
        "url":"zr",
        "targetContractType":$("#contractType").val(),//合同类型,
        "targetContractCode":$("#sellContractCode").text().trim()//合同编号
    }

    //源合同编号
    var inSettleSourceContractCode=$("#inSettleSourceContractCode").val();
    if(inSettleSourceContractCode != null && inSettleSourceContractCode !=''){
        param.sourceContractCode=inSettleSourceContractCode;
    }
    //转入类型
    var inSettleSettlePurpose=$("#inSettleSettlePurpose").val();
    if(inSettleSettlePurpose != null && inSettleSettlePurpose !=''){
        param.settlePurpose=inSettleSettlePurpose;
    }
    //审核状态
    var inSettleAuditStatus=$("#inSettleAuditStatus").val();
    if(inSettleAuditStatus != null && inSettleAuditStatus !=''){
        param.auditStatus=inSettleAuditStatus;
    }

    $.ajax({
        url:'/zall/chain/purchase/contractSettleTransfer/queryList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#inSettleTransfer").html("");
            $("#inSettleTransfer").append(data);
        }
    });
}

//查询合同结算转出列表
function outSettleTransfer(){
    var param={
        "url":"zc",
        "sourceContractType":$("#contractType").val(),//合同类型
        "sourceContractCode":$("#sellContractCode").text().trim(),//合同编号
    }

    //转出类型
    var outSettleSettlePurpose=$("#outSettleSettlePurpose").val();
    if(outSettleSettlePurpose != null && outSettleSettlePurpose !=''){
        param.settlePurpose=outSettleSettlePurpose;
    }
    //审核状态
    var outSettleAuditStatus=$("#outSettleAuditStatus").val();
    if(outSettleAuditStatus != null && outSettleAuditStatus !=''){
        param.auditStatus=outSettleAuditStatus;
    }

    $.ajax({
        url:'/zall/chain/purchase/contractSettleTransfer/queryList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#outSettleTransfer").html("");
            $("#outSettleTransfer").append(data);
        }
    });
}

//查询添加转入、转出所需要的参数
function createSettleTransferUI(businessType,availableMoney,applyCode){
	//默认选中业务类型
	$("#settleModalBusinessType option[value!='"+businessType+"']").attr("selected","selected");

    $("#settleModalAvailableMoney").text("");//有效金额
    $("#settleModalTransferMoney").val("");//申请金额
    $("#settleModalAssignCode").val("");//申请编号

    $("#psettleModalTargetContractCode").hide();
    $("#psettleModalSettlePurpose").hide();
    $("#psettleModalTransferMoney").hide();

    $("#settleModalAssignCode").val(applyCode);//申请编号

    $.ajax({
        url:'/zall/chain/purchase/contractSettleTransfer/createUI',
        type:'POST',
        data:{
            "availableMoney":availableMoney,//有效金额
            "targetContractType":$("#contractType").val(),    //合同类型
            "targetContractCode":$("#sellContractCode").text().trim(),    //合同编号
        },
        success: function(data) {
            $("#settleModalAvailableMoney").html(numUtils.floatMoney(data.totalMoney));//可用金额
        }
    });

    //查询结转至合同列表
    settleModalContractCode();
}

//查询结算转至合同列表
function settleModalContractCode(){
    //添加查询参数
    var param = {
        "collectPayType":1,
    }

    //客户公司Id
    var companyId = $("#customerId").val();
    if(companyId != null && companyId != ''){
        param.companyId=companyId;
    }

    //业务类型
    var businessType = $("#settleModalBusinessType").val();
    if(businessType != null && businessType != ''){
        param.businessType=businessType;
    }
    var sellContractCode = $("#sellContractCode").text().trim();
    $.ajax({
        url:'/zall/chain/purchase/common/querySellCode',
        type:'POST',
        data:param,
        success: function(data) {
            var option="<option value=''>请选择需要转账至的合同号</option>";
            if(data.data!=null){
                $.each(data.data,function(){
                    if(sellContractCode !=this.contractCode ){
                        option += "<option value='"+this.contractType+"' data-type='"+this.businessType+"'>"+this.contractCode+" </option>"
                    }
                })
            }
            $("#settleModalTargetContractCode").html("");
            $("#settleModalTargetContractCode").html(option);
        }
    });
}

//结算转出提交事件
function createSettleTransfer(){
    //参数校验
    var sub = checkSettleModalCreate();
    if(!sub){
        return;
    }

    /**获取参数**/
    var id = $("#createId").val();//源合同Id
    var sourceContractType = $("#contractType").val();//源合同类型
    var businessType = $("#settleModalTargetContractCode :selected").attr("data-type");//业务类型
    var targetContractType = $("#settleModalTargetContractCode").val();//目标合同类型
    var targetContractCode = $("#settleModalTargetContractCode :selected").text().trim();//目标合同编号
    var settlePurpose = $("#settleModalSettlePurpose").val();//结转类型
    var transferMoney = $("#settleModalTransferMoney").val();//结转金额
    var sourceApplyCode = $("#settleModalAssignCode").val();//转入来源编号


    $.ajax({
        url:'/zall/chain/purchase/contract/getContractById',
        type:'POST',
        data:{"id":id},
        success: function(json) {
            var param={
                "sourceContractCode":json.contractVO.sellContractCode,//源合同编号
                "customerId":json.contractVO.customerId,//客户公司Id
                "customerName":json.contractVO.customerName,//客户公司名称
                "supplierId":json.contractVO.supplierId,//供应商Id
                "supplierName":json.contractVO.supplierName,//供应商名称
                "sourceContractType":sourceContractType,//源合同类型
                "sourceApplyCode":sourceApplyCode,//转入来源编号
                "businessType":businessType,//业务类型
                "targetContractType":targetContractType,//目标合同类型
                "targetContractCode":targetContractCode,//目标合同编号
                "settlePurpose":settlePurpose,//结转类型
                "transferMoney":numUtils.longMoney(transferMoney),//结转金额
            }
            $.ajax({
                url:'/zall/chain/purchase/contractSettleTransfer/create',
                type:'POST',
                data:param,
                success: function() {
                    querySettleTransfer();
                    $("#settleModal").modal("hide");
                }
            });
        }
    });
}

//添加结算参数校验
function checkSettleModalCreate(){
    var sub=true;
    //目标合同类型
    var targetContractType = $("#settleModalTargetContractCode").val();
    if(targetContractType != null && targetContractType != ''){
        $("#psettleModalTargetContractCode").hide();
    }else{
        $("#psettleModalTargetContractCode").show();
        sub=false;
    }

    //结转类型
    var payPurpose = $("#settleModalSettlePurpose").val();
    if(payPurpose != null && payPurpose != ''){
        $("#psettleModalSettlePurpose").hide();
    }else{
        $("#psettleModalSettlePurpose").show();
        sub=false;
    }

    //结转金额
    var transferMoney = $("#settleModalTransferMoney").val();
    $("#psettleModalTransferMoney").hide();
    if(transferMoney != null && transferMoney > 0 && transferMoney != ''){
        //可结转金额，判断转出金额是否大于可结转金额
        var money = $("#settleModalAvailableMoney").text();
        if(parseFloat(money)<parseFloat(transferMoney)){
            $("#psettleModalTransferMoney").show();
            sub=false;
        }
    }else{
        $("#psettleModalTransferMoney").show();
        sub=false;
    }

    return sub;
}

//----------- 结转 --------------

//查询可结转金额
function jzSettleModal(){
    $("#jzsettleModalAvailableMoney").text("");//可结转金额
    $("#jzsettleModalTransferMoney").val("");//申请金额
    $("#jzsettleModalRemark").val("");//备注
    /*$("#jzsettleModalAssignCode").val("");//分配编号*/

    $("#pjzsettleModalTargetContractCode").hide();
    $("#pjzsettleModalSettlePurpose").hide();
    $("#pjzsettleModalTransferMoney").hide();
    $("#pjzsettleModalTransferTime").hide();

    $.ajax({
        url:'/zall/chain/purchase/assureInRefund/createUI',
        type:'POST',
        data:{
            "contractType":$("#contractType").val(),    //合同类型
            "contractCode":$("#sellContractCode").text().trim(),    //合同编号
        },
        success: function(data) {
            $("#jzsettleModalAvailableMoney").html(numUtils.floatMoney(data.totalMoney));//可用金额
        }
    });

    //查询结转至合同列表
    jzsettleModalContractCode();
}

//查询结转至合同列表
function jzsettleModalContractCode(){
    //添加查询参数
    var param = {
        "collectPayType":1,
    }

    //客户公司Id
    var companyId = $("#customerId").val();
    if(companyId != null && companyId != ''){
        param.companyId=companyId;
    }

    //业务类型
    var businessType = $("#jzsettleModalBusinessType").val();
    if(businessType != null && businessType != ''){
        param.businessType=businessType;
    }
    var sellContractCode = $("#sellContractCode").text().trim();

    $.ajax({
        url:'/zall/chain/purchase/common/querySellCode',
        type:'POST',
        data:param,
        success: function(data) {
            var option="<option value=''>请选择需要转账至的合同号</option>";
            if(data.data!=null){
                $.each(data.data,function(){
                    if(sellContractCode !=this.contractCode ){
                        option += "<option value='"+this.contractType+"' data-type='"+this.businessType+"'>"+this.contractCode+" </option>"
                    }
                })
            }
            $("#jzsettleModalTargetContractCode").html("");
            $("#jzsettleModalTargetContractCode").html(option);
        }
    });
}

//结转按钮提交事件
function createJzsettleTransfer(){
    //参数校验
    var sub = checkJzsettleModalCreate();
    if(!sub){
        return;
    }

    /**获取参数**/
    var id = $("#createId").val();//源合同Id
    var sourceContractType = $("#contractType").val();//源合同类型
    var businessType = $("#jzsettleModalTargetContractCode :selected").attr("data-type");//业务类型
    var targetContractType = $("#jzsettleModalTargetContractCode").val();//目标合同类型
    var targetContractCode = $("#jzsettleModalTargetContractCode :selected").text().trim();//目标合同编号
    var settlePurpose = $("#jzsettleModalSettlePurpose").val();//结转类型
    var transferMoney = numUtils.longMoney($("#jzsettleModalTransferMoney").val());//结转金额
    var remark = $("#jzsettleModalRemark").val();//备注
    var transferTime = getLongTime($("#jzsettleModalTransferTime").val());//结转日期

    $.ajax({
        url:'/zall/chain/purchase/contract/getContractById',
        type:'POST',
        data:{"id":id},
        success: function(json) {
            var param={
                "sourceContractCode":json.contractVO.sellContractCode,//源合同编号
                "customerId":json.contractVO.customerId,//客户公司Id
                "customerName":json.contractVO.customerName,//客户公司名称
                "supplierId":json.contractVO.supplierId,//供应商Id
                "supplierName":json.contractVO.supplierName,//供应商名称
                "sourceContractType":sourceContractType,//源合同类型
                "transferTime":transferTime,//结转时间
                "businessType":businessType,//业务类型
                "targetContractType":targetContractType,//目标合同类型
                "targetContractCode":targetContractCode,//目标合同编号
                "settlePurpose":settlePurpose,//结转类型
                "transferMoney":transferMoney,//结转金额
                "remark":remark//备注
            }
            $.ajax({
                url:'/zall/chain/purchase/contractSettleTransfer/create',
                type:'POST',
                data:param,
                success: function() {
                    querySettleTransfer();
                    $("#jzsettleModal").modal("hide");
                }
            });
        }
    });
}

//添加结转参数校验
function checkJzsettleModalCreate(){
    var sub=true;
    //目标合同类型
    var targetContractType = $("#jzsettleModalTargetContractCode").val();
    if(targetContractType != null && targetContractType != ''){
        $("#pjzsettleModalTargetContractCode").hide();
    }else{
        $("#pjzsettleModalTargetContractCode").show();
        sub=false;
    }

    //结转类型
    var payPurpose = $("#jzsettleModalSettlePurpose").val();
    if(payPurpose != null && payPurpose != ''){
        $("#pjzsettleModalSettlePurpose").hide();
    }else{
        $("#pjzsettleModalSettlePurpose").show();
        sub=false;
    }

    //结转金额
    var transferMoney = $("#jzsettleModalTransferMoney").val();
    $("#pjzsettleModalTransferMoney").hide();
    if(transferMoney != null && transferMoney > 0 && transferMoney != ''){
        //可结转金额，判断转出金额是否大于可结转金额
        var money = $("#jzsettleModalAvailableMoney").text().trim();
        if(parseFloat(money)<parseFloat(transferMoney)){
            $("#pjzsettleModalTransferMoney").show();
            sub=false;
        }
    }else{
        $("#pjzsettleModalTransferMoney").show();
        sub=false;
    }

    //结转类型
    var transferTime = $("#jzsettleModalTransferTime").val();
    if(transferTime != null && transferTime != ''){
        $("#pjzsettleModalTransferTime").hide();
    }else{
        $("#pjzsettleModalTransferTime").show();
        sub=false;
    }

    return sub;
}