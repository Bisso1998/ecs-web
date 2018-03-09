<template>
    <MainLayout>
        <div class="settings-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="head-title">Settings</div>
                        <button type="button" class="sign-out btn btn-light" name="button"><i class="material-icons">power_settings_new</i> __("user_sign_out")</button>
                        <div class="settings-menu">
                            <a href="#" v-on:click="tabchange" class="active" data-tab="profile-settings">Profile</a>
                            <a href="#" v-on:click="tabchange" data-tab="notification-settings">__("notification_notifications")</a>
                            <a href="#" v-on:click="tabchange" data-tab="password-settings">__("seo_update_password_page")</a>
                        </div>
                        <div class="menu-contents">
                            <div class="tabs" id="profile-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-first-name">__('edit_author_first_name') *</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-first-name" :value="firstName" @input="updateFirstName" placeholder="__('edit_author_first_name')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-last-name">__('edit_author_last_name')</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-last-name" :value="lastName" @input="updateLastName" placeholder="__('edit_author_last_name')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-first-name-en">__('edit_author_first_name_en') *</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-first-name-en" :value="firstNameEn" @input="updateFirstNameEn" placeholder="__('edit_author_first_name_en')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-last-name-en">__('edit_author_last_name_en')</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-last-name-en" :value="lastNameEn" @input="updateLastNameEn" placeholder="__('edit_author_last_name_en')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-pen-name">__('edit_author_pen_name') *</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-pen-name" :value="penName" @input="updatePenName" placeholder="__('edit_author_pen_name')">
                                        </div>
                                        <div class="form-group">
                                            <label for="pratilipi-settings-language">__("language_choose_language") *</label>
                                            <select class="form-control" id="pratilipi-settings-language" @input="updateLanguage">
                                                <option disabled selected>__("language_choose_language")</option>
                                                <option :selected="eachLanguage.fullName.toUpperCase() === language" :value="eachLanguage.fullName.toUpperCase()" v-for="eachLanguage in constants.LANGUAGES" :key="eachLanguage.shortName">{{ eachLanguage.fullName.toUpperCase() }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-summary">__('edit_author_summary')</label>
                                            <textarea class="form-control" id="pratilipi-settings-summary" :value="summary" @input="updateSummary" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="section-title">Private Information</div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-email">__('user_email')</label>
                                            <input type="email" class="form-control" id="pratilipi-settings-email" :value="email" @input="updateEmail" placeholder="__('user_email')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-phone">__('user_phone')</label>
                                            <input type="tel" class="form-control" id="pratilipi-settings-phone" :value="phone" @input="updatePhone" placeholder="__('user_phone')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-gender">__('gender')</label>
                                            <select class="form-control" id="pratilipi-settings-gender" @input="updateGender">
                                                <option disabled selected>__("gender")</option>
                                                <option :selected="'MALE' === gender" :value="gender">__("gender_male")</option>
                                                <option :selected="'FEMALE' === gender" :value="gender">__("gender_female")</option>
                                                <option :selected="'OTHER' === gender" :value="gender">__("gender_other")</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-dateOfBirth">__('author_date_of_birth')</label>
                                            <input type="date" class="form-control" id="pratilipi-settings-dateOfBirth" :value="dateOfBirth" @input="updateDateOfBirth" placeholder="__('author_date_of_birth')">
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary update-btn">__("save_changes")</button>
                                </form>
                            </div>
                            <div class="tabs" id="notification-settings">
                                
                            </div>
                            <div class="tabs" id="password-settings">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    components: {
        MainLayout
    },
    data() {
        return {
            constants
        }
    },
    computed: {
        ...mapGetters('settingspage', [
            'getAuthorData'
        ]),
        ...mapState({
            email: state => state.user.data.email,
            phone: state => state.user.data.phone,
            firstName: state => state.settingspage.author.data.firstName,
            language: state => state.settingspage.author.data.language,
            lastName: state => state.settingspage.author.data.lastName,
            firstNameEn: state => state.settingspage.author.data.firstNameEn,
            lastNameEn: state => state.settingspage.author.data.lastNameEn,
            penName: state => state.settingspage.author.data.penName,
            summary: state => state.settingspage.author.data.summary,
            gender: state => state.settingspage.author.data.gender,
            dateOfBirth: state => state.settingspage.author.data.dateOfBirth
        }),
        ...mapGetters([
            'getUserDetails'
        ]),
    },
    methods: {
        ...mapActions('settingspage', [
            'fetchAuthorDetails',
            'updateUserDetails'
        ]),
        tabchange(event) {
            event.preventDefault();        
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".settings-menu a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".tabs").hide();
            $("#" + tab_id).show();
        },
        updateEmail(e) { this.$store.commit('settingspage/updateEmail', e.target.value) },
        updatePhone(e) { this.$store.commit('settingspage/updatePhone', e.target.value) },
        updateFirstName(e) { this.$store.commit('settingspage/updateFirstName', e.target.value) },
        updateLanguage(e) { this.$store.commit('settingspage/updateLanguage', e.target.selectedOptions[0].value) },
        updateLastName(e) { this.$store.commit('settingspage/updateLastName', e.target.value) },
        updateFirstNameEn(e) { this.$store.commit('settingspage/updateFirstNameEn', e.target.value) },
        updateLastNameEn(e) { this.$store.commit('settingspage/updateLastNameEn', e.target.value) },
        updatePenName(e) { this.$store.commit('settingspage/updatePenName', e.target.value) },
        updateSummary(e) { this.$store.commit('settingspage/updateSummary', e.target.value) },
        updateGender(e) { this.$store.commit('settingspage/updateGender', e.target.selectedOptions[0].value) },
        updateDateOfBirth(e) { this.$store.commit('settingspage/updateDateOfBirth', e.target.value) },
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            if (newValue) {
                this.fetchAuthorDetails(newValue);
            }
        }
    },
    created() {
        if (this.getUserDetails.authorId) {
            this.fetchAuthorDetails(this.getUserDetails.authorId);    
        }
    }
}
</script>

<style lang="scss" scoped>
.settings-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    .head-title {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 0;
        float: left;
    }
    .sign-out {
        display: inline-block;
        color: #d0021b;
        float: right;
        margin-top: 10px;
        font-size: 14px;
        i {
            vertical-align: middle;
            font-size: 18px;
        }
    }
    .settings-menu {
        border-bottom: 1px solid #e9e9e9;
        padding: 8px 0 10px;
        text-align: left;
        overflow: hidden;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        clear: both;
        a {
            color: #555;
            font-size: 13px;
            border-bottom: 2px solid #fff;
            padding: 5px 5px 11px;
            span {
                font-size: 12px;
                font-weight: bold;
                padding: 0 2px;
                margin-right: 5px;
                display: inline-block;
                text-align: center;
            }
            &.active {
                color: #d0021b;
                border-color: #d0021b;
                span {
                    color: #d0021b;
                }
            }
            &:hover {
                text-decoration: none;
                color: #d0021b;
            }
        }
    }
    .tabs {
        margin: 20px 0;
        label {
            font-size: 12px;
        }
        .section-title {
            font-size: 16px;
            margin: 10px 0;
        }
        .update-btn {
            background: #d0021b;
            border: 0;
            outline: none;
            font-size: 14px;
            float: right;
        }
    }
}
</style>
