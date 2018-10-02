/**
 * 装船装车 JS
 */
$(function () {
    init();
    /**明细文件导入*/
    var items = new Array();
    $("#willShipItems").find("tr").each(function (i) {
        var item='';
        for (var i=0 ; i<5 ; i++){
            if (i == 1)continue;
            if (i == 3){
                if ($(this).find("td").eq(i).text().trim() == '抄码'){
                    item += "2";
                }
                if ($(this).find("td").eq(i).text().trim() == '磅计'){
                    item += "1";
                }
                if ($(this).find("td").eq(i).text().trim() == '理计'){
                    item += "0";
                }
                continue;
            }
            item += $(this).find("td").eq(i).text();
        }

        if ($(this).find("input[name=packageCode]").val()==''){
            item+="&&&&[][]";
        }else {
            item+=$(this).find("input[name=packageCode]").val();
        }
        items.push(item);
    })
    var itemsJson = {items:items.join(",")};
    fileChange("fileItem",'/zall/chain/purchase/contract/ship/item/item',{
        data:itemsJson,
        success:function (result) {
            if (result.status == '500' ){
                alert( result.msg);
            }else if(result.status == '200'){
                var importItem='';
                $("#importItems").find("tr").hasClass("redport");
                var isFail = false;
                $.each(result.data,function (key,item) {
                    importItem += '<tr ';
                    importItem += item.isFail == '1' ? 'class="item-isTrue"':'class="item-isFail"';/** == 1 是该装船装车明细下的明细*/
                    importItem += '>'+
                        '<td>'+item.breedName+'</td>'+
                        '<td>'+item.spec+'</td>'+
                        '<td>'+item.material+'</td>'+
                        '<td>'+getMethod(item.weightPattern)+'</td>'+
                        '<td>'+item.logoPlace+'</td>'+
                        '<td>'+numUtils.floatWeight(item.weight)+'</td>'+
                        '<td>吨</td>'+
                        '<td>'+numUtils.roundingLong(item.itemNum,0)+'</td>'+
                        '<td>件</td>'+
                        '<td>'+getPack(item.packageCode)+'</td>'+
                        '<td>'+numUtils.roundingLong(item.itemPiece,0)+'</td>'+
                        '</tr>';
                    if (!isFail && item.isFail != '1'){
                        isFail = true;
                    }
                    if (item.isFail == '1'){
                        for (var i=0 ; i<items.length ; i++){
                            console.log(items[i]+"----"+key)
                            if (items[i] == key){
                                var $_shipWeight = $("#willShipItems").find("tr").eq(i).find("input[name=shipWeight]");
                                var $_shipNum = $("#willShipItems").find("tr").eq(i).find("input[name=shipNum]");
                                $_shipWeight.val(numUtils.floatWeight(item.weight));
                                $_shipNum.val(numUtils.roundingLong(item.itemNum,0));
                            }
                        }
                    }
                });
                console.log(importItem)
                $("#noItems").hide();
                $("#importItems").html(importItem);
                if (isFail){
                    $("#warning").show();
                    $("#warning").addClass("item-check");
                    $("#warning").find("p").replaceWith("<p>提示：数据行为红色，说明该条信息不在该合同明细中，将不会被保留在装船装车单中。</p>");
                }else{
                    $("#warning").show();
                    $("#warning").addClass("item-check");
                    $("#warning").find("p").replaceWith("<p>提示：数据导入正常。</p>");
                }
            }
        }
    });

    $(".addShip").click(function () {
        save();
    })
})

function getMethod(i) {
    if (2 == i){
        return "抄码";
    }
    if (1 == i){
        return "磅计";
    }
    if (0 == i){
        return "理计";
    }
}

function save() {
    if (validateForm()){
        var isFail=false;var arr=new Array();
        $("input[name=shipWeight]").each(function (i) {
            var s = numUtils.longWeight($(this).val());
            var m = numUtils.longWeight($(this).parent().parent().find("td").eq(7).text());
            console.log(s+","+m)
            if (s > m){
                arr.push(i+1);
                isFail = true;
            }
        });
        if (isFail) {
            parent.layer.msg('第'+arr.toString()+"条明细执行重量大于未装船装车重量，请修改");
            return;
        }
        var json={};
        /**合同基本信息*/
        createJson(json,"businessType",businessType);
        createJson(json,"contractType",contractType);
        createJson(json,"contractCode",contractCode);
        createJson(json,"supplierCode",supplierCode);
        createJson(json,"customerId",customerId);
        createJson(json,"customerName",customerName);
        createJson(json,"supplierId",supplierId);
        createJson(json,"supplierName",supplierName);

        /**装船装车单信息*/
        createJson(json,"shipCode",$("#ship_code").val());
        var shipWeight="0";
        $("#willShipItems input[name=shipWeight]").each(function () {
            shipWeight += numUtils.add(shipWeight,$(this).val());
        });
        var shipNum="0";
        $("#willShipItems input[name=shipNum]").each(function () {
            shipNum += numUtils.add(shipNum,$(this).val());
        });
        createJson(json,"num",shipNum);
        createJson(json,"weight",shipWeight);
        createJson(json,"shipDate",getTime($("#ship_date").val()));
        createJson(json,"remark",$("#remake").val());
        var isTrue = true;var trs = new Array();
        /**装船装车单明细*/
        $("#willShipItems").find("tr").each(function (i) {
            createJson(json,"contractShipItems["+i+"].shipCode",$("#ship_code").val());
            createJson(json,"contractShipItems["+i+"].contractCode",contractCode);
            createJson(json,"contractShipItems["+i+"].breedCode",$(this).find("input[name=breedCode]").val());
            createJson(json,"contractShipItems["+i+"].breed",$(this).find("td").eq(0).text());
            createJson(json,"contractShipItems["+i+"].spec",$(this).find("td").eq(1).text());
            createJson(json,"contractShipItems["+i+"].material",$(this).find("td").eq(2).text());
            createJson(json,"contractShipItems["+i+"].weightType",$(this).find("input[name=weightPattern]").val());
            createJson(json,"contractShipItems["+i+"].factory",$(this).find("td").eq(4).text());
            createJson(json,"contractShipItems["+i+"].baleNum",$(this).find("input[name=packageCode]").val());
            createJson(json,"contractShipItems["+i+"].contractWeight",numUtils.longWeight($(this).find("td").eq(6).text()));
            createJson(json,"contractShipItems["+i+"].weight",numUtils.longWeight($(this).find("input[name=shipWeight]").val()));
            createJson(json,"contractShipItems["+i+"].num",$(this).find("input[name=shipNum]").val());
            createJson(json,"contractShipItems["+i+"].unitPrice",$(this).find("input[name=unitPrice]").val());
            createJson(json,"contractShipItems["+i+"].money",$(this).find("input[name=money]").val());
        });
        ajax('/zall/chain/purchase/contract/ship/item/add','post',{
            data:json,
            success:function (data) {
                if (data.status == '200'){
                    MyDialog('添加成功!',{
                        success:function () {
                            window.location.href="/zall/chain/purchase/contract/ship/detail?contractCode="+contractCode+"&businessType="+businessType;
                            parent.layer.closeAll();
                        }
                    });
                }else {
                    Dialog(data.msg);
                }
            }
        })
    }
}

function init() {
    $("#warning").hide();/**隐藏提示信息*/
    $("input").addClass("my-input");
}

function getPack(p) {
    if (p=='&&&&[][]'){
        return "";
    }else {
        return p;
    }
}