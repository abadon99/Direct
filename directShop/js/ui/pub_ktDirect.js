// Direct 개선 2022
$(function(){
    $('body').addClass('ktd-wrap');

    //스크롤 메뉴 fixed
    $(window).scroll(function(){
        var height = $(document).scrollTop();
        if(height > 0){
            $('.ktd-conWrap').addClass('fixedHeader');
        }else if(height == 0){
            $('.ktd-conWrap').removeClass('fixedHeader');
        }
    });

    // 서브메뉴
    var swiperDepth = new Swiper('.ktd-depthMenu-wrap', {
        slidesPerView: 'auto',
        freeMode: true,
        loop: false,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: true,
        },
    });
    //TABDepth.init(swiperDepth);

    // 서브메뉴 펼침
    var $btnSubMenuWrap  = $('.ktd-depthMenu'),
        btnSubMenuWidth  =  $btnSubMenuWrap.find('.swiper-slide'),
        $btnSubMenu      = $btnSubMenuWrap.find('.btn-more');
    $(window).on('resize',function(){
        var totalW = 0,
            btnSubMenuWrapW  = $btnSubMenuWrap.width();

        btnSubMenuWidth.each(function(e){
            totalW += parseInt($(this).outerWidth());
        });
        if(btnSubMenuWrapW > totalW){
            $btnSubMenu.hide();
        } else {
            $btnSubMenu.show();
        }
    });

    $btnSubMenu.on('click', function(){
        if($btnSubMenuWrap.hasClass('on')){
            $(this).find('span').text('메뉴 펼치기')
            $btnSubMenuWrap.removeClass('on')
        } else {
            $(this).find('span').text('메뉴 접기')
            $btnSubMenuWrap.addClass('on')
        }
    });

    // Select Dropdown Menu
    if($('.ktd-selectMenu').length > 0){
        //ktdSelectMenu();
    };

    // 전체요금제, 다른 요금제 선택하기
    $('a[name="other-plan_system"]').on('click', function(e){
        e.preventDefault();
        // if($('#other-plan').is(':visible')){
        //     $('.ktd-conWrap').addClass('bg-f8');
        // }

        $('.wrapStep').hide();
        $('#other-plan').show();
        $(window).scrollTop(0);

        var swiperTabPayment5g = new Swiper('.tab-payment5g', {
            slidesPerView: 'auto',
            freeMode: true,
            loop: false,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true,
            },
        });
        TABDepth.init(swiperTabPayment5g);

        var swiperTabPaymentLte = new Swiper('.tab-paymentLte', {
            slidesPerView: 'auto',
            freeMode: true,
            loop: false,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
                hide: true,
            },
        });
        TABDepth.init(swiperTabPaymentLte);

        $('#other-plan .tab-charge li a').on('click', function(){
            if($('#tab-con1').is(':visible')){
                swiperTabPayment5g.update();
                TABDepth.init(swiperTabPayment5g);
            };
            if($('#tab-con2').is(':visible')){
                swiperTabPaymentLte.update();
                TABDepth.init(swiperTabPaymentLte);
            };
        });
    });

    // 전체요금제 - 펼처보기
    $('button.btn-expend').on('click', function(e) {
        var expendArea = $(this).closest('div.area');

        if(expendArea.hasClass('selected')){
            expendArea.removeClass('selected');
            $(this).find('span').text('자세히 보기');
        } else {
            expendArea.find('.box > a.go').trigger('click');
            $(this).find('span').text('자세히 보기 닫기');
        }
    });

    $('input[name="seeznAddItem"]').change(function(){
        var value = $(this).val();
        var checked = $(this).prop('checked', true);
        if(checked){
            // $(this).parent('li').siblings('li').removeClass('on').find('input').prop('checked', false);
            $(this).parent('li').addClass('on');
        } else {
            $(this).parent('li').removeClass('on');
        }
    })

    // 만족도 평가
    var checkVivald = setInterval(function(){
        if($('body > #DCX_SDEG').length>0){
            $('#DCX_SDEG').appendTo('.ktd-conWrap');
            $('#widgetMaskLayer').appendTo('.ktd-conWrap');
        };
        if($('.ktd-conWrap > #DCX_SDEG').length>0){
            clearInterval(checkVivald)
        };
    },100)
});

// as-is select toggle 호출
selectEvent();

