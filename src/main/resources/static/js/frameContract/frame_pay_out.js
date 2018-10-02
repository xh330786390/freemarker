
function getContractCode(){
    var contractCode =$("#contractCode").text().trim();
    return contractCode;
}

function payOutList(){
    $("#tablelist_4").pagination({
        url : "/zall/chain/purchase/assureOutPay/queryList",
        paramJson : {contractCode:getContractCode(),contractType:0,},
        callback:function(){

        }
    });
}

function getPayInfo(){
    $.ajax({
        url:'/zall/chain/purchase/assureOutPay/getPayInfo',
        type:'GET',
        data:{"frameCode":contractCode},
        dataType: 'json',
        success: function (frameAssurePayInfo) {
        },
        error:function(result){
            dialog("获取错误！");
        }
    });
}

//新增
function payOutCreate()
{
    $("#applyMoney").val(numUtils.longMoney($("#applyMoney").val()));
    $.ajax({
        url:'/zall/chain/purchase/contractOutPay/create',
        type:'POST',
        data:$("#payOutForm").serializeArray(),
        dataType: 'json',
        success: function (data) {
            console.info(data);
            $("#newfModal").modal("hide");
            alert("付款申请成功！");
            $("#applyMoney").val(numUtils.floatMoney($("#applyMoney").val()));
            document.getElementById("payOutForm").reset();
            window.location.reload();
            return;
        },
        error:function(result){
            alert("发生错误添加失败！");
            $("#applyMoney").val(numUtils.floatMoney($("#applyMoney").val()));
        }
    });
};

function businessTypeChange(){
    var businessVal = $("#FK_select_business").val();
    var contractAndBusinessType = transInfoData.businessType;
    var html = '';
    console.log(contractAndBusinessType)
    $.each(contractAndBusinessType,function(name,value) {
        console.log(name+","+value)
        console.log(businessVal+","+value)
        if(value == businessVal){
            html += '<option value="' + name + '">' + name + '</option>';
        }
    });
    $("#contractCodeAll").html(html);
}

function frameContractTransferCheck() {
    //判断合同结转类型是否和合同类型不吻合
    var contractAndContractType = transInfoData.contractType;
    console.info(contractAndContractType);
    var code = $("#contractCodeAll").val();
    var transferType = $("#transferType").val();
    var contractCodeType;
    $.each(contractAndContractType,function (name,value) {
        if(code == name){
            contractCodeType = value;
            $("#FK_targetContractType").val(contractCodeType);
        }
    })
    if(transferType != 2){
        if(contractCodeType == 0){
            alert('结转类型为运费或货款时，合同类型必须为框架协议子合同，或者普通合同！')
            return false;
        }
    }
    //判断金额大小
    var okMoney = $("#FK_okMoney").val();
    var transferMoney = $("#FK_transferMoney").val();
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

function createTransferVo() {
    var check=frameContractTransferCheck();
    if (!check){
        return;
    }
    $("#FK_transferMoney").val(numUtils.longMoney($("#FK_transferMoney").val()))
    $.ajax({
        url:'/zall/chain/purchase/assureOutPay/createTransferVo',
        type:'POST',
        data:$("#FK_transferOut").serializeArray(),
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if(data.status == "200"){
                window.location.reload();
            }else {
                alert(data.msg);
                $("#FK_transferMoney").val(numUtils.floatMoney($("#FK_transferMoney").val()))
                return;
            }
        },
        error:function(result){
            alert("发生错误添加失败！");
            $("#FK_transferMoney").val(numUtils.floatMoney($("#FK_transferMoney").val()))
        }
    });
}

function frameContractTransferTip(businessType,applyCode,id,contractCode,validMoney,collectPayType,payPurpose,contractType) {
	//默认选中业务类型
	$("#FK_select_business option[value!='"+businessType+"']").attr("selected","selected");

    $("#FK_payApplyCode").val(applyCode);
    $.ajax({
        url:'/zall/chain/purchase/assureOutPay/querySellCode',
        data:{supplierId:id,contractCode:contractCode,contractType:contractType,collectPayType:collectPayType,payPurpose:payPurpose,validMoney:validMoney},
        type:'get',
        success:function (data) {
            $("#FK_okMoney").text(numUtils.floatMoney(data.data.okMoney));
            if(data.data.contractCodeAll!=null && data.data.contractCodeAll.length > 0){
                var html='<option>请选择需要转账至的合同号</option>';
                $.each(data.data.contractCodeAll,function (i,code) {
                    html+='<option value="' + code.contractCode + '">' + code.contractCode + '</option>';
                })
                console.log(data.data.contractCodeAll)
                console.log(html)
                $("#contractCodeAll").html(html)
            }
            transInfoData = data.data;
            $("#fuikModal").modal("show");
        }
    })
}

$(function(){


});