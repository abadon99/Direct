$(document).ready(function(){
    /**
    * Clearable text inputs
    */
    function tog(v) {
        return v ? 'addClass' : 'removeClass';
    }
    $('.clearable').wrap('<span class="clearbleWrap"></span>')
    $('.clearbleWrap').append('<a href="#" class="clearbleDel" aria-hidden="true" tabindex="-1">삭제</a>');
    $(document).on('input', '.clearable', function() {
        $(this)[tog(this.value)]('x');
        $(this).next().attr({'aria-hidden' : false}).removeAttr('tabindex');
    }).on('mousemove', '.clearbleDel', function(e) {
        $(this).prev()[tog(this.offsetWidth - 36 < e.clientX - this.getBoundingClientRect().left)]('onX');
        $(this).removeAttr({'aria-hidden' : true, 'tabindex' : -1}).prev().removeClass('active').focus();
    }).on('touchstart click', '.clearbleDel', function(ev) {
         ev.preventDefault();
        $(this).prev().removeClass('x onX').val('').change();
        $(this).attr({'aria-hidden' : true, 'tabindex' : -1}).prev().removeClass('active').focus();
    });
    $('.step-navi').scrollLeft(10000);

    // snb 메뉴
    if(!($('#menu').hasClass('active'))){
        $('#menu').attr({'aria-hidden': true, 'tabindex': -1, 'aria-modal' : false});
    }else{
        $('#menu').attr({'aria-hidden': false, 'aria-modal' : true}).removeAttr('tabindex');
    }
    $('.menu').on('click', function(){
        if($(window).width() > 768){ //pc의 경우
            $('#menu .inner').append('<a href="#" class="menuLoop">메뉴닫기로 이동</a>');
        }
        $('#menu').addClass('active').attr({'aria-hidden': false, 'aria-modal' : true}).removeAttr('tabindex');
        $('#main-contents, header, .event-content, .footer').attr({'aria-hidden': true, 'tabindex': -1, 'aria-modal' : false});
        $('#main-contents, header, .event-content, .footer').find('a, input, button, select, img, span').attr({'aria-hidden': true, 'tabindex': -1});
        $('body').css('overflow', 'hidden');
        setTimeout(function(){
            $('#menu .menu-close').focus();
        }, 450);
    });
    $('.menu-close').on('click', function(){
        $('#menu .inner .menuLoop').remove();
        $('#menu').removeClass('active').attr({'aria-hidden': true, 'tabindex': -1, 'aria-modal' : false});
        $('#main-contents, header, .event-content, .footer').attr({'aria-hidden': false, 'aria-modal' : true}).removeAttr('tabindex');
        $('#main-contents, header, .event-content, .footer').find('a, input, button, select, img, span').removeAttr("aria-hidden tabindex");
        setTimeout(function(){
            $('header .menu').focus();
        }, 450);
        $('body').css('overflow', '');
    });
    $(document).on('focus click', '.menuLoop', function(){
        $('#menu .menu-close').attr('tabindex', 0)
        setTimeout(function(){
            $('#menu .menu-close').focus()
        }, 300);
    });
    $(document).on('focusout', '#menu .menu-close', function(){
        $('#menu .menu-close').removeAttr('tabindex')
    });

    //팝업창 href 링크 막기
    $('.ui-popup-call').on('click',function(e){
        e.preventDefault();
    });

    $('.list-charge .area a.arrow').on('click',function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open')
            $(this).parents('.area').find('.line-hidden').slideUp();
        }else{
            $(this).addClass('open')
            $(this).parents('.area').find('.line-hidden').slideDown();
        }
    })
    selectEvent()
    if($('.new-contents').hasClass('bg-f8')){
        $('body').addClass('bg-f8')
    }
    //0 아닌 선택시 색깔 변경
    $('select').on('change',function(i){
        if($(this).find('option:selected').index() == 0){
                var obj = $(this);
                setTimeout(function(){
                    obj.addClass('placeholder');
                },1)
        }else{
            $(this).removeClass('placeholder')
        }
     })

    /* data-effect' */
    dataEffectTabInit();
    $('[data-effect="tab"] a, [data-effect="tab"] input').on('click',function(e){
        //a link  href="#aaa" or data-link="#aaa"

        var _this;
        var obj = $(this).attr('href') || $(this).data('link');

        if($(this).prop('tagName') == 'INPUT'){
            _this = $(this).prev();
        }else{
            _this = $(this);
        };
        if(obj =='' || obj == '#'){return false;} // 값이 없거나 # 인 경우 실행안되게
        _this.parents('li').addClass('active').siblings('li').removeClass('active');
        _this.attr({'aria-selected':true,'title':'선택됨'}).parent().siblings().children('a').attr({'aria-selected':false,'title':''});
        $(obj).addClass('active').siblings('div').removeClass('active') ;

        e.preventDefault();
    })
    $('[data-effect="tab"] input').prev().on('click',function(e){
        $(this).next().trigger('click');
    });

    /* input effct */
    $('input[type=tel], input[type=text]').on('focusout',function(){
        var obj =$(this);
        setTimeout(function(){
            if(obj.val().length > 0 || obj.val() !=''){
                obj.addClass('active');
            }
        })
    });
    /* 요금제 선택, FAQ*/
    $('dl.list-charge dt, .faq-area dt').on('click',function(){
        var obj = $(this);
        if(obj.hasClass('selected')){
            obj.removeClass('selected');
            $('html, body').animate({
                scrollTop:0
            },100);
        }else{
            obj.addClass('selected').siblings('dt').removeClass('selected');
            $('html, body').animate({
                scrollTop:obj.offset().top
            },100);

        }
    });

    $(document).on('click', '.detail .order-detail .faq-area dt' , function(){
        var obj = $(this);
        if(obj.hasClass('selected')){
            obj.removeClass('selected');
            $('html, body').animate({
                scrollTop:0
            },100);
        }else{
            obj.addClass('selected').siblings('dt').removeClass('selected');
            $('html, body').animate({
                scrollTop:obj.offset().top
            },100);

        }
    });

    // $(document).on('click', 'dl.list-charge dt, .faq-area dt' , function(){
    //     var obj = $(this);
    //     if(obj.hasClass('selected')){
    //         obj.removeClass('selected');
    //         $('html, body').animate({
    //             scrollTop:0
    //         },100);
    //     }else{
    //         obj.addClass('selected').siblings('dt').removeClass('selected');
    //         $('html, body').animate({
    //             scrollTop:obj.offset().top
    //         },100);

    //     }
    // });

    //popup 확인
    $('.btn-bottom .btn-close').on('click',function(){
        $('body').css('overflow', '');
    })
    $('h1 .back').on('click',function(){
         history.go(-1);
    });

    //공통 모바일 접근성 role 추가
    $('a').each(function(){
        if($(this).attr('role') == undefined){
            $(this).attr('role', 'button');
        }
    });
    $('[data-effect="tab"] a').each(function(){
        //$(this).attr('role', 'tab');
    })
    // placeholder -> title로 복사
    /*
    $('input[type="text"], input[type="password"], input[type="tel"]').each(function(){
        var titleTxt = $(this).attr('placeholder');
        if(titleTxt != undefined ){
            $(this).attr('title', titleTxt);
        };
    });
*/
    //공통 contents페이지 안에 있는 페이지제목
    titleAriaLabel();

    //공통 약관버튼 오른쪽버튼 접근성
    $('[list-type="agreement"] li').each(function(index, el) {
        var agreeText = $.trim($(this).find('span').text())
        $(this).find('.go').attr('aria-label', agreeText + ' ' + $(this).find('a').attr('title'))
    });

});

