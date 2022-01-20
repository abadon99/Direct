 document.domain = 'kt.com';


var isReal = false;

$(document).ready(function(){
	usimSharecontroller.init();	//공통

	isReal = $("#SERVER_NAME").val() == 'REAL';

});



/**
 * @desc 공통
 */
var usimSharecontroller = $.extend(new $.CommonObj(),{

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
    	window.location.href = "/direct/DirectUsimView.do?prodNo="+prodNo+"&sharingYn=Y";

    	/*
		var varData = {approvalType:'dataShare'};

		usimSharecontroller.ajaxSend({
	        cache:false
	        ,url:'/direct/checkGoDirectUsimView.json'
	        ,data:varData
	        ,dataType:'json'
	        ,async:false
	        ,successCall:function(jsonObj){
	        	//debugger;
	        	var kaitCallYn = jsonObj.kaitCallYn;
	        	console.log("kaitCallYn=="+kaitCallYn);

	        	var prodNo = "WL00055559";
	        	if( isReal){
	        		prodNo = "WL00055559";
	        	}else{
	        		prodNo = "WL00047898";
	        	}
	        	window.location.href = "/direct/DirectUsimView.do?prodNo="+prodNo+"&sharingYn=Y";
	        }
	    });
		*/
	},

});

$(document).on('click','#returnDirectMain', function(){
	window.location.href = "/directMain.do";
});
