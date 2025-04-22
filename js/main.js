$(document).ready(function () {
  const sections = $("section");
  const navLinks = $(".sidebar a");

  $(window).on("scroll", function () {
    let currentSection = "";

    sections.each(function () {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();

      if ($(window).scrollTop() >= sectionTop - sectionHeight / 2) {
        currentSection = $(this).attr("id");
      }
    });

    navLinks.removeClass("active");
    navLinks.each(function () {
      if ($(this).attr("href") === "#" + currentSection) {
        $(this).addClass("active");
      }
    });
  });

  function getDirection(e, $item) {
    const w = $item.outerWidth();
    const h = $item.outerHeight();
    const offset = $item.offset();
    const x = (e.pageX - offset.left - w / 2) * (w > h ? h / w : 1);
    const y = (e.pageY - offset.top - h / 2) * (h > w ? w / h : 1);
    const direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
    return direction; // 0: top, 1: right, 2: bottom, 3: left
  }

  function setOverlayPosition($overlay, direction, isIn) {
    const move = {
      0: "translateY(-100%)",
      1: "translateX(100%)",
      2: "translateY(100%)",
      3: "translateX(-100%)",
    };

    if (isIn) {
      // 초기 위치 설정
      $overlay.css({
        transition: "none",
        transform: move[direction],
      });

      // 다음 프레임 → 위치 이동 (애니메이션 발생)
      setTimeout(() => {
        $overlay.css({
          transition: "transform 0.3s ease",
          transform: "translate(0, 0)",
        });
      }, 0);
    } else {
      $overlay.css({
        transition: "transform 0.3s ease",
        transform: move[direction],
      });
    }
  }

  $(".portfolio-thumbnail").each(function () {
    const $item = $(this);
    const $overlay = $item.find(".overlay");

    $item.on("mouseenter", function (e) {
      const dir = getDirection(e, $item);
      setOverlayPosition($overlay, dir, true);
    });

    $item.on("mouseleave", function (e) {
      const dir = getDirection(e, $item);
      setOverlayPosition($overlay, dir, false);
    });
  });
});
