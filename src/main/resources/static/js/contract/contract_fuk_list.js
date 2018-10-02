
function businessTypeChange(){
    var businessVal = $("#ZTG_PAY_businessType").val();
    var contractAndBusinessType = transInfoData.businessType;
    var html = '';
    $.each(contractAndBusinessType,function(name,value) {
        if(value == businessVal){
            html += '<option value="' + name + '">' + name + '</option>';
        }
    });
    $("#contractCodeAll").html(html);
}

function contractPayOutTransferTip(id,collectPayType) {
    $.ajax({
        url:'/zall/chain/purchase/contractOutPay/querySellCode',
        data:{id:id,collectPayType:collectPayType},
        type:'get',
        success:function (data) {
            var payPurpose = '';
            if(data.data.vo.payPurpose == 1){
                payPurpose = '货款';
            }else if(data.data.vo.payPurpose == 2){
                payPurpose = '保证金';
            }else if(data.data.vo.payPurpose == 3){
                payPurpose = '运费';
            }else if(data.data.vo.payPurpose >= 4){
                payPurpose = '仓储费';
            }
            $("#ZTG_PAY_transfer_okMoney").text(numUtils.floatMoney(data.data.okMoney));
            $("#settlePurpose").text(payPurpose);
            $("#ZTG_PAY_settlePurpose").text(payPurpose);
            $("#ZTG_PAY_supplierName").text(data.data.vo.supplierName);
            $("#supplierName_bak").val(data.data.vo.supplierName);
            $("#ZTG_PAY_payApplyCode").val(data.data.vo.applyCode);
            $("#ZTG_PAY_sourceContractType").val(data.data.vo.contractType);
            $("#ZTG_PAY_sourceContractCode").val(data.data.vo.contractCode);
            $("#ZTG_PAY_supplierId").val(data.data.vo.supplierId);
            $("#settlePurpose").val(data.data.vo.payPurpose);
            if(data.data.contractCodeAll!=null && data.data.contractCodeAll.length > 0){
                var html='<option>请选择需要转账至的合同号</option>';
                $.each(data.data.contractCodeAll,function (i,code) {
                    html+='<option value="' + code.contractCode + '">' + code.contractCode + '</option>';
                })
                $("#contractCodeAll").html(html)
            }
            transInfoData = data.data;
            $("#zcModal").modal("show");
        }
    })
}




function contractTransferCheck() {
    //判断合同结转类型是否和合同类型不吻合
    var contractAndContractType = transInfoData.contractType;
    var code = $("#contractCodeAll").val();
    var transferType = $("#transferType").val();
    var contractCodeType;
    $.each(contractAndContractType,function (name,value) {
        if(code == name){
            contractCodeType = value;
            $("#ZTG_PAY_targetContractType").val(contractCodeType);
        }
    })
    //判断金额大小
    var okMoney = $("#ZTG_PAY_transfer_okMoney").val();
    var transferMoney = $("#ZTG_PAY_transferMoney").val();
    if(transferMoney == null || transferMoney.length == "" || transferMoney==0){
        alert('结转金额不可为空');
        return;
    }

    if(eval(transferMoney) > eval(okMoney)){
        alert('结转金额必须小于等于可结转金额');
        return;
    }
}

function createTransferVo() {
    contractTransferCheck();
    console.info($("#ZTG_PAY_transferOut").serializeArray());
    $("#ZTG_PAY_transferMoney").val(numUtils.longMoney($("#ZTG_PAY_transferMoney").val()))
    if($("#ZTG_PAY_businessType").val() == "0"){
    	parent.layer.alert('业务类型不可为空');
    	return;
    }
    $.ajax({
        url:'/zall/chain/purchase/assureOutPay/createTransferVo',
        type:'POST',
        data:$("#ZTG_PAY_transferOut").serializeArray(),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.status == 500){
                alert('结转失败!');
                $("#ZTG_PAY_transferMoney").val(numUtils.floatMoney($("#ZTG_PAY_transferMoney").val()))
                return;
            }
            $("#zcModal").modal("hide");
            alert('结转成功!');
        },
        error:function(result){
            alert("发生错误添加失败！");
            $("#ZTG_PAY_transferMoney").val(numUtils.floatMoney($("#ZTG_PAY_transferMoney").val()))
        }
    });
}


//搜索
function searchPayOut() {
    var payOutVo = {};
    payOutVo.contractCode=contractCode;
    var applyCode = $("#applyCode").val();
    var supplierName = $("#supplierName").val();
    var payPurpose = $("#payPurpose").val();
    var auditStatus = $("#auditStatus").val();
    var createTime = $("#createTime").val();
    var payTime = $("#payTime").val();
    var payStatus = $("#payStatus").val();
    if(applyCode != null && applyCode !=''){
        payOutVo.applyCode = applyCode;
    }
    if(supplierName != null && supplierName !=''){
        payOutVo.supplierName = supplierName;
    }
    if(payPurpose != null && payPurpose !='' && payPurpose !='全部'){
        payOutVo.payPurpose = payPurpose;
    }
    if(auditStatus != null && auditStatus !=''){
        payOutVo.auditStatus = auditStatus;
    }
    if(createTime != null && createTime !=''){
        payOutVo.createTime = createTime;
    }
    if(payTime != null && payTime !=''){
        payOutVo.payTime = payTime;
    }
    if(payStatus != null && payStatus !=''){
        payOutVo.payStatus = payStatus;
    }

    $.ajax({
        type:"GET",
        url:'/zall/chain/purchase/contractOutPay/querySearchOut',
        data:payOutVo,
        dataType:"HTML",
        success:function(data){
            $("#contractOutPayList").empty();
            $("#contractOutPayList").append(data);
            $("#payOutSearch").click(function(){
                searchPayOut();
            });
        }
    });
}


$(function(){
    searchPayOut();
	$("#ztgfk-1").click(function(){
		searchPayOut();
	});


});