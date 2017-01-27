$(function() {
    var swiper = new Swiper('.swiper-articles', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        spaceBetween: 50,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });
    var swiper = new Swiper('.swiper-news', {
        nextButton: '.swiper-news-next',
        prevButton: '.swiper-news-prev',
        slidesPerView: 3,
        spaceBetween: 40,
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 5
            }
        }
    });
    var swiper = new Swiper('.swiper-jumbotron', {
        nextButton: '.swiper-jumbotron-next',
        prevButton: '.swiper-jumbotron-prev',
        spaceBetween: 30
    });




    $('.burger-btn').on('click', function() {
        if (!$(this).hasClass('opened')) {
            $(this).addClass('opened');
            $(this).next().slideDown('fast');
        } else {
            $(this).removeClass('opened');
            $(this).next().slideUp('fast', function() {
                //Reset inline display styles
                $(this).css('display', '');
            });
        }
    });
});
