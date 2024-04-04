function sousuo() {
  const mainTitle = $(".main-title");
  const mainBack = $(".main-back");
  const mainLogo = $(".main-logo");
  const actionMenus = $(".mui-action-menu");

  if (mainBack.length > 0) {
    return Math.ceil(mainTitle.width()) - Math.ceil(mainBack.width()) - 85;
  } else {
    let totalActionMenuWidth = 0;
    actionMenus.each(function () {
      totalActionMenuWidth += $(this).width();
    });
    return Math.ceil(mainTitle.width()) - Math.ceil(mainLogo.width()) - Math.ceil(totalActionMenuWidth) - 10;
  }
}

function fenlei() {
  $(".menu-content").removeClass("show1");
  $(".myco1").removeClass("show");
  $("#menu-mask").removeClass("show");
  if ($(".menu-cat")) {
    $(".menu-cat i").removeClass("show");
  }
  setTimeout(function () {
    $("#show-top-menu").css("z-index", -1);
  }, 400);
}

const mainTitle = ".main-title";
const searchArea = $(".search_area");
const menuMask = $("#menu-mask");
const showTopMenu = $("#show-top-menu");
const detailTopMenu = $("#detail-top-menu");
const toTopButton = $(".toTop");

let isFocus = 0;
$(window).scroll(function () {
  const userAgent = navigator.userAgent.toLowerCase();
  if ("iphone" === userAgent.match(/iphone/i) || "ipad" === userAgent.match(/ipad/i)) {
    if (searchArea.is(":focus") && isFocus) {
      const scrollTop = $(document).scrollTop();
      $(document).scrollTop(scrollTop);
      $(mainTitle).css({ position: "absolute", top: scrollTop });
    } else {
      $(mainTitle).css({ position: "fixed", top: 0 });
    }
  }
});

const oPh = searchArea.attr("placeholder");
if ($(".search")) {
  sousuo();
}

$(window).resize(function () {
  if ($(".search")) {
    sousuo();
  }
});

$(".up-menu, #menu-mask").click(function () {
  fenlei();
});

$("#menu-mask2").click(function () {
  detailTopMenu.removeClass("show");
});

let isTimeTitle = 0;
$(".main-title").click(function () {
  if (isTimeTitle > 0) {
    return false;
  }
  const interval = setInterval(function () {
    isTimeTitle++;
    if (isTimeTitle > 6) {
      isTimeTitle = 0;
      clearInterval(interval);
    }
  }, 100);

  const targetId = event.target.id;
  const targetParentId = event.target.parentNode.id;
  if (targetId === "mui-action-menu" || targetId === "menu-cat-btn" || targetParentId === "menu-cat-btn") {
    $("#menu-mask2").click();
    if (menuMask.hasClass("show")) {
      fenlei();
    } else {
      showTopMenu.css("z-index", 100);
      $(".myco1").addClass("show");
      $(".menu-content").addClass("show1");
      menuMask.addClass("show");
      if ($(".menu-cat")) {
        $(".menu-cat i").addClass("show");
      }
    }
  } else {
    fenlei();
    if (detailTopMenu.hasClass("show")) {
      $("#menu-mask2").click();
    } else if (targetId === "cat-action-menu") {
      detailTopMenu.addClass("show");
    }
  }
});

$(document).ready(function () {
  const showTopMeun = $("#show-top-meun");
  const mask = $(showTopMeun).find(".mask");
  const menuContent = $(showTopMeun).find(".menu-content");
  const maskHeight = Math.max($(menuMask).height(), $(window).height());

  $(mask).css("height", maskHeight + "px");
  $(menuContent).css("height", maskHeight + "px");

  $(window).resize(function () {
    $(mask).css("height", maskHeight + "px");
    $(menuContent).css("height", maskHeight + "px");
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      toTopButton.fadeIn(1500);
    } else {
      toTopButton.fadeOut(1500);
    }
  });

  $(toTopButton).click(function () {
    $("body,html").animate({ scrollTop: 0 }, 1000);
  });
});

$(".main-back").on("click", function () {
  const searchPop = $(".search-pop");
  if ($(searchPop).css("display") === "block") {
    $(searchPop).css("display", "none");
  } else {
    if (window.history.length > 1) {
      window.history.go(-1);
      return false;
    }
    window.location.href = "/";
  }
});

$(".search form").submit(function () {
  const searchAreaValue = $.trim($(".search_area").val());
  if (searchAreaValue === "") {
    return false;
  }
});
