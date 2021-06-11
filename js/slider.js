$(document).ready(function () {
  $('.hero__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    dotsClass: 'slider-dots',
    responsive: [
      {
        breakpoint: 768,
        settings: 'unslick',
      },
    ],
  });
});

$(window).resize(function () {
  $('.slider').not('.slick-initialized').slick('resize');
});
