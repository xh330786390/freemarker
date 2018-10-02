/**
 * @author huaxianyi
 * @Description:合同
 * @date 2018-8-28
 */
$(function(){
    /**初次加载*/
    contract_init();
    canHelpTransport();/*是否代运*/
    /**合同交货地址赋值*/
    $("#customerWarehouseId").change(function () {
        var address = $('#customerWarehouseId :selected').attr("data-address");
        $('#customerWarehouseAddress').val(address);
    });
    $("#supplierWarehouseId").change(function () {
        var address = $('#supplierWarehouseId :selected').attr("data-address");
        $('#supplierWarehouseAddress').val(address);
    });
    $("input[name=canInsteadTransport]").change(function () {
        canHelpTransport();/*是否代运*/
    });
    $(".warehouseAddress").change(function () {
        $(this).removeClass("check-error");
    })

    $("#businessId").change(function () {
        if($(this).val()==''){
            $("#departId").val('');
            $("#departName").val('');
        }
        ajax('/zall/baseData/getDeptName','get',{
            data:{id:$(this).val()},
            success:function (data) {
                $("#departId").val(data.id);
                $("#departName").val(data.name);
            }
        })
    });

    /**明细文件导入*/
    fileChange("fileItem",'/zall/chain/purchase/contract/item',{
        success:function (result) {
            if (result.status == '500' ){
                alert( result.msg);
            }else{
                addItem(result.data);
                itemPriceAndWeightNotEvent();
            }
        }
    });

    /**合同附件添加事件*/
    var contract_files=['contractUrl','purchaseContractUrl','businessReportUrl','businessViewUrl'];
    uploadFile(contract_files);

    $("#save").click(function () {
        save();
    })
    $("#submit").click(function () {
        submitContract();
    })

    $(".check").change(function () {
        $(this).removeClass("check-error");
    })

    $(".contract_file").change(function () {
        $(this).prev().css({"border-color":"#1c84c6","background-color":"#1c84c6"});
        $(this).parent().css({"border-color":"#1c84c6","background-color":"#1c84c6"});
    })

    $(".chosen-select").change(function () {
        $(this).next().removeClass("check-error");
        $(this).next().removeClass("border-radius");
    })
})

/*是否代运*/
function canHelpTransport() {
    if($("input[name=canInsteadTransport]:checked").val()=='0'){
        $(".canInsteadTransport").hide();
    }else {
        $(".canInsteadTransport").show();
    }
}

/**导入明细添加*/
function addItem(data) {
    $.each(data.items,function (i,item) {
        console.log(item)
        showItem();
        $("#itemsTable tr:last select[name=breedName]").val(item.breedCode);
        $("#itemsTable tr:last input[name=spec]").val(item.spec);
        var $me=$("#itemsTable tr:last select[name=material]");
        ajax('/zall/chain/purchase/contract/getMaterial','get',{
            data:{"category":item.breedCode},
            success:function (data) {
                var html='<option value="">请选择材质</option>';
                if (data != null || data.length != 0){
                    $.each(data,function (i,material) {
                        html+='<option value="'+material.name+'">'+material.name+'</option>';
                    });
                }
                $me.html(html);
                $me.val(item.material);
                $me.trigger("chosen:updated");
                $me.default_single_text = "";
            }
        });
        $("#itemsTable tr:last select[name=weightPattern]").val(item.weightPattern);
        $("#itemsTable tr:last select[name=logoPlace]").val(item.logoPlace);
        $("#itemsTable tr:last input[name=packageCode]").val(item.packageCode);
        $("#itemsTable tr:last input[name=weight]").val(item.viewWeight);//重量
        $("#itemsTable tr:last input[name=unitPrice]").val(item.viewPrice);//单价
        $("#itemsTable tr:last input[name=money]").val(item.viewTotalPrice);
        // $("#notMysqlWeight").html(data.weight);$("#notMysqlPrice").html(data.amount);

        $("#itemsTable tr:last select[name=breedName]").trigger("chosen:updated");
        $("#itemsTable tr:last select[name=logoPlace]").trigger("chosen:updated");
    })
}

/**+合同物资明细添加*/
function showItem() {
    $(".breedName").trigger("chosen:updated");
    // var newObject = $("#itemsTable tr:first").clone(true);
    $("#itemsTable tr:first").find(".check").removeClass("check-error");/**添加明细取消错误验证*/
    $("#itemsTable tr:first").find("input").addClass("check");/**添加明细添加验证*/
    $("#itemsTable tr:first").find("select").addClass("check");/**添加明细添加验证*/
    var newObject = $("#itemsTable tr:first").html();
    newObject = "<tr>"+newObject+"</tr>"
    $("#itemsTable").append(newObject);
    //绑定事件
    contract_init();
    $("#itemsTable tr:last td").eq(0).find('.chosen-container').eq(1).remove();
    $("#itemsTable tr:last td").eq(2).find('.chosen-container').eq(1).remove();
    $("#itemsTable tr:last td").eq(4).find('.chosen-container').eq(1).remove();

    $("#itemsTable tr:first").find("input").removeClass("check");/**添加明细添加验证*/
    $("#itemsTable tr:first").find("select").removeClass("check");/**添加明细添加验证*/
}
/**+预运输计划、交货方式添加**/
function showTR(tab) {
    var newObject = $("#"+tab+" tr:first").html();
    newObject = "<tr>"+newObject+"</tr>"
    $("#"+tab).append(newObject);
}

