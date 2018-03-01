import bengaliCategory from './categories/navigation-bn'
import gujaratiCategory from './categories/navigation-gu'
import hindiCategory from './categories/navigation-hi'
import kannadaCategory from './categories/navigation-kn'
import malayalamCategory from './categories/navigation-ml'
import marathiCategory from './categories/navigation-mr'
import tamilCategory from './categories/navigation-ta'
import teluguCategory from './categories/navigation-te'

export default {
    LANGUAGES: [
        {
            shortName: 'bn',
            fullName: 'bengali'
        },
        {
            shortName: 'gu',
            fullName: 'gujarati'
        },
        {
            shortName: 'hi',
            fullName: 'hindi'
        },
        {
            shortName: 'kn',
            fullName: 'kannada'
        },
        {
            shortName: 'ml',
            fullName: 'malayalam'
        },
        {
            shortName: 'mr',
            fullName: 'marathi'
        },
        {
            shortName: 'ta',
            fullName: 'tamil'
        },
        {
            shortName: 'te',
            fullName: 'telugu'
        },
    ],
    CATEGORY_DATA: {
        bn: bengaliCategory,
        gu: gujaratiCategory,
        hi: hindiCategory,
        kn: kannadaCategory,
        ml: malayalamCategory,
        mr: marathiCategory,
        ta: tamilCategory,
        te: teluguCategory,
    }
}