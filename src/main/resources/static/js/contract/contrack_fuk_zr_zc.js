$(function(){
	$("#ztgfk_2").click(function(){
		var contractCode = $("#contractCode").val();
		contractPayIn(contractCode);
		contractPayOut(contractCode);
		settlementIn(contractCode);
		settlementOut(contractCode);
	});
	
	
	
	//付款转入
	function searchOutTransIn() {
		var targetContractCode = $("#contractCode").val();
		var settlePurpose = $("#inSettlePurpose").val();
		var auditStatus = $("#inAuditStatus").val();
		contractPayIn(targetContractCode,auditStatus,settlePurpose);
	}
	
	/**
	 * 合同付款转入
	 */
	function contractPayIn(contractCode,auditStatus,settlePurpose){
		var data = {targetContractCode:contractCode,auditStatus:auditStatus,settlePurpose:settlePurpose};
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/contractOutTransfer/querySearchIn',
			data:data,
			dataType:"HTML",
			success:function(data){
				console.log("合同付款转入-发送请求");
				$("#contractOutTransferIn").empty();
		        $("#contractOutTransferIn").append(data);
		        $("#searchOutTransIn").click(function(){
		        	searchOutTransIn();
		    	});
		    }
		});
	}
	
	//付款转出
	function searchOutTransOut() {
		var contractCode = $("#contractCode").val();
		var settlePurpose = $("#outSettlePurpose").val();
		var auditStatus = $("#outAuditStatus").val();
		contractPayOut(contractCode,auditStatus,settlePurpose);
	}
	
	/**
	 * 合同付款转出
	 */
	function contractPayOut(contractCode,auditStatus,settlePurpose){
		var data = {sourceContractCode:contractCode,auditStatus:auditStatus,settlePurpose:settlePurpose};
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/contractOutTransfer/querySearchOut',
			data:data,
			dataType:"HTML",
			success:function(data){
				console.log("合同付款转出-发送请求");
				$("#contractOutTransferOut").empty();
		        $("#contractOutTransferOut").append(data);
		        $("#searchOutTransOut").click(function(){
		        	searchOutTransOut();
		    	});
		    }
		});
	}
	
	//结算转入
	function searchOutSettleTransferIn() {
		var targetContractCode = $("#contractCode").val();
		var auditStatus = $("#inAuditStatus2").val();
		var settlePurpose = $("#inSettlePurpose2").val();
		settlementIn(targetContractCode,auditStatus,settlePurpose);
	}
	
	//结算转入
	function settlementIn(contractCode,auditStatus,settlePurpose) {
		var data = {targetContractCode:contractCode,auditStatus:auditStatus,settlePurpose:settlePurpose};
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/contractOutSettleTransfer/querySearchIn',
			data:data,
			dataType:"HTML",
			success:function(data){
				console.log("结算转入转出-发送请求");
				$("#contractOutSettleTransferIn").empty();
		        $("#contractOutSettleTransferIn").append(data);
		        $("#searchOutSettleTransferIn").click(function(){
		        	searchOutSettleTransferIn();
		    	});
		        
		    }
		});
	}
	
	//结算转出
	function searchOutSettleTransferOut() {
		var contractCode = $("#contractCode").val();
		var auditStatus = $("#outAuditStatus2").val();
		var settlePurpose = $("#outSettlePurpose2").val();
		settlementOut(contractCode,auditStatus,settlePurpose);
	}
	
	//结算转出
	function settlementOut(contractCode,auditStatus,settlePurpose) {
		var data = {sourceContractCode:contractCode,auditStatus:auditStatus,settlePurpose:settlePurpose};
		console.log(data)
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/contractOutSettleTransfer/querySearchOut',
			data:data,
			dataType:"HTML",
			success:function(data){
				console.log("结算转入转出-发送请求");
				$("#contractOutSettleTransferOut").empty();
		        $("#contractOutSettleTransferOut").append(data);
		        $("#searchOutSettleTransferOut").click(function(){
		        	searchOutSettleTransferOut();
		    	});
		    }
		});
	}
});

function deleteDiv(id){
	console.log(id);
	$(id).parent().parent().modal("hide");
	$(id).empty();
}


document.write("<script type='text/javascript' src='/js/contract/contract_settlement_add.js'></script>");
document.write("<script type='text/javascript' src='/js/contract/contract_settlement_zr_zc.js'></script>");
document.write("<script type='text/javascript' src='/js/contract/ztg_contract_fuk_zr_zc_add.js'></script>");