//品名下拉联动
function select_breed() {
    /**依据所选的品名查询材质*/
    $(".breedName").change(function () {
        var $_select = $(this).parent().parent().find(".material");
        ajax('/zall/chain/purchase/contract/getMaterial','get',{
            data:{"category":$(this).val()},
            success:function (data) {
                var html='<option>请选择材质</option>';
                if (data != null || data.length != 0){
                    $.each(data,function (i,material) {
                        html+='<option value="'+material.name+'">'+material.name+'</option>';
                    });
                }
                $_select.html(html);
                $_select.trigger("chosen:updated");//更新select数据
            }
        });
    });
}
/**明细价格重量动态计算*/
function itemPriceAndWeight() {
    var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
    var reg_weight = /^0\.\d{1,4}$|^[1-9]\d{0,15}\.\d{1,4}$/; // 重量
    var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
    $(".itemWeight").change(function () {
        var itemWeight="0";
        $(this).parent().parent().find("input[name=money]").val(numUtils.money(accMul($(this).parent().parent().find("input[name=unitPrice]").val(),$(this).val())));
        $(".itemWeight").each(function (i) {
            if (i!=0&&(reg_int.test($(this).val())||reg_weight.test($(this).val()))) {
                itemWeight = accAdd(itemWeight, $(this).val());
            }
        })
        $("#notMysqlWeight").html(itemWeight);
    });
    $(".itemUnitPrice").change(function () {
        var itemUnitPrice="0";
        $(this).parent().parent().find("input[name=money]").val(numUtils.money(accMul($(this).parent().parent().find("input[name=weight]").val(),$(this).val())));
        $(".itemMoney").each(function (i) {
            if (i!=0&&(reg_int.test($(this).val())||reg_money.test($(this).val()))){
                itemUnitPrice=accAdd(itemUnitPrice,$(this).val());
            }
        })
        $("#notMysqlPrice").html(itemUnitPrice);
    });
}
function itemPriceAndWeightNotEvent() {//不绑定事件，直接计算，导入明细时使用
    var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
    var reg_weight = /^0\.\d{1,4}$|^[1-9]\d{0,15}\.\d{1,4}$/; // 重量
    var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
    var itemWeight="0";
    $(".itemWeight").each(function (i) {
        if (i!=0&&(reg_int.test($(this).val())||reg_weight.test($(this).val()))) {
            itemWeight = accAdd(itemWeight, $(this).val());
        }
    })
    $("#notMysqlWeight").html(itemWeight);
    var itemUnitPrice="0";
    $(".itemMoney").each(function (i) {
        if (i!=0&&(reg_int.test($(this).val())||reg_money.test($(this).val()))) {
            itemUnitPrice = accAdd(itemUnitPrice, $(this).val());
        }
    })

    $("#notMysqlPrice").html(itemUnitPrice);
}

/**框架合同下拉显示事件**/
function frameSelect() {
    $("#customerId").change(function () {
        frameSelectCheck();
    })
    $("#businessType").change(function () {
        frameSelectCheck();
    })
}
function frameSelectCheck() {
    var r=true;
    var r1=check_d($("#businessType").val());
    var r2=check_d($("#customerId").val());
    var r3=check_d($("#contractType").val());
    if(!r1||!r2||!r3){
        r=false;
    }
    if(r){
        if ($("#contractType").val()=='2'){
            showSelect();
        }else {
            $(".contract-type-select").hide();
            $("#frameId").addClass("ignore");
        }
    }else{
        $(".contract-type-select").hide();
        $("#frameId").addClass("ignore");
    }
}

/**年收益率radio事件**/
function radio_percent() {
    var y_3=$("#radio_day").parent().find("input[name=yearProfitPercent_3]");
    var y_4=$("#radio_day").parent().find("input[name=yearProfitPercent_4]");
    var y_5=$("#radio_not_day").parent().find("input[name=yearProfitPercent_5]");
    $("#radio_day").click(function () {
        y_3.attr("disabled",false);
        y_4.attr("disabled",false);
        y_5.attr("disabled",true);
        y_5.val("");
    })
    $("#radio_not_day").click(function () {
        y_3.attr("disabled",true);
        y_4.attr("disabled",true);
        y_5.attr("disabled",false);
        y_3.val("");
        y_4.val("");
    })
}

/**初始化事件**/
function contract_init() {
    select();/**chosen select事件封装**/
    select_breed();/**品名下拉联动*/
    itemPriceAndWeight();/**明细价格重量动态计算*/
    frameSelect();/**框架合同下拉显示**/
    radio_percent();/**年收益率radio事件**/
}


/**设置收益率JSON*/
function yearProfitPercent() {
    var radio_check=$("#year_profit_percent_radio input[name=radio]:checked").val();
    var year='{' +
        '"occupy_percent":'+accMul(getString($("#yearProfitPercent_1").val()),100)+',' +
        '"server_money":'+accMul(getString($("#yearProfitPercent_2").val()),100)+',' +
        '"check":'+(radio_check=='1'?true:false)+',' ;
    if(radio_check=='1'){
        year+='"day":'+(radio_check=='1'?(getString($("#yearProfitPercent_3").val())==null?0:getString($("#yearProfitPercent_3").val())):0)+',';
    }
    year+='"step":'+(radio_check=='1'?(getString($("#yearProfitPercent_4").val())==null?0:accMul($("#yearProfitPercent_4").val(),100)):(getString($("#yearProfitPercent_5").val())==null?0:accMul(getString($("#yearProfitPercent_5").val()),100)))+
        '}';
    return year;
}