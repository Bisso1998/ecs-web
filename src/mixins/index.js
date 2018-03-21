import { translateWord, openLoginModal, openInputModal, openMultiInputModal } from '@/mixins/methods'
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
        openMultiInputModal
    }
}
