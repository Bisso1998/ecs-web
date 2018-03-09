<template>
    <MainLayout>
        <div class="static-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Settings page</h2>
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
        }
    },
    computed: {
        ...mapGetters('settingspage', [
            'getAuthorData'
        ]),
        ...mapState({
            email: state => state.author.email,
            phone: state => state.author.phone,
            firstName: state => state.author.firstName,
            language: state => state.author.language,
            lastName: state => state.author.lastName,
            firstNameEn: state => state.author.firstNameEn,
            lastNameEn: state => state.author.lastNameEn,
            penName: state => state.author.penName,
            summary: state => state.author.summary,
            gender: state => state.author.gender,
            dateOfBirth: state => state.author.dateOfBirth
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
        updateEmail(e) { this.$store.commit('updateEmail', e.target.value) },
        updatePhone(e) { this.$store.commit('updatePhone', e.target.value) },
        updateFirstName(e) { this.$store.commit('updateFirstName', e.target.value) },
        updateLanguage(e) { this.$store.commit('updateLanguage', e.target.value) },
        updateLastName(e) { this.$store.commit('updateLastName', e.target.value) },
        updateFirstNameEn(e) { this.$store.commit('updateFirstNameEn', e.target.value) },
        updateLastNameEn(e) { this.$store.commit('updateLastNameEn', e.target.value) },
        updateEnName(e) { this.$store.commit('updateEnName', e.target.value) },
        updateSummary(e) { this.$store.commit('updateSummary', e.target.value) },
        updateGender(e) { this.$store.commit('updateGender', e.target.value) },
        updateDateOfBirth(e) { this.$store.commit('updateDateOfBirth', e.target.value) },
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
.static-page {
    margin-top: 85px;
    text-align: left;
    @media screen and (max-width: 992px ) {
        margin-top: 140px;
    }
    h2 {
        font-size: 24px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
    }
}
</style>
