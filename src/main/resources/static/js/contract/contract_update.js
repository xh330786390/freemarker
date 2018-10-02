/**
 * @author huaxianyi
 * @Description:合同
 * @date 2018-8-28
 */
$(function () {
    $("#hiddenCopyItem").hide();
    $("#plansHidden").hide();
    $("#giveHidden").hide();
});
function showSelect() {//框架协议显示否方法
    $(".contract-type-select").show();
    $("#frameId").removeClass("ignore");
    ajax('/zall/chain/purchase/protocol/queryList','get',{
        data:{customerId:$("#customerId").val(),businessType:$("#businessType").val(),contractStatus:1,auditStatus:2},
        success:function(data){
            var html='<option value="">请选择框架协议合同编号</option>';
            if (data != null || data.length != 0){
                $.each(data.FrameProtocolGatherVOs,function (i,frame) {
                    html+='<option value="'+frame.id+'" ';
                    if(frame.id == VO_frameId){
                        html+='selected';
                    }
                    html+=' >'+frame.frameCode+'</option>';
                });
            }
            $("#frameId").html(html);
            $("#frameId").trigger("chosen:updated");//更新select数据
        }
    })
}
/**提交合同，进行验证**/
function submitContract(id) {
    $("#itemsTable tr:first").find("input").removeClass("check");/**添加明细第一条取消验证*/
    $("#itemsTable tr:first").find("select").removeClass("check");/**添加明细第一条取消验证*/
    /**更新合同*/
    if(validateForm()){
        /**当服务类型为钢购e贷时，合同金额*70%<=客户可用额度*/
        if($("#serverType").val()=='1'){
            var contractMoney =  numUtils.multiply($("#contractMoney").val(),"10000");
            var canUseMoney = numUtils.multiply($("#useable_money").text(),"100000000");
            var m = numUtils.multiply(contractMoney,"0.7");
            console.log(m +","+ canUseMoney)
            if (m > canUseMoney){/******************************************转换int***/
                parent.layer.msg('客户可用额度不足，不可申请此业务');
                return;
            }
        }
        var contractJson = getJson();
        createJson(contractJson,"id",$ID);
        createJson(contractJson,"oldCode",$sellContractCode);
        createJson(contractJson,"auditStatus",0);
        createJson(contractJson,"status",1);
        ajax('/zall/chain/purchase/contract/update','post',{
            data:contractJson,
            success:function (data) {
                if (data.status == '200'){
                    DialogGO('提交成功');
                }else {
                    Dialog(data.msg);
                }
            }
        });
    }
}

/**保存合同，不需要进行验证*/
function save(id) {
    if (check_$($("#sellContractCode"))){
        var contractJson = getJson();
        createJson(contractJson,"id",$ID);
        createJson(contractJson,"oldCode",$sellContractCode);
        ajax('/zall/chain/purchase/contract/update','post',{
            data:contractJson,
            success:function (data) {
                alert(data.msg)
                history.go(-1)
            }
        });
    }
}

