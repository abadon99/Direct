var chkB = "";
var ua = window.navigator.userAgent;
if(ua.indexOf("Safari") > 0){
	if(ua.indexOf("Chrome") > 0) {
		chkB = "chrome"
	}else{
		chkB = "safari";

		$(function(){
			$("body").attr("onunload", "''");
		});
	}
}

// 이벤트 발생시 image 변경
jQuery.fn.imgChange = function(options){
    var $target = $(this);
    var option = { basic : 1 , change : 0 }; //basic : 변경전 image , change : 변경후 image
    $.extend(option, options);
    if ($target.find("img").attr("src") != undefined) {
        $target.find("img").attr("src",$target.find("img").attr("src").replace(option.basic,option.change));
    }

};
// Ajax 로딩시 화면 block
jQuery.loadBlock = function(isDim){
	if(isDim == false){
		var load = '<div id="loading" class="calcuLoading"><img src="/images/pc/common/loading_img.gif" alt="로딩중"/></div>';
	    $("body").append(load);
	}else{
		var load = '<div id="loading"><img src="/images/pc/common/loading_img.gif" alt="로딩중"/></div>';
	    $("body").append(load);
	}

};

jQuery.loadUnBlock = function(){
    $("#loading").remove();
};

// 브라우저 체크 변수 선언
var agent = navigator.userAgent.toLowerCase();

// input value default 문구
jQuery.fn.searchValue = function(){
    var $target = $(this);
    var searchMsg = $(this).val();

    $target.bind({
        focusin:function(){
            if($(this).val() == searchMsg) {$(this).val("");}
        },
        focusout:function(){
            if($(this).val().replace(/ /g,"") == ""){
                $(this).val("");
            }

            if($(this).val() == "") {
                $(this).val(searchMsg);
            }
        }
    });
};

// 상세 페이지 tab
jQuery.detailTab = function(options){
    var option = { index : 0 , clear : null }; //
    $.extend(option, options);

    $("#Tab-Cont > a").each(function(idx){
        var left = $(this).width()*idx;
        if(idx != 0){
            $(this).css("left",(left+1)+"px");
        }else{
            $(this).css("left",left+"px");
        }
    });

    if(option.clear != null){
        $("#Tab-Cont > a").each(function(idx){
            $("#Tab-Cont > div").eq(idx).hide();
            $("#Tab-Cont > a").eq(idx).removeClass("current").imgChange({basic:"_on.png",change:".png"});
        });
    }
    $("#Tab-Cont > a").eq(option.index).addClass("current").imgChange({basic:".png",change:"_on.png"});
    $("#Tab-Cont > a:eq("+option.index+")").next("div").show();

    $("#Tab-Cont > a").click(function(){
        $("#Tab-Cont > a").each(function(idx){
            $("#Tab-Cont > div").eq(idx+1).hide();
            $("#Tab-Cont > a").eq(idx).removeClass("current").imgChange({basic:"_on.png",change:".png"});
        });
        $(this).addClass("current").imgChange({basic:".png",change:"_on.png"});
        $(this).next().show();


        var $that = $(this).next().children("iframe");

        //iframe scr 이동 처리
        var iframeScr = $(this).attr("iframeScr");
        if ($that != undefined &&  iframeScr != undefined) {
            if ($that.attr("src") == "") {
                $that.attr("src",iframeScr);
            }
        }

        var iframeSrc = $that.attr("src");
        if (iframeSrc != undefined) {
            if (iframeSrc.indexOf($(location).attr("host")) > -1) { // 타 도메인이면 호출안하게, IE에서 오류남
                $that.height($that.contents().find("body").height());
            }
        }
    });
};


