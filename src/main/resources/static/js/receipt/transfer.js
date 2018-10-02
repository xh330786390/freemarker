function queryTransfer(){
    //查询转入集合
    inTransfer();
    //查询转出集合
    outTransfer();
    //查询结转集合
    querySettleTransfer();
}

//查询合同转入列表
function inTransfer(){
    var param={
        "targetContractType":$("#contractType").val(),//合同类型,
        "targetContractCode":$("#sellContractCode").text().trim(),//合同编号
        "url":0,
    }

    //源合同编号
    var inSourceContractCode=$("#inSourceContractCode").val();
    if(inSourceContractCode != null && inSourceContractCode !=''){
        param.sourceContractCode=inSourceContractCode;
    }
    //转入类型
    var inSettlePurpose=$("#inSettlePurpose").val();
    if(inSettlePurpose != null && inSettlePurpose !=''){
        param.settlePurpose=inSettlePurpose;
    }
    //审核状态
    var inAuditStatus=$("#inAuditStatus").val();
    if(inAuditStatus != null && inAuditStatus !=''){
        param.auditStatus=inAuditStatus;
    }

    $.ajax({
        url:'/zall/chain/purchase/assureInTransfer/queryTransferList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#inTransferList").html("");
            $("#inTransferList").append(data);
        }
    });
}

//查询合同转出列表
function outTransfer(){
    var param={
        "sourceContractType":$("#contractType").val(),//合同类型
        "sourceContractCode":$("#sellContractCode").text().trim(),//合同编号
        "url":1,
    }

    //目标合同编号
    var outTargetContractCode=$("#outTargetContractCode").val();
    if(outTargetContractCode != null && outTargetContractCode !=''){
        param.targetContractCode=outTargetContractCode;
    }
    //转入类型
    var outSettlePurpose=$("#outSettlePurpose").val();
    if(outSettlePurpose != null && outSettlePurpose !=''){
        param.settlePurpose=outSettlePurpose;
    }

    $.ajax({
        url:'/zall/chain/purchase/assureInTransfer/queryTransferList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#outTransferList").html("");
            $("#outTransferList").append(data);
        }
    });
}

//查询添加转入、转出所需要的参数
function createTransferUI(businessType,availableMoney,targetContractType,targetContractCode,applyCode,settlePurpose){
	//默认选中业务类型
	$("#zcModalBusinessType option[value!='"+businessType+"']").attr("selected","selected");

    $("#zcModalAvailableMoney").text("");//有效金额
    $("#zcModalTransferMoney").val("");//申请金额
    $("#zcModalRemark").val("");//备注

    $("#pzcModalTargetContractCode").hide();
    $("#pzcModalSettlePurpose").hide();
    $("#pzcModalTransferMoney").hide();

    $("#zcModalAssignCode").val(applyCode);//申请编号
    $.ajax({
        url:'/zall/chain/purchase/assureInAssign/getOutTransferMoney',
        type:'POST',
        data:{
            "availableMoney":availableMoney,   //有效金额
            "contractType":targetContractType, //合同类型
            "contractCode":targetContractCode, //合同编号
            "assingType":settlePurpose         //费用用途
        },
        success: function(data) {
            $("#zcModalAvailableMoney").html(numUtils.floatMoney(data.contractInAssignVO.availableMoney));//可用金额
        }
    });

    //查询结转至合同列表
    modalContractCode();
}