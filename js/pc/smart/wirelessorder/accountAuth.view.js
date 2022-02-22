document.domain = 'kt.com';
VALIDATE_NOT_EMPTY_MSG = {};
VALIDATE_NOT_EMPTY_MSG.inputOtpNo = "인증번호를 입력해 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.accountNo = "계좌번호를 입력해 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.accountOwnerNm = "예금주를 입력해 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.accountCd = "금융코드를 선택해 주시기 바랍니다.";

VALIDATE_NUMBER_MSG = {};
VALIDATE_NUMBER_MSG.inputOtpNo = "인증번호를 숫자로 입력해 주시기 바랍니다.";
VALIDATE_NUMBER_MSG.accountNo = "계좌번호를 숫자로 입력해 주시기 바랍니다.";
VALIDATE_NOT_EMPTY_MSG.accountCd = "금융코드를 선택해 주시기 바랍니다.";

VALIDATE_FIX_MSG = {};
VALIDATE_FIX_MSG.inputOtpNo= "인증번호를 6자리 숫자로 입력해 주세요.";

var controller = $.extend(new $.CommonObj(), {
	accountUniqCd : '',
	maskedAccountNo : '',
	financeName :
				[
		    	{'className':'f-keb','name':'KEB 하나은행','accountCd':'081'},
				{'className':'f-sc','name':'SC 제일은행','accountCd':'023'},
				{'className':'f-kb','name':'국민은행','accountCd':'004'},
				{'className':'f-ki','name':'기업은행','accountCd':'003'},
				{'className':'f-nh','name':'농협은행','accountCd':'011'},
				{'className':'f-shinhan','name':'신한은행','accountCd':'088'},
				{'className':'f-woori','name':'우리은행','accountCd':'020'},
				{'className':'f-kakao','name':'카카오뱅크','accountCd':'090'},
				{'className':'f-kbank','name':'케이뱅크','accountCd':'089'},
				{'className':'f-city','name':'한국씨티은행','accountCd':'027'},
				{'className':'f-gyeongnam','name':'경남은행','accountCd':'039'},
				{'className':'f-gwangju','name':'광주은행','accountCd':'034'},
				{'className':'f-nh2','name':'농협중앙회','accountCd':'012'},
				{'className':'f-daegu','name':'대구은행','accountCd':'031'},
				{'className':'f-busan','name':'부산은행','accountCd':'032'},
				{'className':'f-saneob','name':'산업은행','accountCd':'002'},
				{'className':'f-sangho','name':'상호저축은행','accountCd':'050'},
				{'className':'f-saemaeul','name':'새마을금고중앙회','accountCd':'045'},
				{'className':'f-suhyeob','name':'수협은행/수협중앙회','accountCd':'007'},
				{'className':'f-sinhyeob','name':'신협중앙회','accountCd':'048'},
				{'className':'f-post','name':'우체국','accountCd':'071'},
				{'className':'f-jeonbug','name':'전북은행','accountCd':'037'},
				{'className':'f-jeju','name':'제주은행','accountCd':'035'},
				{'className':'f-kbi','name':'KB 증권','accountCd':'218'},
				{'className':'f-nh-i','name':'NH 투자증권','accountCd':'247'},
				{'className':'f-sk','name':'SK 증권','accountCd':'266'},
				{'className':'f-kyobo','name':'교보증권','accountCd':'261'},
				{'className':'f-daesin','name':'대신증권','accountCd':'267'},
				{'className':'f-dongbu','name':'동부증권','accountCd':'279'},
				{'className':'f-mri','name':'메리츠종합금융증권','accountCd':'287'},
				{'className':'f-asset','name':'미래에셋대우','accountCd':'238'},
				{'className':'f-bugug','name':'부국증권','accountCd':'290'},
				{'className':'f-samsung','name':'삼성증권','accountCd':'240'},
				{'className':'f-yeong','name':'신영증권','accountCd':'291'},
				{'className':'f-shinhan-i','name':'신한금융투자','accountCd':'278'},
				{'className':'f-yuana','name':'유안타증권','accountCd':'209'},
				{'className':'f-yujin','name':'유진투자증권','accountCd':'280'},
				{'className':'f-ebest','name':'이베스트투자증권','accountCd':'265'},
				{'className':'f-kef','name':'케이프투자증권','accountCd':'292'},
				{'className':'f-kium','name':'키움증권','accountCd':'264'},
				{'className':'f-hana','name':'하나금융투자','accountCd':'270'},
				{'className':'f-hai','name':'하이투자증권','accountCd':'262'},
				{'className':'f-hangug','name':'한국투자증권','accountCd':'243'},
				{'className':'f-hanwa','name':'한화투자증권','accountCd':'269'},
				{'className':'f-hyeondae','name':'현대차투자증권','accountCd':'263'},
				{'className':'f-boa','name':'BOA 은행','accountCd':'260'},
				{'className':'f-hsbc','name':'HSBC 은행','accountCd':'054'},
				{'className':'f-doichi','name':'도이치은행','accountCd':'055'},
				{'className':'f-sanlim','name':'산림조합중앙회','accountCd':'064'},
				{'className':'f-jpm','name':'제이피모간체이스은행','accountCd':'057'},
				{'className':'f-china','name':'중국공상은행 ','accountCd':'062'},
				{'className':'f-sbi','name':'SBI 저축은행','accountCd':'103'}
				]
});

