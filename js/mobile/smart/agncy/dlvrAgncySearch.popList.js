document.domain = 'kt.com';
var dlvrController = $.extend(new $.CommonObj(),{
    onCreate:function() {
        this.sslDomain = $("#MSHOP_DOMAIN_HTTPS").val();

        $('[name=siGunguSelect],[name="sidoSelectVndrQckDlvy"]').on('change',function() {
            $('input[name=vndrNextPageNo]').val('0');
        });

        //지역명 인풋 이벤트
        $('input.searchInput').bind({
            change:function() {
                $('input[name=vndrNextPageNo]').val('1');
            }
        });

        //시도선택
        $("[name=sidoSelect],[name=sidoSelectVndrQckDlvy]").on('change',function() {
            if($(this).children("option:selected").index() > 0) {
                dlvrController.ajaxSend({
                    cache:false
                    ,url:'/smart/listSiGungu.json'
                    ,data:dlvrController.getSerializedData({
                        searchSido : $(this).val()
                        ,dlvrMethCd : $("#dlvrMethCd").val()
                    })
                    ,dataType:'json'
                    ,type : 'post'
                    ,async:false
                    ,successCall:function(jsonObj){
                        var siGunGuList = jsonObj.siGunGuList;
                        var sb = new Array();
                        if(siGunGuList != null){
                            for(var i=0; i<siGunGuList.length; i++) {
                                var siGunGu = siGunGuList[i];
                                if($("#dlvrMethCd").val() == '04'){
                                    if(siGunGu != null && siGunGu.rfrn1ChrVal != null){
                                        sb.push("<option value='"+siGunGu.rfrn1ChrVal+"'>"+siGunGu.cdNm+"</option>");
                                    }
                                }else{
                                    if(siGunGu != null && siGunGu.signguSbst != null){
                                        sb.push("<option value='"+siGunGu.signguSbst+"'>"+siGunGu.signguSbst+"</option>");
                                    }
                                }
                            }
                        }
                        $("[name=siGunguSelect] option").not(':eq(0)').remove();
                        $("[name=siGunguSelect]").append(sb.join(''));
                        $('input[name=vndrNextPageNo]').val('0');
                    }
                    ,errorCall:function(jsonObj) {}
                });
            } else {
                $('select[name=siGunguSelect]').html('<option value="">시/군/구 전체</option>');
            }
        });

       //대리점명으로 찾기 (엔터)
        $('.searchInput').keyup(function(e) {
            if(e.keyCode == 13) {
                $('a#searchBtn1').click();
            }
        });

        // 내위치 약관 동의
        $("#myPosition1,#myPosition2").click(function() {
            if($("#dlvrPositAgreeYn").val() == "Y"){
                if (!navigator.geolocation) {
                    alert("위치찾기를 지원하지 않습니다.");
                } else {
                    navigator.geolocation.getCurrentPosition(dlvrController.geoSearchSuccessCallback, dlvrController.geoErrorCallback);
                }
            }else{
                $("#pickup_find").hide();
                $(".b-modal").hide();
            }
        });

        //내위치 동의안함
        $('#positAgreeN').click(function() {
            $("#pickup_find").show();
            $(".b-modal").show();
            history.back();
        });

        //내위치 동의
        $('#positAgreeY').click(function() {
            $("#dlvrPositAgreeYn").val("Y");
            $("#pickup_find").show();
            $(".b-modal").show();
            history.back();

            if (!navigator.geolocation) {
                alert("위치찾기를 지원하지 않습니다.");
            } else {
                navigator.geolocation.getCurrentPosition(dlvrController.geoSearchSuccessCallback, dlvrController.geoErrorCallback);
            }
        });

        //위경도 콜백
        this.geoSearchSuccessCallback = function(position) {
            //isPositionUse = true;
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            $("a[href='#areaSearch']").trigger("click");
            $("a[href='#agencySearch']").hide();

            var geocoder = new daum.maps.services.Geocoder();
            var coord = new daum.maps.LatLng(latitude,longitude);
            geocoder.coord2addr(coord,function(status, result){
                if(status == daum.maps.services.Status.OK){
                    var arr = result[0].fullName.split(" ");
                    var sido = arr[0];
                    var siGungu1 = arr[1];
                    var siGungu2 = arr[1] +" "+ arr[2];
                    if($("#dlvrMethCd").val() == "04"){
                        $('[name="sidoSelectVndrQckDlvy"] option:contains('+sido+')').attr('selected',true);
                        $('[name="sidoSelectVndrQckDlvy"]').trigger('change');
                    }else{
                        $('[name=sidoSelect] option:contains('+sido+')').attr('selected',true);
                        $('[name=sidoSelect]').trigger('change');
                    }
                    $('[name=siGunguSelect] option:contains('+siGungu1+')').attr('selected',true);
                    $('[name=siGunguSelect] option:contains('+siGungu2+')').attr('selected',true);
                    $('a#searchBtn2').trigger('click');
                }else{
                    //행정동 찾기 실패
                }
            });
        };

        this.geoErrorCallback = function() {
            alert("사용자의 위치를 찾을 수 없습니다. 다시 시도해 주세요");
        };


        //대리점명으로 찾기
        $('a#searchBtn1, a#searchBtn3').on('click',function() {
            dlvrController.agentSearch();
        });

        $('#areaSort1').on('change',function() {
            dlvrController.agentSearch();
        });

        //지역명으로찾기
        $('a#searchBtn2').on('click',function() {
            dlvrController.regionSearch();
        });
        $('#areaSort2').on('change',function() {
            dlvrController.regionSearch();
        });

        // 조건 조회
        $("#sortWrap1 button").on("click", function(){
              $(".sortWrap button") .removeClass("on").attr("title", "");
              $(this).addClass("on").attr("title", "선택됨");
              $("#vndrSortProd").val($(this).attr("id"));
              $('a#searchBtn1').trigger('click');
        });

        $("#sortWrap2 button").on("click", function(){
          $(".sortWrap button") .removeClass("on").attr("title", "");
          $(this).addClass("on").attr("title", "선택됨");
          $("#vndrSortProd").val($(this).attr("id"));
          $('a#searchBtn2').trigger('click');
      });
        $("#sortWrap3 button").on("click", function(){
            $(".sortWrap button") .removeClass("on").attr("title", "");
            $(this).addClass("on").attr("title", "선택됨");
            $("#vndrSortProd").val($(this).attr("id"));
        });
        $("#sortWrap4 button").on("click", function(){
            $(".sortWrap button") .removeClass("on").attr("title", "");
            $(this).addClass("on").attr("title", "선택됨");
            $("#vndrSortProd").val($(this).attr("id"));
        });

        $('button[name=dlvrListMoreBtn]').on('click',function() {
            //<button type="button" class="btn_review bg_color" name="dlvrListMoreBtn">더 보기 <span class="point_color">1</span> / <span class="total">4</span></button>
            var currPage = parseInt($(this).find('span').eq(0).text());
            var nextPage = currPage + 1;
            var totalPage = parseInt($(this).find('span').eq(1).text());
            $(this).parent().find("li:hidden").each(function(idx){
                if(idx < 5){
                    $(this).show();
                }
            });

            if(nextPage >= totalPage){
                $(this).hide();
            }else{
                $(this).find('span').eq(0).text(nextPage);
            }

        });

        $("#areaGrade1, #areaGrade2").on("change",function(){
            if($(this).attr("id")=='areaGrade1'){
                dlvrController.agentSearch();
            }else{
                dlvrController.regionSearch();
            }
        });

        $(document).on("click","a.mapView", function(){
            if($("#vndrDrmbDivCd").val() == "01" && $("#hndsetDlvrFrml").val() == "03" ){
                fnMapView($("#vndrNoTmp").val(),$("#drRecpAgncyCdTmp").val());
            }else{
                fnMapView($("#vndrNo").val(),$("#lowVndrNo").val());
            }
        });
        $(document).on("click","a.map", function(){
            //fnMapView($(this).attr("vndrNo"),$(this).attr("lowVndrNo"));
            if(confirm('지도 보기 이용 시 데이터 요금이 발생할 수 있습니다.')) {
                var vndrNo = $(this).attr("vndrNo");
                var lowVndrNo = $(this).attr("lowVndrNo");
                var url = "/m/smart/agncyMap.do?vndrNo="+vndrNo+"&lowVndrNo="+lowVndrNo;
                var iframeStr = "<iframe style='width:100%; height:1100px;' src='"+url+"'></iframe>";
                $('div#agncyMapView').html(iframeStr);
                $('a#agncyMapViewBtn').trigger('click');
            }
        });

    }
    , printRow : function(jsonObj,targetDivId) {
        var agncyList = jsonObj.agncyList;
        $('div#'+targetDivId+' ul.agLst').html('');
        $('a.selectHandler1').off('click');
        var bf = new Array();
        var totalCnt = agncyList.length;
        var badgeClass = '';
        var badgeName = '';
        var grade = '';
        if(targetDivId == 'agencySearch'){
            grade = $("#areaGrade1").val();
        }else{
            grade = $("#areaGrade2").val();
        }
        var dlvrNm = $("input[name='hndsetDlvrFrml']:checked").next().find("em").text();
        if(dlvrNm==null || dlvrNm==undefined || dlvrNm==""){
            dlvrNm = $("#boxDelivery button[value='"+page.delivery+"']").text();
        }

        if(agncyList.length > 0) {
            for(var i=0; i<agncyList.length; i++) {
                var agncy = agncyList[i];
                var vndrNm = agncy.vndrNm;
                var badgeFlag="";
                var fullVndrNm = "";

                if(agncy.bestYn=='Y'){
                    badgeClass='badge_good';
                    badgeFlag = 'BEST';
                    badgeName='우수';
                }else if(agncy.hotYn=='Y'){
                    badgeClass='badge_hot';
                    badgeFlag = 'HOT';
                    badgeName='최우수';
                }else if(agncy.rcmdYn=='Y'){
                    badgeClass='badge_recom';
                    badgeFlag = 'RECOMM';
                    badgeName='추천';
                }else if(agncy.newYn=='Y'){
                    badgeClass='badge_new';
                    badgeFlag = 'NEW';
                    badgeName='신규';
                }else if(agncy.mnsTypeYn == 'Y'){
                    badgeClass='badge_direct';
                    badgeFlag = 'MNS';
                    badgeName='KT직영';
                }else{
                    badgeClass='badge_ktcertifi';
                }

                if(agncy.vndrNo == 'YS20009'){
                    badgeFlag = "DIRECT";
                }
                bf.push('<li class="'+badgeFlag+'">');
                bf.push('   <div class="agInfo">');
                if(agncy.vndrNo == 'YS20009'){
                    bf.push('<span class="badge '+badgeClass+' badge_kt"><em class="hidden">'+badgeName+'</em></span>');
                    bf.push('   <span class="name">직영온라인(전국망)</span>');
                    fullVndrNm = "직영온라인(전국망)";
                }else{
                    if(badgeClass != 'badge_ktcertifi'){
                        bf.push('<span class="badge '+badgeClass+'"><em class="hidden">'+badgeName+'</em></span>');
                    }
                    bf.push('   <span class="name">'+vndrNm+'_'+agncy.lowVndrNm +'</span>');
                    fullVndrNm = vndrNm+"_"+agncy.lowVndrNm;
                }
                bf.push('       <div class="starRating" title="평균평점 및 구매후기 수">');
                bf.push('           <a href="#productReviewVndr" class="review" vndrNo="'+agncy.vndrNo+'" vndrNm="'+fullVndrNm+'">');
                bf.push('               <p class="hidden">별 점수</p>');
                bf.push('               <span><em style="width: '+controller.getStarPercent(agncy.vndrSdegEvVal)+'%;">'+agncy.vndrSdegEvVal+'점</em></span>');
                bf.push('               ('+controller.addCom(agncy.reviewCnt)+')');
                bf.push('           </a>');
                bf.push('       </div>');

                //* s: 190906 대리점 페이지 개선*//
                bf.push('       <div class="agncyGiftTab">');
                if(agncy.mobilegiftcardSvcId != ''){
                    bf.push('           <span class="giftMark">KT샵상품권</span>');
                }
                if(agncy.kgShopId != ''){
                    bf.push('           <span class="giftMark">문화상품권</span>');
                }
                if(agncy.mobilegiftcardSvcId != '' || agncy.kgShopId != ''){ //KT, 문화상품권 1건이상
                    bf.push('           <a href="javascript:void(0)" id="giftTipDesc" class="new_tool_tip" data-type="tooltip" role="button" title="열기">도움말</a>');
                    bf.push('               <div id="giftToolDesc">');
                    bf.push('                   KT샵에서 핸드폰 할부원금을 상품권으로 할인 가능합니다. <br>상품권을 사용할 수있는 대리점을 확인하세요.<br>(대상 상품권 : 문화상품권, KT샵모바일 상품권)');
                    bf.push('               </div>');
                }

                bf.push('       </div>');
                //* e: 190906 대리점 페이지 개선*//

                if($("#supportType").val()=='01' && $("#noPplId").val() != 'Y'){
                    bf.push('   <p class="support">추가지원금 (단말할인 선택 시) <span><b>'+controller.addCom(agncy.storSuprtAmt)+'</b>원</span></p>');
                }else{
                    bf.push('   <p class="support">추가지원금 <b>-</b> </p>');
                }

                if(agncy.vndrNo == 'YS20009'){
                    bf.push('       <a href="#" role="button" class="btn_select selectHandler1" vndrNo="'+agncy.vndrNo+'" lowVndrNo="'+agncyList[i].lowVndrNo+'" vndrSntyNo="'+agncy.vndrSntyNo+'" vndrProdNo="'+agncy.vndrProdNo+'"  vndrNm="'+vndrNm+' '+agncy.lowVndrNm+'" ');
                    bf.push('        mobilegiftcardSvcId="' + agncy.mobilegiftcardSvcId + '" mblCpnUseYn="' + agncy.mblCpnUseYn + '" mblCpnLmtYn="' + agncy.mblCpnLmtYn + '" mblCpnLmtAmt="' + agncy.mblCpnLmtAmt + '" ');
                    bf.push('        cultCpnUseYn="' + agncy.cultCpnUseYn + '" cultCpnLmtYn="' + agncy.cultCpnLmtYn + '" cultCpnLmtAmt="' + agncy.cultCpnLmtAmt + '"');
                    bf.push('        onClick="gaEventTracker(false, \''+eventPrefix+'_모바일_상세\', \'팝업_배송방법_'+dlvrNm+'\', \'직영온라인\'); trackProductClicks(\''+$("#productsCode").val()+'\', \''+cTitleVal+'_무선상세\', \''+cSubjectVal+'_무선상세^040_팝업_020_배송방법^050_선택^000_직영온라인\');">선택</a> ');
                }else{
                    bf.push('       <a href="#"  role="button"class="btn_select selectHandler1" vndrNo="'+agncy.vndrNo+'" lowVndrNo="'+agncyList[i].lowVndrNo+'" vndrSntyNo="'+agncy.vndrSntyNo+'" vndrProdNo="'+agncy.vndrProdNo+'"  vndrNm="'+vndrNm+' '+agncy.lowVndrNm+'" ');
                    bf.push('        mobilegiftcardSvcId="' + agncy.mobilegiftcardSvcId + '" mblCpnUseYn="' + agncy.mblCpnUseYn + '" mblCpnLmtYn="' + agncy.mblCpnLmtYn + '" mblCpnLmtAmt="' + agncy.mblCpnLmtAmt + '" ');
                    bf.push('        cultCpnUseYn="' + agncy.cultCpnUseYn + '" cultCpnLmtYn="' + agncy.cultCpnLmtYn + '" cultCpnLmtAmt="' + agncy.cultCpnLmtAmt + '"');
                    bf.push('        onClick="gaEventTracker(false, \''+eventPrefix+'_모바일_상세\', \'팝업_배송방법_'+dlvrNm+'\', \''+vndrNm+'_'+agncy.lowVndrNm+'\'); trackProductClicks(\''+$("#productsCode").val()+'\', \''+cTitleVal+'_무선상세\', \''+cSubjectVal+'_무선상세^040_팝업_020_배송방법^050_선택^010_'+vndrNm+'_'+agncy.lowVndrNm+'\');">선택</a> ');
                }
                bf.push('   </div>');
                bf.push('   <div class="agCnt">');

                //if("03" != $("#dlvrMethCd").val()){
                //  bf.push('   <p class="support">추가지원금 <span><b>'+controller.addCom(agncy.storSuprtAmt)+'</b>원</span></p>');
                //}

                // 대리점안내 -> 대리점혜택 변경
                // 4줄표시 제한
                if(agncy.bnfitNm != ''){
                    bf.push('       <p style="max-height:72px; overflow:hidden;">'+controller.enterToBr(brTrim(agncy.bnfitNm))+ '</p>');
                }

                if(agncy.telNo != ""){
                    bf.push('       <span class="btn tel"><a href="tel:'+agncy.telNo+'">'+agncy.telNo+'</a></span>');
                }else{
                    bf.push('       <span class="btn tel"><a href="tel:'+agncy.mphonNo+'">'+agncy.mphonNo+'</a></span>');
                }
                if(agncyList[i].vndrNo != 'YS20009'){
                    bf.push('       <span class="btn map"><a href="javascript:void(0)" class="map" vndrNo="'+agncyList[i].vndrNo+'" lowVndrNo="'+agncyList[i].lowVndrNo+'" onclick="trackProductClicks(\''+$("#productsCode").val()+'\', \''+cTitleVal+'_무선상세\', \''+cSubjectVal+'_무선상세^040_팝업^060_지도보기^010_'+vndrNm+'_'+agncy.lowVndrNm+'\');" title="새창열림">지도보기</a></span>');
                }
                if (agncy.likeBenefitCtgId != 'Y') {
                    //210628 반영 bf.push('     <span class="btn profit"><a href="javascript:void(0);" class="benefitView" vndrNo="'+agncy.vndrNo+'" lowVndrNo="' + agncy.lowVndrNo + '"  onclick="trackProductClicks(\''+$("#productsCode").val()+'\', \''+cTitleVal+'_무선상세\', \''+cSubjectVal+'_무선상세^040_팝업^070_혜택보기^010_'+vndrNm+'_'+agncy.lowVndrNm+'\');" title="새창열림">혜택보기</a></span>');
                }

                bf.push('   </div>');
                bf.push('</li>');
            }
            $('div#'+targetDivId+' ul.agLst').html(bf.join(''));
            $(".img_areaSearch_guide").hide();
        } else {
            bf.push('<li class="none">');
            bf.push('       <strong>검색하신 대리점이 없습니다.</strong>');
            bf.push('       다른 지역 또는 대리점명으로 검색하시거나<br/> 다른 배송방법을 선택해주세요.');

            if($("#dlvrMethCd").val()=="01"){
                bf.push('<br />(다른 배송방법에는 당일배송, 매장픽업이 있습니다.)');
            }
            if($("#dlvrMethCd").val()=="04"){
                bf.push('<br />(다른 배송방법에는 택배, 매장픽업이 있습니다.)');
            }
            if($("#dlvrMethCd").val()=="03"){
                bf.push('<br />(다른 배송방법에는 택배, 당일배송이 있습니다.)');
            }
            bf.push('</li>');

            $('div#'+targetDivId+' ul.agLst').html(bf.join(''));
            $(".img_areaSearch_guide").hide();
        }

        //선택
         $('a.selectHandler1').on('click',function() {
            controller.vndrSortProd = $("#vndrSortProd").val(); // 대리점 선택후 정렬 값 셋팅

            var mobilegiftcardSvcId = $(this).attr('mobilegiftcardSvcId');
            var mblCpnUseYn = $(this).attr('mblCpnUseYn');
            var mblCpnLmtYn = $(this).attr('mblCpnLmtYn');
            var mblCpnLmtAmt = $(this).attr('mblCpnLmtAmt');
            var cultCpnUseYn = $(this).attr('cultCpnUseYn');
            var cultCpnLmtYn = $(this).attr('cultCpnLmtYn');
            var cultCpnLmtAmt = $(this).attr('cultCpnLmtAmt');
            setGiftInfo(mobilegiftcardSvcId, mblCpnUseYn, mblCpnLmtYn, mblCpnLmtAmt, cultCpnUseYn, cultCpnLmtYn, cultCpnLmtAmt);

            var vndrNo = $(this).attr('vndrNo');
            var vndrSntyNo = $(this).attr('vndrSntyNo');
            var drRecpAgncyCd = $(this).attr('lowVndrNo');
            var vndrNm = $(this).attr('vndrNm');
            var vndrProdNo = $(this).attr('vndrProdNo');
            setDlvrAgncy(vndrNo,drRecpAgncyCd,vndrNm,vndrProdNo,vndrSntyNo);
            $(this).addClass('is-focus')
         });

         $('a.benefitView').on('click',function() {
            var vndrNo = $(this).attr('vndrNo');
            var lowVndrNo = $(this).attr('lowVndrNo');
            var prodNo = $("#prodNo").val();
            var sntyNo = $("#sntyNo").val();
            var sortProd = $("#vndrSortProd").val();
            var dlvrMethCd = $("#dlvrMethCd").val();
            var url = "/m/smart/agncyBenefitView.do?prodNo="+prodNo
                                            + "&vndrNo="+vndrNo
                                            + "&lowVndrNo=" + lowVndrNo
                                            + "&sntyNo=" + sntyNo
                                            + "&sortProd=" + sortProd
                                            + "&dlvrMethCd=" + dlvrMethCd;

            window.open(url, 'benefitDtl', 'scrollbars=yes');
          });
    }
    ,agentSearch : function(){
        var agancy = $(".agencyTabs a.active").attr("href").replace("#","");;

        var searchValue = $('#searchInput').val(); //대리점명
        var benefitCtgId = $("#benefitCtgId option:selected").val(); //사은품
        var keyword = $('#keyword').val(); //키워드

        if (agancy == 'keyword') { //키워드
            searchValue = '';
            benefitCtgId = '';
            //keyword = '';
        }else if (agancy == 'agncyGiftSearch') { //사은품
            searchValue = '';
            //benefitCtgId = '';
            keyword = '';
        } else { //대리점명
            //searchValue = '';
            benefitCtgId = '';
            keyword = '';
        }

        $.loadBlock(true);
        if(serverName =='DEV'){
            dlvrController.ajaxSend({
                cache:false
                ,url: '/m/smart/dlvrAgncyInfoDev.json'
                ,data:dlvrController.getSerializedData({
                    searchValue : searchValue
                    ,keyword : keyword
                    ,prodNo : $("#prodNo").val()
                    ,dlvrMethCd : $("#dlvrMethCd").val()
                    ,sbscTypeCd : $("#sbscTypeCd").val()
                    ,pplId : $("#pplId").val()
                    ,sntyNo : $("#sntyNo").val()
                    ,inslMonsTypeCd : $("#inslMonsTypeCd").val()
                    ,svcEngtMonsTypeCd : $("#svcEngtMonsTypeCd").val()
                    ,sortProd : $("#vndrSortProd").val()
                    ,mnsTypeYn : $("#mnsTypeYn").val()
                    ,vndrDrmbDivCd : $("#vndrDrmbDivCd").val()
                    , giftishowAmt : $("#giftishowAmt").val()
                    , cultureAmt : $("#cultureAmt").val()
                    , benefitCtgId : benefitCtgId
                })
                ,dataType:'json'
                ,type : 'post'
                ,async:true
                ,successCall:function(jsonObj){
                    var targetDivId = $(".agencyTabs a.active").attr("href").replace("#","");
                    dlvrController.printRow(jsonObj, targetDivId);
                }
                ,errorCall:function(jsonObj) {}
            });
        }else{
            $.ajax({
                  url            : dlvrController.sslDomain + '/m/smart/dlvrAgncyInfo.json?pId='+Math.floor(Math.random()*10000)
                  , data            : dlvrController.getSerializedData({
                        searchValue : searchValue
                        ,keyword : keyword
                        ,prodNo : $("#prodNo").val()
                        ,dlvrMethCd : $("#dlvrMethCd").val()
                        ,sbscTypeCd : $("#sbscTypeCd").val()
                        ,pplId : $("#pplId").val()
                        ,sntyNo : $("#sntyNo").val()
                        ,inslMonsTypeCd : $("#inslMonsTypeCd").val()
                        ,svcEngtMonsTypeCd : $("#svcEngtMonsTypeCd").val()
                        ,sortProd : $("#vndrSortProd").val()
                        ,vndrDrmbDivCd : $("#vndrDrmbDivCd").val()
                        , giftishowAmt : $("#giftishowAmt").val()
                        , cultureAmt : $("#cultureAmt").val()
                        , benefitCtgId : benefitCtgId
                    })
                , type            : 'post'
                , contentType    : 'application/x-www-form-urlencoded;charset=UTF-8'
                , cache            : false
                , dataType        : 'jsonp'
                , async            : true
                , timeout        : 10000
                , isBlock : true
                , isDim : true
                , errorCall : function () {}
                , error: function(e,status,exception){
                    try{
                        var errorMsg = '';
                        if(e.status == '0') {
                            errorMsg = '네트워크 에러입니다. 통신연결 상태를 확인하세요';
                        } else {
                            errorMsg = '서버 에러입니다. 관리자에게 문의해 주시기 바랍니다.';
                        }
                        alert(errorMsg);
                    }catch(e){
                    }finally{
                        if(this.isBlock && $.isFunction($.loadUnBlock)) {
                            setTimeout(function(){$.loadUnBlock()},1000);
                        }
                    }
                }
                , success: function(data){
                    try{
                        var targetDivId = $(".agencyTabs a.active").attr("href").replace("#","");
                        dlvrController.printRow(data, targetDivId);
                    }catch(e){
                    }finally{
                        if(this.isBlock && $.isFunction($.loadUnBlock)) {
                            setTimeout(function(){$.loadUnBlock()},1500);
                        }
                    }
                }
            });
        }
    }
    , regionSearch : function(){
        var sidoSel ='sidoSelect';
        if($("#dlvrMethCd").val() == "04"){
            sidoSel = "sidoSelectVndrQckDlvy";

        }

        var index1 = $('[name='+sidoSel+'] option:selected').index();
        var siDo = '';
        if(index1 > 0) {
            siDo = $("[name="+sidoSel+"] option:selected").val();
        }
        var searchSiGunGu = $.trim($("[name=siGunguSelect] option:selected").val());
        var agncyPrntsCd="";
        var agncyRgnCd="";
        if($("#dlvrMethCd").val() == '04'){
            searchSiGunGu = "";
            siDo = "";
            agncyPrntsCd = $("[name="+sidoSel+"] option:selected").val();
            agncyRgnCd = $("[name=siGunguSelect] option:selected").val();

            // 시,도 시,군,구 체크 로직 추가
            if (controller.nvl(agncyPrntsCd, '') == '') {
                alert('시/도를 선택해 주세요.');
                return false;
            } else if (controller.nvl(agncyRgnCd, '') == '' && $("#vndrDrmbDivCd").val() != "01" && agncyPrntsCd != 'N000') { // 세종시 시군구 제외
                alert('시/군/구를 선택해 주세요.');
                return false;
            }

            // 당일배송 팝업 체크를 위한 코드값 저장
            $("input[name=chkAgncyPrntCd]",parent.document.body).val(agncyPrntsCd);

            if(agncyPrntsCd == 'N000'){ // 세종시경우 시군구가 없기 때문에 (시군구로 검색코드를 넘겨줌)
                agncyRgnCd = agncyPrntsCd; // 시군구 set
            }
            if(parent.document.getElementById("vndrMsnInChkType").value == "Y"){ //직영온라인 홈 진입 상품의 경우
                agncyRgnCd = '';
            }
        }else if($("#dlvrMethCd").val() == '03'){ // 매장픽업
            if(controller.nvl(siDo,'') == '' ){
                alert('시/도를 선택해 주세요.');
                return false;
            }else if(controller.nvl(searchSiGunGu,'') == '' && $("#vndrDrmbDivCd").val() != "01" && siDo != "세종"){ // 세종시 시군구 제외
                alert('시/군/구를 선택해 주세요.');
                return false;
            }
        }
        $.loadBlock(true);
        if(serverName =='DEV'){
            dlvrController.ajaxSend({
                cache:false
                ,url: '/m/smart/dlvrAgncyInfoDev.json'
                ,data:dlvrController.getSerializedData({
                    searchSido : siDo
                    ,searchSiGunGu : searchSiGunGu
                    ,agncyPrntsCd : agncyPrntsCd
                    ,agncyRgnCd : agncyRgnCd
                    ,prodNo : $("#prodNo").val()
                    ,dlvrMethCd : $("#dlvrMethCd").val()
                    ,sbscTypeCd : $("#sbscTypeCd").val()
                    ,pplId : $("#pplId").val()
                    ,sntyNo : $("#sntyNo").val()
                    ,inslMonsTypeCd : $("#inslMonsTypeCd").val()
                    ,svcEngtMonsTypeCd : $("#svcEngtMonsTypeCd").val()
                    ,sortProd : $("#vndrSortProd").val()
                    ,vndrDrmbDivCd : $("#vndrDrmbDivCd").val()
                    , giftishowAmt : $("#giftishowAmt").val()
                    , cultureAmt : $("#cultureAmt").val()
                })
                ,dataType:'json'
                ,type : 'post'
                ,async:true
                ,successCall:function(jsonObj){
                    dlvrController.printRow(jsonObj,'areaSearch');
                }
                ,errorCall:function(jsonObj) {}
            });
        }else{
            $.ajax({
                  url            : dlvrController.sslDomain + '/m/smart/dlvrAgncyInfo.json?pId='+Math.floor(Math.random()*10000)
                  , data            : dlvrController.getSerializedData({
                    searchSido : siDo
                    ,searchSiGunGu : searchSiGunGu
                    ,agncyPrntsCd : agncyPrntsCd
                    ,agncyRgnCd : agncyRgnCd
                    ,prodNo : $("#prodNo").val()
                    ,dlvrMethCd : $("#dlvrMethCd").val()
                    ,sbscTypeCd : $("#sbscTypeCd").val()
                    ,pplId : $("#pplId").val()
                    ,sntyNo : $("#sntyNo").val()
                    ,inslMonsTypeCd : $("#inslMonsTypeCd").val()
                    ,svcEngtMonsTypeCd : $("#svcEngtMonsTypeCd").val()
                    ,sortProd : $("#vndrSortProd").val()
                    ,mnsTypeYn : $("#mnsTypeYn").val()
                    ,vndrDrmbDivCd : $("#vndrDrmbDivCd").val()
                    , giftishowAmt : $("#giftishowAmt").val()
                    , cultureAmt : $("#cultureAmt").val()
                })
                , type            : 'post'
                , contentType    : 'application/x-www-form-urlencoded;charset=UTF-8'
                , cache            : false
                , dataType        : 'jsonp'
                , async            : true
                , timeout        : 10000
                , isBlock : true
                , isDim : true
                , errorCall : function () {}
                , error: function(e,status,exception){
                    try{
                        var errorMsg = '';
                        if(e.status == '0') {
                            errorMsg = '네트워크 에러입니다. 통신연결 상태를 확인하세요';
                        } else {
                            errorMsg = '서버 에러입니다. 관리자에게 문의해 주시기 바랍니다.';
                        }
                        alert(errorMsg);
                    }catch(e){
                    }finally{
                        if(this.isBlock && $.isFunction($.loadUnBlock)) {
                            setTimeout(function(){$.loadUnBlock()},1000);
                        }
                    }
                }
                , success: function(data){
                    try{
                        dlvrController.printRow(data,'areaSearch');
                    }catch(e){
                    }finally{
                        if(this.isBlock && $.isFunction($.loadUnBlock)) {
                            setTimeout(function(){$.loadUnBlock()},1500);
                        }
                    }
                }
            });
        }
    }
});

