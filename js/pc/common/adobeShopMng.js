/*
 *
 *

####### ######### 각 업무 개발자가 해야할일 ######### #########
해당 본문페이지 맨 하단에 아래와같이 업무 type 에 맞는 함수와 함수 파라메터를 맞추어 호출 해줘야 됩니다.

ex)주문완료 페이지일경우
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상위 소스 생량~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	<script type="text/javascript">
	$(document).ready(function() {
			 var checkReady = function(callback) {
		         if (window.s) {
		         	callback();
		         }
		         else {
		             window.setTimeout(function() { checkReady(callback); }, 1000);
		         }
		     };

		     checkReady(function() {
		    	 var AdobeSetter = new AdobeObject();		//필수부분

		     	--------------- 각업무 개발자가 코딩해얗ㄹ 부분 시작-------------------------
		     	 var gigaYn = $("#gigaYn").val();
		         var products = $("#tgtProdNo").val();
		         var pageName = "";
		         if(gigaYn=="Y"){
		         	pageName = $("#GigaAdobe").attr("pageName");
		         } else {
		         	pageName = $("#ollehAdobe").attr("pageName");
		         }
		        AdobeSetter.setProductDetail('유선 > 인터넷','인터넷 상품');
		        --------------- 각업무 개발자가 코딩해얗ㄹ 부분 끝-------------------------

		        AdobeSetter.sendAdobe();	//필수부분
		     });
		});

	</script>
    </t:putAttribute> <!--  <t:putAttribute name="contentAttr"> 의 끝 -->




ex)온라인 서식지일경우 해당링크 에 onclick 이벤트에 걸어줘야 됩니다.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상위 소스 생량~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<a href="javascript:void(0)" onclick='AdobeSetter.setOrderOnline("^www^Shop^모바일^핸드폰^대리점 혜택비교^나만으 혜택",$("#prodNo").val(),$("#vndrSntyNo").find("option:selected").text(),$("label[for="+$("input[name=\"sbscTypeCd\"]:checked").prop("id")+"]").text(),$("#pplId").find("option:selected").text(),$("label[for="+$("input[name=\"svcEngtMonsTypeCd\"]:checked").prop("id")+"]").text());'>
	온라인 서식지 버튼
</a>

주의사항:각업무별 pageName 은 프로젝트 파일서버에 업로드 되있는
/어도비메뉴/adobemenu.xlsx 파일을 참고하세요
####### ######### 각 업무 개발자가 해야할일 ######### #########
*/

/*===============================================================
 adobe 통계 관련 제어 .js

adobe 통계요청 type 으로 변경해주는 Controller

통계 Type : 5가지 유형이 존재함
		   각각 해당 Content 페이지 영역의 상단에 Dom 이 loading 완료후 각각 type 에 해당하는 메소드
		   를 호출한다.
		   3.주문결제,4.주문완료 같은 경우 추가적으로 setOrderOption() 메소드를 호출 해줘야한다.
		   setOrderOption() 메소드는
1.기본유형
		-AdobeSetter.setDefault(pageName);
2.상품상세
		-AdobeSetter.setProductDetail(pageName,products);
3.주문결제
		-AdobeSetter.setOrderBegin(pageName,products,memAndColor,joinType,pplId,svcEngtMonsType);
		-AdobeSetter.setOrderOption(goodsAmt,myAdv,realGoodsAmt,memberShipPoint);
4.주문완료
		-AdobeSetter.setOrderEnd(pageName,products,memAndColor,joinType,pplId,svcEngtMonsType,orderNo);
		-AdobeSetter.setOrderOption(goodsAmt,myAdv,realGoodsAmt,memberShipPoint);

5.서식지작성
		-AdobeSetter.setOrderOnline(pageName,products,memAndColor,joinType,pplId,svcEngtMonsType);

		• s.products – 상품코드 * 상품코드 앞에 세미콜론이 반드시 들어가야함
		• s.events=”prodView” – 상품설명 정보 보기
		• s.events=”purchase” – 주문완료/전화상담완료
		• s.events=”scCheckout” – 주문결제 시작/전화상담신청
		• s.events=”event9” – 서식지 작성 버튼 클릭 (간편서식지는 불필요)
		• s.eVar21=”32GB 화이트 프로스트” – 상품정보 (용량/색상)
		• s.eVar22=”기기변경” – 상품유형
		• s.eVar23=”완전무한67(LTE)” – 요금제유형
		• s.eVar24=”24개월” – 서비스약정
		• s.eVar62=”909,000” – 단말기 구매가
		• s.eVar63=”500,000” – 나만의 혜택 할인가
		• s.eVar64=”409,000” – 최종 실구매가
		• s.eVar65=”105,000” – 제휴포인트
		• s.eVar28=”100207872001” – 주문번호

===============================================================
 *
 */
