import constants from '@/constants';

export function translateWord(word, callback) {
    $.ajax({
        url: "https://www.google.com/inputtools/request?ime=transliteration_en_" + process.env.LANGUAGE + "&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi",
        data: {
            text: word
        },
        type: "GET",

        dataType: "json",
    }).done(function(json) {
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

export function openWritePratilipiModal() {
    $('#writermodal').modal('show');
}

export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

export function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

export function getCurrentLanguage() {
    const currentLocale = process.env.LANGUAGE;
    let language;
    constants.LANGUAGES.forEach((eachLanguage) => {
        if (eachLanguage.shortName === currentLocale) {
            language = eachLanguage;
        }
    });
    return language;
}

export function getLowResolutionImage(imageUrl) {
    let type;

    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=low&type=${type}&width=50`;
    } else {
        return imageUrl + `&quality=low&type=${type}&width=50`;
    }
}

export function getHighResolutionImage(imageUrl) {
    let type;
    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=high&type=${type}`;
    } else {
        return imageUrl + `&quality=high&type=${type}`;
    }
}

export function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    } else {
        return false;
    }
}

export function validatePassword(password) {
    if (password && password.length >= 6  ){
        return true;
    } else {
        return false;
    }
}

export function validateUsername(name) {
    if (name && name.length > 0) {
        return true;
    } else {
        return false;
    }
}

export function setAnalyticsUserProperty(propertyName, propertyValue) {
    const identify = new amplitude.Identify();
    identify.set(propertyName, propertyValue);
    amplitude.getInstance().identify(identify);

    const propertyObject = {};
    propertyObject[propertyName] = String(propertyValue)

    if (!window.FB) {
        setTimeout(() => {
            if (propertyName === 'USER_ID') {
                FB.AppEvents.setUserID(String(propertyValue));
            }
            if (FB.AppEvents.getUserID() === undefined || FB.AppEvents.getUserID() === null || FB.AppEvents.getUserID().trim() === '') {
                return;
            }
            FB.AppEvents.updateUserProperties(propertyObject, function (res, error) {
                console.log(res);
            });
        }, 3000);
    } else {
        if (propertyName === 'USER_ID') {
            FB.AppEvents.setUserID(String(propertyValue));
        }
        if (FB.AppEvents.getUserID() === undefined || FB.AppEvents.getUserID() === null || FB.AppEvents.getUserID().trim() === '') {
            return;
        }
        FB.AppEvents.updateUserProperties(propertyObject, function (res) {
            console.log("FACEBOOK USER_PROPS: ", res);
        });
    }
    
}
