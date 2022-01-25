
var AJAX_RESULT_CODE = {
		SUCCESS    : '00000'
};

var VNDR_BAS_CODE = {
		 BASE_VNDRZ_NO :'YS20009'  //직영 대리점 코드
		,BASE_VNDRZ_NM :'직영온라인'  //직영 대리점 코드
};
 
var objLinkUrl = {
		 "15":"/smart/productView.do"
		,"14":"/smart/productView.do"
		,"13":"/smart/productView.do"
		,"17":"/smart/productTabletView.do"
		,"18":"/smart/productTabletView.do"
		,"19":"/smart/productHybridView.do"
		,"16":"/smart/productView.do"
		,"11":"/smart/productUsimView.do"
		,"06":"/internet/internetView.do"
		,"07":"/tv/tvView.do"
		,"08":"/interPhone/interPhoneView.do"
		,"09":"/homePhone/homePhoneView.do"
		,"10":""
		,"03":"/accessory/accsProductView.do"
		,"04":"/accessory/accsProductView.do"
		,"23":"/smartPhone/smartPhoneView.do"
		,"24":"/iot/gigaIotHomeCamView.do"
		,"12":"/smart/productWibroView.do"
} ;

/**
 * 대리점구분코드(200245)
 * - 01 : 직영
 * - 02 : 가맹d
 */
var VNDR_DRMB_DIV_CD = {
		VNDR_DRMB_DIV_CD_DIRECT:"01"
	   ,VNDR_DRMB_DIV_CD_JOIN:"02"
};

/**
 * ORDR_TYPE 주문유형코드
 * - 01 : 무선상품주문
 * - 02 : 유선상품주문
 * - 03 : 결합상품주문
 * - 04 : 액세서리주문
 * - 05 : 중고폰/직구폰 주문
 * - 06 : TD주문
 * - 07 : 전화상담(유선)
 * - 08 : 예약판매 주문
 * - 09 : 전화상담(결합상품)
 */
var ORDR_TYPE = {
		 ORDR_TYPE_SMART:"01"
		,ORDR_TYPE_WIRE:"02"
		,ORDR_TYPE_JOIN:"03"
		,ORDR_TYPE_ACCESSORY:"04"
		,ORDR_TYPE_OLDPHONE:"05"
		,ORDR_TYPE_TD:"06"
		,ORDR_TYPE_TEL:"07"
		,ORDR_TYPE_PREORDER:"08"
		,ORDR_TYPE_JOIN_TEL:"09"
};


/**
 * ordr_txn  주문내역
 * ordr_txn_sttus_cd 주문내역상태코드
 *  01 : 주문접수     : 신청 및 주문완료
 *  03 : 상담처리중   : 상담원 확인중
 *  05 : 설치완료
 *  06 : 상담취소
 *  08 : 주문취소     : 주문취소
 *  09 : 주문완료     : 주문완료
 *  10 : 상품준비     :  배송준비중
 *  13 : 배송중        : 배송중
 *  14 : 배송완료      : 배송완료
 *  15 : 반품접수      : 반품처리중
 *  17 : 반품완료      : 반품완료
 *  18 : 반품취소      : 반품취소
 *  19 : 교환접수      : 교환처리중
 *  25 : 교환완료      : 교환완료
 *  26 : 교환취소      : 교환취소
 *  02 : 상담접수      : 상담접수
 */
var ORDR_TXN_STTUS_CD = {
		 ORDR_TXN_STTUS_CD_COMPLETE:"01"
		,ORDR_TXN_STTUS_CD_CONFIRM:"03"
		,ORDR_TXN_STTUS_CD_CANCEL:"08"
		,ORDR_TXN_STTUS_CD_ORDR_COMPLETE:"09"
		,ORDR_TXN_STTUS_CD_READY_DELIVERY:"10"
		,ORDR_TXN_STTUS_CD_DELIVERYING:"13"
		,ORDR_TXN_STTUS_CD_DELIVERY:"14"
		,ORDR_TXN_STTUS_CD_REFUND:"15"
		,ORDR_TXN_STTUS_CD_REFUND_CANCEL:"18"
		,ORDR_TXN_STTUS_CD_EXCHANGE:"19"
		,ORDR_TXN_STTUS_CD_EXCHANGE_COM:"25"
		,ORDR_TXN_STTUS_CD_EXCHANGE_CANCEL:"26"
		,FINISH:"05"
		,ADVICE_CANCEL:"06"
};

/**
 * clm_bas  클레임기본
 * clm_type_cd 클레임유형코드
 * "01";"주문취소"
 * "02";"반품"
 * "03";"일반교환"
 * "04";"맞교환"
 * "05";"재배송"
 * "06";"가격변경"
 */
var CLM_TYPE_CD = {
		CLM_TYPE_CD_ORDER_CANCEL:"01"
		,CLM_TYPE_CD_RETURN:"02"
		,CLM_TYPE_CD_EXCHANGE:"03"
};

/**
 * 결제수단코드
 * - 01 : 무통장
 * - 02 : 실시간계좌이체
 * - 03 : 신용카드
 * - 04 : 휴대폰소액결제
 * - 26 : KCP(신용카드)
 * - 27 : KCP(실시간계좌이체)
 * - 28 : KCP(가상계좌)
 * - 29 : KCP(휴대폰소액결제)
 * - 30 : PAYCO
 * - 31 : KCP(실시간계좌이체_일반)
 * - 32 : KCP(가상계좌_일반)
 * Field : SETTL_WAY_CD | settlWayCd
 */

var SETTL_WAY_CD ={
		 FREE_ACCOUNT:"01"
		,REALTIME_ACCOUNT:"02"
		,CREDIT_CARD:"03"
		,PHONE:"04"
		,KCP_CREDIT_CARD:"26"
		,KCP_REALTIME_ACCOUNT:"27"
		,KCP_FREE_ACCOUNT:"28"
		,KCP_PHONE:"29"
		,PAYCO:"30"
		,KCP_REALTIME_ACCOUNT_N:"31"
		,KCP_FREE_ACCOUNT_N:"32"

};

