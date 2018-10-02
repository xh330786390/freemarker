
function returnCarrierTr() {
    var option = '<option>请选择物流供应商</option>';
    if(!carrierPayOrSettle){
        addCarrierEasyTr();
    }else{
        for(var i = 0; i < settleCarrierVOS.length; i++){
            option = '';
            option += '<option value="'+ settleCarrierVOS[i].carrierId +'">' + settleCarrierVOS[i].carrierName + '</option>' ;
            var tr = '<tr>\n<td>\n<select class="form-control chosen-select">\n' + option + '</select>\n' +
                '        </td>\n' +
                '        <td>\n' ;
            if(settleCarrierVOS[i].costType == 1){
                option = '<option value="1">运费</option>\n';
            }else if(settleCarrierVOS[i].costType == 2){
                option = '<option value="2">杂费</option>\n';
            }else{
                option = '<option value="3">转库费</option>\n';
            }
            tr = tr +
                '        <select class="form-control">\n' +
                option +
                '        </select>\n' +
                '        </td>\n' +
                '        <td>\n' +
                '        <select class="form-control">\n' +
                '        <option>' + numUtils.floatMoney(settleWarehouseVOS[i].taxesRate) + '</option>\n' +
                '        </select>\n' +
                '        </td>\n' +
                '        <td><input type="text" class="form-control" value="' + numUtils.floatWeight(settleCarrierVOS[i].weight) + '"></td>\n' +
                '        <td><input type="text" class="form-control" value="' + numUtils.floatMoney(settleCarrierVOS[i].unitPrice) + '"></td>\n' +
                '        <td><input type="text" class="form-control" value="' + numUtils.floatMoney(settleCarrierVOS[i].settleMoney) + '"></td>\n' +
                '        <td>\n' +
                '        <button type="button" class="btn btn-primary btn-xs" onclick="addCarrierEasyTr()">+</button>\n' +
                '        <button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeCarrierTr()">-</button>\n' +
                '        </td>\n' +
                '        </tr>';
            $("#carrierList").append(tr);
        }
    }
}

function returnWarehouseTr() {
    var option = '<option>请选择仓储供应商</option>';
    if(!warehousePayOrSettle){
        addWarehouseEasyTr();
    }else{
        for(var i = 0; i < settleWarehouseVOS.length; i++){
            option = '';
            option += '<option value="'+ settleWarehouseVOS[i].warehouseId +'">' + settleWarehouseVOS[i].warehouseName + '</option>' ;
            var tr = '<tr>\n<td>\n<select class="form-control chosen-select">\n' + option + '</select>\n' +
                '        </td>\n' +
                '        <td>\n' ;
            if(settleWarehouseVOS[i].costType == 1){
                option = '<option value="1">加工费</option>\n';
            }else if(settleWarehouseVOS[i].costType == 2){
                option = '<option value="2">仓储费</option>\n';
            }else if(settleWarehouseVOS[i].costType == 3){
                option = '<option value="3">超期堆存费</option>\n';
            }else if((settleWarehouseVOS[i].costType == 4)){
                option = '<option value="2">仓储服务费</option>\n';
            }else{
                option = '<option value="2">转库费</option>\n';
            }
            tr = tr +
                '        <select class="form-control">\n' +
                option +
                '        </select>\n' +
                '        </td>\n' +
                '        <td>\n' +
                '        <select class="form-control">\n' +
                '        <option>' + numUtils.floatMoney(settleWarehouseVOS[i].taxesRate) + '</option>\n' +
                '        </select>\n' +
                '        </td>\n' +
                '        <td><input type="text" class="form-control" value="' + numUtils.floatWeight(settleWarehouseVOS[i].weight) + '"></td>\n' +
                '        <td><input type="text" class="form-control" value="' + numUtils.floatMoney(settleWarehouseVOS[i].unitPrice) + '"></td>\n' +
                '        <td><input type="text" class="form-control" value="' + numUtils.floatMoney(settleWarehouseVOS[i].settleMoney) + '"></td>\n' +
                '        <td>\n' +
                '        <button type="button" class="btn btn-primary btn-xs" onclick="addWarehouseEasyTr()">+</button>\n' +
                '        <button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeWarehouseTr()">-</button>\n' +
                '        </td>\n' +
                '        </tr>';
            $("#warehouseList").append(tr);
        }
    }
}


function addCarrierEasyTr() {
    var option = '<option>请选择物流供应商</option>';
    for(var i = 0; i < carrierVOS.length; i++){
        option += '<option value="'+ carrierVOS[i].carrierId +'">' + carrierVOS[i].carrierName + '</option>' ;
    }
    var tr = '<tr>\n<td>\n<select class="form-control chosen-select">\n' + option + '</select>\n' +
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
        '        <button type="button" class="btn btn-primary btn-xs" onclick="addCarrierEasyTr()">+</button>\n' +
        '        <button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeCarrierTr()">-</button>\n' +
        '        </td>\n' +
        '        </tr>';
    $("#carrierList").append(tr);
}

