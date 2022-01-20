VALIDATE_NOT_EMPTY_MSG = {};
VALIDATE_NOT_EMPTY_MSG.custNm = "이름을 입력하여 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.custPhone = "핸드폰번호를 입력하여 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.captchaInSession = "보안문자를 입력해 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.smsAuthNo = "인증번호를 입력해 주시기 바랍니다.";

VALIDATE_NUMBER_MSG = {};
VALIDATE_NUMBER_MSG.custPhone = "핸드폰번호를 숫자로 입력해 주시기 바랍니다.";
VALIDATE_NUMBER_MSG.captchaInSession = "보안문자를 숫자로 입력해 주시기 바랍니다.";
VALIDATE_NUMBER_MSG.smsAuthNo = "인증번호를 숫자로 입력해 주시기 바랍니다.";

VALIDATE_FIX_MSG = {};
VALIDATE_FIX_MSG.custPhone = "전화번호를 10자리 이상 숫자로 입력해 주시기 바랍니다.";
VALIDATE_FIX_MSG.captchaInSession = "보안문자를 6자리 숫자로 입력해 주시기 바랍니다.";
VALIDATE_FIX_MSG.smsAuthNo = "인증번호를 6자리 숫자로 입력해 주시기 바랍니다.";


$(document).ready(function(){
	controller.init();

	//인증번호 받기 활성화/비활성화
	$('#certification input[type=text], #certification input[type=tel]').on('keyup',function(){
		if($('#custNm').val().length > 0 && $('#custPhone').val().length >= 11 && $('#captchaInSession').val().length == 6){
			$('#btn-cert-call').prop('disabled',false)
		}else{
			$('#btn-cert-call').prop('disabled',true)
		}

	});

});

var controller = $.extend(new $.myDirectCommonObj(), {
	onCreate: function () {
		$('.period button').on('click', function(){
			$('.period button').removeClass('active');
			$(this).addClass('active');
		});
		//주문내역조회 추가
		if ($("#inqOrdrHistory").val() == "Y") {
			$("div.period > div.btn-wrap").find("button.active").click();
		}
		//주문상세내역조회
		//$('button.detail').on('click', function(){
		$(document).on('click','.arrow',function(){
			orderHist.getDtl($(this).data("ordrNo"));
		});

		//인증번호 받기
		$('#btn-cert-call').on('click',function(){
			orderHist.callAuthSMS();
	    });

		//인증번호 확인
		$('#btn-cert-send').on('click',function(){
			orderHist.checkAuthSMS();
		});


	}
});

