function frameContractRefundTransferTip(id,collectPayType,dataType,validMoney) {
    $("#tuikModal_transfer_okMoney").text(numUtils.floatMoney(validMoney));
    $.ajax({
        url:'/zall/chain/purchase/contractOutRefund/querySellCode',
        data:{id:id,collectPayType:collectPayType,dataType:dataType},
        type:'get',
        success:function (data) {
            var refundType = '';
            console.log(data.data.vo.refundType)
            if(data.data.vo.refundType == "7"){
                refundType = '采购供应商退款';
            }else if(data.data.vo.refundType == "8"){
                refundType = '物流供应商退款';
            }else if(data.data.vo.refundType == "9"){
                refundType = '仓储供应商退款';
            }
            $("#tuikModal_refundType").text(refundType);
            $("#tuikModal_supplierName").text(data.data.vo.supplierName);
            $("#tuikModal_supplierName_bck").val(data.data.vo.supplierName);
            $("#tuikModal_sourceContractType").val(data.data.vo.contractType);
            $("#tuikModal_sourceContractCode").val(data.data.vo.contractCode);
            $("#tuikModal_assignCode").val(data.data.vo.assignCode);
            $("#tuikModal_supplierId").val(data.data.vo.supplierId);
            if(data.data.contractCodeAll!=null && data.data.contractCodeAll.length > 0){
                var html='<option>请选择需要转账至的合同号</option>';
                $.each(data.data.contractCodeAll,function (i,code) {
                    html+='<option value="' + code.contractCode + '">' + code.contractCode + '</option>';
                })
                $("#tuikModal_contractCodeAll").html(html)
            }
            transInfoData = data.data;
            $("#tuikModal").modal("show");
        }
    })
}

function frameContractRefundTransferCheck() {
    //设置目标合同类型
    var contractAndContractType = transInfoData.contractType;
    var code = $("#tuikModal_contractCodeAll").val();
    var contractCodeType;
    $.each(contractAndContractType,function (name,value) {
        if(code == name){
            contractCodeType = value;
            $("#tuikModal_targetContractType").val(contractCodeType);
        }
    })
    //判断金额大小
    var okMoney = $("#tuikModal_transfer_okMoney").text();
    var transferMoney = $("#tuikModal_transferMoney").val();
    if(transferMoney == null || transferMoney.length == "" || transferMoney==0){
        alert('结转金额不可为空');
        return;
    }

    if(eval(transferMoney) > eval(okMoney)){
        alert('结转金额必须小于等于可结转金额');
        return;
    }
}

function createFrameRefundTransferVo() {
    frameContractRefundTransferCheck();
    console.info($("#tuikModal_refundTransferOut").serializeArray());
    $.ajax({
        url:'/zall/chain/purchase/assureOutRefundOut/create',
        type:'POST',
        data:$("#tuikModal_refundTransferOut").serializeArray(),
        dataType: 'json',
        success: function (data) {
            if(data.status == 500){
                alert('结转失败!');
                return;
            }
            document.getElementById("tuikModal_refundTransferOut").reset();
            $("#tuikModal").modal("hide");
            var contractCode = $("#frameCode").val();
            ajax(contractCode,null);
            alert('结转成功!');
        },
        error:function(result){
        	console.info(result);
            alert("发生错误添加失败！");
        }
    });
}

function functionRefundStatus(obj){
    var contractCode = $("#frameCode").val();
    var refundStatus = obj.val();
    ajax(contractCode,refundStatus);
}

function ajax(contractCode,refundStatus){
    var data = {contractCode:contractCode,refundStatus:refundStatus};
    $.ajax({
        type:"GET",
        url:'/zall/chain/purchase/assureOutRefund/queryList',
        data:data,
        dataType:"HTML",
        success:function(data){
            $("#baozj-6").empty();
            $("#baozj-6").append(data);
            $("#refundStatus").change(function(){
                functionRefundStatus($(this));
            });
        }
    });
}

$(function(){
	$("#baozj_6").click(function(){
		if($("#baozj-6").html() != ""){
			//return;
		}
		var contractCode = $("#frameCode").val();
		ajax(contractCode,null);
	});
});

