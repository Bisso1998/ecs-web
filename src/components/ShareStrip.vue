<template>
    <div class="social-share">
        <a :href="getFacebookShareUrl" class="fb" target="_blank">
            <span class="social-icon"><icon name="facebook-f"></icon></span>
        </a>
        <a :href="getTwitterUrl" class="twitter" target="_blank">
           <span class="social-icon"><icon name="twitter"></icon></span>
        </a>
        <a :href="getGooglePlusUrl" class="google" target="_blank">
            <span class="social-icon"><icon name="google-plus"></icon></span>
        </a>
        <a :href="getWhatsAppUri" class="whatsapp" target="_blank">
            <span class="social-icon"><icon name="whatsapp"></icon></span>
        </a>
        <a :href="getContentUri" class="link">
            <span class="social-icon"><icon name="link"></icon></span>
        </a>
        <input type="text" id="inlineShareUri" hidden>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixins from '@/mixins';

export default {
    name: 'Social-Share-Strip',
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getFacebookShareUrl',
            'getTwitterUrl',
            'getGooglePlusUrl',
            'getWhatsAppUri',
            'getContentUri'
        ]),
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions([
            'setShareDetails'
        ])
    },
    components: {
        
    },
    created() {
        this.setShareDetails({ data: this.data, type: this.type })
    }
}
</script>

<style  lang="scss" scoped>
.social-share {
    width: 220px;
    margin: 0 auto;
    a {
        vertical-align: middle;
        color: #2c3e50;
        display: inline-block;
        text-align: left;
        margin: 0 0 5px;
        font-size: 14px;
        .social-icon {
            display: inline-block;
            width: 35px;
            height: 35px;
            background: #3b5998;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 35px;
            margin-right: 5px;
        }
        .fa-icon {
            vertical-align: middle;
        }
        &:hover {
            text-decoration: none;
        }
    }
}
.social-share a.twitter .social-icon  {
    background: #00aced;
}
.social-share a.google .social-icon { 
    background: #dd4b39;
}
.social-share a.whatsapp .social-icon {
    background: #48C631;
}
.social-share a.link .social-icon {
    background: #2c3e50;
}
</style>
