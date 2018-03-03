	var used_windows = 0;
	function create_window (tmp_program_name){
		var tmp_program = programs[tmp_program_name];
		var shortcut_name = tmp_program.name;
		var img_src = tmp_program.imgsrc;
		var window_name = tmp_program.window_name;
		var window_icon_src = tmp_program.window_icon_src;
		var title_name = tmp_program.title_name;
		var app_location = tmp_program.app_location;
		var iframe_style = tmp_program.iframe_style;
		$(".ui-selected").removeClass("ui-selected");
//	console.log("once dblclick");
		var tmp_string = 
	'<div class="desktop_window" style="display: none;">' +
		'<div class="window_title_bar" >' +
			'<img  class="window_icon" draggable="false" src="app/images/icons/speaker-16x16.png">' +
			'<span class="window_title"></span>' +
			'<button class="window_close_button window_button"></button>' +
		'</div>' +
		'<div class="window_content">' +
			'<iframe allowfullscreen=""></iframe>' +
		'</div>' +
	'</div>';
		var tmp_taskbar_string =
		'<div class="program">' +
			'<img/> <span></span>' +
		'</div>';
		used_windows++;
		var tmp_element = $(tmp_string);
		var tmp_taskbar = $(tmp_taskbar_string);
		tmp_taskbar.children().eq(0).attr("src",img_src);
		tmp_taskbar.children().eq(1).html(title_name);
		var tmp_class = window_name + "_" + used_windows;
		tmp_taskbar.attr("window_id",tmp_class);
		tmp_taskbar.addClass(tmp_class);
		tmp_taskbar.click(function(){
			var target_window = $("#" + tmp_class);
			if(target_window.css("display") != "none"){
				if(target_window.attr("id") != $("#innerdesktop").children().last().attr("id") ){
		//			console.log("not the last");
		//			target_window.detach();
					target_window.hide();
				}
				else{
					console.log("is the last child");
					target_window.hide();
				}
			}
			else{
				target_window.show();
			};
		});
		$("#program_list").append(tmp_taskbar);
		
		tmp_element.attr("id",tmp_class);
		tmp_element.children().first().children().eq(1).html(title_name);
		tmp_element.children().first().children().eq(0).attr("src",window_icon_src);
		tmp_element.children().eq(1).children().first().attr("src",app_location);
		tmp_element.children().eq(1).children().first().css(iframe_style);
		tmp_element.children().eq(0).children().eq(2).click(function(){
			$(this).parent().parent().remove();
			$("." + tmp_class).eq(0).remove();
		});
		$("#innerdesktop").append(tmp_element);
		tmp_element.draggable({stack: "div.desktop_window",scroll: false, handle:".window_title_bar"});
		tmp_element.show();
	}
