//搜索
function searchPayRefund() {
    var data = {};
    var refundStatus = $("#refundStatus").val();
    if(refundStatus != null && refundStatus != '' && refundStatus != '全部'){
        data.refundStatus = refundStatus;
    }
    data.contractCode = contractCode;
    console.log(contractCode)
    $.ajax({
        type:"GET",
        url:'/zall/chain/purchase/contractOutRefund/queryList',
        dataType:"HTML",
        data:data,
        success:function(data){
            console.info(data);
            $("#ztg_contract_refund").empty();
            $("#ztg_contract_refund").append(data);
            $("#refundCheck").click(function(){
                searchPayRefund();
            });
        }
    });
}


function contractRefundTransferTip(id,collectPayType,datatype,validMoney) {
    console.log($("#supplierId").val())
    console.log($("#contractCode").val())
    $("#tkModal_transfer_okMoney").text(numUtils.floatMoney(validMoney));
    $.ajax({
        url:'/zall/chain/purchase/contractOutRefund/querySellCode',
        data:{id:id,collectPayType:collectPayType,dataType:datatype,supplierId:$("#supplierId").val(),contractCode:$("#contractCode").val()},
        type:'get',
        success:function (data) {
            var refundType = '';
            if(data.data.vo.refundType == 7){
                refundType = '采购供应商退款';
            }else if(data.data.vo.refundType == 8){
                refundType = '物流供应商退款';
            }else if(data.data.vo.refundType == 9){
                refundType = '仓储供应商退款';
            }
            $("#tkModal_refundType").text(refundType);
            $("#tkModal_supplierName").text(data.data.vo.supplierName);
            $("#tkModal_supplierName_bck").val(data.data.vo.supplierName);
            $("#tkModal_sourceContractType").val(data.data.vo.contractType);
            $("#tkModal_sourceContractCode").val(data.data.vo.contractCode);
            $("#tkModal_assignCode").val(data.data.vo.assignCode);
            $("#tkModal_supplierId").val(data.data.vo.supplierId);
            $("#refundType_out").val(data.data.vo.refundType);
            if(data.data.contractCodeAll!=null && data.data.contractCodeAll.length > 0){
                var html='<option>请选择需要转账至的合同号</option>';
                $.each(data.data.contractCodeAll,function (i,code) {
                    html+='<option value="' + code.contractCode + '" >' + code.contractCode + '</option>';
                })
                $("#tkModal_contractCodeAll").html(html)
            }
            transInfoData = data.data;
            $("#tkModal").modal("show");
        }
    })
}

function contractRefundTransferCheck() {
    //设置目标合同类型
    var contractAndContractType = transInfoData.contractType;
    var code = $("#tkModal_contractCodeAll").val();
    var contractCodeType;
    $.each(contractAndContractType,function (name,value) {
        console.log(name,value)
        if(code == name){
            contractCodeType = value;
            $("#tkModal_targetContractType").val(contractCodeType);
        }
    })
    //判断金额大小
    var okMoney = $("#tkModal_transfer_okMoney").text();
    var transferMoney = $("#tkModal_transferMoney").val();
    if(transferMoney == null || transferMoney.length == "" || transferMoney==0){
        alert('结转金额不可为空');
        return false;
    }

    if(eval(transferMoney) > eval(okMoney)){
        alert('结转金额必须小于等于可结转金额');
        return false;
    }
    return true;
}

function createRefundTransferVo() {
    var check=contractRefundTransferCheck();
    if (!check){
        return;
    }
    console.info($("#tkModal_refundTransferOut").serializeArray());
    $("#tkModal_transferMoney").val(numUtils.longMoney($("#tkModal_transferMoney").val()))
    $.ajax({
        url:'/zall/chain/purchase/assureOutRefundOut/create',
        type:'POST',
        data:$("#tkModal_refundTransferOut").serializeArray(),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.status == 500){
                alert('结转失败!');
                $("#tkModal_transferMoney").val(numUtils.floatMoney($("#tkModal_transferMoney").val()))
                return;
            }
            document.getElementById("tkModal_refundTransferOut").reset();
            $("#tkModal").modal("hide");
            alert('结转成功!');
        },
        error:function(result){
            $("#tkModal_transferMoney").val(numUtils.floatMoney($("#tkModal_transferMoney").val()))
            alert("发生错误添加失败！");
        }
    });
}

$(function(){
    $("#ztgfk_3").click(function(){
        searchPayRefund();
    });

});