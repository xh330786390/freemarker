$(function(){
    //业务提报人信息变更联动部门跟相关Id
    $("#businessId").on("change",function(){
        var id = $("#businessId").val();

        $.ajax({
            url:'/zall/baseData/getDeptName',
            type:'GET',
            data:{"id":id},
            dataType: 'json',
            success: function (department) {
                $("#departId").val(department.id);
                $("#departName").val(department.name);
            },
            error:function(result){
                dialog("发生错误添加失败！");
            }
        });
    })
})

//文件上传*/
function upload(fileId,urlId){
    //验证文件格式
    var sub = checkFileSizeAndType($("#"+fileId))

    if(sub){
        $.ajaxFileUpload({
            url:'/zall/chain/purchase/contract/uploadFile',
            secureuri:false,
            fileElementId:fileId,//file标签的id
            dataType: 'json',//返回数据的类型
            data:{},//一同上传的数据
            success:function(json){
                if(json.status == 500){
                    alert("上传失败，大小不可超过2M")
                }else{
                    var p = "p"+urlId;
                    $("#"+p).hide();//隐藏错误提示

                    var url ="/"+ json.data.url;
                    $("#"+urlId).val(url);

                    $("#"+fileId).parent().parent().find('a').remove();
                    $("#"+fileId).parent().parent().append('<a target="_bank" href="/zall/download?fileUrl=' + url + '">附件查看</a>');
                }
            }
        });
    }
}

//验证文件格式
function checkFileSizeAndType(obj){
    var photoExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase();//获得文件后缀名
    var ext_array = ['.jpg','.gif','.jpeg','.png','.img','.txt','.zip','.rar','.doc','.docx','.xlsx','.xls'];
    if(!in_array(photoExt,ext_array)){
        alert("您上传的图片格式有问题，请重新上传!");
        return false;
    }
    return true;
}

//遍历文件格式验证
function in_array(photoExt,ext_array) {
    var f_f=false;
    $.each(ext_array,function (i,v) {
        console.log(v+":"+photoExt)
        if (photoExt == v){
            f_f=true;
        }
    });
    return f_f;
}

//参数校验
function check(){
    var sub = true;

    var count = 0;
    count += checkSelect('customerId');//客户公司
    count += checkSelect('supplierId');//供应商公司名称
    count += checkSelect('businessId');//业务提报人

    count += checkText('businessType');//业务类型
    count += checkText('frameCode');//合同编号
    count += checkText('makePlace');//交货地
    count += checkText('signTime');//协议签订日期
    count += checkText('purchaseBreed');//采购品种
    count += checkText('totalNum');//总协议量(吨)
    count += checkText('limitTime');//协议有效期
    count += checkText('monthNum');//月度协议量(吨)
    count += checkText('purchaseCode');//采购合同编号
    count += checkText('settlePattern');//结算方式
    count += checkText('logoPlace');//品牌+产地
    count += checkText('settleStandard');//结算标准
    count += checkText('payPattern');//付款模式

    if(count>0){
        sub = false;
    }

    //收益率
    var profitRate=$("#profitRate").val().trim();
    if(profitRate == null || profitRate == ''){
        $("#profitRate").css("border","1px solid red");
        sub = false;
    }else{
        //收益率只能输入0-100之间的数
        if(parseFloat(profitRate)>100 || parseFloat(profitRate) < 0){
            $("#profitRate").css("border","1px solid red");
            sub = false;
        }else{
            $("#profitRate").css("border","");
        }
    }

    //年度协议销售合同
    var yearSellContractUrl=$("#yearSellContractUrl").val().trim();
    if(yearSellContractUrl == null || yearSellContractUrl == ''){
        $("#pyearSellContractUrl").show();
        sub = false;
    }else{
        $("#pyearSellContractUrl").hide();
    }

    //年度协议采购合同
    var yearPurchaseContractUrl=$("#yearPurchaseContractUrl").val().trim();
    if(yearPurchaseContractUrl == null || yearPurchaseContractUrl == ''){
        $("#pyearPurchaseContractUrl").show();
        sub = false;
    }else{
        $("#pyearPurchaseContractUrl").hide();
    }

    return sub;
}

//新增
function frameCreate(status) {
    //消除提示样式
    removeStyle();

    var bl=true;
    //校验  “status == 1”表示提交事件
    if(status == 1){
        bl=check();
    }else{
        //合同编号
        var frameCode=$("#frameCode").val().trim();
        if(frameCode == null || frameCode == ''){
            $("#frameCode").css("border","1px solid red");
            bl = false;
        }else{
            $("#frameCode").css("border","");
        }
    }

    if(bl){
        //获取参数
        var param = getParam();
        param.status = status;

        $.ajax({
            url:'/zall/chain/purchase/protocol/create',
            type:'POST',
            data:param,
            dataType: 'json',
            success: function (result) {
                if(result.msg!=null){
                    alert(result.msg)
                }else{
                    window.location.href="/zall/chain/purchase/protocol/list";
                }
            }
        });
    }
};

