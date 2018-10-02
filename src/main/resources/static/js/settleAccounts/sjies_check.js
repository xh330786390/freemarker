var carrierCompany = [{"carrierId":12,"carrierName":"上海承运"},{"carrierId":13,"carrierName":"上海快运"},{"carrierId":13,"carrierName":"上海达运"}];
var warehouseCompany = [{"carrierId":12,"carrierName":"上海承运"},{"carrierId":13,"carrierName":"上海快运"},{"carrierId":13,"carrierName":"上海达运"}];

var settleSupplierJson={};

$(function(){
    //获取合同结算信息
    getSettleSupplier();
})

function getSettleSupplier(){
    var id = $("#id").val();
    $.ajax({
        url:'/zall/chain/purchase/settleSupplier/getByParam',
        type:'POST',
        data:{"id":id},
        success: function(result) {
            if(result.settleSupplierVO.settleType == 1){
                settleSupplierJson.one = result.settleSupplierVO;
                settleSupplierJson.oneCarrierList = result.settleSupplierCarrierVOS;
                settleSupplierJson.oneWarehouseList = result.settleSupplierWarehouseVOS;
                $("#one").click();
                $("#twice").hide();
            }else{
                settleSupplierJson.twice = result.settleSupplierVO;
                settleSupplierJson.twiceCarrierList = result.settleSupplierCarrierVOS;
                settleSupplierJson.twiceWarehouseList = result.settleSupplierWarehouseVOS;
                $("#reviewProgress").remove();
            }
            assignmentSupplier(result.settleSupplierVO);
        }
    });
}

//切换结算方式
function getSettleSupplierSwitch(num){
    var contractCode = $("#contractCode").val();
    if(num == 1){
        if(settleSupplierJson.one != null){
            assignmentSupplier(settleSupplierJson.one);
        }else{
            $.ajax({
                url:'/zall/chain/purchase/settleSupplier/getByParam',
                type:'POST',
                data:{
                    "contractCode":contractCode,
                    "settleType":1,
                    "auditStatus":2
                },
                success: function(result) {
                    settleSupplierJson.one = result.settleSupplierVO;
                    settleSupplierJson.oneCarrierList = result.settleSupplierCarrierVOS;
                    settleSupplierJson.oneWarehouseList = result.settleSupplierWarehouseVOS;
                    assignmentSupplier(result.settleSupplierVO)
                }
            });
        }
    }else{
        //基础数据
        assignmentSupplier(settleSupplierJson.twice);
    }
}