$(document).ready(function(){

    //금융사 리스트 뿌리기
    controller.financeName.forEach(function(ele){
        $('#select-list').append('<li><a href="#" class="'+ele.className+'" accountCd="'+ ele.accountCd +'">'+ele.name+'</a></li>')
    });
    
    $(document).on('click','.select-area > a',function(e){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
        }else{ 
            $('.select-area > a').removeClass('open');  
            $(this).addClass('open');  
        }
        e.preventDefault();
    });
    $(document).on('click','.select-area ul li a',function(e){
        var temp =$(this).text();
        $(this).parents('.select-area').children('a').attr('class','').addClass($(this).attr('class')).text(temp).focus(); 
        $('#accountCd').val($(this).attr('accountCd'));
        $('#accountNm').val(temp);
        e.preventDefault();
    });
    $(document).on('click','html', function(e) {
        if(!$(e.target).is('.select-area > a')){
            $('.select-area > a').removeClass('open'); 
        }
        e.preventDefault();
    });
});

		
			    
function accountFind(obj){
for(var i=0;i<controller.financeName.length;i++){ 
    if(controller.financeName[i].name === obj){
        $('#company').addClass(controller.financeName[i].className).text(controller.financeName[i].name)
            return false;
        }
    }			 
}

function popupShow(obj){        
    $obj = $(obj);
    if($('body').find('.mask').length==0){
    $('body').append('<div class="mask" />');
    }
    $obj.show();
    return 
}

