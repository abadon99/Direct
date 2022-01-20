var target;

//auto 사이즈 관리변수
var autoWidthSize = 0.90;
var autoHeightSize = 0.50;

$(document).on("click",".shopLayerBox",function(e){
    target = $(this);
    $("#ShopLayer").focus();
});

$(document).on("click",".lyClose",function(e){
    shop.close();
    $('.callBtn').focus().removeClass('callBtn');
    $("[data-focus=on]").focus().attr("data-focus","");
});
$(document).on("focusin",".loopEnd",function(e){
    $("#ShopLayer").focus();

});
$(document).on("click",".inlyClose",function(e){
    var inHtml = $("#ShopLayer > div:first-child").html();
    $("div.layerWrap").html(inHtml);

    shop.close();
});

$(document).on("click",".today a",function(e){
    shop.close();
});


$(function(){
    $(document).on("click", ".inpChkBx", function(){
        if($(this).prop("checked") == true){
            $(this).next("label").addClass("chked");
        }else{
            $(this).next("label").removeClass("chked");
        }
    });
});


window.shop = {
    close : function(num){
        var content = $(".container").html();
        $("#ShopLayer, #ShopLayerSkin").not(".pageIn").remove();
        $("body").removeClass("fixed");
        $(".back").removeClass("back").html(content);
//        if(agent.indexOf("firefox") == -1){
//            if(window.event.keyCode == 13){$(".focusin").focus();}
//        }
        $(".focusin").focus();
        $(".focusin").removeClass("focusin");
        $(".shopLayerBox").removeClass("focusin");
    }
	, reSize : function() {

		// 현제 레이어의크기
		var wHeight = $("body >div").css("height");
		// iframLayer 존재여부
		var iframCount = $("[name=ShopLayerIframe]", parent.document).length;

		if (iframCount > 0) {
			$("[name=ShopLayerIframe]", parent.document).css({"height":wHeight});
			$("[name=ShopLayerIframe]", parent.document).contents().find("#ShopLayer").css("height", wHeight+2);
		}
    }
	, reFresh : function() {
		var wWidth = $(parent.window).width() * autoWidthSize;
		var wHeight = $(parent.window).height() * autoHeightSize;
		$("#ShopLayer", parent.document).css({"top":"50"});
		$("#ShopLayer", parent.document).css({"margin":"-" + wHeight/2 + "px 0 0 -" + wWidth/2 + "px"});
    }

};

