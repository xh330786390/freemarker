function getInUnpenMoney(){
    $.ajax({
        url:'/zall/chain/purchase/contract/inUnpen/getInUnpenMoney',
        type:'POST',
        data:{
            "contractType":$("#contractType").val(),
            "contractCode":$("#sellContractCode").text().trim()
        },
        success: function(result) {
            console.log(result)
            $("#can_release_money").text(numUtils.floatMoney(result.totalMoney));
        }
    });
}