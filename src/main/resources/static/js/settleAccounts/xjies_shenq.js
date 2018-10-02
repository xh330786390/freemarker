var settleCarriers;//物流公司
var settleWarehouses;//仓储公司
var numbercount;
var numId = 0;

$(function(){
    var settleType = $("#settleType").val();//结算方式
    var contractCode = $("#contractCode").text().trim();//合同编号

    $.ajax({
        url:'/zall/chain/purchase/settleCustomer/getSettleApplyInfo',
        type:'POST',
        data:{
            "supplierOrCustomer":2,
            "settleType":1,
            "contractCode":contractCode
        },
        success: function(result) {
            //标识：物流数据；true --> 从付款表或者结算表（上下家）中获取的数据;false --> 从物流库中获取的数据
            var carrierPayOrSettle = result.carrierPayOrSettle;
            //标识：仓储数据；true --> 从付款表或者结算表（上下家）中获取的数据;false --> 从仓储库中获取的数据
            var warehousePayOrSettle = result.warehousePayOrSettle;

            numbercount = 1;

            //物流供应商结算明细 赋值
            returnCarrierTr(carrierPayOrSettle,result.settleCarrierVOS);

            //仓储供应商结算明细 赋值
            returnWarehouseTr(warehousePayOrSettle,result.settleWarehouseVOS);

        }
    });
})

//物流供应商结算明细 赋值
function returnCarrierTr(carrierPayOrSettle,settleCarrierVOS) {
    var money = 0;
    var option = '<option>请选择物流供应商</option>';
    if(!carrierPayOrSettle ){
        settleCarriers = settleCarrierVOS;
        addCarrierEasyTr(settleCarrierVOS);
    }else{
        if(settleCarrierVOS.size > 0){
            for(var i = 0; i < settleCarrierVOS.length; i++){
                numId ++ ;//自动计数

                option = '';
                option += '<option value="'+ settleCarrierVOS[i].carrierId +'">' + settleCarrierVOS[i].carrierName + '</option>' ;
                var tr = '<tr><td><select class="form-control chosen-select">' + option + '</select></td>' ;
                if(settleCarrierVOS[i].costType == 1){
                    option = '<option value="1">运费</option>';
                }else if(settleCarrierVOS[i].costType == 2){
                    option = '<option value="2">杂费</option>';
                }else{
                    option = '<option value="3">转库费</option>';
                }
                tr = tr +'<td><select class="form-control">' + option + '</select></td>' +
                    '<td>' +
                    '<select class="form-control">' +
                    '<option>0.10</option>' +
                    '<option>0.06</option>' +
                    '</select>' +
                    '</td>' +
                    '<td><input type="text" id="logisticsW'+numId+'" onchange="logistics('+numId+')" class="form-control" value="' + numUtils.floatWeight(settleCarrierVOS[i].weight) + '" onkeyup="clearNoNum(this,0,4)" onblur="clearNoNum(this,1,4)"></td>' +
                    '<td><input type="text" id="logisticsP'+numId+'" onchange="logistics('+numId+')" class="form-control" value="' + numUtils.floatMoney(settleCarrierVOS[i].unitPrice) + '" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                    '<td><input type="text" id="logisticsS'+numId+'" class="form-control getCarrierTotal" value="' + numUtils.floatMoney(settleCarrierVOS[i].settleMoney) + '" onblur="getCarrierTotal()" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-primary btn-xs" onclick="addCarrier()">+</button>' +
                    '<button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeCarrierTr()">-</button>' +
                    '</td></tr>';
                $("#carrierList").append(tr);

                //计算总金额
                if(settleCarrierVOS[i].settleMoney != null){
                    money += settleCarrierVOS[i].settleMoney;
                }
            }
        }else{
            addCarrier()
        }
    }
    $("#carrierSettleAmount").text(money);
}

