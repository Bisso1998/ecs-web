<template>
    <div class="tabs-section col-md-12 col-12">
        <div
          @click="triggerHomeEvent"
          class="main-tabs home-tab">
          <i class="material-icons">home</i>
          <span>__("goto_home")</span>
        </div>
        <router-link
          :to="{ name: 'Discovery_Page' }"
          class="main-tabs">
          <i class="material-icons">all_out</i>
          <span>__('menu_category')</span>
        </router-link>
        <router-link
          :to="{ name: 'Write_Page' }"
          class="main-tabs">
          <i class="material-icons">mode_edit</i>
          <span>__("write")</span>
        </router-link>
        <router-link
          :to="userDetails.profilePageUrl"
          v-if="userDetails.profilePageUrl"
          class="main-tabs">
          <i class="material-icons">account_circle</i>
          <span>__('menu_profile')</span>
        </router-link>
        <div
          v-else
          @click="triggerLoginEvent"
          class="main-tabs login-tab">
          <i class="material-icons">account_circle</i>
          <span>__('user_sign_in')</span>
        </div>
    </div>
</template>

<script>
import constants from '@/constants'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        userDetails: {
            type: Object,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        triggerHomeEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOHOME_HEADER_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/');
        },
        triggerLoginEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOLOGIN_HEADER_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/login');
        }
    },
    mounted() {
        if (this.$route.path === '/' ) {
            $(".home-tab").addClass("active");
        }
        if (this.$route.path === '/login' ) {
            $(".login-tab").addClass("active");
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs-section {
    .main-tabs {
        display: inline-block;
        width: 23.5%;
        color: #212121;
        font-size: 18px;
        border-bottom: 3px solid #fff;
        padding-bottom: 2px;
        cursor: pointer;
        span {
            display: block;
            font-size: 12px;
        }
        &:hover {
            text-decoration: none;
            color: #d00b12;
        }
        &.router-link-exact-active, &.active {
            color: #d00b12;
            border-bottom-color: #d00b12;
        }
    }
}
</style>
