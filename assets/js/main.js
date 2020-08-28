$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('hide');
    });
    let html = "<div class=\"col-md-4\"><div class=\"product-interior position-relative\"><img src="
    let html2 = " class=\"product-img\"><div class=\"product-name\"><div class=\"p-normal\">";
    let html3 = "</div><div>";
    let html4 = "</div></div><div class=\"price p-medium\">";
    let html5 = "</div></div><div class=\"rating\"><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><span>&#9734</span><img src=\"./assets/images/cart-dark.svg\"></div></div>";
    $.ajax({
        type: 'GET',
        url: "productData.json",
        dataType: 'json',
        success: function (data) {
            let items = [];
            $.each(data, function(i, item){
                console.log(item);
                items.push(html+item.productMedia+html2+item.productName+html3+item.productCategory+html4+item.productPrice+html5);
            });
            $("#product-grid-section").html(items);
        }
    });
});
