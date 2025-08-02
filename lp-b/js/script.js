
jQuery(function ($) {
  
  //画像 switch
  var $setElem = $('.js-switch'),
  pcName = '_pc',
  spName = '_sp',
  replaceWidth = 768;

  $setElem.each(function () {
  var $this = $(this);

  function imgSize() {
    if (window.innerWidth > replaceWidth) {
      $this.attr('src', $this.attr('src').replace(spName, pcName)).css({
        visibility: 'visible'
      });
    } else {
      $this.attr('src', $this.attr('src').replace(pcName, spName)).css({
        visibility: 'visible'
      });
    }
  }
  $(window).resize(function () {
    imgSize();
  });
  imgSize();
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

});

function checkBreakPoint() {
  w = $(window).width();
  if (w <= 768) {
    // スマホ向け（768px以下のとき）
    $('.js-interview-slider').not('.slick-initialized').slick({
      //スライドさせる
      // autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      infinite: true,
      centerPadding: '0',
      prevArrow: '<span class="prevArrow slide-arrow prev-arrow"></span>',
      nextArrow: '<span class="nextArrow slide-arrow next-arrow"></span>',
    });
  } else {
    // PC向け
    $('.js-interview-slider').slick('unslick');
  }
}
// ウインドウがリサイズする度にチェック
$(window).resize(function(){
  checkBreakPoint();
});
// 初回チェック
checkBreakPoint();

