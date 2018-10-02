var ids=[],carrierId=[],carrierReceiver=[];
function loadTable(){
    var paramJson = getParam();
    $("#tableList").pagination({
        url : "/zall/chain/finance/ticket/list",
        paramJson : paramJson,
        callback:function(){
        	 $('.collapse-link-btn').on('click',function(){
                 $(this).hasClass('fa-minus')?$(this).removeClass('fa-minus').addClass('fa-plus'):$(this).removeClass('fa-plus').addClass('fa-minus')
                 $(this).parents('tr').next('.collapse-link-box').toggle();
             })
             $(".fa-minus").click();
             $('.a').each(function(){
            	 $(this).on('click',function(){
            		 var first=$(this); 
            		 var id=first.attr("id");
            		 $(".item"+id).each(function(){
            			 var obj=$(this);
            			 if(first.is(':checked')){
                			 if((carrierId.length>0&&carrierId.indexOf(obj.attr("carrierId"))==-1)||(carrierReceiver.length>0&&carrierReceiver.indexOf(obj.attr("carrierReceiver")))){
                				 $.err("新增物流进项票必须是同一个承运方、收款公司");
                				 return false;
                			 }
                			 ids.push(obj.attr("id"));
                			 carrierId.push(obj.attr("carrierId"));
                			 carrierReceiver.push(obj.attr("carrierReceiver"));
                			 obj.attr("checked","checked");
                		 }else{
                			 var index1=carrierId.indexOf(obj.attr("carrierId"));
                			 var index2=carrierReceiver.indexOf(obj.attr("carrierReceiver"));
                			 var index3=ids.indexOf(obj.attr("id"));
                			 carrierId.splice(index1);
                			 carrierReceiver.splice(index2);
                			 ids.splice(index3);
                			 obj.removeAttr("checked");
                		 }
            		 })

            	 })
             });
        	 $(".item").on('click',function(){
    			 var obj=$(this);
    			 if(obj.is(':checked')){
        			 if((carrierId.length>0&&carrierId.indexOf(obj.attr("carrierId"))==-1)||(carrierReceiver.length>0&&carrierReceiver.indexOf(obj.attr("carrierReceiver")))){
        				 $.err("新增物流进项票必须是同一个承运方、收款公司");
        				 return false;
        			 }
        			 ids.push(obj.attr("id"));
        			 carrierId.push(obj.attr("carrierId"));
        			 carrierReceiver.push(obj.attr("carrierReceiver"));
        			 obj.attr("checked","checked");
        		 }else{
        			 var index1=carrierId.indexOf(obj.attr("carrierId"));
        			 var index2=carrierReceiver.indexOf(obj.attr("carrierReceiver"));
        			 var index3=ids.indexOf(obj.attr("id"));
        			 carrierId.splice(index1);
        			 carrierReceiver.splice(index2);
        			 ids.splice(index3);
        			 obj.removeAttr("checked");
        		 }
    		 })

        }
    });
}
function toadd(){
	if(ids.length==0){
		$.err("请选择要新增物流进项票的合同明细！");
		return false;
	}
    location.href="/zall/chain/finance/ticket/add?id="+JSON.stringify(ids);
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
