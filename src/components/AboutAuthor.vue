<template>
    <div class="about-author" v-if="getAuthorDetails.pageUrl">
        <div class="head-title">{{ $t("author_about") }}</div>
        <router-link
            :to="getAuthorDetails.pageUrl"
            class="author-link">
            <img :src="getAuthorDetails.profileImageUrl" alt="author" class="auth-img" >
            <div class="auth-name">{{ getAuthorDetails.name }}</div>
        </router-link>
        <button class="btn btn-light follow-link"><i class="material-icons">person_add</i> {{ $t("author_follow") }}</button>
        <button class="btn btn-light follow-link following" style="display: none;">{{ $t("author_unfollow") }}</button>
        <p class="text show-more-height">{{ getAuthorDetails.summary }}</p>
        <div class="show-more-button">
            <button class="show_more">{{ $t("show_more") }}</button>
        </div>
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
        ...mapGetters('authordetails', [
            'getAuthorDetails'
        ])
    },
    methods: {
        ...mapActions('authordetails', [
            'fetchAuthorDetails'
        ]),
    },
    components: {
        
    },
    created() {
        this.fetchAuthorDetails(this.authorId);
    },
    mounted() {
        $(".show_more").click(function () {
            if($(".text").hasClass("show-more-height")) {
                $(this).text("(Show Less)");
            } else {
                $(this).text("(Show More)");
            }

            $(".text").toggleClass("show-more-height");
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
    .text {
        text-align: left;
        margin-left: 10px;
    }
    .show-more-button {
        text-align: right;
        .show_more {
            color: #d0021b;
            background: none;
            border: 0;
            outline: none;
            text-align: right;
            font-size: 14px;
            margin: 0 10px 10px;
            cursor: pointer;
        }
    }
</style>