//새창 호출
function callWindow(_url,_w,_h,_n){
    if(_w === undefined){
        _w = 500;
    }
    if(_h === undefined){
        _h = 700;
    }
    if(_n === undefined){
        _n = 'popup';
    }

    var _left = (screen.width - _w) / 2;
    var _top = (screen.height - _h) / 2;
    option ='width='+_w+', height='+ _h;
    option +=', top='+_top+', left='+_left;
    var newWin = window.open(_url,_n,option)
    if(window.focus) newWin.focus();
}
function popupOpen(obj, thisIs){
    var headTabIdx = '.header, header h1';
    var $headerObj = $(obj).find(headTabIdx);
    $('body').css('overflow', 'hidden');

    //접근성 내용추가
    $(obj).siblings('[class*="popup"]').attr({'aria-hidden': true});
    $(obj).attr({'aria-hidden': false, 'tabindex': 0}).fadeIn(400).addClass('active');
    $('#contents').attr('aria-hidden', true);
    $headerObj.attr('tabindex', 0);

    if(thisIs != undefined){
        $(thisIs).addClass('focusIs');
    }
    setTimeout(function(){
        $headerObj.focus();
    }, 420);

    if($(window).width() > 768){ //pc의 경우
        $(obj).append('<a href="#" class="popLoop">팝업 타이틀로 이동</a>');
    }
    $(document).on('focus click', '.popLoop', function(){
        $headerObj.focus();
    });

};
function popupClose(obj){
    $('body').css('overflow','');
    $(obj).fadeOut(400).removeClass('active');

    //접근성 내용추가
    $('#contents').attr('aria-hidden', false);
    $(obj).attr('aria-hidden', true).removeAttr('tabindex').siblings('[class*="popup"]').attr('aria-hidden', true);
    $(obj).find('.header, header h1').removeAttr('tabindex');
    $(obj).find('.popLoop').remove();

    setTimeout(function(){
        $('.focusIs').focus().removeClass('focusIs');
        $('[data-target="' + obj + '"], [href="' + obj + '"]').focus();
    }, 300);
};

