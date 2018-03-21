import { 
    translateWord, 
    openLoginModal, 
    openInputModal, 
    openMultiInputModal,
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
        isMobile,
        isAndroid,
        isChrome
    }
}