/** 카테고리 그룹 코드 : 200016 */
var PROD_CTG_CD={
		 ACCESSIRT:"03"
		,ACCESSIRT_TD:"04"
		,LTE:"15"
		,CD_3G:"14"
		,FEATURE:"13"
		,CD_3G_PAD:"17"
		,LTE_PAD:"18"
		,HYBRID_EGG:"19"
		,WIBRO:"12"
		,WEARABLE:"16"
		,USIM:"11"
		,WIBRO_EGG:"12"
		,HYBRID_EGG:"19"
		,LTE_EGG:"29"
		,USEDPHONE_3G:"21"
		,USEDPHONE_LTE:"20"
		,WIRE_INTERNET:"06"
		,WIRE_TV:"07"
		,WIRE_INTERNETPHONE:"08"
		,WIRE_PHONE:"09"
		,WIRE_SMARTHOMEPHONE:"23"
		,WIRE_GIGAIOTHOMECAM:"24"
};

/** 가입유형 200038 */
/** 가입유형 - 기기변경 04
 * 신규가입 01
 * 번호이동 02
 * */
var SBSC_TYPE_CD = {
   CHANGE_DEVICE:"04"
   ,NEW:"01"
   ,MOVE_NUM:"02"
};

/** 주문신청유형코드 200167 */
/** 전화상담 - 01
 * 기존준셀프 02
 * 기존셀프 03
 * Wibro  04
 * 기타    05
 * */
var ORDR_APLY_TXN_CD = {
		 CALL_ORDER:"01"
		,JUN_SELF:"02"
		,SELF:"03"
		,WIBRO:"04"
		,ETC:"05"
};

/**
* 주문신청유형코드 200174
* - 01 : 전화상담
* - 02 : 기존준셀프
* - 03 : 셀프
* - 04 : wibro
* - 05 : 신규준셀프
* - 99 : 기타
*/
var ORDER_TYPE_CD = {
	  TEL:"01"
	, ZUN_SELF:"02"
	, SELF:"03"
	, WIBRO:"04"
	, NEWZUN_SELF:"05"
	, ETC:"99"
};

/** RSA Obj */
var rsaObj = null;



