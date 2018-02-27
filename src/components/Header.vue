<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-sm-2">
                    <div class="logo">{{ $t("pratilipi") }}</div>
                </div>
                <div class="col-sm-5 search-box">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" id="inputSuccess2"/>
                        <span class="glyphicon glyphicon-search form-control-feedback"></span>
                    </div>
                </div>
                <div class="col-sm-5">
                    
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
        margin-top: 5px;
        .input-group {
            padding: 0;
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
