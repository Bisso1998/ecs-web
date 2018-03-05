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


Vue.filter('showInMinutesOrHours', function(value) {
    if (!value) {
        value = 0;
    }

    let finalMinutes = Math.round(value / 60);
    let finalHours = Math.round(finalMinutes / 60);

    let readingTimeInNativeLanguage;
    if (finalHours > 1) {
        readingTimeInNativeLanguage = finalHours + ' ' + "__('hours')";
    } else if (finalHours === 1) {
        readingTimeInNativeLanguage = finalHours + ' ' + "__('hour')";
    } else if (finalMinutes > 1) {
        readingTimeInNativeLanguage = finalMinutes + ' ' + "__('minutes')";
    } else {
        readingTimeInNativeLanguage = finalMinutes + ' ' + "__('minute')";
    }

    return readingTimeInNativeLanguage;
});

Vue.filter('getPratilipiTypeInNativeLanguage', function(value) {
    switch (value) {
        case 'STORY':
            return "__('_pratilipi_type_story')";
        case 'POEM':
            return "__('_pratilipi_type_poem')";
        case 'ARTICLE':
            return "__('_pratilipi_type_article')";
        case 'BOOK':
            return "__('_pratilipi_type_book')";
        case 'MAGAZINE':
            return "__('_pratilipi_type_magazine')";
    }
});

Vue.filter('convertDate', function(value) {
    const d = new Date(value);

    function day(d) { return (d < 10) ? '0' + d : d; }

    function month(m) {
        var months = [
            "__('month_jan')", 
            "__('month_feb')", 
            "__('month_mar')",
            "__('month_apr')", 
            "__('month_may')", 
            "__('month_jun')",
            "__('month_jul')", 
            "__('month_aug')", 
            "__('month_sep')",
            "__('month_oct')", 
            "__('month_nov')", 
            "__('month_dec')"
        ];
        return months[m];
    }
    return [day(d.getDate()), month(d.getMonth()), d.getFullYear()].join(' ');
});
