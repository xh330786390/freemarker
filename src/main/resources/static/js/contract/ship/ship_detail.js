$(function () {
    $(".costFile-input").hide()
    $("#save_notice").click(function () {
        if ($(".ship-box:checkbox:checked").length<=0){
            parent.layer.msg('请选择入库的明细');
            return;
        }
        if (validateForm("#notice_items")){
            save();
        }
    })
    $("#check_all").click(function () {
        if (($(this).prop("checked"))){
            $(".ship-box").prop('checked',true)
            $(".in-notice-num").addClass("check");
        }else {
            $(".ship-box").prop('checked',false);
            $(".in-notice-num").removeClass("check");
            $(".in-notice-num").removeClass("check-error");
        }
    });
    $(".ship-box").click(function () {
        if ($(this).prop("checked")){
            $(this).parent().parent().find(".in-notice-num").addClass("check");
        }else {
            $(this).parent().parent().find(".in-notice-num").removeClass("check");
            $(this).parent().parent().find(".in-notice-num").removeClass("check-error");
        }
        $(".ship-box:checkbox:checked").length == $(".ship-box").length ? $("#check_all").prop('checked',true) : $("#check_all").prop('checked',false);
    })

    // fileChange(["costFile"]);//上传文件
    //
    $(".costFile").click(function () {
        $(this).next().click();
    })

    $("#saveCosts").click(function () {
        if (validateForm("#costs")){
            saveCost();
        }
    })
    
    $("#cost_del").click(function () {
        if (check_d($("#cost_del_reason").val())){
            saveCostReason();
        }else {
            parent.layer.msg('请输入作废原因');
        }
    })
    $("#ship_del").click(function () {
        if (check_d($("#ship_del_reason").val())){
            saveShipReason();
        }else {
            parent.layer.msg('请输入作废原因');
        }
    })

    uploadFile(['costFile_1']);

    $('body').on('change','.updateURL',function(){
        updateUrl($(this).attr("data-id"),$(this).val())
    });

});

function costReason(id) {
    $('#zuofModal').modal('show');
    $('#zuofModal').find("input[name=id]").val(id);
}
function shipReason(id) {
    $('#ship_reason_modal').modal('show');
    $('#ship_reason_modal').find("input[name=id]").val(id);
}

function seeReason(id,reason) {
    $('#zuofyyModal').modal('show');
    $('#set_reason').html(reason);
}

