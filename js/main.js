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

  // 부드러운 이동
  $(".sidebar a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      600
    );
  });
});
