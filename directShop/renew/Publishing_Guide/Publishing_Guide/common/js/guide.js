$(document).ready(function(){
    tabModule ();
	tabMenu ();
	select ();
	customCheckbox ();
	customRadio ();
	lnbTab();
	menuSub();
});

function tabModule() {
    $('.tab_wrap ul').each(function (e) {
        var tabMenu = $(this).closest('.s_block').addClass('tMenu'+e);
        $(this).find('li').each(function (index) {
            $(this).find('a').click(function (e) {
                e.preventDefault();
                var $li = $(this).parent('li');
                $li.parent().find('li').removeClass('on');
                $li.addClass('on');
                /*var thisSt = $(this).closest('.tab_wrap');
                thisSt.parent().find(".tab_area").hide();
                $('.tab_content').find('.tab_area').eq(index).show();*/
                tabMenu.find('.tab_area').hide();
                tabMenu.find('.tab_area').eq(index).show();
            });
        });
    });
}

function totalPage(){
    $(function(){
        var totSblock = $('.s_block').length;
        var totPage = $('tr').length;
        var curr_n = 0;

        $('td.chk_prog').text('진행중');

        $('tr').each(function(e){
            if ($(this).find('td.chk_url > a').length > 0){
                $(this).find('td.chk_prog').addClass('on').text('퍼블완료');
                curr_n ++;
            } else {
                $(this).find('td.chk_prog').text('진행중');
            }
        });
		if($('.td.chk_prog.on2')){
			$('td.chk_prog.on2').text('');
		}

        $('.tot_page').text(totPage-totSblock);
        $('.finish_page').text(curr_n);
        $('.progress_page').text(parseInt(curr_n / (totPage-totSblock) * 100));
    });

}

function tabMenu() {
	$('.tab_menu ul').each(function(e){
		var tabMenu = $(this).closest('.tab_wrap').addClass('tMenu'+e);
		tabMenu.find('.tab_Tarea').eq(0).show();
		$(this).find('li').each(function (index) {
			$(this).find('a').click(function (e) {
				e.preventDefault();
				var $li = $(this).parent('li');
				$li.parent().find('li').removeClass('on');
				$li.addClass('on');
				tabMenu.find('.tab_Tarea').hide();
				tabMenu.find('.tab_Tarea').eq(index).show();
			});
		});
	});
};

function select() {
	$('select.select').each(function(){
		$(this).after('<span class="select-indi"></span>')
	});
};

function customCheckbox(){
	var checkBox = $('input').parents(".input_check").find("input[type='checkbox']");
	$(checkBox).each(function(){
		$(this).wrap( "<span class='custom_checkbox'></span>" );
		$(this).parent().parent().css("position","relative");
		if($(this).is(':checked')){
			$(this).parent().addClass("selected");
		}
		if($(this).is(':disabled')){
			$(this).parent().addClass("disabled");
		}
	});
	$(checkBox).click(function(){
		$(this).parent().toggleClass("selected");
	});
};

function customRadio(){
	var radioButton = $('input').parents(".input_radio").find("input[type='radio']");//[name='\' + this.name + \'']");
	$(radioButton).each(function(){
		$(this).wrap( "<span class='custom_radio'></span>" );
		$(this).parent().parent().css("position","relative");
		if($(this).is(':checked')){
			$(this).parent().addClass("selected");
		}
		if($(this).is(':disabled')){
			$(this).parent().addClass("disabled");
		}
	});
	$(radioButton).click(function(){
		if($(this).is(':checked')){
			$(this).parent().addClass("selected");
			getName = $(this).attr('name');
		}
		$(radioButton).not(this).each(function(){
			if ($(this).attr("name") == getName){
				$(this).parent().removeClass(function(){
					return "selected";
				});
			}
		});
	});
};

function lnbTab(){
	var menu = $('#lnb > .depth01 > li > a');
	menu.on('click', function(){
		$(this).next('ul').slideToggle();
	})
}

function menuSub(){
	var menuSub = $('.depth02 > li > a'),
		conBlock = $('.s_block');

	menuSub.on('click', function(e){
		e.preventDefault();

		$('.depth02 > li').removeClass('current');
		$(this).parent('li').addClass('current')
		var activeNum = $(this).parent('li').index();
		var activeBlock = conBlock.eq(activeNum).offset().top;
		$('html, body').animate({scrollTop:activeBlock-80},500);
	})
}

$(window).on('scroll', function(){
	scrNav();
});

function scrNav(){
	var sTop = $(window).scrollTop() + 100;
	var link = $('.depth02 > li');

    $('section').each(function(e) {
		var offset = $(this).offset().top-1,
			height = $(this).height();
		if(sTop >= offset && sTop < offset + height) {
			link.removeClass('current');
			$('.depth02 > li').eq(e).addClass('current');
		}
	});
}



