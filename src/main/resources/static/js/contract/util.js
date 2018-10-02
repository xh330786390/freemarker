//ajax封装
function ajax(url,type,param) {
    $.ajax({
        url:url,
        type:type,
        dataType:'json',
        data:param.data,
        success:param.success
    })
}
//文件改变事件封装
function AjaxFileUpload(url,fileElementId,json) {
    $.ajaxFileUpload({
        url: url,
        secureuri:false,
        fileElementId:fileElementId,//file标签的id
        dataType: 'json',//返回数据的类型
        data:json.data,//一同上传的数据
        success:json.success
    });
    $("#"+fileElementId).val("")
}
/*文件下载*/
$(".downloadFile").on('click',function () {
    var file = $(this).attr("data-download");
    window.location.href="/download/"+file;
});
/**文件下载，param->file id集合*/
function uploadFile(contract_files) {
    $.each(contract_files,function (i,v) {
        fileChange(v,'/zall/chain/purchase/contract/uploadFile',{
            success:function (json) {
                if (json.status=='200') {
                    var url = json.data.url;
                    console.log($("#"+v).parent().parent().find("a"))
                    if ($("#"+v).hasClass("costFile-input")){
                        if ($("#"+v).hasClass("upload")){
                            updateUrl($("#"+v).attr("data-id"),url);
                        }else {
                            $("#"+v).next().val(url);
                            $("#"+v).prev().replaceWith('<a target="_bank" href="'+ $mfs + url + '">附件查看</a>');
                        }
                    }else {
                        $("#"+v).parent().parent().find('input').eq(1).val(url);
                        $("#"+v).parent().parent().find("a").replaceWith('<a target="_bank" href="'+ $mfs + url + '">附件查看</a>');
                        $("#"+v).parent().parent().parent().find("p").remove();
                    }
                    return;
                }
                if(json.status=='500'){
                    if ($("#"+v).hasClass("costFile-input")){
                        $("#"+v).prev().replaceWith('<a></a>');
                    }else {
                        $("#"+v).parent().parent().find("a").hide();
                    }
                    MyDialog(json.msg,{
                        success:function () {
                            parent.layer.closeAll();
                        }
                    })
                    return;
                }
                alert(json);
            }
        });
    })
}

/**文件改变就上传文件*/
function fileChange($_id,url,params) {
    $('body').on('change','#'+$_id,function(){
        if($(this).val()!=''){
            if(checkFileSizeAndType($(this))){
                AjaxFileUpload(url,$_id,params);
            }
        }
    })
}
function fileClassChange($_id,url,params) {
    $('body').on('change','#'+$_id,function(){
        if($(this).val()!=''){
            if(checkFileSizeAndType($(this))){
                AjaxFileUpload(url,$_id,params);
            }
        }
    })
}

function checkJsonData() {
    var flag=true;
    $(".check").each(function () {
        /**定义参数*/
        var O={
            $:$(this),
            val:$(this).val()
        };
        if(O.$.hasClass("ignore")){
            return false;
        }
        /**先校验参数是否填*/
        if (O.$.hasClass("chosen-select")){
            var check=check_$(O.$);
            if (!check){
                O.$.next().addClass("check-error");
                O.$.next().addClass("border-radius");
            }
        }else {
            var check=check_$(O.$);
        }
        if($(".check-error").length>0){
            flag = false;
        }
        /**校验参数*/
        var day=/^\d$|^[1-9]\d{1,15}$/;
        var number=/^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;
        if ($(this).hasClass("check_number")){
            if(!number.test(O.val)){
                O.$.addClass("check-error");
                flag = false;
            }
        }
        if ($(this).hasClass("check_day")){
            if(!day.test(O.val)){
                O.$.addClass("check-error");
                flag = false;
            }
        }
    });
    return flag;
}
// function checkJsonData(check,id){
//     if (check == undefined || check == null || check.trim() == ''){
//         if(id.hasClass("chosen-select")){
//             id.next().css("border","1px solid red");
//             id.next().css("border-radius","4px 4px 4px 4px");
//         }else {
//             id.css("border","1px solid red");
//         }
//         return false;
//     }
//     return true;
// }

function check(checks) {
    var check=true;
    $.each(checks,function (i,v) {
        var che=true;
        che=check_d(v.val(),v);
        if(!che){
            v.addClass("check-error")
            v.next().addClass("check-error")
            check=false;
        }
    })
    return check;
}

function check_d(d) {
    if(d != null  && d != '' && d != undefined && d.trim() != ''){
        return true;
    }else {
        return false;
    }
}