//仓储供应商结算明细 赋值
function returnWarehouseTr(warehousePayOrSettle,settleWarehouseVOS) {
    var money = 0;
    var option = '<option>请选择仓储供应商</option>';
    if(!warehousePayOrSettle){
        settleWarehouses = settleWarehouseVOS;
        addWarehouseEasyTr(settleWarehouseVOS);
    }else{
        if(settleWarehouseVOS.size > 0){
            for(var i = 0; i < settleWarehouseVOS.length; i++){
                numId ++ ;//自动计数

                option = '';
                option += '<option value="'+ settleWarehouseVOS[i].warehouseId +'">' + settleWarehouseVOS[i].warehouseName + '</option>' ;
                var tr = '<tr><td><select class="form-control chosen-select">' + option + '</select></td>';
                if(settleWarehouseVOS[i].costType == 1){
                    option = '<option value="1">加工费</option>';
                }else if(settleWarehouseVOS[i].costType == 2){
                    option = '<option value="2">仓储费</option>';
                }else if(settleWarehouseVOS[i].costType == 3){
                    option = '<option value="3">超期堆存费</option>';
                }else if((settleWarehouseVOS[i].costType == 4)){
                    option = '<option value="2">仓储服务费</option>';
                }else{
                    option = '<option value="2">转库费</option>';
                }
                tr = tr +
                    '<td><select class="form-control">' + option + '</select></td>' +
                    '<td>' +
                    '<select class="form-control">' +
                    '<option>0.10</option>' +
                    '<option>0.06</option>' +
                    '</select>' +
                    '</td>' +
                    '<td><input type="text" id="storageW'+numId+'" onchange="storage('+numId+')" class="form-control" value="' + numUtils.floatWeight(settleWarehouseVOS[i].weight) + '" onkeyup="clearNoNum(this,0,4)" onblur="clearNoNum(this,1,4)"></td>' +
                    '<td><input type="text" id="storageP'+numId+'" onchange="storage('+numId+')" class="form-control" value="' + numUtils.floatMoney(settleWarehouseVOS[i].unitPrice) + '" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                    '<td><input type="text" id="storageS'+numId+'" class="form-control getWarehouseTotal" value="' + numUtils.floatMoney(settleWarehouseVOS[i].settleMoney) + '" onblur="getWarehouseTotal()" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-primary btn-xs" onclick="addWarehouse()">+</button>' +
                    '<button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeWarehouseTr()">-</button>' +
                    '</td>' +
                    '</tr>';
                $("#warehouseList").append(tr);
                //计算总金额
                if(settleWarehouseVOS[i].settleMoney != null){
                    money += settleWarehouseVOS[i].settleMoney;
                }
            }
        }else{
            addWarehouse();
        }
    }
    $("#warehouseSettleAmount").val(money);
}

//region************************** start 新增行***************************/
//查询物流供应商 新增一行
function addCarrier(){
    if(settleCarriers != null){
        //物流供应商结算明细 赋值
        addCarrierEasyTr(settleCarriers);
    }else{
        $.ajax({
            url:'/zall/chain/purchase/settleCustomer/getCarriers',
            type:'POST',
            data:{},
            success: function(result) {
                numbercount = 0;
                settleCarriers = result.carrierVOs;

                //物流供应商结算明细 赋值
                addCarrierEasyTr(result.carrierVOs);
            }
        });
    }
}

//查询仓储供应商 新增一行
function addWarehouse(){
    if(settleWarehouses != null ){
        addWarehouseEasyTr(settleWarehouses);
    }else{
        $.ajax({
            url:'/zall/chain/purchase/settleCustomer/getWarehouses',
            type:'POST',
            data:{},
            success: function(result) {
                numbercount = 0;
                settleWarehouses = result.warehouseVOs;

                //物流供应商结算明细 赋值
                addWarehouseEasyTr(result.warehouseVOs);
            }
        });
    }
}

