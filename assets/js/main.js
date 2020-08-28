$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('hide');
    });
    //looping html with json
    let html = "<div class=\"col-md-4\"><div class=\"product-interior position-relative\"><img src="
    let html2 = " class=\"product-img\"><div class=\"product-name\"><div class=\"p-normal\">";
    let html3 = "</div><div class=\"js-get-code\" data-get-category=\"";
    let html4 = "\">";
    let html5 = "</div></div><div class=\"price p-medium\">";
    let html6 = "</div></div><div class=\"rating\"><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><img src=\"./assets/images/cart-dark.svg\"></div></div>";
    $.ajax({
        type: 'GET',
        url: "productData.json",
        dataType: 'json',
        success: function (data) {
            let items = [];
            $.each(data, (i, item) => { // arrow function
                items.push(html+item.productMedia+html2+item.productName+html3+item.productCategory+html4+item.productCategory+html5+item.productPrice+html6)});
            $("#product-grid-section").html(items);
        }
    });
    //multi selection filter javascript starts here
    $('body').on('click', '.js-filter', function() {
        $(this).toggleClass('selected');
        let getCategory;
        let $parentElement = $('.col-md-4'); // instead of initializing jquery object twice i made it in let once and using let
        let selectedCategoryCode = Util.getSelectedCategoryCode($('.js-filter')); //using util class and accessing method in it
        $parentElement.hide();
        $('.js-get-code').each(function() {
            getCategory = $(this).data('get-category').split(',');
            let isTrue = selectedCategoryCode.some((i) => getCategory.includes(i));  //es6 arrow function //this will compare two arrays for any one match
            if (isTrue) {
                $(this).parents('.col-md-4').show();
            }
        });
        if (!selectedCategoryCode.length) {
            $parentElement.show();
        }
    })
});

//util functions which can be reused// we can create a new js for this aw well
class Util {
    static getSelectedCategoryCode($element) {
        let selectedCategoryCode = [];
        $element.each(function() {
            if ($(this).hasClass('selected')) {
                selectedCategoryCode.push($(this).data("category-filter"));
            }
        });
        return selectedCategoryCode;
    }
}