//赋值方法
function assignmentSupplier(settleSupplierVO){
    var divId;
    if(settleSupplierVO.settleType == 1){
        divId = 'tab-2';
    }else{
        divId = 'tab-1';
    }

    //合同签订信息
    $("#"+divId+" [name='contractCode']").text(settleSupplierVO.contractCode);//合同编号
    $("#"+divId+" [name='supplierName']").text(settleSupplierVO.supplierName);//结算方
    $("#"+divId+" [name='contractWeight']").text(numUtils.floatWeight(settleSupplierVO.contractWeight));//合同签订重量（吨）
    $("#"+divId+" [name='contractAmount']").text(numUtils.floatMoney(settleSupplierVO.contractAmount));//合同签订金额（元）
    //合同执行信息
    $("#"+divId+" [name='entryWeight']").text(numUtils.floatWeight(settleSupplierVO.entryWeight));//入库重量（吨）
    $("#"+divId+" [name='facotryRebate']").text(numUtils.floatMoney(settleSupplierVO.facotryRebate));//钢厂返利
    $("#"+divId+" [name='goodsAmount']").text(numUtils.floatMoney(settleSupplierVO.goodsAmount));//已付货款（元）
    $("#"+divId+" [name='goodsInvoiceWeight']").text(numUtils.floatWeight(settleSupplierVO.goodsInvoiceWeight));//上家货款进项票重量（吨）
    $("#"+divId+" [name='goodsInvoiceAmount']").text(numUtils.floatMoney(settleSupplierVO.goodsInvoiceAmount));//上家货款进项票金额（元）
    $("#"+divId+" [name='carrierAmount']").text(numUtils.floatMoney(settleSupplierVO.carrierAmount));//已付运费（元）
    $("#"+divId+" [name='carrierInvoiceWeight']").text(numUtils.floatWeight(settleSupplierVO.carrierInvoiceWeight));//物流进项票重量（吨）
    $("#"+divId+" [name='carrierInvoiceAmount']").text(numUtils.floatMoney(settleSupplierVO.carrierInvoiceAmount));//物流进项票金额（元）
    $("#"+divId+" [name='warehouseAmount']").text(numUtils.floatMoney(settleSupplierVO.warehouseAmount));//已付仓储费（元）
    $("#"+divId+" [name='warehouseInvoiceWeight']").text(numUtils.floatWeight(settleSupplierVO.warehouseInvoiceWeight));//仓储进项票重量（吨）
    $("#"+divId+" [name='warehouseInvoiceAmount']").text(numUtils.floatMoney(settleSupplierVO.warehouseInvoiceAmount));//仓储进项票金额（元）
    //钢厂结算信息
    $("#"+divId+" [name='goodsSettleWeight']").text(numUtils.floatWeight(settleSupplierVO.goodsSettleWeight));//货款结算重量（吨）
    $("#"+divId+" [name='goodsSettleUnitPrice']").text(numUtils.floatMoney(settleSupplierVO.goodsSettleUnitPrice));//货款结算单价(元/吨）
    $("#"+divId+" [name='goodsSettleAmount']").text(numUtils.floatMoney(settleSupplierVO.goodsSettleAmount));//货款结算金额(元）
    $("#"+divId+" [name='facCarrierSettleWeight']").text(numUtils.floatWeight(settleSupplierVO.facCarrierSettleWeight));//钢厂代付物流结算重量（吨）
    $("#"+divId+" [name='facCarrierSettleUnitPrice']").text(numUtils.floatMoney(settleSupplierVO.facCarrierSettleUnitPrice));//钢厂代付物流结算单价(元/吨）
    $("#"+divId+" [name='facCarrierSettleAmount']").text(numUtils.floatMoney(settleSupplierVO.facCarrierSettleUnitPrice));//钢厂代付物流结算金额(元）
    $("#"+divId+" [name='supplierSettleAmount']").text(numUtils.floatMoney(settleSupplierVO.supplierSettleAmount));//采购货款结余（元）

    //顺带添加字段
    $("#"+divId+" [name='carrierSettleAmount']").text(numUtils.floatMoney(settleSupplierVO.carrierSettleAmount));//物流结算总金额（元）
    $("#"+divId+" [name='carrierSurplus']").text(numUtils.floatMoney(settleSupplierVO.carrierSurplus));//采购运费结余（元）
    $("#"+divId+" [name='warehouseSettleAmount']").text(numUtils.floatMoney(settleSupplierVO.warehouseSettleAmount));//仓储结算总金额（元）
    $("#"+divId+" [name='warehouseSurplus']").text(numUtils.floatMoney(settleSupplierVO.warehouseSurplus));//采购仓储结余（元）

    var tbody = '<tr><td colspan="6">暂无数据！</td></tr>';
    var td = '';
    if(settleSupplierVO.settleType == 1 ){
        //物流结算信息
        if(settleSupplierJson.oneCarrierList.length > 0){
            tbody = '';
        }
        for (var i=0;i<settleSupplierJson.oneCarrierList.length;i++)
        {
            if(settleSupplierJson.oneCarrierList[i].costType == 1){
                td = '<td>运费</td>';
            }else if(settleSupplierJson.oneCarrierList[i].costType == 2){
                td = '<td>杂费</td>';
            }else if(settleSupplierJson.oneCarrierList[i].costType == 3){
                td = '<td>转库费</td>';
            }
            var tr = '<tr><td>' + settleSupplierJson.oneCarrierList[i].carrierName + '</td>' +
            td + '<td>' + numUtils.floatMoney(settleSupplierJson.oneCarrierList[i].taxesRate) + '</td>' +
            '<td>' + numUtils.floatWeight(settleSupplierJson.oneCarrierList[i].weight) + '</td>' +
            '<td>' + numUtils.floatMoney(settleSupplierJson.oneCarrierList[i].unitPrice) + '</td>' +
            '<td>' + numUtils.floatMoney(settleSupplierJson.oneCarrierList[i].settleMoney) + '</td></tr>';
            tbody += tr;
        }
        $("#"+divId+" [name='carrierTbody']").html("");
        $("#"+divId+" [name='carrierTbody']").append(tbody);
        tbody = '<tr><td colspan="6">暂无数据！</td></tr>';
        td = '';
        //仓储结算信息
        if(settleSupplierJson.oneWarehouseList.length > 0){
            tbody = '';
        }
        for (var i=0;i<settleSupplierJson.oneWarehouseList.length;i++)
        {
            if(settleSupplierJson.oneWarehouseList[i].costType == 1){
                td = '<td>加工费</td>';
            }else if(settleSupplierJson.oneWarehouseList[i].costType == 2){
                td = '<td>仓储费</td>';
            }else if(settleSupplierJson.oneWarehouseList[i].costType == 3){
                td = '<td>超期堆存费</td>';
            }else if(settleSupplierJson.oneWarehouseList[i].costType == 4){
                td = '<td>仓储服务费</td>';
            }else if(settleSupplierJson.oneWarehouseList[i].costType == 5){
                td = '<td>转库费</td>';
            }
            var tr = '<tr><td>' + settleSupplierJson.oneWarehouseList[i].warehouseName + '</td>' +
                td + '<td>' + numUtils.floatMoney(settleSupplierJson.oneWarehouseList[i].taxesRate) + '</td>' +
                '<td>' + numUtils.floatWeight(settleSupplierJson.oneWarehouseList[i].weight) + '</td>' +
                '<td>' + numUtils.floatMoney(settleSupplierJson.oneWarehouseList[i].unitPrice) + '</td>' +
                '<td>' + numUtils.floatMoney(settleSupplierJson.oneWarehouseList[i].settleMoney) + '</td></tr>';
            tbody += tr;
        }
        $("#"+divId+" [name='warehouseTbody']").html("");
        $("#"+divId+" [name='warehouseTbody']").append(tbody);
    }else{
        //物流结算信息
        if(settleSupplierJson.twiceCarrierList.length > 0){
            tbody = '';
        }
        for (var i=0;i<settleSupplierJson.twiceCarrierList.length;i++)
        {
            if(settleSupplierJson.twiceCarrierList[i].costType == 1){
                td = '<td>运费</td>';
            }else if(settleSupplierJson.twiceCarrierList[i].costType == 2){
                td = '<td>杂费</td>';
            }else if(settleSupplierJson.twiceCarrierList[i].costType == 3){
                td = '<td>转库费</td>';
            }
            var tr = '<tr><td>' + settleSupplierJson.twiceCarrierList[i].carrierName + '</td>' +
                td + '<td>' + numUtils.floatMoney(settleSupplierJson.twiceCarrierList[i].taxRate) + '</td>' +
                '<td>' + numUtils.floatWeight(settleSupplierJson.twiceCarrierList[i].weight) + '</td>' +
                '<td>' + numUtils.floatMoney(settleSupplierJson.twiceCarrierList[i].unitPrice) + '</td>' +
                '<td>' + numUtils.floatMoney(settleSupplierJson.twiceCarrierList[i].settleMoney) + '</td></tr>';
            tbody += tr;
        }
        $("#"+divId+" [name='carrierTbody']").html("");
        $("#"+divId+" [name='carrierTbody']").append(tbody);
        tbody = '<tr><td colspan="6">暂无数据！</td></tr>';
        td = '';
        //仓储结算信息
        if(settleSupplierJson.twiceWarehouseList.length > 0){
            tbody = '';
        }
        for (var i=0;i<settleSupplierJson.twiceWarehouseList.length;i++)
        {
            if(settleSupplierJson.twiceWarehouseList[i].costType == 1){
                td = '<td>加工费</td>';
            }else if(settleSupplierJson.twiceWarehouseList[i].costType == 2){
                td = '<td>仓储费</td>';
            }else if(settleSupplierJson.twiceWarehouseList[i].costType == 3){
                td = '<td>超期堆存费</td>';
            }else if(settleSupplierJson.twiceWarehouseList[i].costType == 4){
                td = '<td>仓储服务费</td>';
            }else if(settleSupplierJson.twiceWarehouseList[i].costType == 5){
                td = '<td>转库费</td>';
            }
            var tr = '<tr><td>' + settleSupplierJson.twiceWarehouseList[i].warehouseName + '</td>' +
                td + '<td>' + numUtils.floatMoney(settleSupplierJson.twiceWarehouseList[i].taxRate) + '</td>' +
                '<td>' + numUtils.floatWeight(settleSupplierJson.twiceWarehouseList[i].weight) + '</td>' +
                '<td>' + numUtils.floatMoney(settleSupplierJson.twiceWarehouseList[i].unitPrice) + '</td>' +
                '<td>' + numUtils.floatMoney(settleSupplierJson.twiceWarehouseList[i].settleMoney) + '</td></tr>';
            tbody += tr;
        }
        $("#"+divId+" [name='warehouseTbody']").html("");
        $("#"+divId+" [name='warehouseTbody']").append(tbody);
    }

}

