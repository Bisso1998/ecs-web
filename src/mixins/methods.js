import constants from '@/constants';
import controlAnalyticsEvents from '@/static_scripts/analytics_events_control'
import ratingV1AnalyticsEvents from '@/static_scripts/experiment_events/rating_v1'
import ratingV2AnalyticsEvents from '@/static_scripts/experiment_events/rating_v2'
import ratingV3AnalyticsEvents from '@/static_scripts/experiment_events/rating_v3'

const rating_v1 = ['WGEN001'];
const rating_v2 = ['WGEN002'];
const rating_v3 = ['WGEN003'];

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

export function openLoginModal(pageSource, action, location) {
    triggerAnanlyticsEvent('LANDED_REGISTERM_GLOBAL', 'CONTROL', {
        REFER_SCREEN: getAnalyticsPageSource(pageSource),
        REFER_ACTION: action,
        REFER_LOCATION: location

    });
    $('#login_modal').modal('show');
}

export function openPratilipiModal() {
    $('#pratilipi_modal').modal('show');
}

export function getAnalyticsPageSource(pageSource) {
    let analyticsPageSource;
    switch (pageSource) {
        case 'homepage': 
            analyticsPageSource = 'HOME';
            break;
        case 'pratilipipage': 
            analyticsPageSource = 'BOOK';
            break;
        case 'authorpage': 
            analyticsPageSource = 'USER';
            break;
        case 'notification': 
            analyticsPageSource = 'NOTIFS';
            break;
        case 'readerpage': 
            analyticsPageSource = 'READER';
            break;
        case 'eventspage': 
            analyticsPageSource = 'EVENTLIST';
            break;
        case 'eventpage': 
            analyticsPageSource = 'EVENT';
            break;
        case 'writepage': 
            analyticsPageSource = 'CREATE';
            break;
        case 'librarypage': 
            analyticsPageSource = 'LIBRARY';
            break;
        case 'searchpage': 
            analyticsPageSource = 'SEARCH';
            break;
        case 'blogspage': 
            analyticsPageSource = 'BLOGLIST';
            break;
        case 'blogpage': 
            analyticsPageSource = 'BLOG';
            break;
        case 'interviewspage': 
            analyticsPageSource = 'AUTHORINT';
            break;
        case 'interviewpage': 
            analyticsPageSource = 'AUTHORINT';
            break;
        case 'listpage': 
            analyticsPageSource = 'CATEGORY';
            break;
        case 'discover':
            analyticsPageSource = 'DISCOVER';
            break;
        case 'login':
            analyticsPageSource = 'LOGIN';
            break;
        case 'register':
            analyticsPageSource = 'SIGNUP';
            break;
    }
    return analyticsPageSource;
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

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
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
        }, 15000);
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

export function triggerAnanlyticsEvent(eventName, experimentType, eventProperty) {

    let eventProps;
    switch(true) {
        case (experimentType === 'CONTROL'):
            eventProps = { ...controlAnalyticsEvents[eventName] };
            break;
        case (rating_v1.indexOf(experimentType) > -1):
            eventProps = { ...ratingV1AnalyticsEvents[eventName] };
            break;
        case (rating_v2.indexOf(experimentType) > -1):
            eventProps = { ...ratingV2AnalyticsEvents[eventName] };
            break;
        case (rating_v3.indexOf(experimentType) > -1):
            eventProps = { ...ratingV3AnalyticsEvents[eventName] };
            break;
    }
    
    if (!eventProps.SCREEN_NAME) {
        eventProps.SCREEN_NAME = eventProperty['SCREEN_NAME'];
        delete eventProperty.SCREEN_NAME;
    }
    if (eventProps && eventProps.ACTION) {
        eventProps = {
            ...eventProps,
            ...eventProperty,
            'DEVICE_TYPE': isMobile() ? 'MOBILE':'DESKTOP',
            'WEBSITE_TYPE': 'PHOENIX',
            'EXPERIMENT_ID': experimentType,
            'CONTENT_LANGUAGE': getCurrentLanguage().fullName.toUpperCase(),
            'SCREEN_LOCATION': eventProps.SCREEN_NAME + '_' + eventProps.LOCATION
        }
        console.log(eventName, eventProperty, eventProps);
        if (eventName !== 'VIEWED_APPBANNER_GLOBAL' &&
            eventName !== 'VIEWED_AUTHORDETAIL_BOOK' &&
            eventName !== 'VIEWANDROID_OPENAPP_READER' &&
            eventName !== 'VIEWED_RATEREV_BOOK' &&
            eventName !== 'VIEWED_RECOMMENDBOOK_BOOK' &&
            eventName !== 'VIEWED_RECOMMENDBOOK_READER') {
            amplitude.getInstance().logEvent(eventName, eventProps);
        } else {
            console.log('SKIPPING EVENT');
        }

        if (!window.fbApiInit) {
            setTimeout(() => {
                FB.AppEvents.logEvent(eventName, null, eventProperty)
            }, 15000);
        } else {
            FB.AppEvents.logEvent(eventName, null, eventProperty)
        }
        
    } else {
        console.log('NON REGISTERED EVENT: ', eventName);
    }
}

export function getPratilipiAnalyticsData(pratilipiData) {
    return {
        'PRATILIPI_TYPE': pratilipiData.type,
        'CONTENT_ID': pratilipiData.pratilipiId,
        'AUTHOR_ID': pratilipiData.author.authorId,
        'CONTENT_LANGUAGE': pratilipiData.language
    }
}

export function getAndroidIntentUri( utmParameters ) {``
    const SCHEME = 'http';
    const PACKAGE_NAME = 'com.pratilipi.mobile.android';
    const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=' + PACKAGE_NAME;
    const UTM_PARAMETER = utmParameters ? encodeURIComponent( Object.keys(utmParameters).map(function(key){ return key + "=" + utmParameters[key] }).join("&") ) : "";
    const uri = window.location.host + window.location.pathname + ( window.location.search || '' );
    return isChrome() ?
        'intent://' + uri + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE_NAME + ';S.browser_fallback_url=' + PLAYSTORE_URL + '&referrer=' + UTM_PARAMETER + ';end' :
        'intent://' + uri + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE_NAME + ';S.browser_fallback_url=' + 'market://search?q=pname:' + PACKAGE_NAME + '&referrer=' + UTM_PARAMETER + ';end' ;
}

export function getCookie( cname ) {
    const name = cname + "=";
    const ca = document.cookie.split( ';' );
    for( let i = 0; i < ca.length; i++ ) {
        let c = ca[i];
        while( c.charAt(0) == ' ' ) c = c.substring( 1 );
        if( c.indexOf( name ) == 0 ) return c.substring( name.length, c.length );
    }
    return null;
}

export function setCookie( name, value, days, path ) {
    var expires = "";
    if( days ) {
        var date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = "expires=" + date.toGMTString() + ";";
    }
    document.cookie = name + "=" + ( value ? value : "" ) + ";" + expires + "path=" + ( path ? path : '/' );
}
