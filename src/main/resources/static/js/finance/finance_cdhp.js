var global = {};

//分页传参
function getParam() {
	var paramJson = {
		pageNum : 1,
		pageSize : 10,
	};
	
	//上手持票人
	createJson(paramJson, "preReceiver", $("#companyName").val());

	//票据号
	createJson(paramJson, "accNo", getString($("#accNo").val()));

	//最小票据金额
	createJson(paramJson, "minAccAmt", getString($("#minAccAmt").val()));

	//最大票据金额
	createJson(paramJson, "maxAccAmt", getString($("#maxAccAmt").val()));

	//票据类型    
	createJson(paramJson, "accType", $("#accType").val());

	return paramJson;
}

//给json添加对象
function createJson(json, prop, val) {
	// 如果 val 被忽略
	if (typeof val === "undefined") {
		// 删除属性
		delete json[prop];
	} else {
		// 添加 或 修改
		json[prop] = val;
	}
}

function loadTable() {

	var paramJson = getParam();
	console.log(paramJson)
	$("#tablelist").pagination({
		url : "/zall/chain/finance/cdhp/item",
		paramJson : paramJson,
		callback : function() {

		}
	});

}

//获取分配弹窗提交的参数
function getData() {
	var dataJson = {};
	
	// 
	createJson(dataJson, "objectJson", objectSon);
	
	//上手持票人 
	createJson(dataJson, "customerName", getString($('#company').html()));
	//票据号
	createJson(dataJson, "accNo", getString($("#pNo").html()));
	//到账金额/分配金额/票据金额
	createJson(dataJson, "receiveMoney", numUtils.longMoney(getString($(
			'#receiveMoney').html())));
	// 分配金额
	createJson(dataJson, "assignMoney", numUtils.longMoney(getString($(
			'#receiveMoney').html())));
	//收款方式
	createJson(dataJson, "receivePattern", 2);
	//收款状态
	createJson(dataJson, "status", 2);
	$("#assignTable tr").each(
			function(i) {

				// 合同类型
				createJson(dataJson, 'financeAssignItemDTOS[' + i
						+ '].contractType', $(this).find(
						"select[name=contractCode] :selected")
						.attr("data-type"));
				// 业务类型
				createJson(dataJson, 'financeAssignItemDTOS[' + i
						+ '].businessType', $('#businessType').val());
				// 上手持票人 
				createJson(dataJson, 'financeAssignItemDTOS[' + i
						+ '].customerName', getString($('#company').html()));
				// 合同编号
				createJson(dataJson, 'financeAssignItemDTOS[' + i
						+ '].contractCode', getString($(this).find(
						"select[name=contractCode]").val()));
				// 分配类型
				createJson(dataJson, 'financeAssignItemDTOS[' + i
						+ '].assignPurpose', getString($(this).find(
						"select[name=assignPurpose]").val()));
				// 分配金额								
				createJson(dataJson, 'financeAssignItemDTOS[' + i
						+ '].assignMoney', numUtils.longMoney(getString($(this)
						.find("input[name=assignMoney]").val())));
				// 状态
				createJson(dataJson, 'financeAssignItemDTOS[' + i + '].status',
						2);
				// 备注
				createJson(dataJson, 'financeAssignItemDTOS[' + i + '].remark',
						getString($(this).find("input[name=remark]").val()));
			});
	console.log(dataJson);
	return dataJson;

}

//ajax封装
function ajax(url, type, param) {
	$.ajax({
		url : url,
		type : type,
		dataType : 'json',
		data : param.data,
		success : param.success
	})
}

/**字段非空判断**/
function getString(d) {
	if (d != null && d != undefined && d != '') {
		return d;
	} else {
		return null;
	}
}

/**提交分配，进行验证**/
function submitForm() {
	//debugger;
	// 表单非空及不合法验证
	if (!validateForm()) {
		return;
	}

	var receiveMoney = numUtils.longMoney(($("#receiveMoney").html()));

	var accontMoney = numUtils.longMoney($("#accontMoney").html());
	// 验证分配金额与打款总额是否相等
	if (!(receiveMoney == accontMoney)) {

		$("#tips").css("display", "block");

		return;
	}
	var dataJson = getData();
	ajax('/zall/chain/finance/cdhp/create', 'post', {
		data : dataJson,
		success : function(data) {
			// alert(data.status);

			if (data.status == '200') {
				$("#fenpModal").modal("hide");
				$("#sucModal").modal("show");
				//loadTable();
			} else {
				$("#fenpModal").modal("hide");
				$("#failModal").modal("show");
			}
		}
	});
}