// 액세서리 오퍼링 08-20 추가
jQuery.accesOffer = function(){
    $("div.offerDetail h6 a, div.offerOrder a").bind("mouseenter mouseleave", function(){
        $(this).next().toggle();
    }).bind("focusin focusout", function(){
        $(this).next().toggle();
    });

    var offer = $("div.offerDetail li").length,
        offerMax = null,
        offerLen = null,
        offerMove = null,
        offerNm = 1;

    if($("div.offerDetail").hasClass("mobileOffer")){
        offerLen = offer-1;
        offerMax = 2;
        offerMove = 350;
    }else if($("div.offerDetail").hasClass("wireOffer")){
        offerLen = offer-2;
        offerMax = 3;
        offerMove = 326;
    }
    if(offer <= offerMax){$("div.offerDetail p.page").hide()}
    if(offerNm == 1){$("div.offerDetail p.page a.prev").hide()}

    $("div.offerDetail a.next").click(function(){
        if(offerNm < offerLen){
            offerNm++;
            $("div.offerDetail ul").animate({left:"-="+offerMove+"px"},500);
            $("div.offerDetail p.page a.prev").show();
        }
        if(offerNm == offerLen){
            $("div.offerDetail p.page a.next").hide()
        }
    });

    $("div.offerDetail a.prev").click(function(){
        if(offerNm < offer){
            offerNm--;
            $("div.offerDetail ul").animate({left:"+="+offerMove+"px"},500);
            $("div.offerDetail p.page a.next").show();
        }
        if(offerNm == 1){
            $("div.offerDetail p.page a.prev").hide()
        }
    });

    $("div.offerDetail a.select").click(function(){
        if($(this).hasClass("cur")){
            $(this).removeClass("cur").imgChange({ basic : "_select.gif", change : ".gif" });
        }else{
            $(this).addClass("cur").imgChange({ basic : ".gif", change : "_select.gif" });
        }
    });
};

$(document).ready(function(){

    /** GNB 생성 **/
    $(function(){
        if($.isFunction($.shopMainGnb)) {
            $.shopMainGnb();
        }
        /** LNB 생성 **/
        if($.isFunction($.LnbInit)) {
            $.LnbInit();
        }
        /** FOOTER 생성 **/
        if($.isFunction($.footInit)) {
            $.footInit();
        }

        mlBoard();
		mNoticePop();
    });


//    $.toolTip(); // 툴팁
    $(document).on("click", ".kt .family .site", function(){
        if(!$(this).hasClass("focus")){
            $(this).addClass("focus");
            $(this).next("ul").slideDown();
        }else{
            $(this).removeClass("focus");
            $(this).next("ul").slideUp();
        }
    });

    // FOOTER FAMILY SITE 숨김 기능
    $(document).on("mouseleave", ".family", function() {
   		$(".family .site").removeClass("focus");
		$(".family ul").slideUp();
    });
    $(document).on("focusin", ".address", function() {
   		$(".family a:eq(1)").removeClass("focus");
		$(".family ul").slideUp();
    });

	/* 액세서리 윙배너 */
    var bookHieght2 = $(".prodWrap").height(),
        bookmarkPos = bookHieght2 + 368;
    $(window).scroll(function(){
        var bodyHeight = $(document).height();
        var bodyFoot = $("#ollehShopFooter").height();
        var wingH = $("#WingBanner").height();
        var bodyScroll = bodyHeight - bodyFoot - wingH - 53;
        var wbPosFix = bookmarkPos - wingH - 110;

        if($(document).scrollTop() >= 132){

            if($("#WingBanner").hasClass("accProdDetail")){
				$("#WingBanner").css({position:"fixed",top:"20px"});
                /*
				if($(document).scrollTop() >= wbPosFix){
                    $("#WingBanner").css({position:"absolute",top:wbPosFix});
                }else{
                    $("#WingBanner").css({position:"fixed",top:"20px"});
                }
				*/
            }else{
                if($(document).scrollTop() >= bodyScroll){
                    $("#WingBanner").css({position:"absolute",top:bodyScroll});
                } else {
                    $("#WingBanner").css({position:"fixed",top:"20px"});
                }
            }
        } else {
            $("#WingBanner").css({position:"absolute",top:"181px"});
        }
    });

    //만족도 평가
    $(".parWrap > a").bind({
        mouseenter:function(){$(this).next().show();},
        mouseleave:function(){$(this).next().hide();}
    });
});


/* 메인 하단 사이트맵 */

