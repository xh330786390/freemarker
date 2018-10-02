function loadTable(){
    var paramJson = getParam();
    if ($("#createTime").val()) {
        paramJson.startApplyTime = new Date($("#createTime").val().split("/")[0]).getTime();
        paramJson.endApplyTime= new Date($("#createTime").val().split("/")[1]).getTime()+24*60*60*1000-1;
    } else {
        paramJson.startApplyTime = null;
        paramJson.endApplyTime = null;
    }
    $("#tableList").pagination({
        url : "/zall/chain/finance/ticket/yunlist",
        paramJson : paramJson,
        callback:function(){
        }
    });
}
$(function(){
    $("#searchBtn").on("click",loadTable);
    loadTable();
});

function getParam() {
    var formData = $("#form").serializeArray();
	var jsons = transformToJson(formData);
	jsons.pageSize = 10;
	jsons.pageNum = 1;
    return jsons;
}
function transformToJson(formData){
    var obj={}
    for (var i in formData) {
        obj[formData[i].name]=formData[i]['value'];
    }
    return obj;
}
jeDate("#createTime",{
    theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
    multiPane:false,
    range:"/",
    format: "YYYY-MM-DD"
});