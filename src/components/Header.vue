<template>
    <div>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-lg-2 col-sm-4 col-5 p-r-0">
                        <router-link
                          :to="{ name: 'Home' }"
                          class="logo">
                        </router-link>
                        <div class="language-dropdown">
                            <button class="btn dropdown-toggle" type="button" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            __("pratilipi")
                            </button>
                            <div class="dropdown-menu" aria-labelledby="languageDropdown">
                                <a class="dropdown-item" :class="{ 'isActive': getCurrentLanguage().fullName === eachLanguage.fullName }" :href="'https://' + eachLanguage.fullName + '-gamma-gr.pratilipi.com'" :key="index" v-for="(eachLanguage, index) in languages">{{ eachLanguage.languageNative }}</a>
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
                    <div class="d-none d-lg-block col-lg-5">
                        <MainMenu :userDetails="userDetails"></MainMenu>
                    </div>
                </div>
            </div>
        </header>
        <div class="d-block d-lg-none footer-menu">
            <MainMenu :userDetails="userDetails"></MainMenu>
        </div>
    </div>
</template>

<script>
import constants from '@/constants'
import mixins from '@/mixins'
import SearchBox from '@/components/SearchBox.vue'
import MainMenu from '@/components/MainMenu.vue'
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
    mixins: [
        mixins
    ],
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
            searchText: '',
            scrollPosition: null,
            scrollDirection: null,
            counter: 0
        }
    },
    components: {
        SearchBox,
        MainMenu
    },
    methods: {
        goToSearchPage() {
            this.$router.push({ name: 'Search_Page', query: { q: this.searchText } });
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
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        }
    },
    watch: {
        'scrollPosition'(newScrollPosition, prevScrollPosition){
            if (newScrollPosition > 70 && this.scrollDirection === 'DOWN') {
                $('header').addClass('nav-up');
            } else if(newScrollPosition <= 70) {
                $('header').removeClass('nav-up');
            }
            
            if (newScrollPosition < prevScrollPosition) {
                this.counter++;
                this.scrollDirection = 'UP';
            } else {
                this.scrollDirection = 'DOWN';
            }
            
            if (this.counter > 5) {
                $('header').removeClass('nav-up');
                this.counter = 0;
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
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
        -webkit-transition: .2s ease;
        -o-transition: .2s ease;
        transition: .2s ease;
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
            @media screen and (max-width: 370px ) {
                width: 29px
            }
            &:hover {
                text-decoration: none;
            }
        }
        .language-dropdown {
            display: inline-block;
            vertical-align: middle;
            float: left;
            margin-left: 4px;
            button {
                padding: 0;
                margin: 0;
                background: none;
                line-height: 40px;
                font-size: 14px;
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
                width: 81%;
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
            &.router-link-exact-active {
                color: #d00b12;
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
        &.nav-up {
            top: -75px;
        }
    }
    .footer-menu {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 10;
        box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
    }
</style>
<style lang="scss">
    .footer-menu {
        .tabs-section {
            margin-top: 5px;
            .main-tabs {
                border: 0 !important;
                &.router-link-exact-active {
                    border: 0;
                }
                i {
                    display: block;
                    margin-bottom: 2px;
                }
            }
        }
    }
</style>