function addWarehouseEasyTr() {

    var option = '<option>请选择仓储供应商</option>';
    for(var i = 0; i < warehouseVOS.length; i++){
        option += '<option value="'+ warehouseVOS[i].warehouseId +'">' + warehouseVOS[i].warehouseName + '</option>' ;
    }
    var tr = '<tr>\n<td>\n<select class="form-control chosen-select">\n' + option + '</select>\n' +
        '        </td>\n' +
        '        <td>\n' +
        '        <select class="form-control">\n' +
        '        <option value="1">加工费</option>\n' +
        '        <option value="2">仓储费</option>\n' +
        '        <option value="3">超期堆存费</option>\n' +
        '        <option value="4">仓储服务费</option>\n' +
        '        <option value="5">转库费</option>\n' +
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
        '        <button type="button" class="btn btn-primary btn-xs" onclick="addWarehouseEasyTr()">+</button>\n' +
        '        <button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeWarehouseTr()">-</button>\n' +
        '        </td>\n' +
        '        </tr>';
    $("#warehouseList").append(tr);
}

function removeCarrierTr() {
    if($("#carrierList tr").length <=1){
        alert("就剩一个了，不要再删了吧！^_^")
    }else {
        $("#carrierList tr:last").remove();
    }
}

function removeWarehouseTr() {
    if($("#warehouseList tr").length <=1){
        alert("就剩一个了，不要再删了吧！^_^")
    }else {
        $("#warehouseList tr:last").remove();
    }
}

//添加
function create(){
    //获取合同结转添加参数
    var settleSupplier = getSettleCustomer();

    $.ajax({
        url:'/zall/chain/purchase/settleSupplier/create',
        type:'POST',
        data:settleSupplier,
        success: function() {
            window.location.href= "/zall/chain/purchase/settleSupplier/queryList?contractCode=" + settleSupplier.contractCode;
        }
    });
}

//获取合同结转添加参数
function getSettleCustomer(){
    var settleSupplierJson = {};
    settleSupplierJson.businessType = $("#businessType").val();//业务类型
    settleSupplierJson.contractType = $("#contractType").val();//合同类型
    settleSupplierJson.contractCode = $("#contractCode").text().trim();//合同编号
    settleSupplierJson.supplierCode = $("#supplierCode").val();//采购合同编号
    settleSupplierJson.supplierId = $("#supplierId").val();//客户公司Id
    settleSupplierJson.supplierName = $("#supplierName").text().trim();//客户公司名称
    settleSupplierJson.contractWeight = $("#contractWeight").text().trim() * 10000;//合同签订重量
    settleSupplierJson.contractAmount = $("#contractAmount").text().trim() * 100;//合同签订金额
    settleSupplierJson.entryWeight = $("#entryWeight").text().trim() * 10000;//入库重量
    settleSupplierJson.facotryRebate = $("#facotryRebate").val() * 100;//钢厂返利
    settleSupplierJson.goodsAmount = $("#goodsAmount").text().trim() * 100;//已付货款
    settleSupplierJson.goodsInvoiceWeight = $("#goodsInvoiceWeight").text().trim() * 10000;//上家货款进项票重量（吨）
    settleSupplierJson.goodsInvoiceAmount = $("#goodsInvoiceAmount").text().trim() * 100;//上家货款进项票金额（元）
    settleSupplierJson.payCarrier = $("#payCarrier").text().trim() * 100;//已付运费
    settleSupplierJson.carrierInvoiceWeight = $("#carrierInvoiceWeight").text().trim() * 10000;//物流进项票重量（吨）
    settleSupplierJson.carrierInvoiceAmount = $("#carrierInvoiceAmount").text().trim() * 100;//物流进项票金额（元）
    settleSupplierJson.payWarehouse = $("#payWarehouse").text().trim() * 100;//已付仓储费
    settleSupplierJson.warehouseInvoiceWeight = $("#warehouseInvoiceWeight").text().trim() * 10000;//仓储进项票重量（吨）
    settleSupplierJson.warehouseInvoiceAmount = $("#warehouseInvoiceAmount").text().trim() * 100;//仓储进项票金额（元）
    settleSupplierJson.goodsSettleWeight = $("#goodsSettleWeight").val().trim() * 10000;//货款结算重量（吨）
    settleSupplierJson.goodsSettleUnitPrice = $("#goodsSettleUnitPrice").val().trim() * 100;//货款结算单价(元/吨）
    settleSupplierJson.goodsSettleAmount = $("#goodsSettleAmount").val().trim() * 100;//货款结算金额(元）
    settleSupplierJson.facCarrierSettleWeight = $("#facCarrierSettleWeight").val().trim() * 10000;//钢厂代付物流结算重量（吨）
    settleSupplierJson.facCarrierSettleUnitPrice = $("#facCarrierSettleUnitPrice").val().trim() * 100;//钢厂代付物流结算单价(元/吨）
    settleSupplierJson.facCarrierSettleAmount = $("#facCarrierSettleAmount").val().trim() * 100;//钢厂代付物流结算金额(元）
    settleSupplierJson.supplierSettleAmount = $("#supplierSettleAmount").text().trim() * 100 - ($("#goodsSettleAmount").val().trim() * 100)
        - $("#facCarrierSettleAmount").val().trim() * 100         ;//采购货款结余（元）
    // settleSupplierJson.carrierSettleAmount = $("#carrierSettleAmount").text().trim() * 100;//物流结算总金额（元）
    // settleSupplierJson.warehouseSettleAmount = $("#warehouseSettleAmount").text().trim() * 100;//仓储结算总金额(元）
    // settleSupplierJson.warehouseSurplus = $("#warehouseSurplus").text().trim() * 100 - $("#warehouseSettleAmount").text().trim() * 100;//采购仓储费结余(元）

    settleSupplierJson.settleType = $("#settleType").val();//结算类型
    settleSupplierJson.remark = $("#remark").val();//备注

    getSettleSupplierCarrier(settleSupplierJson);//合同结算物流明细
    getSettleSupplierWarehouse(settleSupplierJson);//合同结算仓储明细

    console.info(JSON.stringify(settleSupplierJson))

    return settleSupplierJson;
}