//新增一行物流供应商结算明细
function addCarrierEasyTr(settleCarrierVOS) {
    numId ++ ;//自动计数

    var option = '<option>请选择物流供应商</option>';
    for(var i = 0; i < settleCarrierVOS.length; i++){
        if(numbercount == 1){
            option += '<option value="'+ settleCarrierVOS[i].carrierId +'">' + settleCarrierVOS[i].carrierName + '</option>' ;
        }else{
            option += '<option value="'+ settleCarrierVOS[i].id +'">' + settleCarrierVOS[i].companyName + '</option>' ;
        }
    }
    var tr = '<tr>' +
                '<td><select class="form-control chosen-select">' + option + '</select></td>' +
                '<td>' +
                    '<select class="form-control">' +
                        '<option value="1">运费</option>' +
                        '<option value="2">杂费</option>' +
                        '<option value="3">转库费</option>' +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<select class="form-control">' +
                        '<option>0.10</option>' +
                        '<option>0.06</option>' +
                    '</select>' +
                '</td>' +
                '<td><input type="text" id="logisticsW'+numId+'" onchange="logistics('+numId+')" class="form-control" onkeyup="clearNoNum(this,0,4)" onblur="clearNoNum(this,1,4)"></td>' +
                '<td><input type="text" id="logisticsP'+numId+'" onchange="logistics('+numId+')" class="form-control" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                '<td><input type="text" id="logisticsS'+numId+'" readonly class="form-control getCarrierTotal" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                '<td>' +
                    '<button type="button" class="btn btn-primary btn-xs" onclick="addCarrier()">+</button>' +
                    '<button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeCarrierTr()">-</button>' +
                '</td>' +
             '</tr>';
    $("#carrierList").append(tr);
}

//新增一行仓储供应商结算明细
function addWarehouseEasyTr(settleWarehouseVOS) {
    numId ++ ;//自动计数

    var option = '<option>请选择仓储供应商</option>';
    for(var i = 0; i < settleWarehouseVOS.length; i++){
        if(numbercount == 1){
            option += '<option value="'+ settleWarehouseVOS[i].warehouseId +'">' + settleWarehouseVOS[i].warehouseName + '</option>' ;
        }else{
            option += '<option value="'+ settleWarehouseVOS[i].id +'">' + settleWarehouseVOS[i].companyName + '</option>' ;
        }
    }
    var tr = '<tr>' +
                '<td><select class="form-control chosen-select">' + option + '</select></td>' +
                '<td>' +
                    '<select class="form-control">' +
                        '<option value="1">加工费</option>' +
                        '<option value="2">仓储费</option>' +
                        '<option value="3">超期堆存费</option>' +
                        '<option value="4">仓储服务费</option>' +
                        '<option value="5">转库费</option>' +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<select class="form-control">' +
                        '<option>0.10</option>' +
                        '<option>0.06</option>' +
                    '</select>' +
                '</td>' +
                '<td><input type="text" id="storageW'+numId+'" onchange="storage('+numId+')" class="form-control" onkeyup="clearNoNum(this,0,4)" onblur="clearNoNum(this,1,4)"></td>' +
                '<td><input type="text" id="storageP'+numId+'" onchange="storage('+numId+')" class="form-control" onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                '<td><input type="text" id="storageS'+numId+'" class="form-control getWarehouseTotal" readonly onkeyup="clearNoNum(this,0,2)" onblur="clearNoNum(this,1,2)"></td>' +
                '<td>' +
                    '<button type="button" class="btn btn-primary btn-xs" onclick="addWarehouse()">+</button>' +
                    '<button type="button" class="btn btn-default btn-xs table-minus-btn" onclick="removeWarehouseTr()">-</button>' +
                '</td>' +
             '</tr>';
    $("#warehouseList").append(tr);
}
//endregion************************** end 新增行******************************/

//region ************************** start 计算金额**************************/
//自动计算 物流供应商结算 金额
function logistics(count){
    calculationAmount('logisticsW'+count,'logisticsP'+count,'logisticsS'+count);
    getCarrierTotal();
}

