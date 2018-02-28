import Vue from 'vue'

Vue.filter('round', function(value, decimals) {
    if (!value) {
        value = 0;
    }

    if (!decimals) {
        decimals = 0;
    }

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
});


Vue.filter('showInMinutesOrHours', function(value, translator) {
    if (!value) {
        value = 0;
    }

    let finalMinutes = Math.round(value / 60);
    let finalHours = Math.round(finalMinutes / 60);

    let readingTimeInNativeLanguage;
    if (finalHours > 1) {
        readingTimeInNativeLanguage = finalHours + ' ' + translator('hours');
    } else if (finalHours === 1) {
        readingTimeInNativeLanguage = finalHours + ' ' + translator('hour');
    } else if (finalMinutes >  1) {
    	readingTimeInNativeLanguage = finalMinutes + ' ' + translator('minutes');
    } else {
    	readingTimeInNativeLanguage = finalMinutes + ' ' + translator('minute');
    }

    return readingTimeInNativeLanguage;
});
