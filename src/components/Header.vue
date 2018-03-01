<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-sm-3 col-2">
                    <router-link
                      :to="{ name: 'Home' }"
                      class="logo">
                      {{ $t("pratilipi") }}
                    </router-link>
                </div>
                <div class="col-sm-5 p-0 search-box d-none d-lg-block">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="search-box-big" v-bind:placeholder='$t("search_bar_help")'/>
                        <i class="material-icons">search</i>
                    </div>
                </div>
                <div class="col-lg-5 col-sm-9 col-10 pl-0 text-right">
                    <button type="button" class="btn btn-xs btn-outline-secondary header-icon" id="languages" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">language</i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="languages">
                        <a
                            class="dropdown-item"
                            v-for="(language) in languages" 
                            :href="'https://' + language.fullName + '.pratilipi.com'"
                            :class="{ isActive: isCurrentLanguage(language.shortName) }"
                            :key="language.shortName">{{ $t("language_" + language.shortName, language.shortName) }}
                        </a>
                    </div>
                    <button type="button" class="btn btn-xs btn-outline-secondary header-icon">
                      <i class="material-icons">create</i>
                    </button>
                    <button type="button" class="btn btn-xs btn-outline-secondary header-icon">
                      <i class="material-icons">library_books</i>
                    </button>
                    <button type="button" class="btn btn-xs btn-outline-secondary header-icon">
                      <i class="material-icons">notifications</i>
                    </button>
                    <button v-if="userDetails.isGuest" type="button" class="btn btn-primary" data-toggle="modal" data-target="#login_modal">
                        <i class="material-icons">account_circle</i>
                        {{ $t("user_sign_in") }}
                    </button>
                    <router-link :to="{name: 'User', params: { user_id: userDetails.profilePageUrl.split('/').pop() }}" v-if="userDetails && !userDetails.isGuest && userDetails.profilePageUrl" class="btn btn-xs btn-outline-secondary logged-in">
                        <img :src="userDetails.profileImageUrl" alt="">
                        <span class="username">{{ userDetails.displayName }}</span>
                    </router-link> 
                    
                </div>
            </div>
            <div class="row secondary-header">
                <div class="col-sm-2 col-2 d-block d-lg-none text-left">
                    <button><i class="material-icons">menu</i></button>
                </div>
                <div class="col-sm-10 col-10 d-block d-lg-none search-box text-right">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="search-box-small" v-bind:placeholder='$t("search")'/>
                        <i class="material-icons">search</i>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import constants from '@/constants'

export default {
    props: {
        userDetails: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            languages: constants.LANGUAGES,
            isCurrentLanguage: (language) => {
                if (language === this._i18n.locale) {
                    return true;    
                } else {
                    return false;
                }
                
            }
        }
    },
    methods: {

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
        .logo {
            background: url(../assets/pratilipi_logo.png) no-repeat left center;
            background-size: contain;
            text-indent: 50px;
            height: 40px;
            text-align: left;
            line-height: 40px;
            font-size: 17px;
            font-weight: 700;
            max-width: 150px;
            display: block;
            color: #2c3e50;
            &:hover {
                text-decoration: none;
            }
            @media screen and (max-width: 410px ) {
                width: 40px;
                overflow: hidden;
            }
        }
        .search-box {
            margin-top: 4px;
            .form-group {
                margin: 0;
                border: 1px solid #ced4da;
                border-radius: .25rem;
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
        .btn {
            margin: 2px 4px;
        }
        .header-icon {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding: 0;
            @media screen and (max-width: 576px ) {
                width: 35px;
                height: 35px;
            }
            i {
                font-size: 20px;
                height: 40px;
                line-height: 40px;
                width: 38px;
                @media screen and (max-width: 576px ) {
                    height: 35px;
                    line-height: 35px;
                    width: 33px;
                }
            }
        }
        .logged-in {
            border: 0;
            padding: 0;
            max-width: 165px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            @media screen and (max-width: 768px ) {
                max-width: 300px;
            }
            @media screen and (max-width: 768px ) {
                max-width: 170px;
            }
            @media screen and (max-width: 576px ) {
                overflow: hidden;
                width: 40px;
            }
            img {
                font-size: 20px;
                height: 40px;
                line-height: 40px;
                width: 40px;
                border: 1px solid;
                border-radius: 50%;
                @media screen and (max-width: 576px ) {
                    height: 35px;
                    width: 35px;
                    line-height: 35px;
                }
            }
            span {
                margin-left: 5px;
            }
            img, span {
                vertical-align: middle;
            }
            &:hover, &:active {
                background: #fff !important;
                color: #6c757d;
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
        .secondary-header {
            @media screen and (max-width: 992px ) {
                margin-top: 10px;
            }
            button {
                margin-top: 10px;
                background: none;
                border: 0;
                outline: none;
                cursor: pointer;
            }
            .search-box {
                margin-top: 7px;
                .form-group {
                    position: relative;
                    i {
                        top: 5px;
                    }
                }
            }
        }
    }
</style>
