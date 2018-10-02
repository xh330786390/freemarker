$(function(){
    queryApprove();
})

//查询审核的框架协议合同列表
function queryApprove(){
    //获取参数
    var param = getParam() ;

    $.ajax({
        url:'/zall/chain/purchase/protocol/queryApprove',
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

    //公司名称
    var customerName=$("#customerName").val().trim();
    if(customerName != null && customerName != ''){
        paramJson.customerName=customerName;
    }else{
        paramJson.customerName=null;
    }

    //销售合同编号
    var frameCode=$("#frameCode").val().trim();
    if(frameCode != null && frameCode != ''){
        paramJson.frameCode=frameCode;
    }else{
        paramJson.frameCode=null;
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
        var startDate = date.getTime();
        paramJson.startDate=startDate;

        var date = new Date(arr[1]+" 23:59:59");
        var endDate = date.getTime();
        paramJson.endDate=endDate;
    }else{
        paramJson.startDate=null;
        paramJson.endDate=null;
    }

    //业务类型
    var businessType=$("#businessType").val().trim();
    if(businessType != null && businessType != ''){
        paramJson.businessType=businessType;
    }else{
        paramJson.businessType=null;
    }

    return paramJson;
}