//提交成功 确认事件
function confirm() {
	history.go(-1);
	loadTable();
}

// 取消跳转事件
function undo() {
	$("#sucModal").modal("hide");
	loadTable();
}

/**+合同分配列表添加**/
function showTR(tab) {
	var newObject = $("#" + tab + " tr:first").html();
	newObject = "<tr>" + newObject + "</tr>"
	$("#" + tab).append(newObject);
	chosFun();
	$("#assignTable tr:last td:nth-child(2)").eq(0).find('.chosen-container')
			.eq(1).remove();

	tj();
	assignPurpose();
	$(".chosen-select").change(function() {
		$(this).removeClass("check-error");
		$(this).next().removeClass("check-error");
	})
	$('.check').blur(validate).focus(function() {
		selectChosen($(this))
	});
}

/**统计分配金额**/
function tj() {
	var reg_int = /^\d$|^[1-9]\d{1,15}$/; // 非负整数
	var reg_money = /^0\.\d{1,2}$|^[1-9]\d{0,15}\.\d{1,2}$/; // 金额
	$(".assignMoney").change(function() {
		var sum = "0";
		$(".assignMoney").each(function(i) {
			if (reg_int.test($(this).val()) || reg_money.test($(this).val())) {
				sum = numUtils.add($(this).val(), sum);
			}
		});
		sum = numUtils.money(sum);
		$("#accontMoney").html(sum);
	});
}

var objectSon;

// 分配页面弹窗值回显
function assignMethod(company, accAmt, accNo, objectJson) {

	objectSon=objectJson;
	
	console.log(objectJson)
	$("#fenpModal").modal("show");
	$("#company").html(company);
	$("#receiveMoney").html(accAmt);
	$("#pNo").html(accNo);
	// ajax请求 通过公司名称 返回一个合同编号list
	ajax('/zall/chain/finance/cdhp/contractCodelist', 'get', {
		data : {
			"companyName" : company
		},
		success : function(data) {

			var $me = $("#assignTable .contractCode");
			var html = '<option value="">请选择合同编号</option>';

			$me.html(html);
			$me.trigger("chosen:updated");
			$me.default_single_text = "";
			global = data;
			console.log(global);
		}
	});

}

function assignPurpose() {
	$(".assignPurpose").change(
			function() {

				var $me = $(this).parent().parent().find(".contractCode");
				var html = '<option value="">请选择合同编号</option>';

				var value = $(this).val();
				$.each(global, function(i, v) {

					if (value == '1' || value == '2' || value == '3') {
						if ((v.collectPayType = "null")
								&& (v.businessType == businessType)) {
							//							html+='<option value="'+v.contractCode+'">'+v.contractCode+'</option>';

							html += '<option value="' + v.contractCode
									+ '" data-type="' + v.contractType + '">'
									+ v.contractCode + '</option>';
						}
					} else {
						if ((v.businessType == businessType)
								&& (v.collectPayType != "null")) {
							html += '<option value="' + v.contractCode
									+ '" data-type="' + v.contractType + '">'
									+ v.contractCode + '</option>';
							//							html+='<option value="'+v.contractCode+'">'+v.contractCode+'</option>';
						}
					}
				});

				console.log(html)
				$me.html(html);
				$me.trigger("chosen:updated");
			})
}

//点击查询事件
$(".btn-success").click(function() {
	if (getString($("#companyName").val()) == null) {
		$("#alarm").modal("show");
		return;
	} else {

		loadTable();
	}
})

//业务类型
var businessType;

$(function() {

	// loadTable();

	//	$("#assignTable tr").each(function (i) {
	//		
	//		
	//	})

	// 业务类型点击事件	
	$("#businessType").change(function() {

		// 循环table 保留第一个 
		$("#assignTable  tr:not(:first)").html("");
		$("#assignPurpose option:first").prop("selected", 'selected');
		$(".contractCode").val("");
		$(".contractCode").trigger("chosen:updated");
		$("#assignMoney").val("");
		$("#accontMoney").html("0.00");

		// 获取业务类型
		var bussType = $(this).children('option:selected').val();
		businessType = bussType;
	});

	tj();
	assignPurpose();

	$(".chosen-select").change(function() {
		$(this).removeClass("check-error");
		$(this).next().removeClass("check-error");
	})

});
