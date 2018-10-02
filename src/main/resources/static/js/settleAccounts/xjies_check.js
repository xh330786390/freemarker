var settleCustomerJson={};

$(function(){
    //获取合同结算信息
    getSettleCustomer();
})

function getSettleCustomer(){
    var id = $("#id").val();

    $.ajax({
        url:'/zall/chain/purchase/settleCustomer/getByParam',
        type:'POST',
        data:{"id":id},
        success: function(result) {
            var divId = "";
            if(result.settleCustomerVO.settleType == 1){
                settleCustomerJson.one = result.settleCustomerVO;
                settleCustomerJson.oneSettleCustomerCarrierVOs = result.settleCustomerCarrierVOs;
                settleCustomerJson.oneSettleCustomerWarehouseVOs = result.settleCustomerWarehouseVOs;
                $("#one").click();
                $("#twice").hide();
                divId = 'tab-2';
            }else{
                settleCustomerJson.twice = result.settleCustomerVO;
                settleCustomerJson.twiceSettleCustomerCarrierVOs = result.settleCustomerCarrierVOs;
                settleCustomerJson.twiceSettleCustomerWarehouseVOs = result.settleCustomerWarehouseVOs;
                $("#reviewProgress").remove();
                divId = 'tab-1';
                $("#remark").text(result.settleCustomerVO.remark);//备注
            }
            //基础数据赋值
            assignment(result.settleCustomerVO)
            //物流供应商结算明细列表赋值
            settleCustomerCarrierTable(result.settleCustomerCarrierVOs,result.settleCustomerVO.carrierInvoiceDiff,divId);
            //合同结算仓储明细列表赋值
            settleCustomerWarehouseTable(result.settleCustomerWarehouseVOs,result.settleCustomerVO.warehouseInvoiceDiff,divId)
        }
    });
}

//切换结算方式
function getSettleCustomerSwitch(num){
    var contractCode = $("#contractCode").val();
    if(num == 1){
        if(settleCustomerJson.one != null){
            assignment(settleCustomerJson.one);
        }else{
            $.ajax({
                url:'/zall/chain/purchase/settleCustomer/getByParam',
                type:'POST',
                data:{
                    "contractCode":contractCode,
                    "settleType":1,
                    "auditStatus":2
                },
                success: function(result) {
                    settleCustomerJson.one = result.settleCustomerVO;
                    settleCustomerJson.oneSettleCustomerCarrierVOs = result.settleCustomerCarrierVOs;
                    settleCustomerJson.oneSettleCustomerWarehouseVOs = result.settleCustomerWarehouseVOs;

                    //基础数据赋值
                    assignment(result.settleCustomerVO)
                    //物流供应商结算明细列表赋值
                    settleCustomerCarrierTable(result.settleCustomerCarrierVOs,result.settleCustomerVO.carrierInvoiceDiff,"tab-2");
                    //合同结算仓储明细列表赋值
                    settleCustomerWarehouseTable(result.settleCustomerWarehouseVOs,result.settleCustomerVO.warehouseInvoiceDiff,"tab-2")
                }
            });
        }
    }else{
        //基础数据
        assignment(settleCustomerJson.twice);
    }
}

