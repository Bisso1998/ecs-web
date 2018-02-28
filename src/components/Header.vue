<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    <div class="logo">{{ $t("pratilipi") }}</div>
                </div>
                <div class="col-sm-5 p-0 search-box d-none d-lg-block">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="search-box-big" v-bind:placeholder='$t("search_bar_help")'/>
                        <i class="material-icons">search</i>
                    </div>
                </div>
                <div class="col-sm-5 p-0">
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
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#login_modal">
                        <i class="material-icons">account_circle</i>
                        {{ $t("user_sign_in") }}
                    </button>
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
        .menu__content .isActive a div {
            color: red;
        }
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
            i {
                font-size: 20px;
                height: 40px;
                line-height: 40px;
                width: 38px;
            }
        }
        a.dropdown-item.isActive {
            color: #d00b12;
        }
        .btn-outline-secondary:focus, .btn-outline-secondary:not(:disabled):not(.disabled):active:focus {
            box-shadow: none;
        }
        .btn-primary {
            font-size: 12px;
            i {
                vertical-align: middle;
                width: 30px;
            }
        }
    }
</style>
