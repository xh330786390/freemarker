$(function () {
    modalInit();
    var val = $("#payPurposeType").val();
    if(val == "1" || val == "2"){
		$("#payPurposeTypeEq1").hide();
	}
    /**付款类型change*/
    $("#newfkModal select[name=payPurpose]").change(function () {
        paySelect($(this))
    })

    /**合同附件添加事件*/
    var contract_files=['up_file'];
    uploadFile(contract_files);

    /**付款公司事件*/
    $("#newfkModal select[name=supplierName]").change(function () {
        var purpose = $("#newfkModal select[name=payPurpose]").val();
        if (check_d($(this).val())){
            resetHtml();
            $("#newfkModal input[name=backInvoiceName]").val($("#newfkModal select[name=supplierName] :selected").text());
            /**判断是否为运费**/
            if(purpose == "1" || purpose == "2"){
                getBankData($(this).val(),1);
            }else if (purpose == "3"){
                getBankData($(this).val(),3);
            }else {
                $("#newfkModal input[name=receiveAccount]").val('');
            }
            // if ($("option:selected",this).hasClass("carrier")){
            //     getBankData($(this).val(),3);
            // }else if ($("option:selected",this).hasClass("warehouse")){
            //     $("#newfkModal input[name=receiveAccount]").val('');
            // }else{
            //     getBankData($(this).val(),1)
            // }
        }else {
            resetHtml();
        }
    })
    $("#payPurposeType").change(function () {
    	var val = $(this).val();
    	if(val == "1" || val == "2"){
    		$("#payPurposeTypeEq1").hide();
    	}else{
    		$("#payPurposeTypeEq1").show();
    	}
    })
    
    
    $(".check").change(function () {
        $(this).removeClass("check-error");
    })
    /**新增付款*/
    $("#pay_add").click(function () {
        addPay();
    })
});

function resetHtml() {
    $("#newfkModal input[name=backInvoiceName]").val('');
    $("#newfkModal input[name=receiveBank]").val('');
    $("#newfkModal select[name=receiveBank]").val('');
    $("#newfkModal input[name=receiveAccount]").val('');
    $("#newfkModal select[name=receiveBank]").html('');
}

function modalInit(){
    /**收款公司为当前供应商公司*/
    $("#newfkModal select[name=supplierName]").html('<option value="'+supplier_id+'">'+supplier_name+'</option>');
    $("#file_group").hide();$("#contractUrl").addClass("ignore");/**除了运费附件非必传，加上忽略验证*/
    $("#newfkModal input[name=backInvoiceName]").val(supplier_name);/**开票公司默认供应商公司*/
    getBankData(supplier_id,1);/**加载收款公司下拉*/
    $("#selectReceiveBank").show();/*显示收款公司下拉，隐藏input,并忽略验证*/
    $("#inputReceiveBank").hide().addClass("ignore").removeClass("check-error");
    $(".redTips").hide();/**隐藏提示*/
}

function init() {
    $("#file_group").hide();$("#contractUrl").addClass("ignore");/**除了运费附件非必传，加上忽略验证*/
}

function getBankData(supplierId,type) {
    ajax('/zall/chain/purchase/contractOutPay/queryBank','get',{
        data:{supplierId:supplierId,type:type},
        success:function (data) {
            var html='';
            if(data!=null&&data!=undefined){
                $.each(data.banks,function (i,o) {
                    html+='<option value="'+o.bankName+'" data-account="'+o.bankAccount+'" class="carrier">'+o.bankName+'</option>';
                });
            }
            $("#newfkModal select[name=receiveBank]").html(html);
            $("#newfkModal input[name=receiveAccount]").val($("#newfkModal select[name=receiveBank] :selected").attr('data-account'));
        }
    })
}

