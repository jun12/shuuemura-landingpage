/**
 * @author wjsu
 */

var Iteam = {
  _index : 1,

  init : function() {
    this.autoSize();
    this.addEvent();
    this.loaderImg();
  },
  loaderImg:function() {
    for(var i=1; i < 7; i++ ) {
      var img = new Image();
      img.src = "images/e"+i+".jpg";
      img.onload=function () {
        //console.log("图片加载完成");
      };
    }
  },
  autoSize : function() {
    $("#wrap-all").height($(window).height()).width($(window).width());
    $("#content").height($(window).height() * 5);
    $(".content_child").height($(window).height());
    $(".content_linerlook2_content div").width($(window).width()/4-1).height($(window).width()/5-1);
    $("#center-img").width($(window).width()/2-1).height(($(window).width()/5)*2-1);
    $("#center-img").css({"margin-top":-($(window).width()/5)*2+"px","top":($(window).width()/5)*2+"px"});
    $(".content_linerlook2_content").css({"margin-top":-(($(window).width()/5)*4+20)/2+"px"});
  },
  addEvent : function() {
    this.contentSwipeUp();
    this.contentSwipeDown();
    this.kvbtntap();
    TouchBar.init();
    Slider.init('swipe-wrap',"position", 5);
  },
  contentSwipeUp : function() {
    $("#content").on("swipeUp", function() {
      ContentSwipe.contentSwipeUp();
    });
  },
  contentSwipeDown : function() {
    $("#content").on("swipeDown", function() {
      ContentSwipe.contentSwipeDown();
    });
  },
  kvbtntap : function() {
    $("#kv-btn").tap(function() {
      console.log("立即购买");
    });
    $(".content_conic_buy").tap(function() {
      console.log("立即购买2");
    });
  }
};

