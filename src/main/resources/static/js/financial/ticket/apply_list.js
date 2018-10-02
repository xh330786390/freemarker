var ids=[],supplier_id=[];
function loadTable(){
    var paramJson = getParam();
    $("#tableList").pagination({
        url : "/zall/chain/finance/ticket/applylist",
        paramJson : paramJson,
        callback:function(){
        	$('.main').on('click',function(){
	           	 var first=$(this);
           		 $(".item").each(function(){
           			 var obj=$(this);
           			 if(first.is(':checked')){
           				 if(supplier_id.length>0&&supplier_id.indexOf(obj.attr("supplier_id"))==-1){
              				 $.err("申请付运费必须是同一个开票公司");
              				 return false;
              			 }
		           		 ids.push(obj.attr("id"));
		       			 supplier_id.push(obj.attr("supplier_id"));
		       			 obj.attr("checked","checked");
		       		 }else{
		       			 var index1=supplier_id.indexOf(obj.attr("supplier_id"));
		       			 var index2=ids.indexOf(obj.attr("id"));
		       			 supplier_id.splice(index1);
		       			 ids.splice(index2);
		       			 obj.removeAttr("checked");
		       		 }
	           	 })
            });
        	$(".item").on('click',function(){
   			 var obj=$(this);
   			 if(obj.is(':checked')){
       			 if(supplier_id.length>0&&supplier_id.indexOf(obj.attr("supplier_id"))==-1){
       				 $.err("申请付运费必须是同一个开票公司");
       				 return false;
       			 }
       			 ids.push(obj.attr("id"));
       			 supplier_id.push(obj.attr("supplier_id"));
       			 obj.attr("checked","checked");
       		 }else{
       			 var index1=supplier_id.indexOf(obj.attr("supplier_id"));
       			 var index2=ids.indexOf(obj.attr("id"));
       			 supplier_id.splice(index1);
       			 ids.splice(index2);
       			 obj.removeAttr("checked");
       		 }
   		 })
        }
    });
}
function toadd(){
	if(ids.length==0){
		$.err("请选择要申请付运费的合同明细！");
		return false;
	}
    location.href="/zall/chain/finance/ticket/apply?id="+JSON.stringify(ids);
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
