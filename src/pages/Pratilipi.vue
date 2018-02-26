<template>
    <div class="pratilipi-page">
        Pratilipi Data for Pratilipi : {{ pratilipi_id }}
    </div>
</template>

<script>

export default {
    name: 'Pratilipi',
    data() {
        return {
            pratilipi_id: null
        }
    },
    created: function() {
        this.pratilipi_id = this.$route.params.pratilipi_id;
    },
    components: {
        
    }
}
</script>

<style>
</style>