function returnCarrierOption() {
    var option = '<option>请选择物流供应商</option>';
    for(var i = 0; i < carrierCompany.length; i++){
        option += '<option value="'+ carrierCompany[i].carrierId +'">' + carrierCompany[i].carrierName + '</option>' ;
    }
    return option;
}


function addTr() {

    var tr = '<tr>\n<td>\n<select class="form-control chosen-select">\n' + returnCarrierOption() + '</select>\n' +
        '        </td>\n' +
        '        <td>\n' +
        '        <select class="form-control">\n' +
        '        <option value="1">运费</option>\n' +
        '        <option value="2">杂费</option>\n' +
        '        <option value="3">转库费</option>\n' +
        '        </select>\n' +
        '        </td>\n' +
        '        <td>\n' +
        '        <select class="form-control">\n' +
        '        <option>0.10</option>\n' +
        '        <option>0.06</option>\n' +
        '        </select>\n' +
        '        </td>\n' +
        '        <td><input type="text" class="form-control" value=""></td>\n' +
        '        <td><input type="text" class="form-control" value=""></td>\n' +
        '        <td><input type="text" class="form-control" value=""></td>\n' +
        '        <td>\n' +
        '        <button type="button" class="btn btn-primary btn-xs" onclick="addTr()">+</button>\n' +
        '        <button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeTr()">-</button>\n' +
        '        </td>\n' +
        '        </tr>';
    $("#carrierCompany").append(tr);
}


function sub() {
    $.ajax({
        url:'/zall/chain/purchase/settleSupplier/sub',
        // contentType:'application/json',
        type:'POST',
        // dataType: "json",
        data:{"carrierCompany":JSON.stringify(carrierCompany),"warehouseCompany":JSON.stringify(warehouseCompany)},
        success: function(result) {
        }
    });
}