function titleAriaLabel(){
    var arialabel = '#contents h1 button, #mainContents h1 button'
    $(arialabel).each(function(){
        $(this).attr('aria-label', $(this).text() + ', 이전화면으로 이동');
    })
}


function selectEvent(){
    var ulTemp;
    $('.select-area ul li:first-child a').addClass('selected');

    $('.select-area > a').on('click',function(e){
        ulTemp = $(this).attr('href');

        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $(ulTemp).hide();
        }else{
            $('.select-area ul').hide();
            $('.select-area > a').removeClass('open');
            $(this).addClass('open');
            $(ulTemp).show();
        }
        e.preventDefault();
    });
    $('.select-area ul li a').on('click',function(e){
        var temp =$(this).text();
        $(this).closest('ul').find('li a').removeClass('selected');
        $(this).addClass('selected');
        $(this).parents('.select-area').children('a').removeClass('open').text(temp).focus();
        $(ulTemp).hide();
        e.preventDefault();
    });
    $('html').click(function(e) {
        if(!$(e.target).is('.select-area > a')){
            $('.select-area > a').removeClass('open');
            $('.select-area > ul').hide();
        }
    });
}
/* input dim 처리 */
function inputDim(obj){
    $(obj).find('input[type=text], input[type=tel]').attr('readonly',true).addClass('read-only');
    $(obj).find('input[type=radio], input[type=checkbox]').attr('disabled',true);
    $(obj).find('.clearable').removeClass('clearable').addClass('clearable-not');
    $(obj).find('button, select').attr('disabled',true);
    $(obj).find('a').off('click');
    $(obj).find('a').on('click',function(e){
        e.preventDefault();
        $(this).removeClass('ui-popup-call');
    });
}
function inputDimClose(obj){
    $(obj).find('input[type=text], input[type=tel]').attr('readonly',false)
    $(obj).find('.clearable-not').removeClass('clearable-not').addClass('clearable')
    $(obj).find('button, select').attr('disabled',false)
}
/*
* 슬라이더 기준 표시 위치값 설정 안내 텍스트
*/
//  슬라이더 함수
function sliderStart(){
    init() //세팅

    function init(){
        $('.new-range-area').each(function(){
        var obj = $(this).find('.track');
        var total = $(this).find('label').length;
        for(var i = 0; i < total;i++){
            var pos = $(this).find('label').eq(i)
            var newValue =  pos.data('pos');
            pos.prev('input').css('left','calc('+newValue+'% - 10px)');
            pos.css('left','calc('+newValue+'% + '+0+'px)');
        }

    })
    }
    function getPageX(e){
        var clickedAtX  = e.pageX || e.originalEvent.touches[0].pageX;
        clickedAtX = clickedAtX - (80+$(window).width()-$('#contents').width())/2
        return clickedAtX
    }
    function startHandler(e){
        $('.new-range-area .bar').css('transitionDuration','0s');
        var nowPageX = getPageX(e);
        if( nowPageX >= -5 && nowPageX<=$(this).width()-10){ // 그래프 영역안에서만 이벤트 먹히게
            $(this).find('.bar').css('transform','translate('+nowPageX+'px)');
        }
        $('.new-range-area .track').on(moveEventType,moveHandler);
    }
    function moveHandler(e){
        var nowPageX = getPageX(e);

        if( nowPageX >= -5 && nowPageX<=$(this).width()-10){
            var nowPageX = getPageX(e);
            var obj = $(this).parents('.new-range-area').find('.bar')
            obj.css({
                '-webkit-transform':'translateX('+nowPageX+'px)',
                        'transform':'translateX('+nowPageX+'px)'
            })
        }
    }
    function stopHandler(e){
        function setPos(obj,i){
            obj.eq(i).trigger(clickEventType);
        }
        var nowPageXTemp = $(this).find('.bar').css('transform').replace(/[^0-9\-.,]/g,'').split(','),
        checkInput = $(this).parents('.new-range-area').find('input[type=radio]'),
        temp = Math.abs(parseFloat(checkInput.eq(0).css('left')) - parseFloat(checkInput.eq(1).css('left')))/2;
        var  nowPageX = nowPageXTemp[12] || nowPageXTemp[4];

        checkInput.each(function(i){
            var value = parseFloat($(this).css('left'))
            if(i == 0){
                if(nowPageX >= 0 && nowPageX < value + temp){
                    setPos(checkInput,i);
                }
            }else if(i == $(this).parents('.new-range-area').find('input[type=radio]').length-1){

                if(nowPageX >= value - temp && nowPageX <= $(this).parents('.new-range-area').width()){
                    setPos(checkInput,i);
                }
            }else{
                if(nowPageX >= value - temp && nowPageX <= value + temp ){
                    setPos(checkInput,i);
                }
            }
        })
        $('.new-range-area .track').off(moveEventType,moveHandler);
    }

    var clickEventType= document.ontouchstart !== null ? 'mousedown' : 'touchstart',
        moveEventType = document.ontouchmove  !== null ? 'mousemove' : 'touchmove' ,
        endEventType  = document.ontouchend   !== null ? 'mouseup'   : 'touchend'  ;


    //click
    $('.new-range-area input[type=radio]').on(clickEventType,function(){
       $(this).parents('.new-range-area').find('.bar').css('transform','translate('+$(this).css('left')+')');
       $(this).prop('checked',true)
    });
    $(document).on('click', '.new-range-area input[type=radio]', function(){
        $(this).trigger(clickEventType);
    });

    //mousedown touchstart
    $('.new-range-area .track').on(clickEventType,startHandler)
    // mouseup touchend
    $('.new-range-area .track').on(endEventType,stopHandler);
    $('.new-range-area .track').on('mouseleave',function(){
       // console.log('out')
    });
    $(window).on('resize',function(){

        $('.setp-area:visible .new-range-area .track .bar').css({
                '-webkit-transform':'translateX(0px)',
                        'transform':'translateX(0px)'
        })
        $('.setp-area:visible .new-range-area input[type=radio]').prop('checked',false)

    })
};

