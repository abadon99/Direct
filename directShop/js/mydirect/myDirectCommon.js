jQuery.extend({myDirectCommonObj: function() {
        $.extend(this,new $.CommonObj());
        var that = this ;
        this.type = 'agncyOrder';

    	this.baseDate = new Date().setFullYear(2015,10,28);

    	this.addBtnEvent = function() {

    		//주문취소
    		$('button.ordrCancelBtn').off('click',that.ordrCancel);
    		$('button.ordrCancelBtn').on('click',that.ordrCancel);

    	};

    	this.setAttributes = function(obj) {
    		var isSettlWayCdFreeAccount = obj.attr('isSettlWayCdFreeAccount');
    		if (isSettlWayCdFreeAccount == undefined || isSettlWayCdFreeAccount == null ) {
    			isSettlWayCdFreeAccount = 0 ;
            } else {
            	isSettlWayCdFreeAccount = parseInt(isSettlWayCdFreeAccount,10) ;
            }

    		var isEscrowYn = obj.attr('isEscrowYn');
            if (isEscrowYn == null ) {
            	isEscrowYn = "N" ;
            }

            var dlvrSeq = obj.attr("dlvrSeq");
            if ( dlvrSeq == undefined) {
            	dlvrSeq = "0";
            }

    		$('input[name=url]').val(obj.attr('url'));
    		$('input[name=ordrNo]').val(obj.attr('ordrNo'));
    		$('input[name=prodNo]').val(obj.attr('prodNo'));
    		$('input[name=prodCtgCd]').val(obj.attr('prodCtgCd'));
    		$('input[name=ordrTxnSeq]').val(obj.attr('ordrTxnSeq'));
    		$('input[name=repProdNo]').val(obj.attr('repProdNo'));
    		$('input[name=isSettlWayCdFreeAccount]').val(isSettlWayCdFreeAccount);
    		$('input[name=ordrTxnSttusCd]').val(obj.attr('ordrTxnSttusCd'));

    		var rs = {
    			ordrNo:obj.attr('ordrNo')
    			,prodNo:obj.attr('prodNo')
    			,prodCtgCd:obj.attr('prodCtgCd')
    			,ordrTxnSeq:obj.attr('ordrTxnSeq')
    			,repProdNo:obj.attr('repProdNo')
    			,isSettlWayCdFreeAccount:obj.attr('isSettlWayCdFreeAccount')
    			,ordrTxnSttusCd:obj.attr('ordrTxnSttusCd')
    			,url:obj.attr('url')
    			,type:$('input[name=type]').val()
    			,isEscrowYn:obj.attr('isEscrowYn')
    			,settlWayCd:obj.attr('settlWayCd')
    			,allCancelDispYn:obj.attr('allCancelDispYn')
    			,dlvrSeq:obj.attr('dlvrSeq')
    		};
    		return rs;
    	};

    	//취소
    	this.ordrCancel = function(){
    		var obj = controller.setAttributes($(this));
    		that.mobileOrderCancel(obj);
    	};

    	//취소 - 무선
    	this.mobileOrderCancel = function(obj) {

    		var confirmMsg = "선택하신 상품을  취소하시겠습니까?";

    		if(parseInt(obj.isSettlWayCdFreeAccount) > 0 && obj.prodCtgCd == '11') {
    			$('[name=mainForm]').submit();
    			return;
    		}

    		var varData = controller.getSerializedData({
                ordrNo : obj.ordrNo
               ,ordrTxnSeq : obj.ordrTxnSeq
               ,repProdNo : obj.repProdNo
               ,ordrTxnSttusCd : ORDR_TXN_STTUS_CD.ORDR_TXN_STTUS_CD_CANCEL
    		});

    		if(confirm(confirmMsg)) {
	            controller.ajaxSend({
	                   cache:false
	                   ,url:obj.url
	                   ,data:varData
	                   ,dataType:'json'
	                   ,async:false
	                   ,successCall:function(jsonObj){
	                  	 if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
	                  		 location.reload();
	                  	 } else {
	                  		 alert("실패하였습니다.");
	                  	 }
	                   }
	            });
    		};
    	};

        this.ordrSttusSmartData = {
                "01":{txt:"신청 및 주문완료"
                     ,btnList: [{txt:"주문취소",classNm:'ordrCancelBtn',url:'/myDirect/orderCancel.json'}
                     			/*,{txt:"주문정보 수정",classNm:'orderOpen',url:''}
                     			,{txt:"추가혜택/부가서비스",classNm:'bnfitOpen',url:''}*/]
                     ,step:1,banrShow:false,openIconView:true,sttusIcon:'<strong class="state finish">신청 및 주문완료</strong>',subSttusIcon:''}
               ,"03":{txt:"상담원 확인중",btnList:[],step:2,banrShow:false,openIconView:true,sttusIcon:'',subSttusIcon:''}
               ,"08":{txt:"주문취소",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'<strong class="state cancel">주문취소</strong>',subSttusIcon:''}
               ,"09":{txt:"신청 및 주문완료"
                   ,btnList: [{txt:"주문취소",classNm:'ordrCancelBtn',url:'/myDirect/orderCancel.json'}]
               	   ,step:1,banrShow:false,openIconView:true,sttusIcon:'<strong class="state finish">신청 및 주문완료</strong>',subSttusIcon:''}
               ,"06":{txt:"취소",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'<strong class="state cancel">주문취소</strong>',subSttusIcon:''}
               ,"10":{txt:"상품준비",btnList:[],step:0,banrShow:false,openIconView:true,sttusIcon:'',subSttusIcon:''}
               ,"13":{txt:"배송중"
                     ,btnList: [/*{txt:"교환/반품신청",classNm:'goRefundBtn',url:"/m/person/exchange.do"}*/]
                     ,step:3,banrShow:true,openIconView:true,sttusIcon:'<strong class="state delivery">배송중</strong>'
                   	 ,subSttusIcon:'<a href="javascript:void(0);" ordrNo="%ordrNo%" ordrTxnSeq="%ordrTxnSeq%" class="search_btn _btnDeliverSearch">배송조회</a>'}
               ,"14":{txt:"배송완료"
            	     ,btnList: [/*{txt:"교환/반품신청",classNm:'goRefundBtn',url:"/m/person/exchange.do"}*/]
                     ,step:4,banrShow:true,openIconView:true,sttusIcon:'<strong class="state direct">배송완료</strong>'
                     ,subSttusIcon:'<a href="javascript:void(0);" ordrNo="%ordrNo%" ordrTxnSeq="%ordrTxnSeq%" class="search_btn _btnDeliverSearch">배송조회</a>'}
               ,"15":{txt:"반품요청"
                     ,btnList: [/*{txt:"교환/반품취소",classNm:'refundCancelBtn',url:"/person/orderSttusChange.json"}*/]
                     ,step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"16":{txt:"반품진행",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"17":{txt:"반품완료",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"18":{txt:"반품취소"
                   	 ,btnList: [/*{txt:"교환/반품신청",classNm:'goRefundBtn',url:"/m/person/exchange.do"}*/]
                     ,step:0,banrShow:true,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"19":{txt:"교환요청"
                     ,btnList: [/*{txt:"교환/반품취소",classNm:'refundCancelBtn',url:"/person/orderSttusChange.json"}*/]
                     ,step:0,banrShow:false,sttusIcon:'',subSttusIcon:''}
               ,"20":{txt:"교환수거지시",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"21":{txt:"교환수거완료",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"22":{txt:"교환상품준비",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"23":{txt:"교환출고지시",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"24":{txt:"교환출고완료",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"25":{txt:"교환완료",btnList:[],step:0,banrShow:true,openIconView:true,sttusIcon:'',subSttusIcon:''}
               ,"26":{txt:"교환취소"
                     ,btnList: [/*{txt:"교환/반품신청",classNm:'goRefundBtn',url:"/m/person/exchange.do"}*/]
                     ,step:0,banrShow:true,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"27":{txt:"부분반품접수",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"28":{txt:"부분반품진행",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"29":{txt:"부분반품완료",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"30":{txt:"부분반품취소",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"31":{txt:"구매완료",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
               ,"45":{txt:"요금제 변경완료",btnList:[],step:0,banrShow:false,openIconView:false,sttusIcon:'',subSttusIcon:''}
        };

    	this.btnDesign = {
    		"list":{
    			df:
    			'<button type="button" name="button" class="btn ordrCancelBtn"'
    			+ ' ordrno="%ordrNo%"'
    			+ ' url="%url%"'
    			+ ' ordrtxnsttuscd="%ordrTxnSttusCd%"'
    			+ ' ordrtxnseq="%ordrTxnSeq%"'
    			+ ' prodno="%prodNo%"'
    			+ ' prodctgcd="%prodCtgCd%"'
    			+ ' repprodno="%repProdNo%"'
    			+ ' issettlwaycdfreeaccount="%isSettlWayCdFreeAccount%"'
    			+ ' isescrowyn="%isEscrowYn%"'
    			+ ' settlWayCd="%settlWayCd%"'
    			+ ' allcanceldispyn="%allCancelDispYn%"'
    			+ ' dlvrseq="%dlvrSeq%"'
    			+ ' pplid="%pplId%"'
    			+ '>%btnNm%</button>'
    	   	}
    		,"dtl":{
    			df:
    			'<button type="button" name="button" class="btn ordrCancelBtn"'
    			+ ' ordrno="%ordrNo%"'
    			+ ' url="%url%"'
    			+ ' ordrtxnsttuscd="%ordrTxnSttusCd%"'
    			+ ' ordrtxnseq="%ordrTxnSeq%"'
    			+ ' prodno="%prodNo%"'
    			+ ' prodctgcd="%prodCtgCd%"'
    			+ ' repprodno="%repProdNo%"'
    			+ ' issettlwaycdfreeaccount="%isSettlWayCdFreeAccount%"'
    			+ ' isescrowyn="%isEscrowYn%"'
    			+ ' settlWayCd="%settlWayCd%"'
    			+ ' allcanceldispyn="%allCancelDispYn%"'
    			+ ' dlvrseq="%dlvrSeq%"'
    			+ ' pplid="%pplId%"'
    			+ '>%btnNm%</button>'
    	    }
    	};

    	this.hasStatusBtn = function(ordrTxnSttusCd) {
    		var statusObj = that.getDataObject()[ordrTxnSttusCd];
			var btnList = statusObj.btnList;
			if(btnList.length == 0) {
				return false;
			} else {
				return true;
			}
    	};

    	this.getStatusBtn = function(inObj) {
    		var returnStr = '';

    		var obj = inObj.obj;	// ordrTxn
    		var ordr = inObj.orderObj;
    		var isSettlWayCdFreeAccount = '0';
    		var type = that.type;
    		if(type == 'agncyOrder') {
    			isSettlWayCdFreeAccount = ordr.isSettlWayCdFreeAccount;
    		} else {
    			isSettlWayCdFreeAccount = inObj.isSettlWayCdFreeAccount;
    		}
    		var style = inObj.style;
    		var vanIdList = inObj.vanIdList;
    		var openReqTxn = that.nvl(inObj.openReqTxn);
    		var rsrvProdYn = that.nvl(inObj.rsrvProdYn,'N');
    		var isEscrowYn = that.nvl(inObj.isEscrowYn,'N');
    		var settlWayCd = inObj.settlWayCd;
    		var allCancelDispYn = inObj.allCancelDispYn;
    		var dlvrSeq = that.nvl(inObj.dlvrSeq,'0');

    		if(obj != undefined && obj != null) {
	    		var status = obj.ordrTxnSttusCd;
	    		var statusObj = that.getDataObject()[status];
    			var btnList = statusObj.btnList;
    			var pgType = $('input[name=pgType]').val();
    			var btnDesc = '';
    			if(style == undefined || style == null) {
    				btnDesc = that.btnDesign[pgType]['df'];
    			} else {
    				btnDesc = that.btnDesign[pgType][style];
    			}
    			if(btnList.length > 0) {
    				var bf = new Array();
    				for(var i=0; i<btnList.length; i++) {
    					if(!that.isMatch(vanIdList,btnList[i].classNm)){

    						if(that.type == 'agncyOrder' && btnList[i].classNm == 'orderOpen' && obj.prodCtgCd == '11') {
    							continue;
    						}

    						if(that.type == 'agncyOrder' && btnList[i].classNm == 'openBtn' && !that.isJoinBtnShow(obj,openReqTxn)) {
    							// none...
    						} else {
    							var ordrRcpDt = '';
    							if(ordr.ordrRcpDt == undefined || ordr.ordrRcpDt == null || ordr.ordrRcpDt == '') {
    								ordrRcpDt = '';
    							}
    							if (that.isNotEmpty(ordrRcpDt) && that.type == 'accesOrder' && ordr.prodCtgCd == '04' && (ordrRcpDt == '' || new Date(ordr.ordrRcpDt) >= baseDate )) {
    								// 오픈일 이전 땡스딜 데이터 skip 처리
    							} else {
			    					var btnStr = btnDesc.replace('%classNm%', btnList[i].classNm);
			    					var btnInStr = '';

			    					btnInStr = btnList[i].txt;

			    					//예약주문처리
			    					if(that.type == 'agncyOrder' && rsrvProdYn == 'Y' && btnList[i].txt == '주문취소') {
			    						btnInStr = '예약취소';
			    					}

			    					btnStr = btnStr.replace('%btnNm%', btnInStr);
			    					btnStr = btnStr.replace('%ordrNo%', that.nvl(obj.ordrNo));
			    					btnStr = btnStr.replace('%ordrTxnSeq%', that.nvl(obj.ordrTxnSeq));
			    					btnStr = btnStr.replace('%prodNo%', that.nvl(obj.prodNo));
			    					btnStr = btnStr.replace('%prodCtgCd%', that.nvl(obj.prodCtgCd));
			    					btnStr = btnStr.replace('%repProdNo%', that.nvl(obj.repProdNo));
			    					btnStr = btnStr.replace('%ordrTxnSttusCd%', that.nvl(obj.ordrTxnSttusCd));
			    					btnStr = btnStr.replace('%url%', btnList[i].url);
			    					btnStr = btnStr.replace('%isSettlWayCdFreeAccount%',that.nvl(isSettlWayCdFreeAccount,'0'));
			    					btnStr = btnStr.replace('%isEscrowYn%',isEscrowYn);
			    					btnStr = btnStr.replace('%settlWayCd%',settlWayCd);
			    					btnStr = btnStr.replace('%allCancelDispYn%',allCancelDispYn);
			    					btnStr = btnStr.replace('%dlvrSeq%',dlvrSeq);
			    					if(obj.wlessOrdrTxnBean != null){
			    						btnStr = btnStr.replace('%pplId%',obj.wlessOrdrTxnBean.pplId);
			    					}

			    					// 에스크로(실시간,무통장)은 반품요청취소가 없음
			    					if(isEscrowYn == "Y") {
			    						if("교환/반품취소" != btnInStr) {
			    							bf.push(btnStr);
			    						}
			    					} else {
			    						bf.push(btnStr);
			    					}
    							}
    						}
    					}
    				}
    				returnStr = bf.join('');
    			}
    		}
    		return returnStr;
    	};

    	this.isMatch = function(arr,value) {
    		if(arr != undefined) {
    			for(var i=0; i<arr.length; i++) {
    				var arrValue = arr[i];
    				if(arrValue == value) {
    					return true;
    				}
    			}
    		}
    		return false;
    	};

    	this.getDataObject = function() {

    		var obj = that.ordrSttusSmartData;
    		return obj;
    	};

    	this.nvl = function(str1,str2) {
    		var returnStr = '';
    		if(that.isEmpty(str1)) {
    			if(that.isEmpty(str2)) {
    				returnStr = '';
    			} else {
    				returnStr = str2;
    			}
    		} else {
    			returnStr = str1;
    		}
    		return returnStr;
    	};

    	this.isEmpty = function(obj) {
    		var result = false;
    		if(obj == undefined || obj == null || obj == '') {
				result = true;
    		}
    		return result;
    	};

    	this.isNotEmpty = function(obj) {
    		return !that.isEmpty(obj);
    	};

    	// 주문정보 수정
    	$(document).on("click",".orderOpen",function() {
    		alert("주문정보 수정은 PC에서만 가능합니다.");
    	});

    	// 추가혜택/부가서비스
    	$(document).on("click",".bnfitOpen",function() {
    		var pplId = $(this).attr("pplId");
    		var prodCtgCd = $(this).attr("prodCtgCd");
    		if(pplId == undefined || pplId == ''){
        		pplId = $("input[name=pplId]").val();
        	}
    		if("13" == prodCtgCd || "14" == prodCtgCd || "15" == prodCtgCd) {
        		if(pplId=="0568" || pplId== "0672"){
        			$("#freePpl").show();
        		}else{
        			$("#freePpl").hide();
        		}
    		} else {
        		$("#benefitCombine").hide();
        		$("#benefitService").hide();
    		}
    		location.href = "#Benefit";
    	});
    	$(document).on("pageshow","#Benefit",function() {
    		cardSlide.reloadSlider();
		});

        // 배송조회
        $(document).on("click","._btnDeliverSearch",function(){
            var ordrNo = $(this).attr("ordrNo");
            var ordrTxnSeq = $(this).attr("ordrTxnSeq");
            var repProdNo = $(this).attr("repProdNo");
            var dlvrSeq = $(this).attr("dlvrSeq");

            if ( ordrTxnSeq == null) {
                ordrTxnSeq = "0";
            }

            if ( repProdNo == null ) {
                repProdNo = "";
            }

            if ( dlvrSeq == undefined) {
            	dlvrSeq = "0";
            }

            var varData = that.getSerializedData({
                ordrNo: ordrNo
                ,ordrTxnSeq:ordrTxnSeq
                ,repProdNo:repProdNo
                ,ordrTxnSttusCd:ORDR_TXN_STTUS_CD.ORDR_TXN_STTUS_CD_DELIVERY
                ,dlvrSeq:dlvrSeq
            });

            that.ajaxSend({
                cache:false
                ,url:"/person/btnDeliverSearch.json"
                ,data:varData
                ,dataType:'json'
                ,async:false
                ,successCall:function(jsonObj){
                    if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                    	var link = (jsonObj.companyUrl).replace(/&#x2F;/gi,"/") + jsonObj.ofwInvcNo;
                    	window.open(link);
                    } else {
                        alert("배송정보가 없습니다.");
                    }
                }
              });
        });

    }
});
