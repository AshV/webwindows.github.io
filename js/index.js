
var end_load_login = false;
var end_load_desktop = false;
setTimeout("goto_login()" , 5000);
var start_time = new Date();
$(document).ready(function load_desktop(){
    $("#boot").contextmenu(function(){return false;});
    $("#login").contextmenu(function(){return false;});
    $("#window1").contextmenu(function(){return false;});
    $("#login").hide();
    $("#desktop").hide();
    
    $("#desktop").css("background-image","url(img/windows_10_wallpaper.jpg)");
    $("#desktop").css("background-size","100% 100%");
    $("#desktop").css("background-repeat","no-repeat");
//  $("#desktop").css("background-position","center");

    $( "#login" ).load( "login.html", function( response, status, xhr ) {
        if ( status == "error" ) {
            if(confirm("服务器好像出了点问题，加载失败,点击确定前往帮助页面。") == true){
                window.location.href="help.html";
            }
        }
        else if( status == "success"){
            end_load_login = true;
//						console.log("end_load_login");
        }
    });
    $("#desktop").load("desktop.html", function( response, status, xhr ) {
        if ( status == "error" ) {
            if(confirm("服务器好像出了点问题，加载失败,点击确定前往帮助页面。") == true){
                window.location.href="help.html";
            }
        }
        else if( status == "success"){
            end_load_desktop = true;
//						console.log("end_load_desktop");
        }
    });
    $(".circle").click(function(){
        goto_login();
        $(".circle").unbind('click');
    });
});
function goto_login (){
    if(end_load_login == true && end_load_desktop == true){
        var end_time = new Date();
        var used_time = (end_time - start_time);
//					console.log("加载完成，用时 " + used_time/1000 + "秒");
        $("#boot").fadeOut(250 , function () {$('#boot').remove();} );
        $("#login").delay(200).fadeIn(800  , function(){
            $("#window1").remove();
        });
        $("#boot_script").remove();
    }
    else{
        var end_time = new Date();
        var used_time = (end_time - start_time);
//					console.log("请等待加载，已用时 " + used_time/1000 + "秒");
        setTimeout("goto_login()",500);
    }
}