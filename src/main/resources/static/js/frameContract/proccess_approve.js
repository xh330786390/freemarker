//显示弹框
function modalShow(num){
    $("#appvore").val(num);
    $("#pass").text("");
    if(num == 2){
        $("#pass").text("通过");
    }else{
        $("#pass").text("驳回");
    }
    $("#zuofModal").modal("show");
}

//隐藏弹框
function modalHide(){
    $("#zuofModal").modal("hide");
}