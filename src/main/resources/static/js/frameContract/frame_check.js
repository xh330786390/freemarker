//查询历史变更信息
function getHistoryProtocol(frameCode){
    $.ajax({
        url:'/zall/chain/purchase/history/getByFrameCode',
        type:'POST',
        data:{"frameCode":frameCode},
        dataType: 'json',
        success: function (json) {
            if(json.frameHistory!=null){
                var history = json.frameHistory;

                //判断内容是否有更改，无:num=0；有:num=1
                var num=0;

                //年度履约保证金
                if(history.yearMoney != null && history.yearMoney != 0){
                    $("#protocolYearMoney").show();
                    $("#historyYearMoneyDIV").show();

                    $("#historyYearMoney").html("");
                    $("#historyYearMoney").html(numUtils.floatMoney(history.yearMoney));
                    num=1;
                }else{
                    $("#protocolYearMoney").hide();
                    $("#historyYearMoneyDIV").hide();
                }

                //保证金收款时间
                if(history.assureTime != null && history.assureTime != 0){
                    $("#protocolAssureTime").show();
                    $("#historyAssureTimeDIV").show();

                    $("#historyAssureTime").html("");
                    $("#historyAssureTime").html(dateFormat(history.assureTime));
                    num=1;
                }else{
                    $("#protocolAssureTime").hide();
                    $("#historyAssureTimeDIV").hide();
                }

                //收益率
                if(history.profitRate != null && history.profitRate != 0){
                    $("#protocolProfitRate").show();
                    $("#historyProfitRateDIV").show();

                    $("#historyProfitRate").html("");
                    $("#historyProfitRate").html(numUtils.floatMoney(history.profitRate)+"%");
                    num=1;
                }else{
                    $("#protocolProfitRate").hide();
                    $("#historyProfitRateDIV").hide();
                }

                //交货地
                if(history.makePlace != null && history.makePlace != ''){
                    $("#protocolMakePlace").show();
                    $("#historyMakePlaceeDIV").show();

                    $("#historyMakePlacee").html("");
                    $("#historyMakePlacee").html(history.makePlace);
                    num=1;
                }else{
                    $("#protocolMakePlace").hide();
                    $("#historyMakePlaceeDIV").hide();
                }

                //总协议量（吨）
                if(history.totalNum != null && history.totalNum != 0){
                    $("#protocolTotalNum").show();
                    $("#historyTotalNumDIV").show();

                    $("#historyTotalNum").html("");
                    $("#historyTotalNum").html(numUtils.floatWeight(history.totalNum));
                    num=1;
                }else{
                    $("#protocolTotalNum").hide();
                    $("#historyTotalNumDIV").hide();
                }

                //协议有效期
                if(history.limitTime != null && history.limitTime != 0){
                    $("#protocolLimitTime").show();
                    $("#historyLimitTimeDIV").show();

                    $("#historyLimitTime").html("");
                    $("#historyLimitTime").html(dateFormat(history.limitTime));
                    num=1;
                }else{
                    $("#protocolLimitTime").hide();
                    $("#historyLimitTimeDIV").hide();
                }

                //业务提报人
                if(history.businessName != null && history.businessName != ''){
                    $("#protocolBusinessName").show();
                    $("#historyBusinessNameDIV").show();

                    $("#historyBusinessName").html("");
                    $("#historyBusinessName").html(history.businessName);
                    num=1;
                }else{
                    $("#protocolBusinessName").hide();
                    $("#historyBusinessNameDIV").hide();
                }

                //提报人所属部门
                if(history.departName != null && history.departName != ''){
                    $("#protocolDepartName").show();
                    $("#historyDepartNameDIV").show();

                    $("#historyDepartName").html("");
                    $("#historyDepartName").html(history.departName);
                    num=1;
                }else{
                    $("#protocolDepartName").hide();
                    $("#historyDepartNameDIV").hide();
                }

                if(num == 0 ){
                    //变更后
                    $("#frameChange").html("");
                    $("#frameChange").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'><strong>无变更</strong></font> </span>");

                    //变更前
                    $("#historyChange").html("");
                    $("#historyChange").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'><strong>无变更</strong></font> </span>");
                }

                //申请人
                $("#frameHistoryCreator").html("");
                $("#frameHistoryCreator").html(history.creator);

                //申请时间
                var dateType1 = dateFormat(history.createTime);
                $("#frameHistoryCreateTime").html("");
                $("#frameHistoryCreateTime").html(dateType1);


                //判断附件是否有更改，无:num=0；有:num=1
                num=0;

                //年度协议销售合同url
                if(history.yearSellContractUrl != null && history.yearSellContractUrl != ''){
                    var msf=$("#mfs").val();
                    var url="/zall/download?fileUrl=/"+json.frameAttachment.yearSellContractUrl;
                    $("#yearSellContractDIV").show();
                    $("#aYearSellContract").attr("href",url);
                    num=1;
                }else{
                    $("#yearSellContractDIV").hide();
                }

                //年度协议采购合同url
                if(history.yearPurchaseContractUrl != null && history.yearPurchaseContractUrl != ''){
                    var msf=$("#mfs").val();
                    var url="/zall/download?fileUrl=/"+json.frameAttachment.yearPurchaseContractUrl;
                    $("#yearPurchaseContractDIV").show();
                    $("#aYearPurchaseContract").attr("href",url);
                    num=1;
                }else{
                    $("#yearPurchaseContractDIV").hide();
                }

                //业务可行性报告url
                if(history.businessViewUrl != null && history.businessViewUrl != ''){
                    var msf=$("#mfs").val();
                    var url="/zall/download?fileUrl=/"+json.frameAttachment.businessReportUrl;
                    $("#businessReportDIV").show();
                    $("#aBusinessReport").attr("href",url);
                    num=1;
                }else{
                    $("#businessReportDIV").hide();
                }

                //业务考察表url
                if(history.businessReportUrl != null && history.businessReportUrl != ''){
                    var msf=$("#mfs").val();
                    var url="/zall/download?fileUrl=/"+json.frameAttachment.businessViewUrl;
                    $("#businessViewDIV").show();
                    $("#aBusinessView").attr("href",url);
                    num=1;
                }else{
                    $("#businessViewDIV").hide();
                }

                if(num==0){
                    //附件
                    $("#changeUrl").html("");
                    $("#changeUrl").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'><strong>无变更</strong></font> </span>");
                }

            }else{
                //变更后
                $("#frameChange").html("");
                $("#frameChange").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'><strong>无变更</strong></font> </span>");

                //变更前
                $("#historyChange").html("");
                $("#historyChange").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'><strong>无变更</strong></font> </span>");

                //附件
                $("#changeUrl").html("");
                $("#changeUrl").html("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size='3'><strong>无变更</strong></font> </span>");
            }
        },
        error:function(result){
            dialog("发生错误添加失败！");
        }
    });
}

