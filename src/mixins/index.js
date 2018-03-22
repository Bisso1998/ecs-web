import { 
    translateWord, 
    openLoginModal, 
    openInputModal, 
    openMultiInputModal,
    openConfirmationModal,
    openForgotPasswordModal,
    getCurrentLanguage,
    isMobile,
    isAndroid,
    isChrome
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
        getCurrentLanguage,
        isMobile,
        isAndroid,
        isChrome
    }
}
