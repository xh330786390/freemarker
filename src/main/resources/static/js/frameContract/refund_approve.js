$(function(){
    queryApprove();
})

//查询审核的框架协议合同列表
function queryApprove(){
    //获取参数
    var param = getParam() ;
    $.ajax({
        url:'/zall/chain/purchase/contractOutPay/queryApprove',
        type:'POST',
        data:param,
        success: function(result) {
            $("#tablelist").html(result);
        }
    });
}

//获取参数
function getParam(){
    var paramJson = {
        pageNum:1,
        pageSize:10,
    };

    //业务类型
    var businessType=$("#businessType").val().trim();

    if(businessType != null && businessType != ''){
        paramJson.businessType=businessType;
    }else{
        paramJson.businessType=null;
    }

    //销售合同编号
    var contractCode=$("#contractCode").val().trim();
    if(contractCode != null && contractCode != ''){
        paramJson.contractCode=contractCode;
    }else{
        paramJson.contractCode=null;
    }

    //建立合同人员
    var creator=$("#creator").val().trim();
    if(creator != null && creator != ''){
        paramJson.creator=creator;
    }else{
        paramJson.creator=null;
    }

    //申请时间
    var createTime=$("#createTime").val().trim();
    var arr = createTime.split("/");
    if(createTime != null && createTime != ''){
        var date = new Date(arr[0]+" 00:00:00");
        paramJson.startApplyTime= date.getTime();

        var date = new Date(arr[1]+" 23:59:59");
        paramJson.endApplyTime=date.getTime();
    }else{
        paramJson.startApplyTime=null;
        paramJson.endApplyTime=null;
    }

    return paramJson;
}

//审核
function approve(id,applyMoney){
    //参数获取
    var appvore = $("#appvore").val();//2.通过 3.驳回
    var remark = $("#remark").val();

    //参数设置
    var param = {
        "id":id,
        "auditStatus":appvore,
        "applyMoney":applyMoney,
        "remark":remark
    };
    //提交
    $.ajax({
        url:"/zall/chain/purchase/contractOutPay/approve",
        type:'POST',
        data:param,
        success: function() {
            window.location.href="/zall/chain/purchase/contractOutPay/queryApproveUI";
        }
    });
}


