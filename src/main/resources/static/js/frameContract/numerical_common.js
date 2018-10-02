//数字校验
function myModalCheck(e) {
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if (e.value != "") {
        if (!re.test(e.value)) {
            parent.layer.msg("请输入正确的数字");
            e.value = "";
            e.focus();
        }
    }
}

//验证 只能输入数字，一个小数点保留两位小数，isblur表示是否是光标离开事件，0 --> 否 ；1 --> 是
function clearNoNum(obj,isblur,count){
    //精确度
    var re;
    if(count == 2){
        re = /^(\-)*(\d+)\.(\d\d).*$/;
    }
    if(count ==4){
        re = /^(\-)*(\d+)\.(\d\d\d\d).*$/;
    }

    var value = obj.value;
    if(value != "" && value != null){
        obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        obj.value = obj.value.replace(re,'$1$2.$3');//只能输入两个小数
        if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            obj.value= parseFloat(obj.value);
        }
        if(isblur==1){
            var re = /^\d+(?=\.{0,1}\d+$|$)/;
            if(!re.test(value)){
                parent.layer.msg("请输入正确的数字");
                obj.value = "";
                obj.focus();
            }
        }
    }
};