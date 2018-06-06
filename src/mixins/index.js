import {
    translateWord,
    openLoginModal,
    openInputModal,
    openMultiInputModal,
    openConfirmationModal,
    openForgotPasswordModal,
    openWritePratilipiModal,
    getCurrentLanguage,
    getLowResolutionImage,
    getMediumResolutionImage,
    getHighResolutionImage,
    isMobile,
    isAndroid,
    isChrome,
    setAnalyticsUserProperty,
    validateEmail,
    validatePassword,
    validateUsername,
    triggerAnanlyticsEvent,
    getPratilipiAnalyticsData,
    getAnalyticsPageSource,
    getAndroidIntentUri,
    openInNewTab,
    openPratilipiModal,
    getCookie,
    openPrimaryConfirmationModal,
    setCookie,
    isCurrentEvent
} from '@/mixins/methods'
import { defaultAuthorImage } from '@/mixins/data'

export default {
    data() {
        return {
            defaultAuthorImage
        }
    },
    methods: {
        translateWord,
        openLoginModal,
        openInputModal,
        openMultiInputModal,
        openConfirmationModal,
        openForgotPasswordModal,
        openWritePratilipiModal,
        getCurrentLanguage,
        getLowResolutionImage,
        getMediumResolutionImage,
        getHighResolutionImage,
        isMobile,
        isAndroid,
        isChrome,
        setAnalyticsUserProperty,
        validateEmail,
        validatePassword,
        validateUsername,
        triggerAnanlyticsEvent,
        getPratilipiAnalyticsData,
        getAnalyticsPageSource,
        getAndroidIntentUri,
        openInNewTab,
        openPratilipiModal,
        getCookie,
        setCookie,
        openPrimaryConfirmationModal,
        isCurrentEvent
    }
}
