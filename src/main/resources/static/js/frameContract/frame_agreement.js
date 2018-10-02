//分页传参
function getParam(){
	var paramJson = {
			pageNum:1,
			pageSize:10,
	};
	//销售合同编号
	var frameCode=$("#frameCode").val().trim();
	if(frameCode != null && frameCode != ''){
		paramJson.frameCode=frameCode;
	}else{
		paramJson.frameCode=null;
	}
	//采购合同编号
	var purchaseCode=$("#purchaseCode").val().trim();
	if(purchaseCode != null && purchaseCode != ''){
		paramJson.purchaseCode=purchaseCode;
	}else{
		paramJson.purchaseCode=null;
	}
	//客户名称
	var customerName=$("#customerName").val().trim();
	if(customerName != null && customerName != ''){
		paramJson.customerName=customerName;
	}else{
		paramJson.customerName=null;
	}
	//建立合同人员
	var creator=$("#creator").val().trim();
	if(creator != null && creator != ''){
		paramJson.creator=creator;
	}else{
		paramJson.creator=null;
	}
	//合同状态
	var contractStatus=$("#contractStatus").val().trim();
	if(contractStatus != null && contractStatus != ''){
		paramJson.contractStatus=contractStatus;
	}else{
		paramJson.contractStatus=null;
	}
	//申请状态
	var auditStatus=$("#auditStatus").val().trim();
	if(auditStatus != null && auditStatus != ''){
		if(auditStatus == 4){
            paramJson.auditStatus=0;
            paramJson.status=0;//提交状态
		}else if(auditStatus == 0){
            paramJson.auditStatus=auditStatus;
            paramJson.status=4;
		}else{
            paramJson.auditStatus=auditStatus;
            paramJson.status=null;
		}
	}else{
		paramJson.auditStatus=null;
        paramJson.status=null;//提交状态
	}
	//业务类型
	var businessType=$("#businessType").val().trim();
	if(businessType != null && businessType != ''){
		paramJson.businessType=businessType;
	}else{
		paramJson.businessType=null;
	}
	//供应商
	var supplierName=$("#supplierName").val().trim();
	if(supplierName != null && supplierName != ''){
		paramJson.supplierName=supplierName;
	}else{
		paramJson.supplierName=null;
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
	
	
	return paramJson;
}
function loadTable(){
	var paramJson = getParam();
	$("#tablelist").pagination({
		url : "/zall/chain/purchase/protocol/queryByPage",
		paramJson : paramJson,
		callback:function(){

		}
	});

}
$(function(){
	loadTable();
});

function del(code){
    MyDialog('确认删除',{success:function(){window.location.href='/zall/chain/purchase/protocol/delete?frameCode='+code;parent.layer.closeAll();}});
}