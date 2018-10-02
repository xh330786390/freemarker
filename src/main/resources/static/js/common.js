/**
 * 	公共方法
 */

function _init(dataLink, pageHeader) {
    if (dataLink) {
        var li = $('#sidebar li[data-link="' + dataLink + '"]');

        if (li) {
            if (!pageHeader) {
                pageHeader = $.trim(li.find('span').html());
            }
        }
    }

    if (pageHeader) {
        var array = pageHeader.split('~');

        if (array.length > 1) {
            pageHeader = array[0];
            
            if (!isMobile) {
                pageHeader = pageHeader + ' <i class="fa fa-hand-o-right"></i> <small>' + array[1] + '</small>';
            }
        }

        $('.header-title h1[data-rel="' + dataLink + '"]').html(pageHeader);
        document.title = array[0] + '_后台管理系统';
    }
}

function _init_select2() {
    $('.x-select2').select2({
        allowClear : true,
        placeholder : '选择一个内容',
        matcher : function(term, text) { // term:输入的搜索key，text:option中的value
            return $.trim(text).toUpperCase().indexOf($.trim(term).toUpperCase()) != -1; // 覆写:自动去除key前后的空格
        }
    });
    
    $(".select2-offscreen").each(function() {
         var val = $(this).val();
        if (!val) {
            $(this).addClass('myErrorClass');
        }
    }).change(function() {
        var value = $(this).val();
        var id = $(this).attr('id');
        
        if (value) {
            $(this).removeClass('myErrorClass');
            $('#s2id_' + id).css('border', '');
        } else {
            $(this).addClass('myErrorClass');
            $('#s2id_' + id).css('border', '1px solid red');
        }
    });
}

function _check_select2() {
    var num = 0;
    
    $('select.select2-offscreen').each(function() {
        if ($(this).hasClass('myErrorClass')) {
            var id = $(this).attr('id');
            $('#s2id_' + id).css('border', '1px solid red');
            num++;
        }
    });
    
    return 0 == num;
}

var is_exist = function(mod) {
    var val = $('#name').val().trim();
        
    if (val) {
        ajaxJson({
            url: '/zall/stock/' + mod + '/is_exist.htm?name=' + val
        }, function(obj) {
            if (obj.error) {
                alertErrorMsg(obj.error);
            } else if (obj.data){
                Notify(val + ' 已存在', 'top-right', '10000', 'warning', 'fa-bolt', true);
                $('#name').css('border', '1px solid red');
            } else {
                $('#name').css('border', '');
            }
        });
    } 
};

function _load_set() {
    $('.date-picker').datepicker({
        format : 'yyyy-mm-dd'
    }).on('changeDate', function() {
        $(this).datepicker('hide');
    }).prop('readonly', 'readonly');
    
    $('.date-range').daterangepicker({
        format : 'YYYY-MM-DD',
        separator : ' ~ ',
        //singleDatePicker : true,
        showDropdowns : true,
        locale : {  
            format: "YYYY-MM-DD HH:mm:ss",  //控件中from和to 显示的日期格式  
            separator : " - ",  
            applyLabel : "确定",  
            cancelLabel : "取消",  
            fromLabel : "开始",  
            toLabel: "结束",  
            customRangeLabel : "自定义",  
            weekLabel : "W",  
            daysOfWeek : ["日", "一", "二", "三", "四", "五", "六"],  
            monthNames : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月 "],  
            firstDay : 1  
        }
    }).prop('readonly', 'readonly');
    
    $(':input, span').each(function() {
        if (typeof($(this).attr('readonly')) != 'undefined') {
            $(this).attr('style', $(this).attr('style') + ' ;background: #EEEEEE;');
        }
    }); 
    
    $('.reset').click(reset_search);
    
    _ie9_textarea();
}

/**
 * 解决ie9下textarea字数限制的问题
 */
function _ie9_textarea() {
    if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
        $('textarea').keyup(function() {
            var maxLength = $(this).attr('maxLength');
            $(this).val($(this).val().substring(0, maxLength));
        });
    }
}

function alertErrorMsg(msg) {
    Notify(msg, 'top-right', '60000', 'danger', 'fa-bolt', true);
}

var isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());

var reset_search = function() {
    var form = $(this).parents('form:first');
    if (form) {
        form.find('.input-reset').each(function() {
            if ('checkbox' == $(this).prop('type')) {
                $(this).prop('checked', false);
            } else {
                $(this).val('');
            }
        });
        form.find('select').each(function() {
            $(this).prop('selectedIndex', 0);
        });
        form.find('.x-select2, .st-select, select[multiple="multiple"]').each(function() {
            $(this).val('').select2('val', '');
        });
        form.find('.st-hid').each(function() {
            $(this).val('');
        });
    }
};

