<template>
    <MainLayout>
        <div class="settings-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="head-title">Settings</div>
                        <button type="button" class="sign-out btn btn-light" name="button" @click="triggerEventAndLogoutUser"><i class="material-icons">power_settings_new</i> __("user_sign_out")</button>
                        <div class="settings-menu">
                            <a href="#" v-on:click="tabchange" class="active" data-tab="profile-settings">__("menu_profile")</a>
                            <a href="#" v-on:click="tabchange" data-tab="notification-settings">__("notification_notifications")</a>
                            <a href="#" v-on:click="tabchange" data-tab="password-settings">__("seo_update_password_page")</a>
                        </div>
                        <div class="menu-contents">
                            <div class="tabs" id="profile-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-first-name">__('edit_author_first_name') *</label>
                                            <!-- <input type="text" class="form-control" id="pratilipi-settings-first-name" :value="firstName" @input="updateFirstName" placeholder="__('edit_author_first_name')"> -->
                                            <TranslatingInput :value="firstName" :oninput="updateFirstName"></TranslatingInput>
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-last-name">__('edit_author_last_name')</label>
                                            <!-- <input type="text" class="form-control" id="pratilipi-settings-last-name" :value="lastName" @input="updateLastName" placeholder="__('edit_author_last_name')"> -->
                                            <TranslatingInput :value="lastName" :oninput="updateLastName"></TranslatingInput>
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
                                                <option :selected="'MALE' === gender" value="MALE">__("gender_male")</option>
                                                <option :selected="'FEMALE' === gender" value="FEMALE">__("gender_female")</option>
                                                <option :selected="'OTHER' === gender" value="OTHER">__("gender_other")</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-dateOfBirth">__('author_date_of_birth')</label>
                                            <input type="date" class="form-control" id="pratilipi-settings-dateOfBirth" :value="dateOfBirth" @input="updateDateOfBirth" placeholder="__('author_date_of_birth')">
                                        </div>
                                    </div>
                                    <button type="button" class="btn update-btn" @click="updateProfileSettings">__("save_changes")</button>
                                </form>
                            </div>
                            <div class="tabs" id="notification-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-email-frequency">__('email_frequency')</label>
                                            <select class="form-control" id="pratilipi-settings-email-frequency">
                                                <option disabled selected>__("email_frequency")</option>
                                                <option>__("email_frequency_immediate")</option>
                                                <option>__("email_frequency_daily")</option>
                                                <option>__("email_frequency_weekly")</option>
                                                <option>__("email_frequency_monthly")</option>
                                                <option>__("email_frequency_never")</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="section-title">__("notification_group_content")</div>
                                    <div class="form-row">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_new_review">
                                            <label class="form-check-label" for="notif_option_new_review">__("option_new_review")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_new_comment">
                                            <label class="form-check-label" for="notif_option_new_comment">__("option_new_comment")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_like_review">
                                            <label class="form-check-label" for="notif_option_like_review">__("option_like_review")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_like_comment">
                                            <label class="form-check-label" for="notif_option_like_comment">__("option_like_comment")</label>
                                        </div>
                                    </div>
                                    
                                    <div class="section-title">__("notification_group_network")</div>
                                    <div class="form-row">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_new_follower">
                                            <label class="form-check-label" for="notif_option_new_follower">__("option_new_follower")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_pratilipi_published_follower">
                                            <label class="form-check-label" for="notif_option_pratilipi_published_follower">__("option_pratilipi_published_follower")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_pratilipi_updates">
                                            <label class="form-check-label" for="notif_option_pratilipi_updates">__("option_pratilipi_updates")</label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn update-btn" disabled>__("save_changes")</button>
                                </form>
                            </div>
                            <div class="tabs" id="password-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-current-password">__('user_current_password') *</label>
                                            <input type="password" class="form-control" v-model="oldPassword" id="pratilipi-settings-current-password" placeholder="__('user_current_password')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-new-password">__('user_new_password') *</label>
                                            <input type="password" class="form-control" id="pratilipi-settings-new-password" placeholder="__('user_new_password')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-confirm-password">__('user_confirm_password') *</label>
                                            <input type="password" class="form-control" v-model="newPassword" id="pratilipi-settings-confirm-password" placeholder="__('user_confirm_password')">
                                        </div>
                                    </div>
                                    <button type="button" class="btn update-btn" @click="triggerEventAndUpdateUserPassword({ oldPassword, newPassword })">__("save_changes")</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spinner-overlay" v-if="getAuthorLoadingState === 'LOADING' || getAuthorUpdateState === 'LOADING'">
                <Spinner></Spinner> 
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import TranslatingInput from '@/components/TranslatingInput.vue';
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants';
import mixins from '@/mixins';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    components: {
        MainLayout,
        TranslatingInput,
        Spinner
    },
    data() {
        return {
            constants,
            oldPassword: '',
            newPassword: ''
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('settingspage', [
            'getAuthorData',
            'getAuthorLoadingState',
            'getAuthorUpdateState'
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
            'getUserDetails',
            'getLogoutStatus'
        ]),
    },
    methods: {
        ...mapActions('settingspage', [
            'fetchAuthorDetails',
            'updateUserDetails',
            'updateAuthorDetails',
            'updateUserPassword'
        ]),
        ...mapActions([
            'logoutUser'
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
        updateFirstName(value) { this.$store.commit('settingspage/updateFirstName', value) },
        updateLanguage(e) { this.$store.commit('settingspage/updateLanguage', e.target.selectedOptions[0].value) },
        updateLastName(value) { this.$store.commit('settingspage/updateLastName', value) },
        updateFirstNameEn(e) { this.$store.commit('settingspage/updateFirstNameEn', e.target.value) },
        updateLastNameEn(e) { this.$store.commit('settingspage/updateLastNameEn', e.target.value) },
        updatePenName(e) { this.$store.commit('settingspage/updatePenName', e.target.value) },
        updateSummary(e) { this.$store.commit('settingspage/updateSummary', e.target.value) },
        updateGender(e) { this.$store.commit('settingspage/updateGender', e.target.selectedOptions[0].value) },
        updateDateOfBirth(e) { this.$store.commit('settingspage/updateDateOfBirth', e.target.value) },
        updateProfileSettings() {
            this.updateUserDetails();
            this.updateAuthorDetails();
        },
        triggerEventAndUpdateUserPassword(data) {
            this.triggerAnanlyticsEvent('RESETPASSWORD_PASSWORD_SETNGPRI', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            this.updateUserPassword(data);
        },
        triggerEventAndLogoutUser() {
            this.triggerAnanlyticsEvent('LOGOUT_SETTINGSM_SETTINGS', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            this.logoutUser();
        }
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            if (newValue) {
                this.fetchAuthorDetails(newValue);
            }
        },
        'getUserDetails.isGuest'(isGuest) {
            if (isGuest) {
                this.$router.push('login');
            }
        },
        'getLogoutStatus'(loggedOut) {
            if (loggedOut) {
                location.reload()    
            }
        }
    },
    created() {
        if (this.getUserDetails.isGuest) {
            this.$router.push('login');
        }

        if (this.getUserDetails.authorId) {
            this.fetchAuthorDetails(this.getUserDetails.authorId);    
        }
    },
    mounted() {
        // Hide Footer when keyboard comes
        if (this.isMobile()) {
            $(document).on('focus', 'input, textarea', function() {
                $(".footer-menu").css("height", "0")
            });
            $(document).on('blur', 'input, textarea', function() {
                $(".footer-menu").css("height", "51px")
            });
        }
        this.triggerAnanlyticsEvent('LANDED_SETTINGSM_SETTINGS', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });
    }
}
</script>

<style lang="scss" scoped>
.settings-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
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
        display: none;
        &#profile-settings {
            display: block;
        }
        label {
            font-size: 12px;
        }
        .section-title {
            font-size: 16px;
            margin: 10px 0;
            font-weight: bold;
        }
        .form-check {
            width: 100%;
            margin: 0 10px 5px 15px;
            label {
                font-size: 14px;
                vertical-align: text-bottom;
            }
        }
        .update-btn {
            background: #d0021b;
            color: #fff;
            border: 0;
            outline: none;
            font-size: 14px;
            float: right;
            margin: 10px 0;
            &:active, &:focus {
                outline: none;
                box-shadow: none;
            }
        }
    }
}
.spinner-overlay {
    position: fixed;
    top: 0;
    background: rgba(255,255,255,0.8);
    width: 100%;
    height: 100%;
    .spinner {
        top: 40%;
        position: absolute;
    }
}
</style>