function saveCostReason() {
    ajax('/zall/chain/purchase/contract/ship/cost/update','post',{
        data:{id:$('#zuofModal').find("input[name=id]").val(),reason:$("#cost_del_reason").val(),disabled:1},
        success:function (data) {
            if (data.status == '200'){
                MyDialog("已作废！",{
                    success:function(){
                        $("#zuofModal").modal("hide");
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
function saveShipReason() {
    ajax('/zall/chain/purchase/contract/ship/notice/update','post',{
        data:{id:$('#ship_reason_modal').find("input[name=id]").val(),reason:$("#ship_del_reason").val(),disabled:1},
        success:function (data) {
            if (data.status == '200'){
                MyDialog("已作废！",{
                    success:function(){
                        $("#ship_reason_modal").modal("hide");
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

function saveCost() {
    var json = {};
    createJson(json,"id",1);
    $("#costs").find("tr").each(function (i) {
        if (i!=0){
            i=i-1;
            createJson(json,"contractCarrierItems["+i+"].shipId",shipId);
            createJson(json,"contractCarrierItems["+i+"].shipCode",shipCode);
            createJson(json,"contractCarrierItems["+i+"].contractCode",contractCode);
            createJson(json,"contractCarrierItems["+i+"].supplierCode",supplierCode);
            createJson(json,"contractCarrierItems["+i+"].supplierId",supplierId);
            createJson(json,"contractCarrierItems["+i+"].supplierName",supplierName);
            createJson(json,"contractCarrierItems["+i+"].customerId",customerId);
            createJson(json,"contractCarrierItems["+i+"].customerName",customerName);
            createJson(json,"contractCarrierItems["+i+"].costType",$(this).find("select[name=costType]").val());
            createJson(json,"contractCarrierItems["+i+"].weight",numUtils.longWeight($(this).find("input[name=weight]").val()));
            createJson(json,"contractCarrierItems["+i+"].price",$(this).find("input[name=price]").val());
            createJson(json,"contractCarrierItems["+i+"].carrierId",$(this).find("select[name=carrierId]").val());
            createJson(json,"contractCarrierItems["+i+"].carrierName",$(this).find("select[name=carrierId] :selected").text());
            createJson(json,"contractCarrierItems["+i+"].carrierReceiverId",$(this).find("select[name=carrierReceiverId]").val());
            createJson(json,"contractCarrierItems["+i+"].carrierReceiver",$(this).find("select[name=carrierReceiverId] :selected").text());
            createJson(json,"contractCarrierItems["+i+"].attachUrl",$(this).find("input[name=costFile]").val());
        }
    })
    ajax('/zall/chain/purchase/contract/ship/cost/add','post',{
        data:json,
        success:function (data) {
            if (data.status == '200'){
                MyDialog("新增物流费用成功！",{
                    success:function(){
                        $("#newwlModal").modal("hide");
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

/**+合同物资明细添加*/
function showCost() {
    // var newObject = $("#itemsTable tr:first").clone(true);
    var L=$("#costs tr").length;
    $("#costs tr:first").find(".check").removeClass("check-error");/**添加明细取消错误验证*/
    $("#costs tr:first").find("input").addClass("check");/**添加明细添加验证*/
    $("#costs tr:first").find("select").addClass("check");/**添加明细添加验证*/
    var newObject = $("#costs tr:first").html();
    var news=newObject.split("type=\"file\"");
    newObject=news[0]+'type="file" id="costFile_'+L+'"'+news[1];
    newObject = "<tr>"+newObject+"</tr>";
    console.log(newObject)
    console.log(news[1])
    $("#costs").append(newObject);
    //绑定事件
    select();/**chosen select事件封装**/
    $(".costFile-input").hide()
    $(".costFile").click(function () {
        $(this).next().click();
    })
    uploadFile(['costFile_'+L])
    $("#costs tr:last td").eq(3).find('.chosen-container').eq(1).remove();
    $("#costs tr:last td").eq(4).find('.chosen-container').eq(1).remove();

    $("#costs tr:first").find("input").removeClass("check");/**添加明细添加验证*/
    $("#costs tr:first").find("select").removeClass("check");/**添加明细添加验证*/
}

function costUpload($this_id) {
    uploadFile([$this_id]);
}
function updateUrl(id,$T) {
    ajax('/zall/chain/purchase/contract/ship/cost/update','post',{
        data:{attachUrl:$T,id:id},
        success:function (data) {
            if (data.status == '200'){
                MyDialog('上传成功',{
                    success:function () {
                        parent.layer.closeAll();
                        window.location.reload();
                    }
                })
            }else {
                MyDialog(data.msg,{
                    success:function () {
                        parent.layer.closeAll();
                    }
                })
            }
        }
    })
}

/**保存入库通知*/
function save() {
    var json = {};
    /**入库通知单*/
    json.shipId=shipId;
    json.shipCode=shipCode;
    json.contractCode=contractCode;
    json.contractType=contractType;
    json.supplierCode=supplierCode;
    json.inType=$("#notice_items select[name=inType]").val();
    json.transportType=$("#notice_items select[name=transportType]").val();
    json.customerId=customerId;
    json.customerName=customerName;
    json.supplierId=supplierId;
    json.supplierName=supplierName;
    json.warehouseId=$("#notice_items select[name=warehouseId]").val();
    json.warehouse=$("#notice_items select[name=warehouseId] :selected").text();
    json.arrivalDate=getTime($("#notice_items input[name=arrivalDate]").val());
    json.remark=$("#notice_items textarea[name=remark]").val();
    /**入库通知单明细*/
    $("#notice_items tbody").find("tr .ship-box:checked").each(function (i) {
        var $_this = $(this).parent().parent();
        var $_td = $(this).parent().parent().find("td");
        createJson(json,"contractInNoticeItems["+i+"].breedCode",$_this.find("input[name=breedCode]").val());
        createJson(json,"contractInNoticeItems["+i+"].breed",$_td.eq(1).text());
        createJson(json,"contractInNoticeItems["+i+"].spec",$_td.eq(2).text());
        createJson(json,"contractInNoticeItems["+i+"].material",$_td.eq(3).text());
        createJson(json,"contractInNoticeItems["+i+"].weightType",$_this.find("input[name=weightType]").val());
        createJson(json,"contractInNoticeItems["+i+"].factory",$_td.eq(5).text());
        createJson(json,"contractInNoticeItems["+i+"].perAmount",$_this.find("input[name=perAmount]").val());
        createJson(json,"contractInNoticeItems["+i+"].num",$_this.find("input[name=num]").val());
        createJson(json,"contractInNoticeItems["+i+"].numUnit","件");
        createJson(json,"contractInNoticeItems["+i+"].weight",numUtils.longWeight($_this.find("input[name=numWeight]").val()));
        createJson(json,"contractInNoticeItems["+i+"].weightUnit","吨");
        createJson(json,"contractInNoticeItems["+i+"].baleNum",$_this.find("td:last").text());
        createJson(json,"contractInNoticeItems["+i+"].price",$_this.find("input[name=price]").val());
        createJson(json,"contractInNoticeItems["+i+"].remark",$("#notice_items textarea[name=remark]").val());
        createJson(json,"contractInNoticeItems["+i+"].warehouseId",json.warehouseId);
        createJson(json,"contractInNoticeItems["+i+"].warehouse",json.warehouse);
        createJson(json,"contractInNoticeItems["+i+"].contractCode",contractCode);
        createJson(json,"contractInNoticeItems["+i+"].supplierCode",supplierCode);
    })
    ajax('/zall/chain/purchase/contract/ship/notice/add','post',{
        data:json,
        success:function (data) {
            if (data.status == '200'){
                MyDialog("新增入库通知单成功！",{
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