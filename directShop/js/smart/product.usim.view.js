document.domain = 'kt.com';

VALIDATE_NOT_EMPTY_MSG = {};

var initYn = 'Y';
var defaultQtyYn = 'Y';
var isReal = null;

$(document).ready(function(){
	controller.init();	//공통

	isReal = $("#SERVER_NAME").val() == 'REAL';

	if("Y" == $("#sharingYn").val()){
		loadOneBlock();
		//2021 .12.14 DB수정으로 인한 개발 데이터쉐어링 관련 주석(0798 >>> 0800)
		/*if ("LOCAL" == $("#SERVER_NAME").val() || "DEV" == $("#SERVER_NAME").val()) {
			$("#pplId").val("0798");
		}else{
		}*/
		$("#pplId").val("0800");
		$("#pplGroupDivCd").val("501");
		$("#sbscTypeCd").val("01");
		page.goOrder();
	}else{

		showWrapStep();

		//가입유형
		$("div#wrapStep4 a.btn").each(function(){
			var _this = $(this);
			_this.click(function(e){

				var targetPopup = $(this).data('target');
				_this.addClass("active").attr({"title" : "선택됨", 'aria-selected' : true}).siblings().removeClass("active").attr({'aria-selected' : false}).removeAttr("title");

	        	//가입유형
	        	page.settingTypes();

	        	if('Y' != $("#befIntmUsimUseYn").val()){
	        		//page.goOrder();
	        		goNextStep();
	        		return false;
	        	}

	        	var varData = {
	        		sbscTypeCd : $("#sbscTypeCd").val(),
	        	};

	           	var cani = controller.ajaxSend({
	        		cache	: false,
	        		url 	: "/direct/selfChkTime.json",
	        		data	: varData,
	        		dataType: "json" ,
	        		type 	: "post",
	        		async	: true,
	        		isBlock	: false,
	        		successCall : function(jsonObj){
	        			if(jsonObj.result == 'Y'){
	        				//page.goOrder();
	        				goNextStep();
	        			}else{
	        				popupOpen(targetPopup);
	        			}
	        		},
	        		errorCall : function(jsonObj) {
	        			popupOpen(targetPopup);
	        		}
	           	});

	           	return false;

	        	//page.goOrder();
			});
		});

		$(document).on("click", "#popup-phone-new .btn-bottom button, #popup-phone-move .btn-bottom button", function(){
			//page.goOrder();
			goNextStep();
		});

		$("div#wrapStep5 a.btn").each(function(){
			var _this = $(this);
			_this.click(function(e){
				var targetPopup = $(this).data('target');
				_this.addClass("active").attr({"title" : "선택됨", 'aria-selected' : true}).siblings().removeClass("active").attr({'aria-selected' : false}).removeAttr("title");

	        	//
				page.settingUserType();

	        	page.goOrder();


			});
		});

		$(document).on("click","a[name='recomm-plan_system']",function(e){
			//조건 선택하고 요금제 추천받기
			e.preventDefault();

			var recommGenParam = $("#recommGenParam").val();
			if( recommGenParam =="ALL"){
				showWrapStep("#chooseGenerationDiv", $("[name=recomm-plan_system]"));
//				$("#chooseGenerationDiv").show();
//				$("#titleNm").text("서비스 선택");
				fnShowChooseGen();
			}else{
				fnRecommendDiv();
			}

		});

		$(document).on("click","a[name='other-plan_system']",function(e){
			//전체 요금제 보기
			e.preventDefault();
			showWrapStep($(this).data('target'), this);
			$("a[href='#tab-con1']").trigger('click');
		});

		//전체 요금제 보기 - 요금제 선택 (5G/LTE)
		$('.tab-charge li a[role="button"]').on('click', function(){
			$(".select-charge li a[role='button']").removeClass('active');

			var obj = $(this).attr('href');
			$(obj).siblings('div').hide();
			$(obj).show();

			if($(this).attr("href") == "#tab-con1") {
				$('#tab-con1 .select-charge li a[role="button"]').eq(0).trigger('click');
			}
			else{
				$('#tab-con2 .select-charge li a[role="button"]').eq(0).trigger('click');
			}
		});

		//요금제 선택 상품 눌렀을때
		$(document).on("click",'.select-charge li a[role="button"]',function(e){
			$(".select-charge li a[role='button']").attr('aria-selected', false).removeClass('active');
			$(this).attr('aria-selected', true).addClass('active');
			page.changeChargeGroup();
		});

		$(document).on("click","#select-period button",function(e){
			//약정기간 선택
			$("#svcEngtMonsTypeCd").val($(this).data("engt"));
			$("#supportType").val($(this).data("support"));
			getProdDiscountInfo();
		});

		$(document).on("click",".boxPplSelect li",function(e){
			page.changeChargeGroup($(this).find("a").data("sortProd"));
		});

		$(document).on('click','dl.list-charge dt', function(){
	        var obj = $(this);
	        if(obj.hasClass('selected')){
	            $('dl.list-charge dt.selected').removeClass('selected').attr({'title' : '열기', 'aria-expanded' : false, 'aria-selected' : false});
	            $('dl.list-charge dd').slideUp();
	            $('html, body').animate({
	                scrollTop:0
	            },100);
	        }else{
	            $('dl.list-charge dt.selected').removeClass('selected').attr({'title' : '열기', 'aria-expanded' : false, 'aria-selected' : false});
	            $('dl.list-charge dd').fadeOut();
	            obj.addClass('selected').attr({'title' : '닫기', 'aria-expanded' : true, 'aria-selected' : true}).next('dd').slideDown(200,function(){
	                $('html, body').animate({
	                    scrollTop:obj.offset().top
	                },100);
	            });
	        }

	        $("input[name='seeznAddItem']").each(function(){
	        	$(this).prop("checked", "");
	    	});

	        $("input[name='netflixAddItem']").each(function(){
	        	$(this).prop("checked", "");
	    	});

	        if(chkSeeznPpl("2", $(this).attr("pplgroupDivCd"), $(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='seeznAddItem']").eq(0).prop("checked", "checked");
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='seeznAddItem']").eq(1).prop("checked", "checked");
	        }else if(chkSeeznPpl("1", $(this).attr("pplgroupDivCd"), $(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='seeznAddItem']").eq(0).prop("checked", "checked");
	        }

	        if(chkNetflixPpl($(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='netflixAddItem']").eq(0).prop("checked", "checked");
	        };

	        if(chkSeasonChoisePpl($(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='list-superPlan2']").eq(0).prop("checked", "checked");
	        };

	        if(chkBodyFdPpl($(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='list-bodyFdPlan']").eq(0).prop("checked", "checked");
	        };

	        if(chkAirpodPpl($(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='list-airpodPlan']").eq(0).prop("checked", "checked");
	        };

	        if(chkDisneyPpl($(this).attr("pplId"))){
	        	$("dl.list-charge dt.selected").next("dd.area").find("input[name='list-disneyPlan']").eq(0).prop("checked", "checked");
	        };

	    })
	    $(document).on('keydown', 'dl.list-charge dt', function(){
		     if(event.keyCode == 13) {
		          $(this).trigger('click');
		     }
		})
		/* 202101 반영예정 :  Y’s 요금제 */
		$(document).on('click','dl.list-charge-ys dt a', function(){
			var obj = $(this);
			var objPr = $(this).parent();
			var root = $(this).closest('.list-charge-ys');

	        if(objPr.hasClass('selected')){
	           	root.find('dt').removeClass('selected')
	            root.find('dt a').attr({'title' : '닫힘', 'aria-expanded' : false, 'aria-selected' : false});
	           	root.find('dd').slideUp();
	            $('html, body').animate({
	                scrollTop:0
	            },100);
	        }else{
	           	root.find('dt').removeClass('selected');
	           	root.find('dt a').attr({'title' : '닫힘', 'aria-expanded' : false, 'aria-selected' : false});
	           	root.find('dd').fadeOut();
	            objPr.addClass('selected');
	           	obj.attr({'title' : '열림', 'aria-expanded' : true, 'aria-selected' : true})
	            objPr.next('dd').slideDown(200,function(){
	                $('html, body').animate({
	                    scrollTop:objPr.offset().top
	                },100);
	            });
	        }
		});
	    /* 202101 반영예정 :  Y’s 요금제 */

	    $('.select-date button').on('click',function(){
	        $('.btn-bottom button:disabled').prop('disabled',false)//비활성화된 단추 => 활성화
	        $(this).addClass('selected').attr('aria-selected', true).siblings('button').attr('aria-selected', false).removeClass('selected');
	    })

	    // 시즌초이스 선택
	    $(":checkbox[name='diySeeznItem']").click(function() {
	    	if($(this).is(":checked")) {
	    		var chkLen = $(":checkbox[name='diySeeznAddItem']:checked").length;
	    		if(chkLen < 1) {
	    			$(":checkbox[name='diySeeznAddItem']:not(':checked')").eq(1).prop("checked", true);
	    			$(":checkbox[name='diySeeznAddItem']:not(':checked')").eq(0).prop("checked", true);
	    		} else if(chkLen < 2) {
	    			$(":checkbox[name='diySeeznAddItem']:not(':checked')").eq(0).prop("checked", true);
	    		}
	    	} else {
	    		$(":checkbox[name='diySeeznAddItem']:checked").prop("checked", false);
	    	}
	    });

	    // 시즌초이스 부가서비스 내용 선택
	    $(":checkbox[name='diySeeznAddItem']").click(function() {
	    	if($(this).is(":checked")) {
	    		if($(":checkbox[name='diySeeznItem']").is(":not(':checked')")) {
	    			$(":checkbox[name='diySeeznItem']").prop("checked", true);
	    		}
	    	} else {
	    		var chkLen = $(":checkbox[name='diySeeznAddItem']:checked").length;
	    		if(1 > chkLen) {
	    			$(":checkbox[name='diySeeznItem']").prop("checked", false);
	    		}
	    	}
	    });


		// 요금제 유의사항 팝업 선택
		$(document).on("click", "#pplChgNoti", function() {
			var svcRstYn = $(this).attr("svcRstYn");
			var diyPplYn = $(this).attr("diyPplYn");

			if("N" == svcRstYn) {
				location.href = "/directMain.do";
			} else {
				if("Y" == diyPplYn) {
					showWrapStep("#Ys-plan", this);
				}
			}
		});

		//작업시작
		page.initData();
	}
});

/**
 * @desc 작업객체
 */
var page = {

	isMuyakjeong : true,	//무약정여부
	supportTypeCd : "03",	//기본 지원금유형코드 : 무약정
	periodCd : "01",	//기본 약정기간코드 : 무약정
	buyTypeCd : "01",	//기본 구매유형코드 : 일반구매

	delivery : "01",	//배송방법(임시) : 택배
	deliveryCode : "01",	//기본 배송방법코드(선택) : 택배

	deliveryLayerYn : false,	//배송방법 레이어에서 진입한건지 여부
	pplTableLayerYn : false,	//요금제표 레이어로 진입할지 여부


	pplLimitYn : false,	//무한데이터 요금제 이용약관 여부
	pplList : [],	//요금제목록
	pplRcmdList : [],	//상품카테고리에 맵핑된 추천요금제 목록
	dfltIdx : "",//추천 기본요금제

	isDefualtPointUse : true, // 첫 포인트 셋팅 여부
	pointLoginPopView : true, // 비회원일 경우 포인트 사용 시 로그인 팝업 노출 여부

	affiliateYn : "",	// 쿠폰팩 대상여부
	dcPrice : 0,		// 쿠폰금액
	couponList : [],	//쿠폰팩 목록

	nStep : 0, // -1,

	initData : function(){
		page.isMuyakjeong = false;
		page.buyTypeCd = $("#buyTypeCd").val();

		//가입유형, 지원금유형/약정, 상환기간 hidden 값설정
		$("a[name='set'].active").each(function(){
			$("#"+$(this).attr("setNm")).val($(this).attr("setCd"));
		});

		//가입유형 설정
		if($("div#wrapStep1 div.step0 a[setNm='sbscTypeCd'].active").length<=0){
			$("div#wrapStep1 div.step0 a[setNm='sbscTypeCd']").eq(0).addClass('active');
		}

	},

	/** @desc 가입유형 설정 */
	settingTypes : function(){
		//hidden에 code값 설정
		var code = $("div#wrapStep4 a.btn.active").attr("setCd");
		$("div#wrapStep4 a.btn.active").attr({"title" : "선택됨", 'aria-selected' : true});
    	$("#sbscTypeCd").val(code);

	},

	settingUserType: function(){
		//hidden에 code값 설정
		var code = $("div#wrapStep5 a.btn.active").attr("setCd");
		$("div#wrapStep5 a.btn.active").attr({"title" : "선택됨", 'aria-selected' : true});
    	$("#userType").val(code);
	},

	/** @desc 가입유형 설정 */
	getSutiedDirectBenefits : function(){
		$('.benefit-check-list li').hide();
		$('.benefit-check-list input[type=checkbox]').prop('checked', '').attr('disabled', 'disabled');

		var recommDiv = $("#recommDiv").val();
		$('.benefit-check-list li.'+recommDiv+'benefit').show();

		var varData = {};
		varData['pplDiv'] = recommDiv;
		varData['pplAge'] = controller.nvl($("#recomm-plan ."+recommDiv+"-values input[name=pplAge]:checked").val(),"9999");
		varData['pplPrice'] = controller.nvl($("#recomm-plan ."+recommDiv+"-values input[name=pplPrice]:checked").val(),"9999");
		varData['pplData'] = controller.nvl($("#recomm-plan ."+recommDiv+"-values input[name=pplData]:checked").val(),"9999");

		controller.ajaxSend({
			cache 	 : false,
			url	 	 : "/direct/getSutiedDirectBenefits.json",
			data	 : controller.getSerializedData(varData),
			dataType : "json",
			type 	 : "post",
			async	 : true,
			isBlock  : true,
			successCall : function(jsonObj){
				var sutiedDirectBenefits = jsonObj.sutiedDirectBenefits;

				for(var i=0; i<sutiedDirectBenefits.length; i++){
					$('#'+sutiedDirectBenefits[i]).removeAttr('disabled');
				}
			}
		});
	},

	/** @desc 요금제 그룹변경시 요금제정보 다시 가져오기 */
	changeChargeGroup : function(sortProd){

		var isSutiedDirect = $("#recomm-plan").is(":visible");

		$("#noPplYn").val("");
		$("#noPplMsgSbst").val("");

		var arrPplGroupCd5g = $("#pplGroupCd5g").val().split(",");

    	var pplGroupDivCd = $(".select-charge li a[role='button'].active").data('group-cd').toString();
    	//var sortProd = $(".boxPplSelect").parent("div.active").find(".sort-area .sortflog a.selected").data("sortProd");

		var vndrProdNo = "";							//대리점 상품 코드
		//대리점 선택 상품여부 Y || 직영단독 여부 Y
		if($("#vndrProdYn").val()=="Y" || $("#drctpSaleYn").val()=="Y"){
			vndrProdNo = $("#vndrProdNo").val();
		}

		//무약정 요금제그룹이면 supportType을 03으로 변경후 조회
		var supportType = $("#supportType").val();
		var svcEngtMonsTypeCd = $("#svcEngtMonsTypeCd").val();
		var buyTypeCd = $("#buyTypeCd").val();
		if(pplGroupDivCd=="132"){
			supportType = "03";
			svcEngtMonsTypeCd = "01";
			buyTypeCd = "01";
		}else{
			//무약정 요금제그룹이 아닌데 지원금 유형이 무약정이면 기본값으로 세팅
			if(supportType=="03"){
				supportType = page.supportTypeCd;
				svcEngtMonsTypeCd = page.periodCd;
				buyTypeCd = page.buyTypeCd;
			}
		}

		var varData = {
			prodNo			  : $("#prodNo").val(),
			sntyNo			  : $("#sntyNo").val(),
			vndrSntyNo		  : $("#vndrSntyNo").val(),
			supportType		  : supportType,
			buyTypeCd		  : buyTypeCd,
			sbscTypeCd		  : $("#sbscTypeCd").val(),
			inslMonsTypeCd	  : $("#inslMonsTypeCd").val(),
			svcEngtMonsTypeCd : svcEngtMonsTypeCd,
			vndrProdNo		  : vndrProdNo,
			rentalTypeCd	  : controller.nvl($("#rentalTypeCd").val(),""),
			vndrNo			  : controller.nvl($("#vndrNo").val(),""),
			prodCtgCd : $("#prodCtgCd").val()
			// 동시주문 : 동시주문 접근 걊
			, accessType: ""
		};

		var ajaxUrl = "/m/smart/getProdPplList.json";

		if(isSutiedDirect){
			ajaxUrl = "/direct/getSutiedDirectPpls.json";

			var recommDiv = $("#recommDiv").val();

			varData['pplDiv'] = recommDiv;
			varData['pplAge'] = controller.nvl($("#recomm-plan ."+recommDiv+"-values input[name=pplAge]:checked").val(),"9999");
			varData['pplPrice'] = controller.nvl($("#recomm-plan ."+recommDiv+"-values input[name=pplPrice]:checked").val(),"9999");
			varData['pplData'] = controller.nvl($("#recomm-plan ."+recommDiv+"-values input[name=pplData]:checked").val(),"9999");

			var arrBenefits = [];
			$("#recomm-plan input[name="+recommDiv+"benefit]").each(function(){
				if($(this).is(":checked")){
					arrBenefits.push($(this).attr("id"));
				}
			});

			varData['benefits'] = arrBenefits;

		}else{
			if(sortProd != undefined){
				varData['sortProd'] = sortProd;
			}

			if(pplGroupDivCd.indexOf(',') > 0){
				varData['pplGroupDivCds'] = pplGroupDivCd.split(",");
			}else{
				varData['pplGroupDivCd'] = pplGroupDivCd;
			}
		}

		$("#pplList_5g").empty();
		$("#pplList_lte").empty();
		$("#popupPplList").empty();

		//UI_UX 요금제그룹 정보로 요금제조회
		controller.ajaxSend({
			cache 	 : false,
			url	 	 : ajaxUrl,
			data	 : controller.getSerializedData(varData),
			dataType : "json",
			type 	 : "post",
			async	 : true,
			isBlock  : true,
			successCall : function(jsonObj){
				var prodPplList = jsonObj.prodPplList;

				page.pplList = [];
				var discountInfo = undefined;

				var arrPplGroupCd5g = $("#pplGroupCd5g").val().split(",");

				var supportType = $("#supportType").val();
				if(pplGroupDivCd=="132"){
					supportType = "03";
				}else{
					if(supportType=="03"){
						supportType = page.supportTypeCd;
					}
				}

				if(prodPplList != null && prodPplList.length>0){

					var pplRcmdList = page.pplRcmdList;

					for(var i=0; i<prodPplList.length; i++){
						var row = null;
						if(isSutiedDirect){
							row = $('<div class="area direct-'+prodPplList[i].regType+'"></div>');
						}else{
							row = $('<div class="area"></div>');
						}

						if("501" == prodPplList[i].pplGroupDivCd) {
							row.css("display", "none");
						}

						/*
						 * 추천요금제 중복제거
						 for(var j=0; j<pplRcmdList.length; j++){
							if(prodPplList[i].pplId == pplRcmdList[j].rcmdPplId){
								row.css("display", "none");
							}
						}
						 */


						var $planBox = $('<div class="box"></div>');

						//컬럼 : 요금제명
						var divPlanTitle = $('<div class="title"></div>');
						if(isSutiedDirect && prodPplList[i].regType == "RECOMM"){
							divPlanTitle.html('<strong class="recomm">[추천] </strong>' + prodPplList[i].pplNm);
						}else{
							divPlanTitle.html(prodPplList[i].pplNm);
						}

						/*if(prodPplList[i].bnfBdgTxt!=undefined && prodPplList[i].bnfBdgTxt!=null && prodPplList[i].bnfBdgTxt!=""){
							var color = prodPplList[i].bnfBdgClr==undefined||prodPplList[i].bnfBdgClr==null? "" : prodPplList[i].bnfBdgClr;
							var column1 = "<em style='background-color:"+color+"'>"+prodPplList[i].bnfBdgTxt+"</em>";
							$column1.append(column1);
						}*/

						$planBox.append(divPlanTitle);

						var divSummaryInfo = $('<div class="summary"></div>');
						divSummaryInfo.html(prodPplList[i].dtlDescSbst);

						$planBox.append(divSummaryInfo);


						//세부내용 : 데이터
						var divDataInfo = $('<div class="line"></div>');
						var spanDataA   = $("<span class='a'>데이터</span>");
						var spanDataB = $("<span class='b'></span>");
						spanDataB.html(prodPplList[i].dataBasic);
						divDataInfo.append(spanDataA).append(spanDataB);

						$planBox.append(divDataInfo);

						if(controller.nvl(prodPplList[i].dataBenefit, "") != ""){
							var divOptInfo = $('<div class="opt"></div>');
							var spanOpt   = $("<span></span>");
							spanOpt.html(prodPplList[i].dataBenefit);
							divOptInfo.append(spanOpt);

							$planBox.append(divOptInfo);
						}

						//5G 요금제 && 다이렉트전용 요금제 체크
						var isDirect5GBuild = false;
						if(prodPplList[i].pplGroupDivCd == "500"){
							isDirect5GBuild = $("a[data-ppl-group='5g']").parent("li").hasClass("active");
						}

						//5G 요금제일 경우 테더링/로밍 항목 추가
						if(arrPplGroupCd5g.indexOf(prodPplList[i].pplGroupDivCd)>=0 || isDirect5GBuild){
							//세부내용 : 테더링
							var divPrsnlShareInfo = $('<div class="line"></div>');
							var spanPrsnlShareA = $("<span class='a'>테더링</span>");
							var spanPrsnlShareB = $("<span class='b'></span>");
							spanPrsnlShareB.html(prodPplList[i].prsnlShare);
							divPrsnlShareInfo.append(spanPrsnlShareA).append(spanPrsnlShareB);

							$planBox.append(divPrsnlShareInfo);


							//세부내용 : 로밍
							var divRoamingInfo  = $('<div class="line"></div>');
							var spanRoamingA = $("<span class='a'>로밍</span>");
							var spanRoamingB = $("<span class='b'></span>");
							spanRoamingB.html(prodPplList[i].roaming);
							divRoamingInfo.append(spanRoamingA).append(spanRoamingB);

							$planBox.append(divRoamingInfo);


							//세부내용 : 음성/문자
							var divTalkInfo = $('<div class="line"></div>');
							var spanTalkA   = $("<span class='a'>음성/문자</span>");
							var spanTalkB = $("<span class='b'></span>");
							if(prodPplList[i].pplId == "0817"){
								spanTalkB.html(prodPplList[i].tlkBasic + " / " + prodPplList[i].charBasic + "<br> Y고객 5,500 추가 할인");
							} else {
								spanTalkB.html(prodPplList[i].tlkBasic + " / " + prodPplList[i].charBasic);
							}
							divTalkInfo.append(spanTalkA).append(spanTalkB);

							$planBox.append(divTalkInfo);

						}else{
							//세부내용 : 음성/문자
							var divTalkInfo = $('<div class="line"></div>');
							var spanTalkA   = $("<span class='a'>음성</span>");
							var spanTalkB = $("<span class='b'></span>");
							spanTalkB.html(prodPplList[i].tlkBasic);
							divTalkInfo.append(spanTalkA).append(spanTalkB);

							$planBox.append(divTalkInfo);


							if(controller.nvl(prodPplList[i].tlkBenefit, "") != ""){
								var divOptInfo2 = $('<div class="opt"></div>');
								var spanOpt2   = $("<span></span>");
								spanOpt2.html(prodPplList[i].tlkBenefit);
								divOptInfo2.append(spanOpt2);

								$planBox.append(divOptInfo2);
							}


							var divCharInfo = $('<div class="line"></div>');
							var spanCharA   = $("<span class='a'>문자</span>");
							var spanCharB = $("<span class='b'></span>");
							if(prodPplList[i].pplId == "0818"){
								spanCharB.html(prodPplList[i].charBasic + "<br> Y고객 5,500 추가 할인");
							} else {
								spanCharB.html(prodPplList[i].charBasic);
							}
							divCharInfo.append(spanCharA).append(spanCharB);

							$planBox.append(divCharInfo);
						}

						//월납부금액
						var divCharge = $("<div class='price'></div>");
						//가격노출여부 Y
						if($("#pricShowYn").val() == 'Y'){
							//단말할인
							if(supportType=="01"){
								//공시금액노출여부 Y
								if($("#punoShowYn").val() == 'Y'){
									var calMonthCommChagePayAmt = prodPplList[i].deviceDiscountBean.calMonthCommChagePayAmt;
									var prmtnDcAmt = prodPplList[i].deviceDiscountBean.prmtnDcAmt;

									var calMonthBasPayAmt = prodPplList[i].deviceDiscountBean.calMonthBasPayAmt;
									if(parseInt(prmtnDcAmt) > 0) {
										calMonthBasPayAmt = calMonthCommChagePayAmt + parseInt(prodPplList[i].deviceDiscountBean.calMonthInslAmt);
									}
									divCharge.html("월 "+controller.addCom(calMonthBasPayAmt)+"원<!--(부가세 포함)-->");
								}else{
									divCharge.html("가격미정");
								}
							}
							//요금할인
							else if(supportType=="02"){
								var calMonthCommChagePayAmt = prodPplList[i].chargeDiscountBean.calMonthCommChagePayAmt;
								var prmtnDcAmt = prodPplList[i].chargeDiscountBean.prmtnDcAmt;

								if(parseInt(prmtnDcAmt) > 0) {
									calMonthCommChagePayAmt = parseInt(calMonthCommChagePayAmt) + parseInt(prmtnDcAmt);
								}

								var calMonthBasPayAmt = prodPplList[i].chargeDiscountBean.calMonthBasPayAmt;
								if(parseInt(prmtnDcAmt) > 0) {
									calMonthBasPayAmt = calMonthCommChagePayAmt + parseInt(prodPplList[i].chargeDiscountBean.calMonthInslAmt);
								}
								divCharge.html("월 "+controller.addCom(calMonthBasPayAmt)+"원<!--(부가세 포함)-->");
							}
							//무약정
							else if(supportType=="03"){
								var calMonthCommChagePayAmt = prodPplList[i].nothingDiscountBean.calMonthCommChagePayAmt;
								var prmtnDcAmt = prodPplList[i].nothingDiscountBean.prmtnDcAmt;

								if(parseInt(prmtnDcAmt) > 0) {
									calMonthCommChagePayAmt = parseInt(calMonthCommChagePayAmt) + parseInt(prmtnDcAmt);
								}

								var calMonthBasPayAmt = prodPplList[i].nothingDiscountBean.calMonthBasPayAmt;
								if(parseInt(prmtnDcAmt) > 0) {
									calMonthBasPayAmt = calMonthCommChagePayAmt + parseInt(prodPplList[i].nothingDiscountBean.calMonthInslAmt);
								}
								divCharge.html("월 "+controller.addCom(calMonthBasPayAmt)+"원<!--(부가세 포함)-->");
							}
						}else{
							divCharge.html("가격미정");
						}

						var popUrl = null;
						if(getShowChDivCd() == "02"){
							//모바일
							popUrl = controller.nvl(prodPplList[i].mPplPopUrl, "");

						}else{
							//pc
							popUrl = controller.nvl(prodPplList[i].pplPopUrl, "");

						}

						if(popUrl != ""){
							divCharge.append('<a role="button" href="'+popUrl+'" class="go-charge" title="새창 열기" target="_blank">자세히 보기</a>');
						}
						$planBox.append(divCharge);

						//안내버튼
						/*if(prodPplList[i].chageNote != ""){
							var aGuide = $("<a href='"+prodPplList[i].chageNote+"' role='button' class='info aPplGuide'>유의사항</a>");
							aGuide.attr({
								"name" : "pplInfo"
							});
							$column4.append(aGuide);
						}*/

						//가입버튼
						//if("555" == pplGroupDivCd) {
							var aSelect = $('<a href="javascript:void(0);" class="go aPplOk">요금제 선택</a>');
						//}else{
						//	var aSelect = $('<button type="button" name="button" class="btn fill ui-popup-call aPplOk" data-target="#select-period">가입</button>');
						//}
						aSelect.attr({
							//"href" : "javascript:void(0);",
							"soc"   : prodPplList[i].socCode,
							"pplGroupDivCd" : prodPplList[i].pplGroupDivCd,
							"pplId" : prodPplList[i].pplId,
							"pplNm" : prodPplList[i].pplNm,
							"data"  : prodPplList[i].dataBasic,
							"tlk"	: prodPplList[i].tlkBasic,
							"char"	: prodPplList[i].charBasic,
							"chgUseYn" : prodPplList[i].chgUseYn,
							"tngrPplYn":prodPplList[i].tngrPplYn,
							"onlineFrmUseYn" : prodPplList[i].onlineFrmUseYn,
							"seniorYn" : prodPplList[i].seniorYn,
							"prsnlShare": prodPplList[i].prsnlShare,
							"roaming": prodPplList[i].roaming
						});
						$planBox.append(aSelect);

						var $choice5g = '';
						if(chkSeeznPpl('A', prodPplList[i].pplGroupDivCd, prodPplList[i].pplId) || chkNetflixPpl(prodPplList[i].pplId) || chkSeasonChoisePpl(prodPplList[i].pplId) ||
								chkHdPpl(prodPplList[i].pplId) || chkBodyFdPpl(prodPplList[i].pplId) || chkAirpodPpl(prodPplList[i].pplId) || chkDisneyPpl(prodPplList[i].pplId)){
								$choice5g = makeChoice5gDiv(prodPplList[i].pplGroupDivCd, prodPplList[i].pplId, 'list');
						}

						row.append($planBox);
						if($choice5g != ''){
							row.append($choice5g);
						}

						//요금할인
						if(supportType == "02"){
							discountInfo = prodPplList[i].chargeDiscountBean;
						}
						//단말할인
						else if(supportType == "01"){
							prodPplList[i].deviceDiscountBean.calMonthChageDc = prodPplList[i].chargeDiscountBean.calMonthChageDc;
							discountInfo = prodPplList[i].deviceDiscountBean;
						}
						//무약정
						else if(supportType == "03"){
							discountInfo = prodPplList[i].nothingDiscountBean;
						}

						/** @desc 단말할인 총 할인 금액 */
						if(supportType != "03"){
							discountInfo.deviceDiscountSum = prodPplList[i].deviceDiscountBean.hndsetOfwAmt - prodPplList[i].deviceDiscountBean.calOfwAmt;
						}

						var pplId = prodPplList[i].pplId;
						var pplInfo = {
							"pplId" : pplId ,
							"pplGroupDivCd" : pplGroupDivCd ,
							"pplNm"	: prodPplList[i].pplNm ,
							"data"  : prodPplList[i].dataBasic ,
							"tlk"   : prodPplList[i].tlkBasic  ,
							"char"  : prodPplList[i].charBasic ,
							"chgUseYn" : prodPplList[i].chgUseYn ,
							"tngrPplYn": prodPplList[i].tngrPplYn,
							"onlineFrmUseYn" : prodPplList[i].onlineFrmUseYn ,
							"calOfwAmt" : discountInfo.calOfwAmt ,
							"txtBnfDesc" : prodPplList[i].mTxtBnfDesc ,
							"txtBnfTltpDispYn" : prodPplList[i].txtBnfTltpDispYn ,
							"txtBnfTltpDesc" : prodPplList[i].txtBnfTltpDesc,
							"seniorYn" : prodPplList[i].seniorYn,
							"prsnlShare": prodPplList[i].prsnlShare,
							"roaming": prodPplList[i].roaming
						};

						page.pplList[pplId] = {
							discountInfo : discountInfo,
							pplInfo : pplInfo
						};

						//컬럼 : hidden
						var supportGap = 0;
						var $hidden = $("<span></span>");
						var input = $("<input type='hidden' />");
						$hidden.append(input.clone().attr("name", "calMonthCommChagePayAmt").val(discountInfo.calMonthCommChagePayAmt));//월통신요금 = (월정액요금 - 월요금할인)
						$hidden.append(input.clone().attr("name", "monthUseChage").val(discountInfo.monthUseChage));//월정액요금 (요금제 금액)
						$hidden.append(input.clone().attr("name", "beforeMonthUseChage").val(discountInfo.beforeMonthUseChage));
						$hidden.append(input.clone().attr("name", "prmtnDcAmt").val(discountInfo.prmtnDcAmt));
						$hidden.append(input.clone().attr("name", "monthInslChageDc").val(discountInfo.monthInslChageDc));//약정요금할인

						$hidden.append(input.clone().attr("name", "calMonthChageDc").val(discountInfo.calMonthChageDc));//요금할인 (지원금타입:요금할인)
						$hidden.append(input.clone().attr("name", "inslMonsTypeVal").val(discountInfo.inslMonsTypeVal));//할부개월 값
						$hidden.append(input.clone().attr("name", "calOfwAmt").val(discountInfo.calOfwAmt));//할부원금
						$hidden.append(input.clone().attr("name", "calMonthInslAmt").val(discountInfo.calMonthInslAmt));//월할부금 = (할부원금/할부개월)
						$hidden.append(input.clone().attr("name", "hndsetOfwAmt").val(discountInfo.hndsetOfwAmt));//출고가

						$hidden.append(input.clone().attr("name", "calPunoSuprtAmt").val(discountInfo.calPunoSuprtAmt));//공시지원금
						$hidden.append(input.clone().attr("name", "calStorSuprtAmt").val(discountInfo.calStorSuprtAmt));//추가지원금
						$hidden.append(input.clone().attr("name", "calMonthBasPayAmt").val(discountInfo.calMonthBasPayAmt));//월기본납부금액  = (월통신요금+월할부금)
						$hidden.append(input.clone().attr("name", "calTotalInslFee").val(discountInfo.calTotalInslFee));//할부수수료 합계
						$hidden.append(input.clone().attr("name", "supportGap").val(supportGap));

						$hidden.append(input.clone().attr("id", "alertMsg"+prodPplList[i].pplId).val(prodPplList[i].alertMsg));
						row.append($hidden);

						//요금제추가
						if(isSutiedDirect){
							$("#popupPplList").append(row);
						}else{
							if(arrPplGroupCd5g.indexOf(prodPplList[i].pplGroupDivCd)>=0 || "5G" == prodPplList[i].pplDiv) {
								$("#pplList_5g").append(row);
							}else{
								$("#pplList_lte").append(row);
							}
						}

					}//end for

					/*if($("#pplList_5g").html().length <= 0) {
						$("#pplList_5g").append('<div class="item">가입 가능한 요금제가 없습니다.</div>');
					}*/

					//객체생성
					controller.discountBean = discountInfo;

					//상세혜택
					/*if(prodPplList[0].prmBnMImgName!=undefined && prodPplList[0].prmBnMImgName!=null && prodPplList[0].prmBnMImgName!=""){
						$("#txtPrmBnDesc").attr("src", shopImgUrl+prodPplList[0].prmBnMImgPath+prodPplList[0].prmBnMImgName).show();
					}else{
						$("#txtPrmBnDesc").attr("src", "").hide();
					}*/

					// 렌탈 판매정책아이디
					$("#salePlcyId").val(discountInfo.salePlcyId);
				}//end if

	       },
	       errorCall:function(jsonObj) {
	    	   // 렌탈전용 상품이 아닐 경우
	    	   if (jsonObj.responseCode == "W0069") {
					// 단말분할상환 24개월 클릭
					$("button[setNm='inslMonsTypeCd'][setCd='05']").trigger("click");
	    	   }
	       }
	   	});
	},

	/** @desc 요금제 팝업체크 하고 주문하기 */
	goOrder : function(){

//	    var sslDomain = $("#MSHOP_DOMAIN_HTTPS").val();
//	    var herfUrl = sslDomain + "/direct/DirectUsimOrderForm.do";

		 var herfUrl = "/direct/DirectUsimOrderForm.do";

	    $("#prodViewForm").attr("target", "_self");
	    $("#prodViewForm").attr("action", herfUrl);
	    $("#prodViewForm").attr("method", "post");

	    //주문페이지 이동
	    $("#prodViewForm").submit();
	},

	/** @desc Key값 생성 또는 주문데이터 저장 실패시 기존 프로세스 로직 그대로 진행 */
	prodViewLoginPop : function(isOrder) {
		if("true" == isApp) {
			appLoginSend("prodViewAppRtn", "1");
		} else {
			$("a[href=#normal_login]").trigger("click");

		}
	},

	/** @desc URL 재조합하여 반환 */
	getRtnUrl : function() {
		var rtnUrl = $(location).attr("protocol") + "//" + $(location).attr("host") + $(location).attr("pathname") + "?prodNo=" + $("#prodNo").val();
		if ($("#channel").val()) {
			rtnUrl += "&channel=" + $("#channel").val();
		}
	    return rtnUrl;
	},

	/** @desc 추천요금제 목록 가져오기 */
	listRecommPpl : function(){
		var vndrProdNo = "";							//대리점 상품 코드
		//대리점 선택 상품여부 Y || 직영단독 여부 Y
		if($("#vndrProdYn").val()=="Y" || $("#drctpSaleYn").val()=="Y"){
			vndrProdNo = $("#vndrProdNo").val();
		}

		//무약정 요금제그룹이면 supportType을 03으로 변경후 조회
		var supportType = $("#supportType").val();
		var svcEngtMonsTypeCd = $("#svcEngtMonsTypeCd").val();
		var buyTypeCd = $("#buyTypeCd").val();

		//무약정 요금제그룹이 아닌데 지원금 유형이 무약정이면 기본값으로 세팅
		if(supportType=="03"){
			supportType = page.supportTypeCd;
			svcEngtMonsTypeCd = page.periodCd;
			buyTypeCd = page.buyTypeCd;
		}
		var sntyNo = $("#sntyNo").val();
		// 단품번호 없으면 상품번호+0001 붙임.
		if( sntyNo == ""){
			sntyNo = $("#prodNo").val() +"0001";
			$("#sntyNo").val( sntyNo);
		}

		var varData = {
			callType : "RECOMPPL",				//호출 구분
			userSelPplId : $("#pplId").val(),
			prodNo			  : $("#prodNo").val(),
			sntyNo			  : $("#sntyNo").val(),
			vndrSntyNo		  : $("#vndrSntyNo").val(),
			supportType		  : supportType,
			buyTypeCd		  : buyTypeCd,
			sbscTypeCd		  : $("#sbscTypeCd").val(),
			inslMonsTypeCd	  : $("#inslMonsTypeCd").val(),
			svcEngtMonsTypeCd : svcEngtMonsTypeCd,
			vndrProdNo		  : vndrProdNo,
			rentalTypeCd	  : controller.nvl($("#rentalTypeCd").val(),""),
			vndrNo			  : controller.nvl($("#vndrNo").val(),""),
			prodCtgCd		  : $("#prodCtgCd").val(),
			pplType			  : $("#pplType").val()
		};

       	controller.ajaxSend({
			cache	: false,
			url 	: "/smart/listRecommDirectPpl.json",
			data	: varData,
			dataType: "json" ,
			type 	: "post",
			async	: false,
			isBlock	: false,
			successCall : function(jsonObj){
				page.pplRcmdList = [];
				if(jsonObj.listRecommPpl!=undefined && jsonObj.listRecommPpl){
					page.pplRcmdList = jsonObj.listRecommPpl;
				}
			},
			errorCall : function(jsonObj) {
			}
       	});
	},

	/** @desc 추천요금제 목록 만들기 */
	renderRcmdPplList : function(){
		$("#boxRecommPpl").empty();
		$.each(page.pplRcmdList, function(index, item){
			if(item.dfltYn=="Y"){
				defaultPpl = item.rcmdPplCharge;
			}
		});

		//추천요금제 목록 데이터 만들기
		var arrRecommPpl = [];
		page.pplList = [];

		arrRecommPpl = page.pplRcmdList;
		//추천요금제 정렬 (금액순)
//		arrRecommPpl.sort(function(a, b){
//			return a.rcmdPplCharge > b.rcmdPplCharge ? -1 : a.rcmdPplCharge < b.rcmdPplCharge ? 1 : 0;
//		});

		var chargeCd = controller.nvl($("#chargeCd").val(),"");
		var chargeNm = controller.nvl($("#chargeNm").val(),"");
		var noPplIdMonthUseChage = controller.nvl($("#noPplIdMonthUseChage").val(),"0");

		var recommGenParam = $("#recommGenParam").val();

		var recommDiv = $("#recommDiv").val();
		var arrPplGroupCd5g = $("#pplGroupCd5g").val().split(",");
		var supportType = $("#supportType").val();

		var procType = $("#procType").val();

		//추천요금제 목록 만들기
		$.each(arrRecommPpl, function(index, item){
			var isExist = false;
			//존재하는 요금제인지 체크
			$("#other-plan .select-charge li a[role='button']").each(function(subindex, subitem){
				if($(subitem).data("group-cd")==item.rcmdPplGroupDivCd){
					isExist = true;
					return false;
				}
			});

			// 사용중인 요금제와 같은 요금제가 존재하면 표시 안함
			if(chargeCd == item.onfrmCd) {
				return true;
			}

			var is5gPpl = arrPplGroupCd5g.indexOf(item.rcmdPplGroupDivCd)>=0;
			if("5G" == item.pplDiv) {
				is5gPpl = true;
			}

			if( recommGenParam == 'ALL'){
				// ALL 이면 5g, lte 모두
			}else{
				if( recommGenParam == '5G' && !is5gPpl){
					return true;
				}
				if( recommGenParam == 'LTE' && is5gPpl){
					return true;
				}

			}

			if(isExist){
				var button = $('<dt tabindex="0" role="button" pplId="'+item.rcmdPplId+'" pplGroupDivCd="'+item.rcmdPplGroupDivCd+'"></dt>');
				button.append(item.rcmdPplNm);

				var $area = $('<dd class="area"></dd>');
				var $box = $('<div class="box"></div>');

				var $lineData = $('<div class="line"></div>');
				var $spanDataA = $('<span class="a"></span>');
				var $spanDataB = $('<span class="b"></span>');
				$spanDataA.html('데이터');
				$spanDataB.html(item.dataBasic);
				$lineData.empty().append($spanDataA).append($spanDataB);
				$box.append($lineData);

				if(controller.nvl(item.dataBenefit, "") != ""){
					var $opt = $('<div class="opt"></div>');
					$opt.append($('<span></span>').html(item.dataBenefit));
					$box.append($opt);
				}

				if(is5gPpl){

					var $linePrsnlShare = $('<div class="line"></div>');
					var $spanPrsnlShareA = $('<span class="a"></span>');
					var $spanPrsnlShareB = $('<span class="b"></span>');
					$spanPrsnlShareA.html('테더링');
					$spanPrsnlShareB.html(item.prsnlShare);
					$linePrsnlShare.empty().append($spanPrsnlShareA).append($spanPrsnlShareB);
					$box.append($linePrsnlShare);

					var $lineRoaming = $('<div class="line"></div>');
					var $spanRoamingA = $('<span class="a"></span>');
					var $spanRoamingB = $('<span class="b"></span>');
					$spanRoamingA.html('로밍');
					$spanRoamingB.html(item.roaming);
					$lineRoaming.empty().append($spanRoamingA).append($spanRoamingB);
					$box.append($lineRoaming);

					var $lineTlkChar= $('<div class="line"></div>');
					var $spanTlkCharA = $('<span class="a"></span>');
					var $spanTlkCharB = $('<span class="b"></span>');
					$spanTlkCharA.html('음성/문자');
					//5G Y무약정플랜 안내문구 추가
					if(item.rcmdPplId == '0817') {
						$spanTlkCharB.html(item.tlkBasic + " / " + item.charBasic + "<br> Y고객 5,500 추가 할인");
					} else {
						$spanTlkCharB.html(item.tlkBasic + " / " + item.charBasic);
					}
					$lineTlkChar.empty().append($spanTlkCharA).append($spanTlkCharB);
					$box.append($lineTlkChar);

				}else{
					var $lineTlk= $('<div class="line"></div>');
					var $spanTlkA = $('<span class="a"></span>');
					var $spanTlkB = $('<span class="b"></span>');
					$spanTlkA.html('음성');
					$spanTlkB.html(item.tlkBasic);
					$lineTlk.empty().append($spanTlkA).append($spanTlkB);
					$box.append($lineTlk);

					if(controller.nvl(item.dataBenefit, "") != ""){
						var $opt2 = $('<div class="opt"></div>');
						$opt2.append($('<span></span>').html(item.tlkBenefit));
						$box.append($opt2);
					}

					var $lineChar= $('<div class="line"></div>');
					var $spanCharA = $('<span class="a"></span>');
					var $spanCharB = $('<span class="b"></span>');
					$spanCharA.html('문자');
					//LTE Y무약정플랜 안내문구 추가
					if(item.rcmdPplId == '0818') {
						$spanCharB.html(item.charBasic + "<br> Y고객 5,500 추가 할인");
					} else {
						$spanCharB.html(item.charBasic);
					}
					$lineChar.empty().append($spanCharA).append($spanCharB);
					$box.append($lineChar);
				}

				//월납부금액
				var divCharge = $("<div class='price'></div>");
				//가격노출여부 Y
				if($("#pricShowYn").val() == 'Y'){
					//단말할인
					if(supportType=="01"){
						//공시금액노출여부 Y
						if($("#punoShowYn").val() == 'Y'){
							var calMonthCommChagePayAmt = item.deviceDiscountBean.calMonthCommChagePayAmt;
							var prmtnDcAmt = item.deviceDiscountBean.prmtnDcAmt;

							var calMonthBasPayAmt = item.deviceDiscountBean.calMonthBasPayAmt;
							if(parseInt(prmtnDcAmt) > 0) {
								calMonthBasPayAmt = calMonthCommChagePayAmt + parseInt(item.deviceDiscountBean.calMonthInslAmt);
							}
							divCharge.html("월 "+controller.addCom(calMonthBasPayAmt)+"원<!--(부가세 포함)-->");
						}else{
							divCharge.html("가격미정");
						}
					}
					//요금할인
					else if(supportType=="02"){
						var calMonthCommChagePayAmt = item.chargeDiscountBean.calMonthCommChagePayAmt;
						var prmtnDcAmt = item.chargeDiscountBean.prmtnDcAmt;

						if(parseInt(prmtnDcAmt) > 0) {
							calMonthCommChagePayAmt = parseInt(calMonthCommChagePayAmt) + parseInt(prmtnDcAmt);
						}

						var calMonthBasPayAmt = item.chargeDiscountBean.calMonthBasPayAmt;
						if(parseInt(prmtnDcAmt) > 0) {
							calMonthBasPayAmt = calMonthCommChagePayAmt + parseInt(item.chargeDiscountBean.calMonthInslAmt);
						}
						divCharge.html("월 "+controller.addCom(calMonthBasPayAmt)+"원<!--(부가세 포함)-->");
					}
					//무약정
					else if(supportType=="03"){
						var calMonthCommChagePayAmt = item.nothingDiscountBean.calMonthCommChagePayAmt;
						var prmtnDcAmt = item.nothingDiscountBean.prmtnDcAmt;

						if(parseInt(prmtnDcAmt) > 0) {
							calMonthCommChagePayAmt = parseInt(calMonthCommChagePayAmt) + parseInt(prmtnDcAmt);
						}

						var calMonthBasPayAmt = item.nothingDiscountBean.calMonthBasPayAmt;
						if(parseInt(prmtnDcAmt) > 0) {
							calMonthBasPayAmt = calMonthCommChagePayAmt + parseInt(item.nothingDiscountBean.calMonthInslAmt);
						}
						divCharge.html("월 "+controller.addCom(calMonthBasPayAmt)+"원<!--(부가세 포함)-->");
					}
				}else{
					divCharge.html("가격미정");
				}

				var popUrl = null;
				if(getShowChDivCd() == "02"){
					popUrl = controller.nvl(item.mPplPopUrl, "");
				}else{
					popUrl = controller.nvl(item.pplPopUrl, "");
				}

				if(popUrl != ""){
					divCharge.append('<a role="button" href="'+popUrl+'" class="go-charge" title="새창 열기" target="_blank">자세히 보기</a>');
				}

				$box.append(divCharge);

				var $choice5g = '';
				if(chkSeeznPpl('A', item.rcmdPplGroupDivCd, item.rcmdPplId) || chkNetflixPpl(item.rcmdPplId) || chkSeasonChoisePpl(item.rcmdPplId)
						|| chkHdPpl(item.rcmdPplId) || chkBodyFdPpl(item.rcmdPplId) || chkAirpodPpl(item.rcmdPplId) || chkDisneyPpl(item.rcmdPplId) ){
					$choice5g = makeChoice5gDiv(item.rcmdPplGroupDivCd, item.rcmdPplId, 'recomm');
				}

				$area.append($box);
				if($choice5g != ''){
					$area.append($choice5g);
				}

				var $btnArea = $('<div class="btn-area"></div>');
				// procType가 pplChg일 경우 요금제 변경
				if("pplChg" == procType) {
					var diyPplYn = "Y" == item.diyPplYn ? "Y" : "N";
					var $btnSignup = $('<button type="button" class="btn fill" diyPplYn="'+diyPplYn+'">가입하기</button>');
				} else {
					// DIY 요금제는 시즌초이스, 넷플릭스 선택 단계가 따로 있음
					if("Y" == item.diyPplYn) {
						var $btnSignup = $('<button type="button" class="btn fill" data-target="#Ys-plan">가입하기</button>');
					} else {
						var $btnSignup = $('<button type="button" class="btn fill">가입하기</button>');
					}
				}

				var discountInfo = undefined;
				//요금할인
				if(supportType == "02"){
					discountInfo = item.chargeDiscountBean;
				}
				//단말할인
				else if(supportType == "01"){
					item.deviceDiscountBean.calMonthChageDc = item.chargeDiscountBean.calMonthChageDc;
					discountInfo = item.deviceDiscountBean;
				}
				//무약정
				else if(supportType == "03"){
					discountInfo = item.nothingDiscountBean;
				}

				/** @desc 단말할인 총 할인 금액 */
				if(supportType != "03"){
					discountInfo.deviceDiscountSum = item.deviceDiscountBean.hndsetOfwAmt - item.deviceDiscountBean.calOfwAmt;
				}

				var pplId = item.rcmdPplId;
				var pplInfo = {
					"pplId" : item.rcmdPplId ,
					"pplGroupDivCd" : item.rcmdPplGroupDivCd ,
					"pplNm"	: item.rcmdPplNm ,
					"data"  : item.dataBasic ,
					"tlk"   : item.tlkBasic  ,
					"char"  : item.charBasic ,
					"calOfwAmt" : discountInfo.calOfwAmt ,
					"seniorYn" : item.seniorYn,
					"prsnlShare": item.prsnlShare,
					"roaming": item.roaming
				};

				page.pplList[pplId] = {
					discountInfo : discountInfo,
					pplInfo : pplInfo
				};

				/** @desc 추천요금제 목록 클릭시 선택한 요금제 아이디의 요금제 정보를 가져와서 세팅한다 */
				$btnSignup.click(function(e){
					if($(this).parent().siblings(".choice-area").length > 0 && !validSeeznBoxItem(button)){
						return;
					}

					setPpl(page.pplList[pplId]);
					// procType가 pplChg일 경우 요금제 변경
					if("pplChg" == procType) {
						goPplChgProcCheck($("dl#boxRecommPpl > dt[aria-selected='true']").attr("pplid"), $(this).attr("diyPplYn"));
					} else {
						page.listCouponByPpl(pplId);
						page.renderCouponList();
						if("Y" == item.diyPplYn) {
							var pplGroupDivCd = $("dl#boxRecommPpl > dt[aria-selected='true']").attr("pplGroupDivCd");

							$(":checkbox[name='seeznAddItem']").each(function() {
								$(this).attr("pplGroupDivCd", pplGroupDivCd);
								$(this).attr("pplId", pplId);
							})
							showWrapStep($(this).data('target'), this);
						} else {
							if(page.affiliateYn == "Y") {
								goNextStep("#stepCoupon", this);
							}else{
								goNextStep();
							}
						}
					}
				});

				$btnArea.html($btnSignup);
				$area.append($btnArea);

				$("#boxRecommPpl").append(button).append($area);

			}
		});
	},

	initCouponData : function() {
		page.affiliateYn = "";
		page.dcPrice = 0;
		page.couponList = [];
		$("#affiliateCorpCd").val("");
		$("#affiliatePackAmt").val("0");
		$("#stepCoupon").empty();

	},

	setCouponData : function() {
		// 제휴팩 추가
		if($("input:radio[name='affiliate_rd']").length > 0){
			var affiliateCorpCd	= $("input:radio[name='affiliate_rd']:checked").attr("affiliateCd");
			var affiliatePackAmt = $("input:radio[name='affiliate_rd']:checked").attr("affiliateAmt");

			$("#affiliateCorpCd").val(affiliateCorpCd);
			$("#affiliatePackAmt").val(affiliatePackAmt);
		}
	},

	/** @desc 쿠폰팩 목록 가져오기 */
	listCouponByPpl : function(pplId){
		var varData = {
			pplId : pplId
		};

       	controller.ajaxSend({
			cache	: false,
			url 	: "/smart/listCouponByPpl.json",
			data	: varData,
			dataType: "json" ,
			type 	: "post",
			async	: false,
			isBlock	: false,
			successCall : function(jsonObj){
				page.couponList = [];
				page.affiliateYn = jsonObj.affiliateYn;
				page.dcPrice = jsonObj.dcPrice;
				if(jsonObj.couponList!=undefined && jsonObj.couponList){
					page.couponList = jsonObj.couponList;
				}
			},
			errorCall : function(jsonObj) {
			}
       	});
	},

	/** @desc 쿠폰팩 목록 만들기 */
	renderCouponList : function(){
		$("#stepCoupon").empty();
		if(page.affiliateYn != "Y") {
			return;
		}

		//쿠폰팩 목록 데이터 만들기
		var arrCouponList = [];
		arrCouponList = page.couponList;

		//쿠폰팩 목록 만들기
		if(arrCouponList.length > 0) {
			var p = $('<p class="step-top-msg">이용하실 <br>KT 다이렉트 쿠폰을 선택하세요</p>');
			var divCouponpack = $('<div class="couponpack">');
			var divCouponSelect = $('<div class="coupon-select">');
			var divCheckbox = $('<div class="checkbox">');
			var divBtnBottom = $('<div class="btn-bottom">');
			var ul = $('<ul>');

			$.each(arrCouponList, function(index, cdBean){
				var li = $('<li>');

				var radio = $('<input type="radio" name="affiliate_rd" id="affiliate_rd'+cdBean.cd+'" title="선택됨" affiliateCd="'+cdBean.cd+'" affiliateNm="'+cdBean.cdNm+'" affiliateAmt="'+page.dcPrice+'">');
				li.append(radio);

				var label = $('<label for="affiliate_rd'+cdBean.cd+'">');
				label.append('<img src="'+cdBean.rfrn3ChrVal+'" alt="'+cdBean.cdNm+'" />');
				label.append('<strong>'+cdBean.cdNm+'</strong>');
				if(controller.nvl(cdBean.rfrn2ChrVal, "") == "") {
					label.append('<span class="color-gray">월 '+controller.addCom(page.dcPrice)+' 원</span>');
				} else {
					label.append('<span class="color-gray">월 '+controller.addCom(page.dcPrice)+' 원 '+cdBean.rfrn2ChrVal+'</span>');
				}
				li.append(label);
				ul.append(li);


			});
			divCouponSelect.append(ul);
			divCouponpack.append(divCouponSelect);

			divCheckbox.append('<input type="checkbox" name="couponAgree" id="couponAgree">');
			divCheckbox.append('<label for="feeCardAgree">(필수) 서비스 가입 안내사항 확인/동의</label>');
			divCheckbox.append('<button type="button" name="button" class="ui-popup-call" data-target="#coupon-useguide" id=""><em class="hidden">내용보기</em></button>');
			divCouponpack.append(divCheckbox);

			var btnChoice = $('<button type="button" class="btn fill">선택완료</button>');
			btnChoice.click(function(e){
				if($("input:radio[name='affiliate_rd']").length > 0){

					if($("input:radio[name='affiliate_rd']:checked").length == 0){
						alert("제휴사 혜택을 선택해 주시기 바랍니다.");
						return;
					}

					if (!$('#couponAgree').is(':checked')) {
						alert("제휴 쿠폰 이용방법 안내사항 확인/동의에 동의하여 주시기 바랍니다.");
						$("#couponAgree").focus();
						return;
					}
					page.setCouponData(); // 선택한 쿠폰정보 설정
					goNextStep();
				}
			});
			divBtnBottom.append(btnChoice);

			$("#stepCoupon").append(p).append(divCouponpack).append(divBtnBottom);
		}
	}
};

/** @desc 로그인 팝업 > 비회원 */
function nonMembers() {
	popupClose('#login'); //$("#login").removeClass("active");
	$("div#wrapStep1").hide();
	$("div#wrapStep2").show();
	$("#titleNm").text("가입유형 선택");
	page.nStep++;
}

/** @desc 요금제표의 선택버튼 클릭시 데이터, 화면 설정 */
var setPpl = function(pplData){
	var pplInfo = pplData.pplInfo;
	var userType = $("input[name='orgUserType']").val();	//고객유형

	//값설정
	$("#pplId").val(pplInfo.pplId);
	$("#pplGroupDivCd").val(pplInfo.pplGroupDivCd);
	$("#inslThecpt").val(pplInfo.calOfwAmt);	//할부원금
	$("#onlineFrmUseYn").val(pplInfo.onlineFrmUseYn);//온라인서식지 작성 요금제 여부

};

var prodLogin = function() {
	var rtnUrl = page.getRtnUrl();
	loginGoCheck(rtnUrl);
};


/***************************************************
 * @desc APP에서 리턴 받은 스크립트
 */
var prodViewAppRtn = function(jsonObj,turn) {
//	// obj가 공백이면 APP도 비로그인 상태
//	if("" == jsonObj) {
//		if("1" == turn) {
//			$("a[href=#normal_login]").trigger("click");
//		} else if("2" == turn) {
//    		$("a[href=#normal_login_save]").trigger("click");
//            return false;
//		}
//	} else {
//		alert("재 로그인 합니다.");
//		apploginprocess(jsonObj, page.getRtnUrl(false));
//	}
};
/***************************************************
 * @desc APP에서 리턴 받은 스크립트
 */



/**
 * @desc 공통
 */
var controller = $.extend(new $.CommonObj(),{
	discountBean : null ,
	vndrSortProd: null, // 대리점 선택후 정렬 값 셋팅

	onCreate : function(){

		// 슬라이더바 호출
		sliderStart();

		var hasLogin = $("#hasLogin").val();

		$(document).on("click","h1 button",function(e){
			e.preventDefault();

			// Y's 토핑요금제 선택
			if("콘텐츠 골라보기" == $(this).text()) {
				fnToppingReset();
				goPreStep();
			} else {
				goPreStep();
			}

			//접근성
			$('.focusIs').focus().removeClass('focusIs');
		});

		$(document).on("click", ".list-charge .aPplOk", function(){
			$("input[name='seeznAddItem']").each(function(){
	        	$(this).prop("checked", "");
	    	});

			$("input[name='netflixAddItem']").each(function(){
	        	$(this).prop("checked", "");
	    	});

	        if(chkSeeznPpl("2", $(this).attr("pplgroupDivCd"), $(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='seeznAddItem']").eq(0).prop("checked", "checked");
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='seeznAddItem']").eq(1).prop("checked", "checked");
	        }else if(chkSeeznPpl("1", $(this).attr("pplgroupDivCd"), $(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='seeznAddItem']").eq(0).prop("checked", "checked");
	        }

	        if(chkNetflixPpl($(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='netflixAddItem']").eq(0).prop("checked", "checked");
	        }

	        if(chkSeasonChoisePpl($(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='list-superPlan2']").eq(0).prop("checked", "checked");
	        }

	        if(chkBodyFdPpl($(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='list-bodyFdPlan']").eq(0).prop("checked", "checked");
	        }

	        if(chkAirpodPpl($(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='list-airpodPlan']").eq(0).prop("checked", "checked");
	        }

	        if(chkDisneyPpl($(this).attr("pplId"))){
	        	$(this).parents(".box").siblings(".choice-area").find("input[name='list-disneyPlan']").eq(0).prop("checked", "checked");
	        }

		});

		/** @desc 요금제 > 요금제 변경 클릭 */
		$(document).on("click", "button.popupSelPpl", function(e){
			e.preventDefault();
			var selPpl = $(".list-charge .area.selected");
			var pplId = selPpl.find(".aPplOk").attr('pplid');
			var ppl = page.pplList[pplId];
			var devStr = $("#SERVER_NAME").val();

			if(selPpl.find(".choice-area").length > 0 && !validSeeznBoxItem(selPpl.find(".aPplOk"))){
				return;
			}

			//현재 선택한 요금제 가입안내사항 확인/동의 가 있으면 무조건 체크
			var $agreeEl = $('.list-charge').find('[id^="planAgree-' + pplId + '"]');
			var isAgreeChecked = $agreeEl.is(':checked');
			//현재 선택한 요금제 가입안내사항 확인/동의 가 있으면 && 체크 안했으면
			if($agreeEl.length > 0 && ! isAgreeChecked) {
				alert("요금제 가입 안내사항 확인/동의에 동의하여 주시기 바랍니다.");
				return false;
			}

			if(page.nStep > 0) {
				//Y24ON 수능 요금제 가입 요금제 변경 시 alert 노출
				if(pplId == '0762' || pplId == '0763' || pplId == '0764'){
					/*
						if($("#hasLogin").val() == 'false'){  //비로그인
							if(confirm("99~01년생에 한해 가입 가능하며, 가입 후 6개월간 추가 할인 및 데이터 완전 무제한 이용 가능합니다. 로그인하시겠습니까?")){
								loginGoCheck();
							}
						}else{ //로그인
							alert("99~01년생에 한해 가입 가능하며, 가입 후 6개월간 추가 할인 및 데이터 완전 무제한 이용 가능합니다. 자세한 내용은 유의사항을 확인해 주세요.");
						}
					 */
					alert("99~01년생에 한해 가입 가능하며, 가입 후 6개월간 추가 할인 및 데이터 완전 무제한 이용 가능합니다. 자세한 내용은 유의사항을 확인해 주세요.");
				}
			}

			if(ppl!=undefined && ppl!=null){

				//시니어 요금제여부
				var pplInfo = ppl.pplInfo;
				if(page.nStep > 0) {
					if(pplInfo.seniorYn == 'Y'){
						if($("#hasLogin").val() == 'true'){
							var errCd = checkAge(65,'lt');

				      		if(errCd=="T"){
				      			alert("LTE시니어 요금제는 만65세이상인 경우에만 선택할 수 있습니다");
				  				return;
				      		}
						}
					}
				}

				$("#chargeCd").val("");
	    		$("#chargeNm").val("");
				$("#usePriceFlag").val("");
	    		$("#subscriptionId").val("");
				$("#noPplYn").val("");
				$("#noPplMsgSbst").val("");
				$("#noPplIdMonthUseChage").val("");

				//무약정요금제인 경우
				if($(".tab-content .btn-group button.active").val()=="132"){
					//무약정x -> 무약정o
					if(!page.isMuyakjeong){
						page.isMuyakjeong = true;
						$("#boxSupportType button[setCd!='03']").removeClass("active").hide();
						$("#boxSupportType button[setCd='03']").addClass("active").show();
						$("#txtSupportDiscount").html("데이터<br/>최대 3.3배");

//						page.settingSupportType();
					}
					alert("\"LTE 데이터 선택(무약정)\" 요금제 선택 시 단말할인이나 요금할인이 적용되지 않습니다.");
				}else{
					//무약정o -> 무약정x
					if(page.isMuyakjeong){
						page.isMuyakjeong = false;
						$("#boxSupportType button[setCd='03']").removeClass("active").hide();
						$("#boxSupportType button[setCd='"+page.supportTypeCd+"'][setPeriodCd='"+page.periodCd+"']").addClass("active");
						$("#boxSupportType button[setCd!='03']").show();
						$("#txtSupportDiscount").html("");

//						page.settingSupportType();
					}
				}

				setPpl(ppl);

				// 쿠폰팩 목록 조회
				page.listCouponByPpl(pplId);
				page.renderCouponList();

				// 무약정플랜 요금제는 시즌초이스, 넷플릭스 선택 단계가 따로 있음
				if(("DEV" == devStr ? "0813" : "0817" == pplId) || ("DEV" == devStr ? "0814" : "0818" == pplId) || ("DEV" == devStr ? "0815" : "0819" == pplId)) { // Y's 무약정요금제
					showWrapStep("#Ys-plan",this);
				}else if(page.affiliateYn == "Y") {
					goNextStep("#stepCoupon", this);
				}else{
					isOnStep = true;
					goNextStep();
				}
			}else{
				alert("요금제를 선택해주세요.");
				return;
			}

			var usePricePplId = $("#usePricePplId").val();
			if (usePricePplId != "" && pplId == usePricePplId) {
				$("#usePriceFlag").val("Y");
			} else {
				$("#usePriceFlag").val("N");
			}

			if($("#other-plan").hasClass("active")) {
//				if($("#select-period .select-period-list li").length > 1) {
//					$("#select-period").addClass("active");
//				}else{
//					if($("#select-period .select-period-list li").length == 1) {
//						$("#svcEngtMonsTypeCd").val($("#select-period .select-period-list li").eq(0).find("input[name='select-period']").val());
//					}else{
//						$("#svcEngtMonsTypeCd").val("01");
//					}
					//page.goOrder();		// 약정기간이 1개면 주문으로 이동
					$("#other-plan").removeClass("active");
//				}
			}

		});


		/** @desc 추천요금제 */
		$(document).on("click", "div#chooseGenerationDiv div#boxPplDiv button", function(){
			$("#recommDiv").val($(this).text());
			//상품카테고리에 맞는 추천요금제 가져오기
			//goNextStep();
			fnRecommendDiv();
		});

		/** @desc 유심보유여부 선택 */
		$(document).on("click", "div#wrapStep2 .btn-wrap button", function(){
			$("#befIntmUsimUseYn").val($(this).data("yn"));

			goNextStep();
		});

		/** @desc 약정기간 선택 */
		$(document).on("click", "div#wrapStep3 .btn-bottom button", function(){
			goNextStep();
		});

	}//end onCreate

});

var isNextStep = true;
var goNextStep = function(wrapId, thisE) {
	isNextStep = true;
	if(wrapId == "#stepCoupon" && page.affiliateYn == "Y") {
		showWrapStep(wrapId, thisE);
	} else {
		showWrapStep();
	}

    //로그인 N
    if($("#hasLogin").val() == "false" && false) {
    	popupOpen('#login'); //$("#login").addClass("active");
        return false;
    }

    // Y's요금제 콘텐츠 영역 재정리
	$("div#setp-1").show();
	$("div#setp-2").hide();
}

var goPreStep = function(){
	isNextStep = false;
	var recommGenParam = $("#recommGenParam").val();

	if($("#recomm-plan").is(":visible")){
		//조건 선택하고 요금제 추천받기 뒤로가기
		var recommDiv = $("#recommDiv").val();
		var temp = 0;
		$("#recomm-plan ."+recommDiv+"-area").each(function(idx){
			if($(this).attr('id') == $("#recomm-plan ."+recommDiv+"-area").has(":visible").attr('id')){
				temp = idx-1;
				return;
			}
		});

	    $('#recomm-plan .setp-area').hide();
	    $('.page-num span').eq(temp).addClass('current').siblings('span').removeClass('current');
	    $("#recomm-plan ."+recommDiv+"-area").eq(temp).fadeIn(300);

	    $("#recomm-plan ."+recommDiv+"-area").has(':visible').find("."+recommDiv+"-values input[type=radio]").eq(0).trigger("mousedown");

	    if($('#recomm-plan #setp-4').is(':visible')){
	    	page.getSutiedDirectBenefits();
	    }

	    if(temp > -1){
	    	return;
	    }else if(temp == -1 && recommGenParam == "ALL"){
	    	// 1번페이지에서 뒤로가기일 때, recommGenParam =ALL
	    	showWrapStep("#chooseGenerationDiv", $("[name=recomm-plan_system]"));
//			$("#chooseGenerationDiv").show();
//			$("#titleNm").text("서비스 선택");
			fnShowChooseGen();
	    	return;
	    }
	}


	showWrapStep();
}

//ex) 단게별 이동 테스트용 함수
function nextSetp(stepLevel){
    //var temp = obj.replace(/[^0-9]/g,'');
	var recommDiv = $("#recommDiv").val();
	var temp = 0;

	if(stepLevel == 'search'){
		temp = $("#recomm-plan .page-num span").length - 1;
		page.changeChargeGroup();
	}else if(stepLevel == 'next'){
		$("#recomm-plan ."+recommDiv+"-area").each(function(idx){
			if($(this).attr('id') == $("#recomm-plan ."+recommDiv+"-area").has(":visible").attr('id')){
				temp = idx+1;
				return;
			}
		});
	}else if(stepLevel == 'skip'){
		$('.benefit-check-list input[type=checkbox]').prop('checked', '');
		temp = $("#recomm-plan .page-num span").length - 1;
		page.changeChargeGroup();
	}

    $('#recomm-plan .setp-area').hide();
    $('.page-num span').eq(temp).addClass('current').siblings('span').removeClass('current');
    $("#recomm-plan ."+recommDiv+"-area").eq(temp).fadeIn(300);

    $("#recomm-plan ."+recommDiv+"-area").has(':visible').find("."+recommDiv+"-values input[type=radio]").eq(0).trigger("mousedown");

    if($('#recomm-plan #setp-4').is(':visible')){
    	page.getSutiedDirectBenefits();
    }
    //접근성
    $("#titleNm").focus();

}

var isOnStep = true;
var showWrapStep = function(wrapId, thisE){
	$("div.wrapStep").hide();

	if(thisE != undefined && thisE != null){
		var _this =  $(thisE);
	}

	var recommGenParam = $("#recommGenParam").val();

	var isYsPlan = false;//콘텐츠 골라보기 여부

	if($("#titleNm").text() == "콘텐츠 골라보기"){
		isYsPlan = true;
	}

	var isCouponPack = false;//쿠폰팩 선택 여부
	if($("#titleNm").text() == "KT 다이렉트 쿠폰팩 선택"){
		isCouponPack = true;
	}

	if(wrapId != undefined && wrapId != null){
		$("div"+wrapId).show();
		_this.addClass('focusIs'); //접근성
		isOnStep = false;

		if(wrapId == '#other-plan'){
			$("#titleNm").text("요금제 선택");
		}else if(wrapId == '#recomm-plan'){
			$("#titleNm").text($("#recommDiv").val() + " 요금제 추천 받기");
		}else if(wrapId == "#Ys-plan") {
			$("#titleNm").text("콘텐츠 골라보기");
			$("#Ys-plan > #setp-1").show();
			isOnStep = true;
		}else if(wrapId == '#stepCoupon'){
			$("#titleNm").text("KT 다이렉트 쿠폰팩 선택");
			isOnStep = true;
		}
		//접근성
		$("#titleNm").focus();
		titleAriaLabel();

		return;
	}

	var isDefaultPpl = JSON.parse($("#isDefaultPpl").val());
	var pplGroupDivCd = $("#pplGroupDivCd").val();
	var pplGroupLteNothingYn = $("#pplGroupLteNothingYn").val();

	var isPageOn = false;
	while(!isPageOn){
		isPageOn = true;
		if(isOnStep){
			if(isNextStep){
				page.nStep++;
			}else{
				if(isYsPlan || isCouponPack){
					//콘텐츠 골라보기 뒤로가기인 경우 스킵, 쿠폰팩 선택 뒤로가기인 경우 스킵
				}else{
					page.nStep--;
				}
			}
		}
/*
		if(page.nStep == 0){
			if(!isDefaultPpl){
				isPageOn = false;
			}else{
				$("div#wrapStep0").show();
				$("#titleNm").text("서비스 선택");
			}
		}else
	*/	if(page.nStep == 1){
			if(!isDefaultPpl){
				isPageOn = false;
			}else{
				$("#subTitleTxt").html("KT 다이렉트에서만 <br>가입이 가능한 무약정플랜");
				if("DIY" == $("#pplType").val()) {
					//$("#subTitleTxt").html("다이렉트에서만 가입이 <br>가능한 요금제 <span class='stxt'>Y무약정플랜 가입 시 만 29세 이하 Y고객은 월5,500원 추가 할인이 제공됩니다. ( 5G 무약정플랜 슬림 가입 제외)</span>");
					$(".recommTag").hide();
				} else {
					//$("#subTitleTxt").html("KT에서 잘나가는 <br>추천 요금제");
					$(".recommTag").show();
				}
				page.listRecommPpl();
				page.renderRcmdPplList();
				$("div#wrapStep1").show();
				//$("#titleNm").text($("#recommDiv").val() + " 요금제 선택");
				$("#titleNm").text("요금제 선택");
				$('dl.list-charge dt').attr({'title' : '열기', 'aria-expanded' : false});
				$('dl.list-charge dd').attr('tabindex', 0);

				// 넷플릭스 및 시즌초이스 초기화 & Y's 요금제 화면 초기화 처리
				fnToppingReset();

			}
			page.initCouponData();	// 쿠폰팩 선택 초기화
		}else if(page.nStep == 2){
			// 요금제 변경 처리
			var procType = $("#procType").val();
			if("pplChg" == procType) {
				savePplChgProc($("dl#boxRecommPpl > dt[aria-selected='true']").attr("pplid"));
				return ;
			}

			// eSim, 데이터쉐어링 USIM 보유여부 화면 스킵 추가해야함
			if($("#isFixedUsimUseYn").val() == 'Y' || $("#duSimGbnCd").val() == 'E'){
				isPageOn = false;
			}else{
				$("div#wrapStep2").show();
				$("#titleNm").text("USIM 보유 여부");
			}
		}else if(page.nStep == 3){
			if(pplGroupDivCd == '500' || $("#befIntmUsimUseYn").val() == 'Y'){
				isPageOn = false;
			}else{
				$("div#wrapStep3").show();
				$("#titleNm").text("약정기간 선택");

				$("#wrapStep3 .result-price").hide();
				$("#wrapStep3 .result-price-total").hide();
				$("#wrapStep3 .btn-bottom button").attr("disabled", "disabled");
				$("#select-period button").attr('aria-selected', false).removeClass("selected");
			}
		}else if(page.nStep == 4){
			$("div#wrapStep4").show();
			$("#titleNm").text("가입유형 선택");
		}else if(page.nStep == 5){
			// 디즈니, 넷플릭스는 미성년자 버튼 미노출
			var pplId = $("#pplId").val();
			if(chkNetflixPpl(pplId)  ||  chkDisneyPpl(pplId) ){
				$("#userTypeATag02").hide();
			}else{
				$("#userTypeATag02").show();
			}

			$("div#wrapStep5").show();
			$("#titleNm").text("고객유형 선택");
		}else{
			//history.back();
			location.href = "/directMain.do";
		}

		//접근성
		$('#contents h1 button').focus();
		titleAriaLabel();
	}

	isOnStep = true;
}

var checkAge = function(chkAge, chkGbn){
	var rtn = "";
	var varData = controller.getSerializedData({
		 chkAge			   : chkAge,
		 chkGbn			   : chkGbn
	});
	controller.ajaxSend({
	      cache:false
	      ,url:'/smart/checkAge.json'
	      ,data:varData
	      ,dataType:'json'
	      ,type : 'post'
	      ,async:false
	      ,isBlock:false
	      ,successCall:function(jsonObj){
	    	  rtn = jsonObj.errCd;
	      },errorCall:function(jsonObj) {
	    	  rtn = "err";
	      }
	});
	return rtn;
};

var makeChoice5gDiv = function(pplGroupDivCd, pplId, wrapDiv){
	var $choice5g = $('<div class="choice-area"></div>');

	var divChoiceTitle = $('<div class="title"></div>');

	// 넷플릭스
	if(chkNetflixPpl(pplId)){
		$choice5g.append(divChoiceTitle.clone().html('넷플릭스를 선택해주세요'));

		var ulNeflixList = $('<ul class="float-list" id="netflixUl"></ul>');

		var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
		var netflixExPplId = "DEV" == devStr ? "0810" : "0809";

		if(pplId!=netflixExPplId){ // netflixType : A
			var liNetflix01 = $('<li></li>');
			var labelNetflix01 = $('<label for="' + wrapDiv + '-' + pplId + '-netflixChoice01"></label>');
			labelNetflix01.append('<span class="t">베이식 기본제공</span>');

			var inputNetflix01 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-netflixChoice01" class="checkbox-1" name="netflixAddItem" value="PL208Q984" onclick="maxNetflixBoxItem(this);">');

			liNetflix01.append(labelNetflix01).append(inputNetflix01);
			ulNeflixList.append(liNetflix01);

			/**
			 *
			var liNetflix02 = $('<li></li>');
			var labelNetflix02 = $('<label for="' + wrapDiv + '-' + pplId + '-netflixChoice02"></label>');
			labelNetflix02.append('<span class="t">스탠다드 (+2,500원)</span>');

			var inputNetflix02 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-netflixChoice02" class="checkbox-1" name="netflixAddItem" value="PL208R989" onclick="maxNetflixBoxItem(this);">');

			liNetflix02.append(labelNetflix02).append(inputNetflix02);
			ulNeflixList.append(liNetflix02);


			var liNetflix03 = $('<li></li>');
			var labelNetflix03 = $('<label for="' + wrapDiv + '-' + pplId + '-netflixChoice03"></label>');
			labelNetflix03.append('<span class="t">프리미엄 (+5,000원)</span>');

			var inputNetflix03 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-netflixChoice03" class="checkbox-1" name="netflixAddItem" value="PL208R990" onclick="maxNetflixBoxItem(this);">');

			liNetflix03.append(labelNetflix03).append(inputNetflix03);
			ulNeflixList.append(liNetflix03);

			 */

		}else{ // netflixType : B
			var liNetflix04 = $('<li></li>');
			var labelNetflix04 = $('<label for="' + wrapDiv + '-' + pplId + '-netflixChoice04"></label>');
			labelNetflix04.append('<span class="t">스탠다드 기본제공</span>');

			var inputNetflix04 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-netflixChoice04" class="checkbox-1" name="netflixAddItem" value="PL208R991" onclick="maxNetflixBoxItem(this);">');

			liNetflix04.append(labelNetflix04).append(inputNetflix04);
			ulNeflixList.append(liNetflix04);

			/**
			 *
			var liNetflix05 = $('<li></li>');
			var labelNetflix05 = $('<label for="' + wrapDiv + '-' + pplId + '-netflixChoice05"></label>');
			labelNetflix05.append('<span class="t">프리미엄 (+2,500원)</span>');

			var inputNetflix05 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-netflixChoice05" class="checkbox-1" name="netflixAddItem" value="PL208R990" onclick="maxNetflixBoxItem(this);">');

			liNetflix05.append(labelNetflix05).append(inputNetflix05);
			ulNeflixList.append(liNetflix05);
			 */
		}

		$choice5g.append(ulNeflixList);
	}
	// 바디프랜드
	if(chkBodyFdPpl(pplId)){
		$choice5g.append(
			'<div class="title">기본제공</div>' +
			'<ul class="float-list">' +
				'<li>' +
					'<label for="list-bodyFdPlan'+ '-' + pplId +'">' +
						'<span class="t">바디프랜드 안마의자 월 렌탈료 할인</span>' +
					'</label>' +
					'<input type="checkbox" id="list-bodyFdPlan'+ '-' + pplId +'" class="checkbox-1" name="list-bodyFdPlan" value="" checked="checked" disabled="disabled">' +
				'</li>' +
			'</ul>'
		);
	}

	// 에어팟
	if(chkAirpodPpl(pplId)){
		$choice5g.append(
			'<div class="title">기본제공</div>' +
			'<ul class="float-list">' +
				'<li>' +
					'<label for="list-airpodPlan'+ '-' + pplId +'">' +
						'<span class="t">에어팟 프로 기본제공(12/31 까지 가입가능. 단, 에어팟 프로 물량 소진 시 조기종료 가능)</span>' +
					'</label>' +
					'<input type="checkbox" id="list-airpodPlan'+ '-' + pplId +'" class="checkbox-1" name="list-airpodPlan" value="" checked="checked" disabled="disabled">' +
				'</li>' +
			'</ul>'
		);
	}

	// 디즈니
	if(chkDisneyPpl(pplId)){
		$choice5g.append(
				'<div class="title">기본제공</div>' +
				'<ul class="float-list" id="disneyPlan">' +
					'<li>' +
						'<label for="list-plan'+ '-' + pplId +'">' +
							'<span class="t">디즈니+</span>' +
						'</label>' +
						'<input type="checkbox" id="list-plan'+ '-' + pplId +'" class="checkbox-1" name="list-disneyPlan" value="" checked="checked" disabled="disabled">' +
					'</li>' +
				'</ul>'
		);
	}

	// 시즌/지니
	if(chkSeasonChoisePpl(pplId)){
		$choice5g.append(
			'<div class="title">기본제공</div>' +
			'<ul class="float-list">' +
				'<li>' +
					'<label for="list-superPlan2">' +
						'<span class="t">시즌 플레인 + 지니 스마트 음악감상 + 블라이스 스토리</span>' +
					'</label>' +
					'<input type="checkbox" id="list-superPlan2" class="checkbox-1" name="list-superPlan2" value="" checked="checked" disabled="disabled">' +
				'</li>' +
			'</ul>'
		);

		if(chkSeeznPpl('A', pplGroupDivCd, pplId)){
			$choice5g.append(divChoiceTitle.clone().html('시즌 초이스를 선택해주세요'));

			var pChoiceInfo = $('<p></p>');
			if(chkSeeznPpl("1", pplGroupDivCd, pplId)) {
				pChoiceInfo.html('다양한 콘텐츠 중 매월 1가지 골라 즐길 수 있는 부가서비스 입니다.');
			}else{
				pChoiceInfo.html('다양한 콘텐츠 중 매월 2가지 골라 즐길 수 있는 부가서비스 입니다.');
			}
			$choice5g.append(pChoiceInfo);

			var ulChoiceList = $('<ul></ul>');

			var liChoice11 = $('<li></li>');
			var labelChoice11 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-1"></label>');
			labelChoice11.append('<span class="t">시즌믹스</span>').append('<span class="m">실시간 TV부터 최신 영화, 드라마까지 고화질로 즐기는 영상</span>');

			var inputCoice11 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-1" class="checkbox-1" name="seeznAddItem" value="PL2026804" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			liChoice11.append(labelChoice11).append(inputCoice11);
			ulChoiceList.append(liChoice11);

			var liChoice15 = $('<li></li>');
			var labelChoice15 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-5"></label>');
			labelChoice15.append('<span class="t">게임박스</span>').append('<span class="m">100개 이상의 콘솔/PC 고사양 게임을 별도 구매없이, 모바일에서 즐길 수 있는 스트리밍 게임 서비스</span>');

			var inputCoice15 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-5" class="checkbox-1" name="seeznAddItem" value="PL2024788" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			liChoice15.append(labelChoice15).append(inputCoice15);
			ulChoiceList.append(liChoice15);

			$choice5g.append(ulChoiceList);
		}
	}else{

		if(chkSeeznPpl('A', pplGroupDivCd, pplId)){
			$choice5g.append(divChoiceTitle.clone().html('시즌 초이스를 선택해주세요'));

			var pChoiceInfo = $('<p></p>');
			if(chkSeeznPpl("1", pplGroupDivCd, pplId)) {
				pChoiceInfo.html('다양한 콘텐츠 중 매월 1가지 골라 즐길 수 있는 부가서비스 입니다.');
			}else{
				pChoiceInfo.html('다양한 콘텐츠 중 매월 2가지 골라 즐길 수 있는 부가서비스 입니다.');
			}
			$choice5g.append(pChoiceInfo);

			var ulChoiceList = $('<ul></ul>');

			var liChoice11 = $('<li></li>');
			var labelChoice11 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-1"></label>');
			labelChoice11.append('<span class="t">시즌믹스</span>').append('<span class="m">실시간 TV부터 최신 영화, 드라마까지 고화질로 즐기는 영상</span>');

			var inputCoice11 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-1" class="checkbox-1" name="seeznAddItem" value="PL2026804" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			liChoice11.append(labelChoice11).append(inputCoice11);
			ulChoiceList.append(liChoice11);

			var liChoice12 = $('<li></li>');
			var labelChoice12 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-2"></label>');
			labelChoice12.append('<span class="t">지니 스마트 음악감상</span>').append('<span class="m">실시간 음악 스트리밍(모바일 전용)</span>');

			var inputCoice12 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-2" class="checkbox-1" name="seeznAddItem" value="PL2026803" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			liChoice12.append(labelChoice12).append(inputCoice12);
			ulChoiceList.append(liChoice12);

			//var liChoice13 = $('<li></li>');
			//var labelChoice13 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-3"></label>');
			//labelChoice13.append('<span class="t">Super VR Pass</span>').append('<span class="m">Super VR 기기를 통해 영화, 게임, 교육 등 실감형 VR 콘텐츠 이용</span>').append('<span class="p">※ Super VR Pass를 선택하시면 기기 20% 할인 구매 가능</span>');

			//var inputCoice13 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-3" class="checkbox-1" name="seeznAddItem" value="PL2026805" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			//liChoice13.append(labelChoice13).append(inputCoice13);
			//ulChoiceList.append(liChoice13);

			var liChoice14 = $('<li></li>');
			var labelChoice14 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-4"></label>');
			labelChoice14.append('<span class="t">블라이스 스토리</span>').append('<span class="m">인기 웹소설, 웹툰 무제한 감상, 로맨스부터 시크릿까지 장르별로 즐기는 콘텐츠</span>');

			var inputCoice14 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-4" class="checkbox-1" name="seeznAddItem" value="PL204A325" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			liChoice14.append(labelChoice14).append(inputCoice14);
			ulChoiceList.append(liChoice14);

			var liChoice15 = $('<li></li>');
			var labelChoice15 = $('<label for="' + wrapDiv + '-' + pplId + '-choice-5"></label>');
			labelChoice15.append('<span class="t">게임박스</span>').append('<span class="m">100개 이상의 콘솔/PC 고사양 게임을 별도 구매없이, 모바일에서 즐길 수 있는 스트리밍 게임 서비스</span>');

			var inputCoice15 = $('<input type="checkbox" id="' + wrapDiv + '-' + pplId + '-choice-5" class="checkbox-1" name="seeznAddItem" value="PL2024788" onclick="validSeeznBoxItem(this);" pplId="'+pplId+'" pplGroupDivCd="'+pplGroupDivCd+'">');

			liChoice15.append(labelChoice15).append(inputCoice15);
			ulChoiceList.append(liChoice15);

			$choice5g.append(ulChoiceList);
		}

		if(chkNetflixPpl(pplId)){ //넷플릭스
			$choice5g.append(
				'<div class="checkbox">' +
					'<input type="checkbox" name="" id="planAgree'+ '-' + pplId +'">' +
					'<label for="planAgree'+ '-' + pplId +'">(필수) 요금제 가입 안내사항 확인/동의</label>' +
					'<button type="button" name="button" class="ui-popup-call" data-target="#planagree-pop'+ '-' + pplId +'"><em class="hidden">내용보기</em></button>' +
				'</div>' +
				'<p style="margin:10px 0 0;">*만 19세 이상의 개인 고객만 가입 가능한 요금제입니다.</p>' +

				'<div id="planagree-pop'+ '-' + pplId +'" class="ui-popup toast-popup disney-planagree"> <!-- active 클래스 추가로 활성화 popup-type-2 -->' +
					'<div class="content">' +
						'<div class="header">요금제 가입 안내사항 확인/동의</div>' +
						'<button type="button" class="btn-close">닫기</button>' +
						'<div class="body">' +
							'<table class="pop_agree_table">' +
							    '<colgroup>' +
									'<col style="width:40%">' +
									'<col style="width:60%">' +
							    '</colgroup>' +
							    '<caption>요금제 가입 안내사항</caption>' +
							    '<tbody>' +
									'<tr>' +
									    '<th scope="row">제공받는 자</th>' +
									    '<td>넷플릭스 서비스 코리아 유한회사</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">이용 목적</th>' +
									    '<td>넷플릭스 서비스 제공, 넷플릭스 제휴 혜택 안내 등<br>※ 슈퍼플랜 초이스(넷플릭스) 요금제 가입시 필수</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">제공하는 항목</th>' +
									    '<td>이동전화번호</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">보유기간</th>' +
									    '<td>서비스 가입 기간 동안</td>' +
									'</tr>' +
							    '</tbody>' +
							'</table>' +
						'</div>' +

						'<div class="btn-bottom">' +
							'<button type="button" name="button" class="btn fill bottom btn-close">확인</button>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		}
		if(chkHdPpl(pplId)){ //현대카드
			$choice5g.append(
				'<div class="checkbox">' +
					'<input type="checkbox" name="" id="planAgree'+ '-' + pplId +'">' +
					'<label for="planAgree'+ '-' + pplId +'">(필수) 요금제 가입 안내사항 확인/동의</label>' +
					'<button type="button" name="button" class="ui-popup-call" data-target="#planagree-pop'+ '-' + pplId +'"><em class="hidden">내용보기</em></button>' +
				'</div>' +

				'<div id="planagree-pop'+ '-' + pplId +'" class="ui-popup toast-popup disney-planagree"> <!-- active 클래스 추가로 활성화 popup-type-2 -->' +
					'<div class="content">' +
						'<div class="header">요금제 가입 안내사항 확인/동의</div>' +
						'<button type="button" class="btn-close">닫기</button>' +
						'<div class="body">' +
							'<table class="pop_agree_table">' +
							    '<colgroup>' +
									'<col style="width:40%">' +
									'<col style="width:60%">' +
							    '</colgroup>' +
							    '<caption>요금제 가입 안내사항</caption>' +
							    '<tbody>' +
									'<tr>' +
									    '<th scope="row">제공받는 자</th>' +
									    '<td>현대카드 주식회사</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">이용 목적</th>' +
									    '<td>현대카드 혜택 제공, 현대카드 제휴 혜택 안내 등<br>※ 슈퍼플랜 초이스(현대카드) 요금제 이용자에 한함</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">제공하는 항목</th>' +
									    '<td>서비스계약번호<br>자동이체 등록 카드번호<br>요금제 가입여부</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">보유기간</th>' +
									    '<td>서비스 가입 기간 동안</td>' +
									'</tr>' +
							    '</tbody>' +
							'</table>' +
						'</div>' +

						'<div class="btn-bottom">' +
							'<button type="button" name="button" class="btn fill bottom btn-close">확인</button>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		}
		if(chkBodyFdPpl(pplId)){ //바디프랜드
			$choice5g.append(
				'<div class="checkbox">' +
					'<input type="checkbox" name="" id="planAgree'+ '-' + pplId +'">' +
					'<label for="planAgree'+ '-' + pplId +'">(필수) 요금제 가입 안내사항 확인/동의</label>' +
					'<button type="button" name="button" class="ui-popup-call" data-target="#planagree-pop'+ '-' + pplId +'"><em class="hidden">내용보기</em></button>' +
				'</div>' +

				'<div id="planagree-pop'+ '-' + pplId +'" class="ui-popup toast-popup disney-planagree"> <!-- active 클래스 추가로 활성화 popup-type-2 -->' +
					'<div class="content">' +
						'<div class="header">요금제 가입 안내사항 확인/동의</div>' +
						'<button type="button" class="btn-close">닫기</button>' +
						'<div class="body">' +
							'<table class="pop_agree_table">' +
							    '<colgroup>' +
									'<col style="width:40%">' +
									'<col style="width:60%">' +
							    '</colgroup>' +
							    '<caption>요금제 가입 안내사항</caption>' +
							    '<tbody>' +
									'<tr>' +
									    '<th scope="row">제공받는 자</th>' +
									    '<td>㈜ 바디프랜드</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">이용 목적</th>' +
									    '<td>바디프랜드 월 렌탈료 할인 혜택 제공<br>※ 5G 슈퍼플랜 초이스(바디프랜드) 요금제 가입시 필수</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">제공하는 항목</th>' +
									    '<td>성명, 전화번호, 상품명, 상품 가입/정지/명의변경/해지일자, 처리대리점코드</td>' +
									'</tr>' +
									'<tr>' +
									    '<th scope="row">보유기간</th>' +
									    '<td>서비스 가입 기간 동안</td>' +
									'</tr>' +
							    '</tbody>' +
							'</table>' +
						'</div>' +

						'<div class="btn-bottom">' +
							'<button type="button" name="button" class="btn fill bottom btn-close">확인</button>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		}
		if(chkDisneyPpl(pplId)){ //디즈니
			$choice5g.append(
					'<div class="checkbox">' +
						'<input type="checkbox" name="" id="planAgree'+ '-' + pplId +'">' +
						'<label for="planAgree'+ '-' + pplId +'">(필수) 요금제 가입 안내사항 확인/동의</label>' +
						'<button type="button" name="button" class="ui-popup-call" data-target="#planagree-pop'+ '-' + pplId +'"><em class="hidden">내용보기</em></button>' +
					'</div>' +
					'<p style="margin:10px 0 0;">*만 19세 이상의 개인 고객만 가입 가능한 요금제입니다.</p>' +

					'<div id="planagree-pop'+ '-' + pplId +'" class="ui-popup toast-popup disney-planagree"> <!-- active 클래스 추가로 활성화 popup-type-2 -->' +
						'<div class="content">' +
							'<div class="header">요금제 가입 안내사항 확인/동의</div>' +
							'<button type="button" class="btn-close">닫기</button>' +
							'<div class="body">' +
								'<table class="pop_agree_table">' +
								    '<colgroup>' +
										'<col style="width:40%">' +
										'<col style="width:60%">' +
								    '</colgroup>' +
								    '<caption>요금제 가입 안내사항</caption>' +
								    '<tbody>' +
										'<tr>' +
										    '<th scope="row">제공받는 자</th>' +
										    '<td>월트디즈니컴퍼니코리아 유한책임회사</td>' +
										'</tr>' +
										'<tr>' +
										    '<th scope="row">이용 목적</th>' +
										    '<td>디즈니 + 서비스 제공, 디즈니+ 제휴 혜택 안내 등<br>※슈퍼플랜 초이스(디즈니+)요금제 및 디즈니+ 부가서비스 가입시 필수</td>' +
										'</tr>' +
										'<tr>' +
										    '<th scope="row">제공하는 항목</th>' +
										    '<td>이동전화번호</td>' +
										'</tr>' +
										'<tr>' +
										    '<th scope="row">보유기간</th>' +
										    '<td>서비스 가입 기간 동안</td>' +
										'</tr>' +
								    '</tbody>' +
								'</table>' +
							'</div>' +

							'<div class="btn-bottom">' +
								'<button type="button" name="button" class="btn fill bottom btn-close">확인</button>' +
							'</div>' +
						'</div>' +
					'</div>'
			);
		}
	}

	return $choice5g;
}

//넷플릭스박스 max
function maxNetflixBoxItem(that) {
	if($("input[name=netflixAddItem]:checked").length == 0){
		$(that).prop("checked", true);
	}else if($("input[name=netflixAddItem]:checked").length > 1){
		$("input[name=netflixAddItem]:checked").prop("checked", false);
		$(that).prop("checked", true);
	}
}

//시즌박스 max
function validSeeznBoxItem(that) {
	var row = chkSeeznPpl("R", $(that).attr("pplGroupDivCd"), $(that).attr("pplId"));

	if(that == undefined || $(that).attr("name") != 'seeznAddItem'){
		if ($("input[name=seeznAddItem]:checked").length < row) {
			alert("시즌 초이스를 " +row+ "가지 선택후 선택완료를 클릭해주세요.");
			return false;
		}
	}

	//최대 1개이고 2개 이상 선택시 기존 체크된 것 체크해제함.
	if( row == 1 && $("input[name=seeznAddItem]:checked").length > 1){
		$("input[name=seeznAddItem]:checked").each(function() {
			if( $(that).val() != $(this).val()){
				$(this).prop("checked", false);
			}
		});
	}
	if ($("input[name=seeznAddItem]:checked").length > row) {
		alert("시즌 초이스는 " +row+ "가지만 선택 가능합니다.");
		if(that != undefined){
			$(that).prop("checked", false);
		}else{
			return false;
		}
	}

	var seeznArr = [];
	$("input[name=seeznAddItem]:checked").each(function() {
		seeznArr.push($(this).val());
	});

	var seeznArrStr = seeznArr.join(",");
	$("input[name=seeznAddVbs]").val(seeznArrStr);

	// 넷플릭스 체크
	if(chkNetflixPpl($(that).attr("pplId"))){
		//넷플릭스 박스 체크
		if($("input[name=netflixAddItem]:checked").length == 0){
			alert("넷플릭스 초이스를 선택 후 선택완료를 클릭해주세요");
			$("input[name=netflixAddItem]:visible").eq(0).focus(); // 접근성 focus
			return false;
		}else{
			$("input[name=netflixAddItem]:checked").each(function() {
				$("input[name=netflixAddVbs]").val($(this).val());
			});
		}
	}

	return true;

}


var getProdDiscountInfo = function(){
	var resultPrice = $("#wrapStep3 .result-price");

	var varData = controller.getSerializedData({
		prodNo: $("#prodNo").val(),
		sntyNo: $("#sntyNo").val(),
		sbscTypeCd: $("#sbscTypeCd").val(),
		inslMonsTypeCd: $("#inslMonsTypeCd").val(),
		svcEngtMonsTypeCd: $("#svcEngtMonsTypeCd").val(),
		pplId: $("#pplId").val(),
		vndrSntyNo: $("#vndrSntyNo").val(),
		supportType: $("#supportType").val(),
		buyTypeCd: $("#buyTypeCd").val(),
		//noPplId: noPplId,
		chargeCd: $("#chargeCd").val(),
	});

	//할인정보조회
	controller.ajaxSend({
		cache: false,
		url: "/smart/prodDiscountInfo.json",
		data: varData,
		dataType: 'json',
		type: 'post',
		async: true,
		isBlock: false,
		successCall: function (jsonObj) {
			var discountInfo = jsonObj.discountBean;

			var calMonthCommChagePayAmt = discountInfo.calMonthCommChagePayAmt;	//통신요금
			var monthUseChage = discountInfo.monthUseChage;						//월정액
			var monthInslChageDc = discountInfo.monthInslChageDc;				//약정할인
			var calMonthChageDc = discountInfo.calMonthChageDc;					//요금할인금액
			var inslMonsTypeVal = parseInt(discountInfo.inslMonsTypeVal);		//할부개월
			var calOfwAmt = discountInfo.calOfwAmt;								//할부원금
			var calMonthBasPayAmt = discountInfo.calMonthBasPayAmt;				//월납부금액
			var beforeMonthUseChage = discountInfo.beforeMonthUseChage;			//할인전금액
			var prmtnDcAmt = discountInfo.prmtnDcAmt;							//할인금액
			var calTotalInslFee = discountInfo.calTotalInslFee;					//할부수수료총합
			var svcEngtMonsTypeVal = parseInt(discountInfo.svcEngtMonsTypeVal);

			resultPrice.empty();
			$(".result-price-total").hide();
			resultPrice.append($('<div class="row"></div>').append($('<div class="td">월정액</div>')).append($('<div class="td"></div>').html(controller.addCom(monthUseChage) + "원")));
			if(calMonthChageDc > 0){
				resultPrice.append($('<div class="row sale"></div>').append($('<div class="td">요금할인 25%</div>')).append($('<div class="td"></div>').html("-" + controller.addCom(calMonthChageDc) + "원")));
			}
			resultPrice.append($('<div class="row total"></div>').append($('<div class="td">월 통신요금</div>')).append($('<div class="td"></div>').html(controller.addCom(calMonthCommChagePayAmt) + "원")));



			 // 총 통신요금
			var totalChagePayAmt = parseInt(calMonthCommChagePayAmt);
			if(svcEngtMonsTypeVal > 0){
				totalChagePayAmt = calMonthChageDc*svcEngtMonsTypeVal;
			}

			if(calMonthChageDc > 0){
				$(".result-price-total").html('총 요금할인 금액은 <strong class="price">' + controller.addCom(totalChagePayAmt) + '</strong>원 입니다.');
//				resultPrice.append($('<div class="result-price-total"></div>').append($('<div><strong class="price"></div>').html("총 요금할인 금액은 " + controller.addCom(totalChagePayAmt) + "원 입니다.")));
				$(".result-price-total").show();
			}
			resultPrice.show();

		},
		errorCall: function (jsonObj) {
			resultPrice.hide();
		}
	});
}


//시즌박스 pplId 체크
function chkSeeznPpl(type, pplGroupDivCd, pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isZSzPpl = false;
	var isOSzPpl = false;
	var isTSzPpl = false;
	var row = 2;

	var slimPlusPplId = "DEV" == devStr ? "0782" : "0786";

	var o_ItemPpls = slimPlusPplId + "|0790|0789|0793";		/** 0786:5G 슬림 Plus, 0790:Y군인 55 PLUS, 0789:Y군인 77 PLUS, 0793:Y 슬림 Plus*/
	var o_gItemPpls = "dumpData";
	var t_ItemPpls = "dumpData";
	var t_gItemPpls = "98|102|140";							/** 98:5G 슈퍼플랜 Plus, 102:5G Y 슈퍼플랜 Plus, 140:5G 슈퍼플랜 초이스 */

	var netflixZSzPplId = "DEV" == devStr ? "0808" : "0811"; /** 넷플릭스+베이직일 경우 시즌초이스 0가지 선택가능**/
	var netflixOSzPplId = "DEV" == devStr ? "0809|0810" : "0809|0810|0830"; /** 넷플릭스+(스페셜or프리미엄)일 경우 시즌초이스 1가지 선택가능**/

	var hdCardZSzPplId = "DEV" == devStr ? "0818" : "0823"; /** 현대카드+베이직일 경우 시즌초이스 0가지 선택가능**/
	var hdCardOSzPplId = "DEV" == devStr ? "0817|0816" : "0824|0825|0831"; /** 현대카드+(스페셜or프리미엄)일 경우 시즌초이스 1가지 선택가능**/

	var seasonChoiseZSzPplId = "DEV" == devStr ? "0804" : "0829"; /** 0829:슈퍼플랜 베이직 초이스(시즌/지니) 시즌초이스 0가지 선택가능 **/
	var seasonChoiseOSzPplId = "DEV" == devStr ? "0802|0803" : "0827|0828"; /** 0827:슈퍼플랜 프리미엄 초이스(시즌/지니), 0828:슈퍼플랜 스페셜 초이스(시즌/지니) 시즌초이스 1가지 선택가능 **/

	var bodyFdZSzPplId = "DEV" == devStr ? "0821" : "0836"; /** 바디프랜드 베이직일 경우 시즌초이스 0가지 선택가능**/
	var bodyFdOSzPplId = "DEV" == devStr ? "0819|0820" : "0834|0835"; /** 바디프랜드+(스페셜or프리미엄)일 경우 시즌초이스 1가지 선택가능**/

	var airpodOSzPplId = "DEV" == devStr ? "0822|0823" : "0837|0838"; /** 에어팟+(스페셜or프리미엄)일 경우 시즌초이스 1가지 선택가능**/

	var disneyZSzPplId = "DEV" == devStr ? "0841" : "0842"; /** 디즈니 베이직일 경우 시즌초이스 0가지 선택가능**/
	var disneyOSzPplId = "DEV" == devStr ? "0839|0840" : "0840|0841"; /** 디즈니+(스페셜or프리미엄)일 경우 시즌초이스 1가지 선택가능**/

	var oRegx = new RegExp(o_ItemPpls);
	var o_gRegx = new RegExp(o_gItemPpls);
	var tRegx = new RegExp(t_ItemPpls);
	var t_gRegx = new RegExp(t_gItemPpls);
	var nfzRegx = new RegExp(netflixZSzPplId);
	var nfoRegx = new RegExp(netflixOSzPplId);
	var hdzRegx = new RegExp(hdCardZSzPplId);
	var hdoRegx = new RegExp(hdCardOSzPplId);
	var sczRegx = new RegExp(seasonChoiseZSzPplId);
	var scoRegx = new RegExp(seasonChoiseOSzPplId);
	var bfzRegx = new RegExp(bodyFdZSzPplId);
	var bfoRegx = new RegExp(bodyFdOSzPplId);
	var apoRegx = new RegExp(airpodOSzPplId);
	var dnzRegx = new RegExp(disneyZSzPplId);
	var dnoRegx = new RegExp(disneyOSzPplId);

	if (!pplGroupDivCd || !pplId) {
		return false;
	}

	if(nfzRegx.test(pplId) || hdzRegx.test(pplId) || sczRegx.test(pplId) || bfzRegx.test(pplId) || dnzRegx.test(pplId)){
		isZSzPpl = true;
		row = 0;
	}else if ((o_gRegx.test(pplGroupDivCd)) || (oRegx.test(pplId)) || (nfoRegx.test(pplId)) || (hdoRegx.test(pplId)) || (scoRegx.test(pplId)) || (bfoRegx.test(pplId)) || (apoRegx.test(pplId))|| (dnoRegx.test(pplId)) ) {
		isOSzPpl = true;
		row = 1;
	} else if ((t_gRegx.test(pplGroupDivCd)) || (tRegx.test(pplId))) {
		isTSzPpl = true;
		row = 2;
	}

	if (type == "1") {
		return isOSzPpl;
	} else if (type == "2") {
		return isTSzPpl;
	} else if (type == "R") {
		return row;
	} else if (!type || type == "A") {
		return isOSzPpl || isTSzPpl ? true : false;
	} else {
		return false;
	}
}

//넷플릭스 pplId 체크
function chkNetflixPpl(pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isOSzPpl = false;
	var row = 1;

	/** DEV: 0808(5G 슈퍼플랜 베이직 초이스(넷플릭스)) / 0809(5G 슈퍼플랜 스페셜 초이스(넷플릭스)) / 0810(5G 슈퍼플랜 프리미엄 초이스(넷플릭스)) **/
	/** PRD: 0830(5G 슈퍼플랜 프리미엄 초이스(넷플릭스)) / 0810(5G 슈퍼플랜 스페셜 초이스(넷플릭스)) / 0811(5G 슈퍼플랜 베이직 초이스(넷플릭스)) **/
	var netflixPplId = "DEV" == devStr ? "0808|0809|0810" : "0809|0810|0811|0830";

	var netflixRegx = new RegExp(netflixPplId);

	if (!pplId) {
		return false;
	}

	if (netflixRegx.test(pplId)) {
		isOSzPpl = true;
		row = 1;
	}

	return isOSzPpl;
}

//시즌/지니  pplId 체크
function chkSeasonChoisePpl(pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isOSzPpl = false;
	var row = 1;

	/** DEV: 0804(5G 슈퍼플랜 베이직 초이스)			 / 0803(5G 슈퍼플랜 스페셜 초이스) 		/ 0802(5G 슈퍼플랜 프리미엄 초이스) **/
	/** PRD: 0829(5G 슈퍼플랜 베이직 초이스(시즌/지니)) / 0828(5G 슈퍼플랜 스페셜 초이스(시즌/지니)) / 0827(5G 슈퍼플랜 프리미엄 초이스(시즌/지니)) **/
	var seasonChoisePplId = "DEV" == devStr ? "0804|0803|0802" : "0829|0828|0827";

	var seasonChoiseRegx = new RegExp(seasonChoisePplId);

	if (!pplId) {
		return false;
	}

	if (seasonChoiseRegx.test(pplId)) {
		isOSzPpl = true;
		row = 1;
	}

	return isOSzPpl;
}

//현대카드  pplId 체크
function chkHdPpl(pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isOSzPpl = false;
	var row = 1;

	var HdPplId = "DEV" == devStr ? "0816|0817|0818" : "0825|0824|0823";

	var HdRegx = new RegExp(HdPplId);

	if (!pplId) {
		return false;
	}

	if (HdRegx.test(pplId)) {
		isOSzPpl = true;
		row = 1;
	}

	return isOSzPpl;
}

//바디프랜드  pplId 체크
function chkBodyFdPpl(pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isOSzPpl = false;
	var row = 1;

	var bodyFdChoisePplId = "DEV" == devStr ? "0819|0820|0821" : "0834|0835|0836";

	var bodyFdChoiseRegx = new RegExp(bodyFdChoisePplId);

	if (!pplId) {
		return false;
	}

	if (bodyFdChoiseRegx.test(pplId)) {
		isOSzPpl = true;
		row = 1;
	}

	return isOSzPpl;
}

//디즈니 pplId 체크
function chkDisneyPpl(pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isOSzPpl = false;
	var row = 1;

	var disneyPplId = "DEV" == devStr ? "0839|0840|0841" : "0840|0841|0842";

	var disneyRegx = new RegExp(disneyPplId);

	if (!pplId) {
		return false;
	}

	if (disneyRegx.test(pplId)) {
		isOSzPpl = true;
		row = 1;
	}

	return isOSzPpl;
}

//에어팟 pplId 체크
function chkAirpodPpl(pplId) {
	var devStr = $("#SERVER_NAME").val().replace('LOCAL', 'DEV');
	var isOSzPpl = false;
	var row = 1;

	var airPodPplId = "DEV" == devStr ? "0822|0823" : "0837|0838";

	var airpodRegx = new RegExp(airPodPplId);

	if (!pplId) {
		return false;
	}

	if (airpodRegx.test(pplId)) {
		isOSzPpl = true;
		row = 1;
	}

	return isOSzPpl;
}



/* 상품 정보 더보기 */
$(document).on('click','.go-charge',function(e){

	window.open($(this).attr('href'),"cardRawMobile", "width=400,height=500,scrollbar=yes");
	/*
	if(getShowChDivCd() == "02"){
		//mobile
		$('#popup-good-more').removeClass('pc');
	}else{
		//pc
		$('#popup-good-more').addClass('pc');
	}
	$('#popup-good-more iframe').attr('src',$(this).attr('href'));
	popupOpen('#popup-good-more');
	*/
	return false;
});

// 토핑 선택완료
function fnToppingPick(obj) {
	if("choice" == obj) {
		// 시즌초이스, 넷플릭스 선택 유효성 체크
		if( !$(":checkbox[name='diySeeznItem']").is(":checked") && !$(":checkbox[name='diyNetflixAddItem']").is(":checked") ) {
			alert("이용하실 콘텐츠를 선택해주세요.");
			$(":checkbox[name='diySeeznItem']").focus();
			return;
		}
		// 시즌초이스 콘텐츠 유효성 체크
		if($(":checkbox[name='diySeeznItem']").is(":checked") && 2 > $(":checkbox[name='diySeeznAddItem']:checked").length) {
			alert("시즌 초이스를 2가지 선택후 선택완료를 클릭해주세요.");
			$(":checkbox[name='diySeeznAddItem']:not(':checked')").eq(0).focus();
			return;
		}
		$("#seeznUseChageArea").hide();
		$("#netFlixUseChageArea").hide();

		var pplId = $("#pplId").val();
		var monthUseChage = page.pplList[pplId].discountInfo.monthUseChage;
		$("#monthUseChageTxt").text(controller.addCom(monthUseChage)+"원");
		// 시즌초이스 추가에 따른 금액 계산 및 영역 노출 처리
		if($(":checkbox[name='diySeeznItem']").is(":checked")) {
			monthUseChage = parseInt(monthUseChage)+11000;
			$("#seeznUseChageArea").show();

			// 시즌초이스값 넣기
			var seeznArr = [];
			$("input[name=diySeeznAddItem]:checked").each(function() {
				seeznArr.push($(this).val());
			});
			var seeznArrStr = seeznArr.join(",");
			$("input[name=seeznAddVbs]").val(seeznArrStr);
		} else {
			$("#seeznUseChageArea").hide();
		}
		// 넷플릭스 추가에 따른 영역 노출 처리
		if($(":checkbox[name='diyNetflixAddItem']").is(":checked")) {
			$("#netFlixUseChageArea").show();
			$("input[name=netflixAddVbs]").val($(":checkbox[name='diyNetflixAddItem']:checked").val());
		} else {
			$("#netFlixUseChageArea").hide();
		}
		$("#totalMonthUseChageTxt").text(controller.addCom(monthUseChage)+"원");

		$("div#setp-1").hide();
		$("div#setp-2").show();
	} else {
		// 스킵 처리
		$(":checkbox[name='diySeeznItem']").prop("checked", false);
		$(":checkbox[name='diySeeznAddItem']").prop("checked", false);
		$(":checkbox[name='diyNetflixAddItem']").prop("checked", false);

		goNextStep('#stepCoupon', this);
	}
}

// 토핑 다시 선택
function fnToppingReset() {
	$("div#setp-1").show();
	$("div#setp-2").hide();

	// 토핑 초기화
	$("input[name=seeznAddVbs]").val("");
	$("input[name=netflixAddVbs]").val("");
}

// Y's 요금제 토핑 선택
function validDiySeeznBoxItem(that) {
	var row = 2;

	if ($("input[name=diySeeznAddItem]:checked").length > row) {
		alert("시즌 초이스는 " +row+ "가지만 선택 가능합니다.");
		if(that != undefined){
			$(that).prop("checked", false);
		}else{
			return false;
		}
	}
	return true;
}

// 요금제 변경 유효성 체크
function goPplChgProcCheck(chgPplId, diyPplYn) {
	$("#pplChgFailText").hide();
	$("#pplChgPassText").hide();
	$("#pplChgNoti").attr("svcRstYn","");

	loadOneBlock();

	// 로딩바가 호출될 시간 벌자
	setTimeout(function() {
		controller.ajaxSend({
			cache: false,
			url: '/direct/pplChangeCheck.json',
			data: controller.getSerializedData({
				chgPplId: chgPplId
			}),
			dataType: 'json',
			type: 'post',
			async: false,
			isOneBlock : false,
			successCall: function (jsonObj) {
				var pplChgRes = jsonObj.pplChgRes;
				var msgList = pplChgRes.directUsimMsgBeanList;
				var arr = [];
				if("N" == pplChgRes.nextStepYn) {
					var pplNm = $("dl#boxRecommPpl > dt[aria-selected='true']").text();
					$("#pplChgFailText").html("죄송합니다. 고객님, 요청하신 ["+pplNm+" 요금제] 가입은 특정 부가서비스, 결합 등의 사유로 온라인 신청이 불가합니다. 자세한 사항은 다이렉트 고객센터(1899-8245)로 문의바랍니다.");
					$("#pplChgNoti").attr("svcRstYn","N");
					$("#pplChgFailText").show();
					$("#pplChgPassText").hide();
					popupOpen('#popup-plan-change');
				} else {
					if(null != msgList) {
						for(var i=0; i<msgList.length; i++) {
							arr.push('<li class="info-txt-mark">'+msgList[i].ruleMsgSbst+'</li>');
						}
						$("#pplChgPassText").find("ul.com-list-dot:eq(0)").append(arr.join(''));
					}
					showPplNotiTYpe(chgPplId);
					$("#pplChgNoti").attr("svcRstYn","Y");
					$("#pplChgNoti").attr("diyPplYn",diyPplYn);

					$("#pplChgFailText").hide();
					$("#pplChgPassText").show();
					if(30 > pplChgRes.custAge) {
						popupOpen('#popup-ys-plan-sale');
					} else {
						popupOpen('#popup-plan-change');
					}
				}
				loadOneUnBlock();
			}, errorCall: function (jsonObj) {
				location.href = "/directMain.do";
			}
		});
	}, 200);
}

function showPplNotiTYpe(pplId) {
	$("#pplTypeA").hide();
	$("#pplTypeB").hide();
	$("#pplTypeC").hide();
	if(isReal) {
		/** 5G 무약정플랜, 5G 무약정플랜 슬림 */
		if("0817" == pplId || "0819" == pplId) {
			$("#pplTypeA").show();
		}
		/** LTE 무약정플랜 */
		else if("0818" == pplId) {
			$("#pplTypeB").show();
		}
		/** 5G 다이렉트 */
		else if("0787" == pplId) {
			$("#pplTypeC").show();
		}
	} else {
		/** 5G 무약정플랜, 5G 무약정플랜 슬림 */
		if("0813" == pplId || "0815" == pplId) {
			$("#pplTypeA").show();
		}
		/** LTE 무약정플랜 */
		else if("0814" == pplId) {
			$("#pplTypeB").show();
		}
		/** 5G 다이렉트 */
		else if("0783" == pplId) {
			$("#pplTypeC").show();
		}
	}
}

// 요금제 변경 처리
function savePplChgProc(chgPplId) {
	var vbsList = "";

	if ($("#seeznAddVbs").val()) {
		// 대표 부가서비스를 첫번째로 값 셋팅
		vbsList = "PL19BT530,"+$("#seeznAddVbs").val()+",";
	}
	if($("#netflixAddVbs").val()) {
		vbsList = vbsList+$("input[name=netflixAddVbs]").val()+",";
	}
	vbsList = vbsList.substr(0, vbsList.length-1);

	loadOneBlock();

	// 로딩바가 호출될 시간 벌자
	setTimeout(function() {
		controller.ajaxSend({
			cache: false,
			url: '/direct/pplChangeProc.json',
			data: controller.getSerializedData({
				chgPplId : chgPplId
				, prodNo : $("#prodNo").val()
				, sntyNo : $("#sntyNo").val()
				, seeznAddVbs : $("input[name=seeznAddVbs]").val()
				, netflixAddVbs : $("input[name=netflixAddVbs]").val()
				, vbsList : vbsList
			}),
			dataType: 'json',
			type: 'post',
			async: false,
			isOneBlock : true,
			successCall: function (jsonObj) {
				var rtnData = jsonObj.rtnData;
				if("N" == rtnData.svcResult) {
					var pplNm = $("dl#boxRecommPpl > dt[aria-selected='true']").text();
					$("#pplChgFailText").html("죄송합니다. 고객님, 요청하신 ["+pplNm+" 요금제] 가입은 특정 부가서비스, 결합 등의 사유로 온라인 신청이 불가합니다. 자세한 사항은 다이렉트 고객센터(1899-8245)로 문의바랍니다.");
					$("#pplChgNoti").attr("svcRstYn","N");
					$("#pplChgFailText").show();
					$("#pplChgPassText").hide();
					popupOpen('#popup-plan-change');
					// X버튼 클릭 시 메인 이동 처리
					$("#popup-plan-change > div > button").click(function() {$("#pplChgNoti").trigger("click")});
					loadOneUnBlock();
				} else {
					location.href = "/direct/directUsimPplChgCmplView.do?ordrNo="+rtnData.ordrNo;
				}
			}, errorCall: function (jsonObj) {
				location.href = "/directMain.do";
			}
		});
	}, 200);
}

function pplChgYsPlanOk() {
	popupClose('#popup-ys-plan-sale');
	popupOpen('#popup-plan-change');
}

function fnRecommendDiv(){
	//조건선택하고 요금제 추천받기 화면 보여주기
	showWrapStep($("[name=recomm-plan_system]").data('target'), $("[name=recomm-plan_system]"));

	var recommDiv = $("#recommDiv").val();

	$("#recomm-plan .setp-area").hide();
	$("#recomm-plan ."+recommDiv+"-area").eq(0).show();

	$("#recomm-plan ."+recommDiv+"-area").has(':visible').find("."+recommDiv+"-values input[type=radio]").eq(0).trigger("mousedown");

	var idx = 1;
	var $pageNum = $("#recomm-plan .page-num");
	$pageNum.empty();
	$("#recomm-plan ."+recommDiv+"-area").each(function(i){
		if(i==0){
			$pageNum.append('<span class="current">'+idx+'</span>');
		}else{
			$pageNum.append('<span>'+idx+'</span>');
		}

		idx++;
	});

	$("#recomm-plan .new-range-area,.setp-msg").each(function(){
		$(this).hide();
		if($(this).hasClass(recommDiv+"-values")){
			$(this).show();
		}
	});

}

function fnShowChooseGen(){
	//5G, LTE 서비스 선택 창 보여주기
	$("#chooseGenerationDiv").show();
	$("#titleNm").text("서비스 선택");
}


