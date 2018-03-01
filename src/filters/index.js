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
    } else if (finalMinutes > 1) {
        readingTimeInNativeLanguage = finalMinutes + ' ' + translator('minutes');
    } else {
        readingTimeInNativeLanguage = finalMinutes + ' ' + translator('minute');
    }

    return readingTimeInNativeLanguage;
});

Vue.filter('getPratilipiTypeInNativeLanguage', function(value, translator) {
    switch (value) {
        case 'STORY':
            return translator('_pratilipi_type_story');
        case 'POEM':
            return translator('_pratilipi_type_poem');
        case 'ARTICLE':
            return translator('_pratilipi_type_article');
        case 'BOOK':
            return translator('_pratilipi_type_book');
        case 'MAGAZINE':
            return translator('_pratilipi_type_magazine');
    }
});

Vue.filter('convertDate', function(value, translator) {
    const d = new Date(value);

    function day(d) { return (d < 10) ? '0' + d : d; }

    function month(m) {
        var months = [
            translator('month_jan'), 
            translator('month_feb'), 
            translator('month_mar'),
            translator('month_apr'), 
            translator('month_may'), 
            translator('month_jun'),
            translator('month_jul'), 
            translator('month_aug'), 
            translator('month_sep'),
            translator('month_oct'), 
            translator('month_nov'), 
            translator('month_dec')
        ];
        return months[m];
    }
    return [day(d.getDate()), month(d.getMonth()), d.getFullYear()].join(' ');
});