var orderHist = {
	pageNo : 1
	, recordCount : 5
	, getList : function (pageNo) {

		orderHist.pageNo = pageNo;

		var startDate = $("input[type='date'].sOrdrRcpDt").val().replace(/-/gi, "");
		var endDate = $("input[type='date'].eOrdrRcpDt").val().replace(/-/gi, "");

		if (startDate.length != 8) {
			alert('잘못된 날짜 형식입니다.\n조회 시작일을 확인해 주세요.');
			$("input[type='date'].sOrdrRcpDt").focus();
			return false;
		} else  if (parseInt(startDate.substring(4, 6)) > 12) {
			alert('잘못된 날짜 형식입니다.\n조회 시작일을 확인해 주세요.');
			$("input[type='date'].sOrdrRcpDt").focus();
			return false;

		} else  if (parseInt(startDate.substring(6, 8)) > 31) {
			alert('잘못된 날짜 형식입니다.\n조회 시작일을 확인해 주세요.');
			$("input[type='date'].sOrdrRcpDt").focus();
			return false;

		}

		if (endDate.length != 8) {
			alert('잘못된 날짜 형식입니다.\n조회 완료일을 확인해 주세요.');
			$("input[type='date'].sOrdrRcpDt").focus();
			return false;
		} else  if (parseInt(endDate.substring(4, 6)) > 12) {
			alert('잘못된 날짜 형식입니다.\n조회 완료일을 확인해 주세요.');
			$("input[type='date'].sOrdrRcpDt").focus();
			return false;

		} else  if (parseInt(endDate.substring(6, 8)) > 31) {
			alert('잘못된 날짜 형식입니다.\n조회 완료일을 확인해 주세요.');
			$("input[type='date'].sOrdrRcpDt").focus();
			return false;

		}

		var inqEndDate = new Date(endDate.substring(0, 4), Number(endDate.substring(4, 6)) - 1, endDate.substring(6, 8));
		var standDate = new Date(inqEndDate.getFullYear(), inqEndDate.getMonth() - 3, inqEndDate.getDate());
		var inqStandDate = "" + standDate.getFullYear() + orderHist.addZero(standDate.getMonth() + 1) + orderHist.addZero(standDate.getDate());

		if (Number(inqStandDate) > Number(startDate)) {
			alert('조회 가능한 일수는 최대 3개월 전까지 가능합니다.');
			return false;
		}

		if (Number(startDate) > Number(endDate)) {
			alert("조회 시작일이 완료일 이후가 될수 없습니다.\n조회기간을 확인 하여 주시기 바랍니다. ");
			return false;
		}

		var varData = orderHist.getData();

		controller.ajaxSend({
			cache:false
			,url:'/mydirect/myDirectList.json'
				,data:varData
				,dataType:'json'
					,async:false
					,successCall:function(jsonObj){

						var pageInfo = jsonObj.pageInfo
						if (pageInfo.pageNo == 1) {
							$("#orderHistory").empty();
						}

						orderList = jsonObj.orderList;
						if (orderList == undefined || orderList == null || orderList.length == 0) {
							$("#orderHistory").html('<p class="no-item">주문/신청 내역이 없습니다.</p>');
						} else {
							orderHist.makeRow(jsonObj);
							controller.addBtnEvent();
						}

						$(".order-period-info .num").html('(' + pageInfo.totalCount + ')');
						$(".order-period-info .date").html(jsonObj.startDate.replace(/-/gi, ".") + "~" + jsonObj.endDate.replace(/-/gi, "."));

						if (orderHist.pageNo < pageInfo.totalPageCount) {
							$("#moreOrderHistory").show();
						} else {
							$("#moreOrderHistory").hide();
						}
					}
		});

	}
	, makeRow : function (jsonObj) {
		var orderList = jsonObj.orderList
		var listHtml = '';

		for (var i = 0 ; i < orderList.length ; i++) {
			listHtml += orderHist.makeAgncyRow(orderList[i]);
		}

		$("#orderHistory").append(listHtml);
	}
	, makeAgncyRow : function (order) {

		var openReqTxn = controller.nvl(order.openReqTxnBean);
		var orderTxn = order.ordrTxnBeanList[0];
		var prodImgAdmTxn = orderTxn.prodImgAdmTxnBean;
		var selfOrdrTxnBean = order.selfOrdrTxnBean;
		var vndr = orderTxn.vndrBasBean;
		var wlessOrdrTxnBean = orderTxn.wlessOrdrTxnBean;
		var dlvrTxnBean = orderTxn.dlvrTxnBean;
		var affiliateCorpCdName = controller.nvl(orderTxn.affiliateCorpCdName);
		var affiliatePackAmt = controller.nvl(orderTxn.affiliatePackAmt);
		var reviewBtn = "N";
		var pplId = wlessOrdrTxnBean.pplId;
		var vanIdList = new Array();
		if (wlessOrdrTxnBean.userType != null && wlessOrdrTxnBean.userType != "") {
			userType = wlessOrdrTxnBean.userType;
		}

		var isShow = true;
		if (selfOrdrTxnBean != null && selfOrdrTxnBean != undefined && orderTxn.ordrTxnSttusCd != '06' && orderTxn.ordrTxnSttusCd != '08') {
			if (selfOrdrTxnBean.selfOpnYn == 'Y') {
				isShow = false;
			} else if (wlessOrdrTxnBean.opnYn == 'Y' && selfOrdrTxnBean.semiSelfChgYn == 'Y') {
				isShow = false;
			}
		}

		var showChDivCd = orderTxn.showChDivCd;
		var bf = new Array();
		bf.push('<div class="date">' + new Date(order.ordrRcpDt).format('yyyy.MM.dd') + '</div>');
		bf.push('<div class="round-box order-detail">');
		bf.push('	<p>');
		if('0801' != wlessOrdrTxnBean.pplId && '0800' != wlessOrdrTxnBean.pplId){
			bf.push('		<span>주문번호</span>');
		}else{
			bf.push('		<span>신청번호</span>');
		}
		bf.push('		<strong><button type="button" name="arrow" class="text-red ui-popup-call detail arrow" data-target="#detail" data-ordr-no="' + order.ordrNo + '">' + order.ordrNo + '</button></strong>');
		bf.push('	</p>');
		bf.push('	<div class="detial-box">');
		bf.push('		<div class="plan-image">');
		bf.push('			<span>' + wlessOrdrTxnBean.pplNm + '</span>');
		bf.push('			<div class="price">월 <strong>' + controller.addCom(wlessOrdrTxnBean.monthBasPayAmt-(wlessOrdrTxnBean.monthBasPayAmt%10)) + '</strong>원</div>');
		bf.push('		</div>');

		if(30 > order.custAge) {
			bf.push('		<div class="plan-sale">');
			bf.push('			<span class="tit">요금제 할인 내역</span>');
			bf.push('			<ul class="depth2">');
			bf.push('				<li>');
			bf.push('					<span class="sale-txt">Y고객 추가 할인</span>');
			bf.push('					<strong class="sale-price">-5,500원</strong>');
			bf.push('				</li>');
			bf.push('			</ul>');
			bf.push('		</div>');
		}
		if(affiliateCorpCdName != "") {
			bf.push('		<div class="plan-image">');
			bf.push('			<span> KT 다이렉트 쿠폰팩 <a href="#popup-couponguide2" class="ui-popup-call tooltip-pop" data-target="#popup-couponguide2" title="새창열림" role="button">유의사항</a></span>');
			bf.push('			<div class="price"> ' + affiliateCorpCdName + ' (월 ' + controller.addCom(affiliatePackAmt) + '원)</div>');
			bf.push('		</div>');
			bf.push('<div id="popup-couponguide2" class="ui-popup toast-popup popup-couponguide">');
			bf.push('	<div class="content">');
			bf.push('		<div class="header">제휴쿠폰 이용안내</div>');
			bf.push('		<button type="button" class="btn-close">닫기</button>');
			bf.push('		<div class="body">');
			bf.push('			<ul class="jum-list">');
			bf.push('				<li> 선택하신 요금제에 따라 혜택 금액은 달라지며 개통월기준 2달 후(요금납부 확인 후) 개통연락처로 쿠폰이 제공됩니다. </li> ');
			bf.push('				<li> 쿠폰은 약정기간 중 매월 1회 제공되며 제공된 쿠폰은 재발행되지 않습니다. </li> ');
			bf.push('				<li> 약정기간 중 요금제 변경의 경우 변경된 요금기준으로 쿠폰 금액이 변경, 발행됩니다. </li> <li> 쿠폰 변경은 3월, 6월, 9월, 12월 변경기간내에서 만 가능하며 변경 기간은 쿠폰 문자 발송 시 안내예정 입니다. </li> ');
			bf.push('				<li> 쿠폰 발행 연락처는 변경할 수 없습니다.(최초 개통 연락처로 약정기간 중 발행됩니다.) </li> ');
			bf.push('				<li> 발행된 쿠폰의 유효기간은 매달 말일까지 사용가능하며 미사용 시 소멸됩니다. (쿠폰 발행 시 유효기간이 안내되어 있으니 꼭 확인하시기 바랍니다.) </li> ');
			bf.push('				<li> 쿠폰은 요금납부 확인 후 매달 5일 발행될 예정입 니다. </li> ');
			bf.push('				<li> 발행된 쿠폰은 타인에게 양도 불가합니다. </li> ');
			bf.push('				<li> 쿠폰 분실 시 재발행은 불가합니다. </li> ');
			bf.push('			</ul>');
			bf.push('		</div>');
			bf.push('		<div class="btn-bottom">');
			bf.push('			<button type="button" name="button" class="btn fill bottom btn-close" id="">확인</button>');
			bf.push('		</div>');
			bf.push('	</div>');
			bf.push('</div>');
		}

		if (isShow) {
			bf.push('		<div class="cancel">');
			var status = orderTxn.ordrTxnSttusCd;
			var statusObj = controller.getDataObject()[status];
			var isTxt = statusObj.txt;
			var dlvrTxnBean = orderTxn.dlvrTxnBean;
			var dlvrSeq = "0";
			var duSimGbnCd=wlessOrdrTxnBean.duSimGbnCd;
			var semiSelfChgYn= order.semiSelfChgYn;
			if (null != dlvrTxnBean) {
				dlvrSeq = dlvrTxnBean.dlvrSeq;
			}
			if('14'==status && 'U'==duSimGbnCd && 'N'==semiSelfChgYn){
				bf.push('			<span>개통완료</span>');
			}else if('14'==status && ('0801' == wlessOrdrTxnBean.pplId || '0800' == wlessOrdrTxnBean.pplId)){
				if('Y'==semiSelfChgYn){
					bf.push('			<span>접수완료(연락예정)</span>');
				}else{
					bf.push('			<span>개통완료</span>');
				}

			}else{
				bf.push('			<span>' + isTxt + '</span>');
			}

			if (controller.hasStatusBtn(orderTxn.ordrTxnSttusCd) != '') {
				var hasProdEvlTxn = controller.isNotEmpty(orderTxn.prodEvlTxnBean);
				if ((selfOrdrTxnBean == null || (orderTxn.ordrTxnSttusCd != '01' && orderTxn.ordrTxnSttusCd != '09')) && isShow) {
					bf.push(controller.getStatusBtn({
						obj : orderTxn,
						orderObj : order,
						vanIdList : vanIdList,
						openReqTxn : openReqTxn,
						hasProdEvlTxn : hasProdEvlTxn,
						rsrvProdYn : orderTxn.rsrvProdYn
					}));
				}
			}
			bf.push('		</div>');
		}
		bf.push('	</div>');
		bf.push('</div>');
		return bf.join('');
	}
	, getDtl : function (ordrNo) {
		if (ordrNo == null || ordrNo == "") {
			return;
		}

		var varData = orderHist.getData();
		varData = varData + "&ordrNo=" + ordrNo;

		controller.ajaxSend({
			cache:false
			,url:'/mydirect/orderView.json'
				,data:varData
				,dataType:'json'
					,async:false
					,successCall:function(jsonObj){
						orderHist.makeDtl(jsonObj);
						controller.addBtnEvent();
					}
		});
	}
	, makeDtl : function (jsonObj) {

		var openReqTxn       = controller.nvl(jsonObj.openReqTxnBean);
		var orderBasInfo     = jsonObj.orderBasInfo;
		var orderTxnList     = jsonObj.orderTxnList;
		var orderTxn         = jsonObj.orderTxnList[0];
		var dlvznTxnInfo     = jsonObj.dlvznTxnInfo;
		var prodImgAdmTxn    = orderTxn.prodImgAdmTxnBean;
		var wlessOrdrTxnBean = orderTxn.wlessOrdrTxnBean;
		var affiliateCorpCdName = controller.nvl(orderTxn.affiliateCorpCdName);
		var affiliatePackAmt = controller.nvl(orderTxn.affiliatePackAmt);
		var selfOrdrTxnBean  = orderBasInfo.selfOrdrTxnBean;
		var custAplsh		 = jsonObj.custAplsh;
		var vanIdList        = new Array();

		var isShow = true;
		if (selfOrdrTxnBean != null && selfOrdrTxnBean != undefined && orderTxn.ordrTxnSttusCd != '06' && orderTxn.ordrTxnSttusCd != '08') {
			if (selfOrdrTxnBean.selfOpnYn == 'Y') {
				isShow = false;
			} else if (wlessOrdrTxnBean.opnYn == 'Y' && selfOrdrTxnBean.semiSelfChgYn == 'Y') {
				isShow = false;
			}
		}

		$("#detail").empty();

		var bf = new Array();
		bf.push('    	<div class="content">');
		bf.push('	        <div class="header">가입내역 상세</div>');
		bf.push('			<button type="button" class="btn-close">닫기</button>');
		bf.push('	        <div class="body">');
		bf.push('				<div class="gray-box">');
		bf.push('					<div class="date">' + new Date(orderBasInfo.ordrRcpDt).format('yyyy.MM.dd') + '</div>');
		bf.push('					<div class="round-box order-detail">');
		bf.push('						<p>');
		if('0801' != wlessOrdrTxnBean.pplId && '0800' != wlessOrdrTxnBean.pplId){
			bf.push('							<span>주문번호</span>');
		}else{
			bf.push('							<span>신청번호</span>');
		}
		bf.push('							<strong>' + orderBasInfo.ordrNo + '</strong>');
		bf.push('						</p>');
		bf.push('						<div class="detial-box">');
		bf.push('							<div class="plan-image">');
		bf.push('									<span>' + wlessOrdrTxnBean.pplNm + '</span>');
		bf.push('									<div class="price">월 <strong>' + controller.addCom(wlessOrdrTxnBean.monthBasPayAmt-(wlessOrdrTxnBean.monthBasPayAmt%10)) + '</strong>원</div>');
		bf.push('							</div>');
		if('0801' == wlessOrdrTxnBean.pplId || '0800' == wlessOrdrTxnBean.pplId){
			bf.push('<dl class="faq-area">');
            bf.push('	<dt tabindex="0" role="button" class="btn-arrow">할인 가능 요금제 및 유의사항</dt>');
            bf.push('	<dd class="area">');
            bf.push('		<ul class="infor-list">');
            bf.push('			<li>5G 슈퍼플랜 초이스(프리미엄/스페셜/베이직), 슈퍼플랜 스페셜, Y슈퍼플랜 스페셜 요금제 사용고객은5G 데이터쉐어링 1회선에 대해 요금할인이 적용됨</li>');
            bf.push('			<li>LTE 요금제 사용시 LTE 데이터쉐어링 2회선까지 무료 적용됨</li>');
            bf.push('			<li class="case">슈퍼플랜 스페셜, Y슈퍼플랜 스페션 요금제에 스마트기기할인 등록 시 5G 데이터쉐링은 할인 불가함</li>');
            bf.push('		</ul>');
            bf.push('	</dd>');
            bf.push('</dl>');
		}
		if(30 > jsonObj.custAge) {
			bf.push('							<div class="plan-sale">');
			bf.push('								<span class="tit">요금제 할인 내역</span>');
			bf.push('								<ul class="depth2">');
			bf.push('									<li>');
			bf.push('										<span class="sale-txt">Y고객 추가 할인</span>');
			bf.push('										<strong class="sale-price">-5,500원</strong>');
			bf.push('									</li>');
			bf.push('								</ul>');
			bf.push('							</div>');
		}
		if(affiliateCorpCdName != "") {
			bf.push('							<div class="plan-image">');
			bf.push('								<span>KT 다이렉트 쿠폰팩 <a href="#" class="ui-popup-call tooltip-pop" data-target="#popup-couponguide" title="새창열림" role="button">유의사항</a></span>');
			bf.push('								<div class="price">' + affiliateCorpCdName + '(월 ' + controller.addCom(affiliatePackAmt) + '원)</div>');
			bf.push('							</div>');
			bf.push('<div id="popup-couponguide" class="ui-popup toast-popup popup-couponguide">');
			bf.push('	<div class="content">');
			bf.push('		<div class="header">제휴쿠폰 이용안내</div>');
			bf.push('		<button type="button" class="btn-close">닫기</button>');
			bf.push('		<div class="body">');
			bf.push('			<ul class="jum-list">');
			bf.push('				<li> 선택하신 요금제에 따라 혜택 금액은 달라지며 개통월기준 2달 후(요금납부 확인 후) 개통연락처로 쿠폰이 제공됩니다. </li> ');
			bf.push('				<li> 쿠폰은 약정기간 중 매월 1회 제공되며 제공된 쿠폰은 재발행되지 않습니다. </li> ');
			bf.push('				<li> 약정기간 중 요금제 변경의 경우 변경된 요금기준으로 쿠폰 금액이 변경, 발행됩니다. </li> <li> 쿠폰 변경은 3월, 6월, 9월, 12월 변경기간내에서 만 가능하며 변경 기간은 쿠폰 문자 발송 시 안내예정 입니다. </li> ');
			bf.push('				<li> 쿠폰 발행 연락처는 변경할 수 없습니다.(최초 개통 연락처로 약정기간 중 발행됩니다.) </li> ');
			bf.push('				<li> 발행된 쿠폰의 유효기간은 매달 말일까지 사용가능하며 미사용 시 소멸됩니다. (쿠폰 발행 시 유효기간이 안내되어 있으니 꼭 확인하시기 바랍니다.) </li> ');
			bf.push('				<li> 쿠폰은 요금납부 확인 후 매달 5일 발행될 예정입 니다. </li> ');
			bf.push('				<li> 발행된 쿠폰은 타인에게 양도 불가합니다. </li> ');
			bf.push('				<li> 쿠폰 분실 시 재발행은 불가합니다. </li> ');
			bf.push('			</ul>');
			bf.push('		</div>');
			bf.push('		<div class="btn-bottom">');
			bf.push('			<button type="button" name="button" class="btn fill bottom btn-close" id="">확인</button>');
			bf.push('		</div>');
			bf.push('	</div>');
			bf.push('</div>');
		}

		if (isShow) {
			bf.push('							<div class="cancel">');
			var status = orderTxn.ordrTxnSttusCd;
			var statusObj = controller.getDataObject()[status];
			var isTxt = statusObj.txt;
			var dlvrTxnBean = orderTxn.dlvrTxnBean;
			var duSimGbnCd=wlessOrdrTxnBean.duSimGbnCd;
			var semiSelfChgYn= orderBasInfo.semiSelfChgYn;
			var dlvrSeq = "0";
			if (null != dlvrTxnBean) {
				dlvrSeq = dlvrTxnBean.dlvrSeq;
			}
			if('14'==status && 'U'==duSimGbnCd && 'N'==semiSelfChgYn){
				bf.push('			<span>개통완료</span>');
			}else if('14'==status && ('0801' == wlessOrdrTxnBean.pplId || '0800' == wlessOrdrTxnBean.pplId)){
				if('Y'==semiSelfChgYn){
					bf.push('			<span>개통완료</span>');
				}else{
					bf.push('			<span>접수완료(연락예정)</span>');
				}
			}else{
				bf.push('			<span>' + isTxt + '</span>');
			}

			if (controller.hasStatusBtn(orderTxn.ordrTxnSttusCd) != '') {
				var hasProdEvlTxn = controller.isNotEmpty(orderTxn.prodEvlTxnBean);
				if ((selfOrdrTxnBean == null || (orderTxn.ordrTxnSttusCd != '01' && orderTxn.ordrTxnSttusCd != '09')) && isShow) {
					bf.push(controller.getStatusBtn({
						obj : orderTxn,
						orderObj : jsonObj,
						vanIdList : vanIdList,
						openReqTxn : openReqTxn,
						hasProdEvlTxn : hasProdEvlTxn,
						rsrvProdYn : orderTxn.rsrvProdYn
					}));
				}
			}
			bf.push('							</div>');
		}
		bf.push('						</div>');
		bf.push('					</div>');
		if("CH" != orderTxn.prodTypeCd) {
			bf.push('					<div class="round-box">');
			bf.push('						<p>');
			bf.push('							<span>가입유형</span>');
			bf.push('							<strong>' + wlessOrdrTxnBean.sbscTypeNm + '</strong>');
			bf.push('						</p>');
			bf.push('						<p>');
			bf.push('							<span>이름</span>');
			bf.push('							<strong>' + orderBasInfo.ordrrNm + '</strong>');
			bf.push('						</p>');
			bf.push('					</div>');
		}

		bf.push('					<div class="round-box">');


		if('0801' != wlessOrdrTxnBean.pplId && '0800' != wlessOrdrTxnBean.pplId){
			bf.push('						<p>');
			bf.push('							<span>요금제</span>');
			if(wlessOrdrTxnBean.pplId == '0809' || wlessOrdrTxnBean.pplId == '0810'|| wlessOrdrTxnBean.pplId == '0811' || wlessOrdrTxnBean.pplId == '0830' /** 넷플릭스*/
				|| wlessOrdrTxnBean.pplId == '0823' || wlessOrdrTxnBean.pplId == '0824'|| wlessOrdrTxnBean.pplId == '0825' || wlessOrdrTxnBean.pplId == '0831' /** 현대카드*/
				|| wlessOrdrTxnBean.pplId == '0834' || wlessOrdrTxnBean.pplId == '0835'|| wlessOrdrTxnBean.pplId == '0836' /** 바디프랜드*/
				|| wlessOrdrTxnBean.pplId == '0840' || wlessOrdrTxnBean.pplId == '0841'|| wlessOrdrTxnBean.pplId == '0842' /** 디즈니*/){
				bf.push('							<strong>' + wlessOrdrTxnBean.pplNm + '<br>(요금제 관련 개인정보제공에 동의함)</strong>');
			}else{
				bf.push('							<strong>' + wlessOrdrTxnBean.pplNm + '</strong>');
			}
			bf.push('						</p>');

			if("Y" == jsonObj.seesnVbsYn) {
				bf.push('						<p>');
				bf.push('							<span>ㄴ 선택 콘텐츠</span>');
				bf.push('							<strong>시즌초이스(11,000원)</strong>');
				bf.push('						</p>');
			}
			if("Y" == jsonObj.ntflxVbsYn) {
				bf.push('						<p>');
				bf.push('							<span>ㄴ 선택 콘텐츠</span>');
				bf.push('							<strong>넷플릭스(가입 후 과금)</strong>');
				bf.push('						</p>');
			}

			if("01" == wlessOrdrTxnBean.sbscTypeCd) {
				if("0000" == custAplsh.nextRankDn) {
					bf.push('						<p>');
					bf.push('							<span>개통 희망번호</span>');
					bf.push('							<strong>' + custAplsh.prfrRankDn + '</strong>');
					bf.push('						</p>');
				}else{
					bf.push('						<p>');
					bf.push('							<span>개통 희망번호 1순위</span>');
					bf.push('							<strong>010-****-' + custAplsh.prfrRankDn + '</strong>');
					bf.push('						</p>');
					bf.push('						<p>');
					bf.push('							<span>개통 희망번호 2순위</span>');
					bf.push('							<strong>010-****-' + custAplsh.nextRankDn + '</strong>');
					bf.push('						</p>');
				}
			} else if("02" == wlessOrdrTxnBean.sbscTypeCd) {
				bf.push('						<p>');
				bf.push('							<span>번호이동 번호</span>');
				bf.push('							<strong>' + custAplsh.nowPrttlpNo + '</strong>');
				bf.push('						</p>');
			}
			if(null != custAplsh) {
				bf.push('						<p>');
				bf.push('							<span>납부방법</span>');
				if ("C"== custAplsh.feeBlpymMthd) {
					bf.push('							<strong>신용카드</strong>');
				}else if("D"== custAplsh.feeBlpymMthd){
					bf.push('							<strong>계좌이체</strong>');
				}
				bf.push('						</p>');
				bf.push('						<p>');
				bf.push('							<span>명세서</span>');
				if("MB" == custAplsh.rqsshtMthdCd) {
					bf.push('							<strong>MMS</strong>');
			    }else if("CB"== custAplsh.rqsshtMthdCd){
			    	bf.push('							<strong>이메일</strong>');
			    }else if("WB"== custAplsh.rqsshtMthdCd) {
			    	bf.push('							<strong>kt.com</strong>');
			    }
				bf.push('						</p>');
			}
		} else {
			bf.push('						<p>');
			bf.push('							<span>메인회선 번호</span>');
			bf.push('							<strong>' + orderBasInfo.sharingMainPhoneNo + '</strong>');
			bf.push('						</p>');
			bf.push('						<p>');
			bf.push('							<span>데이터쉐어링 가입</span>');
			bf.push('							<strong>' + wlessOrdrTxnBean.pplNm + '</strong>');
			bf.push('						</p>');
			bf.push('						<p>');
			bf.push('							<span>납부방법</span>');
			if ("C"== custAplsh.feeBlpymMthd) {
				bf.push('							<strong>신용카드</strong>');
			}else if("D"== custAplsh.feeBlpymMthd){
				bf.push('							<strong>계좌이체</strong>');
	        }else {
	        	bf.push('							<strong>메인회선에 통합청구</strong>');
	        }
			bf.push('						</p>');
		}
		if("CH" != orderTxn.prodTypeCd) {
			if('0801' == wlessOrdrTxnBean.pplId || '0800' == wlessOrdrTxnBean.pplId){
				bf.push('						<p>');
				bf.push('							<span>데이터 쉐어링 서비스 가입번호</span>');
				bf.push('							<strong>' + custAplsh.prfrRankDn + '</strong>');
				bf.push('						</p>');
			}
			bf.push('						<p>');
			bf.push('							<span>연락처</span>');
			bf.push('							<strong>' + dlvznTxnInfo.mphonNo + '</strong>');
			bf.push('						</p>');
		}
		bf.push('					</div>');
		if("CH" != orderTxn.prodTypeCd) {
			bf.push('					<dl class="notice-list">');
			bf.push('						<dt><em>i</em>안내</dt>');
			/*bf.push('						<dd>신규가입 고객님은 (나노)유심을 개통 후 발송해 드립니다.</dd>');
			bf.push('						<dd>번호이동 고객님은 (나노)유심 수령 후 1899-8245로 연락 주시면 개통을 도와드립니다. </dd>');
			bf.push('						<dd>유심은 택배로 배송되며, 2~3일이내 받아보실 수 있습니다.</dd>');*/
			// 데이터 쉐어링 셀프 추가
			bf.push('						<dd>개통이 지연될 경우, 고객센터(1899-8245)로 문의해 주세요.</dd>');
			bf.push('						<dd>기다리지 않으셔도 개통이 진행되며, 결과는 입력하신 연락받을 번호에 문자로 안내해드립니다.</dd>');
			// 데이터 쉐어링 셀프 추가
			bf.push('					</dl>');
		}
		bf.push('				</div>');
		bf.push('	        </div>');
		bf.push('	    </div>');

		$("#detail").append(bf.join(''));
	}

	, getData : function () {
		var varData = controller.getSerializedData({
			sOrdrRcpDt : $("input[type='date'].sOrdrRcpDt").val(),
			eOrdrRcpDt : $("input[type='date'].eOrdrRcpDt").val(),
			pageNo : orderHist.pageNo,
			recordCount : orderHist.recordCount
		});
		return varData;
	}
	, chgMonth : function (selObj) {

		var type = $(selObj).data("type");
		var period = $(selObj).data("period");

		var date = new Date();
		var yyyy = date.getFullYear();
		var MM = date.getMonth();
		var dd = date.getDate();
		var sDt;

		if (type == "day") {
			sDt = new Date(yyyy, MM, dd - parseInt(period));
		} else if (type == "month") {
			sDt = new Date(yyyy, MM - parseInt(period), dd);
		}

		var stDate = "" + sDt.getFullYear() + "-" + orderHist.addZero(sDt.getMonth() + 1) + "-" + orderHist.addZero(sDt.getDate());
		var fnsDate = "" + yyyy + "-" + orderHist.addZero(MM + 1) + "-" + orderHist.addZero(dd);

		$("input[type='date'].sOrdrRcpDt").val(stDate);
		$("input[type='date'].eOrdrRcpDt").val(fnsDate);

		orderHist.getList(1);
	}
	, addZero : function (md){
		return md<10?'0'+md:md;
	}
	, getMoreList : function () {
		orderHist.pageNo = orderHist.pageNo + 1
		orderHist.getList(orderHist.pageNo);
	}
	, callAuthSMS : function () {
		var comm = new $.CommonObj();

		validator.config = {};

		validator.config['custNm'] = 'isNonEmpty';
		validator.config['custPhone'] = 'isNonEmpty';
		validator.config['custPhone'] = 'isNumBetterFixN10';
		validator.config['captchaInSession'] = 'isNonEmpty';
		validator.config['captchaInSession'] = 'isNumFix6';

		if (!validator.validate()) {
			alert(validator.getErrorMsg());
			return;
		}

		var captchaYn = certBotDetectCaptchaForInMyOne(); //이것도 물어봐야함. 그대로써도 될거같기도 함..
		if (captchaYn == 'N') {
			reloadNomalCaptchaImg();
			$("#captchaInSession").val('');
			$("#captchaInSession").focus();
			return;
		}

		var custTel = $("#custPhone").val();
		var custTel1="";
		var custTel2="";
		var custTel3="";
	    if (custTel.length == 10) {
	    	custTel1=custTel.substring(0,3);
	    	custTel2 = custTel.substring(3,6);
	        custTel3 = custTel.substring(6,10);
	    } else if (custTel.length == 11) {
	    	custTel1 = custTel.substring(0,3);
	    	custTel2 = custTel.substring(3,7);
	    	custTel3 = custTel.substring(7,11);
	    }
		var param = comm.getSerializedData({
			custNm: getRsaEncData($("#custNm").val()),
			custTel1: getRsaEncData(custTel1),
			custTel2: getRsaEncData(custTel2),
			custTel3: getRsaEncData(custTel3)
		});

		comm.ajaxSend({
			cache: false
			, url: '/mydirect/callAuthSms.json' //수정해야함
			, data: param
			, dataType: 'json'
			, async: false
			, isOneBlock: true
			, successCall: function (jsonObj) {
				alert('인증번호를 발송했습니다. 문자를 받지 못하셨다면 입력하신 내용을 확인해주세요(1일 5회 인증 실패 시 인증문자 발송이 제한될 수 있습니다.)');
				$("input[name='smsAuthNo']").val(jsonObj.authNum); //운영반영시 삭제
			}
			, errorCall: function () {

			}
		});
	}
	, checkAuthSMS : function () {

		validator.config = {};

		validator.config['custNm'] = 'isNonEmpty';
		validator.config['custPhone'] = 'isNonEmpty';
		validator.config['custPhone'] = 'isNumBetterFixN10';
		validator.config['captchaInSession'] = 'isNonEmpty';
		validator.config['captchaInSession'] = 'isNumFix6';
		validator.config['smsAuthNo'] = 'isNonEmpty';
		validator.config['smsAuthNo'] = 'isNumFix6';

		if (!validator.validate()) {
			alert(validator.getErrorMsg());
			return false;
		}

		var captchaYn = certBotDetectCaptchaForInMyOne(); //이거 그대로 써도 되는지 물어볼거임
		if (captchaYn == 'N') {
			reloadNomalCaptchaImg();
			$("#captchaInSession").val('');
			$("#captchaInSession").focus();
			return;
		}

		var custNm = $("#custNm").val();
		var custTel = $("#custPhone").val();
		var custTel1= "";
		var custTel2= "";
		var custTel3= "";
		var smsAuthNo = $("#smsAuthNo").val();;
	    if (custTel.length == 10) {
	    	custTel1= custTel.substring(0,3);
	    	custTel2 = custTel.substring(3,6);
	        custTel3 = custTel.substring(6,10);
	    } else if (custTel.length == 11) {
	    	custTel1 = custTel.substring(0,3);
	    	custTel2 = custTel.substring(3,7);
	    	custTel3 = custTel.substring(7,11);
	    }

		var $form = $('<form></form>');
		$form.attr('action', '/mydirect/orderHistory.do').appendTo('body');
		$form.attr('method', 'post');
		$('<input></input').attr({type:'hidden', name:'custNm', value:custNm}).appendTo($form);
		$('<input></input').attr({type:'hidden', name:'custTel1', value:custTel1}).appendTo($form);
		$('<input></input').attr({type:'hidden', name:'custTel2', value:custTel2}).appendTo($form);
		$('<input></input').attr({type:'hidden', name:'custTel3', value:custTel3}).appendTo($form);
		$('<input></input').attr({type:'hidden', name:'smsAuthNo', value:smsAuthNo}).appendTo($form);
		$form.submit();
	}
}

