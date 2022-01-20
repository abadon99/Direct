 document.domain = 'kt.com';


var isReal = false;

$(document).ready(function(){
	usimUseYcontroller.init();	//공통

	isReal = $("#SERVER_NAME").val() == 'REAL';

	
});



/**
 * @desc 공통
 */
var usimUseYcontroller = $.extend(new $.CommonObj(),{

	onCreate : function(){
		
	},

	//유심, 약관정보 조회
	checkDirectUsimView : function () {
		
		//console.log("checkGoDirectUsimView");
		var varData = {approvalType:'useY'};

		usimUseYcontroller.ajaxSend({
	        cache:false
	        ,url:'/direct/checkGoDirectUsimView.json'
	        ,data:varData
	        ,dataType:'json'
	        ,async:false
	        ,successCall:function(jsonObj){
	        	//debugger;
	        	var kaitCallYn = jsonObj.kaitCallYn;
	        	var kaitTimeYn = jsonObj.kaitTimeYn;
	        	var checkGoDirectUsimTime = jsonObj.checkGoDirectUsimTime;
	        	
//	        	console.log("kaitCallYn=="+kaitCallYn+ ",kaitTimeYn=="+kaitTimeYn+",checkGoDirectUsimTime=="+checkGoDirectUsimTime);
	        	
	        	if(  checkGoDirectUsimTime == "N"){
	        		alert("개통가능 시간이 아닙니다");
	        		return;
	        	}
	        	
	        	if(kaitCallYn == "N" || kaitTimeYn =="N" ){
	        		alert("현재 서버 정기점검으로 인해 상담사 통한 개통으로 진행합니다. 접수 후 개통 가능 시간에 상담사가 연락드릴 예정입니다.");
	        	}
	        	var prodNo = "WL00055559";
	        	if( isReal){
	        		prodNo = "WL00055559";
	        	}else{
	        		prodNo = "WL00047898";
	        	}
	        	
	        	window.location.href = "/direct/DirectUsimView.do?prodNo="+prodNo+"&befIntmUsimUseYn=Y";
	        }
	    });
		
	},



});