jQuery.fn.layerWrap = function(options){

    var $target = $(this);
    var option = {
        src : $(this).attr('href'),
        varData : null,
        id : null,
        width : 0,
        height : 0,
        click : null,
        pos : "absolute",
        yOffset : "50%",
        marginTop : null,
        iframe : null,
        scroll : "auto",
        auto : "no", // 페이지 접근시 자동 팝업 & 클릭 여부 판단
        today : "no",
        inpage : null,
        thisHtmlId:null,
        posX:0,
        posY:0,
        block : "no",
        app_newLyaer : "no",
        app_newLyaerKind : "div",
        aap_closeBtn : "yes",
        app_iframeId : "ShopLayerIframe",
        app_iframeName : "ShopLayerIframe",
        app_new_layer : false,
        focusing : false
    };
    $.extend(option, options);

	// 크기가 auto 일경우 width90%, height50% 로 기본설정한다.

	if (option.width == "auto") {
		option.width = $(window).width() * autoWidthSize;
	}
	if (option.height == "auto") {
		option.height = $(window).height() * autoHeightSize;
	}
	// SSL(Https) 레이어 요청이 들어왔다면 iframe속성 제거하고 일반Layer 로 만들수있도록 한다.
	if (option.app_newLyaer == "yes" && option.app_newLyaerKind == "div") {
		option.iframe = null;
	} else if (option.app_newLyaer == "yes" &&option.app_newLyaerKind == "iframe") {
		option.iframe = "yes";
	}

    var lyWsum = option.width + 2;
    var lyHsum = option.height + 2;
    var lyWrap = lyWsum - 30;
    var offset = $target.offset();
    var popPosX = option.posX;            //x
    var popPosY = option.posY;            //y
    var tabindexNum = option.focusing === true ? '' : 0;

    var html = '';

    if(option.marginTop != null){
        html +='    <div id="ShopLayer" style="position:'+option.pos+';top:'+option.yOffset+';margin:'+option.marginTop+'px 0 0 -'+option.width/2+'px;width:'+lyWsum+'px;" tabindex="' + tabindexNum + '">';
    }else if(option.offset != null){
        html +='    <div id="ShopLayer" style="position:'+option.pos+';top:'+offset.top+'px;margin:0 0 0 -'+option.width/2+'px;width:'+lyWsum+'px;" tabindex="' + tabindexNum + '">';
    }else if(popPosX != 0 && popPosY != 0){
        html +='    <div id="ShopLayer" style="position:'+option.pos+';left:'+option.posX+'px;top:'+option.posY+'px;width:'+lyWsum+'px;" tabindex="' + tabindexNum + '">';
    }else{
        html +='    <div id="ShopLayer" style="position:'+option.pos+';top:'+option.yOffset+';margin:-'+option.height/2+'px 0 0 -'+option.width/2+'px;width:'+lyWsum+'px;" tabindex="' + tabindexNum + '">';
    }

    if(option.iframe != null){
    	html +='        <iframe id="' +option.app_iframeId+ '" name="' +option.app_iframeName+ '" src="'+option.src+'" width="'+option.width+'" height="'+option.height+'" frameborder="0" scrolling="'+option.scroll+'"></iframe>';
    }else{
        html +='        <div id="'+option.id+'" style="width:'+option.width+'px; height:'+option.height+'px"></div>';
    }

    if(option.today == "yes"){
        html +='            <div class="today" style="width:'+option.width+'px">';
        html +='            <span class="todayNo"><input type="checkbox" id="todayChk" class="inpChkBx" today="'+option.id+'"> <label for="todayChk">오늘 하루 그만 보기</label></span>';
        html +='            <a href="javascript:void(0)">닫기</a>';
        html +='            </div>';
    } else {
        if(option.inpage != null){
            html +='        <a href="javascript:void(0)" class="inlyClose"><em class="hidden">닫기</em></a>';
        }else{
        	// 사이즈 자동조절 아이프레임에서 닫기버튼 사용하지 않음
        	if (option.aap_closeBtn == "yes") {

                if(option.focusing) {
                    html +='        <a href="javascript:void(0)" class="lyClose">닫기</a>';
                } else {
                    html +='        <a href="javascript:void(0)" class="lyClose"><em class="hidden">닫기</em></a>';
                }
        	}
        }
    }

        html +='<a href="javascript:void(0)" class="loopEnd" title="팝업 내 상단이동">&nbsp;</a>';
        html +='    </div>';

    if(option.id != null){
        html +='        <div id="ShopLayerSkin"></div>';
    }

    if(option.auto == 'no'){
        $target.click(function(e){
            $(this).addClass('callBtn');
            if(!$(".shopLayerBox").hasClass("focusin")){
                $("body").append(html);
                if(e.keyCode == 13){$(".shopLayer").focus();}
                if(option.id != null){
                    if(option.block != "no"){
                        if($.isFunction($.loadBlock)) {
                            $.loadBlock();
                        }
                    }
                    $("body").addClass("fixed");
                    option.varData = option.varData == null ? "" : option.varData;
                    $("#"+option.id).load(option.src, option.varData, function () {
                        if(option.block != "no"){
                            if($.isFunction($.loadUnBlock)) {
                                $.loadUnBlock();
                            }
                        }
                    });

                }
            }
            $target.addClass("focusin");
        });
    }else if(option.inpage != null){
        $("body").append(html);
        if(option.id != null){
            $("body").addClass("fixed");
            var lyHtml = $("div.layerWrap").html();
            if(option.thisHtmlId != null){
                lyHtml = $("#"+option.thisHtmlId).html();
            }
            $("#"+option.id).html(lyHtml);
            $("div.layerWrap").empty()

        }

    // 2017-08-29 kimminjun 옵션추가
    // ifram 자동 사이즈조절을 위한 옵션
    } else if (option.app_newLyaer == "yes") {

    	// 중복클릭 방지옵션
    	var isLayerCount = $("#" + option.app_iframeId, document).length;
    	if (isLayerCount > 0) {
    		return;
    	}

    	$("body").append(html);
        if(option.block != "no"){
            if($.isFunction($.loadBlock)) {
                $.loadBlock();
            }
        }

        if (option.app_newLyaerKind == "iframe") {
        	// ifram 리사이즈 시작
        	$("[name='" +option.app_iframeName+ "']").on("load", function () {

        		// 사용자 지정 사이즈
        		var autoH = $(window).height() * autoHeightSize;
        		var autoW = $(window).width() * autoWidthSize;
        		var reHeight = (option.height != autoH) ? option.height : 0;
        		var reWidth = (option.width != autoW) ? option.width : 0;

        		// ifram 내부의 첫번째 div 사이즈
        		var innerHeight = $("[name='" +option.app_iframeName+ "']").contents().find("body >div").css("height");
        		var innerWidth = $("[name='" +option.app_iframeName+ "']").css("width");

        		// 최종사이즈 설정
        		var iframHeight = (reHeight > 0) ? reHeight : innerHeight;
        		var iframWidth = (reWidth > 0) ? reWidth : innerWidth;

        		// 팝업 크기 재조정
        		$("[name='" +option.app_iframeName+ "']").css({"height":iframHeight, "margin":"-'"+iframHeight/2+"'px 0 0 -'"+iframWidth/2+"'px"});
        		$("[name='" +option.app_iframeName+ "']").contents().find("#ShopLayer").css("height", iframHeight+2);

        		// 팝업 위치 재조정
        		$("#ShopLayer", document).css({"margin":"-" + iframHeight/2 + "px 0 0 -" + iframWidth/2 + "px"});

        	});

        } else {
        	// 팝업 리사이즈 시작
        	$("[id='" +option.id+ "']").on("load", function () {

        		// 사용자 지정 사이즈
        		var autoH = $(window).height() * autoHeightSize;
        		var autoW = $(window).width() * autoWidthSize;
        		var reHeight = (option.height != autoH) ? option.height : 0;
        		var reWidth = (option.width != autoW) ? option.width : 0;

        		// ifram 내부의 첫번째 div 사이즈
        		var innerHeight = $("[id='" +option.app_iframeId+ "']").contents().find("body >div").css("height");
        		var innerWidth = $("[id='" +option.app_iframeId+ "']").css("width");

        		// 최종사이즈 설정
        		var iframHeight = (reHeight > 0) ? reHeight : innerHeight;
        		var iframWidth = (reWidth > 0) ? reWidth : innerWidth;

        		// 팝업 크기 재조정
        		$("[id='" +option.id+ "']").css({"height":iframHeight, "margin":"-'"+iframHeight/2+"'px 0 0 -'"+iframWidth/2+"'px"});
        		$("#ShopLayer").css("height", iframHeight+2);

        		// 팝업 위치 재조정
        		$("#ShopLayer", document).css({"margin":"-" + iframHeight/2 + "px 0 0 -" + iframWidth/2 + "px"});
        	});

        }

        option.varData = option.varData == null ? "" : option.varData;
        $("#"+option.id).load(option.src, option.varData, function () {
            if(option.block != "no"){
                if($.isFunction($.loadUnBlock)) {
                    $.loadUnBlock();
                }
            }
        });


    } else {
        $("body").append(html);
        if(option.id != null){
            if(option.block != "no"){
                if($.isFunction($.loadBlock)) {
                    $.loadBlock();
                }
            }

            option.varData = option.varData == null ? "" : option.varData;
            $("#"+option.id).load(option.src, option.varData, function () {
                if(option.block != "no"){
                    if($.isFunction($.loadUnBlock)) {
                        $.loadUnBlock();
                    }
                }

                if(option.focusing) {
                    $("#"+option.id).find('.popup h1').attr('tabindex', '0');
                    $("#"+option.id).find('.popup h1').focus();
                    $("#"+option.id).find('.btnClose').remove();

                    $('.lyClose').bind('click', function() {
                        $("#"+option.id).find('.popup h1').removeAttr('tabindex');
                        $('#insertWishProd').focus();
                    });
                }
            });
        }
    }

    $('#ShopLayer').focus();
    $(this).addClass('callBtn');
	$(this).addClass("focusin");
    if(option.height >  $(window).height()){

      $('#ShopLayer').css({
          'position':'absolute',
          'top':$(window).scrollTop()+10+'px',
          'margin-top':0
      });
         $('body').removeClass('fixed');
     }else{

     }

};