//基础数据赋值
function assignment(settleCustomerVO){
    var divId;
    if(settleCustomerVO.settleType == 1){
        divId = 'tab-2';
    }else{
        divId = 'tab-1';
    }
    $("#"+divId+" [name='contractCode']").text(settleCustomerVO.contractCode);//合同编号
    $("#"+divId+" [name='customerName']").text(settleCustomerVO.customerName);//结算方
    $("#"+divId+" [name='supplierName']").text(settleCustomerVO.supplierName);//采购供应商名称
    $("#"+divId+" [name='contractWeight']").text(numUtils.floatWeight(settleCustomerVO.contractWeight));//合同签订重量（吨）
    $("#"+divId+" [name='contractAmount']").text(numUtils.floatMoney(settleCustomerVO.contractAmount));//合同签订金额（元）
    $("#"+divId+" [name='contractAssureAmount']").text(numUtils.floatMoney(settleCustomerVO.contractAssureAmount));//合同保证金（元）
    $("#"+divId+" [name='breed']").text(settleCustomerVO.breed);//订采品种
    $("#"+divId+" [name='warehouseName']").text(settleCustomerVO.warehouseName);//仓库
    $("#"+divId+" [name='contractLimitTime']").text(dateFormat(settleCustomerVO.contractLimitTime));//合同到期日

    $("#"+divId+" [name='receiveAmount']").text(numUtils.floatMoney(settleCustomerVO.receiveAmount));//合同总收款（元）
    $("#"+divId+" [name='payGoods']").text(numUtils.floatMoney(settleCustomerVO.payGoods));//实际打款
    $("#"+divId+" [name='payCarrier']").text(numUtils.floatMoney(settleCustomerVO.payCarrier));//放款给物流公司（元）
    $("#"+divId+" [name='receiveAssureAmount']").text(numUtils.floatMoney(settleCustomerVO.receiveAssureAmount));//已收保证金（元）
    $("#"+divId+" [name='payWarehouse']").text(numUtils.floatMoney(settleCustomerVO.payWarehouse));//已付仓储费（元）
    $("#"+divId+" [name='entryWeight']").text(numUtils.floatWeight(settleCustomerVO.entryWeight));//已入库重量（吨）
    $("#"+divId+" [name='orderWeight']").text(numUtils.floatWeight(settleCustomerVO.orderWeight));//订单下单量（吨）
    $("#"+divId+" [name='sellInvoiceDiff']").text(numUtils.floatMoney(settleCustomerVO.sellInvoiceDiff));//销项票差（元）
    $("#"+divId+" [name='supplierSettleAmount']").text(numUtils.floatMoney(settleCustomerVO.supplierSettleAmount));//订采公司结算金额（元）
    $("#"+divId+" [name='serviceCost']").text(numUtils.floatMoney(settleCustomerVO.serviceCost));//合同加价服务费（元）
    $("#"+divId+" [name='profit']").text(numUtils.floatMoney(settleCustomerVO.profit));//合同收益（元）
    $("#"+divId+" [name='adjustProfit']").text(numUtils.floatMoney(settleCustomerVO.adjustProfit));//调整后收益（元）
    $("#"+divId+" [name='totalProfit']").text(numUtils.floatMoney(settleCustomerVO.totalProfit));//系统总利润（元）
    $("#"+divId+" [name='facotryRebate']").text(numUtils.floatMoney(settleCustomerVO.facotryRebate));//钢厂返利（元）
    $("#"+divId+" [name='contractSurplus']").text(numUtils.floatMoney(settleCustomerVO.contractSurplus));//合同结余（元）

    $("#"+divId+" [name='goodsInvoiceAmount']").text(numUtils.floatMoney(settleCustomerVO.goodsInvoiceAmount));//货款进项票金额（元）
    $("#"+divId+" [name='carrierInvoiceAmount']").text(numUtils.floatMoney(settleCustomerVO.carrierInvoiceAmount));//物流进项票金额（元）
    $("#"+divId+" [name='warehouseInvoiceAmount']").text(numUtils.floatMoney(settleCustomerVO.warehouseInvoiceAmount));//仓储费进项票金额（元）

    $("#"+divId+" [name='goodsSettleWeight']").text(numUtils.floatWeight(settleCustomerVO.goodsSettleWeight));//货款结算重量（吨）
    $("#"+divId+" [name='goodsSettleUnitPrice']").text(numUtils.floatMoney(settleCustomerVO.goodsSettleUnitPrice));//货款结算单价(元/吨）
    $("#"+divId+" [name='goodsSettleAmount']").text(numUtils.floatMoney(settleCustomerVO.goodsSettleAmount));//货款结算金额(元）
    $("#"+divId+" [name='facCarrierSettleWeight']").text(numUtils.floatWeight(settleCustomerVO.facCarrierSettleWeight));//钢厂物流结算重量（吨）
    $("#"+divId+" [name='facCarrierSettleUnitPrice']").text(numUtils.floatMoney(settleCustomerVO.facCarrierSettleUnitPrice));//钢厂物流结算单价(元/吨）
    $("#"+divId+" [name='facCarrierSettleAmount']").text(numUtils.floatMoney(settleCustomerVO.facCarrierSettleAmount));//钢厂物流结算金额(元）

}

