<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    <div class="logo">{{ $t("pratilipi") }}</div>
                </div>
                <div class="col-sm-5 search-box">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="search-box-big" v-bind:placeholder='$t("search_bar_help")'/>
                        <i class="material-icons">search</i>
                    </div>
                </div>
                <div class="col-sm-5">
                    <button type="button" class="btn btn-xs btn-outline-secondary dropdown-toggle" id="languages" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="material-icons">search</i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="languages">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import constants from '@/constants'

export default {
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
        padding: 10px 0
    }
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
            input {
                font-size: 14px;
            }
            i {
                position: absolute;
                top: 7px;
                right: 20px;
            }
        }
        & /deep/ .input-group.input-group--append-icon label {
            max-width: 95%;
            top: 0;
        }
        & /deep/ .input-group--text-field input {
            border-bottom: 1px solid #e0e0e0;
        }
        & /deep/ .input-group__details {
            min-height: 0;
        }
    }
    .btn {
        margin: 2px 8px;
    }
</style>
