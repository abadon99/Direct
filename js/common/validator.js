;
var validator=function(){
    varmultiValidateId = '';

    var _lenCommon = function(selector,len,that,_emptyCheck,isNumber,msgObj,conditionFn)
    {
        var v = validator.getValue(selector);
        var emptyCheck = false
           ,result     = false;
        var isValNonEmpty = _isNonEmpty(selector,that,v);

        emptyCheck = (_emptyCheck==undefined || _emptyCheck == false)?true:isValNonEmpty;
        if(emptyCheck)
        {
            var b = false;

            if(isNumber)
            {
                b = validator.types.isNumberN.validate(selector,that,v)
            }
            else
            {
                b = true;
            }

            if(!isValNonEmpty && !_emptyCheck)
            {
                return true;
            }

            if(b)
            {
                that.instructions = msgObj[selector];
                result = conditionFn(v);
                return result;
            }
            else
            {
                return false;
            }
        }

        return false;
    }

    var _lenFix = function(selector,len,that,_emptyCheck,isNumber)
    {
        return _lenCommon(selector,len,that,_emptyCheck,isNumber,VALIDATE_FIX_MSG,function(v){
            return v.length == len;
        });
    }

    var _lenBetterFix = function(selector,len,that,_emptyCheck,isNumber)
    {
        return _lenCommon(selector,len,that,_emptyCheck,isNumber,VALIDATE_FIX_MSG,function(v){
            return  (v.length >= len || v.length==0);
        });
    }

    var _jiminFix = function(selector,len,that,_emptyCheck,isNumber)
    {
        return _lenCommon(selector,len,that,_emptyCheck,isNumber,VALIDATE_FIX_MSG,function(v){
            var yy,mm,dd,cc,result,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,checkdigit;

            if(v.length != len)
            {
                that.instructions = VALIDATE_JUMIN_MSG[selector];
                return false;
            }

            switch(len)
            {
            case 6 :
                yy     = v.substring(0,2);        // 년도
                mm     = v.substring(2,4);        // 월
                dd     = v.substring(4,6);        // 일

                if (yy < '00' || yy > '99' || mm < '01' || mm > '12' || dd < '01' || dd > '31')
                {
                    that.instructions = VALIDATE_JUMIN_MSG[selector];
                    return false;
                }
                return true;
                break;
            case 7 :
                a1=v.substring(0,1);
                if (a1 < '1' || a1 > '4')
                {
                    that.instructions = VALIDATE_JUMIN_MSG[selector];
                    return false;
                }

                return true;
                break;
            case 13 :
                a1=v.substring(0,1);
                a2=v.substring(1,2);
                a3=v.substring(2,3);
                a4=v.substring(3,4);
                a5=v.substring(4,5);
                a6=v.substring(5,6);
                a7=v.substring(6,7);
                a8=v.substring(7,8);
                a9=v.substring(8,9);
                a10=v.substring(9,10);
                a11=v.substring(10,11);
                a12=v.substring(11,12);
                a13=v.substring(12,13);
                
                // 외국인인 경우 무조건 true
                if( a7 == "5" || a7 == "6" || a7 == "7" || a7 == "8"){
                	return true;
                }

                checkdigit=a1*2+a2*3+a3*4+a4*5+a5*6+a6*7;
                checkdigit=checkdigit+a7*8+a8*9+a9*2+a10*3+a11*4+a12*5;
                checkdigit = checkdigit%11;
                checkdigit = 11 - checkdigit;
                checkdigit = checkdigit%10;

                if (checkdigit != a13)
                {
                    that.instructions = VALIDATE_JUMIN_MSG[selector];
                    return false;
                }

                return true;
                break;
             default :
                return false;
                break;
            }
        });
    }

    var _maxByte = function(id,len,that,emptyCheck)
    {
        emptyCheck = (emptyCheck==undefined || emptyCheck == false)?true:_isNonEmpty(id,that);

        if(emptyCheck)
        {
            var $obj=$('#'+id);
            if($obj.length == 0) return false;

            var lsStr=$obj.val();               //이벤트가 일어난 컨트롤의 value값
            var lsStrLen=lsStr.length;          //전체길이
            var maxLen= len;                    //제한할 글자수 크기
            var liByte=0;                       //한글일 경우는 2 그밖에는 1을 더함
            var liLen=0;                        //substring하기위해사용
            var lsOneChar="";                   //한글자씩 검사한다.
            var lsStr2="";                      //글자수를 초과하면 제한할 수 글자전까지만 보여준다.

            for(var i=0;i<lsStrLen;i++)
            {
                //한글자추출
                lsOneChar=lsStr.charAt(i);
                //한글이면 2를 더한다.
                if(escape(lsOneChar).length>4)
                {
                    liByte=liByte+2;
                }
                else if((lsOneChar =='\r' && lsStr.charAt(i+1) =='\n') || lsOneChar=='\n')
                {
                    liByte=liByte+2;
                }
                else
                {
                    liByte++;
                }

                //전체 크기가 maxLen을 넘지않으면
                if(liByte<=maxLen)
                {
                    liLen=i+1;
                }

            }

            //전체길이를 초과하면
            if(liByte>maxLen)
            {
                that.instructions = VALIDATE_MAX_BYTES_MSG[id];
                $obj.val(lsStr.substr(0,liLen));
                return false;
            }

            return true;
        }

        return false;
    }

    var _minLength = function(id,len,that,emptyCheck)
    {
        emptyCheck = (emptyCheck==undefined || emptyCheck == false)?true:_isNonEmpty(id,that);

        if(emptyCheck)
        {
            var $obj=$('#'+id);
            if($obj.length == 0) return false;

            var lsStr=$obj.val();               //이벤트가 일어난 컨트롤의 value값
            var lsStrLen=lsStr.length;          //전체길이
            var minLen= len;                    //최소한 글자수 크기

            //전체길이를 미만이면
            if(lsStrLen<minLen)
            {
                that.instructions = VALIDATE_MAX_BYTES_MSG[id];
                return false;
            }

            return true;
        }

        return false;
    }

    var _isLessThan =  function(id,maxValue,that,emptyCheck)
    {
        emptyCheck = (emptyCheck==undefined || emptyCheck == false)?true:_isNonEmpty(id,that);
        if(emptyCheck)
        {
            var $obj=$('#'+id);
            if($obj.length == 0) return false;

            var v = $.trim($obj.val());
            if(isNaN(v)) return false;

            if(maxValue<v)
            {
                that.instructions = VALIDATE_COMPARE_MSG[id];
                return false;
            }

            return true;
        }

        return false;
    }



    var _isNonEmpty = function(selector,that,v)
    {
        return validator.types.isNonEmpty.validate(selector,that,v);
    }

    var _isMail = function (selector,that,v)
    {
        that.instructions = VALIDATE_COMPARE_MSG[selector];
       // var strReg = /^([\w\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/;
        var strReg = /^[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'*+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+$/;
       return strReg.test(v);
    }


    return {
        getValue:function(id){
            var v        = '';
            var $el      = $('#'+id);

            var isExistJqueryObject = function($j)
            {
                return $j.length>0;
            }

            if(isExistJqueryObject($el))
            {
                var domEl = $el[0];
                var nodeName = domEl.nodeName.toLowerCase();
                var inputType = '';

                if(nodeName == 'input')
                {
                    inputType = $el.attr('type').toLowerCase();

                    switch(inputType)
                    {
                    case 'radio'   :
                    case 'checkbox':
                        var name = $el.attr('name');
                        var groupVal = '';

                        if(name)
                        {
                            var $groups = $('[name="'+name+'"]');
                            if(isExistJqueryObject($groups))
                            {
                                $groups.each(function(){
                                    if(this.checked)
                                    {
                                        if($(this).attr('validityyn'))
                                        {
                                            groupVal = $.trim($(this).val());
                                        }
                                        else
                                        {
                                            if($(this).attr('invalid') == undefined)
                                                groupVal = $.trim($(this).val());
                                            groupVal = 'true';
                                        }
                                    }
                                });
                            }
                        }
                        else
                        {
                            if($el.is(':checked'))
                            {
                                groupVal = $el.val();
                            }
                        }

                        v = groupVal;
                        break;
                    case 'text'     :
                    case 'hidden'   :
                    case 'textarea' :
                    case 'tel'      :
                    case 'number'   :
                    case 'password' :
                    case 'search'   :
                    case 'email'   :
                        v = $.trim($el.val());
                        break;

                    }
                }
                else if(nodeName == 'textarea')
                {
                    v = $.trim($el.val());
                }
                else if(nodeName == 'select')
                {
                    v = $('#'+id+' option:selected').val();
                }
                else if(nodeName == 'img')
                {
                    var isSignImg = ($el.hasClass('signSimg'));
                    var src = '';
                    if(isSignImg)
                    {
                        src = $el.attr('src');
                        if(src.indexOf('data:image')<0)
                        {
                            v = '';
                        }
                        else
                        {
                            v = 'sign';
                        }
                    }
                }
            }

            return v;
        }
        ,types:{
            isNonEmpty:{
                validate:function(selector,that,val){
                    var v = (val != undefined)?val:validator.getValue(selector);
                    that = that || this;
                    that.instructions = VALIDATE_NOT_EMPTY_MSG[selector];
                    return v !='';
                }
            }
            ,isCert:{
                validate:function(selector,that,val){
                    var v = (val != undefined)?val:validator.getValue(selector);
                    that = that || this;
                    that.instructions = VALIDATE_NOT_EMPTY_MSG[selector];
                    return v =='Y';
                }
            }
            //empty 허용,입력되면 숫자만
            ,isNumberN:{
                validate:function(selector,that,val){
                    var v = (val != undefined)?val:validator.getValue(selector);
                    if(v == '') return true;
                    that = that || this;
                    that.instructions = VALIDATE_NUMBER_MSG[selector];
                    var strReg = /^[0-9]+$/;
                    return strReg.test(v);
                }
            }
            ,isNumber:{
                validate:function(selector,that){
                    var v = validator.getValue(selector);
                    that = that || this;
                    var _isNotEmpty = validator.types.isNonEmpty.validate(selector,that,v);
                    if(!_isNotEmpty) return false;

                    return validator.types.isNumberN.validate(selector,that,v);
                }
            }
            ,isNumFix1:{
                validate:function(selector){
                    return _lenFix(selector,1,this,true,true);
                }
            }
            ,isNumFix2:{
                validate:function(selector){
                    return _lenFix(selector,2,this,true,true);
                }
            }
            ,isNumFix3:{
                validate:function(selector){
                    return _lenFix(selector,3,this,true,true);
                }
            }
            ,isNumFix4:{
                validate:function(selector){
                    return _lenFix(selector,4,this,true,true);
                }
            }
            ,isNumFix5:{
                validate:function(selector){
                    return _lenFix(selector,5,this,true,true);
                }
            }
            ,isNumFix6:{
                validate:function(selector){
                    return _lenFix(selector,6,this,true,true);
                }
            }
            ,isNumFix7:{
                validate:function(selector){
                    return _lenFix(selector,7,this,true,true);
                }
            }
            ,isNumFix8:{
                validate:function(selector){
                    return _lenFix(selector,8,this,true,true);
                }
            }
            ,isNumFix10:{
                validate:function(selector){
                    return _lenFix(selector,10,this,true,true);
                }
            }
            ,isNumFix13:{
                validate:function(selector){
                    return _lenFix(selector,13,this,true,true);
                }
            }
            ,isNumFix16:{
                validate:function(selector){
                    return _lenFix(selector,16,this,true,true);
                }
            }
            ,isNumFix19:{
                validate:function(selector){
                    return _lenFix(selector,19,this,true,true);
                }
            }
            ,isNumBetterFixN2:{
                validate:function(selector){
                    return _lenBetterFix(selector,2,this,true,true);
                }
            }
            ,isNumBetterFixN3:{
                validate:function(selector){
                    return _lenBetterFix(selector,3,this,true,true);
                }
            }
            ,isNumBetterFixN4:{
                validate:function(selector){
                    return _lenBetterFix(selector,4,this,true,true);
                }
            }
            ,isNumBetterFixN7:{
                validate:function(selector){
                    return _lenBetterFix(selector,7,this,true,true);
                }
            }
            ,isNumBetterFixN8:{
                validate:function(selector){
                    return _lenBetterFix(selector,8,this,true,true);
                }
            }
            ,isNumBetterFixN9:{
                validate:function(selector){ 
                    return _lenBetterFix(selector,9,this,true,true);
                }
            }
            ,isNumBetterFixN10:{
                validate:function(selector){
                    return _lenBetterFix(selector,10,this,true,true);
                }
            }
            ,isNumBetterFixN11:{
                validate:function(selector){
                    return _lenBetterFix(selector,11,this,true,true);
                }
            }
            ,isNumBetterFixN14:{
                validate:function(selector){
                    return _lenBetterFix(selector,14,this,true,true);
                }
            }
            //empty 허용,입력되면 숫자영문만
            ,isNumberEngN:{
                validate:function(selector,val){
                    var v = (val != undefined)?val:validator.getValue(selector);
                    if(v == '') return true;

                    this.instructions = VALIDATE_NUMBER_ENG_MSG[selector];
                    var strReg = /^[A-Za-z0-9]+$/;
                    return strReg.test(v);
                }
            }
            ,isNumberEng:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(_isNonEmpty(selector,this,v)) {
                        this.instructions = VALIDATE_NUMBER_ENG_MSG[selector];
                        var strReg = /^[A-Za-z0-9]+$/;
                        return strReg.test(v);
                    }
                    return false;
                }
            }
            ,isSpecialKeyExcept:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(_isNonEmpty(selector,this,v)) {
                        this.instructions = VALIDATE_NUMBER_ENG_MSG[selector];
                        var strReg = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;
                        return strReg.test(v);
                    }
                    return false;
                }
            }
            ,isTel:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(_isNonEmpty(selector,this,v)) {
                        this.instructions = VALIDATE_NUMBER_ENG_MSG[selector];
                        var strReg = /^\d{2,4}-\d{3,4}-\d{4}$/;
                        return strReg.test(v);
                    }
                    return false;
                }
            }
            ,isPhone:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(_isNonEmpty(selector,this,v)) {
                        this.instructions = VALIDATE_NUMBER_ENG_MSG[selector];
                        var strReg = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
                        return strReg.test(v);
                    }
                    return false;
                }
            }
            ,isEngN:{
                validate:function(selector,val){
                    var v = (val != undefined)?val:validator.getValue(selector);
                    if(v == '') return true;

                    this.instructions = VALIDATE_ENG_MSG[selector];
                    var strReg = /^[A-Za-z]+$/;
                    return strReg.test(v);
                }
            }
            ,isEng:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(_isNonEmpty(selector,v))
                        return validator.types.isEngN.validate(selector,v);
                    return false;
                }
            }
            ,isNonMail:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(v == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[selector];
                        return false;
                    }

                    return _isMail(selector,this,v);
                }
            }
            ,isNonMailMulti:{
                validate:function(id){
                    var ids        = id.split('&');
                    var idsLen     = ids.length;

                    if(idsLen != 2)
                    {
                        this.instructions = 'ID를 2개 입력하세요';
                        return false;
                    }

                    //v1 = $('#'+ids[0]).val();
                    //v2 = $('#'+ids[1]).val();

                    var v = validator.getValue(ids[0]);
                    validator.setValidateMultiId(ids[0]);

                    if(v == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }

                    var v2 = validator.getValue(ids[1]);
                    if(v2 == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[1]];
                        validator.setValidateMultiId(ids[1]);
                        return false;
                    }

                    v = v+"@"+v2 ;
                    return _isMail(ids[0],this,v);
                }
            }
            ,isJimin:{
                validate:function(id){
                    var ids        = id.split('&');
                    var idsLen     = ids.length;

                    if(idsLen != 2)
                    {
                        this.instructions = 'ID를 2개 입력하세요';
                        return false;
                    }

                    //v1 = $('#'+ids[0]).val();
                    //v2 = $('#'+ids[1]).val();

                    var v = validator.getValue(ids[0]);
                    validator.setValidateMultiId(ids[0]);

                    if(v == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }

                    var v2 = validator.getValue(ids[1]);
                    if(v2 == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[1]];
                        validator.setValidateMultiId(ids[1]);
                        return false;
                    }




                  //return false;
                    if (v.length !=6 || v2.length !=7 ) {
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }

                    if( v == "111111" && v2 == "1111118"){
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }

                    var chk = 0;

                    for (var i = 0; i <=5 ; i++){
                     chk = chk + ((i%8+2) * parseInt(v.substring(i,i+1)))
                    }

                    for (var i = 6; i <=11 ; i++){
                     chk = chk + ((i%8+2) * parseInt(v2.substring(i-6,i-5)))
                    }

                    chk = 11 - (chk %11);
                    chk = chk % 10;

                    if (chk != v2.substring(6,7))
                    {
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }

                    return true;


                }
            }
            ,isBiz:{
            	validate:function(id){
            		var ids        = id.split('&');
            		var idsLen     = ids.length;
            		
            		if(idsLen != 3)
            		{
            			this.instructions = 'ID를 3개 입력하세요';
            			return false;
            		}
            		
            		var v = validator.getValue(ids[0]);
                    if(v == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }

                    var v2 = validator.getValue(ids[1]);
                    if(v2 == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[1]];
                        validator.setValidateMultiId(ids[1]);
                        return false;
                    }
                    
                    var v3 = validator.getValue(ids[2]);
                    if(v3 == '') {
                    	this.instructions = VALIDATE_NOT_EMPTY_MSG[ids[2]];
                    	validator.setValidateMultiId(ids[2]);
                    	return false;
                    }
                    if (v.length !=3 || v2.length !=2 || v2.length !=5 ) {
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
                        return false;
                    }
                    var checkId = new Array(1,3,7,1,3,7,1,3,5,1);
            		var bizNo = ids[0]+ids[1]+ids[2];
            		var sum;
            		var c2;
            		var remander;
            		
            		for(var i=0;i<=7;i++){
            			sum += checkId[i]*bizNo.charAt(i);
            		}
            		c2="0"+(checkId[8]*bizNo.charAt(8));
            		c2=c2.substring(c2.length-2,c2.length);
            		
            		sum += Math.floor(c2.charAt(0))+Math.floor(c2.charAt(1));
            		
            		remander = (10-(sum%10))%10;
            		
            		if(Math.floor(bizNo.charAt(9)) != remander){
            			this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(ids[0]);
            			return false;
            		}
            		
            		return true;
            	}
            }
            ,isNonPassWord:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(v == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[selector];
                        return false;
                    }

                    //영문, 숫자 혼용해서 10~20자 이내
                    this.instructions = VALIDATE_FIX_MSG[selector];
                    var strReg =/^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
                    return strReg.test(v);
                }
            }
            // empty 허용 | 영문, 숫자 혼용해서 8~20자 이내
            ,isNonPassWord2:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(v == '') {
                        return true;
                    }

                    //영문, 숫자 혼용해서 10~20자 이내
                    this.instructions = VALIDATE_FIX_MSG[selector];
                    var strReg =/^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
                    return strReg.test(v);
                }
            }
            ,isNumFix4IsNotEqualsTriple:{
                validate:function(id){
                    var ids        = id.split('&');
                    var idsLen        = ids.length;
                    var v1, v2, v3;

                    if(idsLen != 3)
                    {
                        this.instructions = 'ID를 3개 입력하세요';
                        return false;
                    }

                    for(var i=0;i<3;i++)
                    {
                        validator.setValidateMultiId(ids[i]);
                        if(!_lenFix(ids[i],4,this,true,true) ) {
                            return false;
                        }
                    }

                    v1 = $('#'+ids[0]).val();
                    v2 = $('#'+ids[1]).val();
                    v3 = $('#'+ids[2]).val();

                    validator.setValidateMultiId(ids[0]);

                    if($.trim(v1)== $.trim(v2) || $.trim(v1)== $.trim(v3) || $.trim(v2)== $.trim(v3)) {
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        return false;
                    } else {
                        return true;
                    }

                }
            }
            ,isEquals : {
                validate : function(id){
                    var ids        = id.split('&');
                    var idsLen     = ids.length;
                    var v1,v2;

                    if(idsLen != 2)
                    {
                        this.instructions = 'ID를 2개 입력하세요';
                        return false;
                    }

                    v1 = $('#'+ids[0]).val();
                    v2 = $('#'+ids[1]).val();

                    if($.trim(v1) != $.trim(v2))
                    {
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(($.trim(v1) == '')?ids[0]:ids[1]);
                        return false;
                    } else {
                        return true;
                    }
                }
            },isNotEquals : {
                validate : function(id){
                    var ids        = id.split('&');
                    var idsLen     = ids.length;
                    var v1,v2;

                    if(idsLen != 2)
                    {
                        this.instructions = 'ID를 2개 입력하세요';
                        return false;
                    }

                    v1 = $('#'+ids[0]).val();
                    v2 = $('#'+ids[1]).val();

                    if($.trim(v1) == $.trim(v2))
                    {
                        this.instructions = VALIDATE_COMPARE_MSG[ids[0]];
                        validator.setValidateMultiId(($.trim(v1) == '')?ids[0]:ids[1]);
                        return false;
                    } else {
                        return true;
                    }
                }
            },isNumberBetter:{
                validate:function(selector,that){
                    var v = validator.getValue(selector);
                    that = that || this;
                    var _isNotEmpty = validator.types.isNonEmpty.validate(selector,that,v);
                    if(!_isNotEmpty) return false;

                    if ( validator.types.isNumberN.validate(selector,that,v) ) {
                        if (v > 9000) {
                            this.instructions = VALIDATE_COMPARE_MSG[selector];
                            return false;
                        }
                        return true;

                    } else {
                        return false;
                    }

                }
            }
            ,isArryChecked:{
                validate:function(selector){
                    var $groups = $('[name="'+selector+'"]');
                    var returnVal = true;

                    $groups.each(function(){
                        if($(this).attr('validityyn') == "Y") {
                            if(!$(this).is(':checked')) {
                                if (returnVal) {
                                    var $validTarget = $(this);
                                    if ($validTarget.hasClass("formHidden")) {

                                    	// 아코디언 내부로 포커스를 보내야 할 경우
                                    	if( $validTarget.parents(".acc_contents").length ){
                                    		$validTarget.parents(".acc_contents").show().parent(".acc_scope").addClass("active");
                                    		if($validTarget.offset()){
                                    			$("body, html").animate({ scrollTop : $validTarget.offset().top - 46 }, 500);
                                    		}
                                    		$(this).next().focus();
                                    	}else{
                                    		if (!$validTarget.is(":visible")) {
                                        		$validTarget.parent().parent().parent().parent().find("a:first").trigger("click");
                                        		$validTarget.focus();
                                        	}
                                    	}
                                        
                                    } else {

                                    	// 아코디언 내부로 포커스를 보내야 할 경우
                                    	if( $(this).parents(".acc_contents").length ){
                                    		$(this).parents(".acc_contents").show().parent(".acc_scope").addClass("active");
                                    		if( $("*[data-type=scroll]").length ){
                                    			$(this).KT_designScrollInit();
                                    		}

                                            $(this).focus();
                                    	} else {
                                    	    $(this).parents('.grid-content').css({
                                               display : 'block'
                                            });
                                    	    
                                    	    if (!$validTarget.is(":visible")) {
                                        		$validTarget.parent().parent().parent().parent().find("a:first").trigger("click");
                                        	}
                                            $validTarget.focus();
                                        }

                                    	var stickyH;
                                    	// 스티키영역이 있을 경우 포커스 영역 가림 방지
                                    	if( $(".sticky_area").length ){
                                    		stickyH = $(".sticky_area").outerHeight();
                                    	}
                                    	// M샵 상단 검색영역이 있을 경우 포커스 영역 가림 방지
                                    	else if ( $(".mOllehSearch_wrap").length ){
                                    		stickyH = $(".mOllehSearch_wrap").outerHeight();
                                    	}                     	
                                    	else {
                                    		stickyH = 0;
                                    	}

                                    	if($validTarget.offset()){
                                    		$("body, html").animate({ scrollTop : $validTarget.offset().top - stickyH - 10 }, 500);
                                    	}
                                    }
                                    returnVal = false;
                                    return;
                                }

                            }
                        }

                    });
                    this.instructions = VALIDATE_NOT_EMPTY_MSG[selector];
                    return returnVal;
                }
            },isMaxByte150:{
                validate:function(selector){
                    return  _maxByte(selector,150,this,true);
                }
            },isMaxByte500:{
                validate:function(selector){
                    return  _maxByte(selector,500,this,true);
                }
            },isMaxByte4000:{
                validate:function(selector){
                    return  _maxByte(selector,4000,this,true);
                }
            },isMaxByte1000:{
                validate:function(selector){
                    return  _maxByte(selector,1000,this,true);
                }
            },isMinLength10:{
                validate:function(selector){
                    return  _minLength(selector,10,this,true);
                }
            }
            ,isBadWordCheckMinLength10:{
                validate:function(selector){
                    that =  this;
                    var _isNotEmpty = _minLength(selector,10,this,true);
                    if(!_isNotEmpty) return false;
                    return validator.types.isBadWordCheck.validate(selector,that);
                }
            },isBadWordCheck:{
                validate:function(selector,that){

                    var $obj=$('#'+selector);
                    var lsStr=validator.getValue(selector);
                    that = that || this;
                    var _isNotEmpty = validator.types.isNonEmpty.validate(selector,that,lsStr);
                    if(!_isNotEmpty) return false;

                    var ohno = 0;
                    var badWordMsg = '';

                    for(i = 0; i < BAD_WORD_LIST.length; i++) {
                        var badWord = BAD_WORD_LIST[i];

                        while(true) {
                            if(lsStr.indexOf(badWord) != -1) {
                                badWordMsg = badWord;
                                lsStr = lsStr.replace(badWord, '*****');
                                ohno = 1;
                            } else {
                                break;
                            }
                        }
                    }

                    if(ohno == 1) {
                        var msg =  VALIDATE_COMPARE_MSG[selector];
                        msg = msg.replace("#BADWORD",badWordMsg) ;
                        that.instructions = msg; //'[' + badWordMsg + ']는 금칙어 입니다.' ;
                        $obj.val(lsStr);
                        return false;
                    }
                    return true;

                }
            },isNonPassWord34:{
                validate:function(selector){
                    var v = validator.getValue(selector);
                    if(v == '') {
                        this.instructions = VALIDATE_NOT_EMPTY_MSG[selector];
                        return false;
                    }

                    //숫자 혼용해서 3~4자 이내
                    this.instructions = VALIDATE_FIX_MSG[selector];
                    var strReg =/^[0-9]{3,4}$/;
                    return strReg.test(v);
                }
            }
            ,isXXNo13:{
                validate:function(selector){
                    return _jiminFix(selector,13,this,true,true);
                }
            }
        }
        ,config:{}
        ,exceptionFn:{}
        ,setValidateMultiId : function(id)
        {
            multiValidateId = id;
        }
        ,getValidateMultiId : function()
        {
            return multiValidateId;
        }
        ,validate:function(isNonExFnRun){
            var i,msg,type,checker,resultOK,vGroup;
            var that = this;

            var fnValidateCheck = function(id,prdcType)
            {
                checker = that.types[type];

                if(!type)
                {
                    return;
                }

                if(!checker)
                {
                    return false;
                }
                resultOK = checker.validate(id);
                if(!resultOK)
                {
                    /**********************************************
                     * id구성 2개 이상 일때...
                     *********************************************/
                    if(id.indexOf('&')>-1)
                    {
                        id = validator.getValidateMultiId();
                    }

                    that.id = id;
                    msg = checker.instructions;
                    that.message=msg;

                    var exFn = validator.exceptionFn[id];
                    if(exFn != undefined && typeof exFn == 'function' && !isNonExFnRun)
                        exFn();

                    var $validTarget = $('#'+id);

                    if ($validTarget.hasClass("formHidden")) {

                        if ($validTarget.parent().parent().css("display") == "none") {
                        	$validTarget.parent().parent().prev().focus();
                        } else {
                        	// 아코디언 내부로 포커스를 보내야 할 경우
                        	if( $validTarget.parents(".acc_contents").length ){
                        		$validTarget.parents(".acc_contents").show().parent(".acc_scope").addClass("active");
                        		if($validTarget.offset()){
                        			$("body, html").animate({ scrollTop : $validTarget.offset().top - 46 }, 500);
                        		}
                        		$validTarget.next().focus();
                        	} else {
                        		// 아코디언 내부로 포커스를 보내야 할 경우
                            	if(!$validTarget.parents(".order-input").hasClass("order-input-open")){
                            		$validTarget.parents(".order-input").children("[order-data=inpOpen]").trigger("click");
                            		$validTarget.focus();
                            	}else{
                            		$validTarget.next().focus();
                            	}
                            	
                        	}
                        }
                    } else {
                    	// 아코디언 내부로 포커스를 보내야 할 경우
                    	if( $validTarget.parents(".acc_contents").length ){
                    		$validTarget.parents(".acc_contents").show().parent(".acc_scope").addClass("active");
                    		if( $("*[data-type=scroll]").length ){
                    			$(this).KT_designScrollInit();
                    		}
                    	} else {
                            
                    		$validTarget.parents('.grid-content').css({
                               display : 'block'
                            });
                            
                            // 아코디언 내부로 포커스를 보내야 할 경우
                        	if(!$validTarget.parents(".order-input").hasClass("order-input-open")){
                        		$validTarget.parents(".order-input").children("[order-data=inpOpen]").trigger("click");
                        	}

                        }

                        $validTarget.focus();
                        
                        var stickyH;
                    	// 스티키영역이 있을 경우 포커스 영역 가림 방지
                    	if( $(".sticky_area").length ){
                    		stickyH = $(".sticky_area").outerHeight();
                    	}
                    	// M샵 상단 검색영역이 있을 경우 포커스 영역 가림 방지
                    	else if ( $(".mOllehSearch_wrap").length ){
                    		stickyH = $(".mOllehSearch_wrap").outerHeight();
                    	}                     	
                    	else {
                    		stickyH = 0;
                    	}
                    	if($validTarget.offset()){
                    		$("body, html").animate({ scrollTop : $validTarget.offset().top - stickyH - 10 }, 500);
                    	}
                    }

                    /**IE에서 focus 상단으로 붙는 현상 방지*/
                    var agent = navigator.userAgent.toLowerCase();
                    if ((navigator.appName=='Netscape' && navigator.userAgent.search('Trident') != -1) || agent.indexOf("msie") != -1) {
                        try {
                            $('html').animate({scrollTop:$('#'+id).offset().top - ($(window).height() / 2)}, 0);
                        } catch (e) {

                        }
                    }
                }

                return resultOK;
            }

            resultOK = true;
            that.message = '';

            for(var i in this.config)
            {
                if(this.config.hasOwnProperty(i))
                {
                    vGroup = this.config[i];
                    if(typeof vGroup ==='object')
                    {
                        for(var p in vGroup)
                        {
                            if(vGroup.hasOwnProperty(p))
                            {
                                type = vGroup[p];
                                fnValidateCheck(p,i);
                                if(!resultOK)
                                {
                                    break;
                                }
                            }
                        }
                    }
                    else
                    {
                        type = vGroup;
                        fnValidateCheck(i);
                    }

                    if(!resultOK)
                        break;
                }
            }

            return resultOK;
        }
        ,getErrorMsg:function()
        {
            return this.message;
        }
        ,getErrorId:function()
        {
            return this.id;
        }
    }
}();