//物流供应商结算明细列表 赋值
function settleCustomerCarrierTable(settleCustomerCarriers,carrierInvoiceDiff,divId){
    var table = "";
    var  money = 0;
    var num = 0;

    $.each(settleCustomerCarriers,function(){
        table += "<tr>" +
            "<td>"+this.carrierName+"</td>" +
            "<td>"+getSettleCustomerCarriersCostType(this.costType)+"</td>" +
            "<td>"+numUtils.floatMoney(this.taxesRate)+"</td>" +
            "<td>"+numUtils.floatWeight(this.weight)+"</td>" +
            "<td>"+numUtils.floatMoney(this.unitPrice)+"</td>" +
            "<td>"+numUtils.floatMoney(this.settleMoney)+"</td>" +
            "</tr>";
        money += this.settleMoney;
        num++;
    })
    if(num == 0){
        table += "<tr><td colspan='6' style='text-align:center;'>暂无数据</td></tr>";
    }

    $("#"+divId+" [name='settleCustomerCarrierTbody']").append("");
    $("#"+divId+" [name='settleCustomerCarrierTbody']").append(table);

    table ="<tr>" +
                "<td colspan='6'>" +
                "<p class='text-right col-sm-2 pTop7'>物流票税差（元）:  </p>" +
                "<div class='col-sm-3'>"+numUtils.floatMoney(carrierInvoiceDiff)+"</div>" +
                "<p class='text-left col-sm-3 pTop7'>物流结算总金额:<span>"+numUtils.floatMoney(money)+"元</span> </p>" +
                "</td>" +
            "</tr>";
    $("#"+divId+" [name='settleCustomerCarrierTfoot']").append("");
    $("#"+divId+" [name='settleCustomerCarrierTfoot']").append(table);
}

//获取 物流供应商结算明细 费用类型
function getSettleCustomerCarriersCostType(costType){
    if(costType == 1){
        return "运费";
    }else if(costType == 2){
        return "杂费";
    }else if(costType == 3){
        return "转库费";
    }else{
        return "";
    }
}

//合同结算仓储明细列表 赋值
function settleCustomerWarehouseTable(settleCustomerWarehouse,warehouseInvoiceDiff,divId){
    var table = "";
    var  money = 0;
    var num = 0;

    $.each(settleCustomerWarehouse,function(){
        table += "<tr>" +
            "<td>"+this.warehouseName+"</td>" +
            "<td>"+getSettleCustomerWarehouseCostType(this.costType)+"</td>" +
            "<td>"+numUtils.floatMoney(this.taxesRate)+"</td>" +
            "<td>"+numUtils.floatWeight(this.weight)+"</td>" +
            "<td>"+numUtils.floatMoney(this.unitPrice)+"</td>" +
            "<td>"+numUtils.floatMoney(this.settleMoney)+"</td>" +
            "</tr>";
        money += this.settleMoney;
        num++;
    })
    if(num == 0){
        table = "<tr><td colspan='6' style='text-align:center;'>暂无数据</td></tr>";
    }

    $("#"+divId+" [name='settleCustomerWarehouseTbody']").append("");
    $("#"+divId+" [name='settleCustomerWarehouseTbody']").append(table);

    table ="<tr>" +
        "<td colspan='6'>" +
        "<p class='text-right col-sm-2 pTop7'>仓储费票税差（元）:   </p>" +
        "<div class='col-sm-3'>"+numUtils.floatMoney(warehouseInvoiceDiff)+"</div>" +
        "<p class='text-left col-sm-3 pTop7'>仓储结算总金额:<span>"+numUtils.floatMoney(money)+"元</span> </p>" +
        "</td>" +
        "</tr>";
    $("#"+divId+" [name='settleCustomerWarehouseTfoot']").append("");
    $("#"+divId+" [name='settleCustomerWarehouseTfoot']").append(table);
}

//获取 合同结算仓储明细 费用类型
function getSettleCustomerWarehouseCostType(costType){
    if(costType == 1){
        return "加工费";
    }else if(costType == 2){
        return "仓储费";
    }else if(costType == 3){
        return "超期堆存费";
    }else if(costType == 4){
        return "仓储服务费";
    }else if(costType == 5){
        return "转库费";
    }else{
        return "";
    }
}

