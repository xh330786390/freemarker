/**
 * 表单验证
 */
var validate = function(event) {
    if ($(this).hasClass('ignore')) {
        return;
    }

    var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
    var reg_bank = /^\d$|^[1-9]\d{1,50}$/; // 银行
    var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
    var reg_weight = /^0\.\d{1,4}$|^[1-9]\d{0,15}\.\d{1,4}$/; // 重量
    var reg_mill_money = /^0\.\d{1,6}$|^[1-9]\d{0,15}\.\d{1,6}$/; // 万元
    var reg_mobile = /^1\d{10}$/; // 手机
    var reg_phone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}$/; // 固定电话

    var val = $.trim($(this).val());

    var isNull = val == null || val == '';
    var isNotNull = !isNull;
    var isNumber = !isNaN(val);
    var isPercent = val >= 0 && val <= 1 && !isNaN(val); // 百分比
    var isInteger = reg_int.test(val);
    var isMoney = reg_int.test(val) || reg_money.test(val);
    var isWeight = reg_int.test(val) || reg_weight.test(val);
    var isMillion = reg_int.test(val) || reg_mill_money.test(val);
    var isPhone = reg_mobile.test(val) || reg_phone.test(val);
    var isFile = check_d(val);
    var isBank = reg_bank.test(val);

    var flag = true;

    // 数字验证，可为空
    if ($(this).hasClass('number')) {
        flag = isNull || isNumber;
    } else if ($(this).hasClass('check_day')) {
        flag = isNull || isInteger;
    } else if ($(this).hasClass('check_number')) {
        flag = isNull || isMoney;
    } else if ($(this).hasClass('check_weight')) {
        flag = isNull || isWeight;
    } else if ($(this).hasClass('v_million')) {
        flag = isNull || isMillion;
    } else if ($(this).hasClass('percent')) {
        flag = isNull || isPercent;
    } else if ($(this).hasClass('phone')) {
        flag = isNull || isPhone;
    } else { // 文本
        flag = true;
    }
    
    // 不为空验证
    if ($(this).hasClass('notnull')) {
        flag = isNotNull;
        
        if (flag) {
            if ($(this).hasClass('number')) {
                flag =  isNumber && val > 0;
            } else if ($(this).hasClass('check_day')) {
                flag = isInteger && val > 0;
            } else if ($(this).hasClass('check_number')) {
                flag = isMoney && val > 0;
            } else if ($(this).hasClass('check_weight')) {
                flag = isWeight && val > 0;
            } else if ($(this).hasClass('v_million')) {
                flag = isMillion && val > 0;
            } else if ($(this).hasClass('percent')) {
                flag = isPercent && val > 0;
            } else if ($(this).hasClass('phone')) {
                flag = isPhone;
            } else if ($(this).hasClass('check-file')) {
                flag = isFile;
            } else if ($(this).hasClass('check_bank')) {
                flag = isBank;
            }
        }
    }
    
    if (flag) {
        selectChosen($(this))
    } else {
        selectAddChosen($(this))
    }
};

// 提交验证
function validateForm(parent) {
    console.log($(parent + ' .check'))
    parent = parent || '';
    $(parent + ' .check').each(validate);

    return $(parent + ' .check-error').length == 0;
}

// 焦点验证
$('.check').blur(validate).focus(function() {
    selectChosen($(this))
});

function selectChosen($_this) {
    $_this.removeClass('check-error');
    $_this.addClass("my-input");
    if ($_this.hasClass("chosen-select")){
        $_this.next().removeClass('check-error');
    }else if ($_this.hasClass("check-file")){
        $_this.parent().find("span").css({"border-color":"#1c84c6","background-color":"#1c84c6"});
    }
}
function selectAddChosen($_this) {
    $_this.addClass('check-error');
    if ($_this.hasClass("chosen-select")){
        $_this.next().addClass('check-error');
    }else if ($_this.hasClass("check-file")){
        $_this.parent().find("span").css({"border-color":"red","background-color":"red"});
    }else if ($_this.hasClass("my-input")){
        $_this.removeClass("my-input");
    }
}


function check_d(d) {
    if(d != null  && d != '' && d != undefined && d.trim() != ''){
        return true;
    }else {
        return false;
    }
}