//Tab기본세팅
function dataEffectTabInit(){
    $('[data-effect="tab"] a, [data-effect="tab"] input').each(function(){
        var _this;
        if($(this).prop('tagName') == 'INPUT'){
            $(this).attr({'aria-hidden' : true, 'tabindex' : -1}).prev().wrap('<a href="#"></a>');
            _this = $(this).prev();
        }else{
            _this = $(this);
        };
        if($(this).parent().hasClass('active')){
            _this.attr('aria-selected', true);
            _this.attr('title','선택됨');
        }else{
            _this.attr('aria-selected', false);
        }
    });
};

//페이지 전환
jQuery.pageCallPop = function(options){
    var option = {
        openObj : '.pageCall',
        openFocus : 'h1 button',
        closeObj : '.comPage h1 button',
        siblingsObj : 'header, #menu, #main-contents, .footer',
        objId : '.comPage',
        objIdWrap : '#mainContents',
    }
    $.extend(option, options);

    //페이지변환
    $(document).on('click', option.openObj, function(e){
        var obj = $(this).attr('href');
        $(obj).fadeIn().closest(option.objIdWrap).fadeIn().siblings(option.siblingsObj).hide();
        $(obj).find(option.openFocus).focus();
        e.preventDefault();
    });
    $(document).on('click', option.closeObj, function(){
        var obj = '#'+$(this).closest(option.objId).attr('id');
        $(obj).closest(option.objIdWrap).fadeOut().siblings(option.siblingsObj).fadeIn();
        $(obj).fadeOut();
        $('[data-target="' + obj + '"], [href="' + obj + '"]').focus();
    });
}


