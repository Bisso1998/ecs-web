<template>
    <div class="pratilipi-page">
        Pratilipi ID : {{ pratilipi_id }}
        <br>
        Pratilipi Data : {{ pratilipiData }}
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
        this.pratilipiData = this.$route.params.pratilipiData;
        console.log(this.$route.params);
    },
    components: {
        
    }
}
</script>

<style>
</style>