//计算物流结算总金额
function getCarrierTotal(){
    var money = 0;
    $(".getCarrierTotal").each(function(){
        if($(this).val() != null && $(this).val() != ''){
            money += parseFloat($(this).val());
        }
    })
    $("#carrierSettleAmount").text("");
    $("#carrierSettleAmount").text(money.toFixed(2));
}

//自动计算 仓储供应商结算 金额
function storage(count){
    calculationAmount('storageW'+count,'storageP'+count,'storageS'+count);
    getWarehouseTotal();
}

//计算仓储结算总金额
function getWarehouseTotal(){
    var money = 0;
    $(".getWarehouseTotal").each(function(){
        if($(this).val() != null && $(this).val() != ''){
            money += parseFloat($(this).val());
        }
    })
    $("#warehouseSettleAmount").text("");
    $("#warehouseSettleAmount").text(money.toFixed(2));
}

//自动计算金额
function calculationAmount(multiplierId1,multiplierId2,resultId){
    //@1.乘数1
    var multiplier1 = $("#"+multiplierId1).val();
    if(multiplier1 == null || multiplier1 == ''){
        multiplier1 = 0;
    }
    //@2.乘数2
    var multiplier2 = $("#"+multiplierId2).val();
    if(multiplier2 == null || multiplier2 == ''){
        multiplier2 = 0;
    }
    //@3.乘值
    var result = multiplier1 * multiplier2;
    //@4.赋值
    $("#"+resultId).val(result.toFixed(2));
}

//endregion************************** end 计算金额**************************/

//新增
function create(){
    //获取合同结转添加参数
    var settleCustomer = getSettleCustomer();

    $.ajax({
        url:'/zall/chain/purchase/settleCustomer/create',
        type:'POST',
        data:settleCustomer,
        success: function() {
            var contractCode = $("#contractCode").text().trim();//合同编号
            var contractId = $("#contractId").val();//合同Id
            window.location.href= "/zall/chain/purchase/settleCustomer/queryList?id="+contractId+"&contractCode="+contractCode;
        }
    });
}

