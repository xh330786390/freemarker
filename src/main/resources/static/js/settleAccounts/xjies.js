var contractJson = {};
//跳转至新增页面的判断前提是否满足
function settleAccountsCheck(settleType){
    var id = $("#contractId").val();
    $.ajax({
        url:'/zall/chain/purchase/settleCustomer/settleAccountsCheck',
        type:'POST',
        data:{
            "id":id,
            "settleType":settleType
        },
        success: function(result) {
            if(result.status == 1001){
                $("#psettleAccountsCheck").text("");
                $("#psettleAccountsCheck").text(result.msg);
                $("#gysModal").show();
            }else{
                window.location.href="/zall/chain/purchase/settleCustomer/createUI?id="+id+"&settleType="+settleType;
            }
        }
    });
}

//隐藏弹框
$("#butModal").click(function(){
    $("#gysModal").hide();
})

//查询显示 转入收益 弹框数据
function queryContractList(){
    $("#zrsyModalProfit").val("");//清空应收利息
    $("#zrsyModalRemark").val("");//清空备注
    var id = $("#contractId").val();
    $.ajax({
        url:'/zall/chain/purchase/contractInProfit/createUI',
        type:'POST',
        data:{"id":id},
        success: function(result) {
            var html="<option selected='selected' value=''>请选择合同编号</option>";
            $.each(result.contractAccountCustomerVOs,function(){
                if(this.contractCode != result.contractVO.sellContractCode){
                    html += "<option value='"+this.contractType+"' data-type='"+this.profit+"'>"+this.contractCode+"</option>";
                }
            })
            $("#zrsyModalSellContractCode").html("");
            $("#zrsyModalSellContractCode").append(html);//下拉列表
            $("#zrsyModalCustomerName").text(result.contractVO.customerName);//客户公司名称
            contractJson.contractVO = result.contractVO;
        }
    });
}

//设置参数
function getParam(){
    var param = {}
    var contractVO = contractJson.contractVO;
    param.businessType=contractVO.businessType;//业务类型
    param.sourceContractCode=$("#zrsyModalSellContractCode :selected").text().trim();//源销售合同编号
    param.sourceContractType=$("#zrsyModalSellContractCode").val();//源合同类型
    param.targetContractType=contractVO.contractType;//目标合同类型
    param.targetContractCode=contractVO.sellContractCode;//目标销售合同编号
    param.supplierCode=contractVO.purchaseContractCode;//采购合同编号
    param.customerId=contractVO.customerId;//客户公司Id
    param.customerName=contractVO.customerName;//客户公司名称
    param.profit=numUtils.longMoney($("#zrsyModalProfit").val());//结转收益金额
    param.remark=$("#zrsyModalRemark").val();//备注
    return param;
}
//添加 转入收益
function createContractInProfit(){
    var contractType = $("#zrsyModalSellContractCode").val();
    if(contractType == null || contractType == ''){
        $("#zrsyModalSellContractCode").css("border","1px solid red");
        return;
    }else{
        $("#zrsyModalSellContractCode").css("border","");
    }
    var param = getParam();
    $.ajax({
        url:'/zall/chain/purchase/contractInProfit/create',
        type:'POST',
        data:param,
        success: function(result) {
            $("#zrsyModal").modal("hide");
        }
    });
}

//利息金额 赋值
function useableMoney(){
    var useableMoney = $("#zrsyModalSellContractCode :selected").attr("data-type");//利息金额
    $("#zrsyModalProfit").val(numUtils.floatMoney(useableMoney));
}
