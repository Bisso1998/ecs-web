<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-sm-3 col-2">
                    <router-link
                      :to="{ name: 'Home' }"
                      class="logo">
                      __("pratilipi")
                    </router-link>
                </div>
                <div class="col-sm-5 p-0 search-box d-none d-lg-block">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="search-box-big" v-bind:placeholder="'__("search_bar_help")'"/>
                        <i class="material-icons">search</i>
                    </div>
                </div>
                <div class="col-sm-8 col-8 d-block d-lg-none search-box search-box-2 text-right">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="search-box-small" v-bind:placeholder="'__("search")'"/>
                        <i class="material-icons">search</i>
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
                      <span>Discover</span>
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
                      :to="{ path: 'login' }"
                      v-else=""
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
                if (language === process.env.LANGUAGE) {
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
                position: relative;
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
            margin-top: 7px;
            margin-left: auto;
            .form-group {
                position: relative;
                i {
                    top: 5px;
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
                margin-top: 15px;
            }
            .main-tabs {
                display: inline-block;
                width: 23.5%;
                color: #212121;
                font-size: 18px;
                border-bottom: 3px solid #fff;
                padding-bottom: 4px;
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
                    border-bottom: 3px solid;
                }
            }
        }
    }
</style>
