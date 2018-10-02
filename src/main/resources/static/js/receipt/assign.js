$(function(){
    //查询分配列表信息
    getAssignList();

    //收款明细tab
    //业务类型文本改变事件
    $("#zcModalBusinessType").change(function(){
    	modalContractCode();
    })
    //合同文本改变事件
    $("#zcModalTargetContractCode").change(function(){
    	var contractType=$(this).val();
    	if(contractType==0){//框架协议合同，只展示“保证金”
    		$("#zcModalSettlePurpose option[value!='2']").hide();
    	}else{
    		$("#zcModalSettlePurpose option").show();
    	}
    })

})

//查询分配列表 type:合同类型 frameCode:合同编号
function getAssignList(){
    var contractType=$("#contractType").val();//合同类型
    var sellContractCode = $("#sellContractCode").text().trim();//合同编号
    var param = {
        "url":1,
        "contractType":contractType,
        "contractCode":sellContractCode
    };

    //收款状态
    var receiveStatus=$("#receiveStatus").val();
    if(receiveStatus != null && receiveStatus != ''){
        param.receiveStatus = receiveStatus;
    }
    //分配编号
    var assignCode=$("#assignCode").val();
    if(assignCode != null && assignCode != ''){
        param.assignCode = assignCode;
    }
    //收款类型
    var assingType=$("#assingType").val();
    if(assingType != null && assingType != ''){
        param.assingType = assingType;
    }
    //收款方式
    var receivePattern=$("#receivePattern").val();
    if(receivePattern != null && receivePattern != ''){
        param.receivePattern = receivePattern;
    }

    $.ajax({
        url:'/zall/chain/purchase/assureInAssign/queryList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#assignList").html("");
            $("#assignList").append(data);
        }
    });
}

//查询添加转入、转出所需要的参数
function assignOutTransferUI(businessType,availableMoney,contractType,contractCode,assignCode,assingType){
	//默认选中业务类型
	$("#zcModalBusinessType option[value!='"+businessType+"']").attr("selected","selected");

    $("#zcModalAvailableMoney").text("");//有效金额
    $("#zcModalTransferMoney").val("");//申请金额
    $("#zcModalRemark").val("");//备注
    $("#zcModalAssignCode").val("");//分配编号

    $("#pzcModalTargetContractCode").hide();
    $("#pzcModalSettlePurpose").hide();
    $("#pzcModalTransferMoney").hide();

    $("#zcModalAssignCode").val(assignCode);//分配编号
    $.ajax({
        url:'/zall/chain/purchase/assureInAssign/getOutTransferMoney',
        type:'POST',
        data:{
            "availableMoney":availableMoney, //有效金额
            "contractType":contractType,     //合同类型
            "contractCode":contractCode,     //合同编号
            "assingType":assingType,         //费用用途
        },
        success: function(data) {
            $("#zcModalAvailableMoney").html(numUtils.floatMoney(data.contractInAssignVO.availableMoney));//可用金额
        }
    });

    //查询结转至合同列表
    modalContractCode();
}

//查询结转至合同列表
function modalContractCode(){
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
    var businessType = $("#zcModalBusinessType").val();
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
                        option += "<option value='"+this.contractType+"'>"+this.contractCode+"</option>"
                    }
                })
            }
            $("#zcModalTargetContractCode").html("");
            $("#zcModalTargetContractCode").html(option);
        }
    });
}

//转出提交事件
function createTransfer(){
    //参数校验
    var sub = checkMyModalCreate();
    if(!sub){
        return;
    }

    /**获取参数**/
    var id = $("#createId").val();//源合同Id
    var contractType = $("#contractType").val();//源合同类型
    var targetContractType = $("#zcModalTargetContractCode").val();//目标合同类型
    var targetContractCode = $("#zcModalTargetContractCode :selected").text();//目标合同编号
    var payPurpose = $("#zcModalSettlePurpose").val();//结转类型
    var transferMoney = numUtils.longMoney($("#zcModalTransferMoney").val());//结转金额
    var remark = $("#zcModalRemark").val();//备注
    var assignCode = $("#zcModalAssignCode").val();//分配编号


    $.ajax({
        url:'/zall/chain/purchase/contract/getContractById',
        type:'POST',
        data:{"id":id},
        success: function(json) {
            var param={
                "sourceContractCode":json.contractVO.sellContractCode,//源合同编号
                "businessType":json.contractVO.businessType,//业务类型
                "customerId":json.contractVO.customerId,//客户公司Id
                "customerName":json.contractVO.customerName,//客户公司名称
                "supplierId":json.contractVO.supplierId,//供应商Id
                "supplierName":json.contractVO.supplierName,//供应商名称
                "sourceContractType":contractType,//源合同类型
                "assignCode":assignCode,//分配编号
                "targetContractType":targetContractType,//目标合同类型
                "targetContractCode":targetContractCode,//目标合同编号
                "settlePurpose":payPurpose,//结转类型
                "transferMoney":transferMoney,//结转金额
                "remark":remark,//备注
            }
            $.ajax({
                url:'/zall/chain/purchase/assureInTransfer/create',
                type:'POST',
                data:param,
                success: function() {
                    queryTransfer();
                    getAssignList();
                    $("#zcModal").modal("hide");
                }
            });
        }
    });
}

//添加参数校验
function checkMyModalCreate(){
    var sub=true;
    //目标合同类型
    var targetContractType = $("#zcModalTargetContractCode").val();
    if(targetContractType != null && targetContractType != ''){
        $("#pzcModalTargetContractCode").hide();
    }else{
        $("#pzcModalTargetContractCode").show();
        sub=false;
    }

    //结转类型
    var payPurpose = $("#zcModalSettlePurpose").val();
    if(payPurpose != null && payPurpose != ''){
        $("#pzcModalSettlePurpose").hide();
    }else{
        $("#pzcModalSettlePurpose").show();
        sub=false;
    }

    //结转金额
    var transferMoney = $("#zcModalTransferMoney").val();
    $("#pzcModalTransferMoney").hide();
    if(transferMoney != null && transferMoney > 0 && transferMoney != ''){
        //可结转金额，判断转出金额是否大于可结转金额
        var money = $("#zcModalAvailableMoney").text();
        if(parseFloat(money)<parseFloat(transferMoney)){
            $("#pzcModalTransferMoney").show();
            sub=false;
        }
    }else{
        $("#pzcModalTransferMoney").show();
        sub=false;
    }

    return sub;
}