var global = {};
//分页传参
function getParam(){
	var paramJson = {
			pageNum:1,
			pageSize:10,
	};
	
	//打款公司
	createJson(paramJson,"company",$("#companyName").val());
	
	// 收款银行
	createJson(paramJson,"payerOpenBankName",$("select[name=openbank]").val());
	
	// 收款账号
	createJson(paramJson,"payerOppAccountNo",$("#recAccount").val());
	
	// 最小到账金额
	createJson(paramJson,"minPrice",$("#minPrice").val());
	// 最大到账金额
	createJson(paramJson,"maxPrice",$("#maxPrice").val());
	
	// 到账时间
	if(check_d($("#receiveTime").val())){  
        var arr=$("#receiveTime").val().split("/");
        createJson(paramJson,"startArriveTime",arr[0]+" 00:00:00");
        createJson(paramJson,"endArriveTime",arr[1]+" 23:59:59");
    }else{
        createJson(paramJson,"startArriveTime",null);
        createJson(paramJson,"endArriveTime",null);
    }
	
//	//收款方式
//	createJson(paramJson,"receivePattern",$("select[name=receivePattern]").val());
//	//合同编号
//	createJson(paramJson,"contractCode",$("input[name=contractCode]").val());
//	//业务类型
//	createJson(paramJson,"businessType",$("select[name=businessType]").val());
//	//申请人
//	createJson(paramJson,"creator",$("input[name=creator]").val());
//	//申请时间
//	createJson(paramJson,"createTime",null);
//	//状态
//	createJson(paramJson,"status",$("select[name=status]").val());
//	//收款时间
//	createJson(paramJson,"receiveTime",null);
//	//分配类型
//	createJson(paramJson,"assignPurpose",$("select[name=assignPurpose]").val());
	return paramJson;
}

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

// 时间检查
function check_d(d) {
    if(d!=null&&d!=undefined&&d!=''){
        return true;
    }else {
        return false;
    }
}

function getTime(date) {
    return new Date(date).getTime();
}

function loadTable(){
	
//	var paramJson = {
//			pageNum:1,
//			pageSize:10,
//	};
	
	var paramJson = getParam();
	console.log(paramJson)
	$("#tablelist").pagination({
		url : "/zall/chain/finance/bill/list",
		paramJson : paramJson,
		callback:function(){

		}
	});

}

//获取分配弹窗提交的参数
function getData(){
	var dataJson = {};
	
	
	 //到帐单ID
		//alert($('#recordId').text());
	 createJson(dataJson,"recordId",$('#recordId').html());
	 //银行流水号
	 createJson(dataJson,"bankStatement",getString($('#searialNum').html()));
	 //收款开户行
	 createJson(dataJson,"receiveBank",getString($('#payerOpenBankName').html()));
	 //收款账号
	 createJson(dataJson,"receiveAccount",getString($('#payerOppAccountNo').html()));
	 //到账金额
	 createJson(dataJson,"receiveMoney",numUtils.longMoney(getString($('#price').html())));
	 //分配金额 
	 createJson(dataJson,"assignMoney",numUtils.longMoney(getString($('#price').html())));
	 //到账时间
	 createJson(dataJson,"receiveTime",getTime($('#arriveTime').html()));
	 //收款方式
	 createJson(dataJson,"receivePattern",1);
	 //打款公司名称
	 createJson(dataJson,"customerName",getString($('#company').html()));
	 //收款状态
	 createJson(dataJson,"status",2);
	$("#assignTable tr").each(function (i) {
		
		
			// 合同类型                                             
			createJson(dataJson, 'financeAssignItemDTOS[' + i + '].contractType',$(this).find("select[name=contractCode] :selected").attr("data-type"));
			//业务类型
			createJson(dataJson, 'financeAssignItemDTOS[' + i + '].businessType',$('#businessType').val());
		 	//打款公司名称
			createJson(dataJson, 'financeAssignItemDTOS[' + i + '].customerName',getString($('#company').html()));
			// 合同编号
            createJson(dataJson, 'financeAssignItemDTOS[' + i + '].contractCode', getString($(this).find("select[name=contractCode]").val()));
            // 分配类型
            createJson(dataJson, 'financeAssignItemDTOS[' + i + '].assignPurpose', getString($(this).find("select[name=assignPurpose]").val()));
            // 分配金额
            createJson(dataJson, 'financeAssignItemDTOS[' + i + '].assignMoney', numUtils.longMoney(getString($(this).find("input[name=assignMoney]").val())));
            // 状态
            createJson(dataJson, 'financeAssignItemDTOS[' + i + '].status',2);
            // 备注
            createJson(dataJson, 'financeAssignItemDTOS[' + i + '].remark', getString($(this).find("input[name=remark]").val()));
    });
	console.log(dataJson);
	return dataJson;
    
}

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