$.fn.newKTLayer = function(options) {
    var config = $.extend({
        type : false, // true global, false single
        call : {
            url : null, // 호출한 url
            varData : null, // 호출한 url 파라미터
            idName : 'layer-pop', // layer id
            className : 'layer-pop', // layer class
        },
        dim : true,
        dimClassName : 'layer-dim',
        dimBackcolor : '', // dim 색 변경 가능
        iframe : false,
        layerPosition : 'center',
        layerWidth : 100,
        btn : '.close',
        isOverlap : false,	// true:중복idName 의 layer허용, false(default):중복idName 의 layer 허용불가.
        log : false,
        focusing : '.layer-pop-header',
        appBottomShowYn : 'Y',	// 레이어 종료후 앱 푸터 노출여부
        searchFastOpenYn : false	// 검색팝업 바로노출
    }, options);

    // 앱 푸터 제어
    hideAppFooter();

    return this.each(function() {
        var self = this,
            $self = $(self),
            html = '',
            varData = typeof config.call.varData === 'undefined' || config.call.varData === null || config.call.varData === '' ? '' : "?" + config.call.varData,
            urlName = config.call.url + varData,
            idName = config.call.idName,
            className = config.call.className,
            dimFlag = config.dim,
            dimClassName = config.dimClassName,
            isOverlapFlag = config.isOverlap,
            dimBackColor = typeof config.dimBackcolor === 'undefined' || config.dimBackcolor === null || config.dimBackcolor === '' ? '' : 'style="background:' + config.dimBackcolor + '";';


        if(config.dim) {
            $('body').append('<div class="layer-dim"' + dimBackColor + '></div>');
        }

        /*if (config.log) alert("isOverlapFlag chk");*/
        if (!isOverlapFlag && $('#'+idName).length > 0) {
            return;
        }

        // 앱 검색기능 속도개선 요청으로 검색html 즉시생성
        if (config.searchFastOpenYn) {
        	layerSearchHtml(idName, className);
        	$('#'+idName).find(config.focusing).attr('tabindex', '0');
        	$('#'+idName).find(config.focusing).focus();
        	if(config.dim) {
    			mHandel('.' + dimClassName, true);
    		}
        	mHandel($('#'+idName), true);

        // 일반적인 URL로드 방식으로 html 생성
        } else {
        	layerPopHtml(idName, className);

        	$('#'+idName).load(urlName, function() {
        		var layer = $(this);

        		$(layer).append('<button class="close">닫기</button>');

        		open(layer, dimFlag);


        		setTimeout(function() {
        			$(layer).find(config.focusing).attr('tabindex', '0');
        			$(layer).find(config.focusing).focus();
        		}, 2000);

        		$(layer).find('.combine-search').next().remove();

        		if(config.dim) {
        			mHandel('.' + dimClassName, true);
        		}
        		mHandel(layer, true)
        	});

        }


        open(self, dimFlag);

        function mHandel(object, touchFlag) {
            var $object = $(object);

            if(touchFlag) {
                $object.bind('touchmove', function(e) {
                    e.preventDefault();


                });

                return;
            }

            $object.unbind('touchmove');
        }

        function open(layer, dimFlag) {
            var $layer = $(layer);

            if($('.coupon-pop img').length > 0) {
                $('.coupon-pop img').load(function() {
                    layerPosition(layer, config.layerPosition);
                });

                close(layer);

                return;
            }

            $layer.css({
                display : 'block',
                position : 'fixed',
                width : config.layerWidth + '%'
            });

            layerPosition(layer, config.layerPosition);

            close(layer);
        }

        function close(layer) {
            var $layer = $(layer),
                $btn = $layer.find(config.btn);

            if(config.type) {
                $btn.on('click', function() {
                	// 앱 푸터 제어
                    showAppFooter();

                    $layer.remove();
                    if(config.dim) {
                        $('.'+dimClassName).remove();
                    }
                });

                mHandel(layer, false);
                if(config.dim) {
                    mHandel('.' + dimClassName, false);
                }

                return;
            }

            $btn.on('click', function() {
            	// 앱 푸터 제어
                showAppFooter();

                $layer.css({
                    display : 'none'
                });

                if(config.dim) {
                    $('.'+dimClassName).remove();
                    mHandel('.'+dimClassName, false);
                }

                mHandel(layer, false);
            });
        }

        function layerPopHtml(idName, className) {
            html += '<div id="'+ idName +'" class="'+ className +'" data-layer-role="app" data-bottom-role="' +config.appBottomShowYn+ '">';
			html += '</div>';

            $('body').append(html);
        }

        function layerSearchHtml(idName, className) {
            html += '<div id="' +idName+ '" class="' +className+ '" data-layer-role="app" data-bottom-role="' +config.appBottomShowYn+ '" style="display: block; position: fixed; width: 100%; top: 0px; left: 0px;">';
            html += '	<fieldset class="combine-search" style="padding: 0 15px;">';
            html += '		<legend>통합검색</legend>';
            html += '		<div class="search-box">';
        	html += '    		<input type="text" class="input" id="appK" name="appK" title="검색어 입력" placeholder="" maxlength="30" tabindex="-1">';
    		html += '			<input type="hidden" id="deviceId" value="d">';
			html += '			<a href="javascript:void(0)" onclick="javascript:appSearch(); return false;" class="search">검색</a>';
			html += '		</div>';
			html += '		<div class="search-content" style="min-height: 186px;">';
			html += '			<strong class="tit">최근 검색</strong>';
			html += '			<div class="no-data">';
			html += '				<span class="txt">';
			html += '				</span>';
			html += '			</div>';
			html += '		</div>';
			html += '		<button onclick="javascript:closeAppSearch(); return false;" type="button" class="close">닫기</button>';
			html += '	</fieldset>';
			html += '</div>';
            $('body').append(html);
        }

        function layerPosition(layer, position) {
            var $layer = $(layer),
                poy,
                pox;

            if(position === 'center') {
                if($('.coupon-pop img').length > 0) {
                    $('.coupon-pop img').load(function() {

                        poy = Math.max(0, (($(window).height() - $layer.outerHeight()) / 2)) + "px";
                        pox = Math.max(0, (($(window).width() - $layer.outerWidth()) / 2)) + "px";

                        $layer.css({
                            display : 'block',
                            position : 'fixed',
                            width : config.layerWidth + '%',
                            top : poy,
                            left : pox
                        });
                    });

                    return;
                }

                poy = Math.max(0, ($(window).height() - $('#'+idName).outerHeight()) / 2) + "px";
                pox = Math.max(0, (($(window).width() - $layer.outerWidth()) / 2)) + "px";

                $layer.css({
                    top : poy,
                    left : pox
                });
            } else if(position === 'top') {
                if($('.coupon-pop img').length > 0) {
                    $('.coupon-pop img').load(function() {

                        poy = 0;
                        pox = Math.max(0, (($(window).width() - $layer.outerWidth()) / 2)) + "px";

                        $layer.css({
                            display : 'block',
                            position : 'fixed',
                            width : config.layerWidth + '%',
                            top : poy,
                            left : pox
                        });
                    });

                    return;
                }

                poy = 0;
                pox = Math.max(0, (($(window).width() - $layer.outerWidth()) / 2)) + "px";

                $layer.css({
                    top : poy,
                    left : pox
                });
            }
        }
    });
};

