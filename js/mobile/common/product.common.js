
var wordMode;
var focusQnAInfo;
var prodController = $.extend(new $.CommonObj(), {
    $postscriptList:null  //구매후기 리스트
    ,$postscriptList2:null //구매후기 리스트 전체
    ,$postscriptListVndr:null //구매후기(대리점별) 리스트 전체
    ,$qnaList:null //전문상담
    ,$qnaList2:null // 전문상담 리스트 전체
    ,$btnListMore:null // 더보기 button
    ,recordCount:10
    ,qPageCnt:1
    ,onCreate : function() {

        prodController.$postscriptList = $(".postscriptList:eq(0)") ;
        prodController.$postscriptList2 = $("#productReview .postscriptList.view_review") ;
        prodController.$postscriptListVndr = $("#productReviewVndr .postscriptList.view_review") ;
        prodController.$qnaList = $(".qna em") ;
        prodController.$qnaList2 = $("#producQstnList") ;

        prodController.$btnListMore = $("#producQstn ._btnListMore") ;

        
        var fnProdQsStnCfg =function(){
            return {
                prodNo:$("#prodNo").val()
                ,pageNo:1
                ,recordCount:prodController.recordCount
                ,listObj:prodController.$qnaList2
                ,fnGetHtml:prodController.getRowTemplateQsnD
                ,strNodata:"<div class='nodata'> 문의 내용이 없습니다.</div>"
                ,isMoreBtn:true
              }
        }

        //최신 문의
        var initProdList = function() {
            prodController.$qnaList.empty();

            prodController.fnProdQstnList({
                prodNo:$("#prodNo").val()
                ,pageNo:1
                ,recordCount:1
                ,listObj:prodController.$qnaList
                ,fnGetHtml:prodController.getRowTemplateQsnM
                ,strNodata:"(0)"
                ,isMoreBtn:false
              });
        }

        $("#producQstnInsert").click(function() { 
            if(LOGIN_YN  == 'Y'){		 
				$("#QstnWrite").show();
				$("#QstnWriteBtn").show();
				$(".QstnListArea").hide();
				$("#pushAgree").show();
				$("#QstnList").hide();
                $("#inqrAnsSbst").next().html("<span class='text_numbers'>0</span> / 1000byte");                
                $('#inqrAnsSbst').focus();
            } else {
				if('true' == isApp) {
					appLoginSend("prodCommAppRtn","1");
				} else {
	                if(confirm('로그인 하시겠습니까?')){
	                    location.href = loginUrl + location.href ;
	                } else {
	                    return;
	                }
				}
            }
        });

        $("#btnProducQstnBak").click(function(e) {
			e.preventDefault();
			$("#inqrAnsSbst").val("");
			$("#btnInsertQs").attr("inqrNo",'');
            $("#btnInsertQs").html("질문하기");
            $("#QstnWrite").hide();
            $("#QstnWriteBtn").hide();
            $(".QstnListArea").show();
            $("#QstnList").show();
            $("#pushAgree").show();
        });		

        $("#btnCounReceBak").click(function(e) {
			e.preventDefault();
			
            $("#CounselReceive").hide();
			$("#CounselReceive input[type=text]").val("");
			$("#CounselReceive input[type=checked]").prop("checked",false);
			closeQns();
            $("#QstnWrite").show();
            $("#QstnWriteBtn").show();
            $(".QstnListArea").hide();
        }) ;
        
        /** email select box 선택*/
	    $("#mailDomainSelectBox").change(function(){
	        var thisVal = $("option:selected", this).val();
	        $("#custEml02").val(thisVal);
	    });

        $("#btnInsertQs").click(function(){
            var inqrNo = $(this).attr("inqrNo");
			if($("#NotiQues").prop("checked") == true){
				if ($("#inqrAnsSbst").val() == "") {
					alert("궁금한 점을 입력해 주세요.");
					return;
				}
				$("#QstnWrite").hide();
				$("#QstnWriteBtn").hide();
				$(".QstnListArea").show();
				$("#CounselReceive").show();
				
				$("#EmailIp").hide();
				
				$(".checkbox input").click(function(){
					if($(this).prop("checked")){
						$(this).next().addClass("checked")
						if($(this).attr("id") == "SMS"){
							$("#CellPhoneIp").show();
						}else{
							$("#EmailIp").show();
						}
					}else{
						if($("#CheckView input:checked").length <= 0){
							$(this).prop("checked",true)
							alert("1개의 알림 신청은 선택을 해주세요.")
						}else{
							$(this).next().removeClass("checked");
							if($(this).attr("id") == "SMS"){
								$("#CellPhoneIp").hide();
							}else{
								$("#EmailIp").hide();
							}
						}
					}
				});
				
				$(".checkbox input").next().click(function(){
					if($(this).prop("checked")){
						if($("#CheckView input:checked").length <= 0){
							$(this).prop("checked",true)
							alert("1개의 알림 신청은 선택을 해주세요.")
						}else{
							$(this).next().removeClass("checked");
						}
					}else{
						$(this).next().addClass("checked");
					}
				});
				return;
			} 

			var request = new Request();
			var prodTypeCd = "";
			var vndrNo = request.getParameter("vndrNo");
			
			if ($("#prodTypeCdQs").val() != undefined) {
				prodTypeCd = $("#prodTypeCdQs").val();
			}
							
			if (inqrNo =="") {
				if ($("#inqrAnsSbst").val() != "") {
					var varData = prodController.getSerializedData({
                        prodNo:$("#prodNo").val()
                        ,vndrNo:vndrNo
                        ,prodTypeCd:prodTypeCd
                        ,inqrAnsSbst:$("#inqrAnsSbst").val()
                        ,mphoneNo:''
                        ,emailAdr:''
                        ,smsAnsYn:''
                        ,emailAnsYn:''
                    });

                    prodController.ajaxSend({
                        cache:false
                        ,url:'/support/prodQstnInsert.json'
                        ,data:varData
                        ,dataType:'json'
                        ,async:false
                        ,successCall:function(jsonObj){
                            if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                                wordMode="write";
                                alert("전문 상담을 성공적으로 등록 하였습니다.");
                                prodController.$qnaList2.empty();
								var cfg = fnProdQsStnCfg();
								prodController.fnProdQstnList(cfg);
								$("#inqrAnsSbst").val("");
								$("#QstnWrite").hide();
								$("#QstnWriteBtn").hide();
								$(".QstnListArea").show();
								$("#QstnList").show(); 
                                initProdList();
                                
                            } else {
                                alert("실패하였습니다.");
                            }
                        }
                    });
				} else {
					alert("궁금한 점을 입력해 주세요.");
				}
			} else {                    
				var varData ="";
				if ($("#inqrAnsSbst").val() != "") {
					if ($("#btnInsertQs").html() != "신고") {
						varData = prodController.getSerializedData({
							inqrNo:inqrNo
							,inqrAnsSbst:$("#inqrAnsSbst").val()
						});
						prodController.ajaxSend({
							cache:false
							,url:'/m/person/updateLiveQnA.json'
							,data:varData
							,dataType:'json'
							,async:false
							,successCall:function(jsonObj){
								if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                                    wordMode ="update";
									alert("수정 하였습니다.");
									prodController.$qnaList2.empty();
									var cfg = fnProdQsStnCfg();
									prodController.fnProdQstnList(cfg);
									$("#inqrAnsSbst").val("");
									$("#QstnWrite").hide();
									$("#QstnWriteBtn").hide();
									$(".QstnListArea").show();
                                    $("#QstnList").show();
									                                     
								} else {
									alert("실패하였습니다.");
								}
							}
						});
					} else {
						varData = prodController.getSerializedData({
							inqrNo:inqrNo
							,memoSbst:$("#memoSbst").val()
						});
						
						prodController.ajaxSend({
							cache:false
							,url:'/support/addNotify.json'
							,data:varData
							,dataType:'json'
							,async:false
							,successCall:function(jsonObj){
								if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
									alert("신고 하였습니다.");
								   
									$("#QstnWrite").hide();
									$("#QstnWriteBtn").hide();
									$(".QstnListArea").show();
                                    $("#QstnList").show();
                                    setTimeout(function(){
                                        $('._notifyBtn[inqrno="'+inqrNo+'"]').focus();
                                    },700);                                      
								} else {
									alert("실패하였습니다.");
								}
							}
						});
					}
				} else {
					alert("내용을 입력해 주세요.");
				}
			}
        });
        
        $(".cancel").click(function(e){
			if(!confirm("상담답변 전송신청을 취소하겠습니까?")){
				return;
			}
			e.preventDefault();
			closeQns();
		 	$("#QstnWrite").show();
		 	$("#QstnWriteBtn").show();
		 	$(".QstnListArea").hide();
		});
		
		$(".confirm").click(function(e){
			var request = new Request();
			var prodTypeCd = "";
			var vndrNo = request.getParameter("vndrNo");
			var mphoneNo = "";
			var emailAdr = "";
			var smsAnsYn = "N";
			var emailAnsYn = "N";
			if($("#SMS").is(":checked") == true){
				if($.trim($("#custTel2").val()).length <= 0 || $.trim($("#custTel3").val()).length <= 0){
					alert("핸드폰을 입력해주세요");
					return;
				}
				mphoneNo = $("#custTel1").val() + $.trim($("#custTel2").val()) +  $.trim($("#custTel3").val());
				smsAnsYn = "Y";
			}else{
				smsAnsYn = "N";
			}
			
			if($("#Email").is(":checked") == true){
				if($.trim($("#custEml01").val()).length <= 0 || $.trim($("#custEml02").val()).length <= 0){
					alert("이메일을 입력해주세요");
					return;
				}
				emailAdr = $.trim($("#custEml01").val())+"@"+$.trim($("#custEml02").val());
				emailAnsYn = "Y";
			}else{
				emailAnsYn = "N";
			}
			
			if($("#Agreement").is(":checked") == false){
				alert("개인정보 수집 및 이용 동의를 확인 해주세요");
				return;
			}
			
			if(mphoneNo == "" || mphoneNo == null){
				smsAnsYn = "N" 
			}
			if(emailAdr == "" || emailAdr == null){
				emailAnsYn = "N";
			}
			
			var varData = prodController.getSerializedData({
                prodNo:$("#prodNo").val()
                ,vndrNo:vndrNo
                ,prodTypeCd:prodTypeCd
                ,inqrAnsSbst:$("#inqrAnsSbst").val()
                ,mphoneNo:mphoneNo
                ,emailAdr:emailAdr
                ,smsAnsYn:smsAnsYn
                ,emailAnsYn:emailAnsYn
            });

            prodController.ajaxSend({
                cache:false
                ,url:'https://shop.kt.com/support/prodQstnInsertp.json'
                ,data:varData
                ,dataType:'jsonp'
                ,async:false
                ,type:'GET'
                ,successCall:function(jsonObj){
                    if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                        alert("전문 상담을 성공적으로 등록 하였습니다.");
                        prodController.$qnaList2.empty();
                        var cfg = fnProdQsStnCfg();
                        prodController.fnProdQstnList(cfg);
                        $("#inqrAnsSbst").val("");
                        $("#QstnWrite").hide();
                        $("#QstnWriteBtn").hide();
                        $(".QstnListArea").show();
						$("#QstnList").show();

                        initProdList();

                    } else {
                        alert("실패하였습니다.");
                    }
                }
            });
            
			closeQns();
			
		});
		
		var closeQns = function(){
			$("#NotiQues").prop("checked",false);
		 	$("#CounselReceive").hide();
			$("#CounselReceive input[type=text]").val("");
			$("#Email").prop("checked",false);
			$("label[for=Email]").removeClass("checked");
			$("#mailDomainSelectBox").find('option:first').attr('selected','selected');
			$("#custTel1").find('option:first').attr('selected','selected');
			$("#Agreement").prop("checked",false);
		}
        //구매후기 2건...
        
        if (prodController.$postscriptList != null && prodController.$postscriptList.html() != "" && prodController.$postscriptList.length > 0) {
            prodController.fnProdEvlList({
                prodNo:$("#prodNo").val()
                ,vndrNo:$("#vndrNo").val()
                ,isReflash:true
                ,pageNo:1
                ,recordCount:2
                ,listObj:prodController.$postscriptList
               // ,isMoreBtn:false
                ,isMoreBtn:true
                ,vndrOnly:""
              });
         }

        //최신문의
        if (prodController.$qnaList != null && prodController.$qnaList.length > 0) {
            initProdList();
         }

        var g_aProducQstnEmSize = 0;
        if( typeof( $("#aProducQstn em").size ) == "function"){
        	g_aProducQstnEmSize = $("#aProducQstn em").size();
        }else{
        	// jquery 3버전 이후 size 가 length로 변경됨
        	g_aProducQstnEmSize = $("#aProducQstn em").length;
        }
        if(g_aProducQstnEmSize > 0) {
        	initProdList();
        };
        
        

        //구매후기 전체보기
        $(document).on("click",".postscriptList #aProductReview", function(){
            if( prodController.$postscriptList2.find("div").length  < 1 ) {
                if (prodController.$postscriptList2 != null) {
                    prodController.fnProdEvlList({
                        prodNo:$("#prodNo").val()
                        ,vndrNo:$("#vndrNo").val()
                        ,isReflash:true
                        ,pageNo:1
                        ,recordCount:prodController.recordCount
                        ,listObj:prodController.$postscriptList2
                        ,isMoreBtn:true
                        ,vndrOnly:""
                      });
                }
            } else {
                if('true' == isApp) {
                    /*
                     APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
                     아래는 APP 분기처리 되기전 기존 소스 유지
                     */
                } else {
                    window.setTimeout(function() {
                        $(window).trigger('resize');
                    }, 500);
                }
            }
            $(this).focus();
        });

        $(document).on("click","#aProductReview", function(){
        	
            if( prodController.$postscriptList2.find("div").length  < 1 ) {
                if (prodController.$postscriptList2 != null) {
                    prodController.fnProdEvlList({
                        prodNo:$("#prodNo").val()
                        ,vndrNo:$("#vndrNo").val()
                        ,isReflash:true
                        ,pageNo:1
                        ,recordCount:prodController.recordCount
                        ,listObj:prodController.$postscriptList2
                        ,isMoreBtn:true
                        ,vndrOnly:""
                      });
                }
            } else {
                if('true' == isApp) {
                    /*
                     APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
                     아래는 APP 분기처리 되기전 기존 소스 유지
                     */
                } else {
                    window.setTimeout(function() {
                        $(window).trigger('resize');
                    }, 500);
                }
            }
            $(this).focus();
        });

        // 구매후기 대리점별 보기
        $(document).on("click",".starRating a", function(){
        	
        	var vndrNo = $(this).attr("vndrNo");
        	var vndrNm = $(this).attr("vndrNm");
        	var sortVal = "";
        	if($("#sortVal").length > 0) {
        		sortVal = $("#sortVal").val();
        	}else if($("#vndrSortProd").length > 0) {
        		sortVal = $("#vndrSortProd").val();
        	}
        	var curVndrNo = $("#productReviewAgencyName").attr("vndrNo");
        	var curSortVal = $("#productReviewAgencyName").attr("sortVal");
        	
        	if( (curVndrNo != "" && curVndrNo != vndrNo) || (curSortVal != sortVal) ) {
        		prodController.$postscriptListVndr.html("");
        		$("#productReviewAgencyName").attr("vndrNo", vndrNo);
        		$("#productReviewAgencyName").attr("sortVal", sortVal);
        	}
        	
            if( prodController.$postscriptListVndr.find("div").length  < 1 ) {
                if (prodController.$postscriptListVndr != null) {
                    prodController.fnProdEvlList({
                        prodNo:$("#prodNo").val()
                        ,vndrNo:vndrNo
                        ,isReflash:false
                        ,pageNo:1
                        ,recordCount:prodController.recordCount
                        ,listObj:prodController.$postscriptListVndr
                        ,isMoreBtn:true
                        ,vndrNm:vndrNm
                        ,vndrOnly:"Y"
                        ,sortVal:sortVal
                      });
                }
            } else {
                if('true' == isApp) {
                    /*
                     APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
                     아래는 APP 분기처리 되기전 기존 소스 유지
                     */
                } else {
                    window.setTimeout(function() {
                        $(window).trigger('resize');
                    }, 500);
                }
            }
        });
        

        //전문상담 전체보기
        $("#aProducQstn").click(function() {
            if( prodController.$qnaList2.find("div").length  < 1 ) {
                if (prodController.$qnaList2 != null) {
                    var cfg = fnProdQsStnCfg();

                    prodController.fnProdQstnList(cfg);
                }
                
            }else {
                if('true' == isApp) {
                    /*
                     APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
                     아래는 APP 분기처리 되기전 기존 소스 유지
                     */
                } else {
                    window.setTimeout(function() {
                        $(window).trigger('resize');
                    }, 500);
                }
            }

            $("#inqrAnsSbst").val("");
            $("#QstnWrite").hide();
            $("#QstnWriteBtn").hide();
            $(".QstnListArea").show();
            $("#QstnList").show();
            return false;
        });

        $(document).on("click","a.btn_contOpen",function(){
            if($(this).parent().parent().hasClass("on")){
                $(this).attr("title","열기").parent().parent().removeClass("on").end().find('.hidden').text('열기');
            } else {
                $(this).attr("title","닫기").parent().parent().addClass("on").end().find('.hidden').text('닫기');
            }
			$(this).focus();
        });

        //구매 후기 [더보기] 버튼
        $(document).on("click","#productReview .postscriptList a.btnMore",function(){
            var pageNo = $(this).attr("pageNo");

            $(this).remove();
            prodController.fnProdEvlList({
                prodNo:$("#prodNo").val()
                ,vndrNo:$("#vndrNo").val()
                ,isReflash:false
                ,pageNo:parseInt(pageNo,10)
                ,recordCount:prodController.recordCount
                ,listObj:prodController.$postscriptList2
                ,isMoreBtn:true
                ,vndrOnly:""
              });
        });

        //구매 후기(대리점별) [더보기] 버튼
        $(document).on("click","#productReviewVndr .postscriptList a.btnMore",function(){
            var pageNo = $(this).attr("pageNo");
            var vndrNo = $(this).attr("vndrNo");
        	var sortVal = "";
        	if($("#sortVal").length > 0) {
        		sortVal = $("#sortVal").val();
        	}else if($("#vndrSortProd").length > 0) {
        		sortVal = $("#vndrSortProd").val();
        	}

            $(this).remove();
            prodController.fnProdEvlList({
                prodNo:$("#prodNo").val()
                ,vndrNo:vndrNo
                ,isReflash:false
                ,pageNo:parseInt(pageNo,10)
                ,recordCount:prodController.recordCount
                ,listObj:prodController.$postscriptListVndr
                ,isMoreBtn:true
                ,vndrOnly:"Y"
                ,sortVal:sortVal
              });
        });


        prodController.$btnListMore.click(function(){
            var pageNo = $(this).attr("pageNo");

            prodController.qPageCnt =  parseInt(pageNo,10) ;

            prodController.fnProdQstnList({
                prodNo:$("#prodNo").val()
                ,pageNo:parseInt(pageNo,10)
                ,recordCount:prodController.recordCount
                ,listObj:prodController.$qnaList2
                ,fnGetHtml:prodController.getRowTemplateQsnD
                ,strNodata:"<div class='nodataBxo'><div class='nodata'> 문의 내용이 없습니다.</div></div>"
                ,isMoreBtn:true
              });
        });
        
        //글자수 체크
        $("#inqrAnsSbst").keyup(function(){
        	var $obj=$("#inqrAnsSbst");

        	var lsStr=$obj.val();               //이벤트가 일어난 컨트롤의 value값
            var lsStrLen=lsStr.length;          //전체길이
            var maxLen= 1000;                    //제한할 글자수 크기
            var liByte=0;                       //한글일 경우는 2 그밖에는 1을 더함
            var liLen=0;                        //substring하기위해사용
            var lsOneChar="";                   //한글자씩 검사한다.
            var lsStr2="";                      //글자수를 초과하면 제한할 수 글자전까지만 보여준다.

            for(var i=0;i<lsStrLen;i++)
            {
                //한글자추출
                lsOneChar=lsStr.charAt(i);
                //한글이면 2를 더한다.
                if(escape(lsOneChar).length>4){
                    liByte=liByte+2;
                } else if((lsOneChar =='\r' && lsStr.charAt(i+1) =='\n') || lsOneChar=='\n'){
                    liByte=liByte+2;
                } else {
                    liByte++;
                }

                //전체 크기가 maxLen을 넘지않으면
                if(liByte<=maxLen){
                    liLen=i+1;
                }
            }

            //전체길이를 초과하면
            if(liByte>maxLen) {
                $obj.val(lsStr.substr(0,liLen));
            }else{
        		$(this).next().find("span").html(liByte);
        	}
        	
        });
        
        //전문 상담 삭제 Click
        $(document).on("click","._delBtn",function(){
            wordMode = 'del';
            var inqrNo = $(this).attr("inqrNo");

            if ( !confirm("삭제 하시겠습니까?(Y/N)") ) {
                return false;
            }

            var varData = prodController.getSerializedData({
                inqrNo:inqrNo
            });

            prodController.ajaxSend({
                cache:false
                ,url:'/support/deleteProdQstnUpdate.json'
                ,data:varData
                ,dataType:'json'
                ,async:false
                ,successCall:function(jsonObj){
                    if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                        alert("성공적으로 삭제 하였습니다.");
                        prodController.$qnaList2.empty();
                        var cfg = fnProdQsStnCfg();
                        prodController.fnProdQstnList(cfg);
						 
                    } else {
                        alert("실패하였습니다.");
                    }
                }
            });
        });


      //전문 상담 삭제 Click
        $(document).on("click","._updateBtn",function(){
            var inqrNo = $(this).attr("inqrNo");
            var inqrAnsSbst = $("#inqr_"+inqrNo).html(); 
            inqrAnsSbst = inqrAnsSbst.replace("<br>","\n")

            $("#inqrAnsSbst").val(inqrAnsSbst);
            $("#btnInsertQs").attr("inqrNo",inqrNo);
            $("#btnInsertQs").html("수정");
            $("#QstnWrite").show();
            $("#QstnWriteBtn").show();
            $(".QstnListArea").hide();
            $("#QstnList").hide();
            $("#pushAgree").hide();
            $('#inqrAnsSbst').focus();             
        });
        
      //신고 Click
        $(document).on("click","._notifyBtn",function(){
            var inqrNo = $(this).attr("inqrNo");
            
            // 포커싱 입력
            focusQnAInfo = {inqrNo:inqrNo, class:"_notifyBtn"};
            
            if(LOGIN_YN  == 'Y'){
                $("#inqrAnsSbst").val("");
                $("#inqrAnsSbst").attr("placeholder","신고 글을 작성해 주세요~ 욕설/비방/광고성 글이나 불건전한 내용의 경우 삭제될 수 있습니다.");
                $("#btnInsertQs").attr("inqrNo",inqrNo);
                $("#btnInsertQs").html("신고");
                $("#QstnWrite").show();
                $("#QstnWriteBtn").show();
                $(".QstnListArea").hide();
                $("#QstnList").hide();
                $("#inqrAnsSbst").focus();
            } else {
				if('true' == isApp) {
					appLoginSend("prodCommAppRtn","1");
				} else {
	                if(confirm('로그인 하시겠습니까?')){
	                    location.href = loginUrl + location.href ;
	                } else {
	                    return;
	                }
				}
            }

        });

      //나도궁금합니다, 추천 합니다.  Click
        $(document).on("click","._reComBtn",function(){
            var inqrNo = $(this).attr("inqrNo");

            var varData = prodController.getSerializedData({
                inqrNo:inqrNo
                ,evlSeq:0
            });
            
            // 포커싱 입력
            focusQnAInfo = {inqrNo:inqrNo, class:"_reComCancelBtn"};

            if(LOGIN_YN  == 'Y'){

                prodController.ajaxSend({
                    cache:false
                    ,url:'/support/addRecomm.json'
                    ,data:varData
                    ,dataType:'json'
                    ,async:false
                    ,successCall:function(jsonObj){
                        if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                            alert("추천 처리 되었습니다. ");

                            prodController.$qnaList2.empty();
                            var cfg = fnProdQsStnCfg();
                            cfg.recordCount = prodController.recordCount * prodController.qPageCnt ;
                            prodController.fnProdQstnList(cfg);

                        } else {
                            alert("실패하였습니다.");
                        }
                    }
                });

				$(this).attr("title", "선택됨");
            } else {
				if('true' == isApp) {
					appLoginSend("prodCommAppRtn","1");
				} else {
	                if(confirm('로그인 하시겠습니까?')){
	                    location.href = loginUrl + location.href ;
	                } else {
	                    return;
	                }
				}
            }
			$(this).focus();
        });


        //나도궁금합니다. 취소  Click
        $(document).on("click","._reComCancelBtn",function(){
            var inqrNo = $(this).attr("inqrNo");

            var varData = prodController.getSerializedData({
                inqrNo:inqrNo
            });

            var $thisObj = $(this).parent();
            
            // 포커싱 입력
            focusQnAInfo = {inqrNo:inqrNo, class:"_reComBtn"};

            prodController.ajaxSend({
                cache:false
                ,url:'/support/cancelRecomm.json'
                ,data:varData
                ,dataType:'json'
                ,async:false
                ,successCall:function(jsonObj){
                    if(jsonObj.responseCode == AJAX_RESULT_CODE.SUCCESS) {
                        alert("취소 처리 되었습니다. ");
                        prodController.$qnaList2.empty();
                        var cfg = fnProdQsStnCfg();
                        cfg.recordCount = prodController.recordCount * prodController.qPageCnt ;
                        prodController.fnProdQstnList(cfg);

                    } else {
                        alert("실패하였습니다.");
                    }
                }
            });

			$(this).attr("title", "");
        });
        /*추가 질문하기 */
        $(document).on("click","._reQuestion",function(){ 
            $("._write").show();
            $("._list").hide();
            $("#inqrAnsSbst").attr("placeholder","무엇을 도와드릴까요?");
            $("#btnInsertQs").attr("inqrNo","");
            $("#btnInsertQs").html("질문하기");
            $("#inqrAnsSbst").val("");
        }) ;        
 /*       
        $(window).bind('resize', function (event) {
            var content_height = $.mobile.activePage.children('[data-role="content"]').height(),
                header_height  = $.mobile.activePage.children('[data-role="header"]').height(),
                footer_height  = $.mobile.activePage.children('[data-role="footer"]').height(),
                window_height  = $(this).height();

            if (content_height < (window_height - header_height - footer_height)) {
                $.mobile.activePage.css('min-height', (content_height + header_height + footer_height));
                setTimeout(function () {
                    $.mobile.activePage.children('[data-role="footer"]').css('top', 0);
                }, 500);
            }
            
            event.stopImmediatePropagation();
        })
*/
        if('true' == isApp) {
            /*
             APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
             아래는 APP 분기처리 되기전 기존 소스 유지
             */
        } else {
            $(window).bind('resize', function (event) {

            	if( $.mobile != undefined){
                    $.mobile.activePage.css('min-height', 'auto');

                    //   if (content_height < (window_height - header_height - footer_height)) {

                    setTimeout(function () {
                        //$.mobile.activePage.css('min-height', (content_height + header_height + footer_height));
                        $.mobile.activePage.css('min-height', 0);
                    }, 500);
                    //  }

                    event.stopImmediatePropagation();            		
            	}

            })
        }
        /*if(location.href.includes("#productReview")){
            $("#aProductReview, .aProductReview").trigger("click");
        }
        if(location.href.includes("#producQstn")){
            $("#aProducQstn").trigger("click");
        }*/
        

    }
    ,fnProdEvlList:function(cfg) {
        //구매후기 리스트
        var varData = prodController.getSerializedData({
            prodNo:(cfg.prodNo == undefined) ? '' : cfg.prodNo
            ,vndrNo:(cfg.vndrNo == undefined) ? '' : cfg.vndrNo
            ,pageNo:(cfg.pageNo == undefined) ? 1 : cfg.pageNo
            ,recordCount:(cfg.recordCount == undefined) ? 10 : cfg.recordCount
       		,vndrOnly:(cfg.vndrOnly == undefined) ? '' : cfg.vndrOnly
       		,sortVal:(cfg.sortVal == undefined) ? '' : cfg.sortVal
        });

        var MSHOP_DOMAIN_HTTPS = $("#MSHOP_DOMAIN_HTTPS").val();

        if($('input[name=SERVER_NAME]').val() == 'DEV') {
        	MSHOP_DOMAIN_HTTPS = '';
        }
        
        prodController.ajaxSend({
          cache:false
          ,url:'/m/person/ProdEvlList.json'
          ,data:varData
          ,dataType:'json'
          ,async:false
          ,successCall:function(jsonObj){

              var pageObj = jsonObj.PAGE_DATA ;
              var listData = jsonObj.LIST_DATA;
              var arrStr =[];

              if (cfg.isReflash) {
            	  $("#aProductReview em").html("("+pageObj.totalCount+")");
//                  arrStr.push("<h3 class='normalF'>구매후기 (<span class='fontRed'>"+pageObj.totalCount+"</span>)</h3>\n");
               }
              
              if(prodController.$postscriptList == cfg.listObj){
            	  $('a[href="#productReview"] em').text('('+pageObj.totalCount+')');
            	  return;
              } else {
                  if (cfg.vndrOnly == "Y") {
                	  $('#productReviewVndr .header > h3 span.fontRed').text(pageObj.totalCount);
                	  $('#productReviewAgencyName').text(cfg.vndrNm);
                  }else{
                	  $('#productReview .header > h3 span.fontRed').text(pageObj.totalCount);
                  }
              }
            	  
              if(listData!=undefined && listData.length > 0 ){
                  for (var i=0 ; i < listData.length ; i++) {
                      arrStr.push(prodController.getRowTemplateEvl(listData[i]));
                  }
              } else {
                  arrStr.push("<div class='nodataBxo'><div class='nodata'> 구매후기가 없습니다.</div></div>\n");
              }
              
              cfg.listObj.append(arrStr.join(''));

              if (cfg.isMoreBtn) {
                  if (cfg.pageNo == undefined) {
                      cfg.pageNo = 1;
                  }

                  if (cfg.pageNo < jsonObj.PAGE_DATA.totalPageCount ) {
                      cfg.listObj.append("<a href='javascript:void(0);' class='btnMore' pageNo="+(cfg.pageNo+1)+" vndrNo="+(cfg.vndrNo)+" ><span>더보기</span></a>");
                  }
                  
                  window.setTimeout(function() {
                      $(window).trigger('resize');
                   }, 500);
                  
              }
          }
        });
    }
    ,getRowTemplateEvl:function(obj){
        var arr =[];

        var prodEvlTxnBean = obj.prodEvlTxnBean ;
        var vndrBasBean = obj.vndrBasBean ;
        var prodBasBean = obj.prodBasBean ;
        var prodTypeCd = prodBasBean.prodTypeCd;
        var vndrNm = "" ;
        var mkeDt = new Date(prodEvlTxnBean.prodEvlMkeDt);
        var ansSbst = prodEvlTxnBean.ansSbst ;

        if (vndrBasBean != undefined) {
            vndrNm = vndrBasBean.vndrNm ;
        }

        arr.push("<div class='on'>\n");
        arr.push("    <em>"+prodEvlTxnBean.mkerNm+"   <span>"+ mkeDt.format("yyyy.MM.dd") +"</span></em>\n");
        arr.push("    <span class='point'><em style='width:"+prodController.getStarPercent(prodEvlTxnBean.evlScore)+"%'></em><span class='hidden'>"+prodEvlTxnBean.evlScore+"평점</span></span>\n");
        arr.push("    <div>\n");
        arr.push("        <p>"+prodEvlTxnBean.prodEvlSbstToBr+"</p>\n");


        //WL WR
        if (prodTypeCd == 'AC') {
            /*arr.push("        <p>상품만족도 <span class='point'><em style='width:"+prodController.getStarPercent(prodEvlTxnBean.evlScore)+"%'></em></span> </p>\n");*/
        } else if (prodTypeCd == 'WR') {
            arr.push("        <ul>\n");
            arr.push("            <li>가격/혜택 <span>"+prodEvlTxnBean.prod1SdegVal+"점</span></li>\n");
            arr.push("            <li>상품안내 <span>"+prodEvlTxnBean.prod2SdegVal+"점</span></li>\n");
            arr.push("            <li>안내/서비스 <span>"+prodEvlTxnBean.prod3SdegVal+"점</span></li>\n");
            arr.push("        </ul>\n");
        } else {
            arr.push("        <ul>\n");
            arr.push("            <li>가격/혜택 <span>"+prodEvlTxnBean.prod1SdegVal+"점</span></li>\n");
            arr.push("            <li>배송상태 <span>"+prodEvlTxnBean.prod2SdegVal+"점</span></li>\n");
            arr.push("            <li>안내/서비스 <span>"+prodEvlTxnBean.prod3SdegVal+"점</span></li>\n");
            arr.push("        </ul>\n");
        }

        if (ansSbst != undefined  && prodEvlTxnBean.ansDt != undefined) {
            var ansDt = new Date(prodEvlTxnBean.ansDt) ;
            arr.push("        <div>\n");
            arr.push("            <em>"+vndrNm+" <span>"+ansDt.format("yyyy.MM.dd")+"</span></em>\n");
            arr.push("            <p>"+prodEvlTxnBean.ansSbstToBr+"</p>\n");
            arr.push("        </div>\n");
        }
        arr.push("        <a href='javascript:void(0)' class='btn_contOpen' title='닫기' role='button'><em class='hidden'>닫기</em></a>\n");
        arr.push("    </div>\n");
        arr.push("</div>\n");

        return arr.join('') ;
    }
    ,fnProdQstnList:function(cfg) {
        
        var vndrNo = "";
        if ($("#vndrNo").val() != undefined) {
            vndrNo = $("#vndrNo").val();
        }
        
        var varData = prodController.getSerializedData({
            prodNo:cfg.prodNo
            ,vndrNo:vndrNo
            ,orderbyVal:(cfg.orderbyVal == undefined) ? "INQR_MKE_DT" : cfg.orderbyVal
            ,pageNo:(cfg.pageNo == undefined) ? 1 : cfg.pageNo
            ,recordCount:(cfg.recordCount == undefined) ? 10 : cfg.recordCount
        });

        //INQR_MKE_DT

        prodController.ajaxSend({
            cache:false
            ,url:'/support/prodQstnList.json'
            ,data:varData
            ,dataType:'json'
            ,async:false
            ,successCall:function(jsonObj){
                var listData = jsonObj.LIST_DATA;
                var pageInfoBean = jsonObj.PAGE_DATA ;
                if(listData!=undefined && listData.length > 0 ){
                    for (var i=0 ; i < listData.length ; i++) {
                        var strHtml = cfg.fnGetHtml(listData[i]);
                        cfg.listObj.append(strHtml);
                    }

                    $("._producQstnHead").html("전문상담<em class=\"point_color\">("+prodController.addCom(pageInfoBean.totalCount)+")</em>");
                    $("#aProducQstn em").html("("+prodController.addCom(pageInfoBean.totalCount)+")");
                } else {
                    cfg.listObj.empty();
                    cfg.listObj.append(cfg.strNodata);
                }

                if (cfg.isMoreBtn) {
                    if (cfg.pageNo == undefined) {
                        cfg.pageNo = 1;
                    }

                    if (cfg.pageNo < jsonObj.PAGE_DATA.totalPageCount ) {
                        prodController.$btnListMore.show();
                        prodController.$btnListMore.attr("pageNo",cfg.pageNo+1);
                        prodController.$btnListMore.html("10개 더보기<span>("+cfg.pageNo+"/"+jsonObj.PAGE_DATA.totalPageCount+")</span>");
                    } else {
                        prodController.$btnListMore.hide();
                    }
                    
                    
                    window.setTimeout(function() { 
                        $(window).trigger('resize');
                     }, 400);
                } 
                setTimeout(function(){
                    if(wordMode == "write"){
                        $('#producQstnInsert').focus(); //질문
                    }else{
                        // QnA 포커싱 구현
                        if (focusQnAInfo) {
                        	var $focusTg = $("a[inqrno=" +focusQnAInfo.inqrNo+ "]." + focusQnAInfo.class);
                        	if ($focusTg.length > 0) {
                        		$focusTg.focus();
                        	} else {
                        		$('#aProducQstn').focus(); //Q&A로 이동
                        	}
                        	focusQnAInfo = null;
                        } else {
                        	$('#aProducQstn').focus(); //Q&A로 이동
                        }
                    } 
                },600)
            }
        });
    }
    ,getRowTemplateQsnM:function(obj){
        var arr =[];
        var prodQstnTxnList = obj.prodQstnTxnList ;

        arr.push("<p><em>Q. </em>"+obj.inqrAnsSbst+"</p>\n");

        if (prodQstnTxnList != null &&  prodQstnTxnList.length > 0) {
            var prodQstnTxn =prodQstnTxnList[0];
            if (prodQstnTxn != undefined ) {
                arr.push("<p>\n");
                arr.push("    <em>A. </em>\n");
                arr.push("        "+ prodQstnTxn.ansPrfcSbstBr + prodQstnTxn.inqrAnsSbst + prodQstnTxn.ansConreSbstBr+"\n");
                arr.push("</p>\n");
            }
        }

        return arr.join('') ;
    }
    ,getRowTemplateQsnD:function(obj){
        var arr =[];
        var rcpDt = new Date(obj.inqrMkeDt);
        var prodQstnTxnList = obj.prodQstnTxnList ;

        /*  질문 추가 */  
        //arr.push("<div style='border-bottom:1px solid #C9C9C9; padding:8px 0 13px;'>\n");
        arr.push("<div class='list_box'>\n");
        arr.push("    <span class='data'><span class='blind'>질문</span><em></em>"+rcpDt.format("yyyy-MM-dd HH:mm:ss")+"</span>\n");
        arr.push("    <div>\n");
        arr.push("        <p id='inqr_"+obj.inqrNo+"'>"+obj.inqrAnsSbst+"</p>\n");

        if (obj.owner) {
            arr.push("  <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' class='btnWhite1 _delBtn' title='삭제'>삭제</a>\n");
            arr.push("  <a href='javascript:void(0)'  class='btnWhite1 _updateBtn' inqrAnsSbst='"+obj.inqrAnsSbst+"' inqrNo='"+obj.inqrNo+"' title='수정'>수정</a>\n");
        } else {
            if (obj.ownerRetvCascnt > 0) {
                //arr.push("  <a href='javascript:void(0)' class='btnWhite1 _reComCancelBtn'inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" >나도 궁금합니다.취소 <span>(<em>"+obj.retvCascnt+"</em>)</span></a> \n");
                arr.push("  <a href='javascript:void(0)' class='btnWhite1 _reComCancelBtn'inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+"  title='공감취소하기'>나도 궁금합니다. <span><em>"+obj.retvCascnt+"</em></span></a> \n");
            } else {
                //arr.push("  <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" class='btnWhite1 _reComBtn' >나도 궁금합니다. <span>(<em>"+obj.retvCascnt+"</em>)</span></a>\n");
                arr.push("  <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" class='btnWhite1 _reComBtn' title='공감누르기'>나도 궁금합니다. <span><em>"+obj.retvCascnt+"</em></span></a>\n");
            }
            
            arr.push("  <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" class='btnWhite1 _notifyBtn' title='신고하기'>신고</a>\n");
            
        }
       
        if (prodQstnTxnList != null &&  prodQstnTxnList.length > 0) {
            var prodQstnTxn =prodQstnTxnList[0];
            var trtDt = new Date(prodQstnTxn.trtDt);

            arr.push("    <div class='reply'>\n");
            //arr.push("        <span class='counselor'><em class='hidden'>olleh shop MD</em></span>\n");
            if(prodQstnTxn.vndrNm == "직영온라인"){
            	arr.push("        <span class='counselor'><em class='blind'>답변</em><em>KT Shop MD</em></span>\n");
            }else{
            	arr.push("        <span class='counselor'><em class='blind'>답변</em><em>"+ prodQstnTxn.vndrNm +"</em></span>\n");
            }
            // arr.push("        <strong class='mobile'>"+prodQstnTxn.mkerId+"</strong>\n");    // DR-2017-17122) 상담원 ID 미노출처리
            arr.push("        <span class='data'>"+trtDt.format("yyyy-MM-dd HH:mm:ss")+"</span>\n");
            arr.push("        <div>\n");
            arr.push("            <p>"+ prodQstnTxn.ansPrfcSbstBr + prodQstnTxn.inqrAnsSbst + prodQstnTxn.ansConreSbstBr+"</p>\n");
            //arr.push("            <a href='javascript:void(0);' inqrNo='"+prodQstnTxn.inqrNo+"' retvCascnt="+prodQstnTxn.retvCascnt+" class='btnWhite1 _reComBtn'>추천합니다. ("+ prodQstnTxn.retvCascnt +")</a>\n");
            arr.push("            <a href='javascript:void(0);' inqrNo='"+prodQstnTxn.inqrNo+"' retvCascnt="+prodQstnTxn.retvCascnt+" class='btnWhite1 _reComBtn' title='추천누르기'>추천합니다. <span><em>"+ prodQstnTxn.retvCascnt +"</em></span></a>\n");
            arr.push("        </div>\n");
            arr.push("        </div>\n");
            arr.push("    </div>\n");
            arr.push("</div>\n");
        }
        /* //  질문 추가 */   
        /*질문 추가 
        arr.push("<div class='newList'>\n");
        arr.push("    <span class='data'>"+rcpDt.format("yyyy-MM-dd HH:mm:ss")+"</span>\n");
        arr.push("    <div>\n");
        arr.push("        <p>"+obj.inqrAnsSbst+"</p>\n");
        arr.push("			<div class='opt opt-r'>\n");	
        if (obj.owner) {  
            arr.push("  <a href='javascript:void(0)'  class='btnWhite1 _updateBtn' inqrAnsSbst='"+obj.inqrAnsSbst+"' inqrNo='"+obj.inqrNo+"' >수정</a>\n");
            arr.push("  <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' class='btnWhite1 _delBtn' >삭제</a>\n");
        } else { 
            if (obj.ownerRetvCascnt > 0) {
                arr.push("  <a href='javascript:void(0)' class='btnWhite1 _reComCancelBtn'inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" >나도 궁금합니다.취소 <span>(<em>"+obj.retvCascnt+"</em>)</span></a> \n");
            } else {
                arr.push("  <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" class='btnWhite1 _reComBtn' >나도 궁금합니다. <span>(<em>"+obj.retvCascnt+"</em>)</span></a> \n");
            }
            
            arr.push(" <a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' retvCascnt="+obj.retvCascnt+" class='btnWhite1 _notifyBtn' style='margin-left: 3px;'>신고</a>\n");
            
        }  
        
        arr.push("			</div>\n");
        arr.push("    </div>\n");

       
        if (prodQstnTxnList != null &&  prodQstnTxnList.length > 0) {
            var prodQstnTxn =prodQstnTxnList[0];
            var trtDt = new Date(prodQstnTxn.trtDt);

            arr.push("    <div class='reply newReply'>\n");
            arr.push("        <span class='counselor'><em class='hidden'>KT Shop MD</em></span>\n");
            arr.push("        <strong class='mobile'>"+prodQstnTxn.mkerId+"</strong>\n");
            arr.push("        <span class='data'>"+trtDt.format("yyyy-MM-dd HH:mm:ss")+"</span>\n");
            arr.push("        <div>\n");
            arr.push("            <p>"+ prodQstnTxn.ansPrfcSbstBr + prodQstnTxn.inqrAnsSbst + prodQstnTxn.ansConreSbstBr+"</p>\n");
            arr.push("        		<div class='opt'>\n");
            arr.push("          		  <a href='javascript:void(0);' inqrNo='"+prodQstnTxn.inqrNo+"' retvCascnt="+prodQstnTxn.retvCascnt+" class='btnWhite1 _reComBtn'>추천합니다. ("+ prodQstnTxn.retvCascnt +")</a>\n");
            arr.push("          		  <a href='javascript:void(0);'  retvCascnt="+prodQstnTxn.retvCascnt+" class='btnWhite1 _reQuestion'>질문하기</a>\n");
            arr.push("        		</div>\n");
            arr.push("        </div>\n"); 
            arr.push("    </div>\n"); 
            arr.push("		<div class='newList'  >\n");
            arr.push("    		<span class='data'>"+rcpDt.format("yyyy-MM-dd HH:mm:ss")+"</span>\n");
            arr.push("    		<div>\n");
            arr.push("    	 	 	<p>"+obj.inqrAnsSbst+"</p>\n");
            arr.push("				<div class='opt'>\n");	             
            arr.push("  				<a href='javascript:void(0)'  class='btnWhite1 _updateBtn' inqrAnsSbst='"+obj.inqrAnsSbst+"' inqrNo='"+obj.inqrNo+"' >수정</a>\n");
            arr.push("  				<a href='javascript:void(0)' inqrNo='"+obj.inqrNo+"' class='btnWhite1 _delBtn' >삭제</a>\n");     
            arr.push("				</div>\n");
            arr.push("    		</div>\n");
            arr.push("		</div>\n"); 
            
            arr.push("    <div class='reply newReply'>\n");
            arr.push("        <span class='counselor'><em class='hidden'>olleh shop MD</em></span>\n");
            arr.push("        <strong class='mobile'>"+prodQstnTxn.mkerId+"</strong>\n");
            arr.push("        <span class='data'>"+trtDt.format("yyyy-MM-dd HH:mm:ss")+"</span>\n");
            arr.push("        <div>\n");
            arr.push("            <p>"+ prodQstnTxn.ansPrfcSbstBr + prodQstnTxn.inqrAnsSbst + prodQstnTxn.ansConreSbstBr+"</p>\n");
            arr.push("        		<div class='opt'>\n");
            arr.push("          		  <a href='javascript:void(0);' inqrNo='"+prodQstnTxn.inqrNo+"' retvCascnt="+prodQstnTxn.retvCascnt+" class='btnWhite1 _reComBtn'>추천합니다. ("+ prodQstnTxn.retvCascnt +")</a>\n");
            arr.push("          		  <a href='javascript:void(0);'  retvCascnt="+prodQstnTxn.retvCascnt+" class='btnWhite1 _reQuestion'>질문하기</a>\n");
            arr.push("        		</div>\n");
            arr.push("        </div>\n"); 
            arr.push("    </div>\n");     
            
            arr.push("</div>\n");
            
        }   
        // 추가질문*/	
        return arr.join('') ;
    },
    // 집전화, 인터넷 전화 포함 인터넷 상품 주문 화면
    goProdViewInternet:function(tgtProdNo,baseProdNo,addTv,addPhone,addInterPhone){
    	prodController.createForm({
    		id:"SubmitObj"
    		,name:"SubmitObj"
    		,method:"get"
    		,action:"/m/internet/orderInternetView.do"
    	});

    	prodController.attachHiddenElement("baseProdNo",baseProdNo);
    	prodController.attachHiddenElement("tgtProdNo",tgtProdNo);
    	prodController.attachHiddenElement("addWithTv",addTv);
    	prodController.attachHiddenElement("addWithPhone",addPhone);
    	prodController.attachHiddenElement("addWithInterPhone",addInterPhone);
    	prodController.formSubmit();
    }


});

var evalOpinTextCheck = function(){
	
	var cnt = $("#inqrAnsSbst").val().length;
	var inqrAnsSbst = $("#inqrAnsSbst").val();

	var rByte = 0;
	var rLen = 0;
	var oneChar =""
	var inqrAnsSbst2 = "";
	
	var newNum = cnt;
	
	for(var i=0 ; i < newNum ; i++){
		oneChar = inqrAnsSbst.charAt(i);
		if(escape(oneChar).length > 4){
			// 한글 3Byte
			rByte += 2;
		}else{
			rByte ++;
			
		}
		if(rByte <= 1000){
			rLen = i + 1;
		}
	}

	if(rByte > 1000){
		alert("최대 1000byte까지 입력 가능합니다.");
		inqrAnsSbst2 = inqrAnsSbst.substr(0,rLen);
		$("#inqrAnsSbst").val(inqrAnsSbst2);
		rByte = 1000;
	}
	
	
	/*if(newNum > 1000)
	{
		alert("최대 1000byte까지 입력 가능합니다.");
		var tempText = ($("#inqrAnsSbst").val()).substring(0, 1000);
		newNum = newNum - 1;
		$("#inqrAnsSbst").val(tempText);
	}*/
	$(".font_cnt .text_numbers").text(rByte)
};

function Request(){
	var requestParam = "";
	
	this.getParameter = function(param){
		var url = unescape(location.href);
		var paramArr = (url.substring(url.indexOf("?")+1, url.length)).split("&");
		
		for(var i=0; i<paramArr.length;i++){
			var temp = paramArr[i].split("=");
			if(temp[0].toUpperCase() == param.toUpperCase()){
				requestParam = paramArr[i].split("=")[1];
				break;
			}
		}
		return requestParam;
	}
}

/*
 APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
 새로 추가된 소스
 */
if('true' == isApp) {
    $(window).load(function() {
        if ($("#productReview").is(":visible")) {
            $("#aProductReview").trigger("click");
        }

        if ($("#producQstn").is(":visible")) {
            $("#aProducQstn").trigger("click");
        }
    });
}

$(document).ready(function(){
    prodController.init();

    if('true' == isApp) {
        /*
         APP에서 setTImeout로 인한 jquery mobile min-height 오류로 인한 분기 처리
         아래는 APP 분기처리 되기전 기존 소스 유지
         */
    } else {
        window.setTimeout(function() {
            if ($("#productReview").is(":visible")) {
                $("#aProductReview").trigger("click");
            }

            if ($("#producQstn").is(":visible")) {
                $("#aProducQstn").trigger("click");
            }

        }, 500);
    }
    
    $(document).on("blur keyup", ".tel", function() {
        $(this).val($(this).val().replace(/[^0-9]/gi,""));
    });
    
});

//APP에서 리턴 받은 스크립트
var prodCommAppRtn = function(jsonObj,turn) {
	// obj가 공백이면 APP도 비로그인 상태
	if("" == jsonObj) {
		if("1" == turn) {
			if(confirm('로그인 하시겠습니까?')){
				location.href = loginUrl + location.href;
			} else {
				return;
			}
		}
	} else {
		alert("재 로그인 합니다.");
		apploginprocess(jsonObj,getRtnUrl(false));
	}
};