/**字段非空判断**/
function getString(d) {
    if(d!=null&&d!=undefined&&d!=''){
        return d;
    }else {
        return null;
    }
}


/**提交分配，进行验证**/
function submitForm() {
	// 表单非空及不合法验证
	if(!validateForm()){
		return;
	}
	
	
	var available = numUtils.longMoney(($("#available").html()));
	
	var accontMoney = numUtils.longMoney($("#accontMoney").html());
	
	// 验证分配金额与打款总额是否相等
	if(!(available==accontMoney)){
		
		$("#tips").css("display","block");
		
		return;
	}
        var dataJson = getData();
        ajax('/zall/chain/finance/bill/create','post',{
            data:dataJson,
            success:function (data) {
            	
            	// alert(data.status);
            	
            	
            	if(data.status=='200'){
            		$("#fenpModal").modal("hide");
            		$("#qxskModal").modal("show");
            		
            		
            	}else {
            		$("#fenpModal").modal("hide");
            		$("#failModal").modal("show");
            	}
            	
            }
        });
    }


//点击查询事件
$(".btn-success").click(function () {
	if(getString($("#companyName").val())==null){
		$("#alarm").modal("show");
		return;
	}else {
		loadTable();
	}
})

// 银行选择对应账号事件
	$("#openbank").change(function(){
		var bank=$(this).children('option:selected').val();
		
		$("#recAccount").val('');
		if(bank=='招商银行上海分行华灵支行'){
			$("#recAccount").val('121929165410701');
			/*$("#recAccount").append("<option value='"+121929165410701+"'>"+121929165410701+"</option>");*/
		}
		if(bank=='宁波银行上海分行营业部'){
			$("#recAccount").val('70010122002533839');
		}
	})

// 提交成功 确认事件
function confirm(){
	history.go(-1);
	loadTable();
}

// 取消跳转事件
function undo(){
	$("#qxskModal").modal("hide");
	loadTable();
}


//参数校验
function check(){
    var sub = true;
    //客户公司
    var customerId=$("#businessType").val().trim();
    if(businessType == null || businessType == ''){
    	$("#checkBussType").show();
        sub = false;
    }else{
    	$("#checkBussType").hide();
    }

    return sub;
}

/**+合同分配列表添加**/
function showTR(tab) {
    var newObject = $("#"+tab+" tr:first").html();
    newObject = "<tr>"+newObject+"</tr>"
    newObject = newObject.replace("check-error","");
    $("#"+tab).append(newObject);
    var selectNew = $("#"+tab+" tr:last").find("select").eq(1);
    console.log($(selectNew));
    var html='<option value="">请选择合同编号</option>';
    $(selectNew).html(html);
	$(selectNew).trigger("chosen:updated");
    chosFun();
    $("#assignTable tr:last td:nth-child(2)").eq(0).find('.chosen-container').eq(1).remove();
    
    tj();
    assignPurpose();
    $(".chosen-select").change(function(){
		$(this).removeClass("check-error");
		$(this).next().removeClass("check-error");
	})
	$('.check').blur(validate).focus(function() {
	    selectChosen($(this))
	});
}


