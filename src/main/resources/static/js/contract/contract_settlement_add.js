$(function() {
    var contractCode = $("#contractCode").val();
    var contractType = $("#contractType").val();
	$("#supplierSettlement").click(function() {
		goFreightOrStorageOrGoodsSupplier(contractCode, 1,"goGoodsSupplierAdd",contractType);
	});
	
	$("#logisticsSettlement").click(function() {
		goFreightOrStorageOrGoodsSupplier(contractCode, 3,"goFreightOrStorageAdd",contractType);
	});
	
	$("#storageSettlement").click(function() {
		goFreightOrStorageOrGoodsSupplier(contractCode, 4,"goFreightOrStorageAdd",contractType);
	});

});



//打开货运商/仓储商/采购商的结算新增页面
function goFreightOrStorageOrGoodsSupplier(contractCode, settlePurpose, url,contractType) {
	var contractId = $("#contractId").val();
	var supplierId = $("#supplierId").val();
	var data = {
		contractId : contractId,
		contractCode : contractCode,
		settlePurpose : settlePurpose,
		supplierId:supplierId,
        contractType:contractType
	};
	$.ajax({
		type : "GET",
		url : '/zall/chain/purchase/contractOutSettleTransfer/' + url,
		data : data,
		dataType : "HTML",
		success : function(data) {
			$("#ztg_contract_settlement_add").empty();
			$("#ztg_contract_settlement_add").html(data);
			$("#receivUser").change(function() {
				receivUser();
			});
			$("#businessType").change(function() {
				if(settlePurpose != 1){
					businessTypeFun();
				}else{
					var businessType = $("#businessType").val();
                    var contractCode = $("#contractCode").val();
					businessTypeFunGoods(supplierId, settlePurpose, businessType,contractCode);
				}
				
			});
			$("#submitSettle").click(function() {
				submitSettle();
			});
		}
	});
}
//物流/仓储
function receivUser() {
	var receivUserData = $("#receivUser").val();
	var array = receivUserData.split("-");
	var supplierId = array[0];
	var okMoney = array[1];
	$("#okMoney").empty();
	$("#okMoney").html(okMoney);
	$("#okMoneyInput").val(okMoney);
	var supplierName = "";
	if (array.length > 2) {
		supplierName = array[2];
		$("#settleSupplierId").val(supplierId);
		$("#settleSupplierName").val(supplierName);
	}

	var businessType = $("#businessType").val();
	if (businessType == null || businessType.length == 0) {
		return;
	}
	var payPurpose = $("#settlePurposeNew").val();
	businessTypeFun(supplierId, payPurpose, businessType);
}

function businessTypeFun(supplierId, payPurpose, businessType) {

	var receivUserData = $("#receivUser").val();
	if (receivUserData == null || receivUserData.length == 0) {
		return;
	}
	
	var parameter = {
		companyId : supplierId,
		payPurpose : payPurpose,
		businessType : businessType
	};
	console.log(parameter);
	getContract(parameter);
}

function businessTypeFunGoods(supplierId, payPurpose, businessType,contractCode) {
	var parameter = {
		companyId : supplierId,
		payPurpose : payPurpose,
		businessType : businessType,
        contractCode:contractCode
	};
	console.log(parameter);
	getContract(parameter);
}

//获取要转至的合同编号
function getContract(parameter) {
	$.ajax({
		type : "GET",
		url : '/zall/chain/purchase/contractOutSettleTransfer/queryByBusinessType',
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
var submitSettleProhibitSubmits = true;
function submitSettle() {
	if(!submitSettleProhibitSubmits){
		parent.layer.alert("请不要重复提交");
        return;
	}
	if ($("#receivUser").val() == null || $("#receivUser").val().length == 0) {
		parent.layer.alert('请选择收款公司!');
		return;
	}
	if ($("#businessType").val() == null || $("#businessType").val().length == 0) {
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
		parent.layer.alert('结转金额必须小于等于可结转金额');
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
	console.log($("#contractSettlementCreate").serialize());
	submitSettleProhibitSubmits = false;
	$.ajax({
		url : '/zall/chain/purchase/contractOutSettleTransfer/create',
		type : 'POST',
		data : $("#contractSettlementCreate").serialize(),
		dataType : 'json',
		success : function(data) {
			console.log(data);
			submitSettleProhibitSubmits = true;
			if (data.status == 500) {
				parent.layer.alert('结转失败!');
				return;
			}
			parent.layer.msg('结转成功!');
			$("#settlement_add").modal("hide");
			$("#settlement_zr_zc").modal("hide");
		},
		error : function(result) {
			parent.layer.alert("发生错误添加失败！");
		}
	});
}

/**
 * 结转合同事件
 */
function targetContractCode() {
	var contractCodeAndType = $("#target_contract_code").val();
	if (contractCodeAndType == null || contractCodeAndType.length == 0
			|| contractCodeAndType == undefined) {
		parent.layer.alert('请选择结转至合同编号');
		return false;
	}
	var settlePurpose = $("#settlePurposeNew").val();
	var array = contractCodeAndType.split("/");
	var contractCodeType = array[0];
	var contractCode = array[1];
	console.log("转至合同编号:" + contractCode);
	console.log("转至合同类型:" + contractCodeType);
	console.log("选择结转类型:" + settlePurpose);
	//获取源合同类型 以及 源结转类型
	var sourceContractType = $("#sourceContractType").val();
	console.log("源合同类型:" + sourceContractType);

	//源合同类型==框架协议合同(0) 目标合同结转类型  == 2(保证金) 那么  目标合同类型必须是框架协议
	if (sourceContractType == 0 && contractCodeType == 0 && settlePurpose != 2) {
		parent.layer.alert('当前合同结转类型只能是保证金');
		return false;
	}
	return true;
}

function checkSettlement(e) {
	var re = /^\d+(?=\.{0,1}\d+$|$)/
	if (e.value != "") {
		if (!re.test(e.value)) {
			parent.layer.msg("请输入正确的数字");
			e.value = "";
			e.focus();
		}
	}
}