/**付款类型下拉*/
function paySelect($_S) {
    var val=$_S.val();
    /***当付款类型修改时初始设置输入框为空,下面依据条件赋值*/
    // $("#newfkModal input[name=receiveBank]").val('')
    // $("#newfkModal select[name=receiveBank]").val('')
    // $("#newfkModal input[name=receiveAccount]").val('')
    $("#newfkModal select[name=receiveBank]").html('');/**设置下拉为空*/
    if(val=='1' || val=='2'){/**为货款保证金时相当于初始化modal*/
        modalInit();
    }else if (val=='3'){//若为运费必须验证
        resetHtml();
        $("#contractUrl").removeClass("ignore");
        $("#file_group").show();
        $("#selectReceiveBank").show().removeClass("ignore");
        $("#inputReceiveBank").hide().addClass("ignore").removeClass("check-error");
        receiveCompany();
    }else if (val=='4'||val=='5'||val=='6'){
        resetHtml();
        $("#contractUrl").addClass("ignore");
        $("#file_group").show();
        receiveCompany();
        $("#selectReceiveBank").hide().addClass("ignore").removeClass("check-error");
        $("#inputReceiveBank").show().removeClass("ignore");
    }
}
/**加载收款公司下拉*/
function receiveCompany() {
    ajax('/zall/chain/purchase/contractOutPay/querySupplier','get',{
        data:null,
        success:function (data) {
            var html='<option value="">请选择收款公司</option>';
            if(data!=null&&data!=undefined){
                $.each(data.supplier.carriers,function (i,o) {
                    html+='<option value="'+o.id+'" class="carrier">'+o.name+'</option>';
                })
                $.each(data.supplier.warehouses,function (i,o) {
                    html+='<option value="'+o.id+'" class="warehouse">'+o.name+'</option>';
                })
            }
            $("#newfkModal select[name=supplierName]").html(html);
            $("#newfkModal input[name=backInvoiceName]").val('')
        }
    })
}
var payProhibitSubmits = true;
function addPay() {
	if(!payProhibitSubmits){
		parent.layer.alert("请不要重复提交");
        return;
	}
	
    if (validateForm("#newfkModal")){
        if (settleType==2){
            var purpose = $("#newfkModal select[name=payPurpose]").val();
            var payMoney = numUtils.longMoney($("#newfkModal input[name=payMoney]").val());
            console.log(payMoney+"----"+lastPurchase)
            if(purpose == "1" || purpose == "2"){
                if(lastPurchase < payMoney){ /**转 int **/
                parent.layer.msg('付货款金额不可高于采购供应商结余金额');
                    return;
                }
            }else if (purpose == "3"){
                if(lastLogistics < payMoney){ /**转 int **/
                parent.layer.msg('付运费金额不可高于物流供应商结余金额');
                    return;
                }
            }else {
                if(lastStorage < payMoney){ /**转 int **/
                parent.layer.msg('付货款金额不可高于仓储供应商结余金额');
                    return;
                }
            }
        }
        var json={};
        json.businessType=businessType;
        json.contractType=contractType;
        json.contractCode=contractCode;
        json.payPurpose=$("#newfkModal select[name=payPurpose]").val();
        json.supplierName=$("#newfkModal select[name=supplierName] :selected").text();
        json.supplierId=$("#newfkModal select[name=supplierName]").val();
        $("#newfkModal [name=receiveBank]").each(function () {
            if(!$(this).hasClass("ignore")){
                json.receiveBank=$(this).val();
            }
        })
        json.receiveAccount=$("#newfkModal input[name=receiveAccount]").val();
        json.applyMoney=numUtils.longMoney($("#newfkModal input[name=payMoney]").val());
        json.backInvoiceId=$("#newfkModal select[name=supplierName]").val();
        json.backInvoiceName=$("#newfkModal select[name=supplierName] :selected").text();
        json.payPattern=$("#newfkModal select[name=payPattern]").val();
        json.contractUrl=$("#newfkModal input[name=contractUrl]").val();
        json.payWeightNum=$("#newfkModal input[name=payWeightNum]").val();
        json.payUnitPrice=$("#newfkModal input[name=payUnitPrice]").val();
        json.remark=$("#newfkModal textarea[name=remark]").val();
        payProhibitSubmits = false;
        ajax('/zall/chain/purchase/contractOutPay/create','post',{
            data:json,
            success:function (result) {
                if (result.status == '200'){
                	$("#newfkModal").modal("hide");
                    DialogRe("新增成功");
                    $("#newfkModal input[name=contractUrl]").val('');
                    $("#newfkModal input[name=receiveBank]").val('');
                    $("#newfkModal input[name=payMoney]").val('')
                }else {
                    Dialog("新增失败")
                }
                payProhibitSubmits = true;
            }
        })
    }
}