/*var script = document.createElement("script");
script.src = 'https://assets.adobedtm.com/dfaaaf23b9a39da76c4f26cfc7196c3c78424650/satelliteLib-ec634da1892b150971a6a62838a5b388a597cb51.js';
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);*/
/*
$(document).ready(function() {
	var checkReady = function(callback) {
         if (window.s) {
        	 callback();
         }
         else {
             window.setTimeout(function() { checkReady(callback); }, 100);
         }
     };

     checkReady(function() {
    	// trackClicks =
    	 var AdobeSetter = new AdobeObject();	//adobe 통계 커스텀 객체 생성
    	 var pageName = "^www^Shop";

    	 if (location.href.indexOf("m.shop.kt.com") > -1) {
    		 pageName = "^m^molleh^Shop";
         }
         AdobeSetter.setDefault(pageName);
         //AdobeSetter.sendAdobe();				//adobe 통계 data 전송 처리
     });
});*/
/**
 * Adobe 통계 형식에 맞게 변경처리 해준다
 */
var AdobeObject = function () {
	/**
	 * 1.기본유형
	 	pageName 명만 선언하는 기본형 메소드
	 */
	this.setDefault = function(pageName) {
		s.pageName = pageName;
		s.eVar11 = $('input[name=HAS_LOGIN_SESSION_BEAN]').val() == 'true' ? 'Y' : 'N';
	};

	/**
	 *
	 * 2.상품상세 페이지
	 * @param pageName
	 * @param products
	 */
	this.setProductDetail = function(pageName,productCtg,products) {
		this.setDefault(pageName);
		s.products = productCtg+";"+products;
		s.events = "prodView";
	};
	
	
	/**
	 *
	 * 20160805 상품상세 페이지 신규추가
	 * @param pageName
	 * @param Hproducts
	 * @param HGroup
	 */
	this.setHProductDetail = function(pageName, Hproducts, HGroup) {
		this.setDefault(pageName);
		s.products = Hproducts;
		//s.products = productCtg+";"+products;
		s.events = "prodView";
		s.eVar25 = HGroup;

	};
	
	
	
	/**
	 *
	 * 20160629 상품상세 페이지 신규추가	(미사용중)
	 **@param goodsAmt : 단말기 구매자
	 *@param myAdv    : 나만의 혜택
	 *@param realGoodsAmt  :최종 실구매가
	 *@param memberShipPoint : 제휴 포인트
	 */
	this.setOrderOptionDetail = function(goodsAmt, myAdv, realGoodsAmt, memberShipPoint) {
		s.eVar62 = goodsAmt;
		s.eVar63 = myAdv;
		s.eVar64 = realGoodsAmt;
		s.eVar65 = memberShipPoint;
	};
	
	/**
	 * 20160629 상품상세 페이지 신규추가 (미사용중)
	 **@param pageName
	 * @param products
	 * @param memAndColor 용량 색상
	 * @param joinType 가입유형(기기변경/신규가입/번호이동)
	 * @param pplId 요금제유형
	 * @param svcEngtMonsTypeCd 서비스약정
	 */
	this.setOrderBeginDetail = function(pageName, productCtg, products, memAndColor, joinType, pplId, svcEngtMonsType) {
		
		this._setOrderBas(pageName, productCtg, products, 'prodView', memAndColor, joinType, pplId, svcEngtMonsType);
	};
	/**
	 * 3.주문 결제 호출해야되는 함수
	 **@param pageName
	 * @param products
	 * @param memAndColor 용량 색상
	 * @param joinType 가입유형(기기변경/신규가입/번호이동)
	 * @param pplId 요금제유형
	 * @param svcEngtMonsTypeCd 서비스약정
	 */
	this.setOrderBegin = function(pageName,productCtg,products,memAndColor,joinType,pplId,svcEngtMonsType) {
		this._setOrderBas(pageName,productCtg,products,'scCheckout',memAndColor,joinType,pplId,svcEngtMonsType);
	};

	this.setHOrderBegin = function(pageName,Hproducts,Hgroup,memAndColor,joinType,pplId,svcEngtMonsType) {
		this._setHOrderBas(pageName,Hproducts,Hgroup,'scCheckout',memAndColor,joinType,pplId,svcEngtMonsType);
	};
	
	this._setHOrderBas = function(pageName,Hproducts,Hgroup,shopEvent,memAndColor,joinType,pplId,svcEngtMonsType) {
		this.setDefault(pageName);
		s.products = Hproducts;
		s.events = shopEvent;
		s.eVar21 = memAndColor;
		s.eVar22 = joinType;
		s.eVar23 = pplId;
		s.eVar24 = svcEngtMonsType;
		s.eVar25 = Hgroup;
	};

	
	/**
	 * 4.주문완료 페이지에서 호출하는 adobe 호출 함수
	 **@param pageName
	 * @param products
	 * @param memAndColor 용량 색상
	 * @param joinType 가입유형(기기변경/신규가입/번호이동)
	 * @param pplId 요금제유형
	 * @param svcEngtMonsTypeCd 서비스약정
	 * @param orderNo 주문코드
	 */
	this.setOrderEnd = function(pageName,productCtg,products,memAndColor,joinType,pplId,svcEngtMonsType,orderNo) {
		this._setOrderBas(pageName,productCtg,products,'purchase',memAndColor,joinType,pplId,svcEngtMonsType);
		s.eVar28 = orderNo;
		s.purchaseID = orderNo;
	};
	this.setHOrderEnd = function(pageName,Hproducts,Hgroup,memAndColor,joinType,pplId,svcEngtMonsType,orderNo) {
		this._setHOrderBas(pageName,Hproducts,Hgroup,'purchase',memAndColor,joinType,pplId,svcEngtMonsType);
	 	s.eVar28 = orderNo;
		s.purchaseID = orderNo;
	};

	/**
	 * 5.주문Online 서식지사용할때
	 * @param pageName
	 * @param products
	 * @param memAndColor 용량색상
	 * @param joinType 가입유형(기기변경/신규가입/번호이동)
	 * @param pplId 요금제유형
	 * @param svcEngtMonsType 서비스악정
	 */
	this.setOrderOnline = function(pageName,productCtg,products,memAndColor,joinType,pplId,svcEngtMonsType) {
		this._setOrderBas(pageName,productCtg,products,'event9',memAndColor,joinType,pplId,svcEngtMonsType);
		s.linkTrackVars ="events,products,eVar21,eVar22,eVar23,eVar24";
		s.linkTrackEvents ="event9";
		s.tl(true,'o','Order');
	};

	/**
	 * 단말기 구매가,나만의 혜택정보,최종 실구매가,제휴포인트 정보를
	   adobe 객체 프로퍼티에 할당한다.
	 *@param goodsAmt : 단말기 구매자
	 *@param myAdv    : 나만의 혜택
	 *@param realGoodsAmt  :최종 실구매가
	 *@param memberShipPoint : 제휴 포인트
	 */
	this.setOrderOption = function(goodsAmt,myAdv,realGoodsAmt,memberShipPoint) {
		s.eVar62 = goodsAmt;
		s.eVar63 = myAdv;
		s.eVar64 = realGoodsAmt;
		s.eVar65 = memberShipPoint;
	};

	/**
	 * 페이지명,상품코드,욕량색상,가입유형,요금제유형,서비스약정정보를
	   adobe 객체프로퍼티에 할당한다.
	 *@param pageName
	 *@param products
	 *@param memAndColor 용량 색상
	 *@param joinType 가입유형(기기변경/신규가입/번호이동)
	 *@param pplId 요금제유형
	 *@param svcEngtMonsTypeCd 서비스약정
	 */
	this._setOrderBas = function(pageName,productCtg,products,shopEvent,memAndColor,joinType,pplId,svcEngtMonsType) {
		this.setDefault(pageName);
		s.products = productCtg+";"+products;
		s.events = shopEvent;
		s.eVar21 = memAndColor;
		s.eVar22 = joinType;
		s.eVar23 = pplId;
		s.eVar24 = svcEngtMonsType;
	};

	this.sendAdobe = function() {
		
	};
}