var TABDepth = {
    init: function( ins ){
        var $tab = $('.tab-payment'),
            $anchor = $tab.find('a');

        $anchor.on('click', function(){
            var $siblings = $(this).closest('li').siblings().find('a'),
                activeIndex = ins.clickedIndex,
                grid = ins.snapGrid,
                limitX = grid[grid.length - 1],
                widthHalf = ins.width / 2,
                itemWidthHalf = ins.slidesSizesGrid[activeIndex] / 2,
                gridX = ins.slidesGrid[activeIndex] - widthHalf + itemWidthHalf,
                translateX = gridX > limitX ? limitX : gridX < 0 ? 0 : gridX;

            $siblings.removeClass('active');
            $siblings.find('a').attr({'title':''});
            $(this).attr({'title':'선택됨'}).addClass('active');

            ins.setTransition(500);
            ins.setTranslate(-translateX);
        })
    },
}

function ktdSelectMenu() {
	dropMenu = $(".ktd-selectMenu");
	dropMenu.each(function() {
		var This = $(this);
		btnDropMenu = This.find(".ui-btnMenu");
		uiDropBox = This.find(".ui-dropBox");
		uiBtnLst = uiDropBox.find(".ui-btnList");

		btnDropMenu.click(function(){
			var This = $(this);
			var MenuLst = This.siblings(".ui-dropBox");

			if($(this).hasClass("active")){
				$(this).removeClass("active");
				MenuLst.css("display","none");
				This.attr("aria-expanded", "false");
				MenuLst.attr("aria-expanded", "true");
			}else{
				dropMenu.find(".ui-btnMenu").removeClass("active");
				$(this).addClass("active");
				dropMenu.find(".ui-dropBox").css("display","none");
				MenuLst.css("display","block");
				This.attr("aria-expanded", "true");
				MenuLst.attr("aria-expanded", "false");
			}
		}); //드랍메뉴 버튼 클릭

		uiBtnLst.click(function(){
			var This = $(this);
			var thisTxt= This.text();
			var thisDropBox = This.closest(".ui-dropBox");
			var thisbtnMenu = thisDropBox.siblings(".ui-btnMenu")

			thisDropBox.css("display","none");
			thisbtnMenu.removeClass("active");

			This.closest(".ui-dropList").find(".ui-btnList").removeAttr("aria-expanded").removeAttr("title");
			This.attr("aria-expanded", "false").attr("title","선택됨");

			thisbtnMenu.text(thisTxt);

			thisbtnMenu.focus();
		}); //드랍메뉴 목록 버튼 클릭
	});
}

// 툴팁 토글 형태
$(document).on('click', '[data-type="tooltipToggle"]', function(e) {
    if($(this).next('div').is(':visible')){
        $(this).attr('title','열기').next('div').slideUp();
    } else {
        $(this).attr('title','닫기').next('div').slideDown();
    }
});

// 툴팁-팝업형태
$(document).on('click', '[data-type="ktdTooltip"]', function(e) {
    _this = $(this);
    $('.accessible-end').remove();
    $(".tooltipHelp").removeClass("on");
    $('.tooltipArticle').hide();

    if( _this.hasClass("on") ){
        _this.removeClass("on");
        _this.attr('title', '열기');
        $('.accessible-end').remove();
        $(".tooltipHelp").removeClass("on");
        $('.tooltipArticle').hide();
    }
    else {
        _this.addClass("on");
        _this.attr('title', '닫기');

        $('.tooltipArticle').append('<a href="javascript:void(0)" class="accessible-end"><em class="hidden">닫기</em></a>');
        _this.next('.tooltipArticle').show();
    }

    $('.accessible-end').on('focusin', function() {
        _this.attr('tabindex', '0');
        _this.focus();
    });

    $('.accessible-end').on('click', function() {
        _this.removeClass("on");
        _this.attr('title', '열기');
        _this.focus();
        $('.accessible-end').remove();
        $(".tooltipHelp").removeClass("on");
        $('.tooltipArticle').hide();
    });

    e.preventDefault();
});

// 툴팁-팝업형태 닫기
$("body, html").on({
    "click , touchstart" : function(e){
        if( ! $(e.target).hasClass("tooltipArticle").length){
            $('.accessible-end').remove();
            $(".tooltipHelp").removeClass("on");
            $('.tooltipArticle').hide();
        }
    }
});