//审核
function approve(id,frameCode){
    //参数获取
    var appvore = $("#appvore").val();//2.通过 3.驳回
    var remark = $("#remark").val();
    var approve = $("#approve").val();//1.新增审核 9.变更审核

    //参数设置
    var url = "";
    var param = {
        "id":id,
        "approve":appvore,
        "auditStatus":appvore,
        "remark":remark
    };
    if(approve == 9){
        url = '/zall/chain/purchase/protocol/changeApprove';
        param.status = 2;//变更状态
    }else{
        url = '/zall/chain/purchase/protocol/approve';
        param.contractStatus = 1;
        param.frameCode = frameCode;
    }
    //提交
    $.ajax({
        url:url,
        type:'POST',
        data:param,
        success: function() {
            if(approve == 9){
                window.location.href="/zall/chain/purchase/protocol/queryChangeApproveUI"
            }else{
                window.location.href="/zall/chain/purchase/protocol/queryApproveUI"
            }
        }
    });
}

//显示弹框
function modalShow(num){
    $("#appvore").val(num);
    $("#pass").text("");
    if(num == 2){
        $("#pass").text("通过");
    }else{
        $("#pass").text("驳回");
    }
    $("#zuofModal").modal("show");
}

//隐藏弹框
function modalHide(){
    $("#zuofModal").modal("hide");
}