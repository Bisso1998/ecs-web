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
    getHighResolutionImage,
    isMobile,
    isAndroid,
    isChrome,
    setAnalyticsUserProperty,
    validateEmail,
    validatePassword,
    validateUsername,
    triggerAnanlyticsEvent,
    getPratilipiAnalyticsData
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
        getHighResolutionImage,
        isMobile,
        isAndroid,
        isChrome,
        setAnalyticsUserProperty,
        validateEmail,
        validatePassword,
        validateUsername,
        triggerAnanlyticsEvent,
        getPratilipiAnalyticsData
    }
}
