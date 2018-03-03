	$("#shutdown_button").click(function(){
		if( confirm("页面即将关闭，你真的要关机么？") == true){
			window.close();
		}
	});
//	var num_of_quick_start_icons = 0;
//	function add_taskbar_shortcut(shortcut_name,img_src){
//		var tmp_element = $("<div>");
//		tmp_element.addClass("quick_start_div");
//		tmp_element.addClass("taskbaricon");
//		tmp_element.click(function(){create_window( shortcut_name );})
//		tmp_element.css({"background-image":img_src});
//		$("#program_list").prepend(tmp_element);
//	}
//	$.getJSON("setting/taskbar_icons.json",function(json){
//		$.each(json.shortcut,function(){
//			num_of_quick_start_icons++;
//			add_taskbar_shortcut(this.name , this.imgsrc);
//		});
//	});