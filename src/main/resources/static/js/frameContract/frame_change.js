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

//文件上传
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

                    var url = json.data.url;
                    $("#"+urlId).val(url);

                    var url1 = $("#url").val();

                    $("#"+fileId).parent().parent().find('a').remove();
                    $("#"+fileId).parent().parent().append('<a target="_bank" href="/zall/download?fileUrl=/'+ url + '">附件查看</a>');
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

//变更参数传参
function check(){
    var sub = true;
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

    //交货地
    var makePlace=$("#makePlace").val().trim();
    if(makePlace == null || makePlace == ''){
        $("#makePlace").css("border","1px solid red");
        sub = false;
    }else{
        $("#makePlace").css("border","");
    }

    //总协议量
    var totalNum=$("#totalNum").val().trim();
    if(totalNum == null || totalNum == ''){
        $("#totalNum").css("border","1px solid red");
        sub = false;
    }else{
        $("#totalNum").css("border","");
    }

    //业务提报人
    var businessId=$("#businessId").val().trim();
    if(businessId == null || businessId == ''){
        $("#businessId").next().css("border","1px solid red");
        $("#businessId").next().css("border-radius","4px 4px 4px 4px");
        sub = false;
    }else{
        $("#businessId").next().css("border","");
        $("#businessId").next().css("border-radius","");
    }
    //年度协议销售合同
    var yearSellContractUrl=$("#yearSellContractUrl").val().trim();
    if(yearSellContractUrl == null || yearSellContractUrl == ''){
        $("#pyearSellContractUrl").show();
        sub=false;
    }else{
        $("#pyearSellContractUrl").hide();
    }

    //年度协议采购合同
    var yearPurchaseContractUrl=$("#yearPurchaseContractUrl").val().trim();
    if(yearPurchaseContractUrl == null || yearPurchaseContractUrl == ''){
        $("#pyearPurchaseContractUrl").show();
        sub=false;
    }else{
        $("#pyearPurchaseContractUrl").hide();
    }

    //协议有效期
    var limitTime=$("#limitTime").val().trim();
    if(limitTime == null || limitTime == ''){
        $("#limitTime").css("border","1px solid red");
        sub = false;
    }else {
        $("#limitTime").css("border","");
    }

    return sub;
}

//变更
function frameChange(){
    //校验
    var bl=check();

    if(bl){
        //获取参数
        var param = getParam();

        $.ajax({
            url:'/zall/chain/purchase/protocol/change',
            type:'POST',
            data:param,
            dataType: 'json',
            success: function () {
                window.location.href="/zall/chain/purchase/protocol/list";
            },
            error:function(result){
                dialog("发生错误添加失败！");
            }
        });
    }
};

//获取参数
function getParam(){
    var param = {}
    param.id= $("#id").val().trim();id
    param.yearMoney=numUtils.longMoney($("#yearMoney").val().trim());//年度履约保证金
    param.assureTime=getLongTime($("#assureTime").val().trim());//保证金收款时间
    param.profitRate=numUtils.longMoney($("#profitRate").val().trim());//收益率
    param.makePlace=$("#makePlace").val().trim();//交货地
    param.totalNum=numUtils.longWeight($("#totalNum").val().trim());//总协议量(吨)
    param.limitTime=getLongTime($("#limitTime").val().trim());//协议有效期
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

    return param;
}
