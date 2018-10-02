function create(){
	var issuc=true;
	var inInvoiceItems=[];
	var total1=0,total2=0,total3=0;
	$("#subBody tr").each(function(i){
		var invoiceTime=$("#invoiceTime"+i).val();
		if(invoiceTime==""){
			$.err("请选择开票日期");
			issuc=false;
			return false;
		}
		var invoiceCode=$("#invoiceCode"+i).val();
		if(invoiceCode==""){
			$.err("请输入发票代码"); 
			issuc=false;
			return false;
		}
		var invoiceNumber=$("#invoiceNumber"+i).val();
		if(invoiceNumber==""){
			$.err("请输入发票号码");
			issuc=false;
			return false;
		}
		var invoiceContent=$("#invoiceContent"+i).val();
		if(invoiceContent==""){
			$.err("请选择票据内容");
			issuc=false;
			return false;
		}
		var invoiceAmount=$("#invoiceAmount"+i).val();
		if(invoiceAmount==""){
			$.err("请输入不含税金额");
			issuc=false;
			return false;
		}
		var taxRate=$("#taxRate"+i).val();
		var invoiceTax=invoiceAmount*taxRate;
		$("#invoiceTax"+i).val(invoiceTax);

		var invoiceTaxAmount=Number(invoiceAmount)+Number(invoiceTax);
		$("#invoiceTaxAmount"+i).text(invoiceTaxAmount);

		var stampTax=$("#stampTax"+i).val();
		var stampTaxAmount=Number(invoiceTaxAmount)+Number(stampTax);
		$("#invoiceTaxAmount"+i).text(stampTaxAmount);

		total1+=Number(invoiceTaxAmount);
		total2+=Number(stampTax);
		total3+=Number(stampTaxAmount);

		var obj={
			"contractCode":$("#contractCode"+i).val(),
			"supplierName":$("#supplierName"+i).val(),
			"supplierCode":$("#supplierCode"+i).val(),
			"carrierId":$("#carrierId"+i).val(),
			"shipId":$("#shipId"+i).val(),
			"supplierId":$("#supplierId"+i).val(),
			"invoiceCode":invoiceCode,
			"invoiceTime":invoiceTime,
			"invoiceNumber":invoiceNumber,
			"invoiceContent":invoiceContent,
			"invoiceAmount":invoiceAmount*100,
			"taxRate":taxRate*100,
			"invoiceTax":invoiceTax*100,
			"invoiceTaxAmount":invoiceTaxAmount*100,
			"stampTax":stampTax*100,
			"stampTaxAmount":stampTaxAmount*100
		};
		inInvoiceItems.push(obj);
	});
	$("#total1").text(total1);
	$("#total2").text(total2);
	$("#total3").text(total3);
	if(!issuc){
		return;
	}
    $.ajax({
        url: "/zall/chain/finance/ticket/create",
        type: "POST",
        data: {"inInvoiceItems":JSON.stringify(inInvoiceItems)},
        success: function (result) {
            if (result.status == 200) {
                $.msg("操作成功");
                setTimeout(function () {
                    window.location.href = "/zall/chain/finance/ticket/list"
                }, 500);
            } else {
                $.err(result.msg);
            }
        }
    })
}
function calcAmount(index,i){
	var total1=0,total2=0,total3=0;
	var invoiceAmount=$("#invoiceAmount"+i).val();
	if(invoiceAmount==""){
		$.err("请输入不含税金额");
		return;
	}
	var taxRate=$("#taxRate"+i).val();
	var invoiceTax=invoiceAmount*taxRate;
	$("#invoiceTax"+i).val(invoiceTax);

	var invoiceTaxAmount=Number(invoiceAmount)+Number(invoiceTax);
	$("#invoiceTaxAmount"+i).text(invoiceTaxAmount);

	var stampTax=$("#stampTax"+i).val();
	var stampTaxAmount=Number(invoiceTaxAmount)+Number(stampTax);
	$("#invoiceTaxAmount"+i).text(stampTaxAmount);
	if(index==0){
		total1=0;total2=0;total3=0;
		$("#subBody tr").each(function(j){
			var invoiceAmount_j=$("#invoiceAmount"+j).val();
			if(invoiceAmount_j==""){
				$.err("请输入不含税金额");
				return;
			}
			var taxRate_j=$("#taxRate"+j).val();
			var invoiceTax_j=invoiceAmount_j*taxRate_j;
			$("#invoiceTax"+j).val(invoiceTax_j);

			var invoiceTaxAmount_j=Number(invoiceAmount_j)+Number(invoiceTax_j);
			$("#invoiceTaxAmount"+j).text(invoiceTaxAmount_j);

			var stampTax_j=$("#stampTax"+j).val();
			var stampTaxAmount_j=Number(invoiceTaxAmount_j)+Number(stampTax_j);
			$("#invoiceTaxAmount"+j).text(stampTaxAmount_j);
			total1+=Number(invoiceTaxAmount_j);
			total2+=Number(stampTax_j);
			total3+=Number(stampTaxAmount_j);
		});
	}
	$("#total1").text(total1);
	$("#total2").text(total2);
	$("#total3").text(total3);
}
$(function(){
});
