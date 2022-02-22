$(function(){
/* 카드 마스킹 처리*/ 
var start=0,end=0 
	
$('[data-masking="true"]').on('keyup',function(e){ 
	end = e.target.selectionEnd; 
	var val = $(this).val().replace(/[^*0-9]/g,''); 
	var dataVal = $(this).data('number') ? $(this).data('number') : ''; 	
	var tempVal, tempNum,inputValue;   
		
	if(val.length > dataVal.length){   	 
		inputValue = $(this).val().substring(start,end); 
		tempNum =	dataVal.substring(0,start)+ inputValue +dataVal.substring(start);    
	}else if(val.length < dataVal.length){ 
			
		if(start == end){  //삭제
			if(val.length > end){
				tempNum = dataVal.substring(0,start)+dataVal.substring(start+dataVal.length - val.length);   
			}else{							
				tempNum =	dataVal.substring(0, val.length);  
			}
		}else{
			tempNum = dataVal.substring(0,end)+dataVal.substring(start);   
		}
	}else{  
		tempNum = dataVal // maxlength
	} 
 
	if($(this).hasClass('is-card')){
		var num1 = tempNum.substring(0,6);  
		if($(this).attr('maxlength') == 16){
			var num2 = tempNum.substring(6,15);
			var num3 = tempNum.substring(15,16);
		}else if($(this).attr('maxlength') == 15){
			var num2 = tempNum.substring(6,14);
			var num3 = tempNum.substring(14,15);
		}else{
			var num2 = tempNum.substring(6,13);
			var num3 = tempNum.substring(13,14);
		}
	}else if($(this).hasClass('account-masking')){
		//계좌정보 입력
		var num1 = tempNum.substring(0,6);
		var num2 = tempNum.substring(6);
		var num3 = '';
	}else{ 
		//주민등록번호
		var num1 = tempNum.substring(0,7);
		var num2 = tempNum.substring(7,13); 
		var num3 = ''; 
	} 
	var gu = '';
	for(var i=0;i<num2.length;i++){
		gu+='*';
	}		
	
	
	//console.log(tempNum);
	$(this).data('number',tempNum);		 
	var tempId = '#'+$(this).attr('id').replace('Temp',''); 
	$(tempId).val(tempNum);   									
	$('#'+$(this).attr('id')).val(num1+gu+num3)
	//포커스 위치	
					
	var tempPos = inputValue != '' ? end : start ;   
	if($(this)[0].selectionStart || $(this)[0].selectionStart ===  0){
		$(this)[0].selectionStart = tempPos;
		$(this)[0].selectionEnd = tempPos;
		$(this)[0].focus(); 
	}	  
	start = e.target.selectionStart; 
 
}).on('focus',function(e){  
   start=0;
   var temp =$(this).val().replace(/\-/g,'');  
   $(this).val(temp);
	start =e.target.selectionStart;
}).on('focusout', function(e){   
	var temp,temp2,maxlengthTemp; 
	temp=$(this).data('number').replace(/([^0-9])/g,'');   
	maxlengthTemp = $(this).data('number').length;  
	if(maxlengthTemp <= $(this).attr('maxlength')){
		if($(this).hasClass('is-card')){				
			if(maxlengthTemp == 16){
				temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)+'**-****-***'+temp.substring(15,16);
			}else if(maxlengthTemp == 15){
				temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)+'**-****-**'+temp.substring(14,15);
			}else if(maxlengthTemp == 14){
				temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)+'**-****-*'+temp.substring(13,14);
			}else{
				temp2='';
				$(this).data('number','')
			}
		}else if($(this).hasClass('account-masking')){
			// -  없이 입력
			var gu = '';
			for(var i=0;i<temp.length - 6;i++){
				gu+='*';
			}	
			temp2 = temp.substring(0,6)+gu;
		}else if($(this).hasClass('jumin-masking') && maxlengthTemp == 13){			
				temp2 = temp.substring(0,6)+'-'+temp.substring(6,7)+'******';
		}else{
			//조건인 안 맞으면 무효처리
			temp2='';
			$(this).data('number','')
	
		} 
		
		$(this).val(temp2)		
	}
 
}).on('startend click',function(e){
	var _this=$(this);
	setTimeout(function(){
		start = _this[0].selectionStart 
	});
});
  /* 카드 마스킹 처리*/
});

function maskingLoad(){

	$('[data-masking="true"]').each(function(){	
		var temp, temp2, tempId, tempNum,   maxlengthTemp; 
		var _this = $(this);
		tempId = '#'+_this.attr('id').replace('Temp',''); 
		if(_this.data('number') == undefined && _this.val !=''){ 
			_this.data('number', _this.val());			
		}else{
			//있으면 다음 요소로
			return true;
		}
		 
		temp=$(this).data('number').replace(/([^0-9])/g,'');  
		maxlengthTemp = $(this).data('number').length; 

		if(maxlengthTemp <= $(this).attr('maxlength')){
			if( $(this).hasClass('is-card')){				
				if(maxlengthTemp == 16){
					temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)+'**-****-***'+temp.substring(15,16);
				}else if(maxlengthTemp == 15){
					temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)+'**-****-**'+temp.substring(14,15);
				}else if(maxlengthTemp == 14){
					temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)+'**-****-*'+temp.substring(13,14);
				}else{
					//temp2 = temp.substring(0,4)+'-'+temp.substring(4,6)
				}
			}   
			_this.val(temp2);	
		}
		 
		
	});
}
$(window).on('load',function(){ 
	maskingLoad();
});