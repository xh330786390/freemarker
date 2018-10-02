//转入-转出的JS
function settlementZrZcGoAdd(id,settlePurpose) {
	console.log(id);
	var data = {id:id,settlePurpose:settlePurpose}
	$.ajax({
		type : "GET",
		url : '/zall/chain/purchase/contractOutSettleTransfer/goAdd',
		data : data,
		dataType : "HTML",
		success : function(data) {
			$("#settlement_zr_zc_add").empty();
			$("#settlement_zr_zc_add").html(data);
			
			var supplierId = $("#settleSupplierId").val();
			var settlePurpose = $("#settlePurposeNew").val();
			var businessType = $("#businessType").val();
            var contractCode = $("#contractCode").val();
			businessTypeFunGoods(supplierId, settlePurpose, businessType,contractCode);
			
			$("#businessType").change(function() {
				var supplierId = $("#settleSupplierId").val();
				var settlePurpose = $("#settlePurposeNew").val();
				var businessType = $("#businessType").val();
                var contractCode = $("#contractCode").val();
				businessTypeFunGoods(supplierId, settlePurpose, businessType,contractCode);
			});
			
		}
	});
}

function businessTypeFunGoods(supplierId, payPurpose, businessType,contractCode) {
	var parameter = {
		companyId : supplierId,
		payPurpose : payPurpose,
		businessType : businessType,
        contractCode : contractCode
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

