$(function () {
    fileChange("fileItem",'/zall/chain/purchase/contract/ship/cost/item',{
        success:function (result) {
            if (result.status == '500' ){
                MyDialog(result.msg,{success:function () {
                        parent.layer.closeAll();
                    }});
            }else if(result.status == '200'){
                var importItem='';
                var isFail = false;
                $.each(result.data,function (key,item) {
                    importItem += '<tr>'+
                        '<td style="display: none;">'+item.breedCode+'</td>'+
                        '<td>'+item.breed+'</td>'+
                        '<td>'+item.spec+'</td>'+
                        '<td>'+item.material+'</td>'+
                        '<td>'+getMethod(item.weightType)+'</td>'+
                        '<td>'+item.factory+'</td>'+
                        '<td>'+item.warehouse+'</td>'+
                        '<td>'+item.baleNum+'</td>'+
                        '<td>'+numUtils.roundingLong(item.num,0)+'</td>'+
                        '<td>'+numUtils.floatWeight(item.weight)+'</td>'+
                        '<td>'+numUtils.floatMoney(item.price)+'</td>'+
                        '<td>'+item.remark+'</td>'+
                        '<td style="display: none;">'+item.warehouseId+'</td>'+
                        '</tr>';
                });
                $("#noItems").hide();
                $("#importItems").append(importItem);
            }
        }
    });
    $("#save").click(function () {
        if ($("#importItems").find("tr").length>1){
            save();
        }else {
            parent.layer.msg('请先导入明细');
        }
    })
});

function getMethod(i) {
    if (2 == i){
        return "抄码";
    }
    if (1 == i){
        return "磅计";
    }
    if (0 == i){
        return "理计";
    }
}

function getPatten(i) {
    console.log(i)
    if ("抄码" == i){
        return 2;
    }
    if ("磅计" == i){
        return 1;
    }
    if ("理计" == i){
        return 0;
    }
}

function save() {
    var json = {};
    /**入库通知单*/
    json.contractCode=contractCode;
    json.supplierCode=supplierCode;
    json.customerId=customerId;
    json.customerName=customerName;
    json.supplierId=supplierId;
    json.supplierName=supplierName;
    /**入库通知单明细*/
    $("#importItems").find("tr").each(function (i) {
        if (i != 0){
            i=i-1;
            var $_this = $(this);
            var $_td = $(this).find("td");
            createJson(json,"contractInNoticeItems["+i+"].supplierCode",supplierCode);
            createJson(json,"contractInNoticeItems["+i+"].contractCode",contractCode);
            createJson(json,"contractInNoticeItems["+i+"].breedCode",$_td.eq(0).text());
            createJson(json,"contractInNoticeItems["+i+"].breed",$_td.eq(1).text());
            createJson(json,"contractInNoticeItems["+i+"].spec",$_td.eq(2).text());
            createJson(json,"contractInNoticeItems["+i+"].material",$_td.eq(3).text());
            createJson(json,"contractInNoticeItems["+i+"].weightType",getPatten($_td.eq(4).text()));
            createJson(json,"contractInNoticeItems["+i+"].factory",$_td.eq(5).text());
            createJson(json,"contractInNoticeItems["+i+"].warehouse",$_td.eq(6).text());
            createJson(json,"contractInNoticeItems["+i+"].baleNum",$_td.eq(7).text());
            createJson(json,"contractInNoticeItems["+i+"].num",numUtils.longWeight($_td.eq(8).text()));
            createJson(json,"contractInNoticeItems["+i+"].weight",numUtils.longWeight($_td.eq(9).text()));
            createJson(json,"contractInNoticeItems["+i+"].price",numUtils.longMoney($_td.eq(10).text()));
            createJson(json,"contractInNoticeItems["+i+"].remark",$_td.eq(11).text());
            createJson(json,"contractInNoticeItems["+i+"].warehouseId",$_td.eq(12).text());
            createJson(json,"contractInNoticeItems["+i+"].perAmount","0");
            createJson(json,"contractInNoticeItems["+i+"].numUnit","0");
            createJson(json,"contractInNoticeItems["+i+"].weightUnit","");
            createJson(json,"contractInNoticeItems["+i+"].contractCode",contractCode);
            createJson(json,"contractInNoticeItems["+i+"].supplierCode",supplierCode);
        }
    })
    ajax('/zall/chain/purchase/contract/ship/notice/add','post',{
        data:json,
        success:function (data) {
            if (data.status == '200'){
                MyDialog("新增入库明细成功！",{
                    success:function(){
                        $("#newrkModal").modal("hide");
                        parent.layer.closeAll();
                        window.location.reload();
                    }
                })
            }else {
                Dialog(data.msg);
            }
        }
    });
}

function cancel() {
    ajax('/zall/chain/purchase/contract/ship/notice/update','post',{
        data:{id:$('#zuofModal').find("input[name=id]").val(),reason:$("#cost_del_reason").val(),disabled:1,completed:1},
        success:function (data) {
            if (data.status == '200'){
                MyDialog("已作废！",{
                    success:function(){
                        layerReload($("#zuofModal"));
                    }
                })
            }else {
                Dialog(data.msg);
            }
        }
    });
}

function shipReason(id) {
    $('#zuofModal').modal('show');
    $('#zuofModal').find("input[name=id]").val(id);
    $("#reason_ok").click(function () {
        cancel();
    })
}

function layerReload($_OBJ) {
    if($_OBJ != undefined && $_OBJ != null){
        $_OBJ.modal("hide");
    }
    parent.layer.closeAll();
    window.location.reload();
}