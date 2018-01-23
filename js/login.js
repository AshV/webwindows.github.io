
    $("#login").css("background-image","url(img/login_wallpaper.jpg)");
    $("#login").css("background-size","133%");
    $("#login").css("background-position","center center");
    $("#login").css("background-repeat","no-repeat");
    $("#login_2").hide();

var day = new Array("日","一","二","三","四","五","六");
var tt = new Date();
//	console.log("当前时间：" + tt.getHours() + "时" + tt.getMinutes() + "分" + tt.getSeconds() + "秒，周" + day[tt.getDay()] + "。\n\t还需要等待" + (59-tt.getSeconds()) + "秒" + (1000-tt.getMilliseconds()) + "毫秒设置时间。");
//	var wait_time = ((59-tt.getSeconds())*1000 + (1000-tt.getMilliseconds()));
var set_update_login = setTimeout("update_login_time()" , 10);
//	console.log(wait_time + "毫秒后将设置时间。");

$("body").keydown(function (e) {
    // console.log("键盘事件： " + '"' + String.fromCharCode(e.keyCode) + '" ' + e.keyCode);
    if (!($("#boot").length > 0) && ($("#login_1").length > 0)) {
        login1_out();
    }
    else if (!($("#login_1").length > 0) && ($("#denglu").length > 0) && ((e.keyCode == 32) || (e.keyCode == 13))) {
        true_denglu_mouseup();
    }
    if (($("#boot").length > 0 || $("#login").length > 0) && e.keyCode == 8) {
        //			console.log("start fast boot !");
        fast_boot();
    }
    if (($("#boot").length > 0 || $("#login").length > 0) && e.keyCode == 32) {
        fastest_boot();
    }
    if (e.keyCode == 117 && $("#login").length <= 0) {//F6 key
        try{
            desktop_refresh();
        }
        catch(err){};
        return false;
    }
    if (e.keyCode != 116 && e.keyCode != 122 && e.keyCode !== 123) {
        return false;
    }
});

$("#login").click(function(){
    clearTimeout(set_update_login);
    login1_out();
    $("#login").unbind('click');
});
function true_denglu_mouseup (){
    // console.log("denglu mouseup okokok ！");
    // console.log("login 取消绑定 事件");
    $("#login").unbind();
    $("#denglu").remove();
    $("#please_wait").show();
    $("#wait_span").html("请稍等 . . .");
    setTimeout('$("#wait_span").html("欢迎");',300);
    setTimeout('login_out();',1300);
}
$("#denglu").mousedown(function (e){
    if(e.which == 1)
    {
        // console.log("denglu mousedown");
        $("#denglu").css("outline","none");
        $("#denglu").animate({"width":"25.4%","height":"4.1%","margin-left":"37.3%","margin-top":"2.2%"},100);
        $("#denglu").css("background-color","rgba(255,255,255,0.3)");
        // console.log("denglu bind mouseup");
        $("#denglu").mouseup(function (ee){
            if(e.which == 1)
            {
                true_denglu_mouseup();
            }
            else{
                return false;
            }
        });
        // console.log("login 取消绑定 mousedown");
        $("#login").unbind("mousedown");
    }
    else{
        return false;
    }
});
$("#login").mousedown(function(e){
    if(e.which == 1){
        //login_mousedown();
        // console.log("login mouse down , denglu 取消绑定 mouseup");
        $("#denglu").unbind("mouseup");	
    }
    else{
        return false;
    }
});
$("#login").mouseup(function(e){
    if(e.which == 1){
        // console.log("login mouseup");
        // console.log("login 绑定mousedown事件");
        $("#login").mousedown(function(e){
            if(e.which == 1){
                //login_mousedown();
                // console.log("login mouse down , denglu 取消绑定 mouseup");
                $("#denglu").unbind("mouseup");	
            }
            else{
                return false;
            }
        });
        $("#denglu").unbind("mouseup");
        $("#denglu").css("background-color","rgba(255,255,255,0.2)");
        $("#denglu").animate({"width":"26%","height":"4.5%","margin-left":"37%","margin-top":"2%"},100);
    }
    else{
        return false;
    }
});
function update_login_time(){
    var now = new Date();
    var wait_time = ((59-now.getSeconds())*1000 + (1000-now.getMilliseconds()));
    var hours = now.getHours();
    var mins = now.getMinutes();
    if(hours < 10) hours = '0' + hours;
    if(mins < 10) mins = '0' + mins;
    $("#now_time").html( hours + ":" + mins);
    $("#now_date").html( now.getMonth()+1 + "月" + now.getDate() + "日, 星期" + day[now.getDay()] );
    // console.log("在" + $("#now_time").html()  + " " + now.getSeconds() + "," + now.getMilliseconds() + ",我设置了时间。");
    // console.log(wait_time + "毫秒后将再次设置时间。");
    set_update_login = setTimeout("update_login_time()" , wait_time);
}
function login1_out(){
    $("#login_1").animate({"bottom": "+=100%" , "opacity": "0.3"} , 300 , function (){
//			console.log("你单击了#login,或者键盘事件.");
        $("#login_1").remove();
        $("#login_cover").fadeTo(1000,1);
        $("#login").animate({"background-size": "137%"} , 500);
        $("#login_2").fadeIn(500);
    });
}
function login_out(){
    $("#denglu").unbind();
    $("#login").unbind();
    $("#desktop").show();
    $("#login").fadeOut(300,function(){
        $("#login").remove();
    });
}
function fast_boot(){
    if($("#boot").length > 0){
//			console.log("goto login");
        goto_login();
    }
    else if($("#login_1").length > 0){
//			console.log("login 1 click");
        $("#login").click();
    }
    else if($("#login_2").length > 0){
//			console.log("login 2 true mouseup");
//			setTimeout("$('#denglu').mousedown()",10);
//			setTimeout('$("#denglu").mouseup();',200);
//			setTimeout('$("#denglu").trigger("mousedown");',10);
//			setTimeout('$("#denglu").trigger("mouseup");',200);
//			$("#denglu").trigger('mousedown');
//			$("#denglu").trigger('mouseup');
        true_denglu_mouseup();
//			console.log("fast boot end");
        return ;
    }
//		console.log("fastboot once !");
    setTimeout("fast_boot()" , 1000);
}
function fastest_boot(){
    if($("#boot").length > 0){
        goto_login();
    }
    else{
        $("#login").slideUp(500,function(){
            $("#login").remove();
            $("#desktop").show();
        });
        return ;
    }
    setTimeout("fastest_boot()" , 1000);
}