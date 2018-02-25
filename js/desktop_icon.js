	$("#innerdesktop").selectable({ filter: "div > div" });
	var desktop_icons_per_lie;
	var desktop_icons_per_hang;
	function desktop_refresh(){
		var num_of_desktop_icon = 0;
		var window_width = window.innerWidth;
		var window_height = window.innerHeight;
		window_height = window_height - $("#taskbar").height();
		desktop_icons_per_lie = Math.floor((window_height) / 100);
		desktop_icons_per_hang = Math.floor((window_width) / 75);
		var tmp_css_innerdesktop_width = desktop_icons_per_hang * 75 + "px";
		var tmp_css_innerdesktop_height = desktop_icons_per_lie * 100 + "px";
		// $("#innerdesktop").css({width: tmp_css_innerdesktop_width,height: tmp_css_innerdesktop_height});
		// var cnt_of_all_block = "(" + desktop_icons_per_lie + "," + desktop_icons_per_hang + ")";
		$(".desktop_icon").each(function(){
			num_of_desktop_icon++;
			var the_id = "desktop_icon_" + num_of_desktop_icon;
			$(this).attr("id" , the_id);
			var tmp_lie_pos = Math.floor(num_of_desktop_icon / desktop_icons_per_lie) + 1;
			var tmp_hang_pos = num_of_desktop_icon % desktop_icons_per_lie;
			if(tmp_hang_pos == 0){
				tmp_lie_pos--;
				tmp_hang_pos = desktop_icons_per_lie;
			}
			var tmp_css_top = (tmp_hang_pos-1) * 100 + "px";
			var tmp_css_left = (tmp_lie_pos-1) * 75 + "px";
			$(this).css({top: tmp_css_top , left: tmp_css_left});
			// $(this).find("span").html("此电脑" + num_of_desktop_icon);
		});
		$(".the_focus").removeClass("the_focus");
	}
	function add_desktop_shortcut(shortcut_name,img_src){
		var tmp_element = $("<div>");
		tmp_element.addClass("desktop_icon");
		tmp_element.append('<div><img/><span></span></div>');
		tmp_element.find("img").attr({"src":img_src,"draggable":"false"});
		tmp_element.find("span").html(shortcut_name);
		tmp_element.droppable()
					.draggable({
						revert: "valid",
						scroll: false,
						handle: "div img,div span",
						start: function(){
							if($(this).children().first().hasClass("ui-selected")){
								$(this).attr("start_css_top",$(this).position().top);
								$(this).attr("start_css_left",$(this).position().left);
								var what_selected = $("div.desktop_icon > div.ui-selected");
								what_selected.each(function(index,tmp_obj) {
									tmp_obj = $(tmp_obj);
									tmp_obj.parent().attr("start_css_top", tmp_obj.offset().top );
									tmp_obj.parent().attr("start_css_left",tmp_obj.offset().left );
								});
							}
						},
						drag: function(){
							if($(this).children().first().hasClass("ui-selected")){
								var tmp_id = $(this).attr("id");
								var d_top = $(this).position().top - $(this).attr("start_css_top");
								var d_left = $(this).position().left - $(this).attr("start_css_left");
								var what_selected = $("div.desktop_icon > div.ui-selected");
								what_selected.each(function(index,tmp_obj) {
									tmp_obj = $(tmp_obj);
									var tmp_top = parseInt(tmp_obj.parent().attr("start_css_top"))  +d_top;
									var tmp_left = parseInt(tmp_obj.parent().attr("start_css_left"))+d_left;
									tmp_obj.parent().css("top", tmp_top  +"px");
									tmp_obj.parent().css("left",tmp_left +"px");
								});
							}
						},
						stop: function() {
							if($(this).children().first().hasClass("ui-selected")){
								var what_selected = $("div.desktop_icon > div.ui-selected");
								what_selected.each(function(index,tmp_obj) {
									tmp_obj = $(tmp_obj);
									get_correct_position(tmp_obj.parent() );
								});
							} else{
								get_correct_position($(this));
							}
						}
					})
					.click(function() {$(this).children().first().addClass("ui-selected");$(".the_focus").removeClass("the_focus");$(this).addClass("the_focus");})
					.css("position", "absolute");
		$("#innerdesktop").append(tmp_element);
		desktop_refresh();
	}
	function get_correct_position(tmp_jquery_obj){
		var tmp_css_left = parseInt( tmp_jquery_obj.css("left"));
		var tmp_css_top = parseInt( tmp_jquery_obj.css("top"));
		var half_75 = 75/2;
		var half_100 = 100/2;
		var t = parseInt(tmp_css_top / half_100);
		var l = parseInt(tmp_css_left / half_75);
		t = (t < 0 ? 0 : t);
		l = (l < 0 ? 0 : l);
		t = (t > (desktop_icons_per_lie - 1) * 2 ? (desktop_icons_per_lie - 1) * 2 : t);
		l = (l > (desktop_icons_per_hang - 1) * 2 ? (desktop_icons_per_hang - 1) * 2 : l);
		if (t % 2 == 0) {
			tmp_jquery_obj.css({top: (((t + 2) / 2) - 1) * 100 + "px"});
		} else {
			tmp_jquery_obj.css({top: (((t + 3) / 2) - 1) * 100 + "px"});
		} if (l % 2 == 0) {
			tmp_jquery_obj.css({left: (((l + 2) / 2) - 1) * 75 + "px"});
		} else {
			tmp_jquery_obj.css({left: (((l + 3) / 2) - 1) * 75 + "px"});
		}
	}
	$.getJSON("setting/desktop_icons.json",function(json){
		$.each(json.shortcut,function(){
			add_desktop_shortcut(this.name , this.imgsrc);
		});
		desktop_refresh();
	});
	$(window).resize(function(){desktop_refresh();});