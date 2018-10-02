$(function () {
    loadTable();
    jeDate("#testblue",{
        theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
        multiPane:false,
        range:"/",
        format: "YYYY-MM-DD"
    });
    $("#searchContract").click(function () {
        loadTable();
    })
});

function loadTable() {
    var paramJson = getParam();
    console.log(paramJson)
    $("#tableList").pagination({
        url : "/zall/chain/purchase/contract/list",
        paramJson : paramJson,
        callback:function(){
        }
    });
}

function getParam() {
    var json={
        pageSize:10,
        pageNum:1,
        business:0
    };
    createJson(json,"customerName",$("input[name=customerName]").val());
    createJson(json,"contractType",$("select[name=contractType]").val());
    createJson(json,"businessType",$("select[name=businessType]").val());
    if(check_d($("input[name=apply_date]").val())){
        var arr=$("input[name=apply_date]").val().split("/");
        createJson(json,"startTime",getTime(arr[0]));
        createJson(json,"endTime",getTime(arr[1])+24*60*60*60);
    }else{
        createJson(json,"startTime",null);
        createJson(json,"endTime",null);
    }
    createJson(json,"creator",$("input[name=creator]").val());
    createJson(json,"sellContractCode",$("input[name=sellCode]").val());
    createJson(json,"purchaseContractCode",$("input[name=purchaseContractCode]").val());
    createJson(json,"auditStatus",$("select[name=auditStatus]").val());
    createJson(json,"supplierName",$("input[name=supplierName]").val());
    return json;
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
function deleteContract(contractCode,purchaseCode) {
    MyDialog("确认删除？",{success:function () {
            ajax('/zall/chain/purchase/contract/delete','get',{
                data:{contractCode:contractCode,purchaseCode:purchaseCode},
                success:function (data) {
                    loadTable();
                    parent.layer.msg('删除成功', {icon: 1});
                }
            })
        }});
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