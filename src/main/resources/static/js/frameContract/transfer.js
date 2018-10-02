$(function(){
    //业务类型文本改变事件
    $("#myModalBusinessType").change(function(){
        myModalContractCode();
    })
    //合同文本改变事件
    $("#myModalContractCode").change(function(){
    	var contractType=$(this).val();
    	if(contractType==0){//框架协议合同，只展示“保证金”
    		$("#myModalPayPurpose option[value!='2']").hide();
    	}else{
    		$("#myModalPayPurpose option").show();
    	}
    })

    //付款弹框
    //业务类型文本改变事件
    $("#FK_select_business").change(function(){
    	businessTypeChange();
    })
    //合同文本改变事件
    $("#contractCodeAll").change(function(){
    	var contractType=$(this).val();
    	if(contractType==0){//框架协议合同，只展示“保证金”
    		$("#transferType option[value!='2']").hide();
    	}else{
    		$("#transferType option").show();
    	}
    })
})

//查询转入转出列表
function getTransferList(){
    //查询转出
    getInTransferList();
    //查询转入
    getOutTransferList();
}

//查询转入信息
function getInTransferList(){

    var type = 0;//合同类型
    var frameCode=$("#frameCode").val();//合同编号

    var param={
        "url":0,
        "targetContractType":type,
        "targetContractCode":frameCode
    }

    //转入条件
    var inState=$("#inState").val();
    if(inState != null && inState !=''){
        param.inState=inState;
    }
    $.ajax({
        url:'/zall/chain/purchase/assureInTransfer/queryList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#inTransferlist").html("");
            $("#inTransferlist").append(data);
        }
    });
}

//查询转出信息
function getOutTransferList(){

    var type = 0;//合同类型
    var frameCode=$("#frameCode").val();//合同编号

    var param={
        "url":1,
        "sourceContractType":type,
        "sourceContractCode":frameCode,
    }

    //转出条件
    var outState=$("#outState").val();
    if(outState != null && outState !=''){
        param.outState=outState;
    }

    $.ajax({
        url:'/zall/chain/purchase/assureInTransfer/queryList',
        type:'POST',
        data:param,
        success: function(data) {
            $("#outTransferlist").html("");
            $("#outTransferlist").append(data);
        }
    });
}


//查询添加转入、转出所需要的参数
function createUI(businessType,availableMoney,transferTime,targetContractType,targetContractCode,applyCode,settlePurpose){
	//默认选中业务类型
	$("#myModalBusinessType option[value!='"+businessType+"']").attr("selected","selected");

    $("#myModalAvailableMoney").html("");//可用金额
    $("#myModalTransferTime").html("");//收款时间
    $("#myModalContractCode").html("");//合同编号
    $("#myModalTransferMoney").val("");//结转金额
    $("#myModalRemark").val("");//备注
    $("#myModalAssignCode").val("");//申请编号

    $("#pContractCode").hide();
    $("#pPayPurpose").hide();
    $("#pPayPurpose1").hide();
    $("#pTransferMoney").hide();

    $("#myModalAssignCode").val(applyCode);//申请编号
    $("#myModalTransferTime").html(dateFormat(transferTime));//收款日期
    $.ajax({
        url:'/zall/chain/purchase/assureInAssign/getOutTransferMoney',
        type:'POST',
        data:{
            "availableMoney":availableMoney,    //转入金额
            "contractType":targetContractType, //合同类型
            "contractCode":targetContractCode, //合同编号
            "assingType":settlePurpose,        //费用用途
        },
        success: function(data) {
            $("#myModalAvailableMoney").html(numUtils.floatMoney(data.contractInAssignVO.availableMoney));//可用金额
        }
    });

    //查询结转至合同列表
    myModalContractCode();

}

//查询结转至合同列表
function myModalContractCode(){
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
    var businessType = $("#myModalBusinessType").val();
    if(businessType != null && businessType != ''){
        param.businessType=businessType;
    }
    var frameCode = $("#frameCode").val();
    $.ajax({
        url:'/zall/chain/purchase/common/querySellCode',
        type:'POST',
        data:param,
        success: function(data) {
            var option="<option value=''>请选择需要转账至的合同号</option>";
            if(data.data!=null){
                $.each(data.data,function(){
                    if(frameCode !=this.contractCode){
                        option += "<option value='"+this.contractType+"'>"+this.contractCode+"</option>"
                    }
                })
            }
            $("#myModalContractCode").html("");
            $("#myModalContractCode").html(option);
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
    var id = $("#frameId").val();//源合同Id
    var targetContractType = $("#myModalContractCode").val();//目标合同类型
    var targetContractCode = $("#myModalContractCode :selected").text();//目标合同编号
    var payPurpose = $("#myModalPayPurpose").val();//结转类型
    var transferMoney = numUtils.longMoney($("#myModalTransferMoney").val());//结转金额
    var remark = $("#myModalRemark").val();//备注
    var assignCode = $("#myModalAssignCode").val();//分配编号


    $.ajax({
        url:'/zall/chain/purchase/protocol/getJSONById',
        type:'POST',
        data:{"id":id},
        success: function(json) {
            var param={
                "sourceContractType":0,
                "sourceContractCode":json.frameProtocolVO.frameCode,//源合同编号
                "businessType":json.frameProtocolVO.businessType,//业务类型
                "assignCode":assignCode,//分配编号
                "targetContractType":targetContractType,//目标合同类型
                "targetContractCode":targetContractCode,//目标合同编号
                "customerId":json.frameProtocolVO.customerId,//客户公司Id
                "customerName":json.frameProtocolVO.customerName,//客户公司名称
                "supplierId":json.frameProtocolVO.supplierId,//供应商Id
                "supplierName":json.frameProtocolVO.supplierName,//供应商名称
                "settlePurpose":payPurpose,//结转类型
                "transferMoney":transferMoney,//结转金额
                "remark":remark,//备注
            }
            $.ajax({
                url:'/zall/chain/purchase/assureInTransfer/create',
                type:'POST',
                data:param,
                success: function() {
                    getAssignList();
                    getTransferList();
                    $("#myModal").modal("hide");
                }
            });
        }
    });
}

//添加参数校验
function checkMyModalCreate(){
    var sub=true;
    //目标合同类型
    var targetContractType = $("#myModalContractCode").val();
    if(targetContractType != null && targetContractType != ''){
        $("#pContractCode").hide();
    }else{
        $("#pContractCode").show();
        sub=false;
    }

    //结转类型
    var payPurpose = $("#myModalPayPurpose").val();
    if(payPurpose != null && payPurpose != ''){
        $("#pPayPurpose").hide();
    }else{
        $("#pPayPurpose").show();
        sub=false;
    }

    //结转金额
    var transferMoney = $("#myModalTransferMoney").val();
    $("#pTransferMoney").hide();
    if(transferMoney != null && transferMoney > 0 && transferMoney != ''){
        //可结转金额，判断转出金额是否大于可结转金额
        var money = $("#myModalAvailableMoney").text();
        if(parseFloat(money)<parseFloat(transferMoney)){
            $("#pTransferMoney").show();
            sub=false;
        }
    }else{
        $("#pTransferMoney").show();
        sub=false;
    }

    //判断结转类型与合同是否匹配 框架协议合同 --> 只能选择“保证金”；框架协议合同、普通合同 --> 所有都可以选择
    $("#pPayPurpose1").hide();
    if(targetContractType == 0){
        if(payPurpose != 2){
            $("#pPayPurpose1").show();
            sub=false;
        }
    }

    return sub;
}