/**获取json数据**/
function getJson() {
    var contractJson={};
    createJson(contractJson,"customerId",getString($('#customerId').val()));
    createJson(contractJson,"customerName",$('#customerId').val()!=''?getString($("#customerId :selected").text()):null);
    createJson(contractJson,"businessType",getString($("#businessType").val()));
    createJson(contractJson,"serverType",getString($("#serverType").val()));
    createJson(contractJson,"creditMoney",$("#serverType").val()=='1'?getString($("#credit_money").text()):null);
    createJson(contractJson,"alreadyMoney",$("#serverType").val()=='1'?getString($("#already_money").text()):null);
    createJson(contractJson,"useableMoney",$("#serverType").val()=='1'?getString($("#useable_money").text()):null);
    createJson(contractJson,"creditLimitTime",$("#serverType").val()=='1'?getString(getTime($("#credit_limit_time").text())):null);
    createJson(contractJson,"supplierId",getString($("#supplierId").val()));
    createJson(contractJson,"supplierName",$("#supplierId").val()!=''?getString($("#supplierId :selected").text()):null);
    createJson(contractJson,"contractType",getString($("#contractType").val()));
    createJson(contractJson,"frameId",$("#contractType").val()=='2'?getString($("#frameId").val()):null);
    createJson(contractJson,"frameCode",$("#contractType").val()=='2'?getString($("#frameId :selected").text()):null);
    createJson(contractJson,"sellContractCode",getString($("#sellContractCode").val()));
    createJson(contractJson,"purchaseContractCode",getString($("#purchaseContractCode").val()));
    createJson(contractJson,"businessId",getString($("#businessId").val()));
    createJson(contractJson,"businessName",$("#businessId").val()!=''?getString($("#businessId :selected").text()):null);
    createJson(contractJson,"departId",getString($("#departId").val()));
    createJson(contractJson,"departName",getString($("#departName").val()));
    /**添加客户json**/
    createJson(contractJson,"contractCustomer.id",VO_contractCustomerId);
    createJson(contractJson,"contractCustomer.contractCode",getString($("#sellContractCode").val()));
    createJson(contractJson,"contractCustomer.assureMoney",'{"percent":'+accMul(getString($("#assureMoney_1").val()),100)+',"money":'+accMul(getString($("#assureMoney_2").val()),100)+'}');
    createJson(contractJson,"contractCustomer.assureReceiveTime",getTime(getString($("#assureReceiveTime").val())));
    createJson(contractJson,"contractCustomer.yearProfitPercent",yearProfitPercent());
    createJson(contractJson,'contractCustomer.contractLimitTime',getTime(getString($("#contractLimitTime").val())));
    createJson(contractJson,'contractCustomer.warehouseId',getString($("#customerWarehouseId").val()));
    createJson(contractJson,'contractCustomer.warehouseName',$("#customerWarehouseId").val()!=''?getString($("#customerWarehouseId :selected").text()):null);
    createJson(contractJson,'contractCustomer.warehouseAddress',getString($("#customerWarehouseAddress").val()));
    createJson(contractJson,'contractCustomer.expiryRate',accMul(getString($("#expiryRate").val()),100));
    createJson(contractJson,'contractCustomer.purchaseBreed',getString($("#purchaseBreed").val()));
    createJson(contractJson,'contractCustomer.purchaseNum',accMul(getString($("#purchaseNum").val()),10000));
    createJson(contractJson,'contractCustomer.contractMoney',accMul(getString($("#contractMoney").val()),100));
    createJson(contractJson,'contractCustomer.recoveryPeriod',getString($("#recoveryPeriod").val()));
    createJson(contractJson,'contractCustomer.threeProtocolCode',$("#serverType").val()=='1'?getString($("#threeProtocolCode").val()):null);
    createJson(contractJson,'contractCustomer.lendContractCode',$("#serverType").val()=='1'?getString($("#lendContractCode").val()):null);

    createJson(contractJson,'contractSupplier.id',VO_contractSupplierId);
    createJson(contractJson,'contractSupplier.sellContractCode',getString($("#sellContractCode").val()));
    createJson(contractJson,'contractSupplier.purchaseContractCode',getString($("#purchaseContractCode").val()));
    createJson(contractJson,'contractSupplier.settlePattern',getString($("#settlePattern").val()));
    createJson(contractJson,'contractSupplier.payTime',getTime(getString($("#payTime").val())));
    createJson(contractJson,'contractSupplier.warehouseId',getString($("#supplierWarehouseId").val()));
    createJson(contractJson,'contractSupplier.warehouseName',$("#supplierWarehouseId").val()!=''?getString($("#supplierWarehouseId :selected").text()):null);
    createJson(contractJson,'contractSupplier.warehouseAddress',getString($("#supplierWarehouseAddress").val()));
    createJson(contractJson,'contractSupplier.receiveGoodsTime',getTime(getString($("#receiveGoodsTime").val())));
    createJson(contractJson,'contractSupplier.payBatch',getString($("#payBatch").val()));
    if ($("#businessType").val()=='2'){
        createJson(contractJson,'contractSupplier.goodsType',getString($("#goodsType").val()));
    }else {
        createJson(contractJson,'contractSupplier.goodsType',getString($("#goodsTypeBU").val()));
    }
    createJson(contractJson,'contractSupplier.makeGoodsPeriod',getString($("#makeGoodsPeriod").val()));
    createJson(contractJson,'contractSupplier.payPattern',getString($("#payPattern").val()));
    if($("#businessType").val()=='2'){
        createJson(contractJson,'contractSupplier.canInsteadTransport',getString($("input[name=canInsteadTransport]:checked").val()));
        createJson(contractJson,'contractSupplier.settleMakePlace',getString($("#settleMakePlace").val()));
        /**运输计划*/
        $("#plansTable tr").each(function (i) {
            if (i!=0){
                i=i-1;
                if (getString($(this).find("select[name=transportPattern]").val()) != null){
                    createJson(contractJson,'contractTransportPlans['+i+'].id',$(this).find("input[name=plan_id]").val());
                    createJson(contractJson,'contractTransportPlans['+i+'].transportPattern',getString($(this).find("select[name=transportPattern]").val()));
                    createJson(contractJson,'contractTransportPlans['+i+'].destination',getString($(this).find("input[name=destination]").val()));
                    createJson(contractJson,'contractTransportPlans['+i+'].transporter',getString($(this).find("input[name=transporter]").val()));
                    createJson(contractJson,'contractTransportPlans['+i+'].remark',getString($(this).find("input[name=remark]").val()));
                    createJson(contractJson,'contractTransportPlans['+i+'].contractCode',getString($("#sellContractCode").val()));
                }
            }
        });
        createJson(contractJson, 'contractSupplier.makeGoodsPattern', getString($("#makeGoodsPattern").val())==null?0:getString($("#makeGoodsPattern").val()));
        if ($("#makeGoodsPattern").val() != '' ){
            if ($("#makeGoodsPattern").val() == '2' ){
                /**交货方式*/
                $("#givesTable tr").each(function (i) {
                    if (i!=0){
                        i=i-1;
                        createJson(contractJson,'contractMakePatterns['+i+'].id',$(this).find("input[name=pattern_id]").val());
                        createJson(contractJson,'contractMakePatterns['+i+'].transportPattern',getString($(this).find("select[name=transportPattern]").val()));
                        createJson(contractJson,'contractMakePatterns['+i+'].destination',getString($(this).find("input[name=destination]").val()));
                        createJson(contractJson,'contractMakePatterns['+i+'].transporter',getString($(this).find("input[name=transporter]").val()));
                        createJson(contractJson,'contractMakePatterns['+i+'].remark',getString($(this).find("input[name=remark]").val()));
                        createJson(contractJson,'contractMakePatterns['+i+'].contractCode',getString($("#sellContractCode").val()));
                    }
                })
            }
        }
    }
    /**物资明细*/
    $("#itemsTable tr").each(function (i) {
        if(i!=0){
            i=i-1;
            createJson(contractJson,'contractPurchaseItems['+i+'].id',$(this).find("input[name=item_id]").val());
            createJson(contractJson,'contractPurchaseItems['+i+'].breedName',$(this).find("select[name=breedName]").val()!=''?getString($(this).find("select[name=breedName] :selected").text()):null);
            createJson(contractJson,'contractPurchaseItems['+i+'].breedCode',getString($(this).find("select[name=breedName]").val()));
            createJson(contractJson,'contractPurchaseItems['+i+'].spec',getString($(this).find("input[name=spec]").val()));
            createJson(contractJson,'contractPurchaseItems['+i+'].material',getString($(this).find("select[name=material]").val()));
            createJson(contractJson,'contractPurchaseItems['+i+'].weightPattern',getString($(this).find("select[name=weightPattern]").val()));
            createJson(contractJson,'contractPurchaseItems['+i+'].logoPlace',$(this).find("select[name=logoPlace]").val()!=''?getString($(this).find("select[name=logoPlace]").val()):null);
            createJson(contractJson,'contractPurchaseItems['+i+'].packageCode',getString($(this).find("input[name=packageCode]").val()));
            createJson(contractJson,'contractPurchaseItems['+i+'].weight',accMul(getString($(this).find("input[name=weight]").val()),"10000"));console.log(getString($(this).find("input[name=weight]").val()))
            createJson(contractJson,'contractPurchaseItems['+i+'].unitPrice',accMul(getString($(this).find("input[name=unitPrice]").val()),"100"));console.log(getString($(this).find("input[name=unitPrice]").val()))
            createJson(contractJson,'contractPurchaseItems['+i+'].money',accMul(getString($(this).find("input[name=money]").val()),"100"));console.log(getString($(this).find("input[name=money]").val())+"[][]"+accMul(getString($("input[name=money]").val()),100))
            createJson(contractJson,'contractPurchaseItems['+i+'].contractCode',getString($("#sellContractCode").val()));
        }
    })
    createJson(contractJson,'contractAttachment.id',VO_contractAttachmentId);
    createJson(contractJson,'contractAttachment.sellContractUrl',getString($("#url_1").val()));
    createJson(contractJson,'contractAttachment.purchaseContractUrl',getString($("#url_2").val()));
    createJson(contractJson,'contractAttachment.businessReportUrl',getString($("#url_3").val()));
    createJson(contractJson,'contractAttachment.businessViewUrl',getString($("#url_4").val()));
    createJson(contractJson,'contractAttachment.contractCode',getString($("#sellContractCode").val()));
    $.each(contractJson,function (k,v) {
        console.log(k+":"+v)
    })
    console.log(contractJson)
    return contractJson;
}
