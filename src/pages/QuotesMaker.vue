<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Quotes Maker</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <!-- QUotes image -->
                        <div class="quotes">
                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="">
                            <TranslatingInput :value="quote" :oninput="updateQuoteText"></TranslatingInput>
                        </div>

                        <div class="">
                            
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
import Spinner from '@/components/Spinner.vue';
import TranslatingInput from '@/components/TranslatingInput.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            quote: '',
        }
    },
    components: {
        MainLayout,
        Spinner,
        TranslatingInput
    },
    computed: {
    },
    methods: {
        updateQuoteText(text) {
            this.quote = text;
        }
    },
    watch: {
        
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }

    .quotes {
        background-image: url('https://www.capetownchiro.com/wp-content/uploads/2017/07/freedom-sunset-web-header.jpeg');
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