//获取 合同计息收益 列表
function getContractProfit(num){
    var settleCustomer;
    var contractProfit;
    var divId = "";
    if(num == 1){
        settleCustomer = settleCustomerJson.one;
        contractProfit = settleCustomerJson.oneContractProfitVO;
        divId = "tab-2";
    }else{
        settleCustomer = settleCustomerJson.twice;
        contractProfit = settleCustomerJson.twiceContractProfitVO;
        divId = "tab-1";
    }

    //判断是否有值，没有则从后端查询数据
    if(contractProfit == null){
        $.ajax({
            url:'/zall/chain/purchase/contractProfit/queryList',
            type:'POST',
            data:{
                "contractCode":settleCustomer.contractCode,
                "contractType":settleCustomer.contractType,
                "settleCreateTime":settleCustomer.createTime
            },
            success: function(result) {
                if(num == 1){
                    settleCustomerJson.oneContractProfitVO = result.ContractProfitVOs;
                }else{
                    settleCustomerJson.twiceContractProfitVO = result.ContractProfitVOs;
                }
                //合同计息收益 赋值
                contractProfitTable(result.ContractProfitVOs,divId);
            }
        });
    }else{
        //合同计息收益 赋值
        contractProfitTable(contractProfit,divId);
    }
}

//合同计息收益 赋值
function contractProfitTable(contractProfitVOs,divId){
    var count=0;
    var money=0;
    var table="";
    $.each(contractProfitVOs,function(){
        table += "<tr>" +
            "<td>"+dateFormat(this.payDate)+"</td>" +
            "<td>"+numUtils.floatMoney(this.payMoney)+"</td>" +
            "<td>"+numUtils.floatMoney(this.receiveMoney)+"</td>" +
            "<td>"+numUtils.floatMoney(this.debtMoney)+"</td>" +
            "<td>"+this.days+"</td>" +
            "<td>"+numUtils.floatMoney(this.profitRate)+"%</td>" +
            "<td>"+numUtils.floatMoney(this.profit)+"</td>" +
            "</tr>";
        money += this.profit;
        count ++;
    })
    if(count == 0){
        table = "<tr><td colspan='7' style='text-align:center;'>暂无数据</td></tr>";
    }
    $("#"+divId+" [name='contractProfitTbody']").html("");
    $("#"+divId+" [name='contractProfitTbody']").append(table);

    table = "<tr>" +
        "<td colspan='7'>" +
        "<p class='text-right col-sm-1'>合计 </p>" +
        "<div class='col-sm-3'><p class='redport text-left'>利息："+money+"元</p></div>" +
        "</td>" +
        "</tr>"
    $("#"+divId+" [name='contractProfitTfoot']").html("");
    $("#"+divId+" [name='contractProfitTfoot']").append(table);
}

//获取 合同转入收益 列表
function getContractInProfit(num){
    var settleCustomer;
    var contractInProfit;
    var divId = "";

    if(num == 1){
        settleCustomer = settleCustomerJson.one;
        contractInProfit = settleCustomerJson.oneContractInProfitVO;
        divId = "tab-2";
    }else{
        settleCustomer = settleCustomerJson.twice;
        contractInProfit = settleCustomerJson.twiceContractInProfitVO;
        divId = "tab-1";
    }

    //判断是否有值，没有则从后端查询数据
    if(contractInProfit == null){
        $.ajax({
            url:'/zall/chain/purchase/contractInProfit/queryList',
            type:'POST',
            data:{
                "targetContractCode":settleCustomer.contractCode,
                "targetContractType":settleCustomer.contractType,
                "settleCreateTime":settleCustomer.createTime
            },
            success: function(result) {
                if(num == 1){
                    settleCustomerJson.oneContractInProfitVO = result.contractInProfitVOs;
                }else{
                    settleCustomerJson.twiceContractInProfitVO = result.contractInProfitVOs;
                }
                //合同转入收益 赋值
                contractInProfitTable(result.contractInProfitVOs,divId);
            }
        });
    }else{
        //合同转入收益 赋值
        contractInProfitTable(contractInProfit,divId);
    }
}

//合同转入收益 赋值
function contractInProfitTable(contractInProfitVOs,divId){
    var count=0;
    var table="";
    $.each(contractInProfitVOs,function(){
        table += "<tr>" +
                "<td>"+this.sourceContractCode+"</td>" +
                "<td>"+numUtils.floatMoney(this.profit)+"</td>" +
                "<td>"+this.creator+"</td>" +
                "<td>"+dateFormat(this.createTime)+"</td>" +
                "<td>"+this.remark+"</td>" +
            "</tr>";
        count ++;
    })
    if(count == 0){
        table = "<tr><td colspan='5' style='text-align:center;'>暂无数据</td></tr>";
    }
    $("#"+divId+" [name='contractInProfitTbody']").html("");
    $("#"+divId+" [name='contractInProfitTbody']").append(table);
}
