<template>
    <MainLayout>
        <div class="blog-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6 col-sm-12">
                                    <label for="pratilipi-settings-new-password">__('user_new_password') *</label>
                                    <input type="password" class="form-control" @input="newPasswordVerify = $event.target.value" id="pratilipi-settings-new-password" placeholder="__('user_new_password')">
                                </div>
                                <div class="form-group col-md-6 col-sm-12">
                                    <label for="pratilipi-settings-confirm-password">__('user_confirm_password') *</label>
                                    <input type="password" class="form-control" @input="newPassword = $event.target.value" id="pratilipi-settings-confirm-password" placeholder="__('user_confirm_password')">
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary update-btn" @click="verifyAndResetPassword(newPasswordVerify, newPassword)">__("save_changes")</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout
    },
    data() {
        return {
            newPasswordVerify: '',
            newPassword: ''    
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions([
            'resetUserPassword'
        ]),
        verifyAndResetPassword(newPassword, verifyPassword) {
            if (newPassword != verifyPassword) {
                console.log('Passwords dont match');
            } else {
                this.resetUserPassword({
                    email: this.$route.query.email,
                    idToken: this.$route.query.token, 
                    newPassword
                });
            }
        }
    }
}
</script>

<style lang="scss">
.blog-page {
    margin-top: 85px;
    text-align: left;
    background: #f8f8f8;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    .card {
        border-radius: 0;
        margin: 10px 0;
        padding: 0;
        text-align: left;
        .head-title {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0;
        }
        .date-published {
            font-size: 12px;
            margin: 5px 0 5px 10px;
        }
        .desc {
            text-align: left;
            padding: 10px;
            font-size: 14px;
            img {
                max-width: 100%;
                margin: 10px;
                height: auto !important;
            }
        }
    }
}
</style>
