function IsNumerics(input) {
    return (input - 0) == input && ('' + input).trim().length > 0;
}
function readURL(file, imageFrame) {
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + imageFrame)
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(file.files[0]);
    }
}
function RemoveImgURL(imageFrame) {
    $('#' + imageFrame).attr('src', '#');
}
function Test() {
    alert("Hello I am CommonScript.js");
}
String.prototype.getDigitBanglaFromEnglish = function () {
    var finalEnlishToBanglaNumber = {

        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
        'Jan': 'জানুয়ারী', 'Feb': 'ফেব্রুয়ারি', 'Mar': 'মার্চ', 'Apr': 'এপ্রিল', 'May': 'মে', 'Jun': 'জুন', 'Jul': 'জুলাই', 'Aug': 'আগস্ট', 'Sep': 'সেপ্টেম্বর', 'Oct': 'অক্টোবর', 'Nov': 'নভেম্বর', 'Dec': 'ডিসেম্বর'
        /*'January': 'জানুয়ারী', 'Februray': 'ফেব্রুয়ারি', 'March': 'মার্চ', 'April': 'এপ্রিল', 'May': 'মে', 'June': 'জুন', 'July': 'জুলাই', 'August': 'আগস্ট', 'September': 'সেপ্টেম্বর', 'October': 'অক্টোবর', 'November': 'নভেম্বর', 'December': 'ডিসেম্বর'*/
    };
    var retStr = this;
    for (var x in finalEnlishToBanglaNumber) {
        retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
    }
    return retStr;
};

String.prototype.getMonthBanglaFromEnglish = function () {
    var finalEnlishToBanglaNumber = {

        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
        //'Jan': 'জানুয়ারী', 'Feb': 'ফেব্রুয়ারি', 'Mar': 'মার্চ', 'Apr': 'এপ্রিল', 'May': 'মে', 'Jun': 'জুন', 'Jul': 'জুলাই', 'Aug': 'আগস্ট', 'Sep': 'সেপ্টেম্বর', 'Oct': 'অক্টোবর', 'Nov': 'নভেম্বর', 'Dec': 'ডিসেম্বর'
        'January': 'জানুয়ারী', 'Februray': 'ফেব্রুয়ারি', 'March': 'মার্চ', 'April': 'এপ্রিল', 'May': 'মে', 'June': 'জুন', 'July': 'জুলাই', 'August': 'আগস্ট', 'September': 'সেপ্টেম্বর', 'October': 'অক্টোবর', 'November': 'নভেম্বর', 'December': 'ডিসেম্বর'
    };
    var retStr = this;
    for (var x in finalEnlishToBanglaNumber) {
        retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
    }
    return retStr;
};

const num2text = {
    ones: ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'],
    tens: ['', '', 'Twenty', 'Thirty', 'Fourth', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'],
    sep: ['', ' Thousand ', ' Million ', ' Billion ', ' Trillion ', ' Quadrillion ', ' Quintillion ', ' Sextillion ']
};
const convert = function (val) {
    if (val.length === 0) {
        return '';
    }

    val = val.replace(/,/g, '');
    if (isNaN(val)) {
        return 'Invalid input.';
    }


    let [val1, val2] = val.split(".")
    let str2 = "";
    if (val2 != null && val2 != '') {
        //convert the decimals here
        var digits = (val2 + "0").slice(0, 2).split("");
        var number = Number(val2);
        if (number <= 19) {
            str2 = "" + num2text.ones[number]
        } else {
            str2 = num2text.tens[+digits[0]] + " " + num2text.ones[+digits[1]]
        }
        
    }
    let arr = [];
    while (val1) {
        arr.push(val1 % 1000);
        val1 = parseInt(val1 / 1000, 10);
    }
    let i = 0;
    let str = "";
    while (arr.length) {
        str = (function (a) {
            var x = Math.floor(a / 100),
                y = Math.floor(a / 10) % 10,
                z = a % 10;

            return (x > 0 ? num2text.ones[x] + ' Hundred ' : '') +
                (y >= 2 ? num2text.tens[y] + ' ' + num2text.ones[z] : num2text.ones[10 * y + z]);
        })(arr.shift()) + num2text.sep[i++] + str;
    }

    return str +
        ' Dollars ' +
        (str2 ? ' And ' + str2 + ' Cents' : '') +
        ' Only';
};