function check_$($) {
    if( $ != undefined && $.val() != null && $.val() != undefined && $.val() != '' ){
        return true;
    }else {
        $.addClass("check-error");
        return false;
    }
}

function getString(d) {
    if(d!=null&&d!=undefined&&d!=''){
        return d;
    }else {
        return null;
    }
}

/**select事件封装**/
function select() {
    // 搜索输入框方法调用
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': {
            allow_single_deselect: true
        },
        '.chosen-select-no-single': {
            disable_search_threshold: 10
        },
        '.chosen-select-no-results': {
            no_results_text: '暂无数据!'
        },
        '.chosen-select-width': {
            width: "95%"
        }
    }
    for (var selector in config) {
        $('body').find(selector).chosen(config[selector]);
        $('.chosen-container').width('100%');
    }
}

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns
 */
function accAdd(arg1,arg2){
    var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
    var reg_weight = /^0\.\d{1,4}$|^[1-9]\d{0,15}\.\d{1,4}$/; // 重量
    var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
    var int=reg_int.test(arg1)||reg_weight.test(arg1)||reg_money.test(arg1);
    var w=reg_int.test(arg2)||reg_weight.test(arg2)||reg_money.test(arg2);
    if (int&&w){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0};
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0};
        m=Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    }else {
        return 0;
    }
}

/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
function accSubtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

/***
 * 乘法，获取精确乘法的结果值
 * @param arg1
 * @param arg2
 * @returns
 */
function accMul(arg1,arg2)
{
    var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
    var reg_weight = /^0\.\d{1,4}$|^[1-9]\d{0,15}\.\d{1,4}$/; // 重量
    var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
    var int=reg_int.test(arg1)||reg_weight.test(arg1)||reg_money.test(arg1);
    var w=reg_int.test(arg2)||reg_weight.test(arg2)||reg_money.test(arg2);
    if(w&&int){
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){};
        try{m+=s2.split(".")[1].length}catch(e){};
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    }else {
        return 0;
    }
}

/***
 * 除法，获取精确乘法的结果值
 * @param arg1
 * @param arg2
 * @returns
 */
function accDivCoupon(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length;}catch(e){}
    try{t2=arg2.toString().split(".")[1].length;}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*pow(10,t2-t1);
    }
}

//转换jSON
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
//给json添加对象
function createJson(json,prop, val) {
    // 如果 val 被忽略
    if(typeof val === "undefined") {
        // 删除属性
        delete json[prop];
    }
    else {
        // 添加 或 修改
        json[prop] = val;
    }
}

function getTime(date) {
    if (check_d(date)){
        return new Date(date).getTime();
    }else{
        return null;
    }
}

function checkFileSizeAndType(obj){
    var photoExt = obj.val().substr(obj.val().lastIndexOf(".")).toLowerCase();//获得文件后缀名
    var ext_array = ['.jpg','.gif','.jpeg','.png','.img','.txt','.zip','.rar','.doc','.docx','.xlsx','.xls'];
    if(!in_array(photoExt,ext_array)){
        alert("您上传的图片格式有问题，请重新上传!");
        return false;
    }
    return true;
}

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

function MyDialog(msg,json) {
    parent.layer.confirm(msg, {
        btn: ['确认','取消'], //按钮
        shade: false //不显示遮罩
    }, json.success, function(){
        // 这里是点击取消按钮事件
    });
}
function Dialog(msg) {
    parent.layer.confirm(msg, {
        btn: ['确认','取消'], //按钮
        shade: false //不显示遮罩
    }, function () {
        parent.layer.closeAll();
    }, function(){
        // 这里是点击取消按钮事件
    });
}
function DialogGO(msg) {
    parent.layer.confirm(msg, {
        btn: ['确认','取消'], //按钮
        shade: false //不显示遮罩
    }, function () {
        parent.layer.closeAll();
        history.go(-1);
    }, function(){
        // 这里是点击取消按钮事件
    });
}
function DialogRe(msg) {
    parent.layer.confirm(msg, {
        btn: ['确认','取消'], //按钮
        shade: false //不显示遮罩
    }, function () {
        parent.layer.closeAll();
        window.location.reload();
    }, function(){
        // 这里是点击取消按钮事件
    });
}

function formatDateTime(date){
    date=new Date(date);
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    if(month<10){
        month='0'+month;
    }
    var day=date.getDate();
    if(day<10){
        day='0'+day;
    }
    return year+"-"+month+"-"+day;
}