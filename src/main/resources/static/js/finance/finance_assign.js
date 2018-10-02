
$(function(){
	loadTable();
	
//	// 隐藏按钮 //导出报表//使用到账单//使用承兑汇票
//	$("#b_export").css("display","none");
//	$("#a_bill").css("display","none");
//	$("#a_cdhp").css("display","none");
	
	$("#txtArea").change(function(){
		if(!($("#txtArea").val().length=='0')){
			$("#reson").css("display","none");
		}
	})
	
	jeDate("#testApply",{
        theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
        multiPane:false,
        range:"/",
        format: "YYYY-MM-DD"
    });
	jeDate("#testshouk",{
        theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
        multiPane:false,
        range:"/",
        format: "YYYY-MM-DD"
    });
	
});


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


//分页传参
function getParam(){
	var paramJson = {
			pageNum:1,
			pageSize:10,
	};
	
	// 申请时间
	if(check_d($("input[name=applyTime]").val())){
        var arr=$("input[name=applyTime]").val().split("/");
        createJson(paramJson,"startDateApply",getTime(arr[0]));
        createJson(paramJson,"endDateApply",getTime(arr[1])+24*60*60*60);
    }else{
        createJson(paramJson,"startDateApply",null);
        createJson(paramJson,"endDateApply",null);
    }
	
	
	// 收款时间
	if(check_d($("input[name=shoukTime]").val())){
        var arr=$("input[name=shoukTime]").val().split("/");
        createJson(paramJson,"startDateReceive",getTime(arr[0]));
        createJson(paramJson,"endDateReceive",getTime(arr[1])+24*60*60*60);
    }else{
        createJson(paramJson,"startDateReceive",null);
        createJson(paramJson,"endDateReceive",null);
    }
	
	
	//打款公司
	createJson(paramJson,"customerName",$("input[name=customerName]").val());
	
	//收款方式
	createJson(paramJson,"receivePattern",$("select[name=receivePattern]").val());

	//合同编号
	createJson(paramJson,"contractCode",$("input[name=contractCode]").val());

	//业务类型
	createJson(paramJson,"businessType",$("select[name=businessType]").val());
	
	//申请人
	createJson(paramJson,"creator",$("input[name=creator]").val());
	
	//状态
	createJson(paramJson,"status",$("select[name=status]").val());
	
	//分配类型
	createJson(paramJson,"assignPurpose",$("select[name=assignPurpose]").val());

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

// 点击查询
$(".btn-success").click(function () {
    loadTable();
})



function loadTable(){

	var paramJson = {
			pageNum:1,
			pageSize:10,
	};
	
	var paramJson = getParam();
	$("#tablelist").pagination({
		url : "/zall/chain/finance/assign/list",
		paramJson : paramJson,
		callback:function(){

		}
	});

}

// 申请编号
var appCode;

// 取消收款  根据申请编号
function cancel(applyCode){
	
		$("#qxskModal").modal("show");
	
		appCode = applyCode;
	
//	 ajax('/zall/chain/finance/assign/cancel','get',{
//         data:{"applyCode":applyCode,"status":3},
//         success:function (data) {
//        	
//        	 if(data=true){
//        		 // 如果成功 重新加载页面
//        		 loadTable();
//        	 }
//         }
//     });
}

function confirm(){
	
	var text = $("#txtArea").val();
	
	
	if(text.length==0){
		
		$("#reson").css("display","block");
		return;
	}
	
	ajax('/zall/chain/finance/assign/cancel','get',{
      data:{"applyCode":appCode,"status":3,"remark":text},
      success:function (data) {
     	
    	  if(data.status==200){
    		  $("#qxskModal").modal("hide");
    		  alert("取消成功")
    		  loadTable();
    	  }
    	  
      }
  });
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

//查看方法
function itemView(applyCode,receivePattern){
	// $("#fenpModal").modal("show");
	var dataJson = {};
	// 申请编号
	 createJson(dataJson,"applyCode",applyCode);
	// 收款方式
	 createJson(dataJson,"receivePattern",receivePattern);
	window.location.href="/zall/chain/finance/assign/item?applyCode="+applyCode+"&receivePattern="+receivePattern;
	
}