var Slider = {
  init: function(_object,_position, _len) {
    $('.' + _object).tap(function() {
      $(this).removeClass('contentTransition');
    });
    $('.' + _object).swipeLeft(function() {//左滑动
      var distXIndex = $(this).attr('data-index');
      var disX = parseInt($(this).css('left'));
      distXIndex = distXIndex - 0 + 1;
      $(this).attr('data-index', distXIndex);
      $('.' + _object+'Left').show();
      
      if(distXIndex==(_len-1)){
        $('.' + _object+'Right').hide();
      };
      if (distXIndex >= _len) {
        distXIndex = _len - 1;
        $(this).attr('data-index', distXIndex);
        
      } else {
        $(this).css('left', disX - $(window).width());
        $(this).addClass('contentTransition');
        $("#"+_position).find('li').removeClass('on');
        $("#"+_position).find('li').eq(distXIndex).addClass('on');
      }
    });
    $('.' + _object).swipeRight(function() {//右滑动
      var distXIndex = $(this).attr('data-index');
      var disX = parseInt($(this).css('left'));
      distXIndex = distXIndex - 0 - 1;
      $(this).attr('data-index', distXIndex);
      $('.' + _object+'Right').show();
      
      if(distXIndex==0){
        $('.' + _object+'Left').hide();
      }
      
      if (distXIndex < 0) {
        distXIndex = 0;
        $(this).attr('data-index', distXIndex);
        
      } else {
        $(this).css('left', disX + $(window).width());
        $(this).addClass('contentTransition');
        $("#"+_position).find('li').removeClass('on');
        $("#"+_position).find('li').eq(distXIndex).addClass('on');
      }
    });
    //点击左右箭头
    $('.' + _object+'Left').bind('tap',function(){//左箭头
      var _this =$('.' + _object);
      var distXIndex = _this.attr('data-index');
      var disX = parseInt(_this.css('left'));
      distXIndex = distXIndex - 0 - 1;
      _this.attr('data-index', distXIndex);
      $('.' + _object+'Right').show();
      
      if(distXIndex==0){
        $('.' + _object+'Left').hide();
      }
      
      if (distXIndex < 0) {
        distXIndex = 0;
        _this.attr('data-index', distXIndex);       
        
      } else {    
        _this.css('left', disX + $(window).width());
        _this.addClass('contentTransition');
        $("#"+_position).find('li').removeClass('on');
        $("#"+_position).find('li').eq(distXIndex).addClass('on');
      }        
    });
    $('.' + _object+'Right').bind('tap',function(){//右箭头
      var _this =$('.' + _object);
      var distXIndex = _this.attr('data-index');
      var disX = parseInt(_this.css('left'));
      distXIndex = distXIndex - 0 + 1;
      _this.attr('data-index', distXIndex);
      $('.' + _object+'Left').show();
      
      if(distXIndex == (_len-1)){
        $('.' + _object+'Right').hide();
      }
      
      if (distXIndex >= _len) {
        distXIndex = _len - 1;
        _this.attr('data-index', distXIndex);        
        
      } else {
        _this.css('left', disX - $(window).width());
        _this.addClass('contentTransition');
        $("#"+_position).find('li').removeClass('on');
        $("#"+_position).find('li').eq(distXIndex).addClass('on');
      }
    });   
  }
};
var TouchBar = {
  obj : document.getElementById('bottomBar'),
  lineBar:document.getElementById('content_linerlook2_fotter'),
  startX:0,
  currIndex:6,
  /* 移动每段距离
   */
  distance:($("#content_linerlook2_fotter").width() - $("#bottomBar").width())/6,
  maxX:$("#content_linerlook2_fotter").width() - $("#bottomBar").width()+ 30,
  init : function() {
    var That = this;
    That.obj.addEventListener("touchstart", this.touchBarStart, false);
    That.obj.addEventListener("touchmove", this.touchBarMove, false);
    That.obj.addEventListener("touchend", this.touchBarEnd, false);
    TouchBar.lineBar.addEventListener("touchstart", this.lineBarTap, false);
  },
  lineBarTap:function(e) {
    var obj = document.getElementById('bottomBar');
    if (e.targetTouches.length == 1) {
      var touch = e.targetTouches[0];
      TouchBar.startX = obj.offsetLeft - touch.pageX;
      var currLeft = (TouchBar.startX+touch.pageX)+$("#bottomBar").width()/2;
     if(currLeft > 30  && currLeft < TouchBar.maxX) {
       
       if(parseInt((currLeft-20)/TouchBar.distance)+1 != TouchBar.currIndex) {
         TouchBar.currIndex = parseInt((currLeft-30)/TouchBar.distance)+1;
         $(".content_linerlook2_content_img img")[0].src = "images/e"+TouchBar.currIndex+".jpg";
       }
       obj.style.left = touch.pageX - $("#bottomBar").width()/2 +"px";
     }
      //TouchBar.touchBarMove(e);
      //console.log();
    }
  },
  touchBarStart:function(e) {
    var obj = document.getElementById('bottomBar');
    if (e.targetTouches.length == 1) {
      var touch = e.targetTouches[0];
      TouchBar.startX = obj.offsetLeft - touch.pageX;
    }
  },
  touchBarMove : function(e) {
    var obj = document.getElementById('bottomBar');
    if (e.targetTouches.length == 1) {
     var touch = e.targetTouches[0];
     var currLeft = (TouchBar.startX+touch.pageX)+$("#bottomBar").width()/2;
     if(currLeft > 30  && currLeft < TouchBar.maxX) {
       
       if(parseInt((currLeft-20)/TouchBar.distance)+1 != TouchBar.currIndex) {
         TouchBar.currIndex = parseInt((currLeft-30)/TouchBar.distance)+1;
         $(".content_linerlook2_content_img img")[0].src = "images/e"+TouchBar.currIndex+".jpg";
       }
       obj.style.left = currLeft +"px";
     }
    }
  },
  touchBarEnd:function(e) {
    console.log("end");
  }
};
var ContentSwipe = {
  index : 0,
  contentSwipeUp : function(e) {
    var That = this;
    if (That.index < 4) {
      That.index++;
      $("#content").addClass("contentTransition");
      $("#content").css("top", -$(window).height() * parseInt(That.index));
    } else {
      return;
    }
  },
  contentSwipeDown : function(e) {
    var That = this;
    if (this.index > 0) {
      That.index--;
      $("#content").addClass("contentTransition");
      $("#content").css("top", -$(window).height() * parseInt(That.index));
    } else {
      return;
    }
  }
};

$(function() {
  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, false);
  Iteam.init();
});
