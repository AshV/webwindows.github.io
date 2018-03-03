	$("#program_list").sortable({axis: "x",scroll: false,tolerance: "intersect"}).disableSelection();
	
	var num_of_quick_start_icons = 0;
	function add_taskbar_shortcut(shortcut_name,img_src){
		var tmp_element = $("<div>");
		tmp_element.attr("id","quick_start_icons_" + num_of_quick_start_icons);
		tmp_element.addClass("quick_start_div");
		tmp_element.addClass("taskbaricon");
		tmp_element.click(function(){create_window( shortcut_name );})
		tmp_element.css({"background-image":img_src});
		$("#program_list").prepend(tmp_element);
	}
	$.getJSON("setting/taskbar_icons.json",function(json){
		$.each(json.shortcut,function(){
			num_of_quick_start_icons++;
			add_taskbar_shortcut(this.name , this.imgsrc);
		});
	});
	$("#start_div").click(function(){
//		$("#start_menu").remove();
		var temp_start_menu = $("#start_menu");
		temp_start_menu.css({"bottom":$("#taskbar").css("height")});
		temp_start_menu.slideDown(200);
		temp_start_menu.focus();
		temp_start_menu.blur(function(){
			temp_start_menu.fadeOut(100,function(){ $(this).hide(); });
		});
		var temp_div = $("<div><span style='color: red;display:none;'>0</span></div>");
		temp_div.css({width:"100%",height:"100%",position:"absolute",top:"0px",left:"0px","z-index":10000});
		temp_div.click(function(){ $(this).remove(); });
		$("#desktop").append(temp_div);
	});
	$("#hide_or_show_the_desktop").click(function(){
		var flag_to_hide = false;
		for (i=0;i<$(".desktop_window").length;i++) {
			var tmp_ele = $($(".desktop_window")[i]);
			if(tmp_ele.css("display") != "none"){
				flag_to_hide = true;
			}
		}
		for (i=0;i<$(".desktop_window").length;i++) {
			var tmp_ele = $($(".desktop_window")[i]);
			if(flag_to_hide){
				tmp_ele.hide();
			}
			else{
				tmp_ele.show();
			}
		}
	});
