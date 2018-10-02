var $parentNode = window.parent.document;

function $childNode(name) {
    return window.frames[name]
}

// tooltips
$('.tooltip-demo').tooltip({
    selector: "[data-toggle=tooltip]",
    container: "body"
});

// 使用animation.css修改Bootstrap Modal
$('.modal').appendTo("body");

$("[data-toggle=popover]").popover();

//折叠ibox
$('.collapse-link').click(function () {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    var content = ibox.find('div.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
    }, 50);
});

//关闭ibox
$('.close-link').click(function () {
    var content = $(this).closest('div.ibox');
    content.remove();
});

//判断当前页面是否在iframe中
if (top == this) {
    var gohome = '<div class="gohome"><a class="animated bounceInUp" href="index.html?v=4.0" title="返回首页"><i class="fa fa-home"></i></a></div>';
    $('body').append(gohome);
}

//animation.css
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //动画完成之前移除class
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

//拖动面板
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable({
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8,
        })
        .disableSelection();
};

// 表格页面内部的增删方法
/*$('body').on('click','.table-add-btn',function(){
    var _str=`<tr>
                <td>
                    <select class="form-control">
                        <option>请选择出厂运输方式</option>
                        <option>水运</option>  
                        <option>汽运</option>  
                        <option>铁运</option>  
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control" required="" aria-required="true">
                </td>
                <td><input type="text" class="form-control" required="" aria-required="true"></td>
                <td><input type="text" class="form-control" required="" aria-required="true"></td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs table-add-btn">+</button>
                    <button type="button" class="btn btn-default btn-xs table-minus-btn">-</button>
                </td>
            </tr>`;
    $(this).parents('tbody').append(_str);
})
$('body').on('click','.long-ele-table-add-btn',function(){
    var _str=`<tr>
                <td>
                    <select class="form-control">
                        <option>请选择品名</option>
                        <option>二级螺纹钢</option>  
                        <option>三级螺纹钢</option>  
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control" value="Φ10*12">
                </td>
                <td>
                    <select class="form-control">
                        <option>请选择材质</option>
                        <option>HRB335</option>  
                        <option>HRB400</option>  
                    </select>
                </td>
                <td>
                    <select class="form-control">
                        <option>请选择计重方式</option>
                        <option>HRB335</option>  
                        <option>HRB400</option>  
                    </select>
                </td>
                <td>
                    <select class="form-control">
                        <option>请选择产地</option>
                        <option>河北邯钢</option>  
                        <option>江苏富港</option>  
                        <option>唐山东海</option>  
                    </select>
                </td>
                <td>
                    <input type="text" class="form-control">
                </td>
                <td>
                    <input type="text" class="form-control" required="" aria-required="true" value="1998.0000">
                </td>
                <td>
                    <input type="text" class="form-control" required="" aria-required="true" value="1000.0">
                </td>
                <td>1,998,000.00</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs long-ele-table-add-btn">+</button>
                    <button type="button" class="btn btn-default btn-xs table-minus-btn">-</button>
                </td>
            </tr>`;
    $(this).parents('tbody').append(_str);
})*/
$('body').on('click','.table-minus-btn',function(){
    var $tr = $(this).parents('tbody').find('tr');
    if ($tr.hasClass("item-class")){
        if($(this).parents('tbody').find('tr').length>2){
            $(this).parents('tr').remove();
        }else{
            parent.layer.msg('只剩下最后一个了，不要再删了嘛');
        }
    }else {
        if($(this).parents('tbody').find('tr').length>1){
            $(this).parents('tr').remove();
        }else{
            parent.layer.msg('只剩下最后一个了，不要再删了嘛');
        }
    }
    if($(this).hasClass("assignMoney")){
    	var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
    	var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
    	var sum="0";
    	$(".assignMoney").each(function(i){
    		if(reg_int.test($(this).val()) || reg_money.test($(this).val())){
    			sum=numUtils.add($(this).val(),sum);
    		}
    	});
    	sum=numUtils.money(sum);
    	$("#accontMoney").html(sum);
    }
})

// 定义协议信息左侧客户和供应商样式
setXyHeightFun();
function setXyHeightFun(){
    for(var i=0;i<$('.name-icon-box').length;i++){
        $('.name-icon-box').eq(i).height($('.name-icon-box').eq(i).parent().height()-18)
    }
}