// 요금제 선택
$(document).on('click', '.list-charge .area a.go', function(e){

    $('.list-charge .area.selected').removeClass('selected');
    $('.list-charge .choice-area input[type=checkbox]').prop('checked',false); // 시즌초이스 초기화
    $(this).parents('.area').addClass('selected');
});

/*약관 내용 보기 다이렉트에맞게 수정 */
$(document).on('click','.popup-call',function(e){
    e.preventDefault();
    var obj = $(this).attr('href');
    if($(this).hasClass('agree-view')){
        $('#terms-check').attr('aria-hidden', true).removeAttr('tabindex');
    }
    popupOpen($(obj));
});
$(document).on('click','.popup .close',function(){
    popupClose('#'+$(this).parents('.popup').attr('id'));
    $('#terms-check').attr('aria-hidden', false).removeAttr('tabindex');
})

$.pageCallPop(); //메인페이지전환


$(window).on('load', function(){
    //AOS.init();
});



// 툴팁
$(document).on('click', '[data-type="tooltip"]', function(e) {
    _this = $(this);
    $(".tooltipWrap , .tooltipArrow").remove();
    var prevTarget = $("[data-type='tooltip']").filter(".on");

    if( _this.hasClass("on") ){
        _this.removeClass("on");
        _this.attr('title', '열기');
    }
    else {
        var winScrollTop    = $(window).scrollTop();
        var tooltipTxt      = _this.next().html();
        var offsetTop       = _this.offset().top;
        var offsetLeft      = _this.offset().left;
        var posLeft         = "auto";
        var posRight        = "auto";
        var posTop          = "auto";
        var posBottom       = "auto";

        _this.addClass("on");
        _this.attr('title', '닫기');

        $("body").append('<div class="tooltipWrap" tabindex="1">' + tooltipTxt + '</div>');
        //$('.tooltipWrap').prepend('<em class="accessible-tit" tabindex="0">도움말 시작</em>');
        //$('.tooltipWrap').append('<em class="accessible-end" tabindex="0">도움말 끝</em>');
        $('.tooltipWrap').append('<a href="javascript:void(0)" class="accessible-end"><em class="hidden">닫기</em></a>');
        $(".tooltipWrap").after('<span class="tooltipArrow"></span>');

        // 튤팁 말풍선 width 값이 지정되어 있으면 실행
        if( _this.next().attr("style") ){
            $(".tooltipWrap").width(parseInt(_this.next().css("width"))-20);
        }

        // 도움말 아이콘 위치가 브라우저 화면 중간보다 우측일 경우
        if (parseInt(offsetLeft) > parseInt($(window).width() / 2)) {
            posRight = parseInt($(window).width() - $(".tooltipWrap").outerWidth())/2;

            // 툴팁 아이콘 최우측 위치
            var arrow_rightEnd = $(window).width() * 85 / 100;
            if( parseInt(offsetLeft) > arrow_rightEnd ) {
                posRight = Math.floor( ($(window).width() - parseInt(offsetLeft)) / 2 );
            }
        }
        else {
            posLeft = parseInt($(window).width() - $(".tooltipWrap").outerWidth())/2;
        }

        // 도움말 아이콘 위치가 브라우저 화면 중간보다 아래 일경우
        if (parseInt(offsetTop - winScrollTop) > parseInt($(window).height() / 2)) {
            $(".tooltipWrap").css({"left": posLeft,"right" : posRight,  "top": _this.offset().top - $(".tooltipWrap").height() - 29,'bottom':'auto'}); // 수정
            $(".tooltipArrow").css({"left": offsetLeft + parseInt(_this.outerWidth()/2) - 7, "bottom":'auto', "top": _this.offset().top - 8 }); //수정
        }
        else {
            $(".tooltipWrap").css({"left": posLeft,"right" : posRight,  "top": _this.offset().top + 25, 'bottom':'auto'}); // 수정
            $(".tooltipArrow").css({"left": offsetLeft + parseInt(_this.outerWidth()/2) - 7, "bottom":'auto', "top": _this.offset().top + 20 }); //수정
            $(".tooltipArrow").addClass("bottom");
        }

    }

    $('.tooltip_title').focus();
    $('.accessible-end').on('focusin', function() {
        _this.attr('tabindex', '0');
        _this.focus();
    });

    $('.accessible-end').on('click', function() {
        $(".tooltipWrap, .tooltipArrow").remove();
        _this.removeClass("on");
        _this.attr('title', '열기');
        _this.focus();
    });

    $('.tooltipWrap').on('click', function() {
        $('.tooltip_title').focus();
    });

    prevTarget.removeClass("on");

    e.preventDefault();
});