function mainBotSiteMap(){
    var $targetTop = $("#ollehShopGnb .ollehShopWrap");
    var menuAllEl = $targetTop.html();

    var menuAllElBot = menuAllEl.replace(/010_Top\^030_GNB/gi, '030_Bottom^030_사이트맵');
    
    var allMenu = '';
    allMenu += '<div id="ollehShopAllMenu">';
    allMenu += menuAllElBot;
    allMenu += '</div>';

	$(".mSiteMap").html(allMenu);

	if($(".mSiteMap #ollehShopAllMenu > div").hasClass("subGnb")){
	    $(".mSiteMap #ollehShopAllMenu > div").removeClass("subGnb");
	}
    // 20160731 신규추가 원복을 하려면 아래 소스를 주석처리하면 된다.

	menuTrack(".mSiteMap","Shop_메인","하단");
}

/* 메인 공지사항 */
var mlBoard = function(){
    var mlb = $(".mlBoard ");
    var listLi = mlb.find(".bList >li");
    var mlbBtn = mlb.find(".btnBoard .sBtn");
    var curEq = null;


	mlb.each(function(){
		var liEl = $(this).find(".bList >li").length;
		if(liEl == "1"){
			$(this).find(".btnBoard .sBtn").addClass("disabled");
		}
	});
    $(document).on("click", ".btnBoard .sBtn", function(e){
        e.preventDefault();
        curEq = $(this).parents(".mlBoard").find(".bList >li.cur").index();

        var listSize = $(this).parents(".mlBoard").find(".bList >li").length;

        if($(this).hasClass("pPrev")){
            if(curEq == 1){
                $(this).addClass("disabled");
            }
            if(curEq == 0){
                return false;
            }
            $(this).next().removeClass("disabled");
            $(this).parents(".mlBoard").find(".bList >li").eq(curEq).removeClass("cur");
            $(this).parents(".mlBoard").find(".bList >li").eq(curEq-1).addClass("cur");
        }else{
            if(curEq == (listSize-2)){
                $(this).addClass("disabled");
            }
            if(curEq == (listSize-1)){
                return false;
            }
            $(this).prev().removeClass("disabled");
            $(this).parents(".mlBoard").find(".bList >li").eq(curEq).removeClass("cur");
            $(this).parents(".mlBoard").find(".bList >li").eq(curEq+1).addClass("cur");
        }
    });
};

var mNoticePop = function(){
	if($(".mlBoard").length == 0) return false;
	$(document).on("click", ".notice .bList >li >a", function(e){
		e.preventDefault();
		
		$(this).parent('li').find('div.noticeLy').show();
		$(this).parent('li').find('div.lyBody').attr("tabIndex", 0);
		$(".mlBoard .lyBody").trigger("focus");
	});

	$(".noticeLy .lyClose").click(function(){
		$(this).parents(".noticeLy").hide();
		$(".mlBoard .lyBody").removeAttr("tabIndex");
	});
};

var sideBanner = function(){
	var subWrapPosY = $("#SubWrap").offset().top;
	var footHeight = $("#ollehShopFooter").height() + 200;
	var bannerHtml = '';
		bannerHtml += '<div id="WingBannerShop" style="    position: absolute; top: '+subWrapPosY+'px; width: 80px; left: 50%; margin-left:500px;"><ul><li><a href="/wire/recomCombineHitPackView.do"><img src="https://image.shop.kt.com/upload/link/72/1447664889894.jpg" alt="추천 유선팩 혜택은 UP 이용료는 Down" target="_self"></a></li><li><a href="/display/olhsPlan.do?plnDispNo=16"><img src="https://image.shop.kt.com/upload/link/72/1447664926242.jpg" alt="반값샵 인터넷+tv 동시 가입하면 UHD tv가 반값!" target="_self"></a></li><li style="margin-top:15px"><a href="/wire/orderTelCounselForm.do?prodNo=WR00004861"><img src="https://shop.kt.com/images/pc/wingbanner/wing_ban_quick_150625.gif" alt="1:1 전화 상담"></a></li><li><a href="#top" id="topbtn"><img src="https://shop.kt.com/images/pc/wingbanner/wing_banner_03.png" alt="top"></a></li></ul></div>;'
	$("#SubWrap >.ollehShopWrap").append(bannerHtml);

	$(window).scroll(function(){
		var scrollT = $(window).scrollTop()+20;

		var endZoneR = ($(document).height() - $(window).height());
		var endZone = $("#WingBannerShop").offset().top + $("#WingBannerShop").height();
		var footZone = $("#ollehShopFooter").offset().top;

		if(scrollT >= subWrapPosY){
			$("#WingBannerShop").css({
				"position": "fixed",
				"top" : 20
			});
		}else{
			$("#WingBannerShop").css({
				"position": "absolute",
				"top" : subWrapPosY
			});
		}
	});
};

