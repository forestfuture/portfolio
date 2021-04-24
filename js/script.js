// PhotoSwipe
// initPhotoSwipeFromDOM(".js-my-gallery");

$(function () {

  //iOS対策
  //iOSでは疑似要素を含むaタグのリンクは２回タップしないと遷移とページ内スクロールをしないため、
  //ユーザーエージェント判定でiOSの場合はbodyタグにiosを付与し、対象の疑似要素をdisplay: noneする
  var ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) {
    $("body").addClass("ios");
  }

  //Worksのリンクを有効化
  //スライド（Swiper）内に記載のリンクを有効にするため下記の記述が必要 (;´･ω･)ｳｰﾝ･･･
  $(".works-url").on("click", "a", function (e) {
    e.stopPropagation();
  });

  //ページ内スクロール
  var $nav = $(".gnav");
  var navHeight = $nav.outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - 60;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      300,
      "swing"
    );
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300
    );
    return false;
  });

  // ページトップ表示
  $(window).on("scroll", function(){
    if(200 < $(this).scrollTop()){
      $(".page-top").css("bottom", "0px");
    }else{
      $(".page-top").css("bottom", "-50px");
    }
  })

  // nav-toggle
  $(".nav-toggle").on("click", function(){
    $(".gnav").toggleClass("is-open");
    $(".body-bg").toggleClass("bg-open");

    if($(".gnav").hasClass("is-open")){
      $("body").css("overflow", "hidden");
    }else{
      $("body").css("overflow", "auto");
    }
  })
  $(".gnav-link").on("click", function(){
    $(".gnav").removeClass("is-open");
    $("body").css("overflow", "auto");
    $(".body-bg").removeClass("bg-open");
  })

  // form
  let $form = $("#js-form");
  $form.submit(function(e) { 
    $.ajax({ 
      url: $form.attr('action'), 
      data: $form.serialize(), 
      type: "POST", 
      dataType: "xml", 
      statusCode: { 
        0: function() { 
          //送信に成功したときの処理 
          $form.slideUp();
          $("#js-success").slideDown();
          $(".section-lead").children().text("送信完了しました。ありがとうございます。");
          $(".section-lead").children().css("color", "blue");
        }, 
        200: function() { 
          //送信に失敗したときの処理 
          $form.slideUp();
          $(".section-lead").children().text("送信に失敗しました。ページを更新して再度送信してください。");
          $(".section-lead").children().css("color", "red");
        }
      } 
    });
    return false; 
  }); 

});
