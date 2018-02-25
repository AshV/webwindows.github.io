	var num_of_quick_start_icons = 0;
	function add_taskbar_shortcut(shortcut_name,img_src){
		var tmp_element = $("<div>");
		tmp_element.addClass("quick_start_div");
		tmp_element.addClass("taskbaricon");
		tmp_element.css({"background-image":img_src});
		$("#program_list").prepend(tmp_element);
	}
	$.getJSON("setting/taskbar_icons.json",function(json){
		$.each(json.shortcut,function(){
			num_of_quick_start_icons++;
			add_taskbar_shortcut(this.name , this.imgsrc);
		});
	});