//앱 푸터 Hide
function hideAppFooter() {
	if (typeof(appbottommenushow) != "undefined") {
		appbottommenushow("N");					// APP 호출
	}
}

// 앱 푸터 Show
function showAppFooter() {
	if (typeof(appbottommenushow) != "undefined") {
		var bottomRole = "";
		var $appLayer = $("div[data-layer-role=app]", document);
		if ($appLayer.length > 0) {
			bottomRole = $appLayer.attr("data-bottom-role")
		}

		var bottomShowYn = "";
		if (bottomRole == "" || bottomRole == null) {
			bottomShowYn = "Y";
		} else {
			bottomShowYn = bottomRole;
		}

		appbottommenushow(bottomShowYn);			// APP 호출
	}
}



function menuCodePop(codePop){
    var controller = $.extend(new $.CommonObj());

    var varData = controller.getSerializedData({
        codePop : codePop
    });
    var url='/common/menuCodePop.json';
    if(codePop=='OLHS0102'){
    	url='/common/mainPop.json';
    }
    controller.ajaxSend({
        cache:false
        ,url:url
        ,data:varData
        ,dataType:'json'
        ,type : 'post'
        ,async:false
        ,successCall:function(jsonObj){
        	if(codePop=='OLHS0102'){
        		if(jsonObj.mainPopList != null && jsonObj.mainPopList.length>0){
        			var mainPopList = jsonObj.mainPopList;
        			for(var i=0;i<mainPopList.length;i++){
        				if(mainPopList[i].popupGbn == 'S'){
        					popWin("/common/mainPopView.do?gbn=S&dispPopNo="+mainPopList[i].dispPopupNo,mainPopList[i].dispPopupNo+mainPopList[i].dispNo,mainPopList[i].popupWdthSizeVal,mainPopList[i].popupVrtcSizeVal,"Y",mainPopList[i].popupLeftLo,mainPopList[i].popupHghtLo);
        				}else{
        					mainLayerNoticePop(mainPopList[i].dispPopupNo, mainPopList[i].dispNo, mainPopList[i].popupNm, mainPopList[i].mblContsSbst,  mainPopList[i].dispPopDt);
        				}
        			}
        		}
        	}else{
	            if(jsonObj.menuCodePop != null ){

	                //popWin("/common/menuCodePopView.do?codePop="+codePop,codePop,jsonObj.menuCodePop.popupWdthSizeVal,jsonObj.menuCodePop.popupVrtcSizeVal,"Y",jsonObj.menuCodePop.popupLeftLo,jsonObj.menuCodePop.popupHghtLo)
	                //layerMenuCodePop(menuCodePop.popupWdthSizeVal,menuCodePop.popupVrtcSizeVal,codePop);
	                layerNoticePop(jsonObj.menuCodePop.dispPopupNo, jsonObj.menuCodePop.dispNo, jsonObj.menuCodePop.popupNm, jsonObj.menuCodePop.mblContsSbst);
	            }
        	}

        }
        ,errorCall:function(jsonObj) {
//            alert("호출에 실패하였습니다.");
        }
    });
}


/** 메뉴코드 팝업 */
function layerMenuCodePop(popWidth, popHeight, codePop) {

    if ($(location).attr("pathname").indexOf("/m/") == -1) { // PC버전이면

        $(this).layerWrap({
            src : "/common/menuCodePopView.do",
            auto : "yes",
            varData : {
                codePop : codePop
            },
            id : "ShopLogin",
            width : popWidth,
            height : popHeight,
            pos : "fixed"
        });

    } else { // 모바일 버전이면

        $(this).layerWrap({
            src : "/m/common/menuCodePopView.do" + "?popCode=" + popCode,
            auto : "yes",
            iframe : "yes",
            id : "ShopLogin",
            width : popWidth,
            height : popHeight,
            pos : "fixed"
        });

    }

}




/* 팝업 */
function popWin(url,name,w,h,scroll, poL, poT){
	if (getCookie(name) != 'done'){
	    if(poL == ""){
	         poL = (screen.width - w)/2;
	    }

	    if(poT == ""){
	        poT = (screen.height - h)/2;
	    }

	    var pop = window.open(url,name,'width='+w+',height='+h+',left='+poL+',top='+poT+',scrollbars='+scroll);
	    pop.focus();
	}
}

