<template>
    <div class="tabs-section col-md-12 col-12">
        <router-link
          :to="{ name: 'Home' }"
          class="main-tabs">
          <i class="material-icons">home</i>
          <span>__("goto_home")</span>
        </router-link>
        <router-link
          :to="{ name: 'Discovery_Page' }"
          class="main-tabs">
          <i class="material-icons">all_out</i>
          <span>__('search_explore_categories')</span>
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
          <span>__('user_my_profile')</span>
        </router-link>
        <router-link
          :to="{ name: 'Login_Page'}"
          v-else
          class="main-tabs">
          <i class="material-icons">account_circle</i>
          <span>__('user_sign_in')</span>
        </router-link>
    </div>
</template>

<script>
import constants from '@/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        userDetails: {
            type: Object,
            required: true
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
        span {
            display: block;
            font-size: 12px;
        }
        &:hover {
            text-decoration: none;
            color: #d00b12;
        }
        &.router-link-exact-active {
            color: #d00b12;
            border-bottom-color: #d00b12;
        }
    }
}
</style>
