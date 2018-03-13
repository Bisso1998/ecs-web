<template>
    <div class="about-author" v-if="getAuthorDetails.pageUrl">
        <div class="head-title">__("author_about")</div>
        <router-link
            :to="getAuthorDetails.pageUrl"
            class="author-link">
            <img :src="getAuthorDetails.profileImageUrl" alt="author" class="auth-img" >
            <div class="auth-name">{{ getAuthorDetails.name }}</div>
        </router-link>
        <button class="btn btn-light follow-link" @click="followOrUnfollowAuthor" v-if="!getAuthorDetails.following && getUserDetails.authorId !== getAuthorDetails.authorId"><i class="material-icons">person_add</i> __("author_follow")</button>
        <button class="btn btn-light follow-link following" @click="followOrUnfollowAuthor" v-if="getAuthorDetails.following && getUserDetails.authorId !== getAuthorDetails.authorId">__("author_unfollow")</button>
        <p class="auth-desc show-more-height">{{ getAuthorDetails.summary }}</p>
        <button class="show_more_auth_desc">__("show_more")</button>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'About-Author',
    props: {
        authorId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('authordetails', [
            'getAuthorDetails'
        ])
    },
    methods: {
        ...mapActions('authordetails', [
            'fetchAuthorDetails',
            'followOrUnfollowAuthor'
        ]),
    },
    components: {
        
    },
    created() {
        this.fetchAuthorDetails(this.authorId);
    },
    mounted() {
        $(".show_more_auth_desc").click(function (e) {
            e.preventDefault();
            if($(".auth-desc").hasClass("show-more-height")) {
                $(this).text("show_less");
            } else {
                $(this).text("show_more");
            }

            $(".auth-desc").toggleClass("show-more-height");
        });
    }
}
</script>

<style  lang="scss" scoped>
    p {
        text-align: left;
        margin: 10px;
        font-size: 14px;
        max-height: initial;
        &.show-more-height {
            max-height: 105px;
            overflow: hidden;
        }
    }
    .head-title {
        text-align: left;
        font-weight: bold;
        font-size: 18px;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
    .author-link {
        color: #d0021b;
        .auth-img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-left: 10px;
            display: inline-block;
        }
        .auth-name {
            text-align: left;
            display: inline-block;
            margin: 0 10px;
            font-size: 14px;
            vertical-align: middle;
            @media screen and (max-width: 992px ) {
                max-width: 110px;
            }
        }
        &:hover {
            text-decoration: none;
        }
    }
    .follow-link {
        color: #d0021b;
        float: right;
        margin: 4px 10px 0 0;
        font-size: 14px;
        i {
            vertical-align: middle;
            padding-right: 5px;
            font-size: 18px;
        }
    }
    .auth-desc {
        text-align: left;
        margin-left: 10px;
    }
    .show_more_auth_desc {
        color: #d0021b;
        width: 100%;
        background: none;
        border: 0;
        outline: none;
        text-align: right;
        font-size: 14px;
        margin: 0 0 10px;
        cursor: pointer;
    }
</style>