// 搜索输入框方法调用
function chosFun(){
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': {
            allow_single_deselect: true
        },
        '.chosen-select-no-single': {
            disable_search_threshold: 10
        },
        '.chosen-select-no-results': {
            no_results_text: 'Oops, nothing found!'
        },
        '.chosen-select-width': {
            width: "95%"
        }
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
        $('.chosen-container').width('100%');
    }
}
function selectWatchFun(){
    // 监听交货方式：select变化
    $(".title-select").change(function(){
        var selected=$(this).children('option:selected').val()
        if(selected==="入库"){
            $(".zf-ele").hide();
        }else{
            $(".zf-ele").show();
        }
    });
    // 监听服务类型：select变化
    $(".serve-select").change(function(){
        var selected=$(this).children('option:selected').val()
        if(selected==="钢购e贷"){
            $(".serve-type-select").show();
        }else{
            $(".serve-type-select").hide();
        }
    });
    // 监听合同类型：select变化
    $(".contract-select").change(function(){
        var selected=$(this).children('option:selected').val()
        if(selected==="框架协议子合同"){
            $(".contract-type-select").show();
        }else{
            $(".contract-type-select").hide();
        }
    });
    // 监听是否代运：radio变化
    $('.transport-select [type="radio"]').click(function(){
        var selected=$(this).val();
        if(selected==="是"){
            $(".transport-type-select").show();
        }else{
            $(".transport-type-select").hide();
        }
        $('.name-icon-box-gys').height(0).height($('.name-icon-box-gys').parent().height()-18)
    });
    // 监听月收益率：radio变化
    $('.month-radio [type="radio"]').click(function(){
        $('.month-type-radio').find('input').prop('disabled',true);
        $(this).siblings().find('input').prop('disabled',false);
        $('.month-radio [type="radio"]').prop('disabled',false);
    });
    // 监听业务类型：select变化
    $(".business-select").change(function(){
        var selected=$(this).children('option:selected').val()
        if(selected==="卓帮融"){
            $(".business-type-select").hide();
            $(".business-type-select-ztg").show();

        }else{
            $(".business-type-select").show();
            $(".business-type-select-ztg").hide();
        }
        $('.name-icon-box-gys').height(0).height($('.name-icon-box-gys').parent().height()-18)
    });
}
// 输入框数字增减
function inputHandleFun(){
    var inputVal=0,deadlineNum=0;   //inputVal记录输入框的值，deadlineNum：记录输入框的上限
    var plusBtn='',minusBtn='';
    $('.btn-num-minus').on('click',function(){
        inputVal=parseInt($(this).siblings('input').val());
        $(this).siblings('.btn-num-plus').find('button').removeAttr("disabled");   //移除+不可点属性
        if(inputVal<=0){
            $(this).find('button').attr("disabled","disabled");                    //添加-不可点属性
        }else{
            $(this).find('button').removeAttr("disabled");
            $(this).siblings('input').val(inputVal-1);
            inputVal=parseInt($(this).siblings('input').val());
            if(inputVal<=0){
                $(this).find('button').attr("disabled","disabled");
            }
        }
    })
    $('.btn-num-plus').on('click',function(){
        inputVal=parseInt($(this).siblings('input').val());
        deadlineNum=parseInt($(this).parents('td').siblings('.deadlineNum').text());
        if(inputVal>=deadlineNum){
            $(this).find('button').attr("disabled","disabled");
        }else{
            $(this).siblings('input').val(inputVal+1)
            $(this).siblings('.btn-num-minus').find('button').removeAttr("disabled");
            $(this).find('button').removeAttr("disabled");
            inputVal=parseInt($(this).siblings('input').val());
            if(inputVal>=deadlineNum){
                $(this).find('button').attr("disabled","disabled");
            }
        }
    })
    // 检测input输入框输入内容
    $('.btn-num-plus').siblings('input').bind("input propertychange",function(event){
        inputVal=parseInt($(this).val());
        deadlineNum=parseInt($(this).parents('td').siblings('.deadlineNum').text());
        plusBtn=$(this).siblings('.btn-num-plus').find('button');
        minusBtn=$(this).siblings('.btn-num-minus').find('button');
        if(inputVal>deadlineNum||inputVal<0){
            $("#deadlineModal").modal('show');
            $(this).val(0);
           minusBtn.attr("disabled","disabled");
        }else if(inputVal==0){
            plusBtn.removeAttr("disabled");
           minusBtn.attr("disabled","disabled");
        }else if(inputVal==deadlineNum){
           minusBtn.removeAttr("disabled");
            plusBtn.attr("disabled","disabled");
        }else{
           minusBtn.removeAttr("disabled");
            plusBtn.removeAttr("disabled");
        }
    });
}