/* 마이올레 툴팁관련 오류 개선 함수 */
function help(config, itemView, choice, pix){
	var item = $('#' + config),
	content = $('#' + itemView);
	var position = item.position(),
	left = position.left -20,
	top = position.top,
	contentWidth = content.outerWidth()+10;
	if(navigator.userAgent.indexOf("MSIE 8") > -1 || navigator.userAgent.indexOf("MSIE 9") > -1 || navigator.userAgent.indexOf("MSIE 10") > -1){
	top = position.top -10;
	}
	if (pix == undefined) {pix = 20;}
	/*20150605 ie 8 10 탭이동시 오류남*/
	$(window).resize(function(){
	try {
	  position = item.position();
	  left = position.left -20;
	top = position.top;

	if(navigator.userAgent.indexOf("MSIE 8") > -1 || navigator.userAgent.indexOf("MSIE 9") > -1 || navigator.userAgent.indexOf("MSIE 10") > -1){
	top = position.top -10;
	}

	size();
	}
	catch (e) {
	  //alert ( "error ")
	}
	/*position = item.position();
	left = position.left -20;
	top = position.top;

	if(navigator.userAgent.indexOf("MSIE 8") > -1 || navigator.userAgent.indexOf("MSIE 9") > -1 || navigator.userAgent.indexOf("MSIE 10") > -1){
	top = position.top -10;
	}

	size();
	*/
	})
	function size(){
	position = item.position();
	left = position.left -20;
	top = position.top;
	if ( contentWidth == 10){
	contentWidth = 200;
	}
	//choice : true = left, false = right, "center" = center
	if (choice){
	content.css({
	'top' : top + pix,
	'left' : left - (contentWidth - 58),
	'width' : contentWidth
	})
	}  else {
	content.css({
	'top' : top + 20,
	'left' : left,
	'width' : contentWidth
	})
	}

	if(choice == 'center'){
	content.css({
	'top' : top + pix,
	'left' : left+28 - (contentWidth /2) ,
	'width' : contentWidth
	})
	}
	}

	size();
	item.bind({
	click : function(e){
	e.preventDefault();
	},
	mouseenter :  function(){
	size();
	content.show();
	},
	mouseleave : function(){
	content.hide();
	},
	focusin : function(){
	size();
	content.show();
	},
	focusout : function(){
	content.hide();
	}
	})
}

function counReve(){	
	$("#CounselReceive").layerWrap({
		src : "/support/counselReceivePopView.do",
		id : "CounselReceive",
		width : 700,
		height : 700,
		auto : "nClick",
		pos : "fixed",
		iframe : "yes"
	});
}

function gaEventTracker(flag, category, action, label, cd){
  //flag True: 롤업속성에도 데이터 전송
  //flag False: 롤업속성에는 데이터 전송하지 않음
  ga('send', 'event', category, action, label, {'dimension19':cd});
  if(flag == true){ga('rollup.send', 'event', category, action, label, {'dimension19':cd});}
}

// (접근성) radio, checkbox - a태그 변경

