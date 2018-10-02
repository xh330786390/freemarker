function settleSupplierCheck(order){
    var id = $("#contractId").val();
    console.log(contractCode)
    var data = {id:id};
    if(order == 1){
        data.order = 1;
    }else{
        data.order = 2;
    }
    $.ajax({
        url:'/zall/chain/purchase/settleSupplier/settleAccountsCheck',
        type:'POST',
        data:data,
        success: function(result) {
            if(result.status == 400){
                $("#pSettleSupplierCheck").text("");
                $("#pSettleSupplierCheck").text(result.msg);
                $("#gysModal").show();
            }else{
                window.location.href="/zall/chain/purchase/settleSupplier/getSettleApplyInfo?supplierOrCustomer=1&settleType=1&contractCode="+contractCode+"&contractType="+contractType;
            }
        }
    });
}

function secondSettleCheck() {
    var id = $("#contractId").val();
    $.ajax({
        url:'/zall/chain/purchase/settleSupplier/settleAccountsCheck',
        type:'POST',
        data:{"id":id},
        success: function(result) {
            if(result.status == 1001){
                $("#pSettleSupplierCheck").text("");
                $("#pSettleSupplierCheck").text(result.msg);
                $("#gysModal").show();
            }else{
                window.location.href="/zall/chain/purchase/settleSupplier/settleAccountsCheck?contractCode"
            }
        }
    });
}

//隐藏弹框
$("#butModal").click(function(){
    $("#gysModal").hide();
})