//获取参数
function getParam(){
    var param = {}
    param.customerId=$("#customerId").val().trim();//客户公司Id
    //客户公司名称
    var customerId = $("#customerId").val().trim();
    if(customerId != null && customerId != ''){
        param.customerName=$("#customerId :selected").text().trim();
    }
    param.businessType=$("#businessType").val().trim();//业务类型
    param.supplierId=$("#supplierId").val().trim();//供应商公司Id
    //供应商公司名称
    var supplierId = $("#supplierId").val().trim();
    if(supplierId != null && supplierId != ''){
        param.supplierName=$("#supplierId :selected").text().trim();
    }
    param.frameCode=$("#frameCode").val().trim();//销售合同编号
    param.yearMoney=numUtils.longMoney($("#yearMoney").val().trim());//年度履约保证金
    param.assureTime=getLongTime($("#assureTime").val().trim());//保证金收款时间
    param.profitRate=numUtils.longMoney($("#profitRate").val().trim());//收益率
    param.makePlace=$("#makePlace").val().trim();//交货地
    param.signTime=getLongTime($("#signTime").val().trim());//协议签订日期
    param.totalNum=numUtils.longWeight($("#totalNum").val().trim());//总协议量(吨)
    param.limitTime=getLongTime($("#limitTime").val().trim());//协议有效期
    param.monthNum=numUtils.longWeight($("#monthNum").val().trim());//月度协议量(吨)
    param.purchaseCode=$("#purchaseCode").val().trim();//采购合同编号
    param.settlePattern=$("#settlePattern").val().trim();//结算方式
    param.logoPlace=$("#logoPlace").val().trim();//品牌+产地
    param.settleStandard=$("#settleStandard").val().trim();//结算标准
    param.payPattern=$("#payPattern").val().trim();//付款模式
    param.yearSellContractUrl=$("#yearSellContractUrl").val().trim();//年度协议销售合同
    param.yearPurchaseContractUrl=$("#yearPurchaseContractUrl").val().trim();//年度协议采购合同
    param.businessReportUrl=$("#businessReportUrl").val().trim();//业务可行性报告
    param.businessViewUrl=$("#businessViewUrl").val().trim();//业务考察表
    param.businessId=$("#businessId").val().trim();//业务提报人Id
    //业务提报人
    var businessId = $("#businessId").val().trim();
    if(businessId != null && businessId != ''){
        param.businessName=$("#businessId :selected").text().trim();
    }
    param.departId=$("#departId").val().trim();//部门Id
    param.departName=$("#departName").val().trim();//所属部门

    //采购品种
    var purchaseBreed = $("#purchaseBreed").val().trim()
    for(i=0;i<purchaseBreed.length;i++){
        var str = purchaseBreed.substring(i,i+1);
        if(str ==' ' || str == ',' || str == ';'){
            purchaseBreed = purchaseBreed.replace(str,'、');
        }
    }
    param.purchaseBreed=purchaseBreed;//采购品种

    return param;
}

//消除提示样式
function removeStyle(){
    removeSelectStyle('customerId');//客户公司
    removeSelectStyle('supplierId');//供应商公司名称
    removeSelectStyle('businessId');//业务提报人

    removeTextStyle('businessType');//业务类型
    removeTextStyle('frameCode');//合同编号
    removeTextStyle('makePlace');//交货地
    removeTextStyle('signTime');//协议签订日期
    removeTextStyle('purchaseBreed');//采购品种
    removeTextStyle('totalNum');//总协议量(吨)
    removeTextStyle('limitTime');//协议有效期
    removeTextStyle('monthNum');//月度协议量(吨)
    removeTextStyle('purchaseCode');//采购合同编号
    removeTextStyle('settlePattern');//结算方式
    removeTextStyle('logoPlace');//品牌+产地
    removeTextStyle('settleStandard');//结算标准
    removeTextStyle('payPattern');//付款模式
    removeTextStyle('profitRate');//收益率

    $("#pyearSellContractUrl").hide();//年度协议销售合同
    $("#pyearPurchaseContractUrl").hide();//年度协议采购合同
}

function checkText(id){
    var text=$("#"+id).val().trim();
    if(text == null || text == ''){
        $("#"+id).css("border","1px solid red");
        return 1;
    }else{
        $("#"+id).css("border","");
        return 0;
    }
}

function checkSelect(id){
    var text=$("#"+id).val().trim();
    if(text == null || text == ''){
        $("#"+id).next().css("border","1px solid red");
        $("#"+id).next().css("border-radius","4px 4px 4px 4px");
        return 1;
    }else{
        $("#"+id).next().css("border","");
        $("#"+id).next().css("border-radius","");
        return 0;
    }
}

function removeTextStyle(id){
    $("#"+id).css("border","");
}

function removeSelectStyle(id){
    $("#"+id).next().css("border","");
    $("#"+id).next().css("border-radius","");
}