//获取合同结算添加参数
function getSettleCustomer(){
    var settleCustomerJson = {};
    settleCustomerJson.businessType = $("#businessType").val();//业务类型
    settleCustomerJson.contractType = $("#contractType").val();//合同类型
    settleCustomerJson.contractCode = $("#contractCode").text().trim();//合同编号
    settleCustomerJson.supplierCode = $("#purchaseContractCode").val();//采购合同编号
    settleCustomerJson.customerId = $("#customerId").val();//客户公司Id
    settleCustomerJson.customerName = $("#customerName").text().trim();//客户公司名称
    settleCustomerJson.supplierId = $("#supplierId").val();//供应商Id
    settleCustomerJson.supplierName = $("#supplierName").text().trim();//供应商名称
    settleCustomerJson.contractWeight = numUtils.longWeight($("#contractWeight").text().trim());//合同签订重量
    settleCustomerJson.contractAmount = numUtils.longMoney($("#contractAmount").text().trim());//合同签订金额
    settleCustomerJson.contractAssureAmount = numUtils.longMoney($("#contractAssureAmount").text().trim());//合同保证金
    //settleCustomerJson.breedCode = $("#breedCode").text().trim();//品种编码
    settleCustomerJson.breed = $("#breed").text().trim();//采购品种
    settleCustomerJson.warehouseId = $("#warehouseId").val();//仓库id
    settleCustomerJson.warehouseName = $("#warehouseName").text().trim();//仓库
    settleCustomerJson.contractLimitTime = getLongTime($("#contractLimitTime").text().trim());//合同到期日
    settleCustomerJson.receiveAmount = numUtils.longMoney($("#receiveAmount").text().trim());//合同总收款
    settleCustomerJson.payGoods = numUtils.longMoney($("#payGoods").text().trim());//已付货款
    settleCustomerJson.payCarrier = numUtils.longMoney($("#payCarrier").text().trim());//已付运费
    settleCustomerJson.payWarehouse = numUtils.longMoney($("#payWarehouse").text().trim());//已付仓储费
    settleCustomerJson.receiveAssureAmount = numUtils.longMoney($("#receiveAssureAmount").text().trim());//已收保证金
    settleCustomerJson.entryWeight = numUtils.longWeight($("#entryWeight").text().trim());//已入库重量
    settleCustomerJson.orderWeight = numUtils.longWeight($("#orderWeight").text().trim());//订单下单量
    settleCustomerJson.sellInvoiceDiff = numUtils.longMoney($("#sellInvoiceDiff").text().trim());//销项票差
    settleCustomerJson.supplierSettleAmount = numUtils.longMoney($("#supplierSettleAmount").text().trim());//采购供应商结算金额
    settleCustomerJson.serviceCost = numUtils.longMoney($("#serviceCost").text().trim());//合同加价服务费
    settleCustomerJson.profit = numUtils.longMoney($("#profit").text().trim());//合同收益
    settleCustomerJson.adjustProfit = numUtils.longMoney($("#adjustProfit").val());//调整后收益
    settleCustomerJson.totalProfit = numUtils.longMoney($("#totalProfit").text().trim());//系统总利润
    settleCustomerJson.facotryRebate = numUtils.longMoney($("#facotryRebate").val());//钢厂返利
    settleCustomerJson.contractSurplus = numUtils.longMoney($("#contractSurplus").text().trim());//合同结余
    settleCustomerJson.goodsInvoiceAmount = numUtils.longMoney($("#goodsInvoiceAmount").text().trim());//货款进项票金额
    settleCustomerJson.carrierInvoiceAmount = numUtils.longMoney($("#carrierInvoiceAmount").text().trim());//物流进项票金额
    settleCustomerJson.warehouseInvoiceAmount = numUtils.longMoney($("#warehouseInvoiceAmount").text().trim());//仓储费进项票金额
    settleCustomerJson.goodsSettleWeight = numUtils.longWeight($("#goodsSettleWeight").val());//货款结算重量
    settleCustomerJson.goodsSettleUnitPrice = numUtils.longMoney($("#goodsSettleUnitPrice").val());//货款结算单价
    settleCustomerJson.goodsSettleAmount = numUtils.longMoney($("#goodsSettleAmount").val());//货款结算金额
    settleCustomerJson.facCarrierSettleWeight = numUtils.longWeight($("#facCarrierSettleWeight").val());//钢厂物流结算重量
    settleCustomerJson.facCarrierSettleUnitPrice = numUtils.longMoney($("#facCarrierSettleUnitPrice").val());//钢厂物流结算单价
    settleCustomerJson.facCarrierSettleAmount = numUtils.longMoney($("#facCarrierSettleAmount").val());//钢厂物流结算金额
    settleCustomerJson.carrierInvoiceDiff = numUtils.longMoney($("#carrierInvoiceDiff").val());//物流票税差
    settleCustomerJson.carrierSettleAmount = numUtils.longMoney($("#carrierSettleAmount").text().trim());//物流结算总金额
    settleCustomerJson.warehouseInvoiceDiff = numUtils.longMoney($("#warehouseInvoiceDiff").val());//仓储票税差
    settleCustomerJson.warehouseSettleAmount = numUtils.longMoney($("#warehouseSettleAmount").text().trim());//仓储结算总金额
    settleCustomerJson.settleType = $("#settleType").val();//结算类型
    settleCustomerJson.remark = $("#remark").val();//备注

    getSettleCustomerCarrier(settleCustomerJson);//合同结算物流明细
    getSettleCustomerWarehouse(settleCustomerJson);//合同结算仓储明细

    return settleCustomerJson;
}