jQuery.inputTransform = function(){

    jQuery.updateTransform();
    
    $(document).on("click", "input:radio + a",function(e){
        var titleTxt = '';
        var defulatTitle = $(this).attr('title');

        e.preventDefault();

        if(defulatTitle != undefined){ //title 기본값이 있는경우 - [ex:팝업열림]
            titleTxt = defulatTitle;  
        }else{ //title 기본값이 없는경우 
            titleTxt = '';
        };
        if(titleTxt.indexOf('선택됨') > -1){ //있을때
            return;
        }
        if($(this).hasClass("noradio_dis")) {

        } else {

            var name = $(this).prev().attr("name");
            $("input[name="+name+"] + a").removeClass("chk").removeAttr('title').attr({
                'title' : titleTxt,
                'aria-checked' :  'false'
            });
            $(this).addClass("chk").removeAttr('title').attr({
                'title' : '선택됨' + ' ' + titleTxt,
                'aria-checked' : 'true'
            });
            $(this).prev().prop("checked", true);
            $(this).prev().trigger("change");
            jQuery.updateTransform();
        };

    });
    $(document).on("click", "input:checkbox + a",function(e){
        e.preventDefault();

        if($(this).hasClass("norchecked_dis")) {

        } else {
            if(!$(this).hasClass("disabled")){
                if($(this).hasClass("chk")){
                    $(this).removeClass("chk").attr('aria-checked', 'false');
                    $(this).removeAttr('title');
                }else{
                    $(this).addClass("chk").attr('aria-checked', 'true');
                    $(this).attr('title', '선택됨');
                }
                $(this).prev().trigger("click");
            }

            jQuery.updateTransform();
            return false;
        }
    });

};

//(접근성) radio, checkbox 변경 업데이트
jQuery.updateTransform = function(inpName){
    var $radio = $("input:radio"), $checkbox = $("input:checkbox");

    $radio.addClass("formHidden").attr('aria-hidden', 'true').next().addClass("inputTrans radioTrans");
    $radio.each(function(){
        var titleTxt = '';
        var defulatTitleR = $(this).next().attr('title');
        if(defulatTitleR != undefined){
            titleTxt = defulatTitleR;
        }else{
            titleTxt = '';
        }
        if(titleTxt.indexOf('선택됨') > -1){ //있을때
            return;
        }
        $(this).next().addClass("radioTrans");

        var paraName = inpName || null;
        if(paraName != null){
            //alert(paraName);
            if($(this).attr("name") == paraName){

                if($(this).prop("checked") == false){
                    $(this).next().removeClass("chk").attr('aria-checked', 'false');
                    $(this).next().attr('title', titleTxt);
                }else{
                    $(this).next().addClass("chk").attr('aria-checked', 'true');
                    $(this).next().attr('title', '선택됨' + titleTxt);
                }

            }else{return}
        }else{
            if($(this).prop("checked") == true){
                $(this).next().addClass("chk").attr('aria-checked', 'true');
                $(this).next().attr('title', '선택됨' + titleTxt);
            }else{
                $(this).next().removeClass("chk").attr('aria-checked', 'false');
                $(this).next().attr('title', titleTxt);
            }
        }

        if($(this).prop("disabled") == true && $(this).prop("checked") == true){
            $(this).next().addClass("chkdisabled");
            $(this).next().attr('title', titleTxt);
        }

    });

    $checkbox.addClass("formHidden").next().addClass("inputTrans checkboxTrans");
    $checkbox.addClass("formHidden").next().is('a') ? $checkbox.addClass("formHidden").attr('aria-hidden', 'true') : $checkbox.addClass("formHidden").attr('aria-hidden', 'false');

    $checkbox.each(function(){
        $(this).next().addClass("checkboxTrans");
        if($(this).prop("disabled") == true){
            $(this).next().addClass("disabled").attr('aria-disabled', 'true');
            $(this).next().attr('title', '선택됨');
        } else {
            $(this).next().removeClass("disabled").removeAttr('aria-disabled');
            $(this).next().removeAttr('title');
        }
        if($(this).prop("checked") == true){
            $(this).next().addClass("chk").attr('aria-checked', 'true');
            $(this).next().attr('title', '선택됨');
        } else {
            $(this).next().removeClass("chk").attr('aria-checked', 'false');
            $(this).next().removeAttr('title');
        }
        if($(this).prop("disabled") == true && $(this).prop("checked") == true){
            $(this).next().addClass("chkdisabled");
            $(this).next().removeAttr('title');
        }
    });

};