// 툴팁 닫기
$("body, html").on({
    "click , touchstart" : function(e){
        if( ! $(e.target).hasClass("tooltipWrap") && ! $(e.target).hasClass("new_tool_tip") && ! $(e.target).parents(".tooltipWrap").length && ! $(e.target).parents(".new_tool_tip").length ){
            $(".new_tool_tip").removeClass("on");
            $(".new_tool_tip").attr('title', '열기');
            $('.tooltipWrap , .tooltipArrow').remove();
            $(".new_tool_tip").focusout();
        }
    }
});



// 팝업 in 툴팁 스크롤 유지
$('.ui-popup .content').scroll(function(){
    if($('[data-type="tooltip"].on').length > 0){
        _this = $('[data-type="tooltip"].on');
        if($('.tooltipArrow').hasClass('bottom')) {
            $(".tooltipWrap").css({"top": _this.offset().top + 25});
            $(".tooltipArrow").css({"top": _this.offset().top + 20});
        }
        else{
            $(".tooltipWrap").css({"top": _this.offset().top - $(".tooltipWrap").height() - 29});
            $(".tooltipArrow").css({"top": _this.offset().top -8});
        };
    };
});


// toggle list
$(document).on("click", ".btn_toggle", function(){
    var _titAll = $(this).closest(".toggle_box").children().find('.btn_toggle');
    var _toggleContAll = $(this).closest(".toggle_box").children().find('.toggle_cont');
    var tit = $(this);
    var toggleCont = $(this).parent().next('.toggle_cont');

    if ( !tit.hasClass('active') ) {
        _titAll.removeClass('active').attr({'title': '상세내용 열기', 'aria-expanded': false});
        _toggleContAll.hide();

        tit.addClass('active').attr({'title': '상세내용 닫기', 'aria-expanded': true});
        toggleCont.show();
    } else {
        tit.removeClass('active').attr({'title': '상세내용 열기', 'aria-expanded': false});
        toggleCont.hide();
    }

    // 상단 이동
    var _offsetTop = $(this).offset().top;
    if ( $("header").length > 0 ) {
        _offsetTop = _offsetTop - $("header").outerHeight();
    }
    $(window).scrollTop( _offsetTop );
});

// Direct 개선 2022
$(function(){
    $('body').addClass('ktd-wrap');

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
});

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