function popupClose(obj){ 
    if(obj == undefined){
        $('.popup').hide();
	}else{
	    $obj = $(obj);
	    $obj.hide();
	}
    $('.mask').remove();
}

			    
//인증 시작
function sendAccCertNo(){
	var accountNo = $("#accountNo").val();
	var accountCd = $("#accountCd").val();
	var accountOwnerNm = $("#accountOwnerNm").val();
		
	validator.config = {};
	validator.config['accountNo'] = 'isNonEmpty';
	validator.config['accountNo'] = 'isNumber';
	validator.config['accountCd'] = 'isNonEmpty';
	validator.config['accountCd'] = 'isNumber';
	validator.config['accountOwnerNm'] = 'isNonEmpty';
	
	if(accountNo.indexOf('-') > -1){
		popupShow('#popup-fail');
		return;
	}
	
	if (!validator.validate()) {
		alert(validator.getErrorMsg());
		return;
	}
	
	controller.ajaxSend({
		cache: false,
		url: '/common/transOneWon.json',
		data: controller.getSerializedData({
		    accountCd : accountCd
		   	,accountNo : getRsaEncData(accountNo)
		   	,accountOwnerNm : getRsaEncData(accountOwnerNm)
		}),
		dataType: 'json',
		type: 'post',
		async: true,
		isBlock: false,
		isDim: false,
		successCall: function (jsonObj) {
			if(jsonObj.transResultCode == '0000' && jsonObj.sockResCd == 'P000'){
				controller.accountUniqCd = jsonObj.uniqueCode;
				$("#ownerNmTxt").text(jsonObj.ownerNm);
				$("#accountNoTxt").text(jsonObj.accountNo);
				accountFind($('#accountNm').val());
				$('#step-1').hide();
				$('#step-2').show(); 
			    $('#step-2-input').show();
			    $('#step-2-fail').hide();
			    return;
			}else{
				if('L399' == jsonObj.sockResCd){
					popupShow('#popup-fail');		//입력정보가 올바르지 않습니다.
					return;
				}else if(jsonObj.sockResCd == 'S605' || jsonObj.sockResCd == 'S102' || jsonObj.transResultCode == 'S999'){
					$('#errTxt').text('');
					$('#errTxt').append('잠시 후 다시 시도해 주세요.<br>문제가 지속될 경우 나이스 고객센터 혹은 금융사로 문의해 주세요.');
				}else if(jsonObj.transResultCode == 'E999'){
					$('#errTxt').text('');
					$('#errTitle').text('');
					$('#errTitle').text('입력하신 계좌 정보로 인증이 불가능 합니다.');
					$('#errTxt').append('입력 정보 확인 후 다시 시도해 주세요.<br>문제가 지속될 경우 나이스 고객센터 혹은 금융사로 문의해 주세요.');
				}		
				$('#step-1').append($('#step-2-fail'));
				$('#step-1-input').hide();
				$('#step-2-fail').show();
			}
		}, errorCall: function (jsonObj) {
			$('#step-1').append($('#step-2-fail'));
			$('#step-1-input').hide();
			$('#step-2-fail').show();
		}
	});
}

// otp 인증
function chkAccountAuthInfo(){
	var uniqueCode = controller.accountUniqCd;
	var accountNo = $("#accountNo").val();
	var inputOtpNo = $('#inputOtpNo').val();
	var accountNm = $('#accountNm').val();
	
	validator.config = {};
	validator.config['accountNo'] = 'isNonEmpty';
	validator.config['accountNo'] = 'isNumber';
	validator.config['inputOtpNo'] = 'isNonEmpty';
	validator.config['inputOtpNo'] = 'isNumFix6';
	
	
	if (!validator.validate()) {
		alert(validator.getErrorMsg());
		return;
	}
	
	controller.ajaxSend({
		cache: false,
		url: '/common/chkAccountAuthInfo.json',
		data: controller.getSerializedData({
			uniqueCode : uniqueCode
			,inputOtpNo : inputOtpNo
			,accountNo : getRsaEncData(accountNo)
			,accountNm : $('#accountNm').val()
		}),
		dataType: 'json',
		type: 'post',
		async: true,
		isBlock: false,
		isDim: false,
		successCall: function (jsonObj) {
			if(jsonObj.authResultCd == '0000' && jsonObj.sockResCd == 'P000'){
				  $('.step-area').hide();
				  $('#step-2').hide();  
				  $('#step-3').show();  
				  $('#step-3-ok').show(); 
				  controller.maskedAccountNo = jsonObj.maskedAccountNo;
			}else if('0001' == jsonObj.authResultCd){
				popupShow('#popup-num-fail');		//otp 불일치
				return;
			}else{
				 $('#step-2-input').hide();        
				 $('#step-2-fail').show();
				 return;
			}
		}, errorCall: function (jsonObj) {
			 $('#step-2-input').hide();        
			 $('#step-2-fail').show();
			 return;
		}
	});
}

function returnAccountAuthInfo(){
	var resultObj = new Object();
	resultObj.successYn = 'Y';
	resultObj.accountCd = $('#accountCd').val();
	resultObj.maskedAccountNo = controller.maskedAccountNo;
	resultObj.accountNo = $('#accountNo').val();
	opener.accountAuthResult(resultObj);
	window.close();
}
