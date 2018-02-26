<template>
    <header>
        <v-container>
            <v-layout row wrap>
                <v-flex xs2>
                    <div class="logo">{{ $t("pratilipi") }}</div>
                </v-flex>
                <v-flex xs5 class="search-box">
                    <v-text-field
                      name="input-1-3"
                      v-bind:label='$t("search_bar_help")'
                      append-icon="search"
                      single-line
                    ></v-text-field>
                </v-flex>
                <v-flex xs5>
                    <v-menu offset-y>
                        <v-btn flat icon slot="activator">
                            <v-icon>language</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile v-for="(language, index) in languages" to="/">
                                <v-list-tile-title>{{ $t("language_" + language.shortName, language.shortName) }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                    <v-btn flat icon>
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn flat icon>
                        <v-icon>library_books</v-icon>
                    </v-btn>
                    <v-btn flat icon>
                        <v-icon>notifications</v-icon>
                    </v-btn>
                    <v-btn color="blue white--text">
                      <v-icon left>account_circle</v-icon>
                      {{ $t("user_sign_in") }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </header>
</template>

<script>
import constants from '@/constants'

export default {
    data(){
        return {
            languages: constants.LANGUAGES
        }
    }
}
</script>

<style lang="scss" scoped>
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