/** 로그인 팝업 */
function layerLoginPop(url, bNonMem, bMinor, bAcc) {
    var HAS_LOGIN_SESSION = $("#HAS_LOGIN_SESSION_BEAN").val();
    if (HAS_LOGIN_SESSION != "false") {
        return true;
    }

    //var rtnUrl = url != undefined ? url : location.href;
    var rtnUrl ='';
    if(url == undefined || url == ''){
        rtnUrl = location.href;
    }else{
        rtnUrl = url;
    }

    var isNonMem = bNonMem != undefined ? bNonMem :  false;
    var isMinor = bMinor != undefined ? bMinor :  false;
    var isAcc = bAcc != undefined ? bAcc :  false;
    var isWibro = false;

    if($(location).attr("pathname").indexOf("/productWibroView.do") > -1) {
        isWibro = true;
    }

    if ($(location).attr("pathname").indexOf("/m/") == -1) { // PC버전이면

        var popWidth = 430;
        var popHeight = 265;
        if (isMinor) {
            popWidth = 480;
        }

        if (isAcc) {
            popWidth = 480;
            popHeight = 283;
        }

        // & 못넘겨서 || 로 치환해서 다시 치환한다.
        rtnUrl = rtnUrl.replace(/&/g, "||");
        $(this).layerWrap({
            src : "/login/loginLayerPopView.do",
            auto : "yes",
            varData : {
                isAcc : isAcc,
                isNonMem :isNonMem,
                isMinor : isMinor,
                rtnUrl : rtnUrl,
                isWibro : isWibro
            },
            id : "ShopLogin",
            width : popWidth,
            height : popHeight,
            pos : "fixed"
        });

    } else { // 모바일 버전이면

        var popWidth = 320;
        var popHeight = 210;
        if (isMinor) {
            var popHeight = 243;
        }

        if (isAcc) {
            var popHeight = 190;
        }

        // & 못넘겨서 || 로 치환해서 다시 치환한다.
        rtnUrl = rtnUrl.replace(/&/g, "||");
//        $(this).layerWrap({
////            src : "/m/login/loginLayerPopView.do" + "?isNonMem=" + isNonMem + "&isMinor=" + isMinor + "&isAcc=" + isAcc + "&rtnUrl=" + rtnUrl,
//            src : "/m/login/loginLayerPopView.do",
//            auto : "yes",
//            varData : {
//                "isNonMem" : isNonMem
//                ,"isMinor" : isMinor
//                ,"isAcc" : isAcc
//                ,"rtnUrl" : rtnUrl
//            },
////            iframe : "yes",
//            id : "ShopLogin",
//            width : popWidth,
//            height : popHeight,
//            pos : "fixed"
//        });

        $(this).layerWrap({
            src : "/m/login/loginLayerPopView.do" + "?isNonMem=" + isNonMem + "&isMinor=" + isMinor + "&isAcc=" + isAcc + "&rtnUrl=" + rtnUrl + "&isWibro=" + isWibro,
            auto : "yes",
            varData : {
                "isNonMem" : isNonMem
                ,"isMinor" : isMinor
                ,"isAcc" : isAcc
                ,"rtnUrl" : rtnUrl
                ,"isWibro" : isWibro
           },
            iframe : "yes",
            id : "ShopLogin",
            width : popWidth,
            height : popHeight,
            pos : "fixed"
        });

    }

}

/** 로그인 호출 페이지 호출 */
function loginGoCheck(url) {

    var HAS_LOGIN_SESSION = $("#HAS_LOGIN_SESSION_BEAN").val();
    if (HAS_LOGIN_SESSION != "false") {
        return true;
    }

    var rtnUrl = "";

    var pathname = $(location).attr('pathname');

    if(pathname == "/m/smart/wirelessOrderForm_new.do" || pathname == "/m/smart/wirelessOrderForm.do"){
    	prodOrderViewLoginPop();
		$('.slideClose').trigger('click');
    	return;

    }else if(pathname== "/m/accessory/accsAuth.do"){
    	if ($("#URL_REDIRECT").length > 0 && $("#URL_REDIRECT").val() != "") { //로그인 후 redirect시 사용될 파라미터
            var prodNo= $("#prodNo_forLogin").val();
            rtnUrl = "/m/accessory/accsProductView.do&prodNo="+prodNo;
            rtnUrl = $("#SSL_DOMAIN").val() + "/common/ulrRedirect.do?returnUrl=" + rtnUrl;
        } else {

            rtnUrl = url != undefined ? url : location.href;
            rtnUrl = rtnUrl.replace("?timeout=Y", "");        //2시간 time out 처리한 이후에는 해당 layer 팝업 호출하는 flag 를 삭제 해준다.

            if (rtnUrl == null || $.trim(rtnUrl) == "") {
                rtnUrl = location.href;
            }
        }
    } else if(pathname == "/m/uniteOrder/orderCartView.do") {
    	rtnUrl = location.href;
    	if($("#sessCartNo").length > 0 && $("#sessCartNo").val() != "") {
    		rtnUrl = location.href+"?cartNo="+$("#sessCartNo").val();
    	}
	} else if(pathname == "/m/deal/deal5g.do" || pathname == "/m/deal/foodDeal5g.do" || pathname == "/m/deal/collaboDeal5g.do") {
		rtnUrl = encodeURI(location.href);
	} else{
        if ($("#URL_REDIRECT").length > 0 && $("#URL_REDIRECT").val() != "") { //로그인 후 redirect시 사용될 파라미터
            var urlParam =  "&"+ $("#URL_REDIRECT").val();
            rtnUrl = location.pathname;
            rtnUrl = $("#SSL_DOMAIN").val() + "/common/ulrRedirect.do?returnUrl=" + rtnUrl + urlParam;
        } else {

            rtnUrl = url != undefined ? url : location.href;

            rtnUrl = rtnUrl.replace("?timeout=Y", "");        //2시간 time out 처리한 이후에는 해당 layer 팝업 호출하는 flag 를 삭제 해준다.

            if (rtnUrl == null || $.trim(rtnUrl) == "") {
                rtnUrl = location.href;
            }
        }
    }

    if (HAS_LOGIN_SESSION == "false") {
        var SDP_URL_LOGIN = $("#SDP_URL_LOGIN").val();
        location.href = SDP_URL_LOGIN + rtnUrl;
    }
}

