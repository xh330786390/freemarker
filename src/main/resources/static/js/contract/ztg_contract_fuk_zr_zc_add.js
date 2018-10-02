/**
 * 合同付款转入-转出
 * @param id
 * @param settlePurpose
 * @returns
 */
function contractFukZrZc(id,settlePurpose) {
	console.log("id："+id+",settlePurpose:"+settlePurpose);
	var data = {id:id,settlePurpose:settlePurpose};
	$.ajax({
		type:"GET",
		url:'/zall/chain/purchase/contractOutTransfer/goAdd',
		data:data,
		dataType:"HTML",
		success:function(data){
			$("#zr_zc_add").empty();
	        $("#zr_zc_add").append(data);
	        businessTypeFunGoodsAdd();
	        $("#businessTypeAdd").change(function() {
				businessTypeFunGoodsAdd();
			});
	        $("#submitTransfer").click(function() {
	        	submitTransfer();
			});
	    }
	});
}



function businessTypeFunGoodsAdd() {
	var supplierId = $("#settleSupplierId").val();
	var payPurpose = $("#settlePurposeNew").val();
	var businessType = $("#businessTypeAdd").val();
    var contractCode = $("#contractCode").val();
	var parameter = {
		companyId : supplierId,
		payPurpose : payPurpose,
		businessType : businessType,
		contractCode:contractCode
	};
	console.log(parameter);
	getContractAdd(parameter);
}

//获取要转至的合同编号
function getContractAdd(parameter) {
	$.ajax({
		type : "GET",
		url : '/zall/chain/purchase/contractOutTransfer/queryByBusinessType',
		data : parameter,
		dataType : "JSON",
		success : function(datas) {
			console.log(datas);
			$("#target_contract_code").empty();
			var contractCode = "<option value=''>请选择结转至合同号</option>";
			$("#target_contract_code").append(contractCode);
			if (datas != null && datas.data.length > 0) {
				for (var i = 0; i < datas.data.length; i++) {
					var data = datas.data[i];
					contractCode = "<option value='" + data.contractType + "/"
							+ data.contractCode + "'>" + data.contractCode
							+ "</option>";
					$("#target_contract_code").append(contractCode);
				}
			}
			$("#target_contract_code").change(function() {
				targetContractCode();
			});
		}
	});
}
var submitTransferProhibitSubmits = true;
function submitTransfer() {
	if(!submitTransferProhibitSubmits){
		parent.layer.alert("请不要重复提交");
        return;
	}
	if ($("#receivUser").val() == null || $("#receivUser").val().length == 0) {
		parent.layer.alert('请选择收款公司!');
		return;
	}
	if ($("#businessTypeAdd").val() == null || $("#businessTypeAdd").val().length == 0) {
		parent.layer.alert('请选择业务类型!');
		return;
	}
	//校验结转类型
	if (!targetContractCode()) {
		return;
	}

	if ($("#settleSupplierId").val() == null
			|| $("#settleSupplierId").val().length == 0) {
		parent.layer.alert('结转公司ID不可为空!');
		return;
	}

	if ($("#settleSupplierName").val() == null
			|| $("#settleSupplierName").val().length == 0) {
		parent.layer.alert('结转公司名称不可为空!');
		return;
	}
	//首先判断金额大小
	var okMoney = $("#okMoneyInput").val();
	var transferMoney = $("#transferMoney").val();
	if (transferMoney == null || transferMoney.length == ""
			|| transferMoney == 0) {
		parent.layer.alert('结转金额不可为空');
		return;
	}
	if (eval(transferMoney) > eval(okMoney)) {
		parent.layer.alert('转出金额必须小于等于可结转金额');
		return;
	}

	transferMoney = transferMoney * 100;
	$("#transferMoney").val(transferMoney);
	var contractCodeAndType = $("#target_contract_code").val();
	var array = contractCodeAndType.split("/");
	var targetContractType = array[0];
	$("#targetContractType").val(targetContractType);
	var contractCode = array[1];
	console.log(contractCode);
	$("#targetContractCodeSettle").val(contractCode);

	var transferTime = $("#transferTime").val();
	if(transferTime != undefined ){
		var currentDateLong = new Date(transferTime.replace(new RegExp("-", "gm"),"/")).getTime() //当前时间转换成long型 
		$("#transferTime").val(currentDateLong);
	}
	console.log($("#contractTransferCreate").serialize());
	submitTransferProhibitSubmits = false;
	$.ajax({
		url : '/zall/chain/purchase/contractOutTransfer/create',
		type : 'POST',
		data : $("#contractTransferCreate").serialize(),
		dataType : 'json',
		success : function(data) {
			console.log(data);
			if(data.status == "200"){
				$("#zr_zc_addModal").modal("hide");
				$(':input','#contractTransferCreate').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
				parent.layer.alert('结转成功!');
			}else{
				parent.layer.alert('结转失败!');
			}
			submitTransferProhibitSubmits = true;
		},
		error : function(result) {
			parent.layer.alert("发生错误添加失败！");
		}
	});
}