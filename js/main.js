
$(function () {
    $(".cvc").mask("000");
    $('.date').mask('00/00');
    $(".cardnumber").mask("9999 9999 9999 9999999");

    var $form = $("#cardForm");

    $.validator.setDefaults({
        debug: true,
        highlight: function (element) {
            $(element).parent()
                .addClass("error")
                .removeClass("valid");

        },
        unhighlight: function (element) {
            $(element).parent()
                .addClass("valid")
                .removeClass("error");

        },
    });

    $.validator.addMethod("cardnumberMethod", function (value, element) {
        if (/^[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4,7}$/.test(value)) {
            return true;
        }
    }, "");

    $.validator.addMethod("dateMethod", function (value, element) {
        if (/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)) {
            return true;
        }
    }, "");

    $.validator.addMethod("cvcMethod", function (value, element) {
        if (/^[0-9]{3}$/.test(value)) {
            return true;
        }
    }, "");

    $form.validate({
        rules: {
            cardnumber: {cardnumberMethod: true},
            date: { dateMethod: true },
            cvc: { cvcMethod: true },
        },
    });

    $('input').on('blur keyup', function () {
        if ($form.valid()) {
            $(".custom-tooltip").addClass('show');
            $('.form_submiter').prop('disabled', false);
            let $cardnumber = $('.cardnumber').val();
            let $cvc = $('.cvc').val();
            let $date = $('.date').val();
            console.log('$card', $cardnumber);
            $('ul li:nth-child(1) span').text($cardnumber);
            $('ul li:nth-child(2) span').text($cvc);
            $('ul li:nth-child(3) span').text($date);
        } else {
            $(".custom-tooltip").removeClass('show');
            $('.form_submiter').prop('disabled', 'disabled');
            $('ul li span').text('');
        }
    });
})