function getProdViewRtnUrl(){
    var domainHttp = MSHOP_DOMAIN_HTTP;
    var rtnViewUrl = "";
    var ordrProdCtgCd = $("#prodCtgCd").val();

	if(ordrProdCtgCd == undefined || ordrProdCtgCd == ""){
		rtnViewUrl = domainHttp + "/m/main.do";
	}else if(ordrProdCtgCd == "11") {
		//usim
		rtnViewUrl = domainHttp + "/m/smart/productUsimView.do";
	}else if(ordrProdCtgCd == "13" || ordrProdCtgCd == "14" || ordrProdCtgCd == "15" || ordrProdCtgCd == "16") {
		rtnViewUrl = domainHttp + "/m/smart/productView.do";
	}else if(ordrProdCtgCd == "17" || ordrProdCtgCd == "18") {
		//태블릿(3G,lte)
		rtnViewUrl = domainHttp + "/m/smart/productView.do";
	}else if(ordrProdCtgCd == "29") {
		//lte 에그
		rtnViewUrl = domainHttp + "/m/smart/productView.do";
	}else{
		rtnViewUrl = domainHttp + "/m/main.do";
	}

	var rtnParamUrl = "?prodNo=" + $("#prodNo").val();
    rtnParamUrl += "&sntyNo=" + $("#sntyNo").val();

    if(ordrProdCtgCd != "11"){
        if($("#vndrNo").val() != ''){
        	rtnParamUrl += "&vndrNo="+$("#vndrNo").val()+"&lowVndrNo="+$("input[name='drRecpAgncyCd']").val();
        }
        rtnParamUrl += "&pplId=" + $("#pplId").val()
        + "&sbscTypeCd=" + $("#sbscTypeCd").val()
        + "&supportType=" + $("#supportType").val()
        + "&svcEngtMonsTypeCd=" + $("#svcEngtMonsTypeCd").val()
        + "&inslMonsTypeCd=" + $("#inslMonsTypeCd").val()
        // + "&dlvrMethCd=" + $("#dlvrMethCd").val()
        + "&dscnOptnCd=" + $("#dscnOptnCd").val()
        + "&userType=" + $('#userType').val()
        + "&scAgree=" + $("#seeAndClickAgree").val()
        + "&rUrl=Y";
        if($("#prodDiv").val()=='02'){
        	rtnParamUrl += "&prodDiv=02";
        }else{
   	    	rtnParamUrl += "&hndsetDlvrFrml=" + $("input[name='hndsetDlvrFrml']").val();
        }
    }else{

    	var usimTypeLog = "";
        if($("#usimType").val() == 'LTE'){
        	usimTypeLog = '0';
        }else{
        	usimTypeLog = '1';
        }
        var usimpplLog = "";
        var usimpplVal = $("#pplId").val();
        if(usimpplVal == '258' ||usimpplVal == '56'){
        	usimpplLog = '0';
        }else if(usimpplVal == '261' ||usimpplVal == '58'){
        	usimpplLog = '1';
        }else{
        	usimpplLog = '2';
        }

    	var usimChargLog = "";
        if($("#prodNo").val() =='WL00000460'){
        	usimChargLog = '0';
        }else{
        	usimChargLog = '1';
        }
        rtnParamUrl += "&sbscTypeCdLog=" + $("#sbscTypeCd").val()
        + "&usimTypeLog=" + usimTypeLog
		+ "&usimpplLog=" + usimpplLog
		+ "&usimChargLog="+ usimChargLog;
    }
    rtnParamUrl += "&ord=T";
    rtnUrl = rtnViewUrl + rtnParamUrl;

    return rtnUrl;
}

function prodOrderClose(){
	// alert("비회원 으로 계속 주문하시겠습니까?");
	$("[data-type=layerPopClose]").trigger("click");
}