/**统计分配金额**/
function tj(){
	var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
	var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/;  // 金额
	$(".assignMoney").change(function(){
		var sum="0";
		$(".assignMoney").each(function(i){
			if(reg_int.test($(this).val()) || reg_money.test($(this).val())){
				sum=numUtils.add($(this).val(),sum);
			}
		});
		sum=numUtils.money(sum);
		$("#accontMoney").html(sum);
	});
}

// 分配页面弹窗值获取
function assignMethod(company,searialNum,openBankName,payerOppAccountNo,price,arriveTime,recordId){
	
	
	$("#fenpModal").modal("show");
	$("#recordId").html(recordId);
	$("#available").html(price);
	$("#price").html(price);
	$("#company").html(company);
	$("#arriveTime").html(arriveTime);
	$("#payerOppAccountNo").html(payerOppAccountNo);
	$("#payerOpenBankName").html(openBankName);
	$("#searialNum").html(searialNum);
	
	// ajax请求 通过公司名称 返回一个合同编号list
	
	 ajax('/zall/chain/finance/bill/contractCodelist','get',{
         data:{"companyName":company},
         success:function (data) {
        	 var $me=$("#assignTable .contractCode");
        	 var html='<option value="">请选择合同编号</option>';
        	 $me.html(html);
        	 $me.trigger("chosen:updated");
        	 $me.default_single_text = "";
        	 global = data;
        	 
        	 console.log(global);
         }
     });
	
}

// 分配类型点击事件
function assignPurpose(){
	$(".assignPurpose").change(function(){	
		var $me=$(this).parent().parent().find(".contractCode");
		var html='<option value="">请选择合同编号</option>';
		
		 var value = $(this).val();
		$.each(global,function(i,v){
			
					if(value=='1'||value=='2'||value=='3'){
						if((v.collectPayType="null")&&(v.businessType==businessType)){
//							html+='<option value="'+v.contractCode+'">'+v.contractCode+'</option>';
							
							html+='<option value="'+v.contractCode+'" data-type="'+v.contractType+'">'+v.contractCode+'</option>';
							
						}
					}else{
						if((v.businessType==businessType)&&(v.collectPayType!="null")){
							html+='<option value="'+v.contractCode+'" data-type="'+v.contractType+'">'+v.contractCode+'</option>';
						}
					}
				
		});
		
		console.log(html)
		$me.html(html);
		$me.trigger("chosen:updated");
		
	})
}
		
// 业务类型
var  businessType;
$(function(){
	
	//loadTable();
	
	
	
	
	// 业务类型点击事件
	$("#businessType").change(function(){
		// 循环table 保留第一个 
		$("#assignTable  tr:not(:first)").html("");
		$("#assignPurpose option:first").prop("selected", 'selected'); 
		
//		$(".contractCode").replace("check-error","");
		var selectNew = $("#assignTable tr:first").find("select").eq(1);
	    console.log($(selectNew));
	    var html='<option value="">请选择合同编号</option>';
	    $(selectNew).html(html);
		$(selectNew).trigger("chosen:updated");
	//	$(".contractCode").trigger("chosen:updated");
		//$(".contractCode").removeClass("check-error");
		$("#assignMoney").val("");
		$("#accontMoney").html("0.00");
		//newObject = newObject.replace("check-error","");
		
	var bussType=$(this).children('option:selected').val(); 
	
	businessType = bussType;
	})
	
	// 事件控件
	jeDate("#receiveTime",{
        theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
        multiPane:false,
        range:"/",
        format: "YYYY-MM-DD"
    });

	
	// 统计金额
	tj();
	
	// 分配类型点击事件
	assignPurpose();
	
	// 移除错误红色弹框
	$(".chosen-select").change(function(){
		$(this).removeClass("check-error");
		$(this).next().removeClass("check-error");
	})
});
