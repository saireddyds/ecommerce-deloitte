$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('hide');
    });
    //looping html with json // we can use \ or ' to allow " char
    let html = "<div class=\"col-md-4 pointer js-product-click\" data-product-details=\"";
    let html2 = "\"><div class=\"product-interior position-relative\"><img src=";
    let html3 = " class=\"product-img\"><div class=\"product-name\"><div class=\"p-normal\">";
    let html4 = "</div><div class=\"js-get-code\" data-get-category=\"";
    let html5 = "\">";
    let html6 = "</div></div><div class=\"price p-medium\">";
    let html7 = "</div></div><div class=\"rating\"><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><img src=\"./assets/images/cart-dark.svg\"></div></div>";
    $.ajax({
        type: 'GET',
        url: "./json/productData.json",
        dataType: 'json',
        success: function (data) {
            let items = [];
            $.each(data, (i, item) => { // arrow function
                items.push(html + item.productDetailData + html2 + item.productMedia + html3 + item.productName + html4 + item.productCategory + html5 + item.productCategory + html6 + item.productPrice + html7)
            });
            $("#product-grid-section").html(items);
        }
    });
    //multi selection filter javascript starts here
    $('body').on('click', '.js-filter', function () {
        $(this).toggleClass('selected');
        let getCategory;
        let $parentElement = $('.col-md-4'); // instead of initializing jquery object twice i made it in let once and using let
        let selectedCategoryCode = Util.getSelectedCategoryCode($('.js-filter')); //using util class and accessing method in it
        $parentElement.hide();
        $('.js-get-code').each(function () {
            getCategory = $(this).data('get-category').split(',');
            let isTrue = selectedCategoryCode.some((i) => getCategory.includes(i));  //es6 arrow function //this will compare two arrays for any one match
            if (isTrue) {
                $(this).parents('.col-md-4').show();
            }
        });
        if (!selectedCategoryCode.length) {
            $parentElement.show();
        }
    });
    //looping html with json
    let productDetailHtml = "<div class=\"product-detail-wrapper container\"><div class=\"row\"><div class=\"col-lg-6 col-sm pt-6\"><div id=\"primary-slider\" class=\"splide\"><div class=\"splide__track\">";
    let productDetailHtml2 = "</div></div><div id=\"secondary-slider\" class=\"pt-3 splide\"><div class=\"splide__track\"></div></div></div><div class=\"col-lg-6 col-sm pt-6\"><div class=\"product-description\"><div class=\"p-medium font-ash\">";
    let productDetailHtml3 = "</div><h1>";
    let productDetailHtml4 = "</h1><div class=\"p-normal\">";
    let productDetailHtml5 = "</div><div class=\"p-medium font-ash pt-5\">Price per unit</div><div class=\"price-row\"><h1>";
    let productDetailHtml6 = "</h1><button class=\"custom-btn\">Buy Now</button><img src=\"./assets/images/cart-dark.svg\"></div></div></div></div></div>";
    $('body').on('click', '.js-product-click', function () {
        let url = $(this).data('product-details');
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (data) {
                let items = [];
                let medias = [];
                $.each(data, (i, item) => { // arrow function "<li class=\"splide__slide\">"+item.productMedia.media+"</li>"+
                    $("#product-grid-section").html(productDetailHtml + productDetailHtml2 + item.productCategoryName + productDetailHtml3 + item.productName + productDetailHtml4 + item.productDescription + productDetailHtml5 + item.productPrice + productDetailHtml6);
                    $.each(item.productMedia, (i, media) => {
                        medias.push("<li class=\"splide__slide\"><img src=\"" + media.media + "\"></li>");
                    });
                });
                $("<ul/>", {
                    "class": "splide__list",
                    html: medias.join("")
                }).appendTo(".splide__track"); //after html created in dom, looping media images and appending
            }
        });
        //initializing carousel after the above html is loaded
        setTimeout(function() {
            var secondarySlider = new Splide('#secondary-slider', {
                fixedWidth: 100,
                height: 60,
                gap: 10,
                cover: true,
                isNavigation: true,
                focus: 'center',
                breakpoints: {
                    '600': {
                        fixedWidth: 66,
                        height: 40,
                    }
                },
            }).mount();

            var primarySlider = new Splide('#primary-slider', {
                type: 'fade',
                heightRatio: 0.5,
                pagination: false,
                arrows: false,
                cover: true,
            }); // do not call mount() here.

            primarySlider.sync(secondarySlider).mount();
        }, 500);
    });
    $('.js-page-reload').on('click', function() {
        location.reload();
    });
    if ($("#isMobile").is(':visible')) {
        $('#sidebarCollapse').click();
    }
});
//refresh page on browser resize
$(window).bind('resize', function(e)
{
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function()
    {
        this.location.reload(false); /* false to get page from cache */
    }, 200);
});
//util functions which can be reused// we can create a new js for this aw well
class Util {
    static getSelectedCategoryCode($element) {
        let selectedCategoryCode = [];
        $element.each(function () {
            if ($(this).hasClass('selected')) {
                selectedCategoryCode.push($(this).data("category-filter"));
            }
        });
        return selectedCategoryCode;
    }
}