//获取合同结算物流明细
function getSettleSupplierCarrier(json){
    var count = $("#carrierList").find("tr").length;
    var currentId;
    // var carrierPayMoney = $("#carrierSurplus").text().trim() * 100;
    var carrierPayMoney = $("#payCarrier").text().trim() * 100;
    var allAmount = 0;
    var settleMoney = 0;
    $('#carrierList tr').each(function(i){ // 遍历 tr
        $(this).children('td').each(function(j){  // 遍历 tr 的各个 td
            if(j == 0){
                currentId = $(this).find("select :selected").val();
                text = $(this).find("select :selected").text();
                json["settleSupplierCarrierVOS["+(i)+"].carrierId"] = currentId  ;//物流公司id
                json["settleSupplierCarrierVOS["+(i)+"].carrierName"] = text  ;//物流公司名称
            }
            if(j == 1){
                text = $(this).find("select :selected").val();
                json["settleSupplierCarrierVOS["+(i)+"].costType"] =  text ;//费用类型
            }
            if(j == 2){
                text = $(this).find("select :selected").text() * 100;
                json["settleSupplierCarrierVOS["+(i)+"].taxesRate"] = text ;//税率
            }
            if(j == 3){
                var text = $(this).find("input").val() * 10000;
                json["settleSupplierCarrierVOS["+(i)+"].weight"] = text ;//结算重量
            }
            if(j == 4){
                var text = $(this).find("input").val() * 100 ;
                json["settleSupplierCarrierVOS["+(i)+"].unitPrice"] = text ;//结算单价
            }
            if(j == 5){
                var text = $(this).find("input").val() * 100;
                allAmount = allAmount + text;
                json["settleSupplierCarrierVOS["+(i)+"].settleMoney"] = text ;//结算金额
            }
        });
    });
    settleMoney = carrierPayMoney - allAmount;
    json.carrierSettleAmount = allAmount;
    json.carrierSurplus = settleMoney;
}

function getSettleSupplierWarehouse(json){
    var count = $("#warehouseList").find("tr").length;
    var currentId;
    var payWarehouse = $("#payWarehouse").text().trim() * 100;//已付仓储费
    // var payWarehouse = $("#warehouseSurplus").text().trim() * 100;
    var allAmount = 0;
    var settleMoney = 0;
    $('#warehouseList tr').each(function(i){ // 遍历 tr
        $(this).children('td').each(function(j){  // 遍历 tr 的各个 td
            if(j == 0){
                currentId = $(this).find("select :selected").val();
                text = $(this).find("select :selected").text();
                json["settleSupplierWarehouseVOS["+(i)+"].warehouseId"] = currentId ;//仓储供应商id
                json["settleSupplierWarehouseVOS["+(i)+"].warehouseName"] = text ;//仓储供应商名称
            }
            if(j == 1){
                text = $(this).find("select :selected").val();
                json["settleSupplierWarehouseVOS["+(i)+"].costType"] = text ;//费用类型
            }
            if(j == 2){
                text = $(this).find("select :selected").text() * 100;
                json["settleSupplierWarehouseVOS["+(i)+"].taxesRate"] = text ;//税率
            }
            if(j == 3){
                var text = $(this).find("input").val() * 10000;
                json["settleSupplierWarehouseVOS["+(i)+"].weight"] =  text ;//结算重量
            }
            if(j == 4){
                var text = $(this).find("input").val() * 100;
                json["settleSupplierWarehouseVOS["+(i)+"].unitPrice"] = text ;//结算单价
            }
            if(j == 5){
                var text = $(this).find("input").val() * 100;
                allAmount = allAmount + text;
                json["settleSupplierWarehouseVOS["+(i)+"].settleMoney"] = text ;//结算金额
            }
        });
    });
    settleMoney = payWarehouse - allAmount;
    json.warehouseSettleAmount = allAmount;
    json.warehouseSurplus = settleMoney;
}



$(function(){
    returnCarrierTr();
    returnWarehouseTr();
})