/**
 * @author wjsu
 */

var Iteam = {
  _index : 1,

  init : function() {
    this.autoSize();
    this.addEvent();
  },
  autoSize : function() {
    $("#wrap-all").height($(window).height()).width($(window).width());
    $("#content").height($(window).height() * 5);
    $(".content_child").height($(window).height());
  },
  addEvent : function() {
  }
};
$(function() {
  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, false);
  Iteam.init();
}); 