//获取合同结算物流明细
function getSettleCustomerCarrier(json){
    $('#carrierList tr').each(function(i){ // 遍历 tr
        $(this).children('td').each(function(j){  // 遍历 tr 的各个 td
            if(j == 0){
                var text = $(this).find("select :selected").text();
                json["settleCustomerCarrierVOList["+i+"].carrierName"] = text  ;//物流公司名称
                text = $(this).find("select :selected").val();
                json["settleCustomerCarrierVOList["+i+"].carrierId"] = text  ;//物流公司Id
            }
            if(j == 1){
                var text = $(this).find("select :selected").val();
                json["settleCustomerCarrierVOList["+i+"].costType"] =  text ;//费用类型
            }
            if(j == 2){
                var text = $(this).find("select :selected").text() * 100;
                json["settleCustomerCarrierVOList["+i+"].taxesRate"] = text ;//税率
            }
            if(j == 3){
                var text = $(this).find("input").val() * 10000;
                json["settleCustomerCarrierVOList["+i+"].weight"] = text ;//结算重量
            }
            if(j == 4){
                var text = $(this).find("input").val() * 100 ;
                json["settleCustomerCarrierVOList["+i+"].unitPrice"] = text ;//结算单价
            }
            if(j == 5){
                var text = $(this).find("input").val() * 100;
                json["settleCustomerCarrierVOList["+i+"].settleMoney"] = text ;//结算金额
            }
        });
    });
}

//获取合同结算仓储明细
function getSettleCustomerWarehouse(json){
    $('#warehouseList tr').each(function(i){ // 遍历 tr
        $(this).children('td').each(function(j){  // 遍历 tr 的各个 td
            if(j == 0){
                var text = $(this).find("select :selected").text();
                json["settleCustomerWarehouseVOList["+i+"].warehouseName"] = text ;//仓储供应商名称
                text = $(this).find("select :selected").val();
                json["settleCustomerWarehouseVOList["+i+"].warehouseId"] = text ;//仓储供应商Id
            }
            if(j == 1){
                var text = $(this).find("select :selected").val() ;
                json["settleCustomerWarehouseVOList["+i+"].costType"] = text ;//费用类型
            }
            if(j == 2){
                var text = $(this).find("select :selected").text() * 100;
                json["settleCustomerWarehouseVOList["+i+"].taxesRate"] = text ;//税率
            }
            if(j == 3){
                var text = $(this).find("input").val() * 10000;
                json["settleCustomerWarehouseVOList["+i+"].weight"] =  text ;//结算重量
            }
            if(j == 4){
                var text = $(this).find("input").val() * 100;
                json["settleCustomerWarehouseVOList["+i+"].unitPrice"] = text ;//结算单价
            }
            if(j == 5){
                var text = $(this).find("input").val() * 100;
                json["settleCustomerWarehouseVOList["+i+"].settleMoney"] = text ;//结算金额
            }
        });
    });
}

//查询合同结算收益分页
function getContractProfitByPage(){
    //获取查询参数
    var paramJson = getParam();

    $.ajax({
        url:'/zall/chain/purchase/contractProfit/queryByPage',
        type:'POST',
        data:paramJson,
        success: function(result) {
            $("#contractProfitList").html(result);
        }
    });
}

//查询参数
function getParam(){
    var paramJson = {
        pageNum:1,
        pageSize:20,
    };
    //合同编号
    paramJson.contractCode= $("#contractCode").text().trim();

    return paramJson;
}

//查询结算收益列表
function getContractInProfitList(){
    var targetContractCode= $("#contractCode").text().trim();
    $.ajax({
        url:'/zall/chain/purchase/contractInProfit/queryList',
        type:'POST',
        data:{"targetContractCode":targetContractCode},
        success: function(result) {
            var trs = "";
            var num = 0;
            $.each(result.contractInProfitVOs,function(){
                trs += " <tr>" +
                    "<td>"+this.sourceContractCode+"</td>" +
                    "<td>"+numUtils.floatMoney(this.profit)+"</td>" +
                    "<td>"+this.creator+"</td>" +
                    "<td>"+dateFormat(this.createTime)+"</td>" +
                    "<td>"+this.remark+"</td>" +
                    "</tr>";
                num ++;
            })
            if(num == 0){
                trs = "<tr><td colspan='5' style='text-align:center;'>暂无数据</td></tr>";
            }
            $("#contractInProfitList").html(trs);
        }
    });
}



