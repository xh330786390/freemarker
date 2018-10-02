$(function () {

    $("#ok_ship_item").hide();

    $("#check_all").click(function () {
        if (($(this).prop("checked"))){
            $(".ship-box").prop('checked',true)
        }else {
            $(".ship-box").prop('checked',false)
        }
    });

    $("#toShip").click(function () {
        // href='/zall/chain/purchase/contract/ship/item/detail?contractCode=${contract.sellContractCode!''}'
        if($(".ship-box:checkbox:checked").length==0){
            parent.layer.msg('请选择要装船装车的明细');
            return;
        }
        var ids=new Array();
        $(".ship-box:checkbox:checked").each(function () {
            if ($(this).hasClass("contract-item")){
                ids.push($(this).val()+"C")
            }else {
                ids.push($(this).val()+"S")
            }
        });
        window.location.href='/zall/chain/purchase/contract/ship/item/detail?contractCode='+contractCode+'&ids='+ids.join(",");
    })

    $("#de_ship_item").click(function () {
        if($(".ship-box:checkbox:checked").length==0){
            parent.layer.msg('请选择要删除的明细');
            return;
        }
        var L = $(".ship-box:checkbox:checked").length > $(".can-del:checkbox:checked").length;
        var msg='';var ids=new Array();
        if (L){
            if ($(".ship-box:checkbox:checked").hasClass("contract-item")){
                msg+="<span class='text-color'>[合同物资]</span>";
            }
            if ($(".ship-box:checkbox:checked").hasClass("ship-item")){
                msg+=msg==''?"<span class='text-color'>[已经装船装车的明细]</span>":"和<span class='text-color'>[已经装船装车的明细]</span>";
            }
            msg+="不能删除，确认删除其他明细;";
        }else {
            msg+="确认删除明细";
        }
        $(".can-del:checkbox:checked").each(function () {
            ids.push($(this).val())
        })
        if (ids.length == 0){
            Dialog(msg);
            return;
        }
        MyDialog(msg,{
            success:function () {
                ajax('/zall/chain/purchase/contract/ship/newItem/delete','get',{
                    data:{ids:ids.join(",")},
                    success:function (data) {
                        if (data.status == '200'){
                            MyDialog("删除成功",{
                                success:function () {
                                    window.location.reload();
                                }
                            });
                        }else {
                            Dialog(data.msg);
                        }
                    }
                })
            }
        });
    })

    $("#up_ship_item").click(function () {
        if($(".ship-box:checkbox:checked").length==0){
            parent.layer.msg('请选择要修改的明细');
            return;
        }
        var ids=new Array();
        var c_ids=new Array();
        $(".ship-box:checkbox:checked").each(function () {
            if (!$(this).hasClass("contract-item")){
                ids.push($(this).val())
                $("#up_ship_item").hide();
                $("#ok_ship_item").show();
                var H_w = $(this).parent().parent().find("td").eq(7).html();
                $(this).parent().parent().find("td").eq(7).html('<input type="text" class="form-control td-input my-input check notnull ship_weight" value="'+H_w+'">');
            }else {
                c_ids.push($(this).val());
            }
        });
        if(c_ids.length>0&&ids.length<=0){
            parent.layer.msg('合同采购明细不能修改');
        }
    })

    $("#ok_ship_item").click(function () {
        if (validateForm("#shipItem")){
            var json={};var isGt = false;
            var ids=new Array();
            $("#shipItem .ship_weight").each(function (i) {
                if (numUtils.multiply($(this).val(),"10000") <= numUtils.multiply($(this).parent().parent().find("td").eq(8).text(),"10000")){
                    ids.push(numUtils.add($(this).parent().parent().find(".ship-box").attr("data-step"),"1"));
                    isGt=true;
                }
                if (!isGt){
                    createJson(json,"contractShipNewItems["+i+"].id",$(this).parent().parent().find(".ship-box").val());
                    createJson(json,"contractShipNewItems["+i+"].weight",numUtils.multiply($(this).val(),10000));
                }
            });
            if (isGt){
                parent.layer.msg('第['+ids.toString()+"]条的明细修改重量小于已装船装车重量");
                return;
            }
            ajax('/zall/chain/purchase/contract/ship/newItem/update','get',{
                data:json,
                success:function (data) {
                    if (data.status == '200'){
                        $(".ship-box:checkbox:checked").each(function (i) {
                            var $_w = $(this).parent().parent().find(".ship_weight").val();
                            $(this).parent().parent().find("td").eq(7).html($_w);
                            $("#up_ship_item").show();
                            $("#ok_ship_item").hide();
                        });
                    }else {
                        Dialog(data.msg);
                    }
                }
            });
        }
    })
    $(".ship-box").click(function () {
        if (validateForm("#shipItem")){
            var $_w = $(this).parent().parent().find(".ship_weight").val();
            $(this).parent().parent().find("td").eq(7).html($_w);
        }
        if ($(".ship-box:checkbox:checked").length <= 0){
            $("#ok_ship_item").hide();
            $("#up_ship_item").show();
        }
        $(".ship-box:checkbox:checked").length == $(".ship-box").length ? $("#check_all").prop('checked',true) : $("#check_all").prop('checked',false);
    })

    $("#ship_reason_ok").click(function () {
        saveShipReason();
    })

    $(".is-disable").focus(function () {
        console.log($(this).next())
        $(this).next().show();
    });
    $(".is-disable").blur(function () {
        $(this).next().hide();
    });
    $(".is-disable").each(function () {
        $(this).next().hide();
    });
});

function shipOver(id) {
    MyDialog("<span style='color: #c7254e;'>确认入库完结？</span>",{
        success:function () {
            ajax('/zall/chain/purchase/contract/ship/update','post',{
                data:{id:id,completed:1},
                success:function (data) {
                    if (data.status == "200"){
                        MyDialog("已入库完结！",{
                            success:function () {
                                layerReload();
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
    })
}

function shipReason(id) {
    $('#zuofModal').modal('show');
    $('#zuofModal').find("input[name=id]").val(id);
}

function saveShipReason() {
    ajax('/zall/chain/purchase/contract/ship/reason','post',{
        data:{id:$('#zuofModal').find("input[name=id]").val(),reason:$("#cost_del_reason").val(),disabled:1},
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

function layerReload($_OBJ) {
    if($_OBJ != undefined && $_OBJ != null){
        $_OBJ.modal("hide");
    }
    parent.layer.closeAll();
    window.location.reload();
}