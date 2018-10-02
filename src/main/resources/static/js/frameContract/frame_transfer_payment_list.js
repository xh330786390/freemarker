$(function(){
	$("#baozj_5").click(function(){
		if($("#baozj-5").html() != ""){
			//return;
		}
		var contractCode = $("#frameCode").val();

		ajax(contractCode);
	});

	function targetAuditStatusFunction(obj){
		var targetAuditStatus = obj.val();
		console.log(targetAuditStatus);
		var contractCode = $("#frameCode").val();

		ajax(contractCode,targetAuditStatus,null);
	}

	function sourceAuditStatusFunction(obj){
		var sourceAuditStatus = obj.val();
		console.log(sourceAuditStatus);
		var contractCode = $("#frameCode").val();

		ajax(contractCode,null,sourceAuditStatus);
	}

	function ajax(contractCode,targetAuditStatus,sourceAuditStatus){
		var data = {sourceContractCode:contractCode,
					targetContractCode:contractCode,
					targetAuditStatus:targetAuditStatus,
					sourceAuditStatus:sourceAuditStatus};
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/assureOutTransfer/queryOutAndInDetaileds',
			data:data,
			dataType:"HTML",
			success:function(data){
				$("#baozj-5").empty();
		        $("#baozj-5").append(data);
		        $("#targetAuditStatus").change(function(){
		        	targetAuditStatusFunction($(this));
		    	});
		        $("#sourceAuditStatus").change(function(){
		        	sourceAuditStatusFunction($(this));
		    	});
		        $("#frame_baozj_in_add").click(function(){
		    		frameBaoZjInAdd();
		    	});
		    }
		});
	}


	function frameBaoZjInAdd(){
		var data = $("#frame_baozj_in_add").attr("value");
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/assureOutTransfer/goAdd?id='+data,
			dataType:"HTML",
			success:function(data){
				$("#frame_baozj_in_add_div").empty();
		        $("#frame_baozj_in_add_div").append(data);
		        $("#submit").click(function(){
		        	submit();
		    	});
		        $("#businessType").change(function(){
		        	businessTypeFun();
		        });
		        //合同文本改变事件
		        $("#target_contract_code").change(function(){
		    		var contractCodeAndType = $(this).val();
		    		var array = contractCodeAndType.split("/");
		    		var contractType = array[0];
		        	if(contractType==0){//框架协议合同，只展示“保证金”
		        		$("#settle_purpose option[value!='2']").hide();
		        	}else{
		        		$("#settle_purpose option").show();
		        	}
		        })
		    }
		});
	}

	function businessTypeFun(){
		var supplierId = $("#supplierId").val();
		var payPurpose = $("#sourceSettlePurpose").val();
		var businessType = $("#businessType").val();
        var businessType = $("#businessType").val();
        var contractCode = $("#sourceContractCode").val();
		var parameter = {supplierId:supplierId,settlePurpose:payPurpose,businessType:businessType,contractCode:contractCode};
		console.log(parameter);
		$.ajax({
			type:"GET",
			url:'/zall/chain/purchase/assureOutTransfer/queryByBusinessType',
			data:parameter,
			dataType:"JSON",
			success:function(datas){
				console.log(datas);
				$("#target_contract_code").empty();
				var contractCode = "<option value=''>请选择需要转账至的合同号</option>";
				if(datas != null && datas.data.length > 0){
					for(var i = 0 ; i < datas.data.length ; i++){
						var data = datas.data[i];
						console.log(data);
						contractCode += "<option value='"+data.contractType+"/"+data.contractCode+"'>"+data.contractCode+"</option>";
					}
				}
				$("#target_contract_code").append(contractCode);
				$("#target_contract_code").change(function(){
					targetContractCode();
		        });
		    }
		});
	}

	/**
	 * 结转合同事件
	 */
	function targetContractCode(){
		var contractCodeAndType = $("#target_contract_code").val();
		if(contractCodeAndType == null || contractCodeAndType.length == 0 || contractCodeAndType == undefined){
			parent.layer.alert('请选择结转至合同编号');
			return false;
		}
		var settlePurpose = $("#settle_purpose").val();
		var array = contractCodeAndType.split("/");
		var contractCodeType = array[0];
		var contractCode = array[1];
		console.log("转至合同编号:"+contractCode);
		console.log("转至合同类型:"+contractCodeType);
		console.log("选择结转类型:"+settlePurpose);
		//获取源合同类型 以及 源结转类型
		var sourceContractType = $("#sourceContractType").val();
		console.log("源合同类型:"+sourceContractType);
		var sourceSettlePurpose = $("#sourceSettlePurpose").val();
		console.log("源合同结转类型:"+sourceSettlePurpose);
		//源合同类型==框架协议合同(0) 目标合同结转类型  == 2(保证金) 那么  目标合同类型必须是框架协议
		if(sourceContractType == 0 && contractCodeType == 0 && settlePurpose != 2){
			parent.layer.alert('当前合同结转类型只能是保证金');
			return false;
		}
		return true;
	}

	function submit(){
		alert(1)
		//校验结转类型
		if(!targetContractCode()){
			return;
		}
		//首先判断金额大小
		var okMoney = $("#okMoney").val();
		var transferMoney = $("#transferMoney").val();
		if(transferMoney == null || transferMoney.length == "" || transferMoney==0){
			parent.layer.alert('结转金额不可为空');
			return;
		}
		if(eval(transferMoney) > eval(okMoney)){
			parent.layer.alert('结转金额必须小于等于可结转金额');
			return;
		}
		transferMoney = transferMoney*100;
		$("#transferMoney").val(transferMoney);
		var contractCodeAndType = $("#target_contract_code").val();
		var array = contractCodeAndType.split("/");
		var targetContractType = array[0];
		$("#targetContractType").val(targetContractType);
		var contractCode = array[1];
		$("#targetContractCode").val(contractCode);
		console.log($("#frameBzjCreate").serialize());

		$.ajax({
            url:'/zall/chain/purchase/assureOutTransfer/create',
            type:'POST',
            data:$("#frameBzjCreate").serialize(),
            dataType: 'json',
            success: function (data) {
            	console.log(data);
            	if(data.status == 500){
            		parent.layer.alert('结转失败!');
            		return;
            	}
            	parent.layer.msg('结转成功!');
            	$("#frame_baozj_in_add_div").modal("hide");
            	var contractCode = $("#frameCode").val();
            	console.log(contractCode);
        		ajax(contractCode);
            },
            error:function(result){
            	parent.layer.alert("发生错误添加失败！");
            }
        });
	}
});
function check(e) {
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if (e.value != "") {
        if (!re.test(e.value)) {
        	parent.layer.msg("请输入正确的数字");
            e.value = "";
            e.focus();
        }
    }
}
