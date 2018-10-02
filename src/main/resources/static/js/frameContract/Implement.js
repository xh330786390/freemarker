$(function(){
    loadTable();
})

//查询分页数据
function loadTable(){
    var param = getParam();
    $.ajax({
        url:'/zall/chain/purchase/contractReport/queryByPage',
        type:'POST',
        data:param,
        success: function(data) {
            $("#contractReprotTable").html("");
            $("#contractReprotTable").append(data);
        }
    });
}

//获取参数
function getParam(){
    var paramJson = {
        pageNum:1,
        pageSize:10,
        status:1
    };
    addParam('businessType',paramJson);//业务类型
    addParam('contractType',paramJson);//合同类型
    addParam('departId',paramJson);//业务部门
    addParam('goodsType',paramJson);//货物类型
    addParam('contractCode',paramJson);//合同编号
    addParam('customerName',paramJson);//客户
    addParam('supplierName',paramJson);//供应商
    addParam('status',paramJson);//状态
    addParam('warehouseName',paramJson);//仓库

    return paramJson;
}

//验证是否添加参数
function addParam(id,param){
    var value = $("#"+id).val().trim();
    if(value != null && value != ''){
        param[id] = value;
    }
}