$(document).ready(function(){
    dlvrController.init();

    $(".agencyTabs > a").click(function (e) {
        e.preventDefault();
        $(this).addClass("active").attr("title","선택됨").siblings("a").removeClass("active").removeAttr("title");
        $(this).next().addClass("current").siblings("div").removeClass("current");
        $("#areaGrade1").val('A'); // 탭변경시 sorting 초기화
        $("#areaGrade2").val('A'); // 탭변경시 sorting 초기화
        if($(this).hasClass("tab01")){
            var agyList = $(this).next().children("ul").find("li").length;
            if(agyList == "0"){
                $(".img_areaSearch_guide").show();
            }
        }

        //대리점 툴팁 실행
        $("#giftTipDesc").on("click", function(){
            //공통 툴팁 실행
            $(this).KT_tooltip();
        });

    });
    //대리점명
    $($("a[href='#agencySearch']")).click(function (){
        $('a#searchBtn1').click();
    });
    //사은품명
    $($("a[href='#agncyGiftSearch']")).click(function (){
        $('a#searchBtn3').click();
    });

    $(".btn_ag").click(function(e){
        e.preventDefault();
        if($("input[name='hndsetDlvrFrml']:checked").length>0){
            $.mobile.changePage("#AgncySearch", { changeHash: true });
            //$("header, #mShopSnb").hide();
        }
    });

    $("#AgnSearchClose").click(function(){
        history.back();
        $(".img_areaSearch_guide").show();

    });

});


var fnMapView = function(vndrNo, lowVndrNo){
    if(confirm('지도 보기 이용 시 데이터 요금이 발생할 수 있습니다.')) {
        var url = "/m/smart/agncyMap.do?vndrNo="+vndrNo+"&lowVndrNo="+lowVndrNo;
        window.open(url,'mapView');
    }
};

$(document).on('click', '#giftTipDesc', function (){
    //console.log("대리점툴팁실행22");
    $(this).KT_tooltip();
});





