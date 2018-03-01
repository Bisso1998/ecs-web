<template>
    <MainLayout>
        <div class="author-page">
            <h1>Author Page</h1>
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
.author-page {
    margin-top: 150px;
}
</style>