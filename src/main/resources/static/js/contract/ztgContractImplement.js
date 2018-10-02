function invoiceEnough() {
    var contractCode = $("#contractCode").text();
    $.ajax({
        type:"GET",
        url:'/zall/chain/purchase/contract/invoiceEnough?contractCode=' + contractCode,
        dataType:"json",
        success:function(data){
            alert("合同已进项票齐！");
        }
    });
}


$(function () {

});