function datepicker_range(startId, endId) {
    var start = $('#' + startId);
    var end = $('#' + endId);
  
    if (start.length > 0 && end.length > 0) {
        var startDate = start.datepicker({
            format : 'yyyy-mm-dd'
        }).on('changeDate', function(e) {
            $(this).datepicker('hide');
            
            if (e.date.valueOf() > endDate.date.valueOf()) {
                var newDate = new Date(e.date);
                newDate.setDate(newDate.getDate());
                endDate.setValue(newDate);
            } else {
                endDate.setValue(endDate.date);
            }
        }).prop('readonly', 'readonly').data('datepicker');
        
        var endDate = end.datepicker({
            format : 'yyyy-mm-dd',
            onRender: function(date) {
                return date.valueOf() < startDate.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function() {
            $(this).datepicker('hide');
        }).prop('readonly', 'readonly').data('datepicker');
    }
}

var common = {
	    
    toLong : function(num, scale) {
        if (!scale || 2 == scale) {
            return numUtils.longMoney(num);
        } else if (4 == scale) {
            return numUtils.longWeight(num);
        } else if (6 == scale) {
            return parseInt(numUtils.format(num, 6) * numUtils.defLevel);
        } else {
            return 0;
        }
    },
    
    toFloat : function(num, scale) {
        if (!scale || 2 == scale) {
            return numUtils.floatMoney(num);
        } else {
            return numUtils.formatLong(num, scale);
        }
    },
    
    toThousands : function(num, scale){
        return numUtils.longToThousandth(num, scale);
    },
    
    priceToThousands : function(num, scale){
        return numUtils.toThousandth(num, scale);
    },
    
    thousandsToNumber : function(num) {
        return numUtils.parse(num);
    }
    
};

var numUtils = {

    defWeightLevel : 10000,  // 默认换算阶1万
    defMoneyLevel : 100,
    /**
     * 金额 四舍五入保留两位小数
     *
     * @param num 数值
     */
    money : function(num) {
        return this.rounding(num, 2);
    },

    /**
     * 金额 四舍五入保留两位小数后乘以100
     *
     * @param num 数值
     */
    longMoney : function(num) {
        return parseInt(this.multiply(this.money(num), this.defMoneyLevel));
    },

    /**
     * 金额除以100 保留两位小数
     *
     * @param num 数值
     */
    floatMoney : function(num) {
        return this.money(this.divide(num, this.defMoneyLevel));
    },

    /**
     * 重量 舍去多余小数位保留四位小数
     *
     * @param num 数值
     */
    weight : function(num) {
        return this.format(num, 4);
    },

    /**
     * 重量 舍去多余小数位保留四位小数后乘以1万
     *
     * @param num 数值
     */
    longWeight : function(num) {
        return parseInt(this.multiply(this.weight(num), this.defWeightLevel));
    },

    /**
     * 重量除以1W 保留四位小数
     *
     * @param num 数值
     */
    floatWeight : function(num) {
        return this.weight(this.divide(num, this.defWeightLevel));
    },

    /**
     * 单价*重量 四舍五入保留两位小数
     *
     * @param weight 重量
     * @param price 单价
     */
    amount : function(weight, price) {
        return this.money(this.multiply(this.weight(weight), this.money(price)));
    },

    /**
     * 四舍五入
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    rounding : function (num, scale) {
        num = $.trim(num);
        scale = $.trim(scale);

        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        var level = Math.pow(10, scale);

        return (Math.round(num * level) / level).toFixed(scale);
    },

    /**
     * 除以1万后四舍五入
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    roundingLong : function (num, scale) {
        return this.rounding(this.divide(num, this.defWeightLevel), scale);
    },

    /**
     * 直接舍去多余小数位
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    format : function(num, scale) {
        num = $.trim(num);
        scale = $.trim(scale);

        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        var regex = new RegExp('([0-9]+\.[0-9]{' + scale + '})[0-9]*', 'g');

        return (+(num + '').replace(regex, '$1')).toFixed(scale);
    },

    /**
     * 除以1万后直接舍去多余小数位
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    formatLong : function (num, scale) {
        return this.format(this.divide(num, this.defWeightLevel), scale);
    },

    /**
     * 除以1s万后千分符格式化
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    longToThousandth : function(num, scale) {
        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        num = (2 == scale) ? this.floatMoney(num) : this.formatLong(num, scale);

        return this.toThousandth(num, scale);
    },

    /**
     * 乘法
     *
     * @param num1 被乘数
     * @param num2 乘数
     */
    multiply : function(num1, num2) {
        num1 = $.trim(num1);
        num2 = $.trim(num2);

        var len1 = num1.indexOf('.') > 0 ? num1.split('.')[1].length : 0;
        var len2 = num2.indexOf('.') > 0 ? num2.split('.')[1].length : 0;

        num1 = new Number(num1.replace('.', ''));
        num2 = new Number(num2.replace('.', ''));

        return (num1 * num2) / Math.pow(10, len1 + len2);
    },

    /**
     * 除法
     *
     * @param divide 被除数
     * @param divisor 除数
     */
    divide : function(divide, divisor) {
        divide = $.trim(divide);
        divisor = $.trim(divisor);

        var len1 = divide.indexOf('.') > 0 ? divide.split('.')[1].length : 0;
        var len2 = divisor.indexOf('.') > 0 ? divisor.split('.')[1].length : 0;

        var num1 = new Number(divide.replace('.', ''));
        var num2 = new Number(divisor.replace('.', ''));

        return (num1 / num2) * Math.pow(10, len2 - len1);
    },

    /**
     * 千分符格式化数值
     *
     * @param num 数值
     * @param scale 小数位精度
     */
    toThousandth : function(num, scale) {
        num = $.trim(num);
        scale = $.trim(scale);

        if (!scale || isNaN(scale)) {
            scale = 2;
        }

        num = (2 == scale) ? this.money(num) : this.format(num, scale);
        var array = num.split('.');
        var integer = array[0];
        var decimal = array[1];
        integer = (integer || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

        return integer + '.' + decimal;
    },

    /**
     * 把千分符字符串解析成数值
     *
     * @param num 字符串数值
     */
    parse : function(num) {
        return $.trim(num).split(',').join('');
    },

    /**
     * 加法
     * @param arg1
     * @param arg2
     * @returns
     */
    add : function(arg1,arg2){
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
};