$.extend({CommonObj : function(){

	var that = this;
	var $form = null;
	var $body= null;
	//var $body= $('body');
	var DOC = document;

	var productsCode = null;

	this.createForm = function(cfg) {
		if(!that.$form){
			that.$form = $('<form></form>');
		}
		that.$form.empty();

		if(cfg.id != undefined) {
			that.$form.attr('id',cfg.id)
		}
		if(cfg.name != undefined) {
			that.$form.attr('name',cfg.name);
		}
		that.$form.attr('method', cfg.method || 'post');
		that.$form.attr('action', cfg.action || '');
		that.$form.attr('target', cfg.target || '_self');
		that.$body.append(that.$form);

		return that.$form;
	};

	this.attachHiddenElement = function(name, value) {
		if(!that.$form) {
			alert('createForm() must be called');
			return;
		}

		var $hdnEl = $('<input type="hidden"></input>');
		$hdnEl.attr('name',name);
		$hdnEl.attr('value',value);
		that.$form.append($hdnEl);
	};

	this.formSerialize = function() {
		if(that.$form) {
			return that.$form.serialize();
		}
	};

	this.formSubmit = function() {
		if(that.$form) {
			that.$form.submit();
		}
	};

	/** 유선상품상세 전화상담 */
	this.formPopupSubmit = function(width, height) {
		if(that.$form) {
			var pL = (screen.width - width)/2
			var pT = (screen.height - height)/2

			if($(window).height() < height){
				height = $(window).height() - 50
			}

			var pop = window.open("", "telCounselPoupView", "width="+width+", height="+height+", left="+pL+", top="+pT+", scrollbars=yes, resizable=yes");

			that.$form.submit();
		}
	};

	this.setSerializedFormData = function(param) {
		var resultStr = '';
		if(Object.prototype.toString.call(param) === '[object Object]') {
			var arr = [];
			var encodedParam = '';
			for(var p in param) {
				if(param.hasOwnProperty(p)) {
					encodedParam = param[p];
					if(typeof encodedParam == 'string') {
						encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm,'%26').replace(/\+/gm,'%2B');
					}
					var $hdnEl = $('<input type="hidden"></input>');
					$hdnEl.attr('name',p);
					$hdnEl.attr('value',encodedParam);
					that.$form.append($hdnEl);
				}
			}
		}
		return resultStr;
	};

	this.getSerializedData = function(param) {
		var resultStr = '';
		if(Object.prototype.toString.call(param) === '[object Object]') {
			var arr = [];
			var encodedParam = '';
			for(var p in param) {
				if(param.hasOwnProperty(p)) {
					encodedParam = param[p];
					if(typeof encodedParam == 'string') {
						//encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm,'%26').replace(/\+/gm,'%2B').replace(/\?/gm,'%3F');
						encodedParam = encodeURIComponent(encodedParam);
					}
					arr.push(p+'='+encodedParam);
				}
			}

			resultStr = arr.join('&');
		} else if($.isArray(param)) {
			resultStr = param.join('&');
		}
		return resultStr;
	};
	this.getSerializedDataRSA = function(param, arrEncParam) {
		var resultStr = '';
		if(Object.prototype.toString.call(param) === '[object Object]') {
			var arr = [];
			var encodedParam = '';
			for(var p in param) {
				if(param.hasOwnProperty(p)) {
					encodedParam = param[p];
					if(typeof encodedParam == 'string') {
						encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm,'%26').replace(/\+/gm,'%2B').replace(/\?/gm,'%3F');
						try {
							if (arrEncParam) {
								for (var i in arrEncParam) {
									if (p == arrEncParam[i]) {
										encodedParam = getRsaEncData(encodedParam);
									}
								}
							}
						} catch(ex) {}
					}
					arr.push(p+'='+encodedParam);
				}
			}

			resultStr = arr.join('&');
		} else if($.isArray(param)) {
			try {
				if (arrEncParam) {
					var column = null;
					for (var i in arrEncParam) {
						column = arrEncParam[i];
						if (param[column]) {
							param[column] = getRsaEncData(param[column]);
						}
					}
					column = null;
				}
			} catch(ex) {}
			resultStr = param.join('&');
		}
		return resultStr;
	};

	this.getSerializedDataAllRSA = function(param) {
		var resultStr = '';
		if(Object.prototype.toString.call(param) === '[object Object]') {
			var arr = [];
			var encodedParam = '';
			for(var p in param) {
				if(param.hasOwnProperty(p)) {
					encodedParam = param[p];
					if(typeof encodedParam == 'string') {
						encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm,'%26').replace(/\+/gm,'%2B').replace(/\?/gm,'%3F');
						try {
							encodedParam = getRsaEncData(encodedParam);
						} catch(ex) {}
					}
					arr.push(p+'='+encodedParam);
				}
			}

			resultStr = arr.join('&');
		} else if($.isArray(param)) {
			try {
				for (var i in param) {
					param[i] = getRsaEncData(param[i]);
				}
				column = null;
			} catch(ex) {}
			resultStr = param.join('&');
		}
		return resultStr;
	};

	this.getFormSerializedRSA = function($frmObj, encKeys) {
		var resultArry = [];
		var frmArray = [];
		var encKeyArray = [];

		if ($frmObj != null && $frmObj != "") {
			frmArray = $frmObj.serializeArray();
		} else {
			return "";
		}

		if (encKeys != null && encKeys != "") {
			encKeyArray = encKeys.split(",");
		}

		for (var i=0; i<frmArray.length; i++) {
			var oName = frmArray[i].name;
			var oVlaue = frmArray[i].value;
			var isEncTarget = false;

			for (var j=0; j<encKeyArray.length; j++) {
				if (encKeyArray[j].trim() == oName) {
					isEncTarget = true;
					break;
				}
			}

			if (isEncTarget) {
				resultArry.push(oName+'='+encodeURIComponent(getRsaEncData(oVlaue)));
			} else {
				resultArry.push(oName+'='+encodeURIComponent(oVlaue));
			}

		}

		return resultArry.join("&");
	};

	this.getFormSerializedAllRSA = function($frmObj) {
		var resultArry = [];
		var frmArray = [];
		var encKeyArray = [];

		if ($frmObj != null && $frmObj != "") {
			frmArray = $frmObj.serializeArray();
		} else {
			return "";
		}

		for (var i=0; i<frmArray.length; i++) {
			var oName = frmArray[i].name;
			var oVlaue = frmArray[i].value;

			resultArry.push(oName+'='+encodeURIComponent(getRsaEncData(oVlaue)));
		}

		return resultArry.join("&");
	};

	this.ajaxSendCall = function(url, data, successFunc, cfg) {
		var config = {
				url:url,
				type:"post",
				dataType:"json",
				data:data,
				successCall:successFunc
			};
		if(typeof(cfg) != "undefined") {
			$.extend(true, config, cfg);
		}
		this.ajaxSend(config);
	};

	this.ajaxSendSeCall = function(url, data, successFunc, errorFunc, cfg) {
		var config = {
				url:url,
				type:"post",
				dataType:"json",
				data:data,
				successCall:successFunc,
				errorCall:errorFunc
			};
		if(typeof(cfg) != "undefined") {
			$.extend(true, config, cfg);
		}
		this.ajaxSend(config);
	};
	this.ajaxSend = function(cfg) {

		if (cfg.isMsgBlock != undefined) {
			cfg.isMsgBlock = true;
			if($.isFunction($.loadMsgBlock)) {
				if ($("#loadingPop").length == 0) {
					$.loadMsgBlock(cfg.isMsgBlockStr);
				}
			}
		} else {
			if (cfg.isOneBlock == undefined) {
				cfg.isOneBlock = true;
			}
			if (cfg.isDim == undefined) {
				cfg.isDim = true;
			}
			if(cfg.isOneBlock && $.isFunction(loadOneBlock)) {
				if ($("#oneLoading").length == 0) {
					loadOneBlock(cfg.isDim);
				}
			}
		}

		$.ajax({
			  url            : cfg.url
			, data            : cfg.data
			, type            : (cfg.method == undefined) ? 'post' : cfg.method
			, contentType    : (cfg.contentType == undefined) ? 'application/x-www-form-urlencoded;charset=UTF-8' : cfg.contentType
			, cache            : false
			, dataType        : cfg.dataType
			, async            : (cfg.async == undefined) ? true : cfg.async
			, timeout        : (cfg.timeout == undefined) ? 60000 : cfg.timeout
			, isBlock : (typeof(cfg.isBlock) == 'undefined') ? true : cfg.isBlock
			, isMsgBlock : (typeof(cfg.isMsgBlock) == 'undefined') ? true : cfg.isMsgBlock
			, isOneBlock : (typeof(cfg.isOneBlock) == 'undefined') ? true : cfg.isOneBlock
			, isDim : (cfg.isDim == undefined) ? true : cfg.isDim
			, errorCall : (cfg.errorCall == undefined) ? function () {} : cfg.errorCall
			, error: function(e,status,exception){

			   if(this.isBlock && $.isFunction($.loadUnBlock)) {
					$.loadUnBlock();
			   }

			   if(this.isMsgBlock && $.isFunction($.loadMsgUnBlock)) {
					$.loadMsgUnBlock();
			   }

			   if(this.isOneBlock && $.isFunction(loadOneUnBlock)) {
					loadOneUnBlock();
			   }

				if (cfg.errorCall != undefined) {
					cfg.errorCall(e);
				} else {
					//error code : 0   ==> timeout
					//error code : 500 ==> internal server error
					var errorMsg = '';
					if(e.status == '0') {
						errorMsg = '네트워크 에러입니다. 통신연결 상태를 확인하세요';
					} else {
						errorMsg = '서버 에러입니다. 관리자에게 문의해 주시기 바랍니다.';
					}
					alert(errorMsg);
				}
			}
			, success: function(data){

				if(this.isBlock && $.isFunction($.loadUnBlock)) {
					$.loadUnBlock();
				}

				if(this.isMsgBlock && $.isFunction($.loadMsgUnBlock)) {
					$.loadMsgUnBlock();
				}

				if(this.isOneBlock && $.isFunction(loadOneUnBlock)) {
					loadOneUnBlock();
				}

				if (this.dataType == 'html'){
					cfg.successCall(data);
					return;
				}

				if(data.responseCode!=undefined && data.responseCode != AJAX_RESULT_CODE.SUCCESS  ) {
					var msg = data.responseMessage;

					msg = msg.replace(/\\n/gi, "\n");

					// 렌탈전용상품이 아닙니다. 알럿 미노출 처리
					if("W0069" != data.responseCode) {
						alert(msg);
					}
					if(data.responseCode=='W0011'){
						$("#ktCertBtn").focus();
					}
					this.errorCall(data);
				} else {
					cfg.successCall(data);
				}

			}
		});
	};

	this.onCreate = function(){
	};

	this.eventInit = function(){
		//구매후기 작성 및 수정
		$(document).on("click","._btnReview",function(e){
			e.preventDefault();

			var url = $(this).attr("href");
			var ordrNo  = $(this).attr("ordrNo");
			var ordrTxnSeq =  $(this).attr("ordrTxnSeq");
			var prodNo =  $(this).attr("prodNo");
			var thisHref = $(this).attr("thisHref");
			that.nowHref = thisHref ;

			if (ordrTxnSeq == undefined) {
				ordrTxnSeq =0;
			}

			if (prodNo == undefined) {
				prodNo = "";
			}

			var varData = that.getSerializedData({
				ordrNo: ordrNo
				,ordrTxnSeq:ordrTxnSeq
				,prodNo:prodNo
			});

			controller.ajaxSend({
				cache:false
				,url:'/myOne/setMyOneNonMemSession.json'
				,data:varData
				,dataType:'json'
				,type:"post"
				,async:false
				, isOneBlock: true
				,successCall:function(jsonObj){
					url = url +"?"+varData ;

					popWin(url, "reViewPop", "550", "720", "yes");
				}
			});
		});
	};

	this.setProductsCode = function(prodCtgCd, petNm){
		var varData = that.getSerializedData({
			prodCtgCd: prodCtgCd
		});

		petNm = petNm.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#40;/g, '(')
		.replace(/&quot;/g, '"')
		.replace(/&#x27;/g, '\'')
		.replace(/&#x2F;/g, '/')
		.replace(/&#41;/g, ')');

		that.ajaxSend({
			cache:false
			,url:'/oneMinute/getCode.json'
			,data:varData
			,dataType:'json'
			,type:"post"
			,async:false
			,successCall:function(jsonObj){
				that.productsCode = jsonObj.cdBean.cdNm + ';' + petNm
			}
		});
	};

	this.enterToBr = function(str){
		var strReturn = "" ;
		strReturn = str.replace(/\n/g, "<br>").replace(/\\n/g, "<br>");
		return strReturn;
	};

	//null check
	this.nvl = function(s, s2) {
		var retStr = "";
		s = $.trim( s );
		if (s != null && s !== "") {
			retStr = s;
		} else {
			retStr = s2;
		}

		return retStr;
	};

	this.init = function() {
		that.$body = $('body');
		this.eventInit();
		this.onCreate();

		//숫자만 입력가능 (ex: <input type="text"  class="onlyNum" />)
		$(document).on("blur keyup", ".onlyNum", function() {
			$(this).val($(this).val().replace(/[^0-9]/gi,""));
		});

		// 영어, 숫자
		$(document).on("blur keyup",".onlyNumEng",function(event){
			var pattern =  /[^\sa-zA-Z0-9]/g;
			$(this).val( $(this).val().replace(pattern,"") );
		});

		// 완성형 한글, 영어 (ex: <input type="text"  class="nameRegular" />)
		$(".nameRegular").blur(function () {
			var pattern = /[^\s가-힝a-zA-Z]/g;
			if (pattern.test($(this).val())) {
				alert("완성된 한글, 영어만 입력가능합니다.");
				$(this).val($(this).val().replace(pattern,""));
				$(this).focus();
			 }
		});

		$(".korAndEn").blur(function () {
			var pattern = /[^\s가-힝a-zA-Z]/g;
			if (pattern.test($(this).val())) {
				$(this).val($(this).val().replace(pattern,""));
				$(this).focus();
			 }
		});

		if ($(".datepicker").length <= 0) {
		} else {
			if ($.isFunction($.datepicker)) {
				return;
			}

			$(".datepicker").datepicker({
				dateFormat: 'yy-mm-dd'
				, prevText: '이전달'
				, nextText: '다음달'
				, monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
				, dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
				, showMonthAfterYear: true
				, inline: true
			}).keydown(function (e) {
				var code = e.keyCode || e.which;

				// If key is not TAB
				if (code != '9') {
					// And arrow keys used "for performance on other keys"
					if (code == '37' || code == '38' || code == '39' || code == '40') {
						// Get current date
						var parts = $(this).val().split("-");
						var currentDate = new Date(parts[0], parts[1] - 1, parts[2]);
						// Show next/previous day/week
						switch (code) {
							// LEFT, -1 day
							case 37:
								currentDate.setDate(currentDate.getDate() - 1);
								break;
							// UP, -1 week
							case 38:
								currentDate.setDate(currentDate.getDate() - 7);
								break;
							// RIGHT, +1 day
							case 39:
								currentDate.setDate(currentDate.getDate() + 1);
								break;
							// DOWN, +1 week
							case 40:
								currentDate.setDate(currentDate.getDate() + 7);
								break;
						}

						// If result is ok then write it
						if (currentDate != null) {
							$(this).datepicker("setDate", currentDate);
						}
					} else { /*return false;*/

					} // If other keys pressed.. return false
				}
			})
		}

	};

	//우편번호에 하이픈추가
	this.addHyphenZip = function(zipCode) {
		if (zipCode != undefined && zipCode.length == 6) {
			return zipCode.substring(0,3)+"-"+zipCode.substring(3);
		} else {
			return zipCode;
		}
	};

	this.addCom = function (paramInt) {
		if (isNaN(paramInt)){
			return 0;
		}
		var reg = /(^[+-]?\d+)(\d{3})/;      // 정규식
		var rtnValue = paramInt + '';      // 숫자를 문자열로 변환

		while (reg.test(rtnValue)) {
			rtnValue = rtnValue.replace(reg, '$1' + ',' + '$2');
		}
		return rtnValue;
	};

	this.setMakePager = function($pageObj,pageInfoBean) {
		//페이징 처리

		var firstPageNo = pageInfoBean.firstPageNo;
		var firstPageNoOnPageList = pageInfoBean.firstPageNoOnPageList;
		var totalPageCount = pageInfoBean.totalPageCount;
		var pageSize = pageInfoBean.pageSize;
		var lastPageNoOnPageList = pageInfoBean.lastPageNoOnPageList;
		var currentPageNo = pageInfoBean.pageNo;
		var lastPageNo = pageInfoBean.lastPageNo;
		var arrHtml         = [];

		if(currentPageNo > 1) {
			arrHtml.push("<a href='javascript:void(0)' pageNo='"+firstPageNo+"' class='page' title='처음 페이지 바로가기' role='button'>&lt;&lt;</a> \n");
		} else {
			arrHtml.push("<a href='javascript:void(0)'  title='처음 페이지 바로가기' class='page' role='button'>&lt;&lt;</a> \n");
		}

		if(currentPageNo > 1 && totalPageCount > pageSize){
			if (firstPageNoOnPageList > pageSize) {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+(firstPageNoOnPageList - 1)+"' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
			} else {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+firstPageNo+"' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
			}
		}else {
			arrHtml.push("<a href='javascript:void(0)' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
		}

		for (var i = firstPageNoOnPageList; i <= lastPageNoOnPageList; ++i) {
			if (i == currentPageNo)
				arrHtml.push("<strong>"+i+"</strong>\n");
			else {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+i+"' role='button'>"+i+"</a>\n");
			}
		}

		if(lastPageNo > currentPageNo && totalPageCount > pageSize){
			if (lastPageNoOnPageList < totalPageCount) {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+(firstPageNoOnPageList + pageSize)+"' title='다음 10 페이지 바로가기' class='page' role='button'>&gt;</a>\n");

			} else {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+lastPageNo+"' title='다음 10 페이지 바로가기' class='page' role='button'>&gt;</a>\n");
			}
		} else {
			arrHtml.push("<a href='javascript:void(0)' title='다음 10 페이지 바로가기' class='page' role='button'>&gt;</a>\n");
		}

		if(lastPageNo > currentPageNo) {
			arrHtml.push("<a href='javascript:void(0)' pageNo='"+lastPageNo+"' title='마지막 페이지 바로가기' class='page' role='button'>&gt;&gt;</a>\n");
		} else {
			arrHtml.push("<a href='javascript:void(0)' title='마지막 페이지 바로가기' class='page' role='button'>&gt;&gt;</a>\n");
		}

		$pageObj.html(arrHtml.join(''));
	};

	this.setMakePagerWireFix = function($pageObj,pageInfoBean) {
		//유선사은품 개선 ver 페이징 처리

		var firstPageNo = pageInfoBean.firstPageNo;
		var firstPageNoOnPageList = pageInfoBean.firstPageNoOnPageList;
		var totalPageCount = pageInfoBean.totalPageCount;
		var pageSize = pageInfoBean.pageSize;
		var lastPageNoOnPageList = pageInfoBean.lastPageNoOnPageList;
		var currentPageNo = pageInfoBean.pageNo;
		var lastPageNo = pageInfoBean.lastPageNo;
		var arrHtml         = [];

		if(currentPageNo > 1) {
			arrHtml.push("<a href='javascript:void(0)' pageNo='"+firstPageNo+"' class='page' title='처음 페이지 바로가기' role='button'>&lt;&lt;</a> \n");
		} else {
			arrHtml.push("<a href='javascript:void(0)'  title='처음 페이지 바로가기' class='page' role='button'>&lt;&lt;</a> \n");
		}

		for (var i = firstPageNoOnPageList; i <= lastPageNoOnPageList; ++i) {
			if (i == currentPageNo)
				arrHtml.push("<strong>"+i+"</strong>\n");
			else {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+i+"' role='button'>"+i+"</a>\n");
			}
		}

		if(lastPageNo > currentPageNo) {
			arrHtml.push("<a href='javascript:void(0)' pageNo='"+lastPageNo+"' title='마지막 페이지 바로가기' class='page' role='button'>&gt;&gt;</a>\n");
		} else {
			arrHtml.push("<a href='javascript:void(0)' title='마지막 페이지 바로가기'  class='page' role='button'>&gt;&gt;</a>\n");
		}

		$pageObj.html(arrHtml.join(''));
	};

	this.setMakeFunctionPager = function($pageObj,pageInfoBean,fNm) {
		//페이징 처리
		var firstPageNo = pageInfoBean.firstPageNo;
		var firstPageNoOnPageList = pageInfoBean.firstPageNoOnPageList;
		var totalPageCount = pageInfoBean.totalPageCount;
		var pageSize = pageInfoBean.pageSize;
		var lastPageNoOnPageList = pageInfoBean.lastPageNoOnPageList;
		var currentPageNo = pageInfoBean.pageNo;
		var lastPageNo = pageInfoBean.lastPageNo;
		var arrHtml         = [];
		var isFunction = true;
		if(typeof fNm == 'undefined') {
			isFunction = false;
		}

		if(currentPageNo > 1) {
			if(isFunction) {
				arrHtml.push("<a href='javascript:"+fNm+"("+firstPageNo+");' class='page' title='처음 페이지 바로가기' role='button'>&lt;&lt;</a> \n");
			} else {
				arrHtml.push("<a href='javascript:void(0);' pageNo='"+firstPageNo+"' class='page' title='처음 페이지 바로가기' role='button'>&lt;&lt;</a> \n");
			}

		} else {
//		    arrHtml.push("<a href='javascript:void(0)'  title='처음 페이지 바로가기' class='page'>&lt;&lt;</a> \n");
		}

		if(currentPageNo > 1 && totalPageCount > pageSize){
			if (firstPageNoOnPageList > pageSize) {
				if(isFunction) {
					arrHtml.push("<a href='javascript:"+fNm+"("+(firstPageNoOnPageList - 1)+");' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
				} else {
					arrHtml.push("<a href='javascript:void(0);' pageNo='"+(firstPageNoOnPageList - 1)+"' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
				}
			} else {
				if(isFunction) {
					arrHtml.push("<a href='javascript:"+fNm+"("+firstPageNo+");' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
				} else {
					arrHtml.push("<a href='javascript:void(0);' pageNo='"+firstPageNo+"' title='이전 10 페이지 바로가기' class='page' role='button'>&lt;</a>\n");
				}
			}
		}else {
//		    arrHtml.push("<a href='javascript:void(0)' title='이전 10 페이지 바로가기' class='page'>&lt;</a>\n");
		}

		for (var i = firstPageNoOnPageList; i <= lastPageNoOnPageList; ++i) {
			if (i == currentPageNo)
				arrHtml.push("<strong>"+i+"</strong>\n");
			else {
				if(isFunction) {
					arrHtml.push("<a href='javascript:"+fNm+"("+i+");' role='button'>"+i+"</a>\n");
				} else {
					arrHtml.push("<a href='javascript:void(0)' pageNo='"+i+"' role='button'>"+i+"</a>\n");
				}
			}
		}

		if(lastPageNo > currentPageNo && totalPageCount > pageSize){
			if (lastPageNoOnPageList < totalPageCount) {
				if(isFunction) {
					arrHtml.push("<a href='javascript:"+fNm+"("+(firstPageNoOnPageList + pageSize)+");' title='다음 10 페이지 바로가기' class='page' role='button'>&gt;</a>\n");
				} else {
					arrHtml.push("<a href='javascript:void(0)' pageNo='"+(firstPageNoOnPageList + pageSize)+"' title='다음 10 페이지 바로가기' class='page' role='button'>&gt;</a>\n");
				}
			} else {
				if(isFunction) {
					arrHtml.push("<a href='javascript:"+fNm+"("+lastPageNo+");' title='다음 10 페이지 바로가기'' class='page' role='button'>&gt;</a>\n");
				} else {
					arrHtml.push("<a href='javascript:void(0)' pageNo='"+lastPageNo+" title='다음 10 페이지 바로가기'' class='page' role='button'>&gt;</a>\n");
				}
			}
		} else {
			arrHtml.push("<a href='javascript:void(0)' title='다음 10 페이지 바로가기' class='page' role='button' style='display:none;'>&gt;</a>\n");
		}

		if(lastPageNo > currentPageNo) {
			if(isFunction) {
				arrHtml.push("<a href='javascript:"+fNm+"("+lastPageNo+");' title='마지막 페이지 바로가기' class='page' role='button'>&gt;&gt;</a>\n");
			} else {
				arrHtml.push("<a href='javascript:void(0)' pageNo='"+lastPageNo+"' title='마지막 페이지 바로가기' class='page' role='button'>&gt;&gt;</a>\n");
			}
		} else {
//		    arrHtml.push("<a href='javascript:void(0)' title='마지막 페이지 바로가기'  class='page'>&gt;&gt;</a>\n");
		}

		$pageObj.html(arrHtml.join(''));
	};

	this.getStarPercent = function(averagePoint){
		if (undefined == averagePoint) {
			return '0';
		}

		/**
		 * 소수점 처리 기준
		 * 무조건 0.5 기준으로 올림
		 * 예) 4.1 ==> 4.5 ,4.6==> 5
		 * 별 5개 100% , 4개반 90% , 4개 80% .....
		 */
		var rtnStarPercent  = averagePoint *  2   ;
		rtnStarPercent = Math.ceil(rtnStarPercent)  * 10;
		return rtnStarPercent ;
	};

	$(".offerOrder >a").on("mouseenter", function() {
		$(this).next().show();
	}).on("mouseleave", function() {
		$(this).next().hide();
	});

	$(".offerOrder >a").on("focusin", function() {
		$(this).next().show();
	}).on("focusout", function() {
		$(this).next().hide();
	});

	}
});

