$(function(){
	//查询分配列表信息
    getAssignList();
})

//查询分配列表 type:合同类型 frameCode:合同编号
function getAssignList(){
    var type=0;
    var frameCode = $("#frameCode").val();

    $.ajax({
        url:'/zall/chain/purchase/assureInAssign/queryList',
        type:'POST',
        data:{
            "url":0,
            "contractType":type,
            "contractCode":frameCode
        },
        success: function(data) {
            $("#assignlist").html("");
            $("#assignlist").append(data);
        }
    });
}

//查询添加转入、转出所需要的参数
function createAssignUI(businessType,availableMoney,receiveTime,contractType,contractCode,assignCode,assingType){
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

    $("#myModalAssignCode").val(assignCode);//分配编号
    $("#myModalTransferTime").html(dateFormat(receiveTime));//收款日期

    $.ajax({
        url:'/zall/chain/purchase/assureInAssign/getOutTransferMoney',
        type:'POST',
        data:{
            "availableMoney":availableMoney, //分配可用金额
            "contractType":contractType,     //合同类型
            "contractCode":contractCode,     //合同编号
            "assingType":assingType,         //费用用途
        },
        success: function(data) {
            $("#myModalAvailableMoney").html(numUtils.floatMoney(data.contractInAssignVO.availableMoney));//可用金额
        }
    });

    //查询结转至合同列表
    myModalContractCode();

}