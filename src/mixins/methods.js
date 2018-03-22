import constants from '@/constants';

export function translateWord(word, callback) {
    $.ajax({
        url: "https://www.google.com/inputtools/request?ime=transliteration_en_" + process.env.LANGUAGE + "&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi",
        data: {
            text: word
        },
        type: "GET",

        dataType: "json",
    })
        .done(function(json) {
            callback(json[1][0][1])
        });
}

export function openLoginModal() {
    $('#login_modal').modal('show');
}

export function openInputModal() {
    $('#reportModal').modal('show');
}

export function openMultiInputModal() {
    $('#multiinput').modal('show');
}

export function openForgotPasswordModal() {
    $('#forgotPassModal').modal('show');
}

export function openConfirmationModal() {
    $('#confirmation').modal('show');
}

export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
}

export function isAndroid() {
    return /Android/i.test( navigator.userAgent );
}

export function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

export function getCurrentLanguage() {
    const currentLocale = process.env.LANGUAGE;
    constants.LANGUAGES.forEach((eachLanguage) => {
        if (eachLanguage.shortName === currentLocale) {
            return eachLanguage;
        }
    });
}