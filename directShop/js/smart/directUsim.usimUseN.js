 document.domain = 'kt.com';


var isReal = false;

$(document).ready(function(){
	usimUseNcontroller.init();	//공통

	isReal = $("#SERVER_NAME").val() == 'REAL';

	
});



/**
 * @desc 공통
 */
var usimUseNcontroller = $.extend(new $.CommonObj(),{

	onCreate : function(){
		
	},

	//유심, 약관정보 조회
	checkDirectUsimView : function () {

    	var prodNo = "WL00055559";
    	if( isReal){
    		prodNo = "WL00055559";
    	}else{
    		prodNo = "WL00047898";
    	}

    	window.location.href = "/direct/DirectUsimView.do?prodNo="+prodNo+"&befIntmUsimUseYn=N";
    	
    	/*
		var varData = {approvalType:'useN'};

		usimUseNcontroller.ajaxSend({
	        cache:false
	        ,url:'/direct/checkGoDirectUsimView.json'
	        ,data:varData
	        ,dataType:'json'
	        ,async:false
	        ,successCall:function(jsonObj){
	        	//debugger;
	        	var kaitCallYn = jsonObj.kaitCallYn;
	        	console.log("kaitCallYn=="+kaitCallYn);
	        	
	        	if( kaitCallYn == "N"){
	        		alert("개통가능 시간이 아닙니다");
	        		return;
	        	}
	        	
	        	
	        	var prodNo = "WL00055559";
	        	if( isReal){
	        		prodNo = "WL00055559";
	        	}else{
	        		prodNo = "WL00047898";
	        	}

	        	window.location.href = "/direct/DirectUsimView.do?prodNo="+prodNo+"&befIntmUsimUseYn=N";
	        }
	    });
	    */
		
	},



});

