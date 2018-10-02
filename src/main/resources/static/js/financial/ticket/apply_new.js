function add(){
	var issuc=true;
	var inInvoicePayItem=[];
	var total=0;
	$("#subBody tr").each(function(i){
		var canApplyAmount=$("#canApplyAmount"+i).text();
		var applyAmount=$("#applyAmount"+i).val();
		if(applyAmount==""){
			$.err("请输入本次申请金额");
			issuc=false;
			return false;
		}
		if(Number(applyAmount)>Number(canApplyAmount)){
			$.err("申请金额不可超出可申请金额");
			issuc=false;
			return false;
		}
		total+=Number(applyAmount);
		var itemId=$("#applyAmount"+i).attr("itemId");
		var obj={
			itemId:itemId,
			applyAmount:applyAmount*100
		}
		inInvoicePayItem.push(obj);
	});
	$("#total").text(total);
	$("#applyMoney").val(total);
	if(!issuc){
		return;
	}
	var supplierName=$("#supplierName").val();
	if(supplierName==""){
		$.err("请输入收款公司");
		return;
	}
	var receiveBank=$("#receiveBank").val();
	if(receiveBank==""){
		$.err("请输入收款银行");
		return;
	}
	var receiveAccount=$("#receiveAccount").val();
	if(receiveAccount==""){
		$.err("请输入收款银行账号");
		return;
	}
	var applyMoney=$("#applyMoney").val();
	if(applyMoney==""){
		$.err("申请金额不合法");
		return;
	}
	var remark=$("#remark").val();
    $.ajax({
        url: "/zall/chain/finance/ticket/add",
        type: "POST",
	        data:{
	        	   "inInvoicePayItem":JSON.stringify(inInvoicePayItem),
	        	   "supplierId":supplierId,
	        	   "supplierName":supplierName,
	        	   "receiveBank":receiveBank,
	        	   "receiveAccount":receiveAccount,
	        	   "applyMoney":applyMoney*100,
	        	   "remark": remark,
	        	   "payPattern":$("#payPattern").val(),
	        	   "supplierId":$("#supplierId").val(),
	        	   "contractCode":$("#contractCode").val(),
	        	   "businessType":$("#businessType").val(),
	        	   "contractType":$("#contractType").val()
        	     },
        success: function (result) {
            if (result.status == 200) {
                $.msg("操作成功");
                setTimeout(function () {
                    window.location.href = "/zall/chain/finance/ticket/applylist"
                }, 500);
            } else {
                $.err(result.msg);
            }
        }
    })
}
function calcAmount(){
	var total=0;
	$("#subBody tr").each(function(i){
		var canApplyAmount=$("#canApplyAmount"+i).text();
		var applyAmount=$("#applyAmount"+i).val();
		if(applyAmount==""){
			$.err("请输入本次申请金额");
			return false;
		}
		if(Number(applyAmount)>Number(canApplyAmount)){
			$.err("申请金额不可超出可申请金额");
			return false;
		}
		total+=Number(applyAmount);
	});
	$("#total").text(total);
	$("#applyMoney").val(total);
}
$('#subBody').on('click','.table-minus-btn',function(){
    var $tr = $(this).parents('tbody').find('tr');
    if ($tr.hasClass("item-class")){
        if($(this).parents('tbody').find('tr').length>2){
        	$("#delBody").html("");
        	$("#delBody").append("<tr>"+$(this).parents('tr').html()+"</tr>");
        	$("#delBody").find("td").eq(10).hide();
        	$("#delBody").find(".btn-default").hide();
        	$("#delBody").find(".btn-primary").show();
            $(this).parents('tr').remove();
        }else{
            parent.layer.msg('只剩下最后一个了，不要再删了嘛');
        }
    }else {
        if($(this).parents('tbody').find('tr').length>1){
        	$("#delBody").html("");
        	$("#delBody").append("<tr>"+$(this).parents('tr').html()+"</tr>");
        	$("#delBody").find("td").eq(10).hide();
        	$("#delBody").find(".btn-default").hide();
        	$("#delBody").find(".btn-primary").show();
            $(this).parents('tr').remove();
        }else{
            parent.layer.msg('只剩下最后一个了，不要再删了嘛');
        }
    }
})
$('#delBody').on('click','.btn-xs',function(){
    var $tr = $(this).parents('tbody').find('tr');
    $("#subBody").append("<tr>"+$(this).parents('tr').html()+"</tr>");
    $(this).parents('tr').remove();
    $("#subBody").find("td").show();
	$("#subBody").find(".btn-default").show();
	$("#subBody").find(".btn-primary").hide();
	if($(this).parents('tbody').find('tr').length==0){
		$('#delBody').html('<tr><td colspan="11" style="text-align:center;">暂无数据</td></tr>');
    }
})