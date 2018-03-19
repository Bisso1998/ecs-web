<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-sm-3 col-5 p-r-0">
                    <router-link
                      :to="{ name: 'Home' }"
                      class="logo">
                    </router-link>
                    <div class="language-dropdown">
                        <button class="btn dropdown-toggle" type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        __("pratilipi")
                        </button>
                        <div class="dropdown-menu" aria-labelledby="languageDropdown">
                            <a class="dropdown-item" href="#">Hindi</a>
                            <a class="dropdown-item" href="#">Tamil</a>
                            <a class="dropdown-item" href="#">Malayalam</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 col-sm-8 col-7 search-box-wrap">
                    <div class="search-box d-none d-lg-block">
                        <div class="form-group has-feedback" id="search-box-big">
                            <input type="text" class="form-control" v-model="searchText" @keyup.enter="goToSearchPage" @click="opendesktopsearch" v-bind:placeholder="'__("search_bar_help")'"/>
                            <i class="material-icons">search</i>
                            <SearchBox :searchText="searchText"></SearchBox>
                        </div>
                        <router-link
                        :to="{ name: 'Notification'}"
                        class="notification-icon"
                        @click.native="resetNotificationCount">
                            <i class="material-icons">notifications</i>
                            <span v-if="notificationCount">{{ notificationCount }}</span>
                        </router-link>
                    </div>
                    <div class="d-block d-lg-none search-box search-box-2 text-right">
                        <div class="form-group has-feedback" id="search-box-small">
                            <input type="text" class="form-control" v-model="searchText" @keyup.enter="goToSearchPage" @click="openmobilesearch" v-bind:placeholder="'__("search")'"/>
                            <i class="material-icons">search</i>
                            <SearchBox :searchText="searchText"></SearchBox>
                        </div>
                        <router-link
                        :to="{ name: 'Notification'}"
                        @click.native="resetNotificationCount"
                        class="notification-icon">
                            <i class="material-icons">notifications</i>
                            <span v-if="notificationCount">{{ notificationCount }}</span>
                        </router-link>
                    </div>
                </div>
                <div class="tabs-section col-md-12 col-12 col-lg-5">
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
                      <span>Profile</span>
                    </router-link>
                    <router-link
                      :to="{ name: 'Login_Page'}"
                      v-else
                      class="main-tabs">
                      <i class="material-icons">account_circle</i>
                      <span>Profile</span>
                    </router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import constants from '@/constants'
import SearchBox from '@/components/SearchBox.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        userDetails: {
            type: Object,
            required: true
        },
        notificationCount: {
            type: Number
        }
    },
    data(){
        return {
            languages: constants.LANGUAGES,
            isCurrentLanguage: (language) => {
                if (language === process.env.LANGUAGE) {
                    return true;    
                } else {
                    return false;
                }
                
            },
            searchText: ''
        }
    },
    components: {
        SearchBox
    },
    methods: {
        goToSearchPage() {
            this.$router.push({ name: 'Search_Page', query: { searchText: this.searchText } });
        },
        opendesktopsearch() {
            $("#search-box-big .search-dropdown").show();
            $(document).mouseup(function(e) {
                var container = $(".search-dropdown");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }
            });
        },
        openmobilesearch() {
            $("#search-box-small .search-dropdown").show();
            
            $(document).mouseup(function(e) {
                var container = $(".search-dropdown");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }
            });
        },
        ...mapActions([
            'resetNotificationCount'
        ])
    }
}
</script>

<style lang="scss" scoped>
    header {
        box-shadow: 0 2px 2px rgba(0,0,0,0.2);
        margin-bottom: 10px;
        padding: 10px 0;
        position: fixed;
        top: 0;
        z-index: 5;
        width: 100%;
        background: #fff;
        .p-r-0 {
            padding-right: 0;
        }
        .logo {
            background: url(../assets/pratilipi_logo.png) no-repeat left center;
            background-size: contain;
            height: 40px;
            float: left;
            width: 40px;
            display: inline-block;
            &:hover {
                text-decoration: none;
            }
        }
        .language-dropdown {
            display: inline-block;
            vertical-align: middle;
            float: left;
            margin-left: 10px;
            button {
                padding: 0;
                margin: 0;
                background: none;
                line-height: 40px;
                font-size: 16px;
                font-weight: 700;
                color: #212121;
                &:focus {
                    outline: none;
                    box-shadow: none;
                }
            }
            .dropdown-menu a {
                font-size: 14px;
            }
        }
        .search-box-wrap {
            padding: 0;
            margin-left: auto;
        }
        .search-box {
            margin-top: 4px;
            padding: 0;
            .form-group {
                margin: 0;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                position: relative;
                width: 88%;
                display: inline-block;
                input {
                    font-size: 14px;
                    width: 95%;
                    border: 0;
                    outline: none;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                }
                i {
                    position: absolute;
                    top: 7px;
                    right: 6px;
                }
                &:focus-within {
                    box-shadow: 0 0 2px rgba(0,0,0,0.2);
                }
            }
        }
        .search-box-2 {
            margin-top: 3px;
            margin-left: auto;
            text-align: right;
            .form-group {
                position: relative;
                width: 83%;
                display: inline-block;
                @media screen and (max-width: 410px ) {
                    width: 70%;
                }
                i {
                    top: 5px;
                }
            }
        }
        .btn {
            margin: 2px 4px;
        }
        .notification-icon {
            color: #212121;
            display: inline-block;
            vertical-align: middle;
            margin: 5px 12px 0 5px;
            position: relative;
            &:hover {
                text-decoration: none;
            }
            span {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #d00b12;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                color: #fff;
                text-align: center;
                font-size: 11px;
                line-height: 22px;
            }
        }
        a.dropdown-item.isActive {
            color: #d00b12;
            &:before {
                content: "\e315";
                font-family: 'Material Icons';
                font-weight: normal;
                font-style: normal;
                font-size: 14px;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                transform: translate(0, 0);
                vertical-align: middle;
                margin-left: -15px;
                padding-right: 5px;
            }
        }
        .btn-outline-secondary:focus, .btn-outline-secondary:not(:disabled):not(.disabled):active:focus {
            box-shadow: none;
        }
        .btn-primary {
            font-size: 12px;
            &:focus {
                box-shadow: none;
            }
            i {
                vertical-align: middle;
                width: 30px;
                @media screen and (max-width: 576px ) {
                    width: 45px;
                }
            }
            @media screen and (max-width: 576px ) {
                width: 45px;
                padding-right: 0;
                padding-left: 0;
            }
        }
        .tabs-section {
            @media screen and (max-width: 992px ) {
                margin-top: 10px;
            }
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
    }
</style>
