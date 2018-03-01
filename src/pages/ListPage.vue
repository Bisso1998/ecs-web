<template>
    <MainLayout>
        <div class="notification-page">
            <h1>List Page</h1>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Pratilipi',
    data() {
        return {
            user_id: null,
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    created() {
        
    },
    components: {
        MainLayout
    }
}
</script>

<style>
.notification-page {
    margin-top: 150px;
}
</style>