function logOut () {
    var url = location.href;
    var domainHttp = MSHOP_DOMAIN_HTTP;
    var logOutUrl = $("#SDP_URL_LOGOUT").val();
    if ( url.indexOf("/m/accessory/accsOrderProductsList.do") > -1 || url.indexOf("/m/accessory/accsOrderProductResultView.do") > -1 ) {
        logOutUrl += domainHttp + "/m/main.do";
    } else if ( url.indexOf("/m/smart/wirelessOrderForm_new.do") > -1 ) {
    	//모바일주문 분기모바일주문 분기
    	var ordrProdCtgCd = $("#prodCtgCd").val();
    	var arrParam =[];
    	if($("#prodNo").val() != undefined && $("#prodNo").val() != ""){
    		arrParam.push("prodNo=" + $("#prodNo").val());
    	}
    	if($("#sntyNo").val() != undefined && $("#sntyNo").val() != ""){
    		arrParam.push("sntyNo=" + $("#sntyNo").val());
    	}

    	if(ordrProdCtgCd == undefined || ordrProdCtgCd == ""){
    		logOutUrl += domainHttp + "/m/main.do";
    	} else if ( ordrProdCtgCd == "13" || ordrProdCtgCd == "14" || ordrProdCtgCd == "15" || ordrProdCtgCd == "16") {
    		//모바일(lte,3g,feature), wearable
			if($("#vndrNo").val() != undefined && $("#vndrNo").val() != ""){
				arrParam.push("vndrNo=" + $("#vndrNo").val());
	    	}
			logOutUrl += domainHttp + "/m/smart/productView.do?"+arrParam.join("&");
		}else if ( ordrProdCtgCd == "17" || ordrProdCtgCd == "18") {
			//태블릿(3G,lte)
			logOutUrl += domainHttp + "/m/smart/productTabletView.do?"+arrParam.join("&");
		}else if ( ordrProdCtgCd == "19") {
			//WiBro Hybrid egg
			logOutUrl += domainHttp + "/m/smart/productHybridView.do?"+arrParam.join("&");
		}else if ( ordrProdCtgCd == "12") {
			//WiBro egg
			logOutUrl += domainHttp + "/m/smart/productWibroView.do?"+arrParam.join("&");
		}else if ( ordrProdCtgCd == "11") {
			//선불유심
			logOutUrl += domainHttp + "/m/smart/productUsimView.do?"+arrParam.join("&");
		}else{
			//중고폰은 기존 처리 방식대로...
			logOutUrl += url;
		}
    } else if ( url.indexOf("/m/smart/wirelessOrderForm.do") > -1 ) {
    	//모바일주문 분기모바일주문 분기
    	var ordrProdCtgCd = $("#prodCtgCd").val();
    	var arrParam =[];
    	if($("#prodNo").val() != undefined && $("#prodNo").val() != ""){
    		arrParam.push("prodNo=" + $("#prodNo").val());
    	}
    	if($("#sntyNo").val() != undefined && $("#sntyNo").val() != ""){
    		arrParam.push("sntyNo=" + $("#sntyNo").val());
    	}

    	if(ordrProdCtgCd == undefined || ordrProdCtgCd == ""){
    		logOutUrl += domainHttp + "/m/main.do";
    	} else if ( ordrProdCtgCd == "13" || ordrProdCtgCd == "14" || ordrProdCtgCd == "15" || ordrProdCtgCd == "16") {
    		//모바일(lte,3g,feature), wearable
    		if($("#vndrNo").val() != undefined && $("#vndrNo").val() != ""){
    			arrParam.push("vndrNo=" + $("#vndrNo").val());
    		}
    		logOutUrl += domainHttp + "/m/smart/productView.do?"+arrParam.join("&");
    	}else if ( ordrProdCtgCd == "17" || ordrProdCtgCd == "18") {
    		//태블릿(3G,lte)
    		logOutUrl += domainHttp + "/m/smart/productTabletView.do?"+arrParam.join("&");
    	}else if ( ordrProdCtgCd == "19") {
    		//WiBro Hybrid egg
    		logOutUrl += domainHttp + "/m/smart/productWibroView.do?"+arrParam.join("&");
    	}else if ( ordrProdCtgCd == "12") {
    		//WiBro egg
    		logOutUrl += domainHttp + "/m/smart/productWibroView.do?"+arrParam.join("&");
    	}else if ( ordrProdCtgCd == "11") {
    		//선불유심
    		logOutUrl += domainHttp + "/m/smart/productUsimView.do?"+arrParam.join("&");
    	}else{
    		//중고폰은 기존 처리 방식대로...
    		logOutUrl += url;
    	}
    } else {
        logOutUrl += url;
    }

    if ($("#URL_REDIRECT").length > 0 && $("#URL_REDIRECT").val() != "") { //로그아웃 후 redirect시 사용될 파라미터
        var rtnUrl = "";
        var urlParam =  "&"+ $("#URL_REDIRECT").val();
        rtnUrl = location.pathname;
        logOutUrl = $("#SDP_URL_LOGOUT").val() + $("#SSL_DOMAIN").val() +"/common/ulrRedirect.do?returnUrl=" + rtnUrl + urlParam;
    }

    top.location.href = logOutUrl;

    /*$("#logingIfame").attr("src", "/ollehshop/logOut.jsp?url=" + logOutUrl);
    $("#logingIfame").load(function () {
        if($.isFunction($.loadBlock)) {
            $.loadBlock();
        }
        parent.location.reload();
    });*/


}


// 상세 페이지 tab
jQuery.toolTip = function(){

    $("a.tooltip").each(function(){
        var toolName = $(this).attr("tooltip");
        if (!$(this).next().hasClass("tooltipArticle")) {
            $(this).after('<div class="tooltipArticle"></div>');
            $(this).next().load("/common/pc/toolTip/" + toolName+".html");
        }
        $(this).bind({
            mouseenter:function(){
                var top = $(this).offset().top + 30,
                    left = $(this).offset().left -15;

                var tooltip = $(this).next().html();
                $("body").append('<div class="tooltipWrap" style="left:'+left+'px;top:'+top+'px;">'+tooltip+'</div>');
                $("div.tooltipWrap").css("maxWidth", "300px");
                $("div.tooltipWrap").append('<img src="/images/pc/common/bg_tooltip.gif" alt="" class="arrow"/>');
            },
            mouseleave:function(){
                $("div.tooltipWrap").remove();
            },
            focusin:function(){
                var top = $(this).offset().top + 30,
                left = $(this).offset().left -15;

                var tooltip = $(this).next().html();
                $("body").append('<div class="tooltipWrap" style="left:'+left+'px;top:'+top+'px;">'+tooltip+'</div>');
                $("div.tooltipWrap").css("maxWidth", "300px");
                $("div.tooltipWrap").append('<img src="/images/pc/common/bg_tooltip.gif" alt="" class="arrow"/>');
            },
            focusout:function(){
                $("div.tooltipWrap").remove();
            }
        });
    });
};

$(document).on("click","input:checkbox#todayChk",function(){
    if($(this).prop("checked")){
        setCookie($(this).attr('today'), "done", 1);
    }else{
        setCookie($(this).attr('today'), "done", -1);
    }
});

$(document).on("click","input:checkbox.todayChk",function(){
	var expireDate = 1;
	if($(this).prop("checked")){
		if($('#dispPopDtVal').val() != null && $('#dispPopDtVal').val() != ""){
			expireDate = parseInt($('#dispPopDtVal').val());
		}
		setCookie($(this).attr('today'), "done", expireDate);
	}else{
		setCookie($(this).attr('today'), "done", -1);
	}
});

function setCookie( name, value, expiredays )
{
	var cookieStr = "";
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays);
    if (expiredays != null && expiredays != "") {
    	cookieStr = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    } else {
    	cookieStr = name + "=" + escape( value ) + "; path=/;";
    }
    document.cookie = cookieStr;
}