//모바일 주소검색
function mWirelessZipSearch(selector, pageType, pageTitle, addrSvcType, limitType, callGbn) {
	var url = mZipCommon(selector, pageType, pageTitle, addrSvcType, limitType);
	url = url+"&callGbn="+callGbn;
	$(selector).load(url);
}
function mZipSearch(selector, pageType, pageTitle, addrSvcType, limitType) {
	var url = mZipCommon(selector, pageType, pageTitle, addrSvcType, limitType);
	$(selector).load(url);
}

// 동시주문 주소검색
function mUniteZipSearch(selector, pageType, pageTitle, addrSvcType, limitType, callGbn, totalAddrText) {
	var url = mZipCommon(selector, pageType, pageTitle, addrSvcType, limitType);
	url = url+"&callGbn="+callGbn+"&totalAddrText="+totalAddrText;
	$(selector).load(url);
}

function mZipCommon(selector, pageType, pageTitle, addrSvcType, limitType) {
	//주소 검색을 한페이지에서 여러군데서 사용할경우 기존 로드한 html 삭제
	if ($("#zipSearchPage").length > 0) {
		$("#zipSearchPage").remove();
	}

	var url = "/m/common/zipCodeView.do?pageType="+ pageType+"&pageTitle="+pageTitle+"&addrSvcType="+addrSvcType+"&limitType="+limitType;
	return url;
}


function zipSearch(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText,limitType) {
	zipSearchCallBack(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText, "","N",limitType);
}

function zipSearchLayer(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText,limitType) {
	zipSearchCallBack(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText, "","Y",limitType);
}

function wirelessZipSearch(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText,limitType,callGbn,totalAddrText) {
	zipSearchCallBack(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText, "","N",limitType,callGbn,totalAddrText);
}

function wirelessZipSearch2(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText,limitType,callGbn,totalAddrText,callBackFunction) {
	zipSearchCallBack(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText, callBackFunction,"N",limitType,callGbn,totalAddrText);
}

//결과 확인 후 호출될 function명 파라미터 추가
function zipSearchCallBack(searchType,zipCd,addText,addDtlText,fulladdrText,searchTypeText, callBackFunction, layerYnText,limitType, callGbn, totalAddrText) {
	 var params = controller.getSerializedData({
		 searchType : searchType,
		 zipCd : zipCd,
		 addText : addText,
		 addDtlText : addDtlText,
		 fulladdrText : fulladdrText,
		 searchTypeText : searchTypeText,
		 callBackFunction : callBackFunction,
		 layerYn : layerYnText,
		 limitType : limitType,
		 callGbn : callGbn,
		 totalAddrText : totalAddrText
	 });

	 var strUrl = "/common/zipCodePopView.do?"+params ;

	 if(layerYnText == 'Y'){
		 $(this).layerWrap({
			 src : strUrl,
			 id : "zipSearchLayer",
			 width : 650,
			 height : "100%",
			 iframe : "yes",
			 pos : "fixed",
			 auto : "nClick",
			 pad:"yes",
			 top:"30",
			 left:"30",
			 right:"30",
			 bottom:"30"
		 });
	 }else{
		//160513 도로명주소개선 popWin(strUrl,'zipCodeSearch','550','550','yes');
		popWin(strUrl,'zipCodeSearch','690','450','yes');
	 }
}


Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";
	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;
	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