var nonMemOrderHist = {
	chkOrderNo : function () {
		$("#CaptchaNumber").show();
		rebuildImage();
		$("#divNonMem").show();
	}
	, loginGoCheck : function () {
		location.href = loginUrl + location.href;
	}
}

var captcha = {
	captchaYn : "NEED"
	, chkCaptcha : function () {
		captcha.certBotDetectCaptchaForInMyShop();
		return;

		var codeCaptcha = $('#codeCaptchaHopeNo').val();

		captchaController.ajaxSend({
			cache:false
			,url:'/wire/selfCapchaCheck.json'
			,data:{codeCaptcha : codeCaptcha}
			,dataType:'json'
			,async:false
			,isBlock:false
			,successCall:function(jsonObj){
				//alert('캡챠 인증 성공');
				captcha.captchaYn = "PASS";
				$('#codeCaptchaHopeNo').val("");
				$("#btnHopeNoSearch").trigger("click");
				captcha.btnNonMemConfirem();
			}
			,errorCall:function(jbonObj){
				rebuildImage();
			}
		});
	}
	, displayCaptchaNumber : function (parFlag) {
		var captcha = parFlag;
		if( captcha == "Y"  ) {
			if("" === $("#CaptchaNumber").css("display") || "block" === $("#CaptchaNumber").css("display")){
			} else {
				rebuildImage('imgCaptchaHopeNo');
				$("#CaptchaNumber").show();
			}
		} else {
			$("#CaptchaNumber").hide();
		}

	}
	, certBotDetectCaptchaForInMyShop : function () {
		var captchaInSession = $('#captchaInSession').val();
		var BDC_VCID_captchaInSession = $("#BDC_VCID_captchaInSession").val();
		var BDC_BackWorkaround_captchaInSession = $("#BDC_BackWorkaround_captchaInSession").val();

		controller.ajaxSend({
			cache:false
			,url:'/smart/selfCapchaCheck.json'
			,data:{
				captchaInSession : captchaInSession
				,BDC_VCID_captchaInSession : BDC_VCID_captchaInSession
				,BDC_BackWorkaround_captchaInSession : BDC_BackWorkaround_captchaInSession
				}
			, type : 'post'
			,dataType:'json'
			,async:false
			,isBlock:false
			,successCall:function(jsonObj){
				$("#divCaptcha").hide();
				captcha.captchaYn = "PASS";
				$('#captchaInSession').val("");
				$("#btnHopeNoSearch").trigger("click");
				captcha.btnNonMemConfirem();
			},errorCall:function(){
				rebuildImage();
			}
		});
	}
	, btnNonMemConfirem : function () {
		if (captcha.captchaYn != "PASS") {
			alert("캡챠 인증이 필요합니다.");
			return;
		}
		validator.config = {};
		validator.config['ordrNo'] = 'isNonEmpty';
		validator.config['ordrPwd'] = 'isNonEmpty';

		var varData = controller.getSerializedData({
			ordrNo : $.trim($("#ordrNo").val()),
			ordrPwd : $.trim($("#ordrPwd").val()),
			sOrdrRcpDt : $.trim($("#before3MonthDate").val())
		});

		if (validator.validate()) {
			controller.ajaxSend({
				cache : false,
				url : "/person/saveNonMem.json",
				data : varData,
				dataType : 'json',
				async : false,
				successCall : function(jsonObj) {
					if (jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {

						var ordrRes = jsonObj.OBJ_DATA;
						var ordrType = ordrRes.ordrType;
						var gigaiotYn = ordrRes.gigaiotYn;

						if ("01" == ordrType || "02" == ordrType || "03" == ordrType || "04" == ordrType) {
							location.href = "/mydirect/orderHistory.do";
						} else {
							alert("조회가 불가능한 상품입니다.");
						}
					} else if (jsonObj.responseCode == "NEED_CAPTCHA") {
						alert("캡챠인증이 필요합니다.");
					} else {
						alert("실패하였습니다.");
					}
				}
			});
		} else {
			alert(validator.getErrorMsg());
		}
	}
}