function getCookie( name )
{
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = (x+nameOfCookie.length);
        if ( document.cookie.substring( x, y ) == nameOfCookie )
        {
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";
}

/** 공지사항 팝업 */
function layerNoticePop(popNo, popCode, popupNm, mblContsSbst){
    var src = "/m/common/menuCodePopView.do" + "?popCode=" + popCode;
    var lyId = popNo+popCode;

    if (getCookie(lyId) != 'done'){
        var popHtml = '';
        popHtml += '<div class="noticePopLy">';
        popHtml += '    <div class="dimBg"></div>';
        popHtml += '    <div id="'+lyId+'" class="popContent" tabindex="0">    ';
        popHtml += '        <div class="pTitle">'+popupNm+'</div>';
        popHtml += '        <div class="pBody"></div>';

        popHtml += '        <div class="today todayNoti">';
        popHtml += '            <span class="todayNo">';
        popHtml += '                <input type="checkbox" id="todayChk" class="inpChkBx" today="'+lyId+'" />';
        popHtml += '                <label for="todayChk">오늘 하루 그만 보기</label></span>';
        popHtml += '                <a href="javascript:void(0)" class="closePop">닫기</a>';
        popHtml += '        </div>';
        popHtml += '        <div class="conBg"></div>';
        popHtml += '    </div>';
        popHtml += '</div>';

        $("body").prepend(popHtml);
    }

    $(".pBody").load(src);

    $(document).on("click", "a.closePop", function(){
        $(".noticePopLy").hide();
    });
}

function mainLayerNoticePop(popNo, popCode, popupNm, mblContsSbst, dispPopDt){
	var src = "/m/common/mainPopView.do" + "?gbn=L&dispPopNo=" + popNo;
	var lyId = popNo+popCode;

    var dispNotiVal = "";
    if(dispPopDt == 1 || dispPopDt == null || dispPopDt == ""){
    	dispNotiVal = "오늘 하루 그만 보기";
    }else if(dispPopDt == 14){
    	dispNotiVal = "2주간 이 창을 열지 않음";
    }else if(dispPopDt == 30){
    	dispNotiVal = "한 달간 이 창을 열지 않음";
    }else{
    	dispNotiVal = dispPopDt + "일간 이 창을 열지 않음";
    }

	// if (getCookie(lyId) != 'done'){
	// 	var popHtml = '';
	// 	popHtml += '<div class="noticePopLy">';
	// 	popHtml += '    <div class="dimBg"></div>';
	// 	popHtml += '    <div id="'+lyId+'" class="popContent" tabindex="0">    ';
	// 	popHtml += '        <div class="pTitle">'+popupNm+'</div>';
	// 	popHtml += '        <div class="pBody"></div>';

	// 	popHtml += '        <div class="today todayNoti">';
	// 	popHtml += '            <span class="todayNo">';
	// 	popHtml += '                <input type="checkbox" id="todayChk" class="inpChkBx todayChk" today="'+lyId+'" />';
	// 	popHtml += '                <label for="todayChk">'+ dispNotiVal +'</label></span>';
	// 	popHtml += '				<input type="hidden" id="dispPopDtVal" value='+ dispPopDt +' />';
	// 	popHtml += '                <a href="javascript:void(0)" class="closePop">닫기</a>';
	// 	popHtml += '        </div>';
	// 	popHtml += '        <div class="conBg"></div>';
	// 	popHtml += '    </div>';
	// 	popHtml += '</div>';

	// 	$("body").prepend(popHtml);
	// }

    var popHtml = '';
        popHtml += '<div class="newMainPop" id="'+lyId+'" style="display:none">';
        popHtml += '    <div class="cfm-layer layer-notice" tabindex="0">';
        popHtml += '        <div class="pBody"></div>';
        popHtml += '        <div class="layer-footer">';
        popHtml += '            <button class="layer-stop-btn" type="button">하루 동안 보지 않기</button>';
        popHtml += '            <button class="layer-close-btn" type="button">닫기</button>';
        popHtml += '        </div>';
        popHtml += '    </div>';
        popHtml += '</div>';

        $("body").prepend(popHtml);

	$(".pBody").load(src);

	$(document).on("click", "a.closePop", function(){
		$(".noticePopLy").hide();
	});

    $(window).on('load', function(){
        $('.newMainPop').each(function(){
            var $this = $(this);
            var $id = $this.attr('id');
        
            setStopPopup($this, $id, 1);
        });
        
        function setStopPopup(target, name, data){
            var target = $(target);
        
            //쿠키설정
            target.on('click', '.layer-stop-btn', function() {
                mkt.setComCookie(name, new Date().toString(), data);
                target.hide();
            });
        
            if(mKt_common.isNull(mkt.getComCookie(name)) !== '') {
                target.hide();
            } else {
                target.css('display', 'block');
                //닫기
                target.on('click', '.layer-close-btn', function(){
                    target.hide();
                });
            }
        }
    
    });
}

var shopUi = {};

(function(shopUi) {
    this.shopUi = shopUi;
})((function($) {

    shopUi.refresh = function(el, position) {
        var $el = $(document.getElementById(el)),
            poy,
            pox;

        if(position === 'center') {
            poy = Math.max(0, (($(window).height() - $el.outerHeight()) / 2) + $(window).scrollTop()) + "px",
                pox = Math.max(0, (($(window).width() - $el.outerWidth()) / 2) + $(window).scrollLeft()) + "px";
        } else if(position === 'top') {
            poy = 0,
                pox = Math.max(0, (($(window).width() - $el.outerWidth()) / 2) + $(window).scrollLeft()) + "px";
        }

        $el.css({
            top : poy,
            left : pox
        });
    };

    shopUi.layerdim = function(eldim) {
        $('body').append('<div class="' +eldim+ '"></div>');
    };

    shopUi.layerclose = function(el, dim) {

    	var $el = "";
    	var dimNm = "";

    	if (el == null || el == "") {
    		var $appLayer = $("div[data-layer-role=app]", document);
    		if ($appLayer.length > 0) {
    			$el = $appLayer;
    			dimNm = "." + $appLayer.prev("div").attr("class");
    		}
    	} else {
    		$el = $(document.getElementById(el));
    		dimNm = "." + dim;
    	}

    	// 앱 푸터 제어
    	showAppFooter();

        $el.remove();
        $(dimNm).remove();
    };

	/*
	2017-12-04 Deep Link 작업으로 인한 스크립트 추가.
	임시 주석처리
	shopUi.close = function(el) {
		var $el = $(document.getElementById(el));

		$el.css({
			display : 'none'
		});
	};*/

    return shopUi;

}(jQuery)));