String.prototype.contains = function(element){
	var length = this.length;
	for(var i = 0; i < length; i++){
		if(this[i] == element){
			return true;
		}
	}
	return false;
};

/************************************************************************
함수명 : fn_check_app
설 명  : 앱에서 접근여부 확인
************************************************************************/
function fn_check_app() {
	if( document.cookie.indexOf("os") != -1 )
	{
		// 값을 얻어내기 위해 시작 인덱스 조절
		var startIndex = document.cookie.indexOf("os") + 2;
		// 값을 얻어내기 위해 종료 인덱스 추출
		var endIndex = document.cookie.indexOf( ";", startIndex );
		// 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
		if( endIndex == -1) endIndex = cookie.length;
		// 쿠키값을 추출하여 리턴
		var cookieVal =  unescape(document.cookie.substring( startIndex + 1, endIndex ) );
		if(cookieVal!= null && (cookieVal == "OS001" || cookieVal == "OS002" || cookieVal == "OS003" || cookieVal == "OS004" || cookieVal == "OS005")){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

/** 내림차순 정렬(문자) */
function compSringReverse(a, b) {
	if(a > b) return -1;
	if(b > a) return 1;
	return 0;
}


/** 문자열 앞,뒤 \n 제거 */
function brTrim(str) {
	return trimToReg(trimToReg(str, "\n"), "\\n");
};


/** {str} 앞,뒤 {reg} 제거 */
function trimToReg(str, reg) {

	var strTemp = "" ;
	var stStop = false;
	var fnStop = false;

	if (str == null || str == "" || reg == null || reg == "") {
		return strTemp;
	} else {
		strTemp = str.trim();
	}

	if (strTemp.length < reg.length) {
		return strTemp;
	}

	if (strTemp.indexOf(reg) < 0) {
		return strTemp;
	}

	if (strTemp.indexOf(reg) == 0) {
		strTemp = strTemp.substring(reg.length);
	} else {
		stStop = true;
	}

	if (strTemp.lastIndexOf(reg) == (strTemp.length-reg.length)) {
		strTemp = strTemp.substring(0, strTemp.lastIndexOf(reg));
	} else {
		fnStop = true;
	}

	if (stStop && fnStop) {
		return strTemp;
	} else {
		return trimToReg(strTemp, reg);
	}

};


//온라인마케팅시스템 반응로그 - 단일 오퍼일경우 호출
function fnOnmasClick(eventFn) {
	var caVal1 = $("input[name=offerCaVal1]").val();
	var caVal2 = $("input[name=offerCaVal2]").val();
	var caVal3 = $("input[name=offerCaVal3]").val();
	var html = $("input[name=offerHtml]").val();
	var offerDivCd = $("input[name=offerDivCd]").val();
	var statCd = $("input[name=offerStatCd]").val();
	return onmasClickEvent("", caVal1, caVal2, caVal3, eventFn, statCd, offerDivCd);
}

//온라인마케팅시스템 화면로그 - 단일 오퍼일경우 호출
function fnOnmasView() {
	var caVal1 = $("input[name=offerCaVal1]").val();
	var caVal2 = $("input[name=offerCaVal2]").val();
	var caVal3 = $("input[name=offerCaVal3]").val();
	var html = $("input[name=offerHtml]").val();
	var offerDivCd = $("input[name=offerDivCd]").val();
	return onmasViewEvent("", caVal1, caVal2, caVal3, offerDivCd);
}

//온라인마케팅시스템 반응로그 - 화면
function onmasViewEvent(otMuCd, caVal1, caVal2, caVal3, offerDivCd){

	try {
		var chkFn = function (str) {
			if (str == undefined || str == null || str == '') {
				return false;
			}
			return true;
		}

		var muCd = "";
		if (chkFn(otMuCd)) {
			muCd = otMuCd;
		} else {
			try {
				muCd = o.m.muCd
			} catch(e) {

			}
		}

		if (!chkFn(muCd) || !chkFn(caVal1) || !chkFn(caVal2) || !chkFn(caVal3) || !chkFn(offerDivCd)) {
			return;
		}

		if ("DF" == offerDivCd.substring(0,2) || "DL" == offerDivCd.substring(0,2)) {
			return;
		}

		ot.m.muCd = muCd;
		trgt.campaignViewLog(caVal1, caVal2, caVal3);
	} catch(e) {

	}
}

//온라인마케팅시스템 반응로그 - 클릭
function onmasClickEvent(otMuCd, caVal1, caVal2, caVal3, clickType, statCd, offerDivCd){

	try {
		var chkFn = function (str) {
			if (str == undefined || str == null || str == '') {
				return false;
			}
			return true;
		}

		var muCd = "";
		if (chkFn(otMuCd)) {
			muCd = otMuCd;
		} else {
			try {
				muCd = o.m.muCd
			} catch(e) {

			}
		}

		if (!chkFn(muCd) || !chkFn(caVal1) || !chkFn(caVal2) || !chkFn(caVal3) || !chkFn(clickType) || !chkFn(statCd) || !chkFn(offerDivCd)) {
			return;
		}

		if ("DF" == offerDivCd.substring(0,2) || "DL" == offerDivCd.substring(0,2)) {
			return;
		}

		ot.m.muCd = muCd;
		trgt.campaignClickLog(caVal1, caVal2, caVal3, clickType, statCd);
	} catch(e) {

	}
}

//주민등록번호로 나이 계산하기
function getAgeByRrn(rrn, toDay){
	var age = 0;
	if(rrn == "" || rrn.length != 13){
		return age;
	}else{
		var toYear = parseInt(toDay.substring(0, 4)); // 현재 년도
		var toMonth = parseInt(toDay.substring(4, 6)); // 현재 월
		var toDate = parseInt(toDay.substring(6, 8)); // 현재 날짜
		var rrnYear = parseInt(rrn.substring(0, 2)); // 생일 년
		var rrnMonth = parseInt(rrn.substring(2, 4)); // 생일 월
		var rrnDate = parseInt(rrn.substring(4, 6)); // 생일 날짜

		var toAgeMonth = 0; // 나이 월
		var toAgeDate = 0; // 나이 날짜
		// 월의 마지막 날짜 계산
		var yyyy = toDay.substring(0, 4);
		var mm = toDay.substring(4, 6);
		var dd = "";
		if (mm=="01" || mm=="03"|| mm=="05" || mm=="07" || mm=="08" || mm=="10" || mm=="12") {
			dd = "31";
		} else if (mm=="02") {
			if ((parseFloat(yyyy) / 4) == (parseInt(yyyy) / 4)) {
				if ((parseFloat(yyyy) / 100) == (parseInt(yyyy) / 100)) {
					if ((parseFloat(yyyy) / 400) == (parseInt(yyyy) / 400)) {
						dd = "29";
					} else {
						dd = "28";
					}
				} else {
					dd = "29";
				}
			} else {
				dd = "28";
			}
		} else {
			dd = "30";
		}
		var intDd = parseInt(dd);

		// 년도 붙이기
		if (parseInt(rrn.substring(6, 7)) == 1 || parseInt(rrn.substring(6, 7)) == 2) {
			rrnYear = 1900 + rrnYear;
		} else if (parseInt(rrn.substring(6, 7)) == 3 || parseInt(rrn.substring(6, 7)) == 4) {
			rrnYear = 2000 + rrnYear;
		}

		// 나이 날짜 계산
		if (toDate < rrnDate) {
			toAgeDate = (toDate + intDd) - rrnDate;
			toMonth = toMonth - 1;
		} else {
			toAgeDate = toDate - rrnDate;
		}
		// 나이 월 계산
		if (toMonth < rrnMonth) {
			toAgeMonth = (toMonth + 12) - rrnMonth;
			toYear = toYear - 1;
		} else {
			toAgeMonth = toMonth - rrnMonth;
		}
		// 나이 년도 계산
		age = toYear - rrnYear;

	}
	return age;
}

/** RSA getEncData */
function getRsaEncData(data) {
	if (!data) {
		return "";
	}
	var resultData = "";
	try {
		if (rsaObj == null || rsaObj == "") {
			var publicKeyModulus = $("#publicKeyModulus").val();
			var publicKeyExponent = $("#publicKeyExponent").val();
			if (publicKeyModulus != null && publicKeyModulus != "" && publicKeyExponent != null && publicKeyExponent != "") {
				rsaObj = new RSAKey();
				rsaObj.setPublic(publicKeyModulus, publicKeyExponent);
				resultData = rsaObj.encrypt(data);
			} else {
				resultData = data;
			}
		} else {
			resultData = rsaObj.encrypt(data);
		}
	} catch (e) {
		rsaObj = null;
		resultData = data;
	}
	return resultData;
}

//자급제폰 개통 5G 요금제 여부
function is5GPplBln(pplGroupDivCd){
	if(pplGroupDivCd == '92' //슈퍼플랜
			|| pplGroupDivCd == '93' //5G 슬림
			|| pplGroupDivCd == '40' //5G요금제[개발]
		){
		return true;
	}
	return false;
}

function srcInsertText(src, insertNum, targetSrc){
	var rtnSrc = "";

	if(src.length > 0){
		for(var i=1; i<=src.length; i++){
			rtnSrc += src.charAt(i-1);
			if((i % Number(insertNum)) == 0){
				rtnSrc += targetSrc;
			}
		}
	}
	return rtnSrc;
}

// jQuery 확장 - form parameter 를 json object 로 반환
jQuery.fn.serializeFormJson = function() {
	var rtnObj = {};
	try {
		if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
			var arrFormData = this.serializeArray();
			if(arrFormData) {
				jQuery.each(arrFormData, function() {
					if(rtnObj.hasOwnProperty(this.name)) {
						rtnObj[this.name] += ("," + this.value);
					} else {
						rtnObj[this.name] = this.value;
					}
				});
			}
		}
	} catch(e) {
		alert(e);
	} finally {}
	return rtnObj;
};

jQuery.loadBlock = function(){
	if($("#loading").length > 0) return;
    $("body").prepend('<div id="loading" style="left:0; top:0; z-index:999999999"><img src="/images/pc/common/loading_img.gif" alt="로딩중"/></div>');
};

jQuery.loadUnBlock = function(){
    setTimeout(function() {
    	$("#loading").remove();
    }, 200);
};

function loadOneBlock(){
	if($("#oneLoading").length > 0) return;
    $("body").prepend('<div id="oneLoading"><span class="blind">잠시만 기다려주세요.</span></div>');
};

function loadOneUnBlock(){
    setTimeout(function() {
    	$("#oneLoading").remove();
    }, 200);
};

function getUserDevice() {
	var device = "PC";
	var arrMobile = [   'iphone'		, 'ipad'			, 'android'		, 'windows ce'	, 'blackberry'
		                 , 'symbian'	, 'windows phone'	, 'webos'		, 'opera mini'	, 'opera mobi'
		                 , 'polaris'	, 'iemobile'		, 'lgtelecom'	, 'nokia'		, 'sonyericsson'
		                 , 'samsung'
		               ];
	for (var i = 0; i < arrMobile.length; i++) {
		if(navigator.userAgent.toLowerCase().match(arrMobile[i]) != null ) {
			device = "MOBILE";
			break;
		}
	}
	return device;
}

function getUserDeviceOne() {
	var device = "^www^Shop^";
	var arrMobile = [   'iphone'		, 'ipad'			, 'android'		, 'windows ce'	, 'blackberry'
		                 , 'symbian'	, 'windows phone'	, 'webos'		, 'opera mini'	, 'opera mobi'
		                 , 'polaris'	, 'iemobile'		, 'lgtelecom'	, 'nokia'		, 'sonyericsson'
		                 , 'samsung'
		               ];
	for (var i = 0; i < arrMobile.length; i++) {
		if(navigator.userAgent.toLowerCase().match(arrMobile[i]) != null ) {
			device = "^m^molleh^Shop^";
			break;
		}
	}
	return device;
}
function getUserDeviceBtn() {
	var device = "Shop";
	var arrMobile = [   'iphone'		, 'ipad'			, 'android'		, 'windows ce'	, 'blackberry'
		                 , 'symbian'	, 'windows phone'	, 'webos'		, 'opera mini'	, 'opera mobi'
		                 , 'polaris'	, 'iemobile'		, 'lgtelecom'	, 'nokia'		, 'sonyericsson'
		                 , 'samsung'
		               ];
	for (var i = 0; i < arrMobile.length; i++) {
		if(navigator.userAgent.toLowerCase().match(arrMobile[i]) != null ) {
			device = "mShop";
			break;
		}
	}
	return device;
}
function getShowChDivCd() {
	return (getUserDevice() == 'PC') ? '01' : '02';
}
var omoDevice = getUserDevice();

//구매후기 작성후 colse 호출